# Plan template

Create one file per selected finding. Replace every bracketed instruction and remove sections that truly do not apply. Keep the plan self-contained and specific to the repository.

````markdown
# [Short action-oriented title]

- Status: TODO
- Finding: [Audit finding number and severity]
- Commit: [short hash, or “unavailable”]

## Goal

[User-visible behavior to improve and why.]

## Scope

- Include: [specific files and behavior]
- Exclude: [nearby behavior that must not change]

## Current behavior

File: `[path]`, lines [n–m]

```[language]
[Small exact excerpt from the current source]
````

[Explain when the behavior occurs and the evidence for the finding.]

## Implementation

1. [Ordered, concrete edit]
2. [Next edit]

Use [existing token/configuration] as shown in `[exemplar path]`. Set [values] to [specific recommendation and rationale]. If source evidence does not support an exact value, state the intended relationship and leave the value to a documented feel check; do not invent a project-wide standard.

## Verification

- [Relevant interaction and state-change checks]
- [Reduced-motion and keyboard/focus checks, when applicable]
- [Visual feel check at appropriate speed, viewport, and device]

## Boundaries

[Files or behavior that should remain out of scope.]
```
