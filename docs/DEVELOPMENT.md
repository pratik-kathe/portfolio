# Development documentation — Pratik Kathe Portfolio

Engineering reference: architecture, data model, auth, the content portal,
the seed-safety workflow, QA and deployment.
Companion to the design doc: [DESIGN.md](DESIGN.md).

---

## 1. Overview

- **Stack:** plain HTML + CSS + vanilla JS. No build step, no framework, no
  backend, no npm. Motion (motion.dev) is vendored at `vendor/motion.min.js`.
- **Hosting:** GitHub Pages only — repo `pratik-kathe/portfolio`, branch
  `main`, served at `https://pratik-kathe.github.io/portfolio/`.
- **Content model:** every public string/section/study renders from
  `localStorage` (seeded from `assets/js/seed.js`), editable through a
  login-gated portal (`admin.html`).

## 2. Architecture & data flow

```
                    seed.js  (window.SEED — pristine content)
                        │ first run / reset / pristine-fingerprint hit
                        ▼
   localStorage["pratik-portfolio.v1"]  ◄──►  store.js  (db(), migrate(), auth)
                        │                          ▲
        ┌───────────────┼────────────────┐         │ login / CRUD / export-import
        ▼               ▼                ▼         │
   home.js          work.js       case-study.js  admin.js  (portal UI)
   ui.js            ui.js         case-study.js
        └── shared renderers: nav, cards, footers, icons (ui.js)
                        │
                animations.js  (Motion: hero stagger, reveals, parallax, page fade)
```

- `db()` is the single read path: parse stored JSON → pristine-seed
  fingerprint check → fall back to seed if shape is invalid → `migrate()` →
  cache. Writes go through `persist(d)` only.
- Renderers never touch `localStorage` directly — only via the
  `window.Portfolio.Store` API.

## 3. File map

| File | Responsibility |
|---|---|
| `index.html` / `work.html` / `case-study.html` | Page shells (landmarks, static head/meta, script order) |
| `admin.html` | Portal shell + **inline fallback login handler** (survives admin.js failing to load) |
| `404.html` | Not-found page |
| `assets/js/seed.js` | All original copy + 3 case studies; `window.SEED` |
| `assets/js/store.js` | localStorage store, v1→v2 migration, seed fingerprints, **auth** |
| `assets/js/ui.js` | Shared renderers: `nav`, `card`, `link`, `icons`, `contactFooter`, `workFooter`, `caseFooter`, `esc` |
| `assets/js/home.js` / `work.js` | Home & work page composition |
| `assets/js/case-study.js` | Universal case-study renderer (`?slug=`), block switch |
| `assets/js/animations.js` | Motion orchestration + reduced-motion/watchdog guards |
| `assets/js/admin.js` | Login gate, schema-driven Site/Case-studies/Settings editors |
| `assets/css/style.css` | Design tokens + every public component |
| `assets/css/admin.css` | Portal styles |
| `serve.py` | Local dev server, no-cache headers, port 8077 |
| `robots.txt` / `sitemap.xml` / `.nojekyll` | Crawling policy (admin disallowed), sitemap, Pages config |

Script order matters: `motion → seed → store → animations → ui → <page>`.

## 4. Data model

```jsonc
// localStorage key: pratik-portfolio.v1
{
  "version": 2,
  "auth": {
    "salt": "pk.portfolio.salt",
    "hash": "<legacy sha256(salt:password)>",   // pre-PBKDF2 verifier, upgrade path only
    "kdf":  { "iter": 600000, "authSalt": "…", "sessionSalt": "…", "verifier": "…" }
  },
  "site":        { meta, nav, hero, stats, about, work, skills,
                   experience, education, certifications, hobby, contact, footer },
  "caseStudies": [ { slug, order, metaTitle, shortTitle, category, heroChip, date,
                     title, cardLine, blurb, impact, summary, thumbnail,
                     metrics[], blocks[], footer:{question,tail}, …legacy keys } ]
}
```

- **v1 → v2:** legacy studies had fixed named sections; v2 replaced them with
  an ordered `blocks[]` array. `migrate()` runs on every read; studies below
  `DATA_VERSION` are converted once and persisted.
- Legacy keys are kept on the object as a safety copy; **renderers and the
  portal only read `blocks`**.

## 5. Blocks v2 — the universal case-study template

Eleven block types, rendered by the switch in `case-study.js`:

