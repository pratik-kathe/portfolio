# Pratik Kathe — Portfolio

A dependency-free design portfolio built as plain **HTML + CSS + vanilla JS**, with a
login-gated content portal and a universal case-study template. No build step, no
framework, no backend.

**Live:** https://pratik-kathe.github.io/portfolio/

## Contents

- [Run it](#run-it)
- [Pages](#pages)
- [Content portal](#content-portal)
- [Repository layout](#repository-layout)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Motion](#motion)
- [License](#license)

## Run it

```bash
python3 serve.py        # dev server with no-cache headers → http://localhost:8077
# or: python3 -m http.server 8000
```

Open `http://localhost:8077/` (or `/admin.html` for the portal).
Password checks use WebCrypto, which needs a secure context — `https://` or
`http://localhost` — so opening files via `file://` will not work for the portal.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, stats, about, selected work, skills, experience, education, hobby, contact |
| `work.html` | Work index — cards for every case study |
| `case-study.html?slug=…` | **Universal case-study template** — one URL renders any study |
| `admin.html` | Content portal (login-gated, `noindex`) |
| `404.html` | Not-found page with a way back |

## Content portal

Everything on the public pages is data: copy, sections and complete case studies
are rendered from `localStorage` (key `pratik-portfolio.v1`), seeded from
`assets/js/seed.js` on first run.

- **Case studies** tab — add / edit / duplicate / reorder / delete; sections can be
  any type in any order (text, lists, images, videos, Figma embeds, SVG panels,
  quotes, decisions, outcomes, next steps, reflections).
- **Site** tab — every word on the home and work pages.
- **Settings** tab — export / import JSON, reset to original content, change password.

**Access:** the portal password is deliberately **not stored anywhere in this
public repository**. It is shared out-of-band; change it under Settings after your
first sign-in.

**How the gate works** (details in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)):

- Password verifier: PBKDF2-SHA256, 600 000 iterations (OWASP guidance) with random salts.
- Session: a per-tab token *derived from the password* — not a forgeable constant flag.
- Failed attempts lock the sign-in form briefly (5 fails → 30 s, doubling, capped at 5 min).
- Legacy salted-SHA-256 stored data verifies once and is transparently upgraded to PBKDF2.

> **Static-hosting reality:** there is no server, so the gate protects the editing
> *UI* (e.g. on a shared machine) — anyone with the source can still edit
> `localStorage` in their own browser. Content lives client-side by design; that is
> the GitHub Pages constraint.

## Repository layout

```
index.html / work.html / case-study.html / admin.html / 404.html
serve.py                                    local dev server (no-cache headers)
vendor/motion.min.js                        Motion (Framer's runtime), vendored — no CDN
assets/css/style.css, assets/css/admin.css   design tokens + all component styles
assets/js/seed.js                           original content (the "pristine" seed)
assets/js/store.js                          localStorage store, auth, migrations
assets/js/ui.js                             shared renderers (nav, cards, footers, icons)
assets/js/home.js, assets/js/work.js        page renderers
assets/js/case-study.js                     universal case-study block renderer
assets/js/admin.js                          portal (login gate + schema-driven editors)
assets/img/                                 favicon, NDA-safe SVG artwork
docs/                                       design + development documentation
robots.txt, sitemap.xml, .nojekyll          crawling + GitHub Pages config
```

## Documentation

| Document | What it covers |
|---|---|
| [docs/DESIGN.md](docs/DESIGN.md) | Design system: brand, colour, type, spacing, components, motion, accessibility, responsive behaviour |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Architecture, data model, blocks v2, auth & session security, portal, seed-safety workflow, QA checklist, deployment |

## Deployment

GitHub Pages is the only host: push to `main` of `pratik-kathe/portfolio` and Pages
builds in ~30–90 s. Edge/browser caches can serve assets for up to ~10 minutes —
verify with a cache-busted fetch (`?v=<timestamp>`, `cache: 'reload'`) if the site
looks stale.

## Motion

- [Motion](https://motion.dev) (the open-source runtime behind Framer Motion) drives
  hero stagger, scroll reveals and parallax — **vendored locally** at
  `vendor/motion.min.js`; zero external animation libraries.
- Reveals only initialise when the document has `.js` (set before first paint), so a
  script failure never hides content, and everything collapses to instant visibility
  under `prefers-reduced-motion: reduce`.

## License

© Pratik Kathe. All rights reserved — no permission is granted to reuse this code or
its content. Case-study visuals are NDA-safe abstractions.
