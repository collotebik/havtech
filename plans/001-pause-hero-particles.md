# Pause hero particles when not visible

- Status: TODO
- Finding: 1 — MEDIUM, rendering performance and continuity
- Commit: `e8ec5cb`

## Goal

Keep the hero particle field responsive while it is on screen, but stop its requestAnimationFrame loop when the hero is offscreen or the document is hidden. This reduces idle CPU/battery use on mobile and avoids motion continuing in a hidden hash-routed view.

## Scope

- Include: `src/HaosHero.tsx`, the canvas loop and its lifecycle.
- Exclude: particle appearance, colors, density, pointer interaction, and other page animations.

## Current behavior

File: `src/HaosHero.tsx`, line 5

```tsx
const draw=()=>{ /* update particles and links */ frame=requestAnimationFrame(draw) };
... draw();
return()=>{cancelAnimationFrame(frame); ...}
```

The loop is started on mount and only cancelled on unmount. It has no `document.visibilityState` check and no IntersectionObserver, so a mounted hero can continue doing work while hidden by routing or while below the viewport.

## Implementation

1. Add a `running` flag and `IntersectionObserver` on the canvas (observe the containing `.haos-container` when available).
2. Start the frame only when the document is visible and the hero intersects the viewport; cancel the pending frame when either condition becomes false.
3. Listen for `visibilitychange`; on return to visible, restart only if the observer still reports intersection.
4. Preserve the existing cleanup for resize and pointer listeners and disconnect the observer on unmount.
5. Profile once on a mid-range mobile viewport; keep the existing particle count unless profiling shows a separate issue.

## Verification

- Scroll the hero fully out of view and confirm the frame callback stops; return and confirm it resumes without a jump.
- Switch to another hash-routed page and back; confirm no duplicate loops are created.
- Hide and restore the browser tab; confirm no burst of catch-up motion occurs.
- Check pointer response and canvas resize at desktop and mobile widths.

## Boundaries

Do not change the visual palette, particle physics, typing copy, or legacy Three.js code in `script.js` as part of this focused fix.
