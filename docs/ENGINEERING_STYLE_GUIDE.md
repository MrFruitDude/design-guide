# Lumo Engineering Style Guide

This guide translates the Lumo Design Guide (docs/index.html) into actionable engineering conventions for building UI and UX that feel unmistakably Lumo. It is optimized for AI agents and humans: concise principles, concrete rules, and copy‑ready examples.

Sources: docs/index.html, docs/styles.css, docs/tokens.css, docs/main.js, docs/print.css, docs/STYLE_GUIDE.md.

## 1) Principles
- Clarity first: Prefer obvious choices, strong hierarchy, consistent affordances. Remove anything that doesn’t help someone decide or act.
- Warm minimalism: Generous spacing, soft contrast, brand color as highlight (not paint). Motion guides, never decorates.
- Trust by default: Accessible by design. Communicate state clearly. Offer undo or a safe path back.
- Voice: Warm, direct, helpful. Prefer verbs to nouns. Everyday words. Be concise and kind.

## 2) Design Tokens (authoritative)
Tokens live in docs/tokens.css and are the single source of truth for colors, type, spacing, radii, motion.

Color (light mode):
- --brand: #EE8380 (warm coral, highlight)
- --bg: #F5EFE8 (soft paper)
- --bg-elev: #ffffff
- --text: #1F1F1F
- --muted: #5f5f5f
- --border: color-mix(in oklab, var(--text) 12%, transparent)
- --shadow: 0 1px 2px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06)

Dark mode overrides (prefers-color-scheme: dark):
- --bg: #1F1F1F
- --bg-elev: #262626
- --text: #F5EFE8
- --muted: #c2c2c2
- --border: color-mix(in oklab, var(--text) 18%, transparent)
- --shadow: 0 1px 2px rgba(0,0,0,.3), 0 6px 20px rgba(0,0,0,.35)

Typography:
- Body: --size-body: 16px; --lh-body: 1.5; font: Inter (system fallbacks)
- Display scale: --size-display: 48px; --size-h1: 36px; --size-h2: 28px; --size-h3: 22px with corresponding line-heights
- Display font: Caveat for display/H1–H2; Inter for H3+, body, UI, data

Spacing & Radius:
- Spacing: --space-1..8 = 4, 8, 12, 16, 24, 32, 48, 64px
- Radius: --radius 14px; --radius-sm 10px; --radius-lg 24px

Motion:
- Easing: --ease-out: cubic-bezier(.18,.84,.44,1); --ease-in: cubic-bezier(.36,0,1,.34)
- Durations: --dur-fast: 150ms; --dur-med: 220ms; --dur-slow: 340ms
- Respect reduce motion: disable durations when prefers-reduced-motion is true

## 3) Layout & Structure
General:
- Use semantic HTML. Maintain logical heading order and focus order. Provide skip links.
- Favor clear two-column and grid layouts with generous space.

Patterns:
- Sidenav: Glass/blur card with brand, sticky inside. Active section highlighted as it enters viewport.
- Main content offset left padding when sidenav present.
- Sections: .section with .alt variant for subtle zebra striping; use .container to cap width.
- Cards: .card for elevated surfaces; .elevated variant for emphasis; keep dimensions consistent across variants.

Responsive:
- Collapse two-col and grid-3 to single column at ≤980px.
- Sidenav collapses at ≤900px with .nav-toggle control; main padding reduces.
- Adjust display size and swatch/icon grids at ≤720px.

Print:
- Use docs/print.css; hide interactive chrome, keep sections intact with break-inside: avoid.

## 4) Components
Buttons:
- Base .btn: border 1px var(--border), background var(--bg-elev), color var(--text), radius 12px, strong hover lift, fast transitions.
- Variants: .primary uses --brand with dark text; .ghost is transparent (on hover becomes brand); .danger is #EF4444 with white text; .small reduces padding and size.

Inputs:
- .field: grid with label (span), input, helper (small). Focus ring uses brand color mix; error state uses #EF4444 and clear helper text.
- Placeholder color muted using color-mix.

Switch:
- .switch uses rounded track with brand when checked, animated thumb via inset transition.

Tabs:
- .tabs container with .tab buttons; .is-active tab has elevated background and border.

Cards:
- Use .card for grouping; .elevated only when emphasis is necessary. Keep identical sizing across.

Iconography:
- Rounded forms, 2px strokes, solid fills at small sizes. Maintain consistent metaphors. Assets in docs/app_icons and root app_icons.

Swatches:
- Click-to-copy entire card. Show “Copied” badge via .swatch.copied::after.

## 5) Motion
- Purposeful micro-interactions; avoid decorative motion.
- Durations: 150–250ms for entrances; ease-out for in, ease-in for out.
- Reduce motion: if prefers-reduced-motion, zero durations; avoid animations.
- Example typing indicator: three dots with subtle bounce; disable animation for reduced motion.

## 6) Accessibility
- Contrast: Body text meets WCAG AA in both themes; verify interactive state combos.
- Structure: Semantic HTML, skip links, visible focus states, preserved focus order.
- Motion sensitivity: Respect reduce-motion and provide non-animated alternatives.
- Keyboard: All interactive components must be reachable and operable with keyboard; swatches are role=button, tabindex=0, Enter/Space activate.

## 7) Voice & Tone (for UI text)
Do:
- “Save changes”; “We’ll email you a receipt”; state the action first; prefer active voice; show empathy and offer recovery.
Don’t:
- “Persist configuration”; jargon. Be careful with jokes/cuteness.

