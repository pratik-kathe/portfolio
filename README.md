# Pratik Kathe — Portfolio

A pixel-faithful, dependency-free replica of the Claude artifact portfolio,
built as plain **HTML + CSS + vanilla JS** with a login-gated **admin portal**
for editing all content — no build step, no framework, no backend.

## Run it

Open `index.html` directly, or serve the folder:

```bash
python3 serve.py        # dev server with no-cache headers → http://localhost:8077
# or: python3 -m http.server 8000
```

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, stats, about, selected work, skills, experience, education, hobby, contact |
| `work.html` | Work index — cards for every case study |
| `case-study.html?slug=…` | **Universal case-study template** — one URL, any study |
| `admin.html` | Client portal (login-gated content editor) |

## Admin portal

- Open `admin.html` → default password **`pratik@portfolio`** (change it under Settings).
- **Case studies** tab: add / edit / duplicate / reorder / delete. Each study has:
  hero chip, meta strip, outcomes, context, SVG solution panels (add/remove/reorder),
  decision stories, what's next, reflection, footer question.
- **Site** tab: every word on the home and work pages (hero, stats, about, skills,
  experience, education, certifications, hobby, contact, nav).
- **Settings** tab: export/import JSON, reset to original content, change password.
- Storage: `localStorage` key `pratik-portfolio.v1`
  (`{version, auth, site, caseStudies}`), seeded from `assets/js/seed.js` on first run.
- Password: salted SHA-256 (`pk.portfolio.salt:<password>`), session flag in `sessionStorage`.

## Architecture

```
index.html / work.html / case-study.html / admin.html
vendor/motion.min.js          Motion (Framer Motion's vanilla JS runtime), vendored
assets/css/style.css          design system + all page styles
assets/css/admin.css          portal styles
assets/js/seed.js             original site content (the reset target)
assets/js/store.js            data layer — localStorage CRUD, slugs, auth, import/export
assets/js/ui.js               shared markup — nav, cards, footers (built from data)
assets/js/animations.js       Motion wrappers — hero stagger, scroll reveals, parallax
assets/js/home.js             home page renderer
assets/js/work.js             work page renderer
assets/js/case-study.js       case-study template renderer
assets/js/admin.js            portal: login, schema-driven editors, settings
assets/img/                   optimized portrait, car, hero grid
_reference/                   extracted original artboards (fidelity reference only)
```

Everything the pages display comes from `Portfolio.Store`, so portal edits are
live immediately — no rebuild, no deploy.

## Motion

- **Entrances**: `[data-hero]` elements stagger in on first paint (0.5s, 0.07s apart).
- **Scroll reveals**: `[data-reveal]` elements fade/rise once via `Motion.inView`.
- **Parallax**: `[data-parallax="0.05"]` uses `Motion.scroll(Motion.animate(el, {y}))`
  on the browser's scroll timeline — algebraically the original centre-distance
  formula, clamped to ±60px, with no per-frame JS. rAF fallback if Motion is absent.
- **Page transitions**: internal links fade out (~160ms) before navigating.
- Initial hidden states only apply under the `.js` class (set in `<head>`), so
  no-JS and `prefers-reduced-motion` both show everything statically.
