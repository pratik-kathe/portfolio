/* ==========================================================================
   seed.js — the original content of the site
   First run copies this into localStorage; from then on the admin portal
   (admin.html) is the source of truth. Resetting in the portal restores this.
   ========================================================================== */
(function () {
  "use strict";

  var DEFAULT_HASH =
    "7a768ad6aad06ffc44a2fc98db53968062e7779ffb70bc8aff23486b6ede7107"; // sha256("pk.portfolio.salt:pratik@portfolio")

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
        "4.5+ years shipping SaaS, fintech and consumer products — with WCAG 2.1 AA/AAA accessibility built into the system, not bolted on at the end.",
      primary: { label: "View all case studies", href: "work.html" },
      secondary: {
        label: "View résumé",
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
      note: "Pratik Kathe — Mumbai, India",
      topLabel: "Back to top ↑",
      workCta: "Get in touch →"
    }
  };

  /* ---- case studies ------------------------------------------------------ */

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
      title: "Building an accessible design system for an enterprise SaaS platform",
      cardLine: "UI/UX & Product Designer, BarrierBreak",
      blurb:
        "Architecting a scalable Figma system while making WCAG 2.1 AA/AAA compliance the default, not an afterthought.",
      impact: "35–40% faster handoff · WCAG AA/AAA across the platform",
      summary:
        "One Figma system cut design-to-development handoff time by 35–40% — and made WCAG 2.1 AA/AAA the default at the component level instead of a late-stage fix.",

      meta: [
        { label: "ROLE", value: "UI/UX & Product Designer" },
        { label: "TIMELINE", value: "Jan 2024 — Present" },
        { label: "CLIENT", value: "BarrierBreak, Mumbai (Hybrid)" },
        { label: "TOOLS", value: "Figma, WCAG 2.1 AA/AAA" }
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
        heading: "Scope & deliverables",
        items: [
          "Figma tokens with WCAG contrast ratios documented at the point of creation",
          "Components with accessible states defined — focus, error, disabled, motion",
          "Discovery workshops with engineering to fold build constraints in early",
          "Developer-ready annotated specs, with support embedded through implementation"
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
        tail: " — I'm happy to talk through it."
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
      title: "Taking a multi-user astrology app from research to App Store launch",
      cardLine: "UI/UX Designer, CLXNS Technologies",
      blurb:
        "Leading UX for a consumer mobile app end-to-end — market research, onboarding, and a high-traffic companion media platform.",
      impact: "iOS + Android from one flow · ↑ media dwell time",
      summary:
        "Took a multi-user astrology app from market research to App Store launch — redesigning the first sixty seconds, then a companion media platform built to hold attention.",

      meta: [
        { label: "ROLE", value: "UI/UX Designer" },
        { label: "TIMELINE", value: "Apr 2023 — Jan 2024" },
        { label: "CLIENT", value: "CLXNS Technologies Pvt Ltd" },
        { label: "PLATFORMS", value: "iOS, Android, Web" }
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
        heading: "Scope & deliverables",
        items: [
          "Competitor research across the astrology app category",
          "Redesigned onboarding and feature-discovery flow, shipped on iOS and Android",
          "Companion media platform layout tuned for lean-back browsing",
          "App Store and social creative assets built off the new onboarding"
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
        tail: " — I'm happy to talk through it."
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
      title: "Simplifying data-heavy B2B dashboards across automotive, fintech and e-commerce",
      cardLine: "UI/UX Designer, Sankey Solutions",
      blurb:
        "Designing dashboards dense enough to be useful and simple enough to act on, for international clients across four verticals.",
      impact: "99% client satisfaction across 4 industries",
      summary:
        "One configurable dashboard framework replaced four bespoke builds — leading with the single number each stakeholder actually decides on, across automotive, finance, banking and e-commerce.",

      meta: [
        { label: "ROLE", value: "UI/UX Designer" },
        { label: "TIMELINE", value: "Aug 2021 — Aug 2022" },
        { label: "CLIENT", value: "Sankey Solutions (Remote)" },
        { label: "INDUSTRIES", value: "Automotive, finance, banking, e-commerce" }
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
        heading: "Scope & deliverables",
        items: [
          "Stakeholder interviews per vertical to surface the decision-driving metric",
          "One reusable dashboard framework, configured around each client's priority metrics",
          "Desktop-to-mobile adaptation of the same pattern",
          "Motion graphics, video and brand identity where the engagement called for it"
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
        tail: " — I'm happy to talk through it."
      }
    }
  ];

  window.SEED = {
    version: 1,
    auth: { salt: "pk.portfolio.salt", hash: DEFAULT_HASH },
    site: SITE,
    caseStudies: CASE_STUDIES
  };
})();
