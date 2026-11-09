# Havtek hero plans

These plans describe a new hero direction and the motion work needed to make it feel deliberate, lightweight, and accessible. They are intentionally separate from application source; the animation-audit workflow does not implement fixes.

## Design direction

**Havtek Signal / Working Surface**: a bright mineral-white editorial canvas with a restrained teal ink system, one living green accent, and the supplied vision-board image as a narrow right-hand working surface. The hero should feel like a technology partner at work, not a generic SaaS landing page.

### Tokens

- Mineral: `#F7F7F2` — page/hero base
- Ink: `#123F4F` — primary type
- Slate: `#5B737A` — supporting copy and metadata
- Signal green: `#2D9A4B` — active service and primary action
- Rule: `#D5E1E3` — quiet structure
- Night: `#08110E` — dark CTA contrast

Use the existing Manrope family for interface copy and the existing Instrument Serif only for a short editorial accent, never for every heading. Keep the main measure under 80 characters and align the content to a clear left rail; the image is the counterweight, not a card.

### Wireframe

```text
TECHNOLOGY                 YEAR 2026
DIGITAL PARTNER            TECH SOLUTIONS
┌──────────────────────────────────────┬──────────────┐
│ HAVTEK / NAIROBI                      │              │
│ HavTek                                │  vision      │
│ We build Websites                     │  board       │
│ for businesses ready to move forward. │  image       │
│ [Start a project]  [View services]   │              │
│ BUILT FOR BUSINESS                    │              │
└──────────────────────────────────────┴──────────────┘
                         Your Haven for Tech Solutions
```

### Uniqueness review

The memorable choice is the right-side working surface plus the typographic left rail. Avoid adding floating SaaS cards, star fields, animated gradients, or a second decorative logo: they dilute the subject and repeat earlier rejected directions.

## Execution order

1. `001-pause-hero-particles.md` — stop the canvas loop when the hero is offscreen or the tab is hidden.
2. `002-reduced-motion-typing.md` — preserve the full service list for reduced-motion users and make the live swap optional.
3. `003-consolidate-hero-direction.md` — replace conflicting hero overrides with the Signal / Working Surface layout and one orchestrated reveal.

All plans are TODO and should be implemented in order. The current audit baseline is commit `e8ec5cb`.
