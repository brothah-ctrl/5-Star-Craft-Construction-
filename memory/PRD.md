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
- Kinetic hero: masked line-by-line serif headline reveal on load, arch-clipped parallax hero image, dual CTAs (dark walnut pill → WhatsApp; ghost pill → portfolio anchor)
- Floating sticky CTA (call + WhatsApp pill) visible on scroll
- Slow editorial marquee of the five disciplines
- Workshop bento: recent project update (Riverside Residence oak panelling) with spotlight photography and hover zooms
- Numbered manifesto chapters (01–05 disciplines) with hover micro-interactions, sticky intro column
- Testimonial wall (6 sample quotes from homeowners + architects)
- Dark walnut footer/contact section with WhatsApp + call CTAs, back-to-top
- Lenis momentum scrolling with anchor support; framer-motion section reveals throughout
- Page title/meta updated; all interactive elements have data-testids

## Status / Notes
- Testimonials and workshop project update are SAMPLE/MOCKED content
- Photos are stock stand-ins awaiting the user's real uploads (one-line swap in `IMAGES`)
- No backend/database features; no auth

## Backlog
- P0: Swap in Clive's real project photos when uploaded
- P1: Real testimonials from past clients
- P1: Full portfolio/gallery page or lightbox per project
- P2: Quote-request form that saves enquiries + email notification
- P2: Google Business / Instagram link, service-area map
