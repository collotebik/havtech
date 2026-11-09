# Make the service line reduced-motion safe

- Status: TODO
- Finding: 2 — MEDIUM, accessibility and state communication
- Commit: `e8ec5cb`

## Goal

Respect `prefers-reduced-motion` without hiding the services the hero communicates. Users who opt out of motion should see a stable, complete service message; other users can keep the restrained typing treatment.

## Scope

- Include: `src/HaosHero.tsx` service state and the `.typing-service` caret style in `style.css`.
- Exclude: particle field behavior and global reduced-motion rules unrelated to the hero.

## Current behavior

File: `src/HaosHero.tsx`, lines 4–6

```tsx
const services=['Websites','Software','Systems'];
useEffect(()=>{ ... window.setTimeout(...); ... },[typed,deleting,index]);
```

The timer runs for every user, including reduced-motion users. The caret is also animated by `@keyframes typing-caret` at `style.css` line 807. Existing reduced-motion rules do not target this React-owned timer or caret.

## Implementation

1. Read `window.matchMedia('(prefers-reduced-motion: reduce)')` in the hero effect.
2. When reduced motion is active, skip the timer and render a stable sentence containing all three services (for example, “We build websites, software, and systems…”); keep the service list available to assistive technology.
3. Subscribe to the media query so changing the OS setting updates the stable/live mode without a reload.
4. Add a scoped reduced-motion rule for `.haos-container .typing-service i` that removes the caret animation and keeps the caret hidden or static.
5. Keep the live mode’s existing cadence unless a feel check shows the swap interrupts reading; do not introduce a second animation library.

## Verification

- With reduced motion enabled, confirm no timer-driven text swaps or blinking caret occur.
- Confirm all services remain readable and the line does not collapse or shift layout.
- Toggle the OS setting while the page is open and confirm the hero transitions to the appropriate mode.
- Test keyboard focus and screen-reader output for the CTA and heading.

## Boundaries

Do not remove the service content, change the copy outside the hero, or alter unrelated global `@keyframes` blocks.
