from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Form, File, UploadFile
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
import re
import ipaddress
import httpx
import bcrypt
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# --- Enquiry form + managed email (Resend playbook) ---
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)

def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)

def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)

class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []

def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")

async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    async with httpx.AsyncClient(timeout=30) as client_http:
        resp = await client_http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")

class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=6, max_length=30)
    email: str | None = Field(default=None, max_length=160)
    service: str = Field(min_length=2, max_length=80)
    message: str = Field(min_length=5, max_length=2000)

@api_router.post("/enquiries")
async def create_enquiry(input: EnquiryCreate):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.enquiries.insert_one(doc)

    email_sent = False
    if EMAIL_KEY and OWNER_EMAIL and EMAIL_FROM_NAME:
        def row(label, value):
            return (f'<tr><td style="padding:8px 16px 8px 0;font-size:12px;color:#6b7480;'
                    f'text-transform:uppercase;letter-spacing:1px;vertical-align:top">{label}</td>'
                    f'<td style="padding:8px 0;font-size:14px;color:#1a1a1a">{value}</td></tr>')
        html = (
            '<table role="presentation" width="100%" style="background:#f9f8f6;padding:24px">'
            '<tr><td style="font-family:Arial,sans-serif">'
            f'<h2 style="margin:0 0 16px;font-family:Georgia,serif;color:#16233f">'
            f'New project enquiry — {escape(input.service)}</h2>'
            '<table role="presentation" style="border-top:1px solid #dee2e8;padding-top:16px">'
            + row("Name", escape(input.name))
            + row("Phone", escape(input.phone))
            + row("Email", escape(input.email or "—"))
            + row("Service", escape(input.service))
            + row("Message", escape(input.message))
            + '</table>'
            f'<p style="margin-top:24px;font-size:12px;color:#6b7480">Sent by the '
            f'{escape(EMAIL_FROM_NAME)} website enquiry form.</p>'
            '</td></tr></table>')
        try:
            await send_email(to=OWNER_EMAIL, subject=f"New project enquiry — {input.service}", html=html)
            email_sent = True
        except Exception:
            logger.error("Enquiry email send failed", exc_info=True)

    return {"status": "received", "id": doc["id"], "email_sent": email_sent}

# --- Emergent-managed Google Auth ---
SESSION_DATA_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
ADMIN_EMAILS = {e.strip().lower() for e in os.environ.get("ADMIN_EMAILS", "").split(",") if e.strip()}

class SessionExchange(BaseModel):
    session_id: str = Field(min_length=8, max_length=200)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("session_token")
    auth = request.headers.get("Authorization")
    if not token and auth and auth.startswith("Bearer "):
        token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session_doc = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user_doc = await db.users.find_one({"user_id": session_doc["user_id"]}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    user_doc.pop("password_hash", None)
    return user_doc

@api_router.post("/auth/session")
async def exchange_session(input: SessionExchange, response: Response):
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.get(SESSION_DATA_URL, headers={"X-Session-ID": input.session_id})
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    data = resp.json()
    email = (data.get("email") or "").lower()
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": data.get("name"), "picture": data.get("picture")}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": data.get("name"),
            "picture": data.get("picture"),
            "created_at": datetime.now(timezone.utc),
        })
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": data["session_token"],
        "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie(
        "session_token", data["session_token"],
        httponly=True, secure=True, samesite="none", path="/", max_age=7 * 24 * 3600,
    )
    return {"user_id": user_id, "email": email, "name": data.get("name"), "picture": data.get("picture")}

@api_router.get("/auth/me")
async def auth_me(request: Request):
    user = await get_current_user(request)
    user["is_admin"] = user.get("email", "").lower() in ADMIN_EMAILS
    return user

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_many({"session_token": token})
    response.delete_cookie("session_token", path="/", secure=True, samesite="none")
    return {"status": "logged_out"}

@api_router.get("/admin/enquiries")
async def admin_enquiries(request: Request):
    user = await get_current_user(request)
    if user.get("email", "").lower() not in ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="This Google account is not an approved admin")
    return await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)

# --- Owner password login + site image storage + settings ---
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
STORAGE_EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = os.environ.get("APP_NAME")
storage_key = None

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False

async def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(f"{STORAGE_URL}/init", json={"emergent_key": STORAGE_EMERGENT_KEY})
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key

async def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = await init_storage()
    async with httpx.AsyncClient(timeout=120) as http:
        resp = await http.put(
            f"{STORAGE_URL}/objects/{path}",
            headers={"X-Storage-Key": key, "Content-Type": content_type},
            content=data,
        )
    resp.raise_for_status()
    return resp.json()

