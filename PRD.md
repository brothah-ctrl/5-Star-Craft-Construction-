# PRD — 5 Star — Crafts & Construction (Landing Page)

## Original Problem Statement
Build a light, open, spacious landing page for a bespoke carpentry and woodworking studio (originally named "Paperclip"; user renamed it to **5 Star — Crafts & Construction**). Modern, crafted, confident; for homeowners and architects who appreciate high-end craft. Bright off-white/soft linen background, warm oak/pale timber accents, generous breathing room, airy editorial layout. Strong hero with bold headline about custom craftsmanship, supporting line, two CTAs (consultation/quote + explore portfolio). Primary CTA = rich dark pill (deep walnut/charcoal). Trust section with recent workshop project update + testimonial wall covering custom cabinetry, architectural joinery, handcrafted furniture, spatial fitting, wood restoration. Crisp refined typography. Reactive visuals inspired by the Squarespace website-design page; award-worthy (Awwwards-level) motion: kinetic hero with masked line-by-line reveal, editorial marquee, framer-motion scroll reveals, lenis smooth scrolling, parallax hero moment.

## User Decisions (confirmed)
- Site name: **5 Star — Crafts & Construction**
- Primary CTA is a floating/sticky pill visible while scrolling, linked to Clive: phone `tel:+27840900658` and WhatsApp `https://wa.me/27840900658`
- User has real photos to upload later → current images are curated stock stand-ins (swap in `LandingPage.jsx` `IMAGES` export)
- Wants "all the reactive fun" from the Squarespace reference

## Architecture
- Frontend-only landing page (React 19 + Tailwind + framer-motion + lenis + react-fast-marquee). Backend untouched (FastAPI health endpoint intact).
- `src/pages/LandingPage.jsx` — assembles sections, exports `IMAGES`, `WHATSAPP_URL`, `PHONE_URL`, `PHONE_DISPLAY`
- `src/components/landing/` — Nav, Hero, MarqueeStrip, Workshop, Expertise, Testimonials, Footer, StickyCTA, Reveal (shared motion helpers)
- Design tokens: bg #F9F8F6 / #EAE6DF, ink #1A1A1A, walnut #2D241E, oak #B07D4A / #D4A373, wood-light #E3D5CA; Cormorant Garamond (headings) + Manrope (body); linen noise overlay

## User Personas
- Homeowners commissioning bespoke kitchens, staircases, furniture, restoration
- Architects/specifiers looking for reliable high-end joinery partners

## Implemented (2026-08-13)
- Kinetic hero: masked line-by-line serif headline reveal on load, arch-clipped parallax hero image (real photo: Constantia kitchen handover with Clive), dual CTAs (dark walnut pill → WhatsApp; ghost pill → portfolio anchor)
- Floating sticky CTA (call + WhatsApp pill) visible on scroll
- Slow editorial marquee of the five disciplines
- Workshop bento: real project update (pale oak headboard wall with floating nightstands) + ebony floor revival photo, hover zooms
- Portfolio gallery (id="portfolio", `Gallery.jsx`): 4 real projects in asymmetric grid with discipline chips, framer-motion lightbox (Esc/backdrop close), nav "Portfolio" link added
- Draggable before/after restoration slider (id="restoration", `BeforeAfter.jsx`): floor-before vs floor-after, pointer-drag handle, clip-path reveal
- Numbered manifesto chapters (01–05 disciplines) with hover micro-interactions, sticky intro column, real nightstand photo
- Testimonial wall (6 sample quotes from homeowners + architects)
- Dark walnut footer/contact section with WhatsApp + call CTAs, back-to-top
- Lenis momentum scrolling with anchor support; framer-motion section reveals throughout
- Page title/meta updated; all interactive elements have data-testids
- Real user photos stored in `/app/frontend/public/photos/` (kitchen.jpg, headset-crop.jpg, bedside.jpg, floor-before.png, floor-after.png); headboard source had screenshot UI icons cropped off

