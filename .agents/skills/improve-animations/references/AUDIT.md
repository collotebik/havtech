# Motion audit criteria

Use these categories to guide inspection, not as a checklist that requires a finding in every category. Evaluate motion in its product context and follow explicit product requirements when present.

## 1. Purpose and frequency

- Does motion communicate a state change, preserve spatial context, indicate hierarchy, or provide useful feedback?
- Is motion added to frequent actions where it slows input or makes repeated use tiring?
- Is an important state change abrupt enough to confuse, and would a restrained transition clarify it?
- Does the interaction remain clear when animation is skipped or disabled?

## 2. Easing and duration

- Does the easing fit the action? Entry, exit, repositioning, and direct manipulation may need different curves.
- Do duration and distance feel proportionate? Are small controls delayed, or large movements cut short?
- Are existing project tokens or spring settings used consistently?
- Does `transition: all` animate unrelated properties or create accidental motion?

Do not impose a universal duration or curve. Recommend exact values only when supported by an existing project convention or an explicitly stated design requirement; otherwise describe the intended timing and require a visual feel check.

## 3. Physicality and origin

- Does movement begin at a plausible origin or anchor point?
- Do scale, opacity, and position changes work together without implying the wrong spatial relationship?
- Are transforms appropriate for the element’s size and role?
- Is motion restrained enough that easing, overshoot, or blur does not obscure content?

## 4. Interruptibility and state

- Can a transition reverse or retarget smoothly when the user changes direction?
- Do rapid repeated inputs leave UI state and visuals in agreement?
- Are exit transitions compatible with unmounting, focus changes, and navigation?
- Do gestures respond continuously to the user rather than playing a detached canned sequence?

## 5. Rendering performance

- Do animated properties cause avoidable layout or paint work?
- Are large or numerous elements animated at once?
- Could expensive filters, shadows, or blur create dropped frames on likely devices?
- Is JavaScript animation work necessary, or can the project’s native CSS or browser animation approach handle it?

Do not report a performance defect from property names alone when the impact depends on runtime. State the evidence and recommend profiling when needed.

## 6. Accessibility

- Is `prefers-reduced-motion` respected where motion is substantial or nonessential?
- Does disabling motion preserve state communication and usable controls?
- Do flashes, rapid movement, parallax, or auto-playing effects create avoidable discomfort?
- Do animated changes preserve focus, reading order, and assistive-technology state?

## 7. Cohesion and tokens

- Do similar interactions share coherent timing and easing?
- Are existing tokens followed, or have one-off values accumulated?
- Do page transitions and component transitions feel like the same product?
- Is a documented exception intentional and still relevant?

## 8. Missed opportunities

- Would a transition clarify an otherwise abrupt layout or content change?
- Would feedback help users understand that an action succeeded, failed, or is in progress?
- Is there a suitable rare moment for a small, meaningful moment of delight?

Keep these opportunities separate from defects. Avoid adding motion merely to make a static interface busier.