async def get_object(path: str):
    key = await init_storage()
    async with httpx.AsyncClient(timeout=60) as http:
        resp = await http.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key})
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

async def require_admin(request: Request) -> dict:
    user = await get_current_user(request)
    if user.get("email", "").lower() not in ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="This account is not an approved admin")
    return user

class PasswordLogin(BaseModel):
    password: str = Field(min_length=1, max_length=200)

@api_router.post("/auth/login")
async def password_login(input: PasswordLogin, request: Request, response: Response):
    admin_email = (os.environ.get("ADMIN_EMAIL") or "").lower()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:owner"
    attempts = await db.login_attempts.find_one({"identifier": identifier}, {"_id": 0})
    if attempts and attempts.get("count", 0) >= 5:
        locked_until = attempts.get("locked_until")
        if isinstance(locked_until, str):
            locked_until = datetime.fromisoformat(locked_until)
        if locked_until:
            if locked_until.tzinfo is None:
                locked_until = locked_until.replace(tzinfo=timezone.utc)
            if locked_until > datetime.now(timezone.utc):
                raise HTTPException(status_code=429, detail="Too many attempts — try again in 15 minutes")
    user = await db.users.find_one({"email": admin_email}, {"_id": 0})
    if not user or not verify_password(input.password, user.get("password_hash", "")):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {
                "$inc": {"count": 1},
                "$set": {"locked_until": (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()},
            },
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Incorrect password")
    await db.login_attempts.delete_many({"identifier": identifier})
    token = f"sess_{uuid.uuid4().hex}{uuid.uuid4().hex}"
    await db.user_sessions.insert_one({
        "user_id": user["user_id"],
        "session_token": token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie("session_token", token, httponly=True, secure=True, samesite="none", path="/", max_age=7 * 24 * 3600)
    return {"user_id": user["user_id"], "email": user["email"], "name": user.get("name"), "picture": user.get("picture")}

ALLOWED_IMAGE_TYPES = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}

@api_router.post("/admin/images")
async def upload_site_image(request: Request, slot: str = Form(...), file: UploadFile = File(...)):
    await require_admin(request)
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG or WebP images")
    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image must be under 10MB")
    path = f"{APP_NAME}/site/{slot}.{ALLOWED_IMAGE_TYPES[file.content_type]}"
    result = await put_object(path, data, file.content_type)
    await db.site_images.update_one(
        {"slot": slot},
        {"$set": {"slot": slot, "storage_path": result["path"], "content_type": file.content_type,
                  "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"slot": slot, "url": f"/api/files/{result['path']}"}

@api_router.get("/images")
async def public_images():
    docs = await db.site_images.find({}, {"_id": 0}).to_list(100)
    return {d["slot"]: f"/api/files/{d['storage_path']}" for d in docs}

@api_router.get("/files/{path:path}")
async def serve_site_file(path: str):
    record = await db.site_images.find_one({"storage_path": path}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    data, content_type = await get_object(path)
    return Response(
        content=data,
        media_type=record.get("content_type", content_type),
        headers={"Cache-Control": "public, max-age=300"},
    )

class SiteSettings(BaseModel):
    google_business_url: str = Field(default="", max_length=500)

@api_router.get("/settings")
async def get_settings():
    doc = await db.settings.find_one({"key": "site"}, {"_id": 0})
    return {"google_business_url": (doc or {}).get("google_business_url", "")}

@api_router.post("/admin/settings")
async def save_settings(input: SiteSettings, request: Request):
    await require_admin(request)
    url = input.google_business_url.strip()
    if url and not url.startswith("https://"):
        raise HTTPException(status_code=400, detail="Link must start with https://")
    await db.settings.update_one({"key": "site"}, {"$set": {"key": "site", "google_business_url": url}}, upsert=True)
    return {"google_business_url": url}

@app.on_event("startup")
async def startup_tasks():
    try:
        await init_storage()
        logger.info("Object storage initialized")
    except Exception:
        logger.error("Storage init failed", exc_info=True)
    try:
        await db.login_attempts.create_index("identifier")
        admin_email = (os.environ.get("ADMIN_EMAIL") or "").lower()
        admin_password = os.environ.get("ADMIN_PASSWORD")
        if admin_email and admin_password:
            existing = await db.users.find_one({"email": admin_email})
            if not existing:
                await db.users.insert_one({
                    "user_id": f"user_{uuid.uuid4().hex[:12]}",
                    "email": admin_email,
                    "name": "Clive",
                    "role": "admin",
                    "password_hash": hash_password(admin_password),
                    "created_at": datetime.now(timezone.utc),
                })
            elif not verify_password(admin_password, existing.get("password_hash", "")):
                await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
    except Exception:
        logger.error("Admin seed failed", exc_info=True)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()