## Implemented (2026-08-13, batch 2)
- Project enquiry form (id="quote", `QuoteForm.jsx`): name/phone/email/service/message → POST /api/enquiries → saved to MongoDB `enquiries` + email via Emergent managed Resend proxy (server-side template, guardrail gate per playbook); success state + WhatsApp/call alternatives; hero "Request a Consultation" and nav "Get a Quote" scroll to it
- Workshop "living photo" slots (Ken Burns CSS motion): wardrobe mid-install + hinge install with "On the bench now" chips — ready to be swapped for autoplay muted video clips when supplied
- Gallery expanded to 6 real projects (added LED-lit fitted wardrobe, porcelain floor fitting — WhatsApp screenshot overlay cropped off tiles photo)
- New photos in `/app/frontend/public/photos/`: wardrobe.jpg, wardrobe-progress.jpg, hinge.jpg, tiles.jpg
- Backend env: EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, OWNER_EMAIL (currently the Resend test address delivered@resend.dev — MUST be replaced with Clive's real email); httpx added to requirements

## Implemented (2026-08-13, batch 3 — rebrand + SEO + mobile)
- Full rebrand to the client's navy (#16233F) + gold (#B8912A/#C9A227) identity from their brand image; all sections, email template, tailwind tokens updated
- Disciplines replaced with the client's seven trades (Joinery, Home Renovations, Painting & Tiling, Plumbing, Roofing & Fencing, Woodwork & Countertops, Deck Repairs & Shadeports) with lucide icons; marquee, quote-form services, gallery tags, footer updated to match
- Heading typeface changed Cormorant Garamond → Fraunces (distinctive editorial serif); body stays Manrope
- SEO: full meta/OG/Twitter tags, canonical, robots directives, JSON-LD HomeAndConstructionBusiness schema with 7 services + phone, robots.txt, sitemap.xml, llms.txt (AI discoverability), semantic single-h1 structure, descriptive alts
- Mobile-first: hamburger menu with animated dropdown on <md, stacked layouts verified at 430px, lazy-loading on all below-fold images, fetchPriority on hero image

## Implemented (2026-08-13, batch 4 — local SEO + Google Business)
- Service Areas section (id="areas", `ServiceAreas.jsx`): navy band with Garden Route copy, 7 area chips (Knysna, Plettenberg Bay, George, Wilderness, Sedgefield, Mossel Bay, Greater Western Cape), Google Business card with gold CTA; nav "Areas" link added
- GOOGLE_BUSINESS_URL constant in `LandingPage.jsx` — currently a Google search placeholder; replace with the real Business Profile URL when provided
- Local SEO: meta description/keywords now target Knysna/George/Plettenberg Bay/Garden Route; JSON-LD areaServed lists 6 Western Cape cities; llms.txt gained Service Areas block
- Note: public/index.html changes require `sudo supervisorctl restart frontend` to be served by the dev server

## Implemented (2026-08-21, batch 5 — logo + Wendy specials)
- Header logo replaced with the client's uploaded mark (`/photos/logo-circle.png`): gold star in navy circle, cropped clean from the square upload, no text/tagline, alt "5 Star Crafts and Construction logo", used as favicon + apple-touch-icon too
- Wendy House Specials subsection inside the "Inside the studio" section (`WendySpecials.jsx`): "NEW EXCLUSIVE SPECIALS" heading, client's exact copy, 4 uploaded Wendy photos in a responsive feature gallery (main + two stacked + full-width), cream #F7F4ED card with gold #D9A441 borders/shadows, Josefin Sans, "View Wendy Houses" button → #quote
- Josefin Sans added to font stack (index.css import, index.html link, tailwind `font-josefin`)
- Verified at desktop (1920), tablet (834) and mobile (430) — layouts stack correctly, images keep aspect (object-cover), no distortion

## Implemented (2026-08-24, batch 6 — inbox + Google sign-in)
- OWNER_EMAIL set to clivemudzengi57@gmail.com — enquiry emails now land in Clive's real Gmail (verified email_sent:true)
- IMPORTANT: both .env files were wiped by an environment restart and were recreated (backend: MONGO_URL, DB_NAME, CORS_ORIGINS, EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, OWNER_EMAIL, ADMIN_EMAILS; frontend: REACT_APP_BACKEND_URL, WDS_SOCKET_PORT)
- Emergent-managed Google sign-in: /api/auth/session (exchange), /api/auth/me, /api/auth/logout, sessions in db.user_sessions (7-day expiry, httpOnly cookie, samesite none)
- Admin page at /admin (AdminPage.jsx + AuthCallback.jsx): Google sign-in button, whitelist via ADMIN_EMAILS, enquiry list newest-first, sign out; "Owner sign-in" link in site footer
- Navbar: company name restored beside logo — "5 Star" / "Craft & Construction"
- Test session per /app/auth_testing.md; credentials in /app/memory/test_credentials.md

## Implemented (2026-08-24, batch 7 — owner panel + photo manager + GBP-ready)
- Owner login is now a discreet floating lock button (bottom-left, blends in) opening a password modal; password auth via bcrypt hash in DB (seeded from ADMIN_PASSWORD env, re-seeds on restart), brute-force lockout (5 attempts / 15 min), session cookie reuses user_sessions infra
- Owner panel (/admin) reworked with tabs: Enquiries, Photos, Settings. Photos tab: 16 clearly-labelled image slots (hero, studio, portfolio, slider, wendy, quote) with thumbnails + big mobile-friendly "Change photo" buttons → uploads to Emergent object storage (5star-crafts/site/{slot}), overrides stored in db.site_images, landing page merges overrides on load via GET /api/images; files served via GET /api/files/{path}
- Settings tab: Google Business Profile URL field saved to db.settings; landing "Find us on Google" button reads it live via GET /api/settings (falls back to search placeholder until set)
- Footer "Owner sign-in" link removed (replaced by FAB); Wendy photos moved into IMAGES slots; "Wendy Houses" added to quote-form services
- /api/auth/me no longer leaks password_hash; bcrypt added to requirements; EMERGENT_LLM_KEY + ADMIN_EMAIL + ADMIN_PASSWORD + APP_NAME added to backend/.env

## Implemented (2026-08-24, batch 8 — Knysna SEO pivot + password change)
- Services re-messaged to the client's official list: Kitchen units, Built-in cabinets, Wardrobes, Coffee tables, Wooden flooring, Shelving, General carpentry work, Tiling, Painting, Custom interior spaces & renovations — across Expertise (10 icon rows, new heading "Creating beautiful spaces, built around you."), marquee, quote-form dropdown, gallery tags, service-areas copy, footer
- Brand message "Creating beautiful spaces, built around you." now in hero support copy + services heading + llms.txt + meta
- SEO targets baked into title, description, keywords, OG/Twitter, JSON-LD (knowsAbout + OfferCatalog), image alts: carpentry services in Knysna, custom kitchens Knysna, built-in cupboards and wardrobes, bespoke furniture Garden Route, wooden flooring and shelving, tiling and painting services, home renovations Knysna, custom carpentry and construction
- New uploads: crisp new star logo PNG → logo-circle.png regenerated; "after tiling" photo added as 7th portfolio piece (floorTiles slot, also in owner panel photo manager)
- Owner password changed to Bossclive005 (old password verified rejected, new one verified working)
- OPS NOTE: dev server caches public/index.html via webpack filesystem cache — if meta/HTML edits don't serve, `rm -rf /app/frontend/node_modules/.cache && sudo supervisorctl restart frontend`

## Status / Notes
- Testimonials remain SAMPLE/MOCKED content — awaiting real client quotes
- OWNER_EMAIL is the integration-test address; enquiries save to MongoDB and the email pipeline returns success (verified end-to-end), but they only reach Clive's real inbox once his email address is set
- No workshop video clips uploaded yet — living-photo motion used as stand-in
- Before/after floor photos are two different rooms (user-supplied)
- No auth

## Backlog
- P0: Real testimonials from past clients
- P0: Real Google Business Profile URL (GOOGLE_BUSINESS_URL constant in LandingPage.jsx is a search placeholder)
- P1: Upload phone-shot workshop video clips → convert Ken Burns slots to autoplay muted loops
- P1: Matched before/after photo pair (same room, same angle) for the restoration slider
- P2: Town landing pages (Joinery in Knysna etc.) for local SEO
- P2: Admin page extras — mark enquiry replied/archived, email reply shortcut