## 8) Engineering Conventions
HTML structure:
- Use .container to cap width; .section groups; .eyebrow for section labels; use h2 for section titles with display font.
- .two-col and .grid-3 utilities for layout; collapse per breakpoints defined in styles.css.

CSS usage:
- Import tokens.css first and use token variables everywhere; never hardcode brand or neutrals except where specified (danger red #EF4444, info #0EA5E9, success #10B981, warning #F59E0B from color swatches).
- Prefer color-mix(in oklab, …) for subtle states and hover fills to maintain harmony across themes.
- Use box-shadow from --shadow; keep consistent radii; avoid bespoke shadows.

JavaScript behavior:
- Sidenav: toggle open via .nav-toggle; update aria-expanded accordingly.
- Active section tracking: IntersectionObserver with rootMargin '-30% 0px -60% 0px' and threshold 0.01; toggle .is-active on corresponding nav link.
- Tabs: Update .is-active on click; no content switching by default in gallery examples.
- Motion preference: On reduced motion, set --dur-fast/med/slow to 0ms at runtime.
- Click-to-copy: Assign role=button/tabindex=0 to .swatch, copy hex to clipboard, show transient .copied class; provide selection fallback on failure.

## 9) Color System & States
Core palette:
- Brand: #EE8380 (highlight for primary actions, links on hover in ghost, key accents)
- Backgrounds: Light #F5EFE8, Dark #1F1F1F, Elevated surfaces via --bg-elev
State colors (from docs/index.html swatches):
- Info #0EA5E9, Success #10B981, Warning #F59E0B, Error #EF4444
Usage rules:
- Use brand as accent/highlight; avoid saturating large surfaces.
- Buttons: Primary uses brand with dark text; ghost adopts brand on hover via higher specificity.
- Inputs: Focus ring blends brand with border using color-mix; error uses Error red.

## 10) Typography Rules
- Caveat for Display, H1, H2; Inter for H3, body, UI.
- Paragraphs: 1.5 line-height; keep Caveat lines short for readability.
- Type scale reference: Display 48/56 Caveat; H1 36/44 Caveat; H2 28/36 Caveat; H3 22/28 Inter; Body 16/24 Inter; Small 14/20 Inter.

## 11) Example: Minimal Page Skeleton
```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/docs/styles.css">

<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <aside class="side-nav" aria-label="Primary">
    <div class="side-inner">
      <a class="brand block" href="#top">
        <img src="/docs/assets/lumo-bear.png" alt="Lumo" class="brand-logo" />
        <div class="brand-text">
          <span class="brand-name">Lumo</span>
          <span class="brand-tag">Design Guide</span>
        </div>
      </a>
      <nav>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav">☰</button>
        <ul id="nav" class="nav-list vertical">
          <li><a href="#section-1">Section 1</a></li>
        </ul>
      </nav>
    </div>
  </aside>

  <main id="content" class="site-main with-sidenav">
    <section class="section">
      <div class="container two-col">
        <div>
          <h3 class="eyebrow">Intro</h3>
          <h2>Page title</h2>
          <p>Lead paragraph explaining the purpose.</p>
          <div class="row gap">
            <button class="btn primary">Primary</button>
            <button class="btn ghost">Ghost</button>
          </div>
        </div>
        <aside class="card">
          <h4>At-a-glance</h4>
          <ul class="tokens">
            <li class="has-color"><span class="left"><i class="swatch" style="background:#EE8380"></i><span>Brand</span></span><b>#EE8380</b></li>
          </ul>
        </aside>
      </div>
    </section>
  </main>

  <script src="/docs/main.js"></script>
</body>
```

## 12) Example: Button & Input
```html
<div class="row gap">
  <button class="btn primary">Primary</button>
  <button class="btn">Default</button>
  <button class="btn ghost">Ghost</button>
  <button class="btn danger">Danger</button>
</div>

<label class="field" style="max-width:360px">
  <span>Email</span>
  <input type="email" placeholder="name@domain.com" aria-invalid="true" aria-describedby="email-help"/>
  <small id="email-help"><b>!</b> Enter a valid email</small>
</label>
```

## 13) SwiftUI Adoption Notes (from docs/STYLE_GUIDE.md)
- Use conversational headers and card-based layouts inspired by onboarding.
- Standardize components such as SimpleTextEditor, InfoBulletPoint; extract into shared module.
- Anchor primary CTA with safeAreaInset on ScrollView; use capsule-like, full-width primary button with accent color.
- Keep spacing and radii aligned to tokens; keep interactions subtle and purposeful.

## 14) Checklists
UI build checklist:
- [ ] Tokens imported and used; no duplicate hardcoded colors
- [ ] Typography matches scale; Caveat used only for display/H1–H2
- [ ] Spacing follows --space-* scale; consistent radii
- [ ] Primary actions use brand accent; ghost hover adopts brand
- [ ] Focus states visible; keyboard operable; skip link present
- [ ] Motion subtle; respects reduce-motion
- [ ] Dark mode verified; contrast AA for text and interactive states

Copy checklist:
- [ ] Action-first, active voice
- [ ] Jargon minimized; everyday words
- [ ] Empathy and recovery paths included

## 15) Traceability
- Identity, Principles: docs/index.html#identity, #principles
- Typography: docs/index.html#typography; tokens.css
- Color: docs/index.html#color; tokens.css
- Components: docs/index.html#components; styles.css
- Icons: docs/index.html#iconography
- Motion: docs/index.html#motion; main.js; tokens.css
- Accessibility: docs/index.html#accessibility; styles.css
- Voice: docs/index.html#voice
- Resources: docs/index.html#resources
