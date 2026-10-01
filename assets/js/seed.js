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
        "Three engagements, three problems — a systems rebuild, a consumer launch, and a data-heavy dashboard practice. Each opens into a full case study: the call, the trade-off, and what happened next.",
      cta: { label: "View all case studies", href: "work.html" },
      limit: 3
    },

    workPage: {
      heading: "Selected work",
      intro:
        "Three full case studies — the problem, the calls I made, and what happened after. Skimmable in three minutes; worth reading in ten."
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

  var CASE_STUDIES = [
    {
      slug: "barrierbreak-design-system",
      metaTitle: "Accessible design system (BarrierBreak)",
      shortTitle: "BarrierBreak design system",
      order: 1,

      /* card + hero */
      category: "Enterprise SaaS · Accessibility",
      heroChip: "Enterprise SaaS · Accessibility · Design Systems",
      date: "Jan 2024 — Present",
      title: "Building an accessible design system for enterprise SaaS — cutting handoff time 35–40%",
      cardLine: "UI/UX & Product Designer, BarrierBreak",
      blurb:
        "Every surface was rebuilt from scratch with accessibility bolted on late. I'm architecting one Figma system where WCAG 2.1 AA/AAA is the default, not an afterthought.",
      impact: "35–40% faster handoff · WCAG AA/AAA across the platform",
      metrics: [
        { value: "35–40%", label: "faster handoff" },
        { value: "AA/AAA", label: "WCAG 2.1, platform-wide" },
        { value: "1 system", label: "every product surface" }
      ],
      thumbnail: thumb(
        '<text x="48" y="56" font-family="IBM Plex Mono, monospace" font-size="15" fill="#9a9993">Component states — button</text>' +
        '<rect x="48" y="84" width="220" height="52" fill="#f4f3ef"></rect>' +
        '<text x="158" y="116" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="16" fill="#000000">Save changes</text>' +
        '<text x="292" y="116" font-family="IBM Plex Mono, monospace" font-size="13" fill="#9a9993">Default</text>' +
        '<rect x="48" y="152" width="220" height="52" fill="#dcdbd6"></rect>' +
        '<text x="158" y="184" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="16" fill="#000000" text-decoration="underline">Save changes</text>' +
        '<text x="292" y="184" font-family="IBM Plex Mono, monospace" font-size="13" fill="#9a9993">Hover</text>' +
        '<rect x="42" y="214" width="232" height="64" fill="none" stroke="#f4f3ef" stroke-width="3"></rect>' +
        '<rect x="48" y="220" width="220" height="52" fill="#f4f3ef"></rect>' +
        '<text x="158" y="252" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="16" fill="#000000">Save changes</text>' +
        '<text x="292" y="252" font-family="IBM Plex Mono, monospace" font-size="13" fill="#9a9993">Focus</text>' +
        '<rect x="48" y="298" width="220" height="52" fill="none" stroke="rgba(255,255,255,0.28)"></rect>' +
        '<text x="158" y="330" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="16" fill="rgba(244,243,239,0.4)">Save changes</text>' +
        '<circle cx="244" cy="324" r="9" fill="none" stroke="rgba(244,243,239,0.5)" stroke-width="2"></circle>' +
        '<text x="292" y="330" font-family="IBM Plex Mono, monospace" font-size="13" fill="#9a9993">Disabled</text>' +
        '<line x1="400" y1="60" x2="400" y2="356" stroke="rgba(255,255,255,0.15)"></line>' +
        '<text x="432" y="56" font-family="IBM Plex Mono, monospace" font-size="13" fill="#9a9993">Tokens &amp; contrast</text>' +
        '<rect x="432" y="84" width="64" height="64" fill="#f4f3ef"></rect>' +
        '<text x="432" y="168" font-family="IBM Plex Mono, monospace" font-size="12" fill="#c9c8c2">Ink</text>' +
        '<text x="432" y="186" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">18.9 : 1</text>' +
        '<rect x="520" y="84" width="64" height="64" fill="#9a9993"></rect>' +
        '<text x="520" y="168" font-family="IBM Plex Mono, monospace" font-size="12" fill="#c9c8c2">Muted</text>' +
        '<text x="520" y="186" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">7.4 : 1</text>' +
        '<rect x="432" y="220" width="64" height="64" fill="none" stroke="#f4f3ef" stroke-width="2"></rect>' +
        '<text x="432" y="304" font-family="IBM Plex Mono, monospace" font-size="12" fill="#c9c8c2">Border</text>' +
        '<text x="432" y="322" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">3.7 : 1</text>' +
        '<rect x="520" y="220" width="64" height="64" fill="#1c1c1c" stroke="rgba(255,255,255,0.25)"></rect>' +
        '<text x="520" y="304" font-family="IBM Plex Mono, monospace" font-size="12" fill="#c9c8c2">Surface-2</text>' +
        '<text x="520" y="322" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">AA+</text>'
      ),
      goals: [
        {
          label: "BUSINESS GOAL",
          value: "Stop rebuilding the same UI every sprint — and get accessibility past a late-stage compliance pass."
        },
        {
          label: "USER GOAL",
          value: "Users with visual or cognitive disabilities get one consistent, usable experience on every surface."
        }
      ],
      summary:
        "One Figma system cut design-to-development handoff time by 35–40% — and made WCAG 2.1 AA/AAA the default, not a late-stage fix.",

      meta: [
        { label: "ROLE", value: "UI/UX & Product Designer" },
        { label: "TEAM", value: "Engineers & stakeholders" },
        { label: "TIMELINE", value: "Jan 2024 — Present" },
        { label: "TOOLS", value: "Figma, WCAG 2.1 AA/AAA" },
        { label: "STATUS", value: "Live — evolving with the product" },
        { label: "CLIENT", value: "BarrierBreak, Mumbai (Hybrid)" }
      ],

      outcomes: {
        heading: "Where this landed",
        items: [
          { value: "35–40%", label: "faster design-to-development handoff" },
          { value: "AA/AAA", label: "WCAG 2.1 compliance across the platform" },
          { value: "1 system", label: "used consistently across every product surface" }
        ],
        note: "Recognised as Maverick Performer of the Year at BarrierBreak for this work."
      },

      context: {
        label: "CONTEXT",
        heading: "Why accessibility kept slipping through the cracks on an enterprise SaaS platform",
        body:
          "The product had no shared design language. Every surface was rebuilt from scratch, and accessibility was treated as a late-stage compliance pass rather than a decision made at the start. That meant inconsistent components across the platform, duplicated design work every sprint, and accessibility fixes bolted on after a feature already shipped — expensive to catch, and easy for users with visual or cognitive disabilities to fall through the cracks of."
      },

      quote: {
        text: "The question isn't \"does this pass?\" — it's \"is it structurally impossible for this to fail?\""
      },

      solution: {
        label: "SOLUTION AS A JOURNEY",
        heading: "What the system actually looks like",
        intro:
          "Three pieces of the system, simplified into wireframes here to keep client work confidential: how a component communicates its own state, how tokens carry contrast into every screen, and how an error is explained rather than just colored red.",
        panels: [
          {
            alt: "Wireframe of a button component in four states: default, hover with underline, focus with a visible ring, and disabled with a lock icon and reduced contrast label",
            caption:
              "Every state is legible without color: hover adds an underline, focus adds a ring, disabled adds a lock icon — not just a faded fill.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Wireframe of a button component in four states: default, hover with underline, focus with a visible ring, and disabled with a lock icon and reduced contrast label" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<text x="20" y="34" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">Component states</text>' +
              '<rect x="20" y="58" width="150" height="44" fill="#f4f3ef"></rect>' +
              '<text x="95" y="84" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#000000">Save changes</text>' +
              '<text x="184" y="84" font-family="IBM Plex Mono, monospace" font-size="11" fill="#9a9993">Default</text>' +
              '<rect x="20" y="122" width="150" height="44" fill="#dcdbd6"></rect>' +
              '<text x="95" y="148" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#000000" text-decoration="underline">Save changes</text>' +
              '<text x="184" y="148" font-family="IBM Plex Mono, monospace" font-size="11" fill="#9a9993">Hover</text>' +
              '<rect x="16" y="182" width="158" height="52" fill="none" stroke="#f4f3ef" stroke-width="2"></rect>' +
              '<rect x="20" y="186" width="150" height="44" fill="#f4f3ef"></rect>' +
              '<text x="95" y="212" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#000000">Save changes</text>' +
              '<text x="184" y="212" font-family="IBM Plex Mono, monospace" font-size="11" fill="#9a9993">Focus</text>' +
              '<rect x="20" y="250" width="150" height="44" fill="none" stroke="rgba(255,255,255,0.25)"></rect>' +
              '<text x="95" y="276" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="rgba(244,243,239,0.35)">Save changes</text>' +
              '<circle cx="152" cy="272" r="7" fill="none" stroke="rgba(244,243,239,0.45)" stroke-width="1.5"></circle>' +
              '<rect x="149" y="272" width="6" height="5" fill="none" stroke="rgba(244,243,239,0.45)" stroke-width="1.5"></rect>' +
              '<text x="184" y="276" font-family="IBM Plex Mono, monospace" font-size="11" fill="#9a9993">Disabled</text>' +
              "</svg>"
          },
          {
            alt: "Grid of six color token swatches, each labeled with its token name and WCAG contrast ratio against the surface color",
            caption:
              "Tokens are documented with their contrast ratio at the point of creation, so a designer can't accidentally ship a pairing that fails.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Grid of six color token swatches, each labeled with its token name and WCAG contrast ratio against the surface color" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<text x="20" y="34" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">Color tokens &amp; contrast</text>' +
              '<rect x="20" y="56" width="70" height="70" fill="#f4f3ef"></rect>' +
              '<text x="20" y="140" font-family="IBM Plex Mono, monospace" font-size="10" fill="#c9c8c2">Ink / Surface</text>' +
              '<text x="20" y="154" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">18.9 : 1</text>' +
              '<rect x="105" y="56" width="70" height="70" fill="#9a9993"></rect>' +
              '<text x="105" y="140" font-family="IBM Plex Mono, monospace" font-size="10" fill="#c9c8c2">Muted / Surface</text>' +
              '<text x="105" y="154" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">7.4 : 1</text>' +
              '<rect x="190" y="56" width="70" height="70" fill="none" stroke="#f4f3ef" stroke-width="1.5"></rect>' +
              '<text x="190" y="140" font-family="IBM Plex Mono, monospace" font-size="10" fill="#c9c8c2">Border / Surface</text>' +
              '<text x="190" y="154" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">3.7 : 1</text>' +
              '<rect x="20" y="176" width="70" height="70" fill="#1c1c1c"></rect>' +
              '<text x="20" y="260" font-family="IBM Plex Mono, monospace" font-size="10" fill="#c9c8c2">Surface-2</text>' +
              '<text x="20" y="274" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">n/a</text>' +
              '<rect x="105" y="176" width="70" height="70" fill="#f4f3ef"></rect>' +
              '<rect x="128" y="199" width="24" height="24" fill="#1c1c1c"></rect>' +
              '<text x="105" y="260" font-family="IBM Plex Mono, monospace" font-size="10" fill="#c9c8c2">Focus ring</text>' +
              '<text x="105" y="274" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">AA+</text>' +
              '<rect x="190" y="176" width="70" height="70" fill="#0a0a0a" stroke="rgba(255,255,255,0.25)"></rect>' +
              '<path d="M225 196 L233 210 L217 210 Z" fill="none" stroke="#f4f3ef" stroke-width="1.5"></path>' +
              '<line x1="225" y1="214" x2="225" y2="215" stroke="#f4f3ef" stroke-width="1.5"></line>' +
              '<text x="190" y="260" font-family="IBM Plex Mono, monospace" font-size="10" fill="#c9c8c2">Error / Surface</text>' +
              '<text x="190" y="274" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">4.9 : 1</text>' +
              '<text x="20" y="306" font-family="IBM Plex Mono, monospace" font-size="10" fill="#6f6e6a">Every pair meets WCAG AA at minimum</text>' +
              "</svg>"
          },
          {
            alt: "Wireframe of a form field shown twice: once in its default state with a label and helper text, and once in an error state with an icon, underline and written explanation rather than color alone",
            caption:
              "The error state is marked by an icon, a dashed outline and written guidance — never by a red border alone, which a color-blind user could miss.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Wireframe of a form field shown twice: once in its default state with a label and helper text, and once in an error state with an icon, underline and written explanation rather than color alone" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<text x="20" y="34" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">Accessible form field</text>' +
              '<text x="20" y="66" font-family="IBM Plex Sans, sans-serif" font-size="12" fill="#c9c8c2">Work email</text>' +
              '<rect x="20" y="76" width="240" height="40" fill="none" stroke="rgba(255,255,255,0.4)"></rect>' +
              '<text x="30" y="101" font-family="IBM Plex Sans, sans-serif" font-size="12" fill="#6f6e6a">name@company.com</text>' +
              '<text x="20" y="132" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#9a9993">We\'ll only use this to send your invite.</text>' +
              '<text x="20" y="176" font-family="IBM Plex Sans, sans-serif" font-size="12" fill="#c9c8c2">Work email</text>' +
              '<rect x="20" y="186" width="240" height="40" fill="none" stroke="#f4f3ef" stroke-width="2" stroke-dasharray="4 3"></rect>' +
              '<text x="30" y="211" font-family="IBM Plex Sans, sans-serif" font-size="12" fill="#f4f3ef">not-an-email</text>' +
              '<path d="M243 196 L250 208 L236 208 Z" fill="none" stroke="#f4f3ef" stroke-width="1.5"></path>' +
              '<line x1="243" y1="212" x2="243" y2="212.5" stroke="#f4f3ef" stroke-width="1.5"></line>' +
              '<text x="20" y="242" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#f4f3ef">Enter a valid email, like name@company.com</text>' +
              "</svg>"
          }
        ]
      },

      scope: {
        heading: "What I did",
        items: [
          "Architected Figma tokens with WCAG contrast ratios documented at the point of creation",
          "Defined accessible states for every component — focus, error, disabled, motion",
          "Ran discovery workshops with engineering to fold build constraints in early",
          "Shipped developer-ready annotated specs, embedded through implementation"
        ]
      },

      decisions: {
        label: "DECISION STORIES",
        heading: "Three calls that shaped this project",
        stories: [
          {
            title: "Why I built a system instead of patching screens one by one",
            lead: "Every new feature meant redrawing buttons, inputs and cards from scratch — nobody had time to check if the old ones were even accessible.",
            before: "no shared design language; the same contrast and focus-order issues kept reappearing across dozens of screens.",
            tradeoff:
              "patch accessibility issues screen by screen as they were reported — faster in the short term, but the same problems would keep recurring — or pause to architect a system with accessible states built into every component. I chose the system, because the audit made clear the issues were structural, not isolated.",
            action:
              "architected tokens, components and documented accessible states in Figma, and ran discovery workshops with engineers to fold real build constraints in early.",
            result: "one system now used across every surface, and the handoff-time reduction that followed."
          },
          {
            title: "Why accessibility became a component rule, not a review-stage checklist",
            lead: "A checklist only catches what someone remembers to check. A rule built into the component catches it every time.",
            before: "accessibility was reviewed as a separate QA pass after a design was already considered done.",
            tradeoff:
              "keep a checklist reviewers run before release — leaves the design process unchanged — or encode accessible states (contrast, focus order, motion) directly into each component's definition, which takes more upfront system work but makes the accessible version the only version. I chose the latter.",
            action: "documented accessible states per component and aligned every token to WCAG AA/AAA contrast ratios.",
            result: "AA/AAA compliance held consistently, without a per-screen re-review each release."
          },
          {
            title: "Why I stayed the liaison instead of handing off a finished spec",
            lead: "A perfect Figma file can still break in production if nobody is there to explain the reasoning behind it.",
            before: "handoffs were one-way — ambiguous requirements often got reinterpreted during build.",
            tradeoff:
              "a one-time handoff document, which is faster for design time, or staying embedded through implementation as the translator between stakeholders and engineering — slower, but it cuts rebuild cycles. I chose to stay embedded.",
            action:
              "produced developer-ready, annotated specs and stayed the primary point of contact through build.",
            result: "fewer implementation gaps, and a direct contributor to the 35–40% handoff-time reduction."
          }
        ]
      },

      next: {
        label: "WHAT'S NEXT",
        body:
          "The system is still growing with the product. The next step is extending the same token-level approach into the design-to-code pipeline, so accessible states ship correctly by default rather than being caught in review."
      },

      reflection: {
        label: "REFLECTION",
        body:
          "Treating accessibility as a system-level decision — not a per-screen fix — is what made it stick. The lens it gave me outlasted the project: I design for the failure mode first, and let the checklist confirm what the system already guarantees."
      },

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to talk through it. Details sit under NDA; glad to walk through them in an interview."
      }
    },

    {
      slug: "clxns-astrology-app",
      metaTitle: "Astrology app launch (CLXNS)",
      shortTitle: "CLXNS astrology app",
      order: 2,

      category: "Mobile App · iOS & Android",
      heroChip: "Mobile App · iOS & Android · Media Platform",
      date: "Apr 2023 — Jan 2024",
      title: "Taking a multi-user astrology app from research to App Store launch, lifting media dwell time",
      cardLine: "UI/UX Designer, CLXNS Technologies",
      blurb:
        "New users bounced before seeing the app’s value. I led UX end-to-end — research, a rebuilt first sixty seconds, and the companion media platform.",
      impact: "iOS + Android from one flow · ↑ media dwell time",
      metrics: [
        { value: "2 platforms", label: "iOS + Android, one flow" },
        { value: "↑ Dwell time", label: "media-platform sessions" },
        { value: "ASO assets", label: "built for acquisition" }
      ],
      thumbnail: thumb(
        '<text x="48" y="56" font-family="IBM Plex Mono, monospace" font-size="15" fill="#9a9993">Onboarding — first open</text>' +
        '<rect x="170" y="76" width="130" height="272" rx="14" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"></rect>' +
        '<circle cx="204" cy="106" r="10" fill="none" stroke="#f4f3ef"></circle>' +
        '<line x1="204" y1="100" x2="204" y2="112" stroke="#f4f3ef"></line>' +
        '<line x1="198" y1="106" x2="210" y2="106" stroke="#f4f3ef"></line>' +
        '<rect x="192" y="132" width="86" height="7" fill="#f4f3ef"></rect>' +
        '<rect x="200" y="145" width="70" height="7" fill="#f4f3ef"></rect>' +
        '<rect x="194" y="166" width="82" height="4" fill="#6f6e6a"></rect>' +
        '<rect x="200" y="176" width="70" height="4" fill="#6f6e6a"></rect>' +
        '<rect x="206" y="186" width="58" height="4" fill="#6f6e6a"></rect>' +
        '<rect x="192" y="288" width="86" height="28" fill="#f4f3ef"></rect>' +
        '<text x="235" y="306" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="10" fill="#000000">Get started</text>' +
        '<text x="235" y="332" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="9" fill="#9a9993" text-decoration="underline">Log in</text>' +
        '<rect x="340" y="76" width="130" height="272" rx="14" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"></rect>' +
        '<path d="M356 100 L350 104 L356 108" fill="none" stroke="#f4f3ef" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<rect x="368" y="101" width="30" height="5" fill="#f4f3ef"></rect>' +
        '<rect x="402" y="101" width="30" height="5" fill="#f4f3ef"></rect>' +
        '<rect x="436" y="101" width="22" height="5" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
        '<rect x="354" y="122" width="102" height="6" fill="#f4f3ef"></rect>' +
        '<rect x="354" y="133" width="72" height="6" fill="#f4f3ef"></rect>' +
        '<rect x="354" y="152" width="102" height="28" fill="none" stroke="rgba(255,255,255,0.3)"></rect>' +
        '<text x="362" y="170" font-family="IBM Plex Sans, sans-serif" font-size="9" fill="#c9c8c2">Vedic astrology</text>' +
        '<rect x="354" y="186" width="102" height="28" fill="#f4f3ef"></rect>' +
        '<text x="362" y="204" font-family="IBM Plex Sans, sans-serif" font-size="9" fill="#000000">Western</text>' +
        '<path d="M436 200 l4 4 l7 -8" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<rect x="354" y="220" width="102" height="28" fill="none" stroke="rgba(255,255,255,0.3)"></rect>' +
        '<text x="362" y="238" font-family="IBM Plex Sans, sans-serif" font-size="9" fill="#c9c8c2">Numerology</text>' +
        '<rect x="354" y="254" width="102" height="28" fill="none" stroke="rgba(255,255,255,0.3)"></rect>' +
        '<text x="362" y="272" font-family="IBM Plex Sans, sans-serif" font-size="9" fill="#c9c8c2">Tarot</text>' +
        '<rect x="354" y="298" width="102" height="26" fill="#f4f3ef"></rect>' +
        '<text x="405" y="315" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="9" fill="#000000">Continue</text>'
      ),
      goals: [
        {
          label: "BUSINESS GOAL",
          value: "Cut onboarding drop-off, and turn early media-platform traffic into real session time."
        },
        {
          label: "USER GOAL",
          value: "New users reach the app’s core value inside the first sixty seconds."
        }
      ],
      summary:
        "Took a multi-user astrology app from research to App Store launch — redesigning the first sixty seconds, then a companion media platform.",

      meta: [
        { label: "ROLE", value: "UI/UX Designer" },
        { label: "TIMELINE", value: "Apr 2023 — Jan 2024" },
        { label: "CLIENT", value: "CLXNS Technologies Pvt Ltd" },
        { label: "PLATFORMS", value: "iOS, Android, Web" },
        { label: "STATUS", value: "Shipped — App Store launch" }
      ],

      outcomes: {
        heading: "Where this landed",
        items: [
          { value: "↑ Dwell time", label: "and session engagement on the media platform" },
          { value: "2 platforms", label: "shipped — iOS and Android — from one design system" },
          { value: "ASO assets", label: "designed to directly support user acquisition" }
        ],
        note: "Shipped from market research through App Store launch."
      },

      context: {
        label: "CONTEXT",
        heading: "Why users were bouncing before they saw what the app could actually do",
        body:
          "A crowded astrology app category with high drop-off at onboarding, alongside a companion media platform that needed to hold attention, not just load fast. New users were leaving before they understood the app's core value, and the media platform's early traffic wasn't translating into meaningful session time — two connected products, each leaking users at a different stage of the journey."
      },

      quote: {
        text: "Design for the first sixty seconds first — build everything else around getting there faster."
      },

      solution: {
        label: "SOLUTION AS A JOURNEY",
        heading: "From first open to the home feed",
        intro:
          "Wireframed here to keep the shipped visuals confidential: the redesigned onboarding, screen by screen, and the media platform layout it hands off to.",
        panels: [
          {
            alt: "Phone wireframe of the app's welcome screen, showing a logo mark, a two-line headline, three lines of supporting text, a filled get-started button, and a log-in link",
            caption: "One clear action above the fold — everything else, including sign-in, is secondary.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Phone wireframe of the app\'s welcome screen, showing a logo mark, a two-line headline, three lines of supporting text, a filled get-started button, and a log-in link" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<rect x="60" y="20" width="160" height="300" rx="18" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"></rect>' +
              '<circle cx="98" cy="40" r="2" fill="rgba(255,255,255,0.3)"></circle>' +
              '<circle cx="108" cy="40" r="2" fill="rgba(255,255,255,0.3)"></circle>' +
              '<circle cx="118" cy="40" r="2" fill="rgba(255,255,255,0.3)"></circle>' +
              '<circle cx="140" cy="78" r="14" fill="none" stroke="#f4f3ef" stroke-width="1.5"></circle>' +
              '<line x1="140" y1="70" x2="140" y2="86" stroke="#f4f3ef" stroke-width="1.5"></line>' +
              '<line x1="132" y1="78" x2="148" y2="78" stroke="#f4f3ef" stroke-width="1.5"></line>' +
              '<rect x="88" y="112" width="104" height="8" fill="#f4f3ef"></rect>' +
              '<rect x="98" y="126" width="84" height="8" fill="#f4f3ef"></rect>' +
              '<rect x="90" y="156" width="100" height="4" fill="#6f6e6a"></rect>' +
              '<rect x="96" y="168" width="88" height="4" fill="#6f6e6a"></rect>' +
              '<rect x="104" y="180" width="72" height="4" fill="#6f6e6a"></rect>' +
              '<rect x="90" y="256" width="100" height="34" fill="#f4f3ef"></rect>' +
              '<text x="140" y="277" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#000000">Get started</text>' +
              '<text x="140" y="306" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="10" fill="#9a9993" text-decoration="underline">Log in</text>' +
              "</svg>"
          },
          {
            alt: "Phone wireframe of a personalization step, showing a back arrow, a three-segment progress bar with two segments complete, a question headline, and four selectable option rows with one marked selected by a checkmark",
            caption:
              "Selection is marked with a fill and a checkmark together, so it still reads correctly without color.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Phone wireframe of a personalization step, showing a back arrow, a three-segment progress bar with two segments complete, a question headline, and four selectable option rows with one marked selected by a checkmark" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<rect x="60" y="20" width="160" height="300" rx="18" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"></rect>' +
              '<path d="M76 46 L70 50 L76 54" fill="none" stroke="#f4f3ef" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<rect x="88" y="47" width="38" height="5" fill="#f4f3ef"></rect>' +
              '<rect x="130" y="47" width="38" height="5" fill="#f4f3ef"></rect>' +
              '<rect x="172" y="47" width="38" height="5" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<rect x="72" y="70" width="136" height="7" fill="#f4f3ef"></rect>' +
              '<rect x="72" y="82" width="96" height="7" fill="#f4f3ef"></rect>' +
              '<rect x="72" y="104" width="136" height="34" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<text x="82" y="125" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#c9c8c2">Vedic astrology</text>' +
              '<rect x="72" y="146" width="136" height="34" fill="#f4f3ef"></rect>' +
              '<text x="82" y="167" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#000000">Western astrology</text>' +
              '<path d="M190 163 L196 169 L204 158" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<rect x="72" y="188" width="136" height="34" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<text x="82" y="209" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#c9c8c2">Numerology</text>' +
              '<rect x="72" y="230" width="136" height="34" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<text x="82" y="251" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#c9c8c2">Tarot</text>' +
              '<rect x="90" y="278" width="100" height="32" fill="#f4f3ef"></rect>' +
              '<text x="140" y="298" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#000000">Continue</text>' +
              "</svg>"
          },
          {
            alt: "Wireframe of the media platform's browsing layout, showing a top navigation bar, a large featured article card, and a two by two grid of smaller article cards below",
            caption:
              "One featured story leads the page; the grid below is where the browsing, lean-back behaviour actually happens.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Wireframe of the media platform\'s browsing layout, showing a top navigation bar, a large featured article card, and a two by two grid of smaller article cards below" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<rect x="16" y="22" width="248" height="296" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<line x1="16" y1="50" x2="264" y2="50" stroke="rgba(255,255,255,0.2)"></line>' +
              '<circle cx="30" cy="36" r="4" fill="none" stroke="#f4f3ef"></circle>' +
              '<rect x="200" y="32" width="50" height="8" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<rect x="30" y="62" width="220" height="86" fill="rgba(244,243,239,0.12)"></rect>' +
              '<rect x="38" y="132" width="140" height="7" fill="#f4f3ef"></rect>' +
              '<rect x="38" y="144" width="90" height="5" fill="#6f6e6a"></rect>' +
              '<rect x="30" y="162" width="104" height="64" fill="rgba(244,243,239,0.08)"></rect>' +
              '<rect x="30" y="230" width="70" height="5" fill="#c9c8c2"></rect>' +
              '<rect x="30" y="240" width="90" height="4" fill="#6f6e6a"></rect>' +
              '<rect x="146" y="162" width="104" height="64" fill="rgba(244,243,239,0.08)"></rect>' +
              '<rect x="146" y="230" width="70" height="5" fill="#c9c8c2"></rect>' +
              '<rect x="146" y="240" width="90" height="4" fill="#6f6e6a"></rect>' +
              '<rect x="30" y="256" width="104" height="64" fill="rgba(244,243,239,0.08)"></rect>' +
              '<rect x="146" y="256" width="104" height="64" fill="rgba(244,243,239,0.08)"></rect>' +
              "</svg>"
          }
        ]
      },

      scope: {
        heading: "What I did",
        items: [
          "Researched the astrology app category to find where onboarding lost people",
          "Redesigned onboarding and feature discovery — shipped on iOS and Android",
          "Designed the companion media platform’s layout for lean-back browsing",
          "Created App Store and social creative assets off the new onboarding"
        ]
      },

      decisions: {
        label: "DECISION STORIES",
        heading: "Three calls that shaped this project",
        stories: [
          {
            title: "Why I redesigned onboarding before touching anything else",
            lead: "Competitor research showed people weren't leaving because of weak content — they were leaving in the first two screens.",
            before: "high drop-off at onboarding was common across the whole astrology app category, not unique to this app.",
            tradeoff:
              "rebuild the full app experience for completeness, or isolate and fix onboarding first for the fastest impact on retention. I chose to isolate onboarding — it was the highest-leverage, lowest-risk place to start.",
            action:
              "prototyped a shorter onboarding and feature-discovery flow for iOS and Android, built directly from the gaps competitors were leaving open.",
            result: "both platforms shipped from one coherent onboarding system."
          },
          {
            title: "Why the media platform got its own interaction language",
            lead: "A reading feels different from a feed — reusing the app's components made the platform feel like an appendix, not a destination.",
            before: "the media platform launched with components borrowed from the app, and engagement stayed thin.",
            tradeoff:
              "extend the app's existing component set, which is faster and consistent, or design dedicated motion and layout suited to a browsing, lean-back mode, which takes longer but actually fits how people use the platform. I chose the dedicated design.",
            action:
              "designed advanced web animation and layout tuned specifically for browsing behaviour rather than task completion.",
            result: "a lift in dwell time and session engagement on the platform."
          },
          {
            title: "Why I owned acquisition assets instead of leaving them to marketing",
            lead: "The first thing a downloader sees isn't the app — it's the store listing.",
            before: "acquisition creative was typically a separate pass, disconnected from the product experience it was advertising.",
            tradeoff:
              "leave store assets to a separate creative process, or design the App Store Optimisation and social assets myself so they matched exactly what the new onboarding delivered. I chose to own it, for a consistent first impression.",
            action: "designed ASO assets and social creatives directly off the redesigned onboarding flow.",
            result: "acquisition assets that set accurate expectations and directly supported the launch campaign."
          }
        ]
      },

      next: {
        label: "WHAT'S NEXT",
        body:
          "With onboarding drop-off addressed, the next layer is personalisation — using early astrology-preference signals to tailor the media platform's feed, so day-two retention gets the same attention day-one onboarding did."
      },

      reflection: {
        label: "REFLECTION",
        body:
          "Designing two connected products at once forced a clearer view of where each one actually earned a user's attention. I now start consumer work by earning the first minute — then design everything after it to earn the next ten."
      },

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to talk through it. Details sit under NDA; glad to walk through them in an interview."
      }
    },

    {
      slug: "sankey-b2b-dashboards",
      metaTitle: "B2B dashboards, 4 industries (Sankey)",
      shortTitle: "Sankey dashboards",
      order: 3,

      category: "B2B Dashboards · Multi-industry",
      heroChip: "B2B Dashboards · Multi-industry",
      date: "Aug 2021 — Aug 2022",
      title: "Simplifying data-heavy B2B dashboards across four industries, landing 99% client satisfaction",
      cardLine: "UI/UX Designer, Sankey Solutions",
      blurb:
        "Stakeholders were drowning in data with no fast path to a decision. I designed one framework — dense enough to be useful, simple enough to act on — across four verticals.",
      impact: "99% client satisfaction across 4 industries",
      metrics: [
        { value: "99%", label: "client satisfaction" },
        { value: "4 industries", label: "auto · finance · banking · e-comm" },
        { value: "Rising Star", label: "award, first year" }
      ],
      thumbnail: thumb(
        '<text x="48" y="56" font-family="IBM Plex Mono, monospace" font-size="15" fill="#9a9993">Dashboard framework — one pattern, four verticals</text>' +
        '<rect x="48" y="76" width="544" height="272" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
        '<line x1="140" y1="76" x2="140" y2="348" stroke="rgba(255,255,255,0.2)"></line>' +
        '<circle cx="94" cy="110" r="4" fill="#f4f3ef"></circle>' +
        '<circle cx="94" cy="140" r="4" fill="rgba(255,255,255,0.35)"></circle>' +
        '<circle cx="94" cy="170" r="4" fill="rgba(255,255,255,0.35)"></circle>' +
        '<circle cx="94" cy="200" r="4" fill="rgba(255,255,255,0.35)"></circle>' +
        '<rect x="160" y="98" width="120" height="8" fill="#f4f3ef"></rect>' +
        '<rect x="500" y="94" width="72" height="20" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
        '<text x="536" y="108" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#9a9993">Filter</text>' +
        '<rect x="160" y="126" width="126" height="56" fill="rgba(244,243,239,0.08)"></rect>' +
        '<text x="172" y="152" font-family="IBM Plex Mono, monospace" font-size="15" fill="#f4f3ef">12.4k</text>' +
        '<path d="M246 166 l6 -8 l6 8" fill="none" stroke="#f4f3ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<text x="172" y="172" font-family="IBM Plex Mono, monospace" font-size="9" fill="#9a9993">Loans booked</text>' +
        '<rect x="300" y="126" width="126" height="56" fill="rgba(244,243,239,0.08)"></rect>' +
        '<text x="312" y="152" font-family="IBM Plex Mono, monospace" font-size="15" fill="#f4f3ef">86%</text>' +
        '<path d="M386 166 l6 -8 l6 8" fill="none" stroke="#f4f3ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<text x="312" y="172" font-family="IBM Plex Mono, monospace" font-size="9" fill="#9a9993">Approval rate</text>' +
        '<rect x="440" y="126" width="132" height="56" fill="rgba(244,243,239,0.08)"></rect>' +
        '<text x="452" y="152" font-family="IBM Plex Mono, monospace" font-size="15" fill="#f4f3ef">4.2d</text>' +
        '<text x="452" y="172" font-family="IBM Plex Mono, monospace" font-size="9" fill="#9a9993">Time to decision</text>' +
        '<rect x="160" y="198" width="412" height="90" fill="none" stroke="rgba(255,255,255,0.15)"></rect>' +
        '<rect x="180" y="248" width="18" height="34" fill="#f4f3ef"></rect>' +
        '<rect x="214" y="234" width="18" height="48" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="248" y="256" width="18" height="26" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="282" y="222" width="18" height="60" fill="#f4f3ef"></rect>' +
        '<rect x="316" y="240" width="18" height="42" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="350" y="228" width="18" height="54" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="384" y="252" width="18" height="30" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="418" y="214" width="18" height="68" fill="#f4f3ef"></rect>' +
        '<rect x="452" y="238" width="18" height="44" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="486" y="226" width="18" height="56" fill="rgba(244,243,239,0.55)"></rect>' +
        '<rect x="520" y="246" width="18" height="36" fill="#f4f3ef"></rect>' +
        '<rect x="160" y="302" width="412" height="7" fill="rgba(255,255,255,0.06)"></rect>' +
        '<rect x="160" y="316" width="380" height="7" fill="rgba(255,255,255,0.05)"></rect>' +
        '<rect x="160" y="330" width="400" height="7" fill="rgba(255,255,255,0.05)"></rect>'
      ),
      goals: [
        {
          label: "BUSINESS GOAL",
          value: "Replace four bespoke dashboard builds with one reusable framework — without losing per-client fit."
        },
        {
          label: "USER GOAL",
          value: "Each stakeholder reaches the one number their next decision depends on, without hunting for it."
        }
      ],
      summary:
        "One configurable dashboard framework replaced four bespoke builds — leading with the single number each stakeholder actually decides on.",

      meta: [
        { label: "ROLE", value: "UI/UX Designer" },
        { label: "TEAM", value: "Client stakeholders per vertical" },
        { label: "TIMELINE", value: "Aug 2021 — Aug 2022" },
        { label: "CLIENT", value: "Sankey Solutions (Remote)" },
        { label: "PLATFORMS", value: "Web + mobile" },
        { label: "INDUSTRIES", value: "Automotive, finance, banking, e-commerce" },
        { label: "STATUS", value: "Shipped" }
      ],

      outcomes: {
        heading: "Where this landed",
        items: [
          { value: "99%", label: "client satisfaction rate across all engagements" },
          { value: "4 industries", label: "automotive, finance, banking, e-commerce" },
          { value: "Rising Star", label: "of the Year, awarded in year one" }
        ],
        note: "Named Rising Star of the Year at Sankey Solutions for ahead-of-schedule delivery."
      },

      context: {
        label: "CONTEXT",
        heading: "Why more data on screen wasn't making anyone's decisions easier",
        body:
          "Stakeholders across automotive, finance, banking and e-commerce clients were drowning in data with no fast path to a decision. Each client's workflows were dense and different, but the underlying need was the same: surface the number that matters, not every number that exists — across web and mobile, for teams who didn't have time to hunt for it."
      },

      quote: {
        text: "The real skill wasn't a layout pattern — it was asking each stakeholder what decision they were actually trying to make."
      },

      solution: {
        label: "SOLUTION AS A JOURNEY",
        heading: "From a wall of data to one clear number",
        intro:
          "Wireframed here to keep individual client dashboards confidential: the shared framework's desktop layout, its mobile adaptation, and the reprioritisation that made it usable.",
        panels: [
          {
            alt: "Desktop wireframe of the dashboard framework, showing a left sidebar, a header with a filter control, three key metric cards each with a trend arrow, a bar chart, and a data table",
            caption:
              "Every KPI card pairs its number with a direction arrow — a screen-reader or color-blind user still knows which way it's moving.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Desktop wireframe of the dashboard framework, showing a left sidebar, a header with a filter control, three key metric cards each with a trend arrow, a bar chart, and a data table" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<rect x="16" y="18" width="248" height="304" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<line x1="70" y1="18" x2="70" y2="322" stroke="rgba(255,255,255,0.2)"></line>' +
              '<circle cx="43" cy="40" r="3" fill="none" stroke="#f4f3ef"></circle>' +
              '<circle cx="43" cy="62" r="3" fill="#f4f3ef"></circle>' +
              '<circle cx="43" cy="84" r="3" fill="none" stroke="rgba(255,255,255,0.35)"></circle>' +
              '<circle cx="43" cy="106" r="3" fill="none" stroke="rgba(255,255,255,0.35)"></circle>' +
              '<rect x="82" y="30" width="70" height="7" fill="#f4f3ef"></rect>' +
              '<rect x="210" y="28" width="54" height="16" fill="none" stroke="rgba(255,255,255,0.35)"></rect>' +
              '<rect x="82" y="56" width="58" height="44" fill="rgba(244,243,239,0.08)"></rect>' +
              '<text x="90" y="76" font-family="IBM Plex Mono, monospace" font-size="12" fill="#f4f3ef">12.4k</text>' +
              '<path d="M92 88 L98 82 L104 88" fill="none" stroke="#f4f3ef" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<rect x="146" y="56" width="58" height="44" fill="rgba(244,243,239,0.08)"></rect>' +
              '<text x="154" y="76" font-family="IBM Plex Mono, monospace" font-size="12" fill="#f4f3ef">86%</text>' +
              '<path d="M156 82 L162 88 L168 82" fill="none" stroke="#9a9993" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<rect x="210" y="56" width="54" height="44" fill="rgba(244,243,239,0.08)"></rect>' +
              '<text x="216" y="76" font-family="IBM Plex Mono, monospace" font-size="12" fill="#f4f3ef">4.2d</text>' +
              '<path d="M218 88 L224 82 L230 88" fill="none" stroke="#f4f3ef" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<rect x="82" y="114" width="182" height="90" fill="none" stroke="rgba(255,255,255,0.2)"></rect>' +
              '<rect x="94" y="160" width="14" height="34" fill="#f4f3ef"></rect>' +
              '<rect x="116" y="140" width="14" height="54" fill="#f4f3ef"></rect>' +
              '<rect x="138" y="150" width="14" height="44" fill="rgba(244,243,239,0.5)"></rect>' +
              '<rect x="160" y="128" width="14" height="66" fill="#f4f3ef"></rect>' +
              '<rect x="182" y="146" width="14" height="48" fill="rgba(244,243,239,0.5)"></rect>' +
              '<rect x="204" y="118" width="14" height="76" fill="#f4f3ef"></rect>' +
              '<rect x="226" y="136" width="14" height="58" fill="rgba(244,243,239,0.5)"></rect>' +
              '<rect x="82" y="216" width="182" height="10" fill="rgba(255,255,255,0.06)"></rect>' +
              '<rect x="82" y="232" width="182" height="8" fill="rgba(255,255,255,0.04)"></rect>' +
              '<rect x="82" y="246" width="182" height="8" fill="rgba(255,255,255,0.04)"></rect>' +
              '<rect x="82" y="260" width="182" height="8" fill="rgba(255,255,255,0.04)"></rect>' +
              "</svg>"
          },
          {
            alt: "Phone wireframe of the same dashboard adapted for mobile, with stacked key metric cards, a simplified chart, and a bottom navigation bar",
            caption:
              "Mobile keeps the same two metrics visible without scrolling — the rest is a tap away, not gone.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Phone wireframe of the same dashboard adapted for mobile, with stacked key metric cards, a simplified chart, and a bottom navigation bar" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<rect x="80" y="18" width="120" height="304" rx="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"></rect>' +
              '<rect x="96" y="44" width="88" height="7" fill="#f4f3ef"></rect>' +
              '<rect x="96" y="66" width="88" height="40" fill="rgba(244,243,239,0.08)"></rect>' +
              '<text x="104" y="90" font-family="IBM Plex Mono, monospace" font-size="12" fill="#f4f3ef">12.4k orders</text>' +
              '<path d="M164 82 L170 76 L176 82" fill="none" stroke="#f4f3ef" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<rect x="96" y="114" width="88" height="40" fill="rgba(244,243,239,0.08)"></rect>' +
              '<text x="104" y="138" font-family="IBM Plex Mono, monospace" font-size="12" fill="#f4f3ef">86% on time</text>' +
              '<rect x="96" y="164" width="88" height="70" fill="none" stroke="rgba(255,255,255,0.2)"></rect>' +
              '<rect x="104" y="200" width="8" height="26" fill="#f4f3ef"></rect>' +
              '<rect x="118" y="190" width="8" height="36" fill="#f4f3ef"></rect>' +
              '<rect x="132" y="196" width="8" height="30" fill="rgba(244,243,239,0.5)"></rect>' +
              '<rect x="146" y="182" width="8" height="44" fill="#f4f3ef"></rect>' +
              '<rect x="160" y="192" width="8" height="34" fill="rgba(244,243,239,0.5)"></rect>' +
              '<line x1="80" y1="290" x2="200" y2="290" stroke="rgba(255,255,255,0.2)"></line>' +
              '<circle cx="112" cy="304" r="4" fill="#f4f3ef"></circle>' +
              '<circle cx="140" cy="304" r="4" fill="none" stroke="rgba(255,255,255,0.35)"></circle>' +
              '<circle cx="168" cy="304" r="4" fill="none" stroke="rgba(255,255,255,0.35)"></circle>' +
              "</svg>"
          },
          {
            alt: "Diagram comparing a dense grid of twenty undifferentiated data tiles labeled everything available, against a single large highlighted metric with a drill down link labeled the decision that matters",
            caption:
              "Twenty tiles of equal weight became one metric with a drill-down — the rest didn't disappear, it just stopped competing for attention.",
            content:
              '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="Diagram comparing a dense grid of twenty undifferentiated data tiles labeled everything available, against a single large highlighted metric with a drill down link labeled the decision that matters" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<text x="20" y="30" font-family="IBM Plex Mono, monospace" font-size="11" fill="#9a9993">Everything available</text>' +
              '<rect x="20" y="42" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="68" y="42" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="116" y="42" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="164" y="42" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="212" y="42" width="48" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="20" y="76" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="68" y="76" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="116" y="76" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="164" y="76" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="212" y="76" width="48" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="20" y="110" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="68" y="110" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="116" y="110" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="164" y="110" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="212" y="110" width="48" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="20" y="144" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="68" y="144" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="116" y="144" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="164" y="144" width="44" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<rect x="212" y="144" width="48" height="30" fill="rgba(244,243,239,0.07)"></rect>' +
              '<line x1="20" y1="196" x2="260" y2="196" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3 5"></line>' +
              '<path d="M140 202 L134 210 L146 210 Z" fill="#f4f3ef"></path>' +
              '<text x="20" y="234" font-family="IBM Plex Mono, monospace" font-size="11" fill="#9a9993">The decision that matters</text>' +
              '<rect x="20" y="246" width="240" height="70" fill="rgba(244,243,239,0.1)" stroke="#f4f3ef"></rect>' +
              '<text x="36" y="284" font-family="IBM Plex Mono, monospace" font-size="20" fill="#f4f3ef">On-time rate: 86%</text>' +
              '<text x="36" y="304" font-family="IBM Plex Sans, sans-serif" font-size="11" fill="#9a9993" text-decoration="underline">See what\'s driving it →</text>' +
              "</svg>"
          }
        ]
      },

      scope: {
        heading: "What I did",
        items: [
          "Interviewed stakeholders per vertical to surface each decision-driving metric",
          "Designed one reusable dashboard framework, configured around each client’s priority metrics",
          "Adapted the same pattern from desktop to mobile",
          "Extended engagements into motion graphics, video and brand identity"
        ]
      },

      decisions: {
        label: "DECISION STORIES",
        heading: "Three calls that shaped this project",
        stories: [
          {
            title: "Why I built one dashboard framework instead of four separate ones",
            lead: "Automotive, banking, e-commerce — different data, but every stakeholder asked the same underlying question: what changed, and does it matter?",
            before: "each vertical risked getting its own bespoke, non-reusable dashboard pattern, built fresh from scratch every time.",
            tradeoff:
              "fully custom dashboards per client — tailored, but slow and inconsistent — or one flexible framework adaptable per vertical, which is faster to build and maintain but takes more upfront constraint-setting. I chose the shared framework.",
            action: "designed a reusable dashboard pattern that could be configured around each client's priority metrics.",
            result: "consistent delivery quality across four industries and a 99% client satisfaction rate."
          },
          {
            title: "Why the dashboard led with one number instead of showing everything available",
            lead: "Every client had more data available than they had time to look at.",
            before: "early drafts risked the common instinct to surface every available metric, because the data existed.",
            tradeoff:
              "show everything for completeness, or surface only the metric tied to the stakeholder's actual decision, with the rest available on drill-down. I chose decision-first.",
            action:
              "interviewed stakeholders per vertical to identify the one number driving their next action, and structured the layout around it.",
            result: "dashboards stakeholders could act on quickly, and consistently positive client feedback."
          },
          {
            title: "Why the work extended past the dashboard into motion and brand",
            lead: "A dashboard clients trust is still just one touchpoint in a larger relationship.",
            before: "dashboard delivery was often treated as the natural endpoint of the engagement.",
            tradeoff:
              "close the project at dashboard delivery — contractually sufficient — or extend into motion graphics, video and brand identity for a more cohesive, multi-channel experience, where it fit the client's broader needs. I chose to extend it where the context called for it.",
            action: "integrated motion graphics, video editing and brand identity into the wider deliverable set.",
            result: "Rising Star of the Year, awarded for delivery quality and pace in my first year."
          }
        ]
      },

      next: {
        label: "WHAT'S NEXT",
        body:
          "With a working shared framework in place, the natural next step is turning the framework itself into a documented, reusable component library — so future dashboard engagements start from a system, not a blank canvas."
      },

      reflection: {
        label: "REFLECTION",
        body:
          "Working across four industries in one year was the fastest way to learn that \"simplify the dashboard\" means something different every time. The patterns mattered less than the question behind them — and that question is now the first thing I ask on any data-heavy project."
      },

      footer: {
        question: "Have a question about a decision here?",
        tail: " — I'm happy to talk through it. Details sit under NDA; glad to walk through them in an interview."
      }
    },

    {
      slug: "accessibility-management-system",
      metaTitle: "Accessibility management platform — Accessly Internal & Accessly",
      shortTitle: "Accessibility management system",
      order: 4,

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
          type: "html",
          html:
            '<div class="cs-cta"><a class="btn btn--solid btn--sm" href="case-study.html?slug=barrierbreak-design-system">Read the design system case study →</a></div>'
        },

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
