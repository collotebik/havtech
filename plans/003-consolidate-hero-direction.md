# Consolidate the Havtek Signal hero

- Status: TODO
- Finding: 3 — MEDIUM, cohesion and maintainability
- Commit: `e8ec5cb`

## Goal

Turn the current hero into one intentional “Havtek Signal / Working Surface” composition: a mineral-white editorial field, left-aligned message rail, right-side vision-board image, and one orchestrated load reveal. Remove cascade ambiguity so future edits do not silently resurrect old dark, cosmic, flow, or robot treatments.

## Scope

- Include: `src/HaosHero.tsx`, the active hero rules in `style.css`, and the hero-specific mount boundary in `index.html` if needed.
- Exclude: pricing, FAQ, CTA, navigation, contact delivery, and legacy motion outside the hero.

## Current behavior

The component and stylesheet describe several competing directions:

- `src/HaosHero.tsx`, lines 7–15, renders the Haos grid, canvas particles, image panel, typing service, and bottom tagline.
- `style.css`, lines 765–811, define the original dark Haos grid, a flow animation, and multiple layout states.
- `style.css`, lines 916–962, append later dark and white overrides, duplicate `.haos-image` rules, and a `translateX(calc(-14% - 6cm))` content shift.
- `script.js`, lines 10–87, still contains a separate Three.js robot loop for `#rb`; this is a second motion owner even though the React hero now mounts into `.hr`.

The result is source-order-dependent: the last override wins, the visual intent is difficult to predict, and stale animation code remains adjacent to the active experience.

## Implementation

1. Establish a single hero block at the end of `style.css` (or a dedicated hero stylesheet imported after base styles) using the tokens in `plans/README.md`.
2. Keep the existing semantic content and CTA labels, but structure the layout as a two-part surface: a fluid left rail and a 28–34% right image panel. Replace the `6cm` transform with grid alignment and a bounded content measure; use a documented feel check for the final rail width.
3. Treat the supplied image as the only hero visual. Keep it static or apply only a very slow, low-amplitude image scale if a feel check proves it supports the message; do not combine it with a second flow, star, or robot effect.
4. Add one load sequence: metadata and heading reveal together, then the supporting line and actions. Use opacity/transform only, and gate it behind `prefers-reduced-motion`.
5. Retain the service typing from plan 002, but make the heading width stable so each word swap cannot move the CTA or image boundary.
6. Reconcile or remove stale hero selectors (`.haos-flow`, cosmic/ink hero variants, duplicate `.haos-image` and `.haos-container` overrides) only after confirming they are not used by another route. If the legacy `#rb` block is no longer referenced, retire it in a separate cleanup change rather than mixing that deletion into the visual pass.
7. Add explicit mobile rules: stack the image below the copy, keep the headline measure readable, and preserve a visible focus ring on the project CTA.

## Verification

- Compare the hero at 1440×900, 1024×768, 390×844, and 320×700; confirm the left rail is centered within its column rather than manually offset.
- Confirm the right image remains fully visible without cropping the focal area and that the tagline stays below the image only when the mobile stack requires it.
- Test `prefers-reduced-motion: reduce`; only the static composition should remain.
- Use keyboard navigation to verify focus order follows reading order and focus is visible over both mineral and dark surfaces.
- Profile the hero in DevTools with the tab hidden and with the hero scrolled away; combine with plan 001 before sign-off.

## Boundaries

This plan does not authorize changing the mailing server, page routing, FAQ image, pricing copy, or the global light/dark theme. Keep the current assets unless the user supplies a replacement.
