# Design documentation — Pratik Kathe Portfolio

The visual and interaction system behind the site: quiet-luxury minimalism,
editorial typography, and motion that guides rather than decorates.
Companion to the engineering doc: [DEVELOPMENT.md](DEVELOPMENT.md).

---

## 1. Principles

1. **Content first, chrome never.** Pure-black canvas, hairline rules, zero
   shadows or gradients. Structure comes from type scale and spacing alone.
2. **Impact-first storytelling.** Case studies open with outcome numbers
   *before* the problem narrative — a deliberate deviation from the source UX
   template (which places the problem first), kept because senior/staff-level
   reads want the result first.
3. **Everything is data.** No copy is hard-coded in templates; every string
   renders from the store, so content edits never require code edits.
4. **Factual and NDA-safe.** No invented metrics, teams, testing rounds or
   testimonials. Visuals are abstracted wireframe SVGs — never real client
   screens or prototype links.
5. **Accessible by construction.** WCAG 2.1 AA everywhere, AAA on primary
   text/labels/nav — verified with axe (0 violations) and Lighthouse (100
   contrast).

## 2. Brand

- **Wordmark:** `PRATIK KATHE` — IBM Plex Sans 400, uppercase,
  `letter-spacing: 0.28em`. The serif experiment (Fraunces wordmark) was tried
  and rejected; the tracked-sans register reads quieter and more luxury.
- **Display type:** Fraunces — headings, pull quotes (editorial contrast).
- **Body/UI type:** IBM Plex Sans — running text, buttons, nav links.
- **Label/mono type:** IBM Plex Mono — kickers, meta labels, stats, section
  eyebrows (the “spec sheet” voice).
- Loaded via Google Fonts with `display=swap`; `system-ui` fallbacks keep the
  page readable pre-font-load.

## 3. Colour tokens

Defined once in `:root` (`assets/css/style.css` §1).

| Token | Value | Role |
|---|---|---|
| `--bg` | `#000000` | page canvas |
| `--panel` / `--frame` | `#0a0a0a` / `#050505` | raised panels, inset frames |
| `--fg` | `#f4f3ef` | headings — warm off-white, never pure `#fff` |
| `--body` / `--body-2` | `#c9c8c2` / `#d6d5d0` | running text |
| `--muted` / `--dim` / `--dimmer` | `#9e9d97` / `#9c9b95` | secondary text — ≥ 7:1 on black (AAA) |
| `--line` → `--line-4` | white 10 / 15 / 20 / 40 % | hairline borders, stepwise emphasis |
| `--wash` / `--wash-2` | white 3.5 % / 8 % | hover fills, image washes |
| `--solid` / `--solid-hover` / `--on-solid` | `#f4f3ef` / `#dcdbd6` / `#000` | primary button |

Rules:

- **No accent colour.** Hierarchy is tonal + typographic — the luxury/editorial
  cue is restraint, not hue.
- Every text/background pair meets AA (4.5:1); summaries, labels, nav and
  meta text are pushed to AAA (7:1) via the `--muted`/`--dim` family.
- Interactive affordance never relies on colour alone: hover adds
  underline/wash, focus adds a ring (§9).

## 4. Typography scale

| Role | Spec |
|---|---|
| Hero `h1` | Fraunces, `clamp(36px, 7.5vw, 96px)`, line-height 1.05, tracking −0.02em, max-width 900px |
| Case-study `h1` | Fraunces, `clamp(29px, 3.47vw, 56px)`, line-height 1.12 |
| Section `h2` | Fraunces, fluid `clamp()` between ~1.9–3rem |
| Body | IBM Plex Sans 16px base, line-height 1.5 (lead copy clamps up to 19–24px), measure ≤ ~640px |
| Kicker / labels / stats | IBM Plex Mono 12–13px, uppercase, tracked |
| Buttons | IBM Plex Mono (nav/compact) or Sans (primary), min touch height |

Content rules that pair with the type: case-study titles are **outcome-led**,
card blurbs **problem-first**, summaries ≤ 25 words, list items **verb-led**.

## 5. Layout & spacing

- Container `--max: 1160px`; copy grids `--max-copy: 900px`; solution panels
  `--max-solution: 1100px`; gutters `--pad-x: clamp(20px, 5vw, 40px)`.
- Hero top padding `clamp(36px, 5vw, 72px)` (tightened after brand review).
- Fluid everything: sizes use `clamp()` so no breakpoint jump is ever visible.
- Grids: stats (4-up), work cards (3-up → 1-up), case-study meta strip
  (definition grid), decision stories (2-col), solution panels (stacked).
- Single structural breakpoint: **820px** (hamburger takes over; see §10).

## 6. Components