| Type | Renderer | Content |
|---|---|---|
| `meta` | `metaSection` | label/value grid (Role, Team, Timeline…) |
| `outcomes` | `outcomesSection` | heading + big-number items + note |
| `text` | `textSection` | label, heading, body (+`flush` rhythm flag) |
| `list` | `listSection` | heading + text items (used for **“What I did”**) |
| `panels` | `panelsSection` | label/heading/intro + SVG solution panels |
| `decisions` | `decisionsSection` | decision stories (before → trade-off → did → happened) |
| `image` | `imageSection` | figure with src/alt/caption |
| `video` | `videoSection` | `<video>` + user-provided captions track |
| `figma` | `figmaSection` | Figma embed placeholder (NDA-safe) |
| `quote` | `quoteSection` | pull quote + attribution |
| `html` | `htmlSection` | raw HTML passthrough (portal power-user escape hatch) |

**Invariants:** any type, any order, insertable anywhere (portal: add at
bottom, `↑/↓` reorder, `+ here` inserts after any section, per-block type
dropdown, Remove). `blocksFromLegacy()` fixes the opening rhythm:

```
meta → outcomes → list(“What I did”) → text(context) → meta(goals)
     → quote → panels → decisions → text(next, flush) → text(reflection, flush)
```

The `list` right after `outcomes` encodes the template rule *impact-at-a-glance
+ what I did* in the opening.

### Adding a block type (checklist)

1. `admin.js`: add a `BLOCKS[type] = { label, fields: [...], empty: {...} }` entry.
2. `case-study.js`: add `case "type": return typeSection(b);` + the renderer.
3. `store.js` (optional): map legacy fields → new type inside `blocksFromLegacy`.
4. Fingerprint rule below applies **only** if seed content changes.

## 6. Store API (`window.Portfolio.Store`)

```js
getSite, saveSite                     // whole-site content
list, get, save, create, remove,
duplicate, move, blank, slugify,
uniqueSlug                            // case-study CRUD + ordering
login(pw) → Promise<true|false|reject> // see §8
session() → bool   logout()   changePassword(oldPw, newPw) → Promise
exportJSON() → string   importJSON(text)   reset()
```

`login` semantics (never silent): resolves `true` (success), resolves `false`
(wrong password), **rejects** with an accurate `Error` (locked out, or a
browser/address without WebCrypto). Callers in `admin.js` and the inline
fallback both paint every path.

## 7. Seed safety — the fingerprint auto-reset

Published visitors get content from *their* localStorage, so shipping new seed
copy does nothing for returning readers unless their stored copy is proven
pristine. Mechanism (`store.js`):

1. Before editing **any** seed content: open the site, run
   `Store.reset()`, hash `localStorage["pratik-portfolio.v1"]`
   (djb2 + FNV-1a concatenated → 16 hex chars), append the hash to
   `OLD_SEED_HASHES` **first**.
2. Edit `seed.js`.
3. On read, a stored blob matching any registered hash is swapped for the new
   seed. Any user edit changes the hash → edited data is never touched.

Registered hashes (oldest → newest):

```js
["2433b7db13797edd", "36e301856980357f", "fabea60293a76e9c", "2769c408abaf22dc"]
```

## 8. Authentication & session security

Context: static hosting — the gate protects the **editing UI** (shared
machines, shoulder-surfing, casual visitors), not a server-side resource.
Anyone can still edit `localStorage` in their own browser; that is inherent to
GitHub Pages and is accepted/documented.

**Verifier**

- Active: **PBKDF2-SHA256, 600 000 iterations** (OWASP guidance), random
  128-bit `authSalt` per stored copy, stored as `auth.kdf.verifier`.
  Salts for the shipped seed were generated once; only salts + hashes live in
  the repo — **the plaintext password appears nowhere** (repo, docs, page).
- Legacy: `sha256("pk.portfolio.salt:" + password)` in `auth.hash` — verifies
  only pre-kdf stored copies; after one successful legacy login, `ensureKdf()`
  persists a fresh PBKDF2 verifier (transparent upgrade, random salts).

**Session**

- The old session was a constant flag (`sessionStorage = "1"`) — forgeable
  from the console without the password. Replaced by a **per-tab token**:
  `PBKDF2(password, auth.kdf.sessionSalt, iter)` (64 hex chars).
  `session()` accepts only that shape, so:
  - forging a session requires knowing the password (it must be *derived*),
  - old `"1"` sessions are rejected → one forced re-login after this change,
  - `sessionStorage` is per-tab → closing the tab logs out.

**Lockout**

- Failures are counted per tab (`pratik-portfolio.fails`): 5th failure locks
  for 30s, doubling per further failure, capped at 5 minutes; while locked,
  `login()` rejects immediately with *“Too many failed attempts — try again in
  Ns.”* Success resets the counter; `logout()` resets it too. (A console user
  can clear the key — that is deliberate; the point is the *form* can’t be
  brute-forced.)

**Password change** (`changePassword(old, new)`)

