# Lumo Engineering Values & Design Principles

This document expresses the core values and guiding principles for building software that feels unmistakably Lumo. It is written for both engineers and AI agents: brief, opinionated, and actionable. It avoids implementation specifics of any single website or navigation pattern and focuses on the enduring foundations: values, principles, and essential tokens (type and color).

Sources of truth for implementation details remain: docs/tokens.css (tokens), docs/styles.css (patterns), docs/STYLE_GUIDE.md (product guidance). Consult those when turning these principles into concrete UI.

## 1) Core Values
- Clarity: Make it obvious what matters and what to do next. Reduce cognitive load. Default to sensible, visible choices.
- Warmth: Human, friendly, and calm. Use brand color as a highlight—not paint. Avoid visual aggression.
- Trust: Accessible by default. Communicate state clearly. Provide safe exits (undo, cancel, back) and avoid surprises.
- Respect: Honor user preferences (reduced motion, dark mode). Keep interactions polite and reversible.
- Efficiency: Favor simple systems and reusable primitives. Prefer tokens and shared components over bespoke one‑offs.

## 2) Design Principles
- Hierarchy first: Typography, spacing, and contrast communicate priority. Headlines guide; body explains; actions conclude.
- Restraint in styling: Subtle elevation and gentle motion support comprehension, never decoration.
- Consistency via tokens: Colors, type scale, spacing, radius, and motion live in tokens. Don’t hardcode ad‑hoc values.
- Accessible interaction: Every interactive element must be keyboard operable with visible focus and sufficient contrast.
- Responsive by intent: Layouts adapt gracefully. Single source of content, multiple contexts (mobile, desktop, print).
- Progressive enhancement: Baseline works without JS; interactivity improves with capabilities.
- Voice with empathy: Write like a helpful teammate—direct, brief, and kind.

## 3) Brand Typography
Primary families:
- Display: Caveat for expressive titles (Display, H1, H2) in short phrases. Use sparingly for emphasis.
- UI & Body: Inter for H3+, body copy, UI labels, and data.

Type scale (guideline):
- Display: 48/56 (Caveat)
- H1: 36/44 (Caveat)
- H2: 28/36 (Caveat)
- H3: 22/28 (Inter)
- Body: 16/24 (Inter)
- Small: 14/20 (Inter)

Principles for type:
- Line length: Keep display lines short for readability. Body ~60–80 characters.
- Line height: Body ~1.5 for comfortable reading across themes.
- Contrast: Ensure AA contrast minimums across light and dark modes.

## 4) Color Principles
Core palette (light mode guidance):
- Brand: #EE8380 (warm coral) — use as accent for primary actions and highlights.
- Background: #F5EFE8 (soft paper); elevated surfaces often white.
- Text: #1F1F1F primary; muted text for secondary metadata.
- Border: Derived from text via subtle mixes; avoid harsh lines.

Dark mode guidance:
- Backgrounds deepen (#1F1F1F base, #262626 elevated), text flips to light (#F5EFE8), borders strengthen slightly for clarity.

State colors:
- Info #0EA5E9, Success #10B981, Warning #F59E0B, Error #EF4444.

Principles for color usage:
- Accent, not flood: Use brand to draw attention, never as large background fields.
- Harmony: Derive subtle states with color-mix (prefer oklab) for hover/focus, so both themes stay coherent.
- Consistent shadows/radii: Use shared tokens for elevation and rounding; avoid bespoke variants.

Note: The canonical definitions for variables and their dark‑mode overrides live in docs/tokens.css. Treat tokens as the single source of truth.

## 5) Motion & States
- Purposeful motion: Use short, easing‑based transitions (150–250ms) to guide attention. No decorative animations.
- Reduced motion: When the user prefers reduced motion, minimize or remove animations and use instant state changes.
- Feedback: Communicate interactive state changes clearly (hover, focus, active, disabled). Prioritize affordance over flair.

## 6) Accessibility Commitments
- Structure: Semantic HTML, logical headings, and skip links for main content.
- Operability: Full keyboard support with visible focus indicators.
- Contrast: Meet or exceed WCAG AA for text and interactive states in both themes.
- Preferences: Respect user settings such as prefers-reduced-motion and color scheme.

## 7) Voice & Tone
- Do: Lead with the action, use active voice, keep it brief. “Save changes.” “We’ll email you a receipt.”
- Don’t: Jargon or cuteness that obscures meaning. Avoid jokes when clarity is paramount.
- Empathy: Offer recovery paths and explain consequences in plain language.

## 8) Working With Tokens (Implementation Guidance)
- Single source: Import docs/tokens.css first. Use token variables for color, type, spacing, radius, and motion.
- No ad‑hoc values: Avoid hardcoding brand or neutral colors. Use provided state colors where needed.
- Consistent surfaces: Use shared shadows and radii for elevation. Keep a restrained, coherent visual rhythm.

## 9) Checklists (Principle‑Aligned)
Design & Build:
- [ ] Uses tokens for all core styles (no duplicated ad‑hoc values)
- [ ] Typography follows the scale; Caveat limited to display/H1–H2
- [ ] Brand used as accent; states derived via color‑mix for coherence
- [ ] Accessible: keyboard operable, visible focus, skip link present
- [ ] Motion subtle and respectful of reduced‑motion
- [ ] Dark mode verified; AA contrast for text and interactive states

Copy:
- [ ] Action‑first, active voice
- [ ] Plain language; minimal jargon
- [ ] Clear recovery paths and expectations

## 10) Traceability
- Tokens (authoritative): docs/tokens.css
- Style rules and utilities: docs/styles.css
- Product and platform notes: docs/STYLE_GUIDE.md
- Reference site content: docs/index.html (for examples only; do not treat component layout rules as universal)