| Component | Notes |
|---|---|
| **Nav** | Fixed blur-backed bar; wordmark left; links + hamburger ≤820px |
| **Buttons** | `btn--solid` primary, `btn--outline` secondary, `btn--sm`, `btn--copy` (copy-email → announces via `role="status"`) |
| **CTA arrows** | `aria-hidden` glyphs with hover/focus motion: `→` internal, `←` back, `↓` scroll, **`↗` external/new-tab** (all résumé CTAs — hero, contact footer, work footer bar) |
| **Chips** | Mono keyword tags (`chip--kw`) in hero + skills |
| **Work card** | Thumbnail (text-as-image SVG), outcome-led title, problem-first blurb, mono meta row. The whole card is one link — deliberately **no** inner `aria-label` (avoids axe `label-content-name-mismatch`) |
| **Meta grid** | Role / Team / Timeline / Tools / Platform / Status rows |
| **Outcomes** | Big-number impact strip (renders above the problem section — impact-first) |
| **“What I did”** | Verb-led deliverables list, placed directly after outcomes |
| **Decision stories** | Numbered challenge cards: title, lead, before, trade-off, what I did, what happened |
| **Quote** | Attribution-aware pull quote |
| **Footers** | Home contact (copy-email, LinkedIn, View Resume ↗) · slim work bar (Get in touch →, View Resume ↗, Back to top ↑) · case-study footer (outcomes recap, Email me, NDA-safe closing line) |

## 7. Motion

Engine: **Motion** (motion.dev, Framer’s open-source runtime), vendored at
`vendor/motion.min.js` — no CDN, no other animation library.
`assets/js/animations.js` drives everything:

| Moment | Behaviour |
|---|---|
| Hero | Staggered rise of `[data-hero]` items (initial `translateY(14px)`, opacity 0) |
| Sections | `[data-reveal]` fade-up (`18px`) when scrolled into view (`Motion.inView`) |
| Parallax | `[data-parallax]` scroll-coupled translation (about image), with a plain-scroll fallback if Motion is missing |
| Page change | Click-through fade to the next page; `pageshow` restores opacity |
| Hamburger | Quick morph to ✕ + menu links on a **40ms-per-item stagger** (≤ ~240ms total) |
| Arrows | Per-glyph hover/focus slide (§6) |
| Watchdog | A timeout force-shows any `[data-hero]`/`[data-reveal]` still hidden — **motion can never hide content** |

Hard constraints:

- `prefers-reduced-motion: reduce` → every behaviour above short-circuits to
  instant visibility; CSS collapses transforms, JS checks `reduced()` before
  any animation starts.
- The document gets `.js` from an inline script *before* first paint; all
  hidden-until-animated styles are scoped under `.js`, so a script failure
  degrades to fully visible content, never a blank page.

## 8. Content rules (design-adjacent)

- Titles outcome-led · blurbs problem-first · summaries ≤ 25 words ·
  lists verb-led · meta rows filled toward the full template set.
- **Never fabricate.** Missing facts mean the module is omitted (no testing
  tables, team rows or insight numbers without real inputs).
- NDA footer tail appears on every case study.
- Impact numbers stay above the problem section (impact-first opening).

## 9. Accessibility

- **Target:** WCAG 2.1 AA site-wide + AAA on primary text, labels, nav and
  summaries. Last audits: axe **0 violations**, Lighthouse **100 / 100 / 100**.
- Landmarks on every page (`header`/`nav`/`main`/`footer`), skip link, one
  `h1` per page, logical heading order.
- **Focus ring:** global `outline: 2px solid rgba(255,255,255,.85)`,
  `offset: 3px` on `:focus-visible` for links, buttons, inputs, selects,
  textareas, `[tabindex]` and cards.
- **Hamburger menu:** `aria-expanded` + `aria-controls`, quick animation,
  collapses ≤ 820px; keyboard-operable, Esc-closable.
- **Portal:** tabs are a WAI-ARIA tablist with roving `tabindex`; login errors
  `role="alert"`; copy-email announces via `role="status"`.
- Accepted limits (documented, owner-approved): uploaded videos need
  user-supplied captions (1.2.2); wireframe thumbnails are text-as-image
  (1.4.5 — inherent to showing UI work).

## 10. Responsive behaviour

- Fluid type/space via `clamp()`; body copy never below 16px.
- ≤ **820px:** inline nav → hamburger; hero actions stack; grids collapse to
  single column; solution panels stack full-bleed within gutters.
- Touch targets: hamburger `44×44`, primary buttons ≈49px tall, mobile menu
  links full-width with large display type (≥44px effective); every target
  meets WCAG 2.5.8 (≥24×24).

## 11. Imagery

- Case-study thumbnails and solution panels are **NDA-safe SVG wireframes**
  (text-as-image), never real hi-fi screens; prototype links are never
  published.
- One photographic portrait (about section); alt text describes content, pure
  decoration uses empty `alt`.
- All artwork ships inside the repo (`assets/img/`) — no external image hosts.