1. Verify `old` through the same `verifyPw()` path (kdf or legacy).
2. `newKdf(new)`: fresh random `authSalt` + `sessionSalt`, new PBKDF2 verifier.
3. Refresh the legacy hash too (keeps old JSON exports importable).
4. Re-derive the session token for the current tab.

**Repo hygiene:** the password exists only out-of-band; `README.md`, this doc
and all page copy were scrubbed (an old seed comment containing it was
rewritten). `admin.html` is `noindex` and `Disallow`ed in `robots.txt`.

## 9. The portal (`admin.html` + `admin.js`)

- **Schema-driven:** `SITE_SCHEMA` + per-block `BLOCKS` specs generate all
  inputs; no hand-written forms, so new fields are data, not UI code.
- **Tabs:** WAI-ARIA tablist, roving `tabindex`, `selectTab()` manages
  focus/selected state.
- **Drafts:** edits mutate an in-memory draft; save commits through the Store;
  export/import/reset operate on the whole blob (`exportJSON()` returns
  pretty-printed JSON).
- **Resilience:** if `seed.js`/`store.js`/`ui.js` fail to load, `admin.js`
  captures nulls safely and reports an accurate preflight error; the inline
  fallback in `admin.html` keeps the Sign-in button functional either way.
  Both handlers show **“Checking…”** (disabled button) during the PBKDF2
  derivation so the wait never looks like a dead click.

## 10. Motion engineering

See [DESIGN.md §7](DESIGN.md). Engineering invariants:

- Hidden-until-animated styles are scoped under `.js` (inline class set before
  first paint) → script failure = fully visible page.
- `animations.js` checks `prefers-reduced-motion: reduce` before every effect
  and exposes `ensureVisible()` + a watchdog timeout that force-shows any
  `[data-hero]`/`[data-reveal]` element — **content can never be lost to
  animation**.
- Parallax has a non-Motion fallback (plain scroll listener).

## 11. Local development

```bash
python3 serve.py     # http://localhost:8077 — no-cache headers on every response
```

- WebCrypto (`crypto.subtle`) requires a secure context: `https://` or
  `http://localhost`. `file://` or plain-IP opens get an accurate error, not a
  silent failure.
- No-cache headers mean a reload always shows current JS (unlike production).

## 12. Verification checklist (every change)

```bash
# syntax
for f in assets/js/*.js; do node --check "$f"; done

# runtime: serve, then in a browser
# 1. home renders, console clean (0 errors)
# 2. hamburger ≤820px: opens, animates, Esc closes, focus visible
# 3. case-study.html?slug=<each>: hero → meta → outcomes → list → … → footer
# 4. admin: wrong password → “Wrong password.” (and lockout after 5)
#    correct password → portal; reload → still logged in; logout → gate returns
# 5. axe-core: 0 violations (inject axe.min.js, axe.run(document, cb))
# 6. Lighthouse: 100 / 100 / 100 on home; re-run pages you touched
# 7. mobile ~390px: no horizontal scroll; tap targets ≥24px (WCAG 2.5.8) —
#    44px on the hamburger and primary buttons
```

Known accepted limits: uploaded videos need user-provided captions (1.2.2);
wireframe thumbnails are text-as-image (1.4.5).

## 13. Deployment & caching

1. `git push origin main`
2. GitHub Pages builds (~30–90 s; `.nojekyll` disables Jekyll).
3. Verify with **cache-busted** fetches — the edge/browser cache serves assets
   up to ~10 min (`max-age=600`):

```js
fetch("https://pratik-kathe.github.io/portfolio/?v=" + Date.now(), { cache: "reload" })
```

A plain (unbusted) fetch returning the new content means all caches have
caught up. Canonical URLs, OG tags and `sitemap.xml` must be updated together
when the custom domain lands (roadmap G3: add `CNAME` + rewrite URLs).

## 14. Content policy (enforced in review)

- Factual only: no fabricated employers, metrics, testimonials, teams or
  testing rounds. If a real fact isn’t supplied, its module stays absent.
- NDA-safe visuals only: abstracted wireframes, no real hi-fi screens, no
  prototype links, no client-confidential copy.
- CTA spelling is “View Resume” (label style); prose keeps “résumé”.

## 15. Roadmap / open items

- **G3 custom domain** — blocked on purchase; then `CNAME` + canonical/OG/sitemap URL pass.
- Template modules awaiting *real* inputs (do not invent): per-project team
  fields, iteration/testing tables, research insight cards, constraints line.
- Optional: base64 drag-and-drop image upload in the portal; testimonial quote
  blocks with attribution; reorder impact numbers below the problem section if
  exact PDF order is ever preferred.
