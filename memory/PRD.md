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

## Status / Notes
- Testimonials remain SAMPLE/MOCKED content — awaiting real client quotes
- OWNER_EMAIL is the integration-test address; enquiries save to MongoDB and the email pipeline returns success (verified end-to-end), but they only reach Clive's real inbox once his email address is set
- No workshop video clips uploaded yet — living-photo motion used as stand-in
- Before/after floor photos are two different rooms (user-supplied)
- No auth

## Backlog
- P0: Replace OWNER_EMAIL with Clive's real email address (one env change + backend restart)
- P0: Real testimonials from past clients
- P1: Upload phone-shot workshop video clips → convert Ken Burns slots to autoplay muted loops
- P1: Matched before/after photo pair (same room, same angle) for the restoration slider
- P2: Google Business / Instagram link, service-area map
- P2: Admin view for saved enquiries (requires auth)
