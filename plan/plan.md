# Plan — Video Hero (fast) + Truehost Export

## What changes

### 1. Cinematic video hero — built for sub-second load
- The uploaded .webm clip becomes the full-screen hero background behind the headline, muted, looping, with a soft dark overlay for readability and a slow cinematic drift.
- **Speed rules (the priority):**
  - The clip is compressed now (not later): trimmed/looped cleanly, resized to 720p, stripped of audio, target ~1–3 MB.
  - A lightweight poster still (a real frame extracted from the video, ~100 KB JPEG) paints instantly — the visitor never waits.
  - The video itself only starts downloading after the page is already interactive, so first paint is governed by the poster, not the video.
  - The oversized logo file (currently ~570 KB) gets slimmed down.
- Result: hero visible in under a second on a normal connection; the moving video fades in behind it when ready.
- This supersedes the "fill the space / upscale to vector" edit comments — full-bleed by design (photos can't literally become vectors).
- The arch kitchen photo leaves the hero but stays in the portfolio and in the owner panel's photo slots; the owner panel hero slot will control the poster image.

### 2. Export path: Emergent → VS Code → Truehost (Option B, full independence)
The whole app — website, owner login, enquiries, photo manager — gets prepared so it runs on Truehost:
- **Code:** nothing about login/password is hardcoded; the owner password is a host setting, so it ships intact and can't leak from the export.
- **Database (the one thing Truehost must provide):** a free MongoDB Atlas cluster. The app already reads the database address from a config value — one setting to paste on Truehost.
- **Email + photo storage:** keep working through the existing Emergent integration key as long as that account stays funded. A later swap to a standalone Resend key is possible if full independence from Emergent services is ever wanted.
- **Deliverable:** an `EXPORT.md` in the project root with the exact step-by-step: build command, which folders go to Truehost, which settings to paste (database address, password, email key), and how to verify login works after upload.

## Decisions locked in (say so if any are wrong)
- Hosting route: **Option B** — everything moves to Truehost; Atlas supplies the database.
- Poster frame: **a frame taken from the video itself** (best visual match, zero extra download decision-making) — not the kitchen photo.
- Video compression happens now, before launch, not after.
- The lock button, password (Bossclive005), owner panel and all current features remain unchanged in behaviour.

## Out of scope this round
- Town landing pages, Wendy prices, Google listing URL (still pending paste-in by owner).
