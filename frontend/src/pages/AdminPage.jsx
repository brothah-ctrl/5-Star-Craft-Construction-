import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Lock, LogOut, ArrowLeft, Inbox, Upload, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/pages/LandingPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TABS = [
    { id: "enquiries", label: "Enquiries" },
    { id: "photos", label: "Photos" },
    { id: "settings", label: "Settings" },
];

const PHOTO_SLOTS = [
    { key: "hero", label: "Hero photo — top of page" },
    { key: "workshop2", label: "Studio update — large photo" },
    { key: "workshop1", label: "Studio update — small photo" },
    { key: "cabinetry", label: "Expertise — side photo" },
    { key: "kitchen", label: "Portfolio — Kitchen" },
    { key: "wardrobe", label: "Portfolio — Wardrobe" },
    { key: "bedside", label: "Portfolio — Nightstand" },
    { key: "headboard", label: "Portfolio — Headboard wall" },
    { key: "floorAfter", label: "Portfolio + Slider — Floor after" },
    { key: "floorBefore", label: "Slider — Floor before" },
    { key: "tiles", label: "Portfolio — Tiles" },
    { key: "floorTiles", label: "Portfolio — Polished tiles" },
    { key: "hinge", label: "Quote section — photo" },
    { key: "wendy1", label: "Wendy specials — main" },
    { key: "wendy2", label: "Wendy specials — second" },
    { key: "wendy3", label: "Wendy specials — third" },
    { key: "wendy4", label: "Wendy specials — fourth" },
];

