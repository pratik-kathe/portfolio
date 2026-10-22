# Pratik Kathe — Portfolio

**Smooth roads, not speed bumps.** The portfolio of Pratik Kathe, a senior product designer in Mumbai working on Design Systems, complex SaaS and WCAG 2.2 AA/AAA accessibility.

The site is told as a night drive. As you scroll, a red sedan drives down a winding road. Each chapter is a motorway exit with its own overhead sign, the sky turns from dusk to night, and there are roadside stops to play with along the way.

**Live:** <https://pratik-kathe.github.io/portfolio/>

Plain HTML, CSS and JavaScript. No framework, no build step, no backend.

## Contents

- [The drive](#the-drive)
- [Case studies](#case-studies)
- [Run it locally](#run-it-locally)
- [Editing content](#editing-content)
- [Repository layout](#repository-layout)
- [Deployment](#deployment)
- [Accessibility and motion](#accessibility-and-motion)
- [Performance notes](#performance-notes)
- [License](#license)

## The drive

| Exit | Chapter | What's there |
| --- | --- | --- |
| Start | **Ignition** | Hero, "Start the engine" button with engine sound |
| 01 | **Origins** | Background story, designer's licence card, trip log of roles and awards, chai stall |
| 02 | **The Route** | How I work, as six turn-by-turn directions; road works with draggable cones |
| 03 | **Case Studies** | Filterable case study cards that open into full write-ups; toll plaza |
| 04 | **Under the Hood** | Toolkit tags on a pegboard |
| 05 | **Dashboard** | Animated gauges for the headline numbers; fuel pump |
| 06 | **Rear-view** | Life off the clock, a garage of three cars, and a cow with right of way |
| Finish | **Destination** | Contact, LinkedIn and resume, plus trip stats |

The HUD at the bottom shows speed, distance and the current exit, with buttons for the horn, engine sound, a route menu to jump between exits, and a list of the **9 hidden things** to find on the drive (honk, chai, cones, toll, fuel, cow, number plate, turbo mode and reaching the finish). Progress on those is saved in the visitor's browser.

## Case studies

1. **Accessly: 3 hours to 30 seconds.** An accessibility audit platform that replaced two 30-column spreadsheets. It became a SaaS used by 100+ paying customers.
2. **Accessly Extension: 3 hours to 3 seconds.** A DevTools extension that tests logged-in pages a crawler can't reach and exports issues straight into Accessly.
3. **Accessly Lens.** A Figma plugin that audits a frame against WCAG 2.2 and fixes most issues in one click using the file's own colours.
4. **Accessly Components: accessible by default.** The Design System behind all three: 45 components and 849 variants where focus, error and disabled are designed states, built from small swappable parts with colour and spacing variables in Light and Dark.
5. **FuzzyBox: a website cut like a film.** UI and motion for a media studio site where every scroll is a camera move. 669 Smart Animate transitions; the prototype, its loops and its curves play live in the case study.
6. **Sitare: an app that moves like the night sky.** UI and motion for an astrology app in three parts (customer, Soul Sitare matchmaking, astrologer). 162 screens in one tappable prototype.

Each one opens as a full page over the road (`index.html#case-<id>`), with decisions, before/after comparisons, metrics and links to the live products. Visuals are NDA-safe.

The two motion case studies run their Figma prototypes live inside the case study, through `motion` sections. `motion/player.js` rebuilds Smart Animate from exported layer data (`motion/<name>/*_runtime.json`) and sprite sheets (`*_atlas*.webp`); `motion/app.js` builds the interactive parts. Both load only when one of these case studies opens. `motion/fuzzybox/` and `motion/sitare/` redirect to the case studies.

## Run it locally

```
python3 serve.py        # http://localhost:8077, sends no-cache headers
# or
python3 -m http.server 8000
```

Check desktop and a phone width of about 390px, and make sure the browser console has no errors before pushing.

## Editing content

| To change | Edit |
| --- | --- |
| Case studies (cards and full pages) | `assets/js/case-studies.js` |
| Email, LinkedIn and resume links | `CFG` at the top of `assets/js/joyride.js` |
| Chapter names and exit signs | `CH` in `assets/js/joyride.js` |
| The Route's six turns | `TURNS` in `assets/js/joyride.js` |
| Under the Hood tags | `TOOLS` in `assets/js/joyride.js` |
| Dashboard gauges | `GAUGES` in `assets/js/joyride.js` |
| Milestone markers along the road | `MILES` in `assets/js/joyride.js` |
| Hidden things to find | `FINDS` in `assets/js/joyride.js` |
| Page copy (hero, Origins, Rear-view, Destination) | `index.html` |
| Colours and fonts | Tokens on `:root` at the top of `assets/css/joyride.css` |
| Images | `assets/img/` |

### Adding a case study

Add an object to `projects` in `assets/js/case-studies.js`. Projects appear in the order they are listed.

- **Card:** `id` (URL slug, a–z, 0–9 and hyphens), `title`, `client`, `category` (drives the filter chips), `year`, `color` (accent hex), `metric {value, label}`, `lap` (footnote on the card), `cover` (card thumbnail).
- **Header:** `hero` (cover image), `summary`, `role`, `duration`, `team`, `platform`.
- **`sections`**, in any order:

| Type | Fields |
| --- | --- |
| `text` | `kicker`, `heading`, `body` (a blank line starts a new paragraph) |
| `image` | `heading`, `body`, `src`, `caption`, `size`: `normal`, `full` or `panel` (a tall screen beside its text) |
| `gallery` | `heading`, `items: [{src, alt}]`, `caption`, `cols` |
| `beforeafter` | `heading`, `before`, `after`, `beforeLabel`, `afterLabel`, `caption` |
| `metrics` | `heading`, `items: [{value, label}]` |
| `process` | `heading`, `steps: [{title, body}]` |
| `quote` | `text`, `name`, `role` |
| `list` | `heading`, `items: [...]` |
| `decision` | `title`, `lead`, `before`, `options`, `tradeoff`, `action`, `result` |
| `link` | `heading`, `body`, `url`, `label`, `url2`, `label2` (https links only) |
| `video` | `heading`, `body`, `src` (mp4), `poster`, `caption`, `alt`, `size`: `full` or `panel`. Plays muted on a loop, paused for reduced motion |
| `embed` | `heading`, `body`, `src` (a `motion/…` page or an https URL), `ratio`, `title`, `caption`, `size`: `full` or `panel` |
| `motion` | `kicker`, `heading`, `body`, `part` (`fb-stage`, `fb-loops`, `fb-curves`, `fb-mobile`, `si-stage`, `si-moments`, `si-grammar`), `caption`. A live prototype part from `motion/app.js` |

Card thumbnails follow the site's look: a dusk-to-night sky with stars, a road with yellow dashes, and the product UI centred in a thin grey frame with square corners. No text, 1600×1000 WebP, named `<id>-thumb.webp`.

## Repository layout

```
index.html                 the whole site: chapters, HUD and the case study overlay
assets/css/joyride.css     all styles; colour and font tokens on :root
assets/js/joyride.js       behaviour: road, car, HUD, roadside stops, case study renderer
assets/js/case-studies.js  all case study content
assets/img/                images, icons and the social preview image
motion/                    live prototypes for the motion case studies: player, parts and data
case-study.html, work.html redirects so older links still open the right case study
404.html                   not-found page
serve.py                   local dev server with no-cache headers
site.webmanifest, favicon.ico, robots.txt, sitemap.xml, .nojekyll
CLAUDE.md                  working notes for editing the site with Claude
```

The previous version of the site is kept on the `backup-current-site` branch.

## Deployment

GitHub Pages serves the `main` branch. Push to `main` and the live site updates within a few minutes. Browser and edge caches can hold old files for up to about 10 minutes, so reload with a cache-busting query (`?v=123`) if a change doesn't show.

## Accessibility and motion

- Every interactive stop works with a keyboard: the cones move with arrow keys, the fuel pump fills while Space or Enter is held, and Escape closes overlays.
- Before/after comparisons use a native range input, so they work with keyboards and screen readers.
- Decorative layers (road, sky, stars, car) are hidden from assistive technology.
- With `prefers-reduced-motion: reduce`, smooth scrolling, animations and confetti are switched off and the car follows the scroll directly.

## Performance notes

- The road is split into layers (`#lampsvg`, `#road`, `#trailsvg`, `#roadtop`, `#carsvg`) inside `#roadwrap`, so only the moving parts repaint. Keep them there.
- Don't write CSS variables on `:root` per frame, and don't measure layout inside per-frame code. Measurements are cached and refreshed on resize.
- Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis) from jsDelivr. Fonts come from Google Fonts.

## License

© Pratik Kathe. All rights reserved. No permission is granted to reuse this code or its content.
