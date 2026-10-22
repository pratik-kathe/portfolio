# Pratik Kathe — Joyride portfolio

Static site on GitHub Pages (`main` branch, served at https://pratik-kathe.github.io/portfolio/).
No build step, no framework. Pushing to `main` publishes within a few minutes.

## Files
- `index.html` — page markup: hero, chapters (Origins, Route, Case Studies, Under the Hood, Dashboard, Rear-view, Destination), HUD, case study overlay.
- `assets/js/case-studies.js` — **all case study content** (`window.CASE_STUDIES.projects`, in display order).
- `assets/js/joyride.js` — behaviour. The `CONFIG` block at the top holds contact links (`CFG`), chapters (`CH`), the Route turns (`TURNS`), the Under the Hood tags (`TOOLS`) and the Dashboard gauges (`GAUGES`). Milestone facts are in `MILES`; roadside discoveries in `FINDS`.
- `assets/css/joyride.css` — styles. Colour/font tokens are on `:root` at the top. From 1100px wide the case study grid shows two small cards per row in the left column, clear of the road (`#pits .cards`); each card switches its own text layout by its width (`@container card`).
- `assets/img/` — every image. Card thumbnails are `<id>-shot.webp`; case study header images are the `*-cover.webp` files.
- `case-study.html`, `work.html` — redirects so old links (`case-study.html?slug=…`) open the matching case study (`index.html#case-<slug>`).
- `motion/` — live prototypes for the motion case studies. `motion/player.js` rebuilds Figma Smart Animate from `motion/<name>/*_runtime.json` (layer trees, reactions) and `*_atlas*.webp` sprite sheets; `motion/app.js` builds the parts used by `motion` sections (stage, loops, curves, mobile, moments, grammar) and exposes `window.MOTION`. `joyride.js` loads both only when a case study with a `motion` section opens, and destroys the players on close. Bump the `?v=` on those two script URLs in `joyride.js` (`mountMotion`) when either changes. `motion/<name>/index.html` only redirects to the case study.
- Backup of the previous site: branch `backup-current-site`.

## Adding or editing a case study
Add an object to `projects` in `assets/js/case-studies.js`:
- Card: `id` (URL slug, a-z 0-9 -), `title` (short, shown big), `headline` (newspaper-style title: product + user problem + design intent; shown on the card and under the case study title), `client`, `category` (drives the filter chips), `year`, `color` (accent hex), `metric {value,label}`, `lap` (card footnote), `cover` (card thumbnail, visuals only, no text).
- Header: `hero` (detailed cover image with text), `summary`, `role`, `duration`, `team`, `platform`.
- `sections`: `text {kicker, heading, body}` (blank line = new paragraph), `image {heading, body, src, caption, size: normal|full|panel, notes:[{x,y,side,text}]}` (`panel` = tall screen beside its text; `notes` = numbered pins on the screenshot, x/y in % of the image, side l|r|t|b|c puts the pin left of/right of/above/below/on that point so it doesn't cover the element), `gallery {heading, items:[{src,alt}], caption, cols}`, `beforeafter {heading, before, after, beforeLabel, afterLabel, caption}`, `metrics {heading, items:[{value,label}]}`, `process {heading, steps:[{title,body}]}`, `quote {text, name, role}`, `list {heading, items:[…]}`, `decision {title, lead, before, options, tradeoff, action, result}`, `link {heading, body, url, label, url2, label2}`, `video {heading, body, src, poster, caption, alt, size: full|panel}` (muted loop), `embed {heading, body, src, ratio, title, caption, size: full|panel}` (iframe of a `motion/…` page or https URL; removed when the case study closes), `motion {kicker, heading, body, part, caption}` (a live prototype part from `motion/app.js`: fb-stage, fb-loops, fb-curves, fb-mobile, si-stage, si-moments, si-grammar).
- Card thumbnail (`cover`): `<id>-shot.webp`, 1600×1000 webp, no text: the product screens (cut out at their edges, soft shadow) on a dusk-to-night gradient with faint stars, a soft glow in the project colour and a row of yellow road dashes along the bottom. The card shows the whole image, uncropped (`.ccard .cov` in the CSS). When replacing a thumbnail, bump the `?v=` number on its `cover` path so browsers fetch the new file.

## Case study format
Motion case studies (category "Motion design": FuzzyBox, Sitare) are UI and motion only: idea, live prototype, numbers, the live component loops or timed moments, timing curves or transition grammar, and a gallery of screens. Everything plays inside the case study. No research or decision stories.

Other case studies follow the Decision Stories guide: hook (quote + the moment), problem in business terms, a "project at a glance" list (product, scope, users, constraints), a solution journey told as the user's thoughts with annotated screens, 3–5 decision stories (title, lead, before, options, trade-off, action, result), outcomes, iteration archive, UI system, reflection, future scope. Headings are specific to the project, not generic labels.

## Writing style
Plain, specific, active voice. Keep Pratik's own wording from his notes. "Design System" is capitalised. WCAG version is 2.2.

## Checking before pushing
After changing CSS or JS, bump the `?v=` number on the `joyride.css`, `case-studies.js` and `joyride.js` links in `index.html` so browsers load the new files. Run `python3 serve.py` (http://localhost:8077) or `python3 -m http.server`, check desktop and ~390px phone width, no console errors, then push to `main`.
Performance rules: don't write CSS variables on `:root` per frame, don't measure layout inside per-frame code, keep the road layers (`#lampsvg`, `#road`, `#trailsvg`, `#roadtop`, `#carsvg`) inside `#roadwrap`.