export default function AdminPage() {
    const location = useLocation();
    const [auth, setAuth] = useState(location.state?.user ? true : null);
    const [user, setUser] = useState(location.state?.user || null);
    const [enquiries, setEnquiries] = useState([]);
    const [forbidden, setForbidden] = useState(false);
    const [tab, setTab] = useState("enquiries");
    const [photos, setPhotos] = useState({});
    const [uploading, setUploading] = useState(null);
    const [photoError, setPhotoError] = useState("");
    const [gbp, setGbp] = useState("");
    const [gbpSaved, setGbpSaved] = useState(false);
    const [gbpError, setGbpError] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (location.state?.user) return;
        if (window.location.hash?.includes("session_id=")) return;
        (async () => {
            try {
                const res = await fetch(`${API}/auth/me`, { credentials: "include" });
                if (!res.ok) throw new Error();
                setUser(await res.json());
                setAuth(true);
            } catch {
                setAuth(false);
            }
        })();
    }, [location.state]);

    useEffect(() => {
        if (!auth) return;
        (async () => {
            const res = await fetch(`${API}/admin/enquiries`, { credentials: "include" });
            if (res.status === 403) {
                setForbidden(true);
                return;
            }
            if (res.ok) setEnquiries(await res.json());
            const s = await fetch(`${API}/settings`);
            if (s.ok) setGbp((await s.json()).google_business_url || "");
        })();
    }, [auth]);

    const logout = async () => {
        await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
        setAuth(false);
        setUser(null);
        setEnquiries([]);
    };

    const login = async (e) => {
        e.preventDefault();
        setBusy(true);
        setLoginError("");
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Sign-in failed");
            setUser(data);
            setAuth(true);
        } catch (err) {
            setLoginError(err.message);
        }
        setBusy(false);
    };

    const uploadPhoto = async (slot, file) => {
        if (!file) return;
        setUploading(slot);
        setPhotoError("");
        try {
            const fd = new FormData();
            fd.append("slot", slot);
            fd.append("file", file);
            const res = await fetch(`${API}/admin/images`, { method: "POST", credentials: "include", body: fd });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Upload failed");
            IMAGES[slot] = data.url;
            setPhotos((p) => ({ ...p, [slot]: data.url }));
        } catch (err) {
            setPhotoError(err.message);
        }
        setUploading(null);
    };

    const saveGbp = async (e) => {
        e.preventDefault();
        setGbpSaved(false);
        setGbpError("");
        const res = await fetch(`${API}/admin/settings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ google_business_url: gbp }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) setGbpSaved(true);
        else setGbpError(typeof data.detail === "string" ? data.detail : "Save failed");
    };

    return (
        <div className="min-h-screen bg-[#F7F7F5] font-sans text-[#16233F]" data-testid="admin-page">
            <header className="border-b border-[#DEE2E8] bg-[#F7F7F5]/90 px-6 py-4 backdrop-blur-xl lg:px-12">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between">
                    <Link to="/" className="flex items-center gap-3" data-testid="admin-home-link">
                        <img src="/photos/logo-circle.png" alt="5 Star Crafts and Construction logo" className="h-9 w-9 rounded-full object-cover" />
                        <span className="font-serif text-lg font-semibold">Owner panel</span>
                    </Link>
                    {auth && user && (
                        <div className="flex items-center gap-4">
                            <span className="hidden text-sm text-[#55606E] sm:block">{user.email}</span>
                            <button
                                onClick={logout}
                                data-testid="admin-logout-button"
                                className="flex items-center gap-2 rounded-full border border-[#DEE2E8] px-4 py-2 text-sm transition-colors duration-300 hover:border-[#16233F]"
                            >
                                <LogOut className="h-3.5 w-3.5" /> Sign out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
                {auth === null && (
                    <p className="text-sm text-[#55606E]" data-testid="admin-loading">Checking your session…</p>
                )}

                {auth === false && (
                    <div className="mx-auto max-w-md rounded-[2rem] border border-[#DEE2E8] bg-white/60 p-10 text-center" data-testid="admin-signin-card">
                        <img src="/photos/logo-circle.png" alt="5 Star Crafts and Construction logo" className="mx-auto h-14 w-14 rounded-full object-cover" />
                        <h1 className="mt-6 font-serif text-3xl font-medium">Owner sign-in</h1>
                        <p className="mt-3 text-sm leading-relaxed text-[#55606E]">
                            Enter the owner password to manage enquiries, photos and settings.
                        </p>
                        <form onSubmit={login} className="mt-8 text-left">
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full rounded-xl border border-[#DEE2E8] bg-white px-4 py-3.5 pr-12 text-base outline-none transition-colors focus:border-[#B8912A]"
                                    data-testid="admin-password-input"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    aria-label={show ? "Hide password" : "Show password"}
                                    data-testid="admin-password-toggle"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#55606E]"
                                >
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {loginError && <p className="mt-3 text-sm text-red-700" data-testid="admin-login-error">{loginError}</p>}
                            <button
                                type="submit"
                                disabled={busy}
                                data-testid="admin-login-submit"
                                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#16233F] text-sm font-medium text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                            >
                                <Lock className="h-4 w-4" /> {busy ? "Signing in…" : "Sign in"}
                            </button>
                        </form>
                        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-[#55606E] hover:text-[#16233F]" data-testid="admin-back-link">
                            <ArrowLeft className="h-3.5 w-3.5" /> Back to the site
                        </Link>
                    </div>
                )}

                {auth === true && forbidden && (
                    <div className="mx-auto max-w-md rounded-[2rem] border border-[#DEE2E8] bg-white/60 p-10 text-center" data-testid="admin-forbidden">
                        <h1 className="font-serif text-2xl font-medium">Not an approved admin</h1>
                        <p className="mt-3 text-sm text-[#55606E]">
                            {user?.email} is signed in, but it isn't on the approved list for
                            viewing enquiries.
                        </p>
                    </div>
                )}

                {auth === true && !forbidden && (
                    <div data-testid="admin-enquiries">
                        <h1 className="font-serif text-4xl font-medium tracking-tight">Owner panel</h1>
                        <div className="mt-8 flex flex-wrap gap-2" data-testid="admin-tabs">
                            {TABS.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id)}
                                    data-testid={`admin-tab-${t.id}`}
                                    className={`rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                                        tab === t.id ? "bg-[#16233F] text-[#F7F7F5]" : "border border-[#DEE2E8] text-[#55606E] hover:border-[#16233F]"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {tab === "enquiries" && (
                        <div className="mt-10">
                        <p className="text-sm text-[#55606E]">
                            {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} received — newest first.
                        </p>
                        {enquiries.length === 0 ? (
                            <div className="mt-12 flex flex-col items-center rounded-[2rem] border border-dashed border-[#DEE2E8] p-16 text-center" data-testid="admin-empty">
                                <Inbox className="h-8 w-8 text-[#C9A227]" />
                                <p className="mt-4 text-sm text-[#55606E]">No enquiries yet — they'll appear here as they arrive.</p>
                            </div>
                        ) : (
                            <ul className="mt-10 space-y-5">
                                {enquiries.map((e) => (
                                    <li key={e.id} className="rounded-[1.5rem] border border-[#DEE2E8] bg-white/60 p-7" data-testid={`enquiry-row-${e.id}`}>
                                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                                            <p className="font-serif text-xl font-medium">{e.name}</p>
                                            <p className="text-xs uppercase tracking-[0.2em] text-[#B8912A]">{e.service}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-[#55606E]">
                                            {e.phone}{e.email ? ` · ${e.email}` : ""}
                                            {e.created_at ? ` · ${new Date(e.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}` : ""}
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-[#16233F]/85">{e.message}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
                        )}

                        {tab === "photos" && (
                            <div className="mt-10" data-testid="admin-photos">
                                <p className="max-w-xl text-sm leading-relaxed text-[#55606E]">
                                    Tap <strong>Change photo</strong> on any slot to replace that picture on
                                    the live site. JPG, PNG or WebP, up to 10MB — updates instantly.
                                </p>
                                {photoError && <p className="mt-4 text-sm text-red-700" data-testid="photo-error">{photoError}</p>}
                                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {PHOTO_SLOTS.map((slot) => (
                                        <div key={slot.key} className="rounded-[1.5rem] border border-[#DEE2E8] bg-white/60 p-4" data-testid={`photo-card-${slot.key}`}>
                                            <div className="overflow-hidden rounded-xl border border-[#DEE2E8]">
                                                <img
                                                    src={photos[slot.key] || IMAGES[slot.key]}
                                                    alt={slot.label}
                                                    loading="lazy"
                                                    className="h-40 w-full object-cover"
                                                />
                                            </div>
                                            <p className="mt-3 text-sm font-medium">{slot.label}</p>
                                            <label
                                                className="mt-3 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#16233F] text-sm font-medium text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-0.5"
                                                data-testid={`photo-button-${slot.key}`}
                                            >
                                                <Upload className="h-4 w-4" />
                                                {uploading === slot.key ? "Uploading…" : "Change photo"}
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className="hidden"
                                                    data-testid={`photo-input-${slot.key}`}
                                                    onChange={(e) => uploadPhoto(slot.key, e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === "settings" && (
                            <div className="mt-10 max-w-xl" data-testid="admin-settings">
                                <div className="rounded-[1.5rem] border border-[#DEE2E8] bg-white/60 p-7">
                                    <h2 className="font-serif text-2xl font-medium">Google Business Profile</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-[#55606E]">
                                        Paste your Google Business Profile link here when it's ready — the
                                        "Find us on Google" button on the site will use it instantly.
                                    </p>
                                    <form onSubmit={saveGbp} className="mt-6">
                                        <input
                                            type="url"
                                            value={gbp}
                                            onChange={(e) => { setGbp(e.target.value); setGbpSaved(false); }}
                                            placeholder="https://maps.app.goo.gl/…"
                                            className="w-full rounded-xl border border-[#DEE2E8] bg-white px-4 py-3.5 text-base outline-none transition-colors focus:border-[#B8912A]"
                                            data-testid="gbp-url-input"
                                        />
                                        {gbpError && <p className="mt-3 text-sm text-red-700" data-testid="gbp-error">{gbpError}</p>}
                                        <button
                                            type="submit"
                                            data-testid="gbp-save-button"
                                            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#16233F] px-8 text-sm font-medium text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-0.5"
                                        >
                                            Save link
                                        </button>
                                        {gbpSaved && (
                                            <p className="mt-4 flex items-center gap-2 text-sm text-[#B8912A]" data-testid="gbp-saved">
                                                <CheckCircle2 className="h-4 w-4" /> Saved — the site button now uses this link.
                                            </p>
                                        )}
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
