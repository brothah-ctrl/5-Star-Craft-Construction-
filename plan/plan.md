# Plan — Cursor-Reactive Hero Motion (no looped video)

## Objective
Replace the hero's looped-video concept with motion that reacts to the visitor's cursor. All movement stays behind the text and never covers or dims the headline, sub-line, or buttons.

## What changes

1. Video removed from the hero
   - The autoplay/loop video element is taken out of the hero entirely. No video plays behind the writing.
   - The "Hero video" upload card is removed from the owner panel's Photos tab, so Clive is not offered a control that no longer does anything.

2. Cursor-reactive motion becomes the hero's life
   - The 12 vertical glass slices react continuously to the cursor: slices nearest the cursor gently lift and brighten, fading with distance — a wave that follows the hand instead of a one-off hover split.
   - A soft gold light spot follows the cursor across the navy background (very low strength, like light catching timber).
   - The award badge keeps its existing 3D tilt-follow and slow float.
   - The whole motion layer keeps a slight 3D lean toward the cursor.

3. Writing never obstructed
   - All moving elements sit on layers strictly below the text and accept no clicks, so the words are always on top and always crisp.
   - A subtle dark scrim sits between the motion layer and the text, guaranteeing contrast at every cursor position.
   - Motion strength is capped so slices and light stay a background texture, never a distraction.

4. Unchanged
   - The masked line-by-line headline reveal, the two buttons (Request a Consultation / Explore the Portfolio), the scroll cue, and every section below the hero.
   - Mobile: no cursor exists, so the hero shows the calm navy + badge float only; nothing jumps or obstructs on touch.

## Decisions made (push back if unwanted)
- The looped-video hero idea is dropped entirely rather than kept as an option — the cursor-reactive motion replaces it, per this request.
- The backend video-upload capability is left in place but unused; only the owner-panel card is removed so nothing confusing shows.

## Done when
- Moving the cursor over the hero produces a visible, smooth reactive wave and light; the headline and both buttons remain perfectly readable at all times; nothing loops on its own; checked on desktop and phone widths.
