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

  /** A reserved slot for a tall portrait screenshot (a Figma plugin panel runs
      800×1360). Capped by .cs-panel so it keeps panelShot's footprint, and —
      because it sits directly after a `text` block — case-study.js folds the
      pair into a two-column feature row instead of stacking them. */
  function pendingPanel(label, note) {
    return { type: "html", html: '<div class="cs-panel">' + pendingSlot(label, note) + "</div>" };
  }

  /** Competitive matrix. Five columns can't fit the 640px copy measure, so the
      table scrolls inside a labelled, focusable region — a keyboard user can
      reach and scroll it (WCAG 2.1.1) — with `scope` tying every cell back to
      its header (1.3.1). */
  function compTable(rows) {
    return {
      type: "html",
      html:
        '<div class="cs-table-wrap" tabindex="0" role="region" aria-label="Competitive comparison of Figma accessibility plugins">' +
          '<table class="cs-table">' +
            "<caption>Accessibility plugins for Figma — what each offers, and the gap it leaves</caption>" +
            "<thead><tr>" +
              '<th scope="col">TOOL</th><th scope="col">WHAT IT OFFERS</th><th scope="col">APPROACH</th>' +
              '<th scope="col">PRICE</th><th scope="col">GAP</th>' +
            "</tr></thead><tbody>" +
            rows.map(function (r) {
              return "<tr>" +
                '<th scope="row">' + esc(r[0]) + "</th>" +
                r.slice(1).map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") +
              "</tr>";
            }).join("") +
          "</tbody>" +
        "</table>" +
        "</div>"
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

  /** One screenshot, full width of the media column. Pass `standalone: true`
      to keep it out of the two-column feature fold — it then renders as its
      own section directly below the preceding text block. */
  function shot(s) {
    var b = { type: "image", src: "assets/img/" + s.file, alt: s.alt, caption: s.caption || "" };
    if (s.width) b.width = s.width;
    if (s.standalone) b.standalone = true;
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

  /** One tall portrait screenshot (a plugin panel runs 800×1360), capped by
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
        /* ── 2 · HOOK ─────────────────────────────────────────────────────
           Guide, Stage 9.3: drop the reader into one moment, open a gap. */
        {
          type: "quote",
          text: "I spent longer writing up one issue than finding it.",
          attribution: "Tester, our internal accessibility audit team"
        },

        {
          type: "text",
          label: "THE MOMENT",
          heading: "One hour finding issues. Three hours typing them up.",
          body:
            "That was a normal day on our audit team. A tester spent about an hour testing a web page against WCAG, then about three hours documenting what they found, field by field, across two 30-column spreadsheets. Three quarters of a skilled tester's day went into retyping, not testing. I was the only designer, working from a verbal brief from our CEO, with no product vision yet and two spreadsheets to replace."
        },

        /* ── 3 · VISUAL TEASE ─────────────────────────────────────────────
           Guide, Stage 8.2: show the solution before the backstory.
           `standalone` keeps the cover out of the two-column fold, so on web
           it sits below the copy full width — the way Accessly Lens opens. */
        shot({
          file: "acs-cover.webp",
          alt: "Cover: the words “Accessly — project dashboard, a unified workspace for managing projects” beside the Projects screen, which lists Recent Projects, a Grid and Table toggle, a Create Project card and results paginated 1 to 50.",
          caption: "Where it ended up — Accessly, the client SaaS built on the patterns from Accessly Internal",
          width: "full",
          standalone: true
        }),

        /* ── 4 · PROBLEM AND CONTEXT ──────────────────────────────────────
           Guide, Stage 3: the real problem in business language, why it is
           worth solving, the minimum background, one context card. */
        {
          type: "text",
          label: "THE PROBLEM",
          heading: "Our audit business was selling testing hours and spending them on data entry",
          body:
            "We run manual WCAG audits for enterprise clients and sell them by the hour. Every issue a tester finds becomes a formal report entry: what fails, where, how to reproduce it, which success criterion it breaks, how severe it is and how to fix it in code. All of that was typed by hand into an internal tracking sheet, then retyped into a client report. So the hours clients paid for went mostly into documentation, review happened in spreadsheet cells nobody was notified about, and every copy-paste was a chance to send a client a wrong fix."
        },

        shotPair(
          {
            file: "acs-excel-internal.webp",
            alt: "The internal tracking spreadsheet: page, issue name, comments, status, who tested and reviewed it, issue description, screenshot, severity and WCAG success criteria columns, with the hidden review workflow running off to the right.",
            caption: "Before — the internal tracking sheet (client details hidden)"
          },
          {
            file: "acs-excel-client.webp",
            alt: "The client-facing report spreadsheet: page name, issue name, actual result, steps to reproduce, screenshot and expected results, with client screenshots and code replaced by NDA notes.",
            caption: "Before — the client report, the same data typed a second time"
          }
        ),

        {
          type: "list",
          heading: "What I found reading the sheets column by column",
          items: [
            { text: "The same text typed twice: “Comments” and “Issue Description” held identical text, and a “Move to Report” column meant retyping the row into the client sheet" },
            { text: "A seven-stage review workflow hidden in columns (Tested By → Testing Reviewed By → Written By → Self QC → Reporting Reviewed By → QA → Finalized), with no status view and no notifications" },
            { text: "Errors that reached clients: in one row “Suggested Code” was identical to “Existing Code”, formula cells showed #N/A, and one sheet said “High” where the other said “Major / Critical”" },
            { text: "Feedback cut off mid-word in a single cell (“no need to ra…”), and no record of who changed what, or when" }
          ]
        },

        {
          type: "meta",
          items: [
            { label: "PRODUCT", value: "Accessly Internal (our audit team), which became Accessly (client SaaS, Free / Pro / Enterprise)" },
            { label: "SCOPE", value: "Full product, 0 → 1 — a new internal tool first, then the same patterns shipped as a client SaaS. Not a redesign: two spreadsheets were replaced outright" },
            { label: "MY ROLE", value: "Sole UI/UX designer, end to end: research, IA, flows, wireframes, UI, design system" },
            { label: "TIMELINE", value: "~3 months to v1 in internal use; ~6 more months to the live client version; design system ~1 month" },
            { label: "TEAM", value: "CEO as product owner; 3 developers when I started, a 20-person team today" },
            { label: "USERS", value: "Testers, QA and reviewers · Managers and mentors · Admins · and later, clients" },
            { label: "CONSTRAINTS", value: "An accessibility company can't ship an inaccessible tool · 15+ fields per issue, including code · years of Excel habits · solo designer, 300+ screens" }
          ]
        },

        /* ── 5 · SOLUTION JOURNEY ─────────────────────────────────────────
           Guide, Stage 4: one user, one scenario, each screen with the
           user's thought and the design decision behind it. Each text block
           followed by a single shot renders as a side-by-side row. */
        {
          type: "text",
          label: "SOLUTION JOURNEY",
          heading: "One page, from scan to signed-off report",
          body:
            "Follow a tester on our team through one page of a client audit. Before, this was an hour of testing and three hours of typing. Now the scan has already documented what it can, and the tester's job is to judge it."
        },

        {
          type: "text",
          label: "STEP 1 · REPORT",
          heading: "“How much of this is already done?”",
          body:
            "The tester opens the project's Report and the issues are already there, generated from our own ruleset. The question in their head isn't what's wrong yet, it's how big the job is. So the Overall view shows one row per issue type, with pages affected, instance count, WCAG principle, severity and level, instead of 500 rows of instances. When they need the detail, they switch to Issue, Code or List without leaving the page."
        },
        shot({
          file: "acs-report-v2.webp",
          alt: "Report V2: the Project Report with Overall, List, Issue and Code tabs, here showing instances grouped under each issue type.",
          caption: "Report — four views of the same data: Overall, Issue, Code, List"
        }),

        {
          type: "text",
          label: "STEP 2 · ISSUE DETAIL",
          heading: "“Is the system right about this one?”",
          body:
            "They open an instance to check it. Everything needed to judge it sits on one screen: the element, the page, a Steps to Validate field that says exactly what to check, and the screenshot. The system's Type and the tester's Updated Type sit side by side in the header, so the tester can overrule the scan without erasing what it said. Success criterion, level and severity stay pinned in a sticky footer, and “1 of 4” moves to the next instance without going back to the list."
        },
        shot({
          file: "acs-issue-detail-v2.webp",
          alt: "Issue Detail V2: one instance at a time with “1 of 4 issues” navigation, element and page details, steps to validate, media, and Update, Pass and Edit actions in the header.",
          caption: "Issue Detail — one instance, everything needed to judge it"
        }),

        {
          type: "text",
          label: "STEP 3 · CREATE ISSUE",
          heading: "“The scan missed one. Let me log it before I lose it.”",
          body:
            "Automated rules don't catch everything, so testers still find issues by hand. Create Issue opens as a full page with the same layout as Issue Detail, so what they write is what a reviewer will later read. Only five fields are required (Element, Issue Type, Page, Status, Existing Code). The level fills itself from the chosen success criterion, so a whole class of mismatch errors from the Excel days can't happen."
        },
        shot({
          file: "acs-create-issue-v2.webp",
          alt: "Create Issue V2: a full page opened from the report breadcrumb, with element, issue type, page, browsers, steps to reproduce, results, existing and suggested code, a media panel and the tester's name.",
          caption: "Create Issue — one issue, full page, five required fields"
        }),

        {
          type: "text",
          label: "STEP 4 · REVIEW AND LOGS",
          heading: "“Who changed this, and why?”",
          body:
            "When a reviewer approves or sends an issue back, the change is recorded as one readable sentence: who, what, from what to what, on which issue, and when. That same feed appears inside Issue Detail and on the Logs screen, with search and a date range. The seven review stages that used to hide in spreadsheet columns are now statuses everyone can see."
        },
        shot({
          file: "acs-logs.webp",
          alt: "Logs screen: a search box and a Last 7 Days filter above a feed of one-sentence activity entries — who created an issue, who changed a status and from what to what, and who edited code, each with a timestamp.",
          caption: "Logs — the audit trail Excel never had"
        }),

        {
          type: "text",
          label: "STEP 5 · SCORE",
          heading: "“Can I tell the client how bad it is in one sentence?”",
          body:
            "Once issues are signed off, the Score tab turns them into something a client can act on: a Defect Score (risk, Low to Very High) and a Conformance Score (Poor to Excellent against WCAG A, AA, AAA). The two gauges have opposite polarity, so their colour bands run in opposite directions, and each one writes its value and meaning in text so colour is never the only signal."
        },
        shot({
          file: "acs-score.webp",
          alt: "Score screen: an Issues by Severity pie with its legend, a Defect Score gauge and a Conformance Score gauge side by side with their values and risk bands written out as text under each dial, a Top 7 Fails table, and Issues by Conformance Level and Issues by WCAG Principle bar charts, each with a Chart / Table toggle.",
          caption: "Score — two gauges, each with its meaning written out"
        }),

        {
          type: "text",
          label: "STEP 6 · TIMESHEET",
          heading: "“…and I don't have to log my hours.”",
          body:
            "A Production on/off toggle in the header has been tracking time all along. When the tester switches off or logs out, the hours land in the timesheet by project and process (testing, reporting, QA). Managers see sold hours against actual hours without anyone filling in a form."
        },
        shot({
          file: "acs-timesheet.webp",
          alt: "Timesheet screen: Overview (Daily) with production hours per project, today's breakdown by activity, and off-production, training and meeting hours.",
          caption: "Timesheet — filled by the Production toggle"
        }),

        {
          type: "quote",
          text: "Now I check what the system wrote instead of writing it myself.",
          attribution: "Tester, our internal accessibility audit team"
        },

        /* ── 6 · DECISION STORIES ─────────────────────────────────────────
           Guide, Stage 2: 3–5 stories, six parts each — title, hook,
           before, the turning point (options + trade-off), actions, result. */
        {
          type: "text",
          label: "DECISION STORIES",
          heading: "Five calls that shaped the product",
          body:
            "The journey above is the result. These are the moments behind it where there was more than one reasonable answer, and I had to pick one."
        },

        {
          type: "decisions",
          stories: [
            {
              title: "1 · Why I killed batch issue creation after watching testers use it on a live project",
              lead: "My hypothesis was that testers would save time logging several issues at once. Watching them on a real client audit proved me wrong three different ways.",
              before: "Create Issue V1 was a modal. Testers queued several issues with Add New, then submitted them all with Create.",
              options: "Fix the three failures inside the batch modal, or drop batching and log one issue at a time on a full page.",
              tradeoff: "Testers lost track of which queued issue they were filling in, one invalid field blocked the whole batch, and closing the modal by accident lost everything. Patching would have fixed the symptoms of a model that didn't match how testers work: they find issues one at a time. Batching only saved time on paper.",
              action: "One issue at a time, on a full page, laid out exactly like Issue Detail so what you write is what a reviewer reads. Required fields cut to five. Level derived from the success criterion. Field names made consistent across screens: Failed Environment became Browsers, Actual / Expected Code became Existing / Suggested Code.",
              result: "Testers log fast and add detail later, nothing is lost to a stray click, and the Excel-era level mismatches disappeared because nobody types the level any more. It also taught me the lesson I'd now apply first: watch someone do the job before designing the shortcut."
            }
          ]
        },

        shotPair(
          {
            file: "acs-create-issue-v1.webp",
            alt: "Create Issue V1: a modal filled in for one issue, with page, issue, issue type, success criteria, severity, failed environment, steps to reproduce, media upload, results and code fields, and Clear, Create and Add New actions.",
            caption: "Before — V1 batch modal, with Add New queuing more issues"
          },
          {
            file: "acs-create-issue-v2.webp",
            alt: "Create Issue V2: a full page opened from the report breadcrumb, with element, issue type, page, browsers, steps to reproduce, results, existing and suggested code, a media panel and the tester's name.",
            caption: "After — V2, one issue on a full page, same layout as Issue Detail"
          }
        ),

        {
          type: "decisions",
          stories: [
            {
              title: "2 · How one 30-column spreadsheet row became four purpose-built Report views",
              lead: "V1 put every instance on one screen with a large screenshot in each row. Only about nine rows fit on a laptop.",
              before: "One Excel row carried 30 columns, and V1 faithfully reproduced it as one table.",
              options: "Keep one table and make it denser, or split the same data into views that each answer one person's question.",
              tradeoff: "Splitting risked hiding detail: a manager still needed the whole site at once, and a tester still needed every instance. One dense table served neither. I chose to split by question, as long as every view stayed one click away on the same page.",
              action: "Overall (one row per issue type, for managers), Issue (instances grouped by type, for testers), Code (instances grouped by identical code, so a developer fixes many with one change) and List (a flat table to sort and filter). Screenshots moved to Issue Detail where they're readable. Bulk Update, Pass and Export appear once rows are selected, with a live count. The result taxonomy, Fail / Validate / Suggestion / Pass, is the same one Accessly Extension uses.",
              result: "A manager reads what's wrong across a whole site without scrolling 500 rows, and changing 100 statuses is one action instead of 100 cell edits."
            }
          ]
        },

        shotPair(
          {
            file: "acs-report-v1.webp",
            alt: "Report V1: one table where every instance of an issue sits on its own row with a screenshot thumbnail, severity, success criterion and status.",
            caption: "Before — Report V1, every instance with a screenshot in the row"
          },
          {
            file: "acs-report-v2.webp",
            alt: "Report V2: the Project Report with Overall, List, Issue and Code tabs, here showing instances grouped under each issue type.",
            caption: "After — Report V2, four views of the same data"
          }
        ),

        {
          type: "decisions",
          stories: [
            {
              title: "3 · Why I kept the team's Excel words, but not their severity scale",
              lead: "The testers had years of muscle memory in a spreadsheet. A new product was going to ask them to give that up, and I didn't want vocabulary to be the reason they refused.",
              before: "Statuses like Perfect Issues, Approved After Fixing, Delete – QA, No QA Needed and To Be Approved lived in Excel. Severity was free text: one sheet said “High”, the other “Major / Critical”.",
              options: "Design a clean, new taxonomy for everything, or keep the team's language exactly as it was.",
              tradeoff: "Renaming statuses would have made the product feel tidier to me and foreign to them. But keeping everything as-is would have kept the inconsistency that was sending clients mixed severity labels. So I split the decision: keep the words people use to talk about their work, standardise the data that clients read.",
              action: "Every Excel status became a product status, unchanged. Severity became one shared scale across both products (Blocker, Critical, Major, Minor, Best Practice), and level is derived from the success criterion instead of typed.",
              result: "Nothing had to be relearned, so adoption friction stayed low, and the severity mismatches stopped reaching client reports. The same severity scale later mapped straight onto Jira priorities for clients."
            }
          ]
        },

        {
          type: "decisions",
          stories: [
            {
              title: "4 · How I made charts usable for the people we audit for: a table behind every chart",
              lead: "An accessibility company shipping charts a screen reader can't read would undercut everything we sell.",
              before: "The dashboard and Score screens are mostly charts, and charts are rarely usable with a screen reader or for people who can't tell colours apart.",
              options: "Add text descriptions to each chart, or give every chart a full data table equivalent the user can switch to.",
              tradeoff: "A description summarises; it can't be sorted or navigated cell by cell. A table toggle costs a second view per widget for developers to build, but it gives screen-reader users the same data sighted users get, not a summary of it.",
              action: "A Chart / Table toggle on every widget, with a fully accessible table view. Patterns (dots, stripes, checks) separate chart segments so colour isn't the only cue (WCAG 1.4.1). Over-budget KPIs use a red card and an up-arrow, never colour alone. Alt text on every screenshot, including the evidence testers upload. The chart library was chosen with the developers for accessibility from the start.",
              result: "Every number on the dashboard can be reached and read without seeing the chart, and the same pattern carried into Accessly unchanged."
            }
          ]
        },

        shotPair(
          {
            file: "acs-dashboard-chart.webp",
            alt: "Project Dashboard, chart view: KPI cards for delivered, units, issues, sales hours, actual hours and overshoot, with actual hours and overshoot on red cards with up arrows; beneath them, charts drawn with patterned segments, each with a Chart / Table toggle.",
            caption: "Chart view — patterned segments, red cards with an arrow for overshoot"
          },
          {
            file: "acs-dashboard-table.webp",
            alt: "The same Project Dashboard with every widget switched to its Table view — sortable, labelled rows carrying the same numbers the charts draw.",
            caption: "Table view — the same numbers, sortable and screen-reader friendly"
          }
        ),

        {
          type: "decisions",
          stories: [
            {
              title: "5 · What I left out when the internal tool became a product for paying clients",
              lead: "Turning Accessly Internal into Accessly meant deciding which of our own features a client should see. The answer came from one question: what is the client actually paying for?",
              before: "Accessly Internal had features that exist to run our audit business: the Timesheet, the testers' Leaderboard and the Production toggle. Clients had none of the things they'd need alone: choosing pages, running scans, proving progress.",
              options: "Ship the internal tool to clients as it was, or keep the shared core and rebuild only the edges for a different job.",
              tradeoff: "Shipping everything was faster, but clients pay for results, not hours, so billing and tester-quality features would only be clutter, and missing the self-serve features would leave them stuck. Keeping the core meant the screens that our team had already stress-tested on live audits went to clients unchanged.",
              action: "Report and Issue Detail shipped unchanged in structure. Timesheet, Leaderboard and the Production toggle stayed internal. New for clients: Pages (add and retest their own URLs), Scans (on demand, weekly or monthly), Results Comparison (two scans side by side, new and fixed issues), Jira integration (our severities, statuses and fields mapped to theirs) and Custom Standards (our ruleset, switchable rule by rule).",
              result: "Accessly started from patterns that had already survived real audits, and it is now used by 100+ paying customers. The Jira mapping solved the Excel problem a second time: copy-paste between two tools replaced by mapped fields."
            }
          ]
        },

        shotGrid(
          [
            {
              file: "acs-pages.webp",
              alt: "Pages screen: overview cards for unscanned and scanned pages, a table of page names and URLs with created dates and results, plus search, per-page settings and bulk actions.",
              caption: "Pages — clients choose what gets tested"
            },
            {
              file: "acs-compare.webp",
              alt: "Results Comparison screen: two scans compared side by side with fails, validates and totals, the updated issue list, and new and fixed issues grouped by issue type.",
              caption: "Results Comparison — proof of progress"
            },
            {
              file: "acs-jira.webp",
              alt: "Jira integration screen: project link and issue type, sync options, severity mapping from Blocker to Best Practice, and status mapping from To Do, In Progress and Completed to Jira statuses.",
              caption: "Jira — our fields mapped to theirs"
            },
            {
              file: "acs-standards.webp",
              alt: "Custom Standards screen: a client standard based on WCAG 2.2 (AA) with Automated and Manual rulesets, rule names such as skipped heading level and missing form labels, and an element table underneath.",
              caption: "Custom Standards — our ruleset, their policy"
            }
          ],
          "cs-grid--2"
        ),

        /* Scores sit here, not under the cover: Stage 8.2 runs tease straight
           into problem with nothing between, and keeping the numbers this far
           up is what lets the first Decision Story land in the first half. */
        {
          type: "outcomes",
          heading: "What changed",
          items: [
            { value: "~3 hrs → ~30 sec", label: "to document the auto-detected issues on one page" },
            { value: "~90%", label: "fewer data-entry errors (team estimate): issues are generated, testers validate" },
            { value: "100+", label: "paying customers on Accessly, the client product built on the same patterns" },
            { value: "300+", label: "screens across both products, from one designer and one design system" }
          ],
          note: "The 3 hours comes from our timesheet logs for hand-documented pages; the 30 seconds is what the product takes to generate a page's documented issues. Testers still check every issue, so the time saved is in typing, not judgement."
        },

        /* ── 7 · ITERATION ARCHIVE ────────────────────────────────────────
           Guide, Stage 5: the versions thrown away, and why. */
        {
          type: "text",
          label: "ITERATION ARCHIVE",
          heading: "What I tried first, and why it didn't survive",
          body:
            "The structure came before any UI. I mapped the brief into a rough flow, mapped each section to its data, then wireframed ten screens with open questions on sticky notes. (The original wireframes were lost over 2.5 years; the board below is recreated for presentation.)"
        },

        shot({
          file: "acs-wireframes.webp",
          alt: "Board of ten low-fidelity wireframes: 01 Project dashboard, 02 Dashboard table view, 03 Projects list, 04 Issue report, 05 Issue details, 06 Create issue, 07 Create issue filled, 08 Activity logs, 09 Timesheet and 10 Profile settings, each annotated with sticky-note questions such as chart or table toggle per widget and scroll versus table view.",
          caption: "Wireframes, recreated — the sticky notes were the open questions, like “chart or table toggle per widget?”",
          width: "full"
        }),

        {
          type: "list",
          heading: "Project structure: 4 sections became 8 tabs",
          items: [
            { text: "URLs, buried inside Details → Pages, its own tab, because pages are the unit testers actually work in" },
            { text: "No Score → Score, because a bare number in a list needed context" },
            { text: "One Report → Report split into four views (Decision story 2)" },
            { text: "No history → Logs, to replace the audit trail Excel never had" },
            { text: "Dashboard, Details and Plan kept; a lighter Overview added for a summary without the full dashboard" }
          ]
        },

        {
          type: "text",
          label: "ITERATION · ISSUE DETAIL",
          heading: "Accordions → one instance at a time",
          body:
            "V1 stacked all 10–20 instances of an issue type in accordions on one page, with one media panel serving all of them. Testers scrolled constantly and couldn't tell which screenshot belonged to which instance. V2 shows one instance per page with “1 of 4” navigation. The cost was extra navigation, which is why the next / previous control and the sticky metadata footer had to exist."
        },
        shotPair(
          {
            file: "acs-issue-detail-v1.webp",
            alt: "Issue Detail V1: every instance of one issue stacked in accordions on a single page, with environment, actual result, recommendation, expected result and code fields shared across them.",
            caption: "Thrown away — V1, every instance in accordions"
          },
          {
            file: "acs-issue-detail-v2.webp",
            alt: "Issue Detail V2: one instance at a time with “1 of 4 issues” navigation, element and page details, steps to validate, media, and Update, Pass and Edit actions in the header.",
            caption: "Kept — V2, one instance with next / previous"
          }
        ),

        {
          type: "text",
          label: "ITERATION · PROJECTS",
          heading: "A plain table → a place to start",
          body:
            "The first client Projects screen was the internal list: a table with delivery date and issue count. That worked when projects were assigned to testers, but clients arrive alone and have to start one themselves. The final version puts Recent Projects on top (most people work on 2–3 at a time), makes Create Project the obvious first action, adds a grid / table toggle, tags, a How to Use panel and a link to install the extension. Scores moved out of the list into the Score tab, because a bare 80% told a client nothing."
        },
        shotPair(
          {
            file: "acs-projects-v1.webp",
            alt: "Accessly Projects, first variation: a plain table of projects with delivery date and number of issues, and a search box.",
            caption: "Thrown away — the internal table, shipped to clients"
          },
          {
            file: "acs-projects-v2.webp",
            alt: "Accessly Projects, final version: recent projects on top, a grid / table toggle, project tags, a Create Project action in the header and as a card, and an extension install prompt.",
            caption: "Kept — recent projects, create action, grid / table toggle"
          }
        ),

        {
          type: "text",
          label: "ITERATION · SETTINGS",
          heading: "One form → a settings area that states its rules",
          body:
            "Settings began as an Edit Profile form behind a two-item menu. As admins needed to manage users, clients, guidelines, success criteria and statuses, it became a full settings area, and the account rules moved onto the screen instead of being left to guesswork: accepted file types and size, mandatory fields, and where password change and subscription cancellation live."
        },
        shotPair(
          {
            file: "acs-profile-v1.webp",
            alt: "Accessly Settings, first variation: an Edit Profile form with profile picture, full name, email and password fields, behind a Settings menu that holds only Edit Profile and Members.",
            caption: "Thrown away — Edit Profile, two-item menu"
          },
          {
            file: "acs-profile-v2.webp",
            alt: "Accessly Settings, final version: the Profile screen inside a full Settings menu, showing the upload size and file-format rules, fields marked with an asterisk as mandatory, first and last name, email, a Change Password link and a Cancel Subscription option above Cancel and Update.",
            caption: "Kept — full settings area, rules written on screen"
          }
        ),

        /* ── 8 · UI SYSTEM AND CRAFT ──────────────────────────────────── */
        {
          type: "text",
          label: "UI SYSTEM",
          heading: "One system behind 300+ screens and two products",
          body:
            "I didn't draw 300+ screens one by one. I built a design system alongside the product (about a month of work): tokens, components and documented accessible states for focus, error, disabled and motion. Type follows the same rule — one heading and body scale held as shared styles rather than set per screen, so a heading is the same size wherever it appears, and changing it once changes it everywhere. Spacing comes from a single scale too: every margin, padding and component gap is a step on that scale, which is why screens built months apart still line up without anyone measuring. Every colour token was checked against WCAG AA/AAA contrast when it was created, not audited later. When Accessly was built, it inherited the same components, so a second product didn't mean a second UI, and one designer could keep both consistent while the team grew from 3 developers to 20."
        },

        {
          type: "list",
          heading: "Rules the system enforces on every screen",
          items: [
            { text: "Status is never colour alone: severity, over-budget KPIs and scan results all pair colour with a word, an icon or a shape" },
            { text: "One result taxonomy everywhere: Fail / Validate / Suggestion / Pass means the same thing in Accessly Internal, Accessly and Accessly Extension" },
            { text: "One activity component: the Logs feed and the history inside Issue Detail are the same component" },
            { text: "Same layout for create and read: Create Issue and Issue Detail share one structure" }
          ]
        },

        /* ── 9 · REFLECTION AND FUTURE SCOPE ──────────────────────────── */
        {
          type: "text",
          label: "REFLECTION",
          heading: "What I'd do differently",
          body:
            "Watch someone do the job before designing the shortcut. I designed batch creation before I'd seen a tester use it, and it took one live client project to expose three failures. Next time I'd run that test in week one and start Create Issue on a full page. I'd also write decisions down from day one: working as the only designer while the team grew from 3 developers to 20, a UI choice that lived only in my head broke the moment someone else built on it."
        },

        {
          type: "list",
          heading: "What I'd keep",
          items: [
            { text: "Automate the documentation, not the judgement. Keeping Type and Updated Type side by side is what made testers trust the system" },
            { text: "Respect the vocabulary people already have. Reusing Excel's statuses made adoption easy" },
            { text: "Give every number a context. A bare 80% helped nobody; the same score on a gauge with a risk band did" },
            { text: "Build the design system with the product, not after it. It's the only reason one designer could ship 300+ consistent screens" }
          ]
        },

        {
          type: "text",
          label: "FUTURE SCOPE",
          flush: "1",
          body:
            "The next manual job to remove is the fix itself. Generate Code, which started as a button in Issue Detail, writes an accessible fix for each failing snippet and is now part of a separate AI product in production. The pattern holds: the extension finds issues, Accessly manages them, and AI code fixes close the loop."
        }
      ],

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to talk through it. Details sit under NDA; glad to walk through them in an interview."
      }
    },

    /* ======================================================================
       Accessly Lens — Figma plugin, WCAG 2.2 audit + one-click fixes.
       Screens live in assets/img/lens-*.webp — 800×1360 panels, plus
       800×1178 / 800×756 overlays — cropped to their true panel bounds (no
       baked-in drop shadow, no transparent margin) and exported in both
       themes. This study runs the light set through the walkthrough and
       closes with a dark pair. The full-width cover (1586×992) and its
       1440×900 card crop use the same artwork as acs-*.
       panelShot() directly after a `text` block folds the pair into the
       two-column feature row (case-study.js); after a `list` it stands alone,
       capped at 500px by .cs-panel.

       No slots remain reserved — the lifecycle diagram (lens-lifecycle) and
       the v1→v4 structure image (lens-structure) both landed as standalone
       inset shots (default width, .cs-media). To add another, drop the file in
       assets/img/ and use

         shot({ file: "lens-x.webp", alt: "…", caption: "…" })
         shotPair(a, b)          two side by side
       ====================================================================== */
    {
      slug: "accessly-lens",
      metaTitle: "Accessly Lens — a Figma plugin that catches WCAG issues before code",
      shortTitle: "Accessly Lens",
      order: 2,

      /* card + hero */
      category: "Figma Plugin · Product Design",
      heroChip: "Figma Plugin · Product Design · AI-assisted Development · Accessibility",
      date: "15 days · concept to tested plugin",
      title: "Catching WCAG issues while the screen is still a design — Accessly Lens for Figma",
      cardLine: "Product designer & builder — designed, prototyped and shipped in 15 days",
      blurb:
        "Every accessibility tool we shipped ran after the build. I designed Accessly Lens — a Figma plugin that audits a frame against WCAG 2.2, fixes most issues in one click using the file's own colours, and hands developers every accessibility decision as native Dev Mode annotations.",
      impact: "~70% caught in the design file · 15 WCAG 2.2 checks · 1-click fix · 0 network calls",
      metrics: [
        { value: "~70%", label: "of issues now caught and resolved in the design file" },
        { value: "15", label: "WCAG 2.2 checks in one audit" },
        { value: "1-click", label: "to fix most issues, inside the card" }
      ],
      thumbnail: "assets/img/lens-cover-card.webp",

      summary:
        "A Figma plugin that finds WCAG 2.2 issues while the screen is still a design, fixes most of them in one click using the file's own colours, and hands every accessibility decision to developers as native Dev Mode annotations.",

      blocks: [
        /* ── 2 · HOOK ─────────────────────────────────────────────────── */
        {
          type: "text",
          label: "THE MOMENT",
          heading: "I'd designed more than ten accessibility tools. Not one of them could see a design.",
          body:
            "Every product I'd designed at work checked accessibility after something was built: audits, monitoring, testing. Then we moved earlier, into code, with VS Code, Xcode, WordPress and Shopify plugins. But the low-contrast colour, the 20px close button and the icon with no name were all decided in Figma, weeks before any of those tools ran. By the time we caught them, a developer was guessing what the designer meant, and the fix cost a round-trip. Design was the one stage where we had nothing."
        },

        {
          type: "quote",
          text: "If design comes first, accessibility should too.",
          attribution: "The line I kept coming back to on this project"
        },

        /* ── 3 · VISUAL TEASE ─────────────────────────────────────────── */
        shot({
          file: "lens-cover.webp",
          alt: "Cover: the words “Accessly Lens — accessibility audit tool, find and fix accessibility issues” beside the plugin in light and dark themes, showing the Audit tab with 20 issues: an image with no alt text, a button with no accessible name and a subtitle failing contrast at 2.56 to 1.",
          caption: "Accessly Lens — a Figma plugin that finds, fixes and hands off accessibility issues before code",
          width: "full",
          standalone: true
        }),

        /* ── 4 · PROBLEM AND CONTEXT ──────────────────────────────────── */
        {
          type: "text",
          label: "THE PROBLEM",
          heading: "Issues were born in design and paid for after launch",
          body:
            "Most accessibility issues start as design choices: colours, type sizes, tap targets, labels, heading structure. Our toolset caught them in development or after launch, where every fix is more expensive: a developer has to guess the intent, go back to the designer, and rebuild. Designers using Figma had plugins, but they either checked or documented, never both in one flow, and none fixed an issue using the team's own design system. So the cheapest stage to fix accessibility was the one stage our product line didn't reach."
        },

        shot({
          file: "lens-lifecycle.webp",
          alt: "Product lifecycle — where tools existed. 01 Design is outlined in red and marked “No tool”, with the note “no tool from us existed here”; 02 Development is marked “Covered” and lists the VS Code extension, iOS Xcode plugin, WordPress plugin, Shopify plugin and Android Studio · in progress; 03 After launch is marked “Covered” and lists 10+ audit, testing and monitoring products. A gradient arrow below runs from “Cheapest to fix, at design” to “Most expensive, after launch”.",
          caption: "Where our tools existed — development and after launch were covered, design wasn't"
        }),

        compTable([
          ["Stark", "Contrast, colour-blind simulation, focus order, alt text, touch targets", "Separate checks plus a cloud platform", "From $198 per user per year", "Flags problems but doesn't teach the fix; paywalled"],
          ["axe for Designers", "Automatic scan, auto annotations", "Scan, then annotate", "Free", "Limited checks, few in-place fixes"],
          ["Include (eBay)", "Guided annotation of alt text, focus, landmarks", "Step-by-step documenting", "Free, open source", "Documents, doesn't audit"],
          ["Single-purpose plugins", "Able, Contrast, Adee, Color Blind, Text Resizer — one job each", "One check per plugin", "Mostly free", "Designers juggle many plugins"],
          ["Figma itself", "Contrast check in the colour picker", "One colour pair at a time", "Built in", "Contrast only"],
          ["Accessly Lens", "Audit, in-place fixes, annotations, screen-reader preview, vision simulation", "One flow from finding to fixing to handoff", "Free, offline", "Fixes with your design tokens; lets you hear the design"]
        ]),

        {
          type: "meta",
          items: [
            { label: "PRODUCT", value: "Accessly Lens — a Figma plugin for WCAG 2.2 AA, running fully offline with no account and no network calls" },
            { label: "SCOPE", value: "Concept exploration carried all the way to a shipped product: one plugin, 11 screens in two themes — not a redesign of an existing tool" },
            { label: "MY ROLE", value: "Solo product designer and builder: research, IA, interaction design, UI, prototype, and the build with AI-assisted development" },
            { label: "TIMELINE", value: "15 days, concept to tested plugin" },
            { label: "USERS", value: "UI designers (primary; know Figma deeply, not WCAG) · developers who receive the annotations · accessibility specialists who review" },
            { label: "BUILT WITH", value: "Figma Plugin API, shadcn/ui on Radix primitives" },
            { label: "CONSTRAINTS", value: "Must work offline for teams under NDA · speak Figma's language, not WCAG's · can't mark manual checks as passing" }
          ]
        },

        /* ── 5 · SOLUTION JOURNEY ─────────────────────────────────────── */
        {
          type: "text",
          label: "SOLUTION JOURNEY",
          heading: "A sign-up screen, from “done” to actually done",
          body:
            "A UI designer has just finished “Sign up — Mobile” and is about to hand it off. They know Figma inside out; they don't know WCAG numbers. Here's what the next few minutes look like."
        },

        {
          type: "text",
          label: "STEP 1 · START",
          heading: "“Is this ready to hand off?”",
          body:
            "They open the plugin and there's one button, already named after their frame: Run audit on “Sign up — Mobile”. There's no scope setting to learn: with a frame selected it audits the frame, with nothing selected it audits the page. ⌘/Ctrl + Enter runs it from anywhere."
        },
        panelShot({
          file: "lens-start.webp",
          alt: "The Audit tab before a run: the header carries the Accessly Lens mark with Guide, WCAG and a settings button, four tabs read Audit, Annotate, Screen reader and Vision, the description line reads “Find and fix accessibility issues in a frame.” with a “How it works” link at its right, and the empty state offers a single button, “Run audit on “Sign up — Mobile””.",
          caption: "One button, already named after the frame"
        }),

        {
          type: "text",
          label: "STEP 2 · RESULTS",
          heading: "“20 issues? Which ones actually matter?”",
          body:
            "The summary answers that first: 20 issues, 11 must fix. Chips filter by category in one click, and each card is already open, naming the problem the way a designer would (“Images need alt text”), why it matters, and the fix right there: an alt-text field, or “It's decorative — hide it”. Severity reads as shape and word as well as colour, so it survives colour blindness. Clicking the layer name zooms to it on the canvas."
        },
        panelShot({
          file: "lens-results.webp",
          alt: "Audit results headed “20 issues · 11 must fix in Sign up — Mobile” with a Re-run button and eight category chips that filter the list — All 20, Contrast 5, Text 5, Images & icons 3, Tap targets 3, Components 1, Forms 2, Structure 1. Below sit open cards: “Images need alt text” (WCAG 1.1.1) on the Logo layer with an alt-text field and an “It's decorative — hide it” option, and “Buttons without a name” (WCAG 4.1.2) on the Close button with a name field.",
          caption: "Open cards, filtered by chips — every fix lives in its card"
        }),

        {
          type: "text",
          label: "STEP 3 · FIX",
          heading: "“I don't want a random hex. I want my colours.”",
          body:
            "The subtitle fails contrast at 2.56:1. Instead of a generic colour, “Fix with your colours” lists the closest passing colours from the file's own styles and variables, with their ratios, and tags the best match. Apply links the layer to that style or variable, so it stays part of the design system. The audit re-runs and the card disappears."
        },
        panelShot({
          file: "lens-contrast.webp",
          alt: "The Contrast filter active, showing “Text is hard to read · WCAG 1.4.3” on the Subtitle layer: contrast 2.56:1 measured against the 4.5:1 requirement, a before and after pair reading Aa · 2.56 → Aa · 7.7, then “Fix with your colours” listing Secondary at 7.7:1 tagged Best match, Primary at 7.0:1 and #747480 at 4.6:1, each with an Apply button.",
          caption: "Fix with your colours — 2.56:1 → 7.7:1 using the file's own Secondary style"
        }),

        {
          type: "text",
          label: "STEP 4 · ANNOTATE",
          heading: "“What will the developer need to know about this button?”",
          body:
            "They select the close icon. The panel follows the selection and asks only what fits this layer: it's flagged as a small target (20×20 against 24×24), it has no name, and Auto has detected it as a button. They type a screen-reader name, set its tab order, add a note, and Save annotation stores it as a native Dev Mode annotation. The developer will read it in Figma, not guess."
        },
        panelShot({
          file: "lens-annotate.webp",
          alt: "The Annotate tab on a selected Close button, frame · 20×20, flagged Small target, with two warnings — icon-only control has no accessible name, and target is 20×20px against the 24×24px minimum. On-canvas buttons read Tab order, Labels and Clear; Element type is set to Auto · Button, and Screen reader name, Tab order and Note for developers fields sit above a Save annotation button that notes the result appears on the layer in Dev Mode.",
          caption: "Annotate — the panel asks only what fits the selected layer"
        }),

        {
          type: "text",
          label: "STEP 5 · LISTEN",
          heading: "“What does this sound like to someone who can't see it?”",
          body:
            "Screen reader plays the frame in reading order with a real voice, the way VoiceOver or NVDA would: “Create your account, heading level 1”. It warns that there are 3 things a blind user would miss, like a button announced only as “button”, and each stop highlights its layer on the canvas. The name they just added is heard straight away."
        },
        panelShot({
          file: "lens-screenreader.webp",
          alt: "The Screen reader tab reading “Sign up — Mobile · 15 stops”, with a Speak aloud toggle, a 1.1× speed menu and previous and next controls. A warning reads “3 things a blind user would miss”, and the numbered reading order lists each stop with its role — Logo, image flagged with no alt text; button flagged as announced only as “button”; heading “Create your account, heading level 1”; and the Password field flagged because the placeholder disappears when typing.",
          caption: "Hearing the design — 15 stops, 3 things a blind user would miss"
        }),

        {
          type: "text",
          label: "STEP 6 · SEE",
          heading: "“Does this still read for someone who sees red and green the same?”",
          body:
            "Vision previews the frame with red-green and blue-yellow colour blindness, no colour vision, blur and low contrast, each with one line on who it affects. Compare all shows every simulation side by side, and Add to canvas drops the preview next to the frame for the design review. Then they hand off."
        },
        panelShot({
          file: "lens-vision.webp",
          alt: "The Vision tab previewing Sign up — Mobile, with a Use selection button, a Simulate menu set to Red-green (deuteranopia) and the line “The most common type — about 1 in 12 men see red and green similarly”, above the sign-up frame rendered in that simulation.",
          caption: "Vision — deuteranopia, “about 1 in 12 men”"
        }),

        /* ── 6 · DECISION STORIES ─────────────────────────────────────── */
        {
          type: "text",
          label: "DECISION STORIES",
          heading: "Four calls that shaped the plugin",
          body:
            "The journey above only works because of a few decisions where the obvious answer was the wrong one."
        },

        {
          type: "decisions",
          stories: [
            {
              title: "1 · Why I stopped organising the plugin around WCAG checks and organised it around the designer's job",
              lead: "My first version did everything, and users said it felt cluttered and needed too many clicks. It was complete, and it helped no one.",
              before: "v1 mirrored a typical accessibility tool: 13 tabs, one per check, each with its own scope bar and its own Run button.",
              options: "For v2 I prototyped three ways to tame it: grouped tabs, a side rail and a dashboard. I tested grouped tabs, which became 5 categories.",
              tradeoff: "Grouping hid the clutter but not the cause: it was still 13 tools and 13 Run buttons, because it was still organised the way WCAG is written, not the way a designer works. The turning point was asking a different question each round: what is the designer actually trying to do? The answer was four jobs, not thirteen checks: find and fix, tell developers, hear it, see it.",
              action: "v3 reorganised around jobs with one Check button, but issues sat in nested accordions three clicks deep and every fix sent you to another tab. v4 kept the jobs and flattened everything: four tabs (Audit, Annotate, Screen reader, Vision), open issue cards, one-click category chips, and a one-line description under the tabs saying what the current tool does.",
              result: "Fewer choices, one Run button, and one click from summary to fix (Hick's law doing the work). It's the change I'd point to first: organising around the job did more for the plugin than any feature I added."
            }
          ]
        },

        {
          type: "decisions",
          stories: [
            {
              title: "2 · How I moved every fix into the card where the problem is",
              lead: "“Clicking Fix takes me somewhere else.” The fix existed. It just wasn't where the problem was.",
              before: "In v3, a fix button on an issue sent the designer to another tab to act on it, so they lost the issue they were looking at.",
              options: "Keep fixes in one dedicated place and link to it more clearly, or bring every fix into the issue card itself.",
              tradeoff: "A separate place for fixes is simpler to build and keeps cards short. But every jump breaks the designer's attention, and the confusion in testing came from exactly that jump. Longer cards were the cheaper cost.",
              action: "Every fix now lives inside its card: alt-text inputs, heading pickers (H1–H6, suggested level outlined), Resize hit area, Add a Focus variant, Add a visible label, minimum font size, line height to 150%, Auto height, and copy rewrites. After any fix the audit re-runs automatically and the card disappears.",
              result: "It removed the biggest source of confusion in testing, and it's why the audit can end on a clear “Nothing to fix” moment instead of a to-do list."
            }
          ]
        },

        {
          type: "decisions",
          stories: [
            {
              title: "3 · Why contrast fixes use the file's own colours instead of the nearest passing hex",
              lead: "Every contrast tool I looked at could tell you a colour fails. None of them could fix it without breaking your design system.",
              before: "The usual fix is a new hex value. Pasted onto a layer, it detaches it from the file's styles and variables, so the next theme change or token update silently skips it.",
              options: "Suggest the mathematically nearest passing colour, or search the file's own styles and variables for the closest one that passes.",
              tradeoff: "The nearest hex is always available and always passes. A file's own colours might not include a passing option, and they might be further from the original. But a fix that detaches layers from the system creates a new problem for every one it solves. So I made the system colours the default and kept a custom hex as the last option, not the first.",
              action: "Contrast is measured against what's actually painted behind the layer, including transparency. “Fix with your colours” lists passing styles and variables with their ratios, tags the best match, shows a before/after, and Apply binds the layer to that style or variable.",
              result: "Fixes stay inside the team's design system, which none of the plugins I reviewed did. In the sign-up example, the subtitle goes from 2.56:1 to 7.7:1 using the file's existing Secondary style."
            }
          ]
        },

        {
          type: "decisions",
          stories: [
            {
              title: "4 · Why I made the plugin admit what it can't check",
              lead: "“Did it detect this automatically?” A designer couldn't tell what the plugin had checked and what it had guessed.",
              before: "Automatic detections and manual inputs looked the same, and some checks can't be automated at all, like whether alt text is actually meaningful.",
              options: "Show only what the plugin can check automatically and keep the results clean, or surface manual checks and automatic detections explicitly.",
              tradeoff: "Hiding manual checks makes the report look more complete and the score look better. But a design that silently “passes” something nobody checked is worse than one that admits it, especially for the accessibility specialists reviewing it.",
              action: "Manual items appear as “Check manually” alongside Must fix and Should fix, never hidden. The element type shows what Auto found (“Auto · Checkbox”) so designers can see the guess and overrule it. Options like tab order and developer notes are always visible instead of tucked away. And developer vocabulary went: Inspect became Annotate, Simulate became Vision, Check became Audit.",
              result: "Nothing is falsely marked as passing, and designers can trust the green because they can see where it came from."
            }
          ]
        },

        /* Same placement as Accessly Internal: Stage 8.2 runs the tease
           straight into the problem, so the numbers close the decisions
           instead of interrupting the opening. */
        {
          type: "outcomes",
          heading: "What changed",
          items: [
            { value: "~70%", label: "of the issues we used to report after development are now caught and fixed in the design file" },
            { value: "15", label: "WCAG 2.2 checks in one audit, returning in about 120 ms" },
            { value: "1 click", label: "to fix most issues, inside the issue card" },
            { value: "15 days", label: "from concept to a tested, working plugin, designed and built solo with AI-assisted development" }
          ],
          note: "The 70% is our team's estimate from using the plugin on real projects: the share of issues we usually report after development that are now resolved during design."
        },

        /* ── 7 · ITERATION ARCHIVE ────────────────────────────────────── */
        {
          type: "text",
          label: "ITERATION ARCHIVE",
          heading: "Four versions, and the reason each one died",
          body:
            "The structure came before any of the polish: four builds, each held long enough to watch a designer work with it, each dropped for a reason rather than a preference. This is the order those reasons arrived in."
        },

        shot({
          file: "lens-structure.webp",
          alt: "The structure, v1 to v4, as four cards. v1 · 13 tabs: thirteen chips read Contrast, Alt, Focus, Type, Target, Head, Form, Link, Color, Sense, Notes, Sim and Spec, noted “× 13 scope bars · × 13 Run buttons”. v2 · 5 categories: five tabs read Colour, Content, Structure, Interact and Notes above Grouped tabs ✓, Side rail and Dashboard, noted “still 13 tools · 13 Run buttons”. v3 · 3 tabs: Check, Inspect and Simulate, over a nested accordion of Colour · 5, Text contrast · 3, Heading 2, Content · 5 and Structure · 2, noted “3 clicks to see details · fix → other tab”. v4 · 4 tabs: Audit, Annotate, Screen reader and Vision, over two open issue cards with teal fix buttons, noted “1 click to filter · fix inside the card”.",
          caption: "13 tabs → 5 categories → 3 tabs → 4 tabs, and why each one gave way"
        }),

        {
          type: "list",
          heading: "What each version cost the designer",
          items: [
            { text: "v1 · 13 tabs — one tab, one scope bar and one Run button per check. Thrown away: complete, but cluttered and too many clicks" },
            { text: "v2 · 5 categories — grouped tabs, chosen over a side rail and a dashboard. Thrown away: still 13 tools and 13 Run buttons underneath" },
            { text: "v3 · 3 tabs (Check, Inspect, Simulate) — organised around jobs, one Check button. Thrown away: issues three clicks deep in nested accordions, and fixes sent you to another tab" },
            { text: "v4 · 4 tabs (Audit, Annotate, Screen reader, Vision) — flat open cards, fixes in the card. Kept" }
          ]
        },

        {
          type: "text",
          label: "ITERATION · SWATCHES",
          heading: "A swatch inside the button → a row you can read",
          body:
            "Every fix button started with its colour swatch drawn inside the button itself. Testing turned up the one line I kept coming back to: “I can't see the swatch in the button.” The chip was competing with its own label for the same few pixels. Rather than restyle the chip, I moved it out of the target: each fix is now a neutral one-line row, every swatch drawn with a light inner ring and a dark outer ring so the colour stays visible against either background."
        },

        {
          type: "text",
          label: "AI IN THE PROCESS",
          heading: "What AI built, and what I decided",
          body:
            "AI-assisted development is how one designer got from idea to a tested, working plugin in 15 days: it wrote the plugin code against the Figma Plugin API. It didn't decide what the plugin should be. The structure (13 tabs to 4), the wording on every card, where each fix lives, using the file's own colours, and showing what can't be checked automatically all came from reviewing each version as a designer would use it. AI made each iteration cheap to build, which is why there were four of them."
        },

        /* ── 8 · UI SYSTEM AND CRAFT ──────────────────────────────────── */
        {
          type: "text",
          label: "UI SYSTEM",
          heading: "A panel that feels like Figma and passes its own audit",
          body:
            "The UI is built on shadcn/ui and Radix primitives, with a Theme variable collection in Figma holding Light and Dark modes, so all 11 screens exist in both themes from the same tokens. The panel borrows Figma's own type scale rather than inventing one, so it sits beside the canvas without a visual jump; the plugin refuses anything smaller than 12px of text and every issue card runs at a 150% line height so a long list stays readable. Spacing is one scale across cards, rows and controls — the 24px minimum target and the padding around each input are steps on that same scale, which is why four different tabs read as one panel. The panel also borrows Figma's own patterns (tab bar, segmented chips, a panel that follows the selection) so designers already know how to use it."
        },

        {
          type: "list",
          heading: "The rules behind it",
          items: [
            { text: "Every target at least 24px, and one large primary action per screen (Fitts's law)" },
            { text: "Severity as shape, word and colour together; must-fix issues stand out by shape as well as colour (von Restorff)" },
            { text: "Summary first; the why and WCAG reference sit in each card, and exports live in a menu (progressive disclosure)" },
            { text: "Problems named the way designers think — “Text is hard to read”, not “1.4.3” (recognition over recall)" },
            { text: "An audit returns in about 120 ms and re-runs after every fix, so it never feels like a separate step (Doherty threshold)" }
          ]
        },

        shotPair(
          {
            file: "lens-dark-results.webp",
            alt: "The Audit tab in dark mode: the same “20 issues · 11 must fix” summary, category chips and open cards — Images need alt text on the Logo layer, Buttons without a name on the Close button — rendered on a near-black surface with the teal accent.",
            caption: "Dark mode — audit results, same tokens, second theme"
          },
          {
            file: "lens-dark-screenreader.webp",
            alt: "The Screen reader tab in dark mode: “Reading Sign up — Mobile · 15 stops”, the Speak aloud toggle, a 1.1× speed menu, the warning that three things a blind user would miss, and the numbered reading order with its per-stop flags.",
            caption: "Dark mode — the screen reader"
          }
        ),

        shotPair(
          {
            file: "lens-guide.webp",
            alt: "The Guide overlay, “How Accessly Lens works”, introduced as “Four tools for designers. Select a frame or layer on the canvas, then pick a tab.” Four numbered cards follow: 1 Audit, 2 Annotate, 3 Screen reader and 4 Vision, each summarising what the tool does.",
            caption: "Guide — all four tools in one place"
          },
          {
            file: "lens-settings.webp",
            alt: "The Settings sheet over a dimmed panel, headed “Runs entirely on your computer — no network, no account.” It offers four options, each explained on screen: Standard set to WCAG 2.2 AA, Designing for set to Web · 24px which sets the minimum tap-target size, Smallest text allowed at 12px, and a Re-check automatically toggle, with a Done button.",
            caption: "Settings — four options, each explained where you meet it"
          }
        ),

        /* ── 9 · REFLECTION AND FUTURE SCOPE ──────────────────────────── */
        {
          type: "text",
          label: "REFLECTION",
          heading: "What I'd do differently, and what I'd keep",
          body:
            "The version I'm least happy about is the one that did the most: 13 tabs, every check reachable, and testers still calling it cluttered. I had confused covering the standard with helping the person using it, and watching someone click through it was the only thing that showed me. If I started again I'd change the order — settle what the designer is actually trying to do before writing a single check, because four tabs came from that question and no feature I added later came close. What I'd keep is the habit of putting every claim on screen where it can be tested: the audit states what it can't check, the contrast fix uses the file's own colours instead of a convenient hex, and the screen reader shows the real reading order rather than promising it works. AI got me to a tested plugin in 15 days, but none of those calls came from the model."
        },

        {
          type: "list",
          heading: "What I learned",
          items: [
            { text: "Complete isn't the same as usable. The 13-tab version did everything and helped no one; organising around the designer's job did more than any feature" },
            { text: "Keep the user where the problem is. Moving every fix into its card removed the biggest source of confusion" },
            { text: "AI speeds up building, not judgement. It got me to a tested plugin in 15 days, but every iteration still came from looking at it the way a designer would use it" }
          ]
        },

        {
          type: "text",
          label: "FUTURE SCOPE",
          flush: "1",
          body:
            "Each next step comes from a gap the current version leaves: designers work in component variants and colour modes, so the audit should check every variant and mode at once, not one frame at a time; mobile designers need to see iOS Dynamic Type and Android text scaling, not just a minimum font size; and developers building native apps should get SwiftUI and Jetpack Compose snippets alongside HTML."
        },

        /* Closing CTA: the walkthrough ends by handing the reader the real
           prototype, sitting directly above the footer that points at it.
           Keeping it out of the front half is also what lets the first
           Decision Story land inside the guide's Scan Audit "first half"
           check — the cover already serves Stage 8.2's visual tease. */
        {
          type: "figma",
          url: "https://www.figma.com/proto/jFU8GnV1TyqGUaZCWz5hph/Accessly-Lens?node-id=1-18&viewport=145%2C301%2C0.51&t=hBJND2oeNij9vXtI-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
          title: "Try the journey yourself",
          caption:
            "The real plugin code running against a sample Figma file: run an audit, apply a fix and watch the canvas change, play the screen reader, or switch to dark mode. Alt+click selects a parent layer. A wide screen gives the best experience."
        }
      ],

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to walk through the thinking, and the prototype is linked above."
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
