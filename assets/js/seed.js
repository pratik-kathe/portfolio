/* ==========================================================================
   seed.js — the original content of the site
   First run copies this into localStorage; from then on the admin portal
   (admin.html) is the source of truth. Resetting in the portal restores this.
   ========================================================================== */
(function () {
  "use strict";

  // Legacy password verifier: sha256("<salt>:<password>"). Kept only to verify
  // stored copies made before PBKDF2 existed; the active verifier is auth.kdf.
  var DEFAULT_HASH =
    "7a768ad6aad06ffc44a2fc98db53968062e7779ffb70bc8aff23486b6ede7107";

  var SITE = {
    meta: {
      title: "Pratik Kathe — Senior Product Designer, Mumbai",
      description:
        "Senior product designer in Mumbai — design systems, complex SaaS and WCAG 2.1 AA/AAA accessibility. Full case studies, résumé and contact."
    },

    nav: {
      brand: "Pratik Kathe",
      items: [
        { id: "work", label: "Work", href: "work.html" },
        { id: "about", label: "About", href: "#about" },
        { id: "skills", label: "Skills", href: "#skills" },
        { id: "experience", label: "Experience", href: "#experience" },
        { id: "contact", label: "Contact", href: "#contact" }
      ]
    },

    hero: {
      eyebrow: "Senior Product Designer — Mumbai, India",
      title: "Designing accessible products people can actually use.",
      subtitle:
        "4.5+ years shipping SaaS products — with WCAG 2.1 AA/AAA accessibility built into the system, not bolted on at the end.",
      chips: ["Design systems", "WCAG 2.1 AA/AAA", "Figma", "SaaS"],
      primary: { label: "View all case studies", href: "work.html" },
      secondary: {
        label: "View Resume",
        href: "https://drive.google.com/file/d/1d7Ra3NSomWC0fbyTPTJzQL6VQWsJoM9k/view?usp=drive_link"
      },
      showDeco: true,
      decoSrc: "assets/img/hero-grid.png",
      parallaxSpeed: 0.05
    },

    stats: [
      { value: "4.5+", label: "years across SaaS, fintech, e-commerce & automotive" },
      { value: "AA/AAA", label: "WCAG 2.1 built into the system, from day one" },
      { value: "2×", label: "company awards — Maverick Performer & Rising Star" },
      { value: "99%", label: "client satisfaction across B2B & B2C work" }
    ],

    about: {
      heading: "About",
      paragraphs: [
        "I'm a senior product designer with 4.5+ years shipping accessible digital products for global clients — from architecting Figma design systems from scratch to leading end-to-end design for consumer and B2B products. My work sits where interface craft meets inclusive design: technically feasible, documented, and built to hold up in production.",
        "What I go deep on is WCAG 2.1 AA/AAA — not as an audit, but as structure baked into components and tokens — alongside the systems thinking and AI-assisted workflows modern product teams are hiring for. I'm currently open to Senior Product Designer and UI/UX roles, globally."
      ],
      image: {
        src: "assets/img/portrait.jpg",
        alt: "Portrait of Pratik Kathe, smiling, adjusting his tie"
      },
      parallaxSpeed: 0.04,
      details: [
        { label: "LOCATION", value: "Mumbai, India" },
        { label: "FOCUS", value: "Design systems & accessibility" },
        { label: "CURRENT ROLE", value: "UI/UX & Product Designer, BarrierBreak" },
        { label: "OPEN TO", value: "Senior Product / UI/UX roles, globally" }
      ]
    },

    principles: {
      heading: "How I work",
      intro: "Four habits that show up in every case study below.",
      items: [
        { title: "Decisions, not process theatre", body: "Each case study leads with the call: what I chose, what I traded away, and why. Frameworks don't survive production — decisions do." },
        { title: "Accessibility as structure", body: "A checklist catches what someone remembers. I encode contrast, focus and error states into components, so the accessible version is the only version." },
        { title: "Systems over screens", body: "I design the machine that makes the next ten screens faster — tokens, documented states, annotated specs — then stay embedded through build." },
        { title: "AI-assisted, judgment-led", body: "AI handles synthesis, variants and first drafts. Taste, trade-offs and accountability stay human — that's where the value is." }
      ]
    },

    work: {
      heading: "Selected work",
      intro:
        "Two engagements, two problems — an accessibility platform rebuilt out of spreadsheets, and a Figma plugin that catches issues before design sign-off. Each opens into a full case study: the call, the trade-off, and what happened next.",
      cta: { label: "View all case studies", href: "work.html" },
      limit: 3
    },

    workPage: {
      heading: "Selected work",
      intro:
        "Two full case studies — the problem, the calls I made, and what happened after. Skimmable in three minutes; worth reading in ten."
    },

    skills: {
      heading: "Skills & tools",
      groups: [
        {
          title: "Design systems & accessibility",
          items: ["Design Systems", "Design Tokens", "Component Documentation", "WCAG 2.1 AA/AAA", "Inclusive Design", "Accessibility Auditing"]
        },
        {
          title: "Product & UX",
          items: ["Product Design", "UI/UX Design", "User Research", "Interaction Design", "Wireframing", "Prototyping", "Design Thinking", "Responsive Web Design"]
        },
        {
          title: "Domains",
          items: ["B2B SaaS", "Fintech", "E-commerce", "Mobile Apps", "Data Dashboards", "Branding"]
        },
        {
          title: "Tools & AI",
          items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "HTML & CSS", "AI-assisted workflows"]
        }
      ]
    },

    experience: {
      heading: "Experience",
      items: [
        { period: "Jan 2024 — Present", role: "UI/UX & Product Designer", org: "BarrierBreak · Mumbai, India · Hybrid" },
        { period: "Apr 2023 — Jan 2024", role: "UI/UX Designer", org: "CLXNS Technologies Pvt Ltd · Mumbai, India" },
        { period: "Aug 2021 — Aug 2022", role: "UI/UX Designer", org: "Sankey Solutions · Mumbai, India · Remote" }
      ]
    },

    education: {
      heading: "Education",
      items: [
        { line1: "Bachelor of Engineering — Information Technology", line2: "Sir Visvesvaraya Institute of Technology, Nashik", line3: "Jul 2017 — May 2020" },
        { line1: "Diploma — Mechanical Engineering", line2: "Amrutvahini Polytechnic, Sangamner", line3: "Jul 2013 — May 2017" }
      ]
    },

    certifications: {
      heading: "Certifications & recognition",
      items: [
        { line1: "UI/UX Design Bootcamp", line2: "DesignBoat UI/UX School", line3: "Issued May 2021" },
        { line1: "Maverick Performer of the Year", line2: "BarrierBreak · 2024", line3: "" },
        { line1: "Rising Star of the Year", line2: "Sankey Solutions · 2022", line3: "" }
      ]
    },

    hobby: {
      label: "OFF THE CLOCK",
      heading: "Cars — the other system I obsess over.",
      body:
        "Outside of interfaces, I spend my downtime around cars — reading up on builds, tracking releases, and appreciating how much of good automotive design is the same discipline as good product design: every dial, curve and control earning its place.",
      image: {
        src: "assets/img/car.jpg",
        alt: "Side profile of a dark grey sedan, photographed against a black background"
      },
      parallaxSpeed: 0.04
    },

    contact: {
      heading: "Open to Senior Product Designer and UI/UX roles, globally.",
      text:
        "Questions about a decision in the work below? Email is the fastest way to reach me — I'm happy to talk through the reasoning.",
      email: "kathepratik29@gmail.com",
      linkedin: "https://www.linkedin.com/in/pratik-kathe-86763b1b9/",
      resume:
        "https://drive.google.com/file/d/1d7Ra3NSomWC0fbyTPTJzQL6VQWsJoM9k/view?usp=drive_link"
    },

    footer: {
      note: "© 2026 Pratik Kathe — Mumbai, India",
      topLabel: "Back to top ↑",
      workCta: "Get in touch →"
    }
  };

  /* ---- case studies ------------------------------------------------------ */

  /** Card thumbnail: NDA-safe wireframe-style SVG shipped as a data-URI —
      16:10, same palette as the case-study panels (no real client screens). */
  function thumb(inner) {
    return "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">' +
      '<rect width="640" height="400" fill="#0a0a0a"/>' + inner + "</svg>"
    );
  }

  /* Reserved slot for a UI screen that hasn't been uploaded yet: the label
     names the screen so the space stays visible in the layout. Replace the
     block with { type:"image", src, alt, caption, width } once the file is in
     assets/img/ — or paste the src straight into the html. */
  function pendingSlot(label, note) {
    return '<figure class="cs-pending"><div class="cs-pending__box">' +
      '<span class="cs-pending__label">' + label + "</span>" +
      '<span class="cs-pending__meta">' + (note || "UI screen pending upload") + "</span>" +
      "</div></figure>";
  }

  function pending(label, note) {
    return { type: "html", html: pendingSlot(label, note) };
  }

  /** Two reserved slots side by side — e.g. a V1 / V2 comparison. */
  function pendingPair(a, b, note) {
    return {
      type: "html",
      html: '<div class="cs-pending__grid">' + pendingSlot(a, note) + pendingSlot(b, note) + "</div>"
    };
  }

  /* ---- uploaded screenshots -------------------------------------------------
     The files live in assets/img/. alt text describes what the screen shows
     (the visible label does that job), the caption names the slot.            */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function shotFigure(s) {
    return '<figure class="cs-media__figure">' +
      '<img class="cs-media__img" src="assets/img/' + s.file + '" alt="' + esc(s.alt) + '" loading="lazy">' +
      '<figcaption class="cs-media__caption">' + esc(s.caption) + "</figcaption>" +
      "</figure>";
  }

  /** One screenshot, full width of the media column. */
  function shot(s) {
    var b = { type: "image", src: "assets/img/" + s.file, alt: s.alt, caption: s.caption || "" };
    if (s.width) b.width = s.width;
    return b;
  }

  /** Two screenshots side by side — same grid the reserved pair used. */
  function shotPair(a, b) {
    return { type: "html", html: '<div class="cs-pending__grid">' + shotFigure(a) + shotFigure(b) + "</div>" };
  }

  /** Up to four screenshots in one responsive grid — e.g. the IA maps. */
  function shotGrid(list, cls) {
    return { type: "html", html: '<div class="cs-grid' + (cls ? " " + cls : "") + '">' + list.map(shotFigure).join("") + "</div>" };
  }

  /** One tall portrait screenshot (a plugin panel runs 836×1514), capped by
      .cs-panel so it stays a readable size instead of filling the column. */
  function panelShot(s) {
    return { type: "html", html: '<div class="cs-panel">' + shotFigure(s) + "</div>" };
  }

  var CASE_STUDIES = [
    {
      slug: "accessibility-management-system",
      metaTitle: "Accessibility management platform — Accessly Internal & Accessly",
      shortTitle: "Accessibility management system",
      order: 1,

      /* card + hero */
      category: "Accessibility SaaS · Product Design",
      heroChip: "Accessibility SaaS · End-to-end Product Design · Accessibility",
      date: "3 months to v1 · 6 months to client version",
      title: "Cutting issue documentation from 3 hours to 30 seconds — Accessly Internal and the client SaaS it became",
      cardLine: "UI/UX & Product Designer — sole designer, end to end",
      blurb:
        "Testers spent 75% of their time reporting instead of testing, across two 30-column spreadsheets. I designed Accessly Internal — which documents a page in about 30 seconds — and its patterns became Accessly, a SaaS used by 100+ paying customers.",
      impact: "~30 sec per page (was ~3 hrs) · 100+ paying customers · 300+ screens",
      metrics: [
        { value: "~30 sec", label: "issue docs per page (was ~3 hrs)" },
        { value: "100+", label: "paying customers on Accessly" },
        { value: "300+", label: "screens, one designer" }
      ],
      thumbnail: "assets/img/acs-cover-card.webp",

      summary:
        "Two 30-column spreadsheets became Accessly Internal — issue documentation in ~30 seconds, not 3 hours — its patterns now power Accessly, a SaaS used by 100+ paying customers.",

      blocks: [
        {
          type: "meta",
          items: [
            { label: "ROLE", value: "Sole UI/UX designer, end to end: research, IA, user flows, wireframes, UI, design system" },
            { label: "TIMELINE", value: "~3 months to the base version, used internally first; ~6 months of internal iteration, then the client version, live; still adding features today; design system built separately (~1 month)" },
            { label: "TEAM", value: "CEO / product owner; 3 developers when I started, now a 20-person team (testers, content writers, front-end, back-end and AI developers)" },
            { label: "PLATFORM", value: "Web SaaS, 300+ screens across internal and customer versions" },
            { label: "USERS", value: "Admins, Managers (PMs, mentors), Testers (testers, QA, reviewers)" },
            { label: "PRODUCTS", value: "Accessly Internal (our audit team) → Accessly (client SaaS) + Accessly Extension (browser)" },
            { label: "STATUS", value: "Live — Accessly Internal in daily use; Accessly (Free, Pro, Enterprise) used by 100+ paying customers" }
          ]
        },

        {
          type: "outcomes",
          heading: "Impact at a glance",
          items: [
            { value: "~3 hrs → ~30 sec", label: "issue documentation per page for auto-detected issues (~99.7% less time)" },
            { value: "~90%", label: "fewer human data-entry errors — issues are generated from our ruleset, testers validate" },
            { value: "100+", label: "paying customers on Accessly, built on patterns from Accessly Internal" },
            { value: "30+ columns", label: "of Excel replaced by structured views, a review workflow and an automatic audit trail" }
          ],
          note: "Testers' role shifted from writing reports to validating them. Timesheets fill themselves through a production on/off toggle."
        },

        shot({
          file: "acs-cover.webp",
          alt: "Cover: the Accessly projects screen behind the words “Making Accessibility Simple for Everyone”, labelled as a UX case study.",
          caption: "Cover — Accessly: making accessibility simple for everyone",
          width: "full"
        }),

        {
          type: "text",
          label: "CONTEXT",
          heading: "Manual audits, documented by hand",
          body:
            "My company runs manual accessibility audits for enterprise clients, checking websites against WCAG. Every issue a tester finds has to be documented in detail: what fails, where, how to reproduce it, which WCAG success criterion it breaks, how severe it is, and how to fix it in code. Clients receive this as a formal report and use it to fix their products. Accessibility testing depends on human judgment, so the goal was never to remove testers — it was to remove the repetitive work around them."
        },

        {
          type: "list",
          heading: "The problem",
          items: [
            { text: "Testers spent about 1 hour testing a web page and about 3 hours documenting it — 75% of their time went into reporting, not testing" },
            { text: "All of it lived in two Excel sheets: an internal tracking sheet and a client-facing report" }
          ]
        },

        shotPair(
          {
            file: "acs-excel-internal.webp",
            alt: "The internal tracking spreadsheet: page, issue name, comments, status, who tested and reviewed it, issue description, screenshot, severity and WCAG success criteria columns, with the hidden review workflow running off to the right.",
            caption: "Excel — internal tracking sheet (client details hidden)"
          },
          {
            file: "acs-excel-client.webp",
            alt: "The client-facing report spreadsheet: page name, issue name, actual result, steps to reproduce, screenshot and expected results, with client screenshots and code replaced by NDA notes.",
            caption: "Excel — client-facing report (client details hidden)"
          }
        ),

        {
          type: "list",
          heading: "What the spreadsheets revealed",
          items: [
            { text: "Double data entry — “Comments” and “Issue Description” held the exact same text, and a “Move to Report” column meant retyping everything into the client report" },
            { text: "A workflow hidden in columns — Tested By → Testing Reviewed By → Written By → Self QC → Reporting Reviewed By → QA → Finalized → Client Feedback: seven stages, with no status visibility and no notifications" },
            { text: "Copy-paste errors — in one report row “Suggested Code” was identical to “Existing Code”, and formula cells showed #N/A" },
            { text: "Inconsistent data — one sheet rated severity “High”, the other “Major / Critical”; there was no shared taxonomy" },
            { text: "Conversations cut off — reviewer feedback lived in a single truncated cell: “no need to ra…”" },
            { text: "No audit trail — nobody could tell who changed what, or when" },
            { text: "Manual evidence and timesheets — every screenshot captured, pasted and annotated by hand; the assistive technology matrix (JAWS, NVDA, VoiceOver, ZoomText) filled cell by cell; hours logged separately, by hand" }
          ]
        },

        {
          type: "list",
          heading: "Pain points by role",
          items: [
            { text: "Tester — hours of repetitive typing, copy-pasting code and screenshots for every instance" },
            { text: "Reviewer / QA — feedback lost in cramped cells; no way to see what changed since the last review" },
            { text: "Manager — no live view of project progress, quality, or hours spent versus hours sold" },
            { text: "Client — reports assembled by hand, with inconsistent data and occasional errors" }
          ]
        },

        {
          type: "quote",
          text: "I spent longer writing up one issue than finding it.",
          attribution: "Tester, internal accessibility testing team"
        },

        {
          type: "text",
          label: "WHERE THIS FITS",
          heading: "The first product I built — and the extension that came after it",
          body:
            "Accessly Internal was the first product I designed and built in my current role; it started from those two spreadsheets and had to earn its place against years of muscle memory. The Accessly Extension came after it — built for Chrome and now also live on Firefox, Edge and Safari. It scans a page, sorts results into Fail, Validate, Suggestion and Pass, jumps to the failing code, captures screenshots and exports to Excel: it can find issues, but it cannot manage them. Accessly Internal, and later Accessly, close that gap. Both generate fully documented issues from our own ruleset and import issues from Accessly Extension into the same projects; Accessly also scans client sites on demand, weekly or monthly."
        },

        {
          type: "list",
          heading: "Three products, one workflow",
          items: [
            { text: "Excel — manual reporting" },
            { text: "Accessly Extension — find issues (Chrome, Firefox, Edge, Safari)" },
            { text: "Accessly Internal and Accessly — manage issues: assign, review, discuss, track" },
            { text: "AI code fixes — fix issues" },
            { text: "Each layer took one manual job away: finding, managing, then fixing" }
          ]
        },

        {
          type: "list",
          heading: "Users and roles",
          items: [
            { text: "Admins — set up the system: manage users, clients, rules, guidelines and technologies" },
            { text: "Managers (project managers, mentors) — plan and monitor projects; they need progress, quality and hours at a glance" },
            { text: "Testers (testers, QA, reviewers) — log, edit and approve issues; they need speed, fewer clicks and a clear review status" },
            { text: "Clients — receive reports without a hand-built spreadsheet behind them" },
            { text: "The same roles serve both our internal team and paying customers" }
          ]
        },

        {
          type: "list",
          heading: "Goals",
          items: [
            { text: "Automate issue documentation: scan, capture and fill every field" },
            { text: "Keep humans in the loop: testers can edit, override, validate or add issues" },
            { text: "Turn the hidden Excel workflow into visible statuses and reviews" },
            { text: "Give managers live visibility into progress, quality and hours" }
          ]
        },

        {
          type: "list",
          heading: "Constraints",
          items: [
            { text: "The product itself had to be accessible — an accessibility company cannot ship an inaccessible tool" },
            { text: "Dense, technical data: one issue carries 15+ fields, including code blocks and WCAG mappings" },
            { text: "Existing habits: the team had years of muscle memory in Excel vocabulary and statuses" },
            { text: "Scale: built for internal use first, it had to work later for paying customers with unlimited users" },
            { text: "Solo designer: I owned every screen and the design system, so consistency had to come from reusable patterns" }
          ]
        },

        {
          type: "text",
          label: "PROCESS",
          heading: "From a verbal brief to a shipped product",
          body:
            "I started from a verbal brief from the CEO, with no existing product vision, and shaped the structure before any UI. The base version shipped in about three months and went straight into use inside our organisation; over the next six months we improved it, built the client version and made it live. We are still adding features and building more products around it — today Accessly runs smoothly and is taking on paying clients."
        },

        {
          type: "list",
          heading: "How the work ran",
          items: [
            { text: "Excel audit — I studied the two spreadsheets column by column; every column became a field, a status or a feature" },
            { text: "User flow — a first rough flow from the brief: login, dashboards, projects, timesheet, settings" },
            { text: "Information architecture — each section mapped to its data" },
            { text: "Wireframes — low-fidelity structure (the originals were lost over 2.5 years, so these are recreated for presentation)" },
            { text: "UI and iteration — built on a design system I created separately, then refined with feedback from real testers on live projects" },
            { text: "Testing with the internal accessibility team, then back into the UI" }
          ]
        },

        shot({
          file: "acs-user-flow.webp",
          alt: "Hand-drawn user flow: login and password recovery, project list, project details, plans, findings, feedback, report download, timesheet and settings branches.",
          caption: "User flow — login, dashboards, projects, timesheet, settings"
        }),
        shotGrid(
          [
            {
              file: "acs-ia-dashboard.webp",
              alt: "Dashboard data map: KPIs, finalized issues, testing status, process hours, the testers leaderboard, project hours and the overview data tables behind them.",
              caption: "Information architecture — Dashboard"
            },
            {
              file: "acs-ia-team.webp",
              alt: "Team data map: captain, testers and a team activity table covering report, quality assurance, support, fixing, meeting and training hours.",
              caption: "Team"
            },
            {
              file: "acs-ia-timesheet.webp",
              alt: "Timesheet data map: date, client, task type, module, complexity, hours and units, plus a per-person breakdown by process.",
              caption: "Timesheet"
            },
            {
              file: "acs-ia-settings.webp",
              alt: "Settings data map: clients, users, guidelines, technology, status and process sections, each backed by its own data table.",
              caption: "Settings"
            }
          ],
          "cs-grid--2"
        ),
        shot({
          file: "acs-wireframes.webp",
          alt: "Board of ten low-fidelity wireframes: 01 Project dashboard, 02 Dashboard table view, 03 Projects list, 04 Issue report, 05 Issue details, 06 Create issue, 07 Create issue filled, 08 Activity logs, 09 Timesheet and 10 Profile settings, each annotated with sticky-note questions such as chart or table toggle per widget and scroll versus table view.",
          caption: "Wireframes — ten screens, low-fidelity structure",
          width: "full"
        }),

        {
          type: "text",
          label: "DESIGN SYSTEM",
          heading: "One system behind the 300+ screens",
          body:
            "Accessly Internal and Accessly were not drawn screen by screen. The 300+ screens come from one set of components I designed alongside the product — about a month of work — holding tokens, components and documented accessible states (focus, error, disabled, motion) in Figma, with every token aligned to WCAG AA/AAA contrast at creation rather than audited afterwards. The client version inherited those same components, so a second product did not mean a second UI, and one designer could keep every screen consistent."
        },

        /* Design-system thumbnail — reserved slot (visible until you fill it).
           To add the image: drop the file into assets/img/ and replace the
           pending(...) line below with e.g.

             shot({
               file: "acs-design-system.webp",
               alt: "Design system: ...",
               caption: "Design system — components, tokens and accessible states"
             }),

           shot() also accepts width: "full" | "inset"; for a 2-up layout use
           shotPair(a, b) or shotGrid([...], "cs-grid--2"). */
        pending("Design system — thumbnail", "Reserved for the design system image"),

        {
          type: "list",
          heading: "Keeping the team's language",
          items: [
            { text: "Excel values such as Perfect Issues, Approved After Fixing, Delete – QA, No QA Needed, To Be Approved and Instance Missed became the product's statuses" },
            { text: "Adoption friction stayed low because nothing had to be relearned" }
          ]
        },

        {
          type: "list",
          heading: "How the IA evolved — from 4 project sections to 8 tabs",
          items: [
            { text: "Dashboard → Dashboard, kept; a lighter Overview gives a summary rather than the full dashboard" },
            { text: "Details → Details, kept" },
            { text: "URLs (inside Details) → Pages — matches the team's unit of work: pages" },
            { text: "Plan → Plan, kept" },
            { text: "— → Score — scores needed context, not just a number" },
            { text: "Report → Report, kept but split into four views" },
            { text: "— → Logs — replaces the missing audit trail" }
          ]
        },

        {
          type: "text",
          label: "KEY DESIGN DECISIONS",
          heading: "One 30-column row, split into screens that each do one job",
          body:
            "The core work was splitting a single 30+ column spreadsheet row into screens that each serve one job — then testing the riskiest of them with the people who would live in it."
        },

        {
          type: "list",
          heading: "The flow",
          items: [
            { text: "Pages (add URLs) → Scans (manual, weekly, monthly) → Report (issues auto-generated) → Issue Detail (tester edits, validates) → Reviewer approves → Report + scores" },
            { text: "Pages and Scans exist only in Accessly; internally, testers start from Report" }
          ]
        },

        {
          type: "decisions",
          stories: [
            {
              title: "Report: one row of 30 columns → four purpose-built views",
              lead: "V1 showed every instance with a large screenshot in the row, so only about 9 rows fit on screen.",
              before: "One Excel row carried 30 columns, and V1 reproduced it: every instance on one screen, with a screenshot in the row.",
              tradeoff: "Splitting the data risked hiding detail — a manager still needed the whole site at once, and a tester still needed every instance.",
              action: "Four views: Overall (one row per issue — pages affected, instances, WCAG principle, severity, level), Issue (instances grouped by issue type), Code (instances grouped by identical code, so developers fix many instances with one change) and List (a flat table for sorting and filtering). Screenshots moved to Issue Detail where they stay readable; Type and Updated Type sit side by side, so the system suggests and a human decides while the original is kept for audit; bulk actions (Update, Pass, Export) appear once rows are selected, with a live count; status edits happen inline; and one result taxonomy — Fail, Validate, Suggestion, Pass — is shared with Accessly Extension.",
              result: "A manager can read what is wrong across the whole site without scrolling 500 rows, and changing 100 statuses no longer means editing 100 cells."
            }
          ]
        },

        shotPair(
          {
            file: "acs-report-v1.webp",
            alt: "Report V1: one table where every instance of an issue sits on its own row with a screenshot thumbnail, severity, success criterion and status.",
            caption: "Report V1 — every instance on one screen"
          },
          {
            file: "acs-report-v2.webp",
            alt: "Report V2: the Project Report with Overall, List, Issue and Code tabs, here showing instances grouped under each issue type.",
            caption: "Report V2 — four views"
          }
        ),

        {
          type: "decisions",
          stories: [
            {
              title: "Issue Detail: accordions → one instance at a time",
              lead: "One issue type can carry 10–20 instances; V1 stacked them all on a single page.",
              before: "All instances of an issue type sat in accordions on one page, with one media panel serving many instances — heavy scrolling, and it was unclear which screenshot belonged to which.",
              tradeoff: "One instance per page adds navigation, so testers had to move between instances without losing context.",
              action: "V2 gives one instance per page with “1 of 4” navigation, shows system type and the tester's updated type together in the header, adds a Steps to Validate field that says exactly what to check, pins success criterion, level and severity in a sticky footer, moves the primary actions (Update, Pass, Edit, Create Issue) into the header, puts alt text on every screenshot, and uses Generate Code (AI) to write an accessible fix for the existing code.",
              result: "Everything needed to judge one instance sits on one screen, and the metadata buried in V1 is always in view."
            }
          ]
        },

        shotPair(
          {
            file: "acs-issue-detail-v1.webp",
            alt: "Issue Detail V1: every instance of one issue stacked in accordions on a single page, with environment, actual result, recommendation, expected result and code fields shared across them.",
            caption: "Issue Detail V1 — all instances in accordions"
          },
          {
            file: "acs-issue-detail-v2.webp",
            alt: "Issue Detail V2: one instance at a time with “1 of 4 issues” navigation, element and page details, steps to validate, media, and Update, Pass and Edit actions in the header.",
            caption: "Issue Detail V2 — one instance at a time"
          }
        ),

        {
          type: "decisions",
          stories: [
            {
              title: "Create Issue: tested with real testers, then redesigned",
              lead: "Hypothesis: batch creation would save testers time. The internal accessibility team used it on live client projects.",
              before: "V1 was a modal where testers queued several issues with Add New, then submitted all of them with Create.",
              tradeoff: "Testing found three failures: testers lost track of which queued issue they were filling in, one invalid field blocked the whole batch, and closing the modal by accident lost all queued work.",
              action: "One issue at a time, on a full page, with the fields restructured — the same layout as Issue Detail, so what you create is what you later read. Fewer required fields (V2 needs only Element, Issue Type, Page, Status and Existing Code), level derived automatically from the chosen success criterion, and consistent names across screens: Failed Environment became Browsers, Actual / Expected Code became Existing / Suggested Code.",
              result: "Testers log fast and add detail later, and a whole class of Excel mismatch errors disappeared with the derived level."
            }
          ]
        },

        shotPair(
          {
            file: "acs-create-issue-v1.webp",
            alt: "Create Issue V1: a modal filled in for one issue, with page, issue, issue type, success criteria, severity, failed environment, steps to reproduce, media upload, results and code fields, and Clear, Create and Add New actions.",
            caption: "Create Issue V1 — batch modal"
          },
          {
            file: "acs-create-issue-v2.webp",
            alt: "Create Issue V2: a full page opened from the report breadcrumb, with element, issue type, page, browsers, steps to reproduce, results, existing and suggested code, a media panel and the tester's name.",
            caption: "Create Issue V2 — one issue, full page"
          }
        ),

        {
          type: "list",
          heading: "Dashboard and Score — data a manager can act on",
          items: [
            { text: "Dashboard — KPI cards for delivered, units, issues, sales hours versus actual hours and overshoot; overshoot and actual hours turn red with an up-arrow when a project goes over budget" },
            { text: "Dashboard — filters by tester and reviewer, to see individual performance, and a testers' leaderboard ranked by “perfect issues”, making quality visible" },
            { text: "Score — Defect Score (risk: Low → Very High) and Conformance Score (Poor → Excellent against WCAG A, AA, AAA): two gauges with opposite polarity, so their colour bands are reversed and each shows its value and meaning in text" },
            { text: "Score — breakdowns by severity, top fails, conformance level and WCAG principle, each chart with its own Chart / Table toggle" }
          ]
        },

        shot({
          file: "acs-score.webp",
          alt: "Score screen: an Issues by Severity pie with its legend, a Defect Score gauge and a Conformance Score gauge side by side with their values and risk bands written out as text under each dial, a Top 7 Fails table, and Issues by Conformance Level and Issues by WCAG Principle bar charts, each with a Chart / Table toggle.",
          caption: "Score screen — defect and conformance gauges with the breakdowns beneath"
        }),

        {
          type: "text",
          label: "TIMESHEET",
          heading: "Filled automatically",
          body:
            "A Production on/off toggle in the header tracks a tester's time inside a project. When they switch off or log out, hours go straight into the timesheet by project and process (testing, reporting, QA, documentation). Views cover my timesheet, team timesheet, production hours and today's breakdown; off-production, training and meeting hours stay visible too."
        },

        shot({
          file: "acs-timesheet.webp",
          alt: "Timesheet screen: Overview (Daily) with production hours per project, today's breakdown by activity, and off-production, training and meeting hours.",
          caption: "Timesheet screen — filled by the production on/off toggle"
        }),

        {
          type: "text",
          label: "LOGS",
          heading: "The audit trail Excel never had",
          body:
            "Every action is one readable sentence: who, what changed, from what to what, on which issue, and when. The same activity component is reused inside Issue Detail. The Logs screen carries the same feed under a search box and a date-range filter, so a year of activity can be narrowed to a day."
        },

        shot({
          file: "acs-logs.webp",
          alt: "Logs screen: a search box and a Last 7 Days filter above a feed of one-sentence activity entries — who created an issue, who changed a status and from what to what, and who edited code, each with a timestamp.",
          caption: "Logs screen — the audit trail Excel never had"
        }),

        {
          type: "text",
          label: "ACCESSIBILITY",
          heading: "Designing an accessible accessibility product",
          body:
            "The hardest accessibility problem was data visualisation, because charts are rarely usable with a screen reader."
        },

        {
          type: "list",
          heading: "How the charts stay usable",
          items: [
            { text: "A table behind every chart — each chart widget has a Chart / Table toggle, and the table view is fully accessible" },
            { text: "Patterns, not just colour — dots, stripes and checks separate chart segments, so colour-blind and low-vision users can tell them apart (WCAG 1.4.1, Use of Color)" },
            { text: "Status never by colour alone — over-budget KPIs use a red background and an up-arrow icon" },
            { text: "Alt text on every screenshot, including the evidence images testers upload" },
            { text: "An accessible chart library, chosen with the developers from the start" }
          ]
        },

        shotPair(
          {
            file: "acs-dashboard-chart.webp",
            alt: "Project Dashboard, chart view: KPI cards for delivered, units, issues, sales hours, actual hours and overshoot, with actual hours and overshoot on red cards with up arrows; beneath them, charts drawn with patterned segments — sales hours by client, exceeding versus within hours, hours by process, projects by team structure, top 5 overshoot, sales versus actual hours by client, delivery times, deliveries after 9 PM and overshoot by client — each with a Chart / Table toggle.",
            caption: "Project Dashboard — chart view, every widget with a Chart / Table toggle"
          },
          {
            file: "acs-dashboard-table.webp",
            alt: "The same Project Dashboard with every widget switched to its Table view — sortable, labelled rows for clients and sales hours, team structure, processes, delivery times, project overshoot percentages and issue counts, carrying the same numbers the charts draw.",
            caption: "The same dashboard, every chart as a sortable table"
          }
        ),

        {
          type: "text",
          label: "SAME CORE, TWO AUDIENCES",
          heading: "One core, two audiences",
          body:
            "Accessly Internal and Accessly, our live client product, run on the same core — Report and Issue Detail — and differ only at the edges. Every screen above is from Accessly Internal; this section shows what changed when the same patterns served paying customers. The four Report views and the one-instance Issue Detail shipped to clients unchanged in structure: the internal team had already stress-tested them on live audits, so Accessly started from proven patterns."
        },

        {
          type: "list",
          heading: "What changed, and why",
          items: [
            { text: "Report and Issue Detail — both audiences: both read and act on the same issues" },
            { text: "Pages — Accessly only: clients add and manage their own URLs" },
            { text: "Scans — Accessly only: clients run scans themselves, on demand or on a schedule" },
            { text: "Timesheet — Accessly Internal only: tracks our testers' billable hours" },
            { text: "Leaderboard — Accessly Internal only: makes our team's review quality visible" },
            { text: "Production on/off toggle — Accessly Internal only: feeds the internal timesheet" },
            { text: "Only in Accessly Internal: Timesheet, Leaderboard and the Production toggle exist to run our audit business — billing hours, tester quality, time tracking. Clients pay for results, not hours, so none of them made it into Accessly" }
          ]
        },

        {
          type: "list",
          heading: "What clients needed that our team didn't",
          items: [
            { text: "Choose what gets tested → Pages: clients add, crawl, enable and retest their own URLs" },
            { text: "Get a report without a tester → Scans: on-demand and scheduled scans with a history" },
            { text: "Prove progress over time → Results Comparison: two scans side by side, with new and fixed issues" },
            { text: "Work in their own tools → Jira integration: our severities, statuses and fields mapped to their Jira" },
            { text: "Follow their own policy → Custom Standards: our ruleset, switchable rule by rule" }
          ]
        },

        {
          type: "decisions",
          stories: [
            {
              title: "Pages: clients choose what gets tested",
              lead: "Internally, pages came from the project brief, so Accessly Internal never needed this screen.",
              before: "Our testers were assigned pages from the brief; clients arrive alone and must decide what to test.",
              action: "Overview cards for unscanned, scanned, completed, failed, in-progress and pending pages; per-page results in the same Fail / Validate / Suggestion / Pass columns as Report and Accessly Extension, so one taxonomy runs through every product; bulk actions (Re Crawl, Test All, Retest, Enable, Disable, Edit, Add); and page status (Active / Inactive) kept separate from scan status (Completed, In Progress, Failed, Pending), so pausing a page never hides its last result.",
              result: "One taxonomy across every product, and clients manage their own URLs without a tester in the loop."
            }
          ]
        },

        shot({
          file: "acs-pages.webp",
          alt: "Pages screen: overview cards for unscanned and scanned pages, a table of page names and URLs with created dates and results, plus search, per-page settings and bulk actions.",
          caption: "Pages screen (anonymised)"
        }),

        {
          type: "text",
          label: "SETTINGS",
          heading: "From one form to a settings area",
          body:
            "Settings began as a single Edit Profile form behind a two-item menu. In the final version the same form sits inside a full settings area — Users, Clients, Accessibility, Guidelines, Success Criteria, Issue Variables, Status, Profile — and the account rules are stated on screen instead of left to guesswork: which file types and size a picture accepts, which fields are mandatory, and where password change and subscription cancellation live."
        },

        shotPair(
          {
            file: "acs-profile-v1.webp",
            alt: "Accessly Settings, first variation: an Edit Profile form with profile picture, full name, email and password fields, behind a Settings menu that holds only Edit Profile and Members.",
            caption: "Accessly — Settings, Edit Profile, first variation"
          },
          {
            file: "acs-profile-v2.webp",
            alt: "Accessly Settings, final version: the Profile screen inside a full Settings menu, showing the upload size and file-format rules, fields marked with an asterisk as mandatory, first and last name, email, a Change Password link and a Cancel Subscription option above Cancel and Update.",
            caption: "Accessly — Settings, Profile, final version"
          }
        ),

        {
          type: "decisions",
          stories: [
            {
              title: "Results Comparison: proof of progress",
              lead: "Our team delivered an audit and moved on; a client needs to show their leadership that accessibility is improving.",
              before: "Two audits in time, with nothing that turned them into a before/after.",
              action: "Pick any two scans and see fails, validates and totals side by side, with the difference, plus a New Issues / Fixed Issues toggle showing what the latest release broke and what the team fixed.",
              result: "Improvement becomes something a client can show, in one screen."
            }
          ]
        },

        shot({
          file: "acs-compare.webp",
          alt: "Results Comparison screen: two scans compared side by side with fails, validates and totals, the updated issue list, and new and fixed issues grouped by issue type.",
          caption: "Results Comparison screen (anonymised)"
        }),

        {
          type: "decisions",
          stories: [
            {
              title: "Jira integration: meet clients in their tools",
              lead: "Client developers live in Jira, not in our product. Instead of asking them to switch, the integration carries our data into their workflow.",
              before: "Findings were exported by hand and retyped into a second tool.",
              action: "Severity mapping (our Blocker, Critical, Major, Minor and Best Practice → Jira priorities), status mapping (To Do, In Progress, Completed → Jira statuses, syncing both ways), field mapping (every issue field — Element, Actual Result, Recommendation, Steps to Validate, Existing Code and more → an existing Jira field, a new field, or skipped), plus Auto Sync and Auto Create Issues.",
              result: "This is the Excel problem solved a second time: in Accessly Internal, structured issues replaced copy-paste between two spreadsheets; for clients, field mapping replaces copy-paste between two tools."
            }
          ]
        },

        shot({
          file: "acs-jira.webp",
          alt: "Jira integration screen: project link and issue type, sync options, severity mapping from Blocker to Best Practice, and status mapping from To Do, In Progress and Completed to Jira statuses.",
          caption: "Jira mapping screen (anonymised)"
        }),

        {
          type: "decisions",
          stories: [
            {
              title: "Custom Standards: our ruleset, their policy",
              lead: "The ruleset that generates every issue — and cut data-entry errors by ~90% internally — became a feature clients can configure.",
              before: "One internal ruleset, applied the same way to every engagement.",
              action: "Default standards (WCAG 2.2 AA as default, plus WCAG 2.2 A, 2.1 AA and A, 2.0 AA and EN 301 549), each showing its active rulesets; a custom standard built on a default with every rule switchable; Automated / Manual tabs so scanner rules and human checks stay distinct; a role per rule (developer, designer, content writer, tester) so each issue lands with the person who fixes it; and Set as Default to apply a standard across projects.",
              result: "The ruleset that automated our own documentation became something clients steer themselves."
            }
          ]
        },

        shot({
          file: "acs-standards.webp",
          alt: "Custom Standards screen: a client standard based on WCAG 2.2 (AA) with Automated and Manual rulesets, rule names such as skipped heading level and missing form labels, and an element table underneath.",
          caption: "Custom Standards screen (anonymised)"
        }),

        {
          type: "text",
          label: "PROJECTS",
          heading: "From a plain table to a starting point",
          body:
            "Both screens are from Accessly, the client product: the first variation and the final version. Internally our testers were assigned projects; clients arrive alone and must start one themselves, so the final screen is built as a starting point — recent projects on top, a create action where the work begins, and a grid / table toggle for however many projects someone holds."
        },

        shotPair(
          {
            file: "acs-projects-v1.webp",
            alt: "Accessly Projects, first variation: a plain table of projects with delivery date and number of issues, and a search box.",
            caption: "Accessly — Projects, first variation"
          },
          {
            file: "acs-projects-v2.webp",
            alt: "Accessly Projects, final version: recent projects on top, a grid / table toggle, project tags, a Create Project action in the header and as a card, and an extension install prompt.",
            caption: "Accessly — Projects, final version"
          }
        ),

        {
          type: "list",
          heading: "What the final version adds",
          items: [
            { text: "A prominent Create Project action, in the header and as a card" },
            { text: "Recent Projects on top, since most people work on 2–3 projects at a time" },
            { text: "Grid / Table toggle: cards to scan a few projects, a table for many" },
            { text: "A How to Use panel and tutorial for self-serve onboarding" },
            { text: "Links to install Accessly Extension, connecting the product ecosystem" },
            { text: "Tags to categorise projects by client and product" },
            { text: "Scores moved out of the list into a dedicated Score tab with gauges and risk bands — a bare 80% in a list told a client nothing; the Table view still shows them." }
          ]
        },

        {
          type: "text",
          label: "IMPACT",
          flush: "1",
          body:
            "Patterns I designed for Accessly Internal became the core of Accessly, our live client product, now used by 100+ paying customers. Inside our own team, documenting auto-detected issues went from about 3 hours per page to about 30 seconds — roughly 360 times faster. The time claim is not a stopwatch estimate: our timesheet logs record the hours spent documenting a page by hand, and the product's own output is the evidence for the other side — about 30 seconds for a single web page. Errors dropped because issues are no longer typed: the system generates every field from our own accessibility ruleset. Testers still check that each issue and the final report are correct, so the time saved is in documentation, not judgment."
        },

        {
          type: "quote",
          text: "Now I check what the system wrote instead of writing it myself.",
          attribution: "Tester, internal accessibility testing team"
        },

        {
          type: "list",
          heading: "Before → after, area by area",
          items: [
            { text: "Issue documentation (auto-detected issues): ~3 hours per page → ~30 seconds per page" },
            { text: "Human data-entry errors: copy-paste mistakes, mismatched fields, duplicate text → ~90% fewer (team estimate)" },
            { text: "Tester's job: write every field by hand → validate generated issues and reports" },
            { text: "Review workflow: 7 stages hidden in Excel columns → visible statuses, comments, bulk actions" },
            { text: "Audit trail: none → every change logged automatically" },
            { text: "Timesheets: filled by hand → logged automatically by project and process" },
            { text: "Data consistency: free text, mixed severity scales → shared taxonomy; level derived from success criterion" },
            { text: "Product reach: internal spreadsheet → the core of Accessly, used by 100+ paying customers" }
          ]
        },

        {
          type: "list",
          heading: "What I learned",
          items: [
            { text: "Automation should replace documentation, not judgment — keeping Type and Updated Type side by side made testers trust the system" },
            { text: "Respect existing vocabulary — reusing Excel's statuses made adoption easy" },
            { text: "Numbers need context — a bare 80% in a list helped nobody; the same score on a gauge with a risk band did" },
            { text: "Test with real users on real work — the Create Issue redesign came from watching testers on live projects" },
            { text: "Working as the only designer while the team grew from 3 developers to 20 taught me to write decisions down — a UI choice that lived only in my head broke the moment someone else built on it" }
          ]
        },

        {
          type: "text",
          label: "WHAT'S NEXT",
          flush: "1",
          body:
            "Generate Code — now part of a separate AI product — writes an accessible fix for each failing snippet and is working in production."
        },

        {
          type: "text",
          label: "REFLECTION",
          flush: "1",
          body:
            "What I'd do differently: watch someone do the job before designing the shortcut. I designed batch creation before I watched a tester use it, and it took one live client project to expose all three failures — I'd run that test earlier and start Create Issue on a full page, not a modal. What I'd keep: automating documentation rather than judgment, reusing the vocabulary the team already had, and giving every number a context. The thing that made 300+ screens possible for a single designer was building the design system alongside the product, not after it — and the thing that made Accessly win clients was that the internal team had already stress-tested every shared pattern on live audits."
        }
      ],

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to talk through it. Details sit under NDA; glad to walk through them in an interview."
      }
    },

    {
      slug: "accessly-lens-figma-plugin",
      metaTitle: "Accessly Lens — accessibility checks inside Figma",
      shortTitle: "Accessly Lens",
      order: 2,

      /* card + hero */
      category: "Figma Plugin · Accessibility",
      heroChip: "Figma Plugin · Accessibility · Design Systems",
      date: "15 days — research to handoff",
      title: "Catching accessibility where it starts: in the design file, before a single line of code",
      cardLine: "Product designer and builder — end to end",
      blurb:
        "Every accessibility check we owned ran after design was signed off. I built Accessly Lens, a Figma plugin that scans the design itself — 13 checks, 5 tools, one score — then designed, built and tested it in 15 days with AI as my engineering partner.",
      impact: "~70% of issues now fixed in design · 0 axe-core violations · 15 days",
      metrics: [
        { value: "~70%", label: "of issues now caught at design" },
        { value: "13 checks", label: "5 tools, grouped into 5 tabs" },
        { value: "15 days", label: "research to handoff" }
      ],
      thumbnail: "assets/img/al-cover.webp",

      summary:
        "Accessly Lens scans the Figma file itself — 13 checks, 5 tools, a score out of 100 and a developer-ready spec — designed, built and tested in 15 days, so accessibility is checked before the design is signed off.",

      blocks: [
        {
          type: "meta",
          items: [
            { label: "MY ROLE", value: "Product designer and builder, end to end: problem framing, the rules, every UX decision and the quality bar" },
            { label: "TIMELINE", value: "15 days, research to handoff" },
            { label: "BUILT WITH", value: "AI-assisted development, Figma Plugin API" },
            { label: "STANDARD", value: "WCAG 2.2, level AA" },
            { label: "PLATFORM", value: "Figma plugin — light and dark themes, keyboard-first, no network calls" },
            { label: "TEAM", value: "Solo — one designer; AI handled the code, the test harness and the iteration loops" },
            { label: "STATUS", value: "Shipped — running on our own design files, with a live prototype and a 24-screen Figma file" }
          ]
        },

        {
          type: "outcomes",
          heading: "Impact at a glance",
          items: [
            { value: "~70%", label: "of accessibility issues now resolved in the design itself" },
            { value: "0", label: "axe-core violations across all 18 tabs, light and dark" },
            { value: "90", label: "automated engine tests covering every check and edge case" },
            { value: "0.6s", label: "to scan a 20,000-layer file, running locally" }
          ],
          note: "Measured on the shipped plugin: axe-core run against every tab, the engine's own test suite, and our own design work."
        },

        {
          type: "image",
          src: "assets/img/al-cover.webp",
          alt: "Cover: the Accessly Lens wordmark and the words UX case study beside the plugin panel, showing a score of 68 with 12 failures, 9 items to review and 35 passes.",
          caption: "Cover — Accessly Lens: accessibility checks inside Figma",
          width: "full"
        },

        {
          type: "text",
          label: "CONTEXT",
          heading: "I design accessibility tools. All of them arrived too late.",
          body:
            "At my current organization I work deep inside accessibility. I've designed more than ten products that audit and test websites, web apps and digital products. They're good at what they do, but they share one assumption: the product already exists. They run after development, on a live build. We then pushed earlier. We shipped tools developers use while they write code: a VS Code extension, an Xcode plugin for iOS, WordPress and Shopify plugins, and an Android Studio plugin is in progress. That moved testing from “after release” to “during development”. But the design still came first, and nothing was checking it."
        },

        {
          type: "text",
          label: "THE PROBLEM",
          heading: "Every check we owned started after design was signed off.",
          body:
            "When a designer picks a light grey for helper text or uses a placeholder as the only field label, that decision travels through handoff, gets built faithfully, and is only flagged by a tester weeks later. By then the fix touches design, code and QA."
        },

        {
          type: "list",
          heading: "Where accessibility checks happen in the product lifecycle",
          items: [
            { text: "Stage 1 · Design — colours, type and layout chosen; components and states defined; handoff to developers. Accessly Lens lives here" },
            { text: "Stage 2 · Development — VS Code extension, Xcode plugin, Android Studio plugin (in progress)" },
            { text: "Stage 3 · Build and CMS — WordPress plugin, Shopify plugin" },
            { text: "Stage 4 · Testing and live — 10+ audit and testing products, manual audits" }
          ]
        },

        {
          type: "text",
          label: "THE GAP",
          flush: "1",
          heading: "",
          body:
            "Our product line covered stages 2 to 4. Stage 1, where most issues are born, had no tool at all."
        },

        {
          type: "text",
          label: "THE GOAL",
          heading: "Shift accessibility left, all the way to the canvas.",
          body:
            "If design comes first, accessibility should be checked first. Fix it in Figma, and developers build it right the first time. I set myself three goals for the plugin:"
        },

        {
          type: "list",
          heading: "Three goals",
          items: [
            { text: "Catch it in design — find the issues a designer can actually fix in Figma, such as contrast, sizes, labels, headings, focus states and alt text, before handoff" },
            { text: "Teach while checking — every result says what failed, why it matters, which WCAG rule it maps to and how to fix it, so designers learn accessibility from their own work" },
            { text: "Hand developers the answers — put roles, names, alt text, reading order and states into the Figma file, so developers implement from annotations instead of guessing" }
          ]
        },

        {
          type: "text",
          label: "WHO IT'S FOR",
          heading: "Three people, one file."
        },

        {
          type: "list",
          heading: "Who it serves",
          items: [
            { text: "Designers — fast, plain-language feedback inside Figma, and one-click fixes for the common mistakes, without becoming WCAG experts first" },
            { text: "Developers — the accessibility intent of a design: what each element is, what it's called, the tab order and which states exist, handed over as a spec in Markdown or HTML" },
            { text: "Accessibility leads — a review trail: a score, the open issues, accepted exceptions, and a report frame they can sign off on in the file" }
          ]
        },

        {
          type: "text",
          label: "DESIGN PRINCIPLES",
          heading: "An accessibility tool has to be accessible, and easy.",
          body:
            "I treated the plugin's own UI as a test case. It had to pass the same rules it enforces, and it had to feel lighter than the problem. Ten UX laws shaped specific decisions:"
        },

        {
          type: "list",
          heading: "Ten UX laws, each tied to a decision",
          items: [
            { text: "Hick's law — 13 checks and 5 tools grouped into 5 tabs, so you never choose from 18 things at once" },
            { text: "Miller's law — each tab shows 1 to 6 chips, chunked by what the designer is thinking about" },
            { text: "Serial position — Scan is fixed top-right; failures always sort to the top of every list" },
            { text: "Fitts's law — every result card is one big click target that jumps to the layer" },
            { text: "Von Restorff — failures get a red bar, an icon and a word. Never colour alone" },
            { text: "Doherty threshold — feedback within 400ms: “Scanning…” instantly; 20,000 layers scan in about 0.6s" },
            { text: "Tesler's law — the tool absorbs the WCAG thresholds; the default filter shows only what needs fixing" },
            { text: "Jakob's law — familiar tabs, chips and segmented filters that follow Figma's own light and dark theme" },
            { text: "Peak-end rule — a clean scan ends on “All clear”, not an empty list" },
            { text: "Goal gradient — a score ring shows progress toward 100 as issues are fixed or accepted" }
          ]
        },

        {
          type: "text",
          label: "PROCESS",
          heading: "15 days, designed and built with AI.",
          body:
            "I used AI as my engineering partner. I owned the problem framing, the rules, every UX decision and the quality bar. AI accelerated the code, the test harness and the iteration loops, which is how a designer shipped a working, tested plugin in 15 days."
        },

        {
          type: "list",
          heading: "How the 15 days ran",
          items: [
            { text: "Days 1–2 · Research — mapped which WCAG 2.2 criteria are decidable in design, and audited real design files for common failures" },
            { text: "Days 3–4 · Structure — defined 13 checks and 5 tools, grouped into 5 tabs, and wireframed the scan → fix → hand off loop" },
            { text: "Days 5–8 · Engine — built the rule engine with AI: contrast maths, background detection, label matching, reading order" },
            { text: "Days 9–11 · Interface — designed and built the panel: tokens, both themes, keyboard model, states, empty and error screens" },
            { text: "Days 12–14 · Testing — 90 engine tests on a mock Figma, axe-core on every tab, keyboard, reflow and spacing checks" },
            { text: "Day 15 · Handoff — dev spec, review kit, Figma screens and prototype, and this case study" }
          ]
        },

        {
          type: "text",
          label: "INFORMATION ARCHITECTURE",
          heading: "Organised by how designers think.",
          body:
            "Not by WCAG chapter numbers. A designer polishing colours goes to Visual; one writing copy goes to Content; one wiring components goes to Interaction."
        },

        {
          type: "list",
          heading: "Five tabs",
          items: [
            { text: "Overview — all issues, score, exports" },
            { text: "Visual — text contrast, UI contrast, text size, line height, colour vision, contrast tool" },
            { text: "Content — alt text, headings, links, sensory" },
            { text: "Interaction — touch targets, focus order, focus state, forms" },
            { text: "Handoff — annotate, dev spec, review kit" }
          ]
        },

        {
          type: "text",
          label: "FEATURE WALKTHROUGH",
          heading: "Every feature, and why it exists.",
          body:
            "All screenshots are from the working plugin, scanning the same sample sign-up screen. The matching editable screens are in the Figma file."
        },

        { type: "text", label: "OVERVIEW" },

        {
          type: "text",
          label: "01 · GETTING STARTED",
          heading: "Scan a frame or the whole page",
          body:
            "The panel opens on a single instruction and one primary button. Select a frame to check just that screen, or select nothing to scan the page."
        },
        panelShot({
          file: "al-ready.webp",
          alt: "Empty state reading “Ready when you are. Select a frame, or nothing to check the whole page, then choose Scan.”",
          caption: "First run: one clear action."
        }),
        {
          type: "list",
          heading: "How it works",
          items: [
            { text: "The scan walks every visible layer once, skipping hidden layers and its own markers, and runs all 13 rules. The footer reports how many layers were scanned and how long it took" }
          ]
        },
        {
          type: "list",
          heading: "Design decision",
          items: [
            { text: "The scope is shown next to the Scan button, so you always know what the results refer to. Ctrl/⌘ + Enter scans from anywhere" }
          ]
        },

        {
          type: "text",
          label: "02 · OVERVIEW",
          heading: "One score, sorted by severity",
          body:
            "The Overview gives the whole picture: a score out of 100, the number of failures, items to review and passes, and every result, worst first."
        },
        panelShot({
          file: "al-overview.webp",
          alt: "Overview tab with a score ring at 68, counts of 12 fail, 9 review, 35 pass, filter options, Fix all, CSV and JSON buttons, and result cards.",
          caption: "Overview: score, counts and every issue in one list."
        }),
        {
          type: "list",
          heading: "What you can do",
          items: [
            { text: "Select any card to jump to and select that layer on the canvas" },
            { text: "Filter to To fix, Passing, Ignored or All" },
            { text: "Ignore an accepted exception — it's saved on the layer and leaves the score" },
            { text: "Export everything as CSV for tracking, or JSON for tooling" }
          ]
        },
        {
          type: "list",
          heading: "Severity, never colour alone",
          items: [
            { text: "Every card shows an icon, a word (Fail, Review, Pass) and the WCAG criterion, plus a coloured bar" }
          ]
        },

        {
          type: "text",
          label: "03 · STALE RESULTS",
          heading: "“Selection changed. Scan now.”",
          body:
            "If you select something else on the canvas, a banner tells you the results may be out of date and offers a one-click rescan."
        },
        panelShot({
          file: "al-selection-changed.webp",
          alt: "A yellow banner reading “Selection changed since the last scan” with a Scan now link.",
          caption: "Results never silently go stale."
        }),
        {
          type: "list",
          heading: "Edge case solved",
          items: [
            { text: "Jumping to a layer from a result card doesn't trigger the banner, and fixes refresh the original scope, so results don't collapse to the one layer you clicked" }
          ]
        },

        { type: "text", label: "VISUAL" },

        {
          type: "text",
          label: "04 · TEXT CONTRAST",
          heading: "Measured against the real background",
          body:
            "Each text layer's colour is compared to what's actually behind it: the card it sits on, not just the page. Large text (24px, or 18.66px bold) gets the 3:1 threshold; body text needs 4.5:1. WCAG 1.4.3, 1.4.6"
        },
        panelShot({
          file: "al-contrast.webp",
          alt: "Text contrast tab with an open How to fix panel and cards showing failing ratios such as 2.38 to 1 with colour swatches and Fix to AA buttons.",
          caption: "Text contrast with “How to fix” open."
        }),
        {
          type: "list",
          heading: "Fix to AA",
          items: [
            { text: "The button previews the suggested colour as a swatch. It keeps the hue, makes the smallest change that passes, and works on mixed-colour text. Fix all repairs every failing layer at once" }
          ]
        },
        {
          type: "list",
          heading: "Edge cases",
          items: [
            { text: "Text over images or gradients is flagged for a manual check instead of guessed" },
            { text: "Colours bound to variables are detached, so the fix sticks" },
            { text: "Layers with missing fonts are skipped and reported" }
          ]
        },

        {
          type: "text",
          label: "05 · UI CONTRAST",
          heading: "Inputs, buttons and icons",
          body:
            "Pale input borders and ghost buttons are among the most common design failures. The check finds each control's strongest edge — fill, border or icon — and tests it against 3:1. WCAG 1.4.11"
        },
        panelShot({
          file: "al-nontext.webp",
          alt: "UI contrast tab listing Input Email, Button Secondary and Icon button Close as failing 3 to 1.",
          caption: "Borders and icons need 3:1 too."
        }),
        {
          type: "list",
          heading: "Example",
          items: [
            { text: "The email field's #e5e7eb border is 1.24:1 on white, so it fails. A #767676 border would pass" }
          ]
        },

        {
          type: "text",
          label: "06 · TEXT SIZE",
          heading: "Readable, and able to grow",
          body:
            "Flags text under 12px, fixed-size text boxes inside clipping frames that would cut off at 200% zoom, and truncated text that loses content. WCAG 1.4.4"
        },
        panelShot({
          file: "al-fontsize.webp",
          alt: "Text size tab showing 10px legal text failing the 12px floor.",
          caption: "Small and clipped text."
        }),

        {
          type: "text",
          label: "07 · LINE HEIGHT",
          heading: "Comfortable body copy",
          body:
            "Body paragraphs below 1.5× line height are flagged for review. It's a small change in design that helps people with dyslexia and low vision. WCAG 1.4.8, 1.4.12"
        },
        panelShot({
          file: "al-spacing.webp",
          alt: "Line height tab flagging a privacy paragraph at 1.18 times line height.",
          caption: "Paragraph spacing."
        }),

        {
          type: "text",
          label: "08 · COLOUR VISION",
          heading: "See it the way others do",
          body:
            "Capture any frame and preview it as Deuteranopia, Protanopia, Tritanopia or Achromatopsia. Red error and green success states that look identical are spotted immediately. WCAG 1.4.1"
        },
        panelShot({
          file: "al-colourvision.webp",
          alt: "Colour vision tab showing the sign-up screen side by side: original and simulated Deuteranopia.",
          caption: "Side-by-side simulation."
        }),
        {
          type: "list",
          heading: "How it works",
          items: [
            { text: "Runs entirely inside the plugin using the published Machado, Oliveira and Fernandes (2009) simulation model. No upload, no server" }
          ]
        },

        {
          type: "text",
          label: "09 · CONTRAST TOOL",
          heading: "For choosing colours, not just checking them",
          body:
            "Enter or pick any two colours to see the ratio and pass/fail for body text, large text and UI, at AA and AAA. If it fails, the tool offers the nearest passing colour and applies it in one click."
        },
        panelShot({
          file: "al-picker.webp",
          alt: "Contrast tool with text colour 8a8a8a on white, a 3.45 to 1 ratio, a results table and a Use 757575 button.",
          caption: "A contrast checker that suggests the fix."
        }),
        {
          type: "list",
          heading: "Why it's here",
          items: [
            { text: "Designers kept leaving Figma for web checkers while building palettes. Now that loop stays in the panel" }
          ]
        },

        { type: "text", label: "CONTENT" },

        {
          type: "text",
          label: "10 · ALT TEXT",
          heading: "Write it where the image lives",
          body:
            "Image layers are detected automatically. Designers write the description right in the panel, or mark the image decorative, and it's saved on the layer — so it travels with the design into the Dev spec. WCAG 1.1.1"
        },
        panelShot({
          file: "al-alttext.webp",
          alt: "Alt text tab with a Hero illustration card, an input with a red error border and the message “Type a description, or choose Decorative.”",
          caption: "Validation built in."
        }),
        {
          type: "list",
          heading: "Quality checks",
          items: [
            { text: "Empty or very short text shows a visible, announced error" },
            { text: "Text starting with “image of”, or a file name like hero.png, is flagged for review" }
          ]
        },

        {
          type: "text",
          label: "11 · HEADINGS",
          heading: "Structure screen readers can navigate",
          body:
            "Levels come from layer names (“H2”) or text-style names (“Heading/H2”). Each screen is checked for exactly one H1 and no skipped levels. WCAG 1.3.1, 2.4.6"
        },
        panelShot({
          file: "al-headings.webp",
          alt: "Headings tab showing H3 Section failing because it skips from H1 to H3, and H1 Title passing.",
          caption: "Heading levels per screen."
        }),

        {
          type: "text",
          label: "12 · LINKS",
          heading: "Underlined and descriptive",
          body:
            "Inline links that rely on colour alone, and vague link text like “Read more” or “Click here”, are flagged with a suggestion. WCAG 1.4.1, 2.4.4"
        },
        panelShot({
          file: "al-links.webp",
          alt: "Links tab warning that Terms link isn't underlined and that Read more is vague.",
          caption: "Links that work without colour."
        }),

        {
          type: "text",
          label: "13 · SENSORY",
          heading: "Instructions everyone can follow",
          body:
            "Scans copy for instructions that depend on colour, shape or position, such as “Fields shown in red are required” or “click the round button”. WCAG 1.3.3"
        },
        panelShot({
          file: "al-sensory.webp",
          alt: "Sensory tab flagging the hint “Fields shown in red are required.”",
          caption: "Copy checks."
        }),

        { type: "text", label: "INTERACTION" },

        {
          type: "text",
          label: "14 · TOUCH TARGETS",
          heading: "Big enough to tap",
          body:
            "In mobile frames (430px wide or less), every interactive layer is measured: under 24×24 fails, under 44×44 is flagged as recommended. Nested layers are counted once. WCAG 2.5.8, 2.5.5"
        },
        panelShot({
          file: "al-touch.webp",
          alt: "Touch targets tab: the 20 by 20 close icon fails the 24 by 24 minimum and a 36px-high button is flagged for review.",
          caption: "Minimum and recommended sizes."
        }),

        {
          type: "text",
          label: "15 · FOCUS ORDER",
          heading: "Draw the tab order on the design",
          body:
            "Select a frame and the plugin numbers every interactive element in reading order, right on the canvas. Designers see immediately whether the keyboard path makes sense. WCAG 2.4.3"
        },
        panelShot({
          file: "al-focusorder.webp",
          alt: "Focus order tab listing five stops in order.",
          caption: "The list of tab stops…"
        }),
        shot({
          file: "al-canvas-focus.webp",
          alt: "The sign-up screen with numbered purple badges 1 to 5 on the close icon, two fields and two buttons.",
          caption: "…and numbered badges drawn on the canvas."
        }),
        {
          type: "list",
          heading: "For developers",
          items: [
            { text: "An intentional custom order can be documented with a “tabindex N” stamp, and any mismatch with the visual order is flagged" }
          ]
        },

        {
          type: "text",
          label: "16 · FOCUS STATE",
          heading: "Every control needs a visible focus",
          body:
            "Interactive component sets are checked for a Focus variant or a focus-ring layer. Missing focus styles are one of the most common things developers end up inventing, and it's solved here at the source. WCAG 2.4.7"
        },
        panelShot({
          file: "al-focusstate.webp",
          alt: "Focus state tab: the Button component set fails with no focus variant; Checkbox passes.",
          caption: "Component-level check."
        }),

        {
          type: "text",
          label: "17 · FORMS",
          heading: "Labels that stay visible",
          body:
            "Each field needs a visible label: the nearest aligned text above or to the left. Placeholder-only fields fail, asterisks need a “required” note, and error states need an error message in text. WCAG 1.3.1, 3.3.1, 3.3.2"
        },
        panelShot({
          file: "al-forms.webp",
          alt: "Forms tab: Input Email fails because the placeholder is the only label; Text field passes with label Full name.",
          caption: "Labels, required fields and errors."
        }),

        { type: "text", label: "HANDOFF" },

        {
          type: "text",
          label: "18 · ANNOTATE",
          heading: "Put the accessibility intent in the file",
          body:
            "Stamp landmarks (banner, navigation, main…), roles (button, switch, dialog…), heading levels, ARIA states (expanded, checked, invalid…) and free notes onto any layer. WCAG 4.1.2"
        },
        panelShot({
          file: "al-annotate.webp",
          alt: "Annotate tab with Type set to Role, Value set to button, a custom value field and a Stamp selected layers button.",
          caption: "Stamps for roles, landmarks, headings and states."
        }),
        {
          type: "list",
          heading: "Why it matters",
          items: [
            { text: "This is the heart of the handoff. Stamps aren't just visual: heading stamps feed the Headings check, and role, state and note stamps flow into the Dev spec" }
          ]
        },

        {
          type: "text",
          label: "19 · DEV SPEC",
          heading: "From design to code, without guesswork",
          body:
            "For every frame, the plugin lists each heading, image and control in reading order with its tab stop, role, accessible name, size, states and any problems — such as a missing label or missing alt text."
        },
        panelShot({
          file: "al-spec.webp",
          alt: "Dev spec tab with copy buttons for Markdown, HTML and JSON, a note that elements need attention, and a list of elements with tab stops, roles and problems.",
          caption: "A developer-ready accessibility spec."
        }),
        {
          type: "list",
          heading: "Three ways to hand off",
          items: [
            { text: "Markdown table for tickets and docs" },
            { text: "HTML starter with labels, alt text and ARIA already filled in" },
            { text: "JSON for tooling" }
          ]
        },
        {
          type: "list",
          heading: "Dev Mode",
          items: [
            { text: "Developers can open the plugin in Figma's Dev Mode to read checks and copy the spec. Editing actions are clearly marked as unavailable there" }
          ]
        },

        {
          type: "text",
          label: "20 · REVIEW KIT",
          heading: "Design critiques with evidence",
          body:
            "Issue markers pin a numbered red or amber dot on every layer that fails or needs review, which makes them ideal for screenshots and critiques. Report frame adds a dated summary next to the design: score, counts and every open issue grouped by check. It's a lightweight sign-off record that lives in the file."
        },
        panelShot({
          file: "al-review.webp",
          alt: "Review kit tab with buttons for issue markers, a report frame, and CSV and JSON exports.",
          caption: "Review kit…"
        }),
        shot({
          file: "al-canvas-report.webp",
          alt: "An Accessibility report frame on the canvas listing score 68 and grouped failures and warnings.",
          caption: "…and the report frame it adds beside the design."
        }),

        {
          type: "text",
          label: "21 · THEMES AND EXCEPTIONS",
          heading: "Built for real, everyday use",
          body:
            "The panel follows Figma's light or dark theme automatically, with contrast verified in both. Ignored items stay visible under their own filter, dashed and clearly labelled, and can be restored at any time. Tab, filter and panel size are remembered between sessions."
        },
        panelShot({
          file: "al-dark.webp",
          alt: "The Overview tab in dark theme, including a dashed card marked Ignored with a Restore link.",
          caption: "Follows Figma's dark theme, here showing an ignored exception."
        }),

        {
          type: "text",
          label: "LIVE PROTOTYPE",
          heading: "Try it. This is the real plugin.",
          body:
            "Below, the plugin's actual code and interface run against a simulated Figma file with a sign-up screen full of deliberate issues. Click layers on the canvas, scan, fix contrast, write alt text, number the focus order or add a report."
        },

        {
          type: "list",
          heading: "Three things to try",
          items: [
            { text: "Start — press Scan with nothing selected, then select any result card" },
            { text: "Fix — Visual → Text contrast → Fix all, and watch the canvas update" },
            { text: "Hand off — select the “Sign up” frame, then Handoff → Dev spec → Generate spec" }
          ]
        },

        {
          type: "figma",
          url: "https://www.figma.com/proto/RK4OenNOnjm3Xz3YXmqFvW/Accessly-Lens?node-id=5-3&starting-point-node-id=5-3",
          title: "Accessly Lens — live prototype",
          caption: "The plugin's real code and interface, running against a simulated Figma file."
        },

        {
          type: "html",
          html:
            '<div class="cs-cta"><a class="btn btn--outline btn--sm" href="https://www.figma.com/design/RK4OenNOnjm3Xz3YXmqFvW/Accessly-Lens?node-id=0-1" target="_blank" rel="noopener">View all 24 screens in Figma →</a></div>'
        },

        {
          type: "text",
          label: "QUALITY",
          heading: "It passes its own test.",
          body:
            "An accessibility tool that isn't accessible loses all credibility. I tested the plugin the way we test client products."
        },

        {
          type: "list",
          heading: "The numbers behind that",
          items: [
            { text: "0 axe-core violations across all 18 tabs, light and dark" },
            { text: "90 automated engine tests covering every check and edge case" },
            { text: "0.6s to scan a 20,000-layer file" },
            { text: "0 network calls — everything runs locally in Figma" }
          ]
        },

        {
          type: "list",
          heading: "Plugin UI accessibility results",
          items: [
            { text: "Keyboard only: skip link, tabs with arrow keys, Home and End, visible focus on every control — Pass" },
            { text: "Focus stays in the list when a fix removes a card — Pass" },
            { text: "Reflow at 320px, no sideways scrolling (1.4.10) — Pass" },
            { text: "Increased text spacing, no clipping (1.4.12) — Pass" },
            { text: "Status announcements for scans, fixes and copies (4.1.3) — Pass" },
            { text: "Errors visible and announced, with aria-invalid (3.3.1) — Pass" },
            { text: "Reduced motion, forced colours, increased contrast — Pass" }
          ]
        },

        {
          type: "text",
          label: "IMPACT",
          flush: "1",
          heading: "Most issues now never reach code.",
          body:
            "Using Accessly Lens on our own design work, we're now resolving roughly 70% of accessibility issues in the design itself. Those are the issues that used to surface in development or audits."
        },

        {
          type: "list",
          heading: "What changed for each role",
          items: [
            { text: "Designers understand why something fails and fix it in seconds, often with one click" },
            { text: "Developers check the design and build to the annotations and Dev spec, so they no longer have to infer roles, labels or tab order" },
            { text: "All accessibility data lives in the Figma file — alt text, roles, states, headings, focus order and accepted exceptions — so the design becomes the single source of truth" }
          ]
        },

        {
          type: "text",
          label: "WHERE THIS FITS",
          flush: "1",
          heading: "",
          body:
            "Accessly Lens completes our lifecycle: design (this plugin), code (VS Code, Xcode, Android Studio), build (WordPress, Shopify) and live (our testing products)."
        },

        {
          type: "text",
          label: "WHAT I LEARNED",
          heading: "Reflections."
        },

        {
          type: "list",
          heading: "",
          items: [
            { text: "Know what design can and can't decide — about a third of WCAG needs real code or real users. Being explicit about that, with “Review” instead of a false “Pass” for things like text over images, built trust with designers" },
            { text: "Naming is an interface — because the plugin reads layer and style names (“button”, “H2”, “input”), good naming became an accessibility habit. The “How to fix” tips teach it" },
            { text: "AI raises the ceiling for designers — I could ship a tested, working product in 15 days because AI handled the heavy engineering. That freed my time for the rules, the edge cases and the experience, which are the parts that needed a designer" }
          ]
        },

        {
          type: "text",
          label: "NEXT",
          flush: "1",
          heading: "",
          body: "What I'm building next:"
        },

        {
          type: "list",
          heading: "",
          items: [
            { text: "Contrast audits across colour-variable modes (light and dark tokens at once)" },
            { text: "Focus-not-obscured checks for sticky headers (2.4.11)" },
            { text: "Sending the Dev spec straight into our VS Code and Android Studio plugins, so design intent and code checks share one data model" }
          ]
        }
      ],

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to talk through it. Details sit under NDA; glad to walk through them in an interview."
      }
    }
  ];

  window.SEED = {
    version: 1,
    auth: {
      salt: "pk.portfolio.salt",
      hash: DEFAULT_HASH,
      // PBKDF2-SHA256 verifier (600k iterations, OWASP) — salts were generated
      // once at setup; no plaintext password exists anywhere in this repository.
      kdf: {
        iter: 600000,
        authSalt: "76ff0726a5d1515801ea3f5b9c4251de",
        sessionSalt: "e60a85efd60f2153332b49af8fe0521a",
        verifier: "67026b0b654a5022c57e2c1c7e4bdaf166883b77a42617b7540a9bee4a3c370b"
      }
    },
    site: SITE,
    caseStudies: CASE_STUDIES
  };
})();
