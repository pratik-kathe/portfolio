/* Case studies shown on the site, in order. Each project has card fields, a header image,
   and a list of sections. Section types: text, image, gallery, beforeafter, metrics,
   process, quote, list, decision, link. Image sections can carry `notes` (numbered pins on the
   screenshot: x/y in % of the image, side l|r|t|b|c places the pin
   left of, right of, above, below, or centred on that point). Images live in assets/img/. */
window.CASE_STUDIES = {
 "version": 3,
 "projects": [
  {
   "id": "accessibility-management-system",
   "title": "Accessly: 3 hours to 30 seconds",
   "client": "BarrierBreak · Accessly Internal and Accessly",
   "category": "Accessibility SaaS",
   "year": "2024",
   "role": "Sole UI/UX designer, end to end",
   "duration": "~3 months to v1, ~6 more to the client version",
   "team": "CEO as product owner, 3 developers growing to 20",
   "platform": "Web SaaS (Free, Pro, Enterprise)",
   "color": "#F5C842",
   "summary": "Testers spent 75% of their time reporting instead of testing, across two 30-column spreadsheets. I designed Accessly Internal, which documents a page in about 30 seconds, and its patterns became Accessly, a SaaS used by 100+ paying customers.",
   "metric": {
    "value": "~30 sec",
    "label": "to document a page (was ~3 hrs)"
   },
   "lap": "100+ paying customers · 300+ screens, one designer",
   "cover": "assets/img/acs-shot.webp?v=2",
   "hero": "assets/img/acs-cover.webp",
   "sections": [
    {
     "type": "quote",
     "text": "I spent longer writing up one issue than finding it.",
     "name": "Tester",
     "role": "our internal accessibility audit team"
    },
    {
     "type": "text",
     "kicker": "The moment",
     "heading": "One hour finding issues. Three hours typing them up.",
     "body": "That was a normal day on our audit team. A tester spent about an hour testing a web page against WCAG, then about three hours documenting what they found, field by field, across two 30-column spreadsheets. Three quarters of a skilled tester's day went into retyping, not testing.\n\nI was the only designer, working from a verbal brief from our CEO, with no product vision yet and two spreadsheets to replace."
    },
    {
     "type": "text",
     "kicker": "The problem",
     "heading": "We sold testing hours and spent them on data entry",
     "body": "We run manual WCAG audits for enterprise clients and sell them by the hour. Every issue a tester finds becomes a formal report entry: what fails, where, how to reproduce it, which success criterion it breaks, how severe it is and how to fix it in code.\n\nAll of that was typed by hand into an internal tracking sheet, then retyped into a client report. The hours clients paid for went mostly into documentation, review happened in spreadsheet cells nobody was notified about, and every copy-paste was a chance to send a client a wrong fix."
    },
    {
     "type": "gallery",
     "heading": "Before: two spreadsheets, the same data typed twice",
     "items": [
      {
       "src": "assets/img/acs-excel-internal.webp",
       "alt": "The internal tracking spreadsheet, client details hidden"
      },
      {
       "src": "assets/img/acs-excel-client.webp",
       "alt": "The client report spreadsheet, the same data typed a second time"
      }
     ],
     "caption": "Left: the internal tracking sheet. Right: the client report. Client details hidden under NDA.",
     "cols": 1
    },
    {
     "type": "list",
     "heading": "What I found reading the sheets column by column",
     "items": [
      "The same text typed twice. “Comments” and “Issue Description” held identical text, and a “Move to Report” column meant retyping the row into the client sheet.",
      "A seven-stage review workflow hidden in columns, from Tested By to Finalized, with no status view and no notifications.",
      "Errors that reached clients. In one row “Suggested Code” was identical to “Existing Code”, formula cells showed #N/A, and one sheet said “High” where the other said “Major / Critical”.",
      "Feedback cut off mid-word in a single cell, and no record of who changed what, or when."
     ]
    },
    {
     "type": "list",
     "heading": "The project at a glance",
     "items": [
      "Product: Accessly Internal for our audit team, which became Accessly, a client SaaS.",
      "Scope: a full 0 → 1 product. Two spreadsheets were replaced outright.",
      "Users: testers, QA and reviewers, managers and mentors, admins, and later, clients.",
      "Constraints: an accessibility company can't ship an inaccessible tool. 15+ fields per issue, including code. Years of Excel habits. One designer, 300+ screens."
     ]
    },
    {
     "type": "text",
     "kicker": "Solution journey",
     "heading": "One page, from scan to signed-off report",
     "body": "Follow a tester on our team through one page of a client audit. Before, this was an hour of testing and three hours of typing. Now the scan has already documented what it can, and the tester's job is to judge it."
    },
    {
     "type": "image",
     "heading": "Step 1 · “How much of this is already done?”",
     "body": "The tester opens the project report and the issues are already there, generated from our own ruleset. The Overall view shows one row per issue type, with pages affected, instance count, WCAG principle, severity and level, instead of 500 rows of instances.",
     "src": "assets/img/acs-report-v2.webp",
     "caption": "Report: four views of the same data. Overall, Issue, Code and List.",
     "size": "normal",
     "alt": "Report: four views of the same data. Overall, Issue, Code and List.",
     "notes": [
      {
       "x": 37.5,
       "y": 22,
       "side": "r",
       "text": "Overall, List, Issue and Code: four views of the same data, one click apart."
      },
      {
       "x": 9.2,
       "y": 34.3,
       "side": "l",
       "text": "Instances grouped under their issue type, with the count beside it."
      },
      {
       "x": 61.7,
       "y": 40,
       "side": "r",
       "text": "Type comes from our ruleset; the tester only confirms or overrules it."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 2 · “Is the system right about this one?”",
     "body": "Everything needed to judge an instance sits on one screen: the element, the page, Steps to Validate and the screenshot. The system’s Type and the tester’s Updated Type sit side by side, so the tester can overrule the scan without erasing what it said.",
     "src": "assets/img/acs-issue-detail-v2.webp",
     "caption": "Issue Detail: one instance, everything needed to judge it.",
     "size": "normal",
     "alt": "Issue Detail: one instance, everything needed to judge it.",
     "notes": [
      {
       "x": 33.6,
       "y": 29.8,
       "side": "l",
       "text": "The tester’s Updated Type sits beside the system’s Type, so a change never erases what the scan said."
      },
      {
       "x": 44.8,
       "y": 90.4,
       "side": "r",
       "text": "Steps to Validate say what to check, so a reviewer can repeat the judgement."
      },
      {
       "x": 59,
       "y": 50,
       "side": "l",
       "text": "Screenshot and alt text on the same screen as the issue."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 3 · “The scan missed one. Let me log it.”",
     "body": "Create Issue opens as a full page with the same layout as Issue Detail, so what testers write is what a reviewer reads. Only five fields are required, and the level fills itself from the chosen success criterion.",
     "src": "assets/img/acs-create-issue-v2.webp",
     "caption": "Create Issue: one issue, full page, five required fields.",
     "size": "normal",
     "alt": "Create Issue: one issue, full page, five required fields.",
     "notes": [
      {
       "x": 13.4,
       "y": 22.4,
       "side": "t",
       "text": "Only five fields are required, marked with an asterisk."
      },
      {
       "x": 42,
       "y": 97,
       "side": "l",
       "text": "Level fills itself from the chosen success criterion."
      },
      {
       "x": 64.2,
       "y": 29.8,
       "side": "r",
       "text": "Same layout as Issue Detail, so what the tester writes is what the reviewer reads."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 4 · “Who changed this, and why?”",
     "body": "Every review change is recorded as one readable sentence: who, what, from what to what, on which issue, and when. The seven review stages that hid in spreadsheet columns are now statuses everyone can see.",
     "src": "assets/img/acs-logs.webp",
     "caption": "Logs: the audit trail Excel never had.",
     "size": "normal",
     "alt": "Logs: the audit trail Excel never had.",
     "notes": [
      {
       "x": 7,
       "y": 33,
       "side": "l",
       "text": "One sentence per change: who, what, from what to what."
      },
      {
       "x": 24,
       "y": 27,
       "side": "t",
       "text": "Each entry links to the issue it changed."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 5 · “Can I tell the client how bad it is in one sentence?”",
     "body": "A Defect Score and a Conformance Score turn signed-off issues into something a client can act on. Each gauge writes its value and meaning in text, so colour is never the only signal.",
     "src": "assets/img/acs-score.webp",
     "caption": "Score: two gauges, each with its meaning written out.",
     "size": "normal",
     "alt": "Score: two gauges, each with its meaning written out.",
     "notes": [
      {
       "x": 42.5,
       "y": 53.5,
       "side": "l",
       "text": "The score and its meaning in words, so colour is never the only signal."
      },
      {
       "x": 25,
       "y": 23.5,
       "side": "l",
       "text": "Every chart has a Table view a screen reader can read."
      },
      {
       "x": 41,
       "y": 28.9,
       "side": "l",
       "text": "Patterns as well as colours, for people who can’t tell the bands apart."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 6 · “…and I don’t have to log my hours.”",
     "body": "A Production toggle tracks time all along. Managers see sold hours against actual hours without anyone filling in a form.",
     "src": "assets/img/acs-timesheet.webp",
     "caption": "Timesheet: filled by the Production toggle.",
     "size": "normal",
     "alt": "Timesheet: filled by the Production toggle.",
     "notes": [
      {
       "x": 77.8,
       "y": 3.2,
       "side": "l",
       "text": "The Production toggle in the header tracks time while people work."
      },
      {
       "x": 36.2,
       "y": 44,
       "side": "l",
       "text": "Hours land in the right column without anyone filling in a form."
      }
     ]
    },
    {
     "type": "quote",
     "text": "Now I check what the system wrote instead of writing it myself.",
     "name": "Tester",
     "role": "our internal accessibility audit team"
    },
    {
     "type": "decision",
     "title": "Decision 1 · Why I killed batch issue creation after watching testers use it on a live project",
     "lead": "My hypothesis was that testers would save time logging several issues at once. Watching them on a real client audit proved me wrong three different ways.",
     "before": "Create Issue V1 was a modal. Testers queued several issues with Add New, then submitted them all at once.",
     "options": "Fix the three failures inside the batch modal, or drop batching and log one issue at a time on a full page.",
     "tradeoff": "Testers lost track of which queued issue they were filling in, one invalid field blocked the whole batch, and closing the modal by accident lost everything. Patching would have fixed symptoms of a model that didn’t match how testers work: they find issues one at a time.",
     "action": "One issue at a time, on a full page, laid out exactly like Issue Detail. Required fields cut to five. Level derived from the success criterion. Field names made consistent across screens.",
     "result": "Testers log fast and add detail later, nothing is lost to a stray click, and the Excel-era level mismatches disappeared. The lesson I’d now apply first: watch someone do the job before designing the shortcut."
    },
    {
     "type": "beforeafter",
     "heading": "",
     "before": "assets/img/acs-create-issue-v1.webp",
     "after": "assets/img/acs-create-issue-v2.webp",
     "beforeLabel": "V1 · batch modal",
     "afterLabel": "V2 · full page",
     "caption": "Drag to compare. V1 queued issues in a modal; V2 logs one issue on a full page, same layout as Issue Detail."
    },
    {
     "type": "decision",
     "title": "Decision 2 · How one 30-column spreadsheet row became four purpose-built Report views",
     "lead": "V1 put every instance on one screen with a large screenshot in each row. Only about nine rows fit on a laptop.",
     "before": "One Excel row carried 30 columns, and V1 faithfully reproduced it as one table.",
     "options": "Keep one table and make it denser, or split the same data into views that each answer one person’s question.",
     "tradeoff": "Splitting risked hiding detail: a manager still needed the whole site at once, and a tester still needed every instance. One dense table served neither. I chose to split by question, as long as every view stayed one click away.",
     "action": "Overall for managers, Issue for testers, Code for developers (instances grouped by identical code, so one change fixes many) and List for sorting and filtering. Bulk Update, Pass and Export appear once rows are selected.",
     "result": "A manager reads what’s wrong across a whole site without scrolling 500 rows, and changing 100 statuses is one action instead of 100 cell edits."
    },
    {
     "type": "beforeafter",
     "heading": "",
     "before": "assets/img/acs-report-v1.webp",
     "after": "assets/img/acs-report-v2.webp",
     "beforeLabel": "V1 · one table",
     "afterLabel": "V2 · four views",
     "caption": ""
    },
    {
     "type": "decision",
     "title": "Decision 3 · Why I kept the team’s Excel words, but not their severity scale",
     "lead": "The testers had years of muscle memory in a spreadsheet. I didn’t want vocabulary to be the reason they refused a new product.",
     "before": "Statuses like Perfect Issues, Approved After Fixing and No QA Needed lived in Excel. Severity was free text, and the two sheets disagreed.",
     "options": "Design a clean new taxonomy for everything, or keep the team’s language exactly as it was.",
     "tradeoff": "Renaming statuses would have felt tidier to me and foreign to them. Keeping everything as-is would have kept the inconsistency that sent clients mixed severity labels. So I split the decision: keep the words people use to talk about their work, standardise the data clients read.",
     "action": "Every Excel status became a product status, unchanged. Severity became one shared scale across both products: Blocker, Critical, Major, Minor, Best Practice.",
     "result": "Nothing had to be relearned, and severity mismatches stopped reaching client reports. The same scale later mapped straight onto Jira priorities."
    },
    {
     "type": "decision",
     "title": "Decision 4 · How I made charts usable for the people we audit for: a table behind every chart",
     "lead": "An accessibility company shipping charts a screen reader can’t read would undercut everything we sell.",
     "before": "The dashboard and Score screens are mostly charts, and charts are rarely usable with a screen reader or for people who can’t tell colours apart.",
     "options": "Add text descriptions to each chart, or give every chart a full data table the user can switch to.",
     "tradeoff": "A description summarises; it can’t be sorted or navigated cell by cell. A table toggle costs developers a second view per widget, but gives screen-reader users the same data sighted users get.",
     "action": "A Chart / Table toggle on every widget. Patterns separate chart segments so colour isn’t the only cue (WCAG 1.4.1). Over-budget KPIs use a red card and an up-arrow, never colour alone.",
     "result": "Every number on the dashboard can be reached and read without seeing the chart, and the pattern carried into Accessly unchanged."
    },
    {
     "type": "beforeafter",
     "heading": "",
     "before": "assets/img/acs-dashboard-chart.webp",
     "after": "assets/img/acs-dashboard-table.webp",
     "beforeLabel": "Chart view",
     "afterLabel": "Table view",
     "caption": "The same numbers, as patterned charts and as sortable, screen-reader friendly tables."
    },
    {
     "type": "decision",
     "title": "Decision 5 · What I left out when the internal tool became a product for paying clients",
     "lead": "The answer came from one question: what is the client actually paying for?",
     "before": "Accessly Internal had features that exist to run our audit business: Timesheet, Leaderboard, the Production toggle. Clients had none of what they’d need alone: choosing pages, running scans, proving progress.",
     "options": "Ship the internal tool as it was, or keep the shared core and rebuild only the edges.",
     "tradeoff": "Shipping everything was faster, but clients pay for results, not hours. Keeping the core meant screens already stress-tested on live audits went to clients unchanged.",
     "action": "Report and Issue Detail shipped unchanged in structure. New for clients: Pages, Scans, Results Comparison, Jira integration and Custom Standards.",
     "result": "Accessly started from patterns that had already survived real audits, and it is now used by 100+ paying customers."
    },
    {
     "type": "gallery",
     "heading": "Built for clients",
     "items": [
      {
       "src": "assets/img/acs-pages.webp",
       "alt": "Pages: clients choose what gets tested"
      },
      {
       "src": "assets/img/acs-compare.webp",
       "alt": "Results Comparison: proof of progress"
      },
      {
       "src": "assets/img/acs-jira.webp",
       "alt": "Jira: our fields mapped to theirs"
      },
      {
       "src": "assets/img/acs-standards.webp",
       "alt": "Custom Standards: our ruleset, their policy"
      }
     ],
     "caption": "Pages, Results Comparison, Jira integration and Custom Standards.",
     "cols": 2
    },
    {
     "type": "metrics",
     "heading": "What changed for the audit team",
     "items": [
      {
       "value": "~30 sec",
       "label": "to document a page’s auto-detected issues (was ~3 hrs)"
      },
      {
       "value": "~90%",
       "label": "fewer data-entry errors (team estimate)"
      },
      {
       "value": "100+",
       "label": "paying customers on Accessly"
      },
      {
       "value": "300+",
       "label": "screens across both products, one designer"
      }
     ]
    },
    {
     "type": "link",
     "heading": "The product is live, and you can open it",
     "body": "Accessly Internal became Accessly, the client SaaS built on the same patterns, live on the open web and used by paying customers. Every number above is measured on that shipped product, not on a prototype.",
     "url": "https://www.barrierbreak.com/a11ynow/",
     "label": "Open the live Accessly dashboard"
    },
    {
     "type": "text",
     "kicker": "Iteration archive",
     "heading": "What I tried first, and why it didn’t survive",
     "body": "The structure came before any UI. I mapped the brief into a rough flow, mapped each section to its data, then wireframed ten screens with open questions on sticky notes. The original wireframes were lost over 2.5 years; the board below is recreated for presentation."
    },
    {
     "type": "image",
     "heading": "",
     "body": "",
     "src": "assets/img/acs-wireframes.webp",
     "caption": "Wireframes, recreated. The sticky notes were the open questions, like “chart or table toggle per widget?”",
     "size": "full",
     "alt": "Wireframes, recreated. The sticky notes were the open questions, like “chart or table toggle per widget?”"
    },
    {
     "type": "beforeafter",
     "heading": "Issue Detail: accordions → one instance at a time",
     "before": "assets/img/acs-issue-detail-v1.webp",
     "after": "assets/img/acs-issue-detail-v2.webp",
     "beforeLabel": "V1 · accordions",
     "afterLabel": "V2 · one instance",
     "caption": "V1 stacked 10–20 instances in accordions and testers couldn’t tell which screenshot belonged to which. V2 shows one instance with “1 of 4” navigation."
    },
    {
     "type": "beforeafter",
     "heading": "Projects: a plain table → a place to start",
     "before": "assets/img/acs-projects-v1.webp",
     "after": "assets/img/acs-projects-v2.webp",
     "beforeLabel": "Internal table",
     "afterLabel": "Client version",
     "caption": "Clients arrive alone, so Recent Projects sits on top and Create Project is the obvious first action."
    },
    {
     "type": "beforeafter",
     "heading": "Settings: one form → rules written on screen",
     "before": "assets/img/acs-profile-v1.webp",
     "after": "assets/img/acs-profile-v2.webp",
     "beforeLabel": "Edit Profile",
     "afterLabel": "Full settings",
     "caption": ""
    },
    {
     "type": "text",
     "kicker": "UI system",
     "heading": "One system behind 300+ screens and two products",
     "body": "I built a Design System alongside the product: tokens, components and documented accessible states for focus, error, disabled and motion. One type scale and one spacing scale, held as shared styles. Every colour token was checked against WCAG AA/AAA contrast when it was created, not audited later.\n\nWhen Accessly was built, it inherited the same components, so a second product didn’t mean a second UI, and one designer kept both consistent while the team grew from 3 developers to 20."
    },
    {
     "type": "list",
     "heading": "Reflection: what I’d keep, and what I’d change",
     "items": [
      "Change: watch someone do the job before designing the shortcut. I’d test batch creation in week one.",
      "Change: write decisions down from day one. A choice that lived only in my head broke when someone else built on it.",
      "Keep: automate the documentation, not the judgement. Type and Updated Type side by side is what made testers trust the system.",
      "Keep: build the Design System with the product, not after it."
     ]
    },
    {
     "type": "text",
     "kicker": "Future scope",
     "heading": "Next: let the system write the fix too",
     "body": "The next manual job to remove is the fix itself. Generate Code, which started as a button in Issue Detail, writes an accessible fix for each failing snippet and is now part of a separate AI product in production.\n\nDetails sit under NDA. I’m glad to walk through them in an interview."
    }
   ],
   "headline": "Cutting issue documentation from 3 hours to 30 seconds — Accessly Internal and the client SaaS it became"
  },
  {
   "id": "accessly-extension",
   "title": "Accessly Extension: 3 hours to 3 seconds",
   "client": "BarrierBreak · Browser extension",
   "category": "Browser extension",
   "year": "",
   "role": "Sole designer, end to end",
   "duration": "~1 month to v1, then v2 and v3",
   "team": "CEO as product owner, 2 developers, 1 tester at launch",
   "platform": "Chrome, Edge, Firefox and Safari (inside DevTools)",
   "color": "#FF6B5A",
   "summary": "Accessly’s crawler stopped at the login screen, so the pages clients actually sell from went untested. I designed Accessly Extension: it tests a page in 2–3 seconds from inside DevTools, works on logged-in pages, and sends every issue to Accessly in one click.",
   "metric": {
    "value": "~3 sec",
    "label": "to test a page (was ~3 hrs by hand)"
   },
   "lap": "1,000+ users · 1M+ scans · 200K+ issues exported",
   "cover": "assets/img/ext-shot.webp?v=2",
   "hero": "assets/img/ext-cover.webp",
   "sections": [
    {
     "type": "text",
     "kicker": "The moment",
     "heading": "The scan stopped at the login screen",
     "body": "Accessly crawled a client’s site and tested every public page it could reach. But most of what our clients sell lives behind a login: dashboards, checkouts, account settings. The crawler couldn’t get past the sign-in form, so for those pages testers went back to doing it by hand, switching between several free browser extensions and retyping what they found into Accessly.\n\nTesting one page that way took 2–3 hours. The product I’d designed to end retyping had a hole exactly where the most important pages were."
    },
    {
     "type": "quote",
     "text": "If the crawler can’t log in, the tester has to.",
     "name": "The line I kept coming back to",
     "role": ""
    },
    {
     "type": "text",
     "kicker": "The problem",
     "heading": "Our best tool couldn’t see the pages that mattered most",
     "body": "Accessly tested pages by fetching them from a server. That works for a marketing site and fails for anything that needs a session. An extension runs inside the tester’s own browser, already signed in, so it sees exactly what they see.\n\nThe market already had good extensions, so ours had to earn its place: more accurate results from our own ruleset, more checks in one place, and the one thing none of them could do, which was send issues straight into the product our team and our clients already used."
    },
    {
     "type": "list",
     "heading": "What the existing extensions left out",
     "items": [
      "axe DevTools: automated scan in DevTools, but its own rules and labels, and results stay in its own dashboard.",
      "WAVE: icons drawn on the page, but visual only, with no export into a project.",
      "ARC Toolkit: rule results for experts, with no issue workflow behind it.",
      "Silktide: a side panel that narrows the page, and no export.",
      "ARIA DevTools: one job only, ARIA, not WCAG."
     ]
    },
    {
     "type": "list",
     "heading": "What testers were working around",
     "items": [
      "No coverage behind a login. Dashboards, checkouts and account pages never reached the Accessly report.",
      "Four tools, four vocabularies. “Error”, “Violation”, “Needs review”, and none matched Accessly’s Fail / Validate / Pass.",
      "Every finding retyped into Accessly, field by field.",
      "Checks spread across tools, and keyboard testing done by hand with no record."
     ]
    },
    {
     "type": "list",
     "heading": "The project at a glance",
     "items": [
      "Product: Accessly Extension, a browser extension (Free / Pro / Enterprise), with an internal build for our audit team.",
      "Scope: 0 → 1, then two improvement releases: a side panel in v1, a DevTools tab from v2, new test types in v3.",
      "Users: developers, QA and designers who need a page’s issues fast; our own testers through the internal build; Accessly customers, who export into their projects.",
      "Constraints: a narrow panel next to live code. Four browsers with different extension rules. Our own extension had to be accessible. Results had to match Accessly’s taxonomy exactly."
     ]
    },
    {
     "type": "text",
     "kicker": "Solution journey",
     "heading": "One logged-in page, from first click to an Accessly project",
     "body": "Follow a tester through a client’s account dashboard, a page Accessly’s crawler can’t reach. Before, this meant a mix of extensions, a manual keyboard pass and 2–3 hours of testing and typing. Now the scan takes 2–3 seconds, and everything ends in the same project as the rest of the audit."
    },
    {
     "type": "image",
     "heading": "Step 1 · “What do I want to check on this page?”",
     "body": "The tester opens the Accessly tab in DevTools. Test the whole page by element type and guideline, or pick one element straight from the Elements panel. Either way the scan takes 2–3 seconds.",
     "src": "assets/img/ext-home.webp",
     "caption": "Test: the whole page, or one element picked from the Elements panel.",
     "size": "normal",
     "alt": "Test: the whole page, or one element picked from the Elements panel.",
     "notes": [
      {
       "x": 51.2,
       "y": 35,
       "side": "l",
       "text": "Accessly is a DevTools tab beside Elements, on the page the tester is already signed in to."
      },
      {
       "x": 66.5,
       "y": 47.3,
       "side": "l",
       "text": "Test the whole page by element type and guideline…"
      },
      {
       "x": 93,
       "y": 66.5,
       "side": "r",
       "text": "…or one element picked from the Elements panel."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 2 · “How bad is this page?”",
     "body": "Two cards show what fails and what needs a human to validate, then the same counts by WCAG level. The left rail lists every tool with its count, so the size of the job is visible before opening anything.",
     "src": "assets/img/ext-overview.webp",
     "caption": "Overview: fails and validations, split by WCAG level.",
     "size": "normal",
     "alt": "Overview: fails and validations, split by WCAG level.",
     "notes": [
      {
       "x": 26,
       "y": 21.8,
       "side": "l",
       "text": "What fails, by issue type and by count."
      },
      {
       "x": 64.7,
       "y": 21.8,
       "side": "l",
       "text": "What needs a human to validate, kept separate from fails."
      },
      {
       "x": 24.3,
       "y": 50.3,
       "side": "l",
       "text": "The same counts by WCAG level."
      },
      {
       "x": 14.8,
       "y": 20.2,
       "side": "l",
       "text": "Every tool in the left rail shows its count before you open it."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 3 · “Which element is it, and how do I fix it?”",
     "body": "Fails are grouped by issue type, with Accessly’s severity scale on every group. Clicking an ID outlines the element on the live page in red, so the tester sees what failed rather than reading a selector.",
     "src": "assets/img/ext-fail.webp",
     "caption": "Fail: grouped by issue type, severity on every group.",
     "size": "normal",
     "alt": "Fail: grouped by issue type, severity on every group.",
     "notes": [
      {
       "x": 30,
       "y": 27,
       "side": "l",
       "text": "Fails grouped by issue type, not listed one by one."
      },
      {
       "x": 80.4,
       "y": 27,
       "side": "l",
       "text": "Accessly’s severity scale on every group."
      },
      {
       "x": 29,
       "y": 33.4,
       "side": "l",
       "text": "Click an ID and the element is outlined in red on the live page."
      },
      {
       "x": 85,
       "y": 96,
       "side": "l",
       "text": "Export sends the selection to Accessly."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 4 · “What does the scan need me to judge?”",
     "body": "Rules can tell an image has alt text, not whether it’s any good. Those checks go to Validate, written as an instruction like “Verify if page title is descriptive”, so the tester knows what to look at.",
     "src": "assets/img/ext-validate.webp",
     "caption": "Validate: checks phrased as what to verify.",
     "size": "normal",
     "alt": "Validate: checks phrased as what to verify.",
     "notes": [
      {
       "x": 64.8,
       "y": 50.3,
       "side": "l",
       "text": "Each check written as an instruction: “Verify if page title is descriptive”."
      },
      {
       "x": 51,
       "y": 50.1,
       "side": "l",
       "text": "Validate has its own count, separate from Fail."
      }
     ]
    },
    {
     "type": "gallery",
     "heading": "Step 5 · “The scan missed one. Let me log it right here.”",
     "items": [
      {
       "src": "assets/img/ext-create-issue-inspect.webp",
       "alt": "Create Issue: point at the element on the page"
      },
      {
       "src": "assets/img/ext-create-issue-filled.webp",
       "alt": "Create Issue: code and screenshot filled in for the tester"
      }
     ],
     "caption": "Press Inspect element and click the problem on the live page. The extension fills in the code and takes the screenshot; the tester only picks the issue type.",
     "cols": 2
    },
    {
     "type": "gallery",
     "heading": "Step 6 · “Can someone use this page without a mouse?”",
     "items": [
      {
       "src": "assets/img/ext-keyboard.webp",
       "alt": "Keyboard Test: traps, missing focus, unexpected focus"
      },
      {
       "src": "assets/img/ext-links.webp",
       "alt": "Broken Links: blocked, redirected, active"
      }
     ],
     "caption": "Keyboard Test reports traps and focus problems. Broken Links sorts every link. Each item jumps to its element.",
     "cols": 2
    },
    {
     "type": "image",
     "heading": "Step 7 · “This contrast fails. What colour would pass?”",
     "body": "For cases a scan can’t settle, like text over an image, the tester picks colours with an eyedropper and sees AA and AAA results. When a pair fails, it suggests passing colours.",
     "src": "assets/img/ext-contrast.webp",
     "caption": "Contrast Checker: ratio, with AA and AAA results.",
     "size": "normal",
     "alt": "Contrast Checker: ratio, with AA and AAA results.",
     "notes": [
      {
       "x": 74.1,
       "y": 37.5,
       "side": "l",
       "text": "Pick colours from the page with an eyedropper, even text over an image."
      },
      {
       "x": 29.1,
       "y": 87.5,
       "side": "l",
       "text": "The ratio, large enough to read at a glance."
      },
      {
       "x": 47.9,
       "y": 77.7,
       "side": "l",
       "text": "AA and AAA results for text, large text and non-text."
      }
     ]
    },
    {
     "type": "gallery",
     "heading": "Step 8 · “…and I don’t have to type any of it into Accessly.”",
     "items": [
      {
       "src": "assets/img/ext-pass.webp",
       "alt": "Select results on any tab, then Export"
      },
      {
       "src": "assets/img/ext-export.webp",
       "alt": "Export to Accessly: pick the project and page"
      }
     ],
     "caption": "Export says exactly what is about to move and asks where. Nothing needs mapping, because both products share one taxonomy and severity scale.",
     "cols": 2
    },
    {
     "type": "image",
     "heading": "Step 9 · “What have I tested this month?”",
     "body": "Every scan is logged to the web dashboard with its URL, date and results, so a returning user can pick up where they left off.",
     "src": "assets/img/ext-dashboard.webp",
     "caption": "Dashboard: every scan, logged.",
     "size": "normal",
     "alt": "Dashboard: every scan, logged.",
     "notes": [
      {
       "x": 23.7,
       "y": 24.5,
       "side": "l",
       "text": "Monthly and all-time scans at a glance."
      },
      {
       "x": 7.7,
       "y": 45.5,
       "side": "l",
       "text": "Every scan logged with its URL, date and results."
      }
     ]
    },
    {
     "type": "quote",
     "text": "The login screen stopped being where the audit ended.",
     "name": "The line I kept coming back to",
     "role": ""
    },
    {
     "type": "decision",
     "title": "Decision 1 · Why I moved the whole extension out of the side panel and into DevTools",
     "lead": "v1 opened in the browser’s side panel, which looked like the obvious home for it. On real pages it was quietly changing the results.",
     "before": "A floating icon on every site opened a side panel with Test Website, and results appeared as accordions in the same panel.",
     "options": "Patch the side panel, or move the extension into DevTools as its own tab.",
     "tradeoff": "The side panel takes width from the page, so a desktop site dropped into its tablet layout and the extension tested a version most users never see. It also couldn’t reliably reach iframes. DevTools fixed all three, at the cost of discoverability: testers live in DevTools, clients’ QA and designers often don’t.",
     "action": "Moved testing into a DevTools tab next to Styles and Computed. To pay for the lost visibility: a toolbar popup that says where the extension is, a five-step tutorial on first run, and bookmarklets kept in the popup.",
     "result": "Results now match the page users actually get, iframes are tested, and a tester can go from a failing ID straight to its code."
    },
    {
     "type": "beforeafter",
     "heading": "",
     "before": "assets/img/ext-v1-sidepanel.webp",
     "after": "assets/img/ext-devtools-full.webp",
     "beforeLabel": "v1 · side panel",
     "afterLabel": "v2 · DevTools tab",
     "caption": "Drag to compare. The side panel squeezed the page it was testing; DevTools leaves it at full width."
    },
    {
     "type": "decision",
     "title": "Decision 2 · How “Manual” became “Validate”, and why the extension had to use Accessly’s words",
     "lead": "v1 sorted results into Fail, Manual, Pass and Best Practice. Two of those described how a check was done, not what the user should do next.",
     "before": "“Manual” told a tester the scan couldn’t decide, but not what to look at. “Best Practice” sat next to severities and read as a level of failure.",
     "options": "Keep v1’s categories and explain them in tooltips, or rename them around the action each one asks for.",
     "tradeoff": "Renaming meant retraining v1 users. Keeping the names meant every export into Accessly needed a translation step. One vocabulary across both products was worth one round of relearning.",
     "action": "Fail, Validate (written as an instruction), Pass and Suggestion. Best Practice moved into the severity scale. The same four words are used in Accessly and Accessly Internal.",
     "result": "Users know what each tab asks of them, and an exported issue lands in the same bucket in Accessly with no mapping."
    },
    {
     "type": "beforeafter",
     "heading": "",
     "before": "assets/img/ext-v1-results.webp",
     "after": "assets/img/ext-validate.webp",
     "beforeLabel": "v1 · Fail, Manual, Pass, BP",
     "afterLabel": "v2 · Validate",
     "caption": ""
    },
    {
     "type": "decision",
     "title": "Decision 3 · Adding tests a ruleset can’t run, and shipping them as Beta",
     "lead": "The checks people needed next weren’t rules on markup: can I use this page with a keyboard, do the links work, are there typos.",
     "before": "Keyboard testing was done by hand and left no record. Broken links and spelling weren’t checked at all.",
     "options": "Hold the new tests until they matched the ruleset’s accuracy, or ship them early, clearly marked.",
     "tradeoff": "Interaction-based tests are noisier; a dynamic menu can look like a keyboard trap. Hiding them protects trust but keeps testers on the slow path. Shipping them unmarked would put noise next to results people rely on.",
     "action": "Keyboard Test, Broken Links and Spell Check shipped with a Beta tag. Each group says in one line what it means, every item has a locate button, and Spell Check has Ignore and Add to Dictionary.",
     "result": "Testers use the new checks while knowing which results to double-check, and the core results keep their credibility."
    },
    {
     "type": "image",
     "heading": "",
     "body": "",
     "src": "assets/img/ext-spell-check.webp",
     "caption": "Spell Check: Beta, with Ignore and Add to Dictionary.",
     "size": "normal",
     "alt": "Spell Check: Beta, with Ignore and Add to Dictionary."
    },
    {
     "type": "decision",
     "title": "Decision 4 · Why the colour-fix tool went into the extension instead of becoming its own product",
     "lead": "A failing contrast ratio tells you there’s a problem. It doesn’t tell anyone what colour to use instead.",
     "before": "The plan was to build contrast suggestions as a separate product, while the extension already found every contrast failure on the page.",
     "options": "Build the suggestion tool as its own product, or fold it into the extension.",
     "tradeoff": "A separate product meant another install, another onboarding, and a failing colour carried from one tool to the next. The extension was already installed and already knew the page’s colours through CSS Overview. I argued for one product doing the whole job.",
     "action": "I designed suggestions into the Contrast Checker: passing foreground and background colours based on the page’s own palette, against the minimum the user picks.",
     "result": "A contrast failure goes from found to fixed in the same tab, with a colour that fits the brand, and the company built one product instead of two."
    },
    {
     "type": "image",
     "heading": "",
     "body": "",
     "src": "assets/img/ext-contrast-suggest.webp",
     "caption": "Colour suggestions: passing colours, built into the checker.",
     "size": "normal",
     "alt": "Colour suggestions: passing colours, built into the checker."
    },
    {
     "type": "decision",
     "title": "Decision 5 · Connecting the extension to Accessly, and what stayed out of the client version",
     "lead": "An extension that finds issues and then makes you retype them would have recreated the exact problem Accessly Internal solved.",
     "before": "Results could only leave the extension as a CSV, copied into Accessly row by row.",
     "options": "Improve the CSV so it imports cleanly, or export directly into an Accessly project.",
     "tradeoff": "A better CSV was cheap but still meant a download, an upload and a chance to pick the wrong project. A direct export needed sign-in and shared data definitions, which was only possible because the taxonomy and severity scale were already shared.",
     "action": "Export sends selected results to an Accessly project and page, and Create Issue writes a hand-found issue straight into it. CSV stayed for people who don’t use Accessly. Free, Pro and Enterprise plans for clients; an internal build for our team.",
     "result": "Logged-in pages land in the same report as crawled ones. More than 200,000 issues have been exported this way."
    },
    {
     "type": "metrics",
     "heading": "What changed once the scan got past the login",
     "items": [
      {
       "value": "~3 sec",
       "label": "to test a page, down from ~3 hrs by hand"
      },
      {
       "value": "1,000+",
       "label": "users, including paying Pro teams"
      },
      {
       "value": "1M+",
       "label": "scans logged on the dashboard"
      },
      {
       "value": "200K+",
       "label": "issues exported into Accessly projects"
      }
     ]
    },
    {
     "type": "link",
     "heading": "Published, in daily use, and installable in one click",
     "body": "The extension shipped to v3 and is in daily use. Anyone reading this can install it and run it against any page in a few seconds.",
     "url": "https://chromewebstore.google.com/detail/giaolcgipopikbjonacmaokkeiaolmfp",
     "label": "Get it from the Chrome Web Store",
     "url2": "https://www.barrierbreak.com/a11yinspect/",
     "label2": "Open the live product page"
    },
    {
     "type": "text",
     "kicker": "Iteration archive",
     "heading": "Three versions, each fixing what the last one couldn’t",
     "body": "v1 lived in a Chrome side panel with Fail / Manual / Pass / Best Practice and CSV export. v2 moved into DevTools with full-width and iframe testing, the new taxonomy, Structure, the Contrast Checker and CSS tools. v3 added a retuned ruleset, colour suggestions, Beta tests, Create Issue, Export to Accessly, and release on Edge, Firefox and Safari."
    },
    {
     "type": "gallery",
     "heading": "v1, before the move",
     "items": [
      {
       "src": "assets/img/ext-v1-floating.webp",
       "alt": "v1: a floating tab on every site"
      },
      {
       "src": "assets/img/ext-v1-sidepanel.webp",
       "alt": "v1: the side panel and Test Website"
      },
      {
       "src": "assets/img/ext-v1-results.webp",
       "alt": "v1: results in accordions, over the page"
      }
     ],
     "caption": "A floating tab, the side panel, and results in accordions over the page.",
     "cols": 3
    },
    {
     "type": "beforeafter",
     "heading": "Bookmarklets: inside the panel → in the toolbar",
     "before": "assets/img/ext-v1-bookmarklets.webp",
     "after": "assets/img/ext-popup.webp",
     "beforeLabel": "v1 · inside the panel",
     "afterLabel": "v2 · toolbar popup",
     "caption": "Bookmarklets draw on the page, not on code, so they moved to the toolbar popup instead of needing DevTools open."
    },
    {
     "type": "image",
     "heading": "A hidden tab → a page outline",
     "body": "Structure became an outline of the page: landmarks as nested bands and headings as h1 to h6 chips, so a skipped level or content outside a landmark shows at a glance.",
     "src": "assets/img/ext-structure.webp",
     "caption": "Structure: landmarks and headings as an outline.",
     "size": "normal",
     "alt": "Structure: landmarks and headings as an outline."
    },
    {
     "type": "text",
     "kicker": "UI system",
     "heading": "The Accessly Design System, fitted into a DevTools tab",
     "body": "I built the extension on the Design System I’d made for Accessly: the same tokens, severity chips, tables and type scale. That’s what let results look the same in both products and made export feel like moving work, not converting it. DevTools can be docked narrow or short, so every screen was designed for a small width first."
    },
    {
     "type": "gallery",
     "heading": "Two tools for the Design System work, not the audit",
     "items": [
      {
       "src": "assets/img/ext-css-overview.webp",
       "alt": "CSS Overview: every colour the page uses, as swatches"
      },
      {
       "src": "assets/img/ext-css-unit-converter.webp",
       "alt": "CSS Unit Converter: px to rem"
      }
     ],
     "caption": "CSS Overview shows the page’s real style guide. The Unit Converter handles the px-to-rem mismatch between design and code.",
     "cols": 2
    },
    {
     "type": "list",
     "heading": "Reflection: what I’d keep, and what I’d change",
     "items": [
      "Change: test the container before the content. A day on real client sites in the side panel would have shown its problems before any results screen was drawn.",
      "Change: design the shared vocabulary with Accessly from the start, instead of renaming it in v2.",
      "Keep: put the tool where the work happens, and pay for every trade-off on purpose.",
      "Keep: name results by what they ask of the user. “Validate” works where “Manual” didn’t."
     ]
    },
    {
     "type": "text",
     "kicker": "Future scope",
     "heading": "Next: the fix, in the same tab as the issue",
     "body": "The extension finds issues on any page, logged in or not; Accessly manages them; and AI code fixes write the fix. The next step is to bring that fix back into the extension, so a developer sees a suggested correction in the same tab where they found the issue."
    }
   ],
   "headline": "From 2–3 hours to 2–3 seconds per page — an accessibility extension that tests any page, logged in or not, from inside DevTools"
  },
  {
   "id": "accessly-lens",
   "title": "Accessly Lens: fixed in the design file",
   "client": "BarrierBreak · Figma plugin",
   "category": "Figma plugin",
   "year": "",
   "role": "Solo product designer and builder",
   "duration": "15 days, concept to tested plugin",
   "team": "Just me, with AI-assisted development",
   "platform": "Figma (Plugin API, shadcn/ui on Radix)",
   "color": "#2DD4BF",
   "summary": "Every accessibility tool we shipped ran after the build. I designed Accessly Lens, a Figma plugin that audits a frame against WCAG 2.2, fixes most issues in one click using the file’s own colours, and hands developers every accessibility decision as native Dev Mode annotations.",
   "metric": {
    "value": "~70%",
    "label": "of issues now caught in the design file"
   },
   "lap": "15 WCAG 2.2 checks · 1-click fixes · 0 network calls",
   "cover": "assets/img/lens-shot.webp?v=2",
   "hero": "assets/img/lens-cover.webp",
   "sections": [
    {
     "type": "text",
     "kicker": "The moment",
     "heading": "I’d designed more than ten accessibility tools. Not one of them could see a design.",
     "body": "Every product I’d designed at work checked accessibility after something was built. Then we moved earlier, into code, with VS Code, Xcode, WordPress and Shopify plugins. But the low-contrast colour, the 20px close button and the icon with no name were all decided in Figma, weeks before any of those tools ran.\n\nBy the time we caught them, a developer was guessing what the designer meant, and the fix cost a round-trip. Design was the one stage where we had nothing."
    },
    {
     "type": "quote",
     "text": "If design comes first, accessibility should too.",
     "name": "The line I kept coming back to",
     "role": ""
    },
    {
     "type": "text",
     "kicker": "The problem",
     "heading": "Issues were born in design and paid for after launch",
     "body": "Most accessibility issues start as design choices: colours, type sizes, tap targets, labels, heading structure. Our toolset caught them in development or after launch, where every fix is more expensive.\n\nDesigners using Figma had plugins, but they either checked or documented, never both in one flow, and none fixed an issue using the team’s own Design System."
    },
    {
     "type": "image",
     "heading": "",
     "body": "",
     "src": "assets/img/lens-lifecycle.webp",
     "caption": "Where our tools existed. Development and after launch were covered; design wasn’t.",
     "size": "full",
     "alt": "Where our tools existed. Development and after launch were covered; design wasn’t."
    },
    {
     "type": "list",
     "heading": "What existing Figma plugins left out",
     "items": [
      "Stark: contrast, simulation, focus order and more, but it flags problems without teaching the fix, and it’s paywalled.",
      "axe for Designers: automatic scan and annotations, but limited checks and few in-place fixes.",
      "Include (eBay): guided annotation, but it documents rather than audits.",
      "Single-purpose plugins: one check each, so designers juggle many.",
      "Accessly Lens: audit, in-place fixes with your own tokens, annotations, screen-reader preview and vision simulation in one free, offline flow."
     ]
    },
    {
     "type": "list",
     "heading": "The project at a glance",
     "items": [
      "Product: Accessly Lens, a Figma plugin for WCAG 2.2 AA that runs fully offline, with no account and no network calls.",
      "Scope: a concept carried all the way to a shipped product. One plugin, 11 screens in two themes, not a redesign of an existing tool.",
      "Users: UI designers first (they know Figma deeply, not WCAG), then the developers who receive the annotations and the accessibility specialists who review.",
      "Constraints: must work offline for teams under NDA. Speak Figma’s language, not WCAG’s. Never mark a manual check as passing."
     ]
    },
    {
     "type": "text",
     "kicker": "Solution journey",
     "heading": "A sign-up screen, from “done” to actually done",
     "body": "A UI designer has just finished “Sign up — Mobile” and is about to hand it off. They know Figma inside out; they don’t know WCAG numbers. Here’s what the next few minutes look like."
    },
    {
     "type": "image",
     "heading": "Step 1 · “Is this ready to hand off?”",
     "body": "There’s one button, already named after their frame. No scope setting to learn: with a frame selected it audits the frame, with nothing selected it audits the page.",
     "src": "assets/img/lens-start.webp",
     "caption": "One button, already named after the frame.",
     "size": "panel",
     "alt": "One button, already named after the frame.",
     "notes": [
      {
       "x": 16,
       "y": 70.5,
       "side": "c",
       "text": "One button, already named after the selected frame. No scope setting to learn."
      },
      {
       "x": 18,
       "y": 9.8,
       "side": "r",
       "text": "Four tabs, one per job: Audit, Annotate, Screen reader, Vision."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 2 · “20 issues? Which ones matter?”",
     "body": "The summary answers first: 20 issues, 11 must fix. Chips filter by category, and each card names the problem the way a designer would, why it matters, and the fix right there.",
     "src": "assets/img/lens-results.webp",
     "caption": "Open cards, filtered by chips. Every fix lives in its card.",
     "size": "panel",
     "alt": "Open cards, filtered by chips. Every fix lives in its card.",
     "notes": [
      {
       "x": 37.5,
       "y": 20.1,
       "side": "r",
       "text": "The summary answers first: 20 issues, 11 must fix."
      },
      {
       "x": 83,
       "y": 26.5,
       "side": "r",
       "text": "Chips filter by category, with a count on each."
      },
      {
       "x": 84,
       "y": 50.8,
       "side": "t",
       "text": "The fix sits in the card, next to the problem."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 3 · “I don’t want a random hex. I want my colours.”",
     "body": "“Fix with your colours” lists the closest passing colours from the file’s own styles and variables, tags the best match, and Apply links the layer to it, so it stays part of the Design System.",
     "src": "assets/img/lens-contrast.webp",
     "caption": "Fix with your colours: 2.56:1 → 7.7:1 using the file’s own Secondary style.",
     "size": "panel",
     "alt": "Fix with your colours: 2.56:1 → 7.7:1 using the file’s own Secondary style.",
     "notes": [
      {
       "x": 49.2,
       "y": 45.6,
       "side": "r",
       "text": "The problem in numbers: 2.56:1, needs 4.5:1."
      },
      {
       "x": 54.8,
       "y": 64.5,
       "side": "l",
       "text": "The closest passing colour from the file’s own styles, tagged Best match."
      },
      {
       "x": 91.2,
       "y": 64.5,
       "side": "r",
       "text": "Apply links the layer to that style, so it stays part of the Design System."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 4 · “What will the developer need to know?”",
     "body": "The panel follows the selection and asks only what fits: name, tab order, a note. Save stores it as a native Dev Mode annotation, so the developer reads it in Figma instead of guessing.",
     "src": "assets/img/lens-annotate.webp",
     "caption": "Annotate: the panel asks only what fits the selected layer.",
     "size": "panel",
     "alt": "Annotate: the panel asks only what fits the selected layer.",
     "notes": [
      {
       "x": 63.5,
       "y": 28,
       "side": "r",
       "text": "Problems with the selected layer, before the developer ever sees it."
      },
      {
       "x": 32.2,
       "y": 66.5,
       "side": "r",
       "text": "Screen reader name, asked only because this is an icon-only button."
      },
      {
       "x": 79,
       "y": 80.3,
       "side": "l",
       "text": "Tab order, saved as a native Dev Mode annotation."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 5 · “What does this sound like?”",
     "body": "Screen reader plays the frame in reading order with a real voice, warns about what a blind user would miss, and highlights each stop on the canvas.",
     "src": "assets/img/lens-screenreader.webp",
     "caption": "Hearing the design: 15 stops, 3 things a blind user would miss.",
     "size": "panel",
     "alt": "Hearing the design: 15 stops, 3 things a blind user would miss.",
     "notes": [
      {
       "x": 51.2,
       "y": 21.5,
       "side": "r",
       "text": "Play reads the frame in order with a real voice."
      },
      {
       "x": 96,
       "y": 39.6,
       "side": "l",
       "text": "A warning for what a blind user would miss."
      },
      {
       "x": 33.6,
       "y": 42.2,
       "side": "r",
       "text": "The current stop is highlighted here and on the canvas."
      }
     ]
    },
    {
     "type": "image",
     "heading": "Step 6 · “Does this still read for everyone?”",
     "body": "Vision previews the frame with colour blindness, blur and low contrast, each with one line on who it affects. Add to canvas drops the preview next to the frame for review.",
     "src": "assets/img/lens-vision.webp",
     "caption": "Vision: deuteranopia, “about 1 in 12 men”.",
     "size": "panel",
     "alt": "Vision: deuteranopia, “about 1 in 12 men”.",
     "notes": [
      {
       "x": 42.7,
       "y": 31,
       "side": "r",
       "text": "Pick a simulation: colour blindness, blur or low contrast."
      },
      {
       "x": 8,
       "y": 38.9,
       "side": "b",
       "text": "One line on who it affects: about 1 in 12 men."
      },
      {
       "x": 18,
       "y": 83.2,
       "side": "t",
       "text": "Add to canvas drops the preview next to the frame for review."
      }
     ]
    },
    {
     "type": "decision",
     "title": "Decision 1 · Why I stopped organising the plugin around WCAG checks and organised it around the designer’s job",
     "lead": "My first version did everything, and users said it felt cluttered and needed too many clicks. It was complete, and it helped no one.",
     "before": "v1 mirrored a typical accessibility tool: 13 tabs, one per check, each with its own scope bar and Run button.",
     "options": "I prototyped grouped tabs, a side rail and a dashboard, and tested grouped tabs.",
     "tradeoff": "Grouping hid the clutter but not the cause: still 13 tools and 13 Run buttons, organised the way WCAG is written, not the way a designer works. The turning point was asking what the designer is trying to do: four jobs, not thirteen checks.",
     "action": "v4 has four tabs (Audit, Annotate, Screen reader, Vision), open issue cards, one-click category chips and one Run button.",
     "result": "Fewer choices and one click from summary to fix. Organising around the job did more for the plugin than any feature I added."
    },
    {
     "type": "image",
     "heading": "",
     "body": "",
     "src": "assets/img/lens-structure.webp",
     "caption": "13 tabs → 5 categories → 3 tabs → 4 tabs, and why each one gave way.",
     "size": "full",
     "alt": "13 tabs → 5 categories → 3 tabs → 4 tabs, and why each one gave way."
    },
    {
     "type": "decision",
     "title": "Decision 2 · How I moved every fix into the card where the problem is",
     "lead": "“Clicking Fix takes me somewhere else.” The fix existed. It just wasn’t where the problem was.",
     "before": "In v3, a fix button sent the designer to another tab, so they lost the issue they were looking at.",
     "options": "Keep fixes in one place and link to it more clearly, or bring every fix into the issue card.",
     "tradeoff": "A separate place is simpler to build and keeps cards short. But every jump breaks attention, and the confusion in testing came from exactly that jump. Longer cards were the cheaper cost.",
     "action": "Alt-text inputs, heading pickers, Resize hit area, Add a Focus variant, minimum font size, line height and copy rewrites all live in the card. After any fix the audit re-runs and the card disappears.",
     "result": "It removed the biggest source of confusion in testing, and the audit ends on a clear “Nothing to fix” moment."
    },
    {
     "type": "decision",
     "title": "Decision 3 · Why contrast fixes use the file’s own colours instead of the nearest passing hex",
     "lead": "Every contrast tool I looked at could tell you a colour fails. None could fix it without breaking your Design System.",
     "before": "The usual fix is a new hex value. Pasted onto a layer, it detaches it from the file’s styles, so the next token update silently skips it.",
     "options": "Suggest the nearest passing hex, or search the file’s own styles and variables for the closest one that passes.",
     "tradeoff": "The nearest hex always passes. The file’s own colours might not, or might be further from the original. But a fix that detaches layers creates a new problem for every one it solves.",
     "action": "Contrast is measured against what’s actually painted behind the layer. Passing styles and variables are listed with ratios, and Apply binds the layer to one. A custom hex is the last option, not the first.",
     "result": "Fixes stay inside the team’s Design System, which none of the plugins I reviewed did."
    },
    {
     "type": "decision",
     "title": "Decision 4 · Why I made the plugin admit what it can’t check",
     "lead": "“Did it detect this automatically?” Designers couldn’t tell what the plugin had checked and what it had guessed.",
     "before": "Automatic detections and manual inputs looked the same, and some checks can’t be automated, like whether alt text is meaningful.",
     "options": "Show only automatic results and keep the report clean, or surface manual checks explicitly.",
     "tradeoff": "Hiding manual checks makes the score look better. But a design that silently “passes” something nobody checked is worse than one that admits it.",
     "action": "Manual items appear as “Check manually” beside Must fix and Should fix. The element type shows what Auto found, so designers can overrule it. Developer vocabulary went: Inspect became Annotate, Simulate became Vision.",
     "result": "Nothing is falsely marked as passing, and designers trust the green because they can see where it came from."
    },
    {
     "type": "metrics",
     "heading": "What changed once audits moved into the design file",
     "items": [
      {
       "value": "~70%",
       "label": "of issues we used to report after development, now caught in design (team estimate)"
      },
      {
       "value": "15",
       "label": "WCAG 2.2 checks in one audit, in about 120 ms"
      },
      {
       "value": "1 click",
       "label": "to fix most issues, inside the card"
      },
      {
       "value": "15 days",
       "label": "concept to tested plugin, solo with AI-assisted development"
      }
     ]
    },
    {
     "type": "text",
     "kicker": "Iteration archive",
     "heading": "Four versions, and the reason each one died",
     "body": "The structure came before any of the polish: four builds, each held long enough to watch a designer work with it, each dropped for a reason rather than a preference. This is the order those reasons arrived in."
    },
    {
     "type": "image",
     "src": "assets/img/lens-structure.webp",
     "size": "full",
     "alt": "The structure from v1 to v4 as four cards: 13 tabs, 5 categories, 3 tabs, and the final 4 tabs with open issue cards and fixes inside each card.",
     "caption": "13 tabs → 5 categories → 3 tabs → 4 tabs, and why each one gave way."
    },
    {
     "type": "list",
     "heading": "What each version cost the designer",
     "items": [
      "v1 · 13 tabs: one tab, one scope bar and one Run button per check. Thrown away: complete, but cluttered and too many clicks.",
      "v2 · 5 categories: grouped tabs, chosen over a side rail and a dashboard. Thrown away: still 13 tools and 13 Run buttons underneath.",
      "v3 · 3 tabs (Check, Inspect, Simulate): organised around jobs, one Check button. Thrown away: issues three clicks deep in nested accordions, and fixes sent you to another tab.",
      "v4 · 4 tabs (Audit, Annotate, Screen reader, Vision): flat open cards, fixes in the card. Kept."
     ]
    },
    {
     "type": "text",
     "kicker": "Iteration · swatches",
     "heading": "A swatch inside the button → a row you can read",
     "body": "Every fix button started with its colour swatch drawn inside the button itself. Testing turned up the one line I kept coming back to: “I can’t see the swatch in the button.” The chip was competing with its own label for the same few pixels.\n\nRather than restyle the chip, I moved it out of the target. Each fix is now a neutral one-line row, and every swatch has a light inner ring and a dark outer ring so the colour stays visible against either background."
    },
    {
     "type": "text",
     "kicker": "AI in the process",
     "heading": "What AI built, and what I decided",
     "body": "AI-assisted development is how one designer got from idea to a tested, working plugin in 15 days: it wrote the plugin code against the Figma Plugin API. It didn’t decide what the plugin should be.\n\nThe structure (13 tabs to 4), the wording on every card, where each fix lives, using the file’s own colours, and showing what can’t be checked automatically all came from reviewing each version as a designer would use it. AI made each iteration cheap to build, which is why there were four of them."
    },
    {
     "type": "text",
     "kicker": "UI system",
     "heading": "A panel that feels like Figma and passes its own audit",
     "body": "The UI is built on shadcn/ui and Radix primitives, with a Theme variable collection in Figma holding Light and Dark modes, so all 11 screens exist in both themes from the same tokens.\n\nThe panel borrows Figma’s own type scale rather than inventing one, so it sits beside the canvas without a visual jump. Nothing is smaller than 12px, and every issue card runs at a 150% line height so a long list stays readable. Spacing is one scale across cards, rows and controls: the 24px minimum target and the padding around each input are steps on that same scale, which is why four different tabs read as one panel.\n\nIt also borrows Figma’s own patterns (tab bar, segmented chips, a panel that follows the selection), so designers already know how to use it."
    },
    {
     "type": "list",
     "heading": "The rules behind it",
     "items": [
      "Every target at least 24px, and one large primary action per screen (Fitts’s law).",
      "Severity as shape, word and colour together, so must-fix issues stand out by shape as well as colour (von Restorff).",
      "Summary first; the why and the WCAG reference sit in each card, and exports live in a menu (progressive disclosure).",
      "Problems named the way designers think: “Text is hard to read”, not “1.4.3” (recognition over recall).",
      "An audit returns in about 120 ms and re-runs after every fix, so it never feels like a separate step (Doherty threshold)."
     ]
    },
    {
     "type": "gallery",
     "heading": "Both themes, one set of tokens",
     "items": [
      {
       "src": "assets/img/lens-dark-results.webp",
       "alt": "Audit results in dark mode"
      },
      {
       "src": "assets/img/lens-dark-screenreader.webp",
       "alt": "Screen reader in dark mode"
      },
      {
       "src": "assets/img/lens-guide.webp",
       "alt": "Guide overlay: how Accessly Lens works"
      },
      {
       "src": "assets/img/lens-settings.webp",
       "alt": "Settings: runs entirely on your computer"
      }
     ],
     "caption": "Dark mode, the Guide, and Settings. Built on shadcn/ui and Radix, with every target at least 24px and no text under 12px.",
     "cols": 4
    },
    {
     "type": "text",
     "kicker": "Reflection",
     "heading": "What I’d do differently, and what I’d keep",
     "body": "The version I’m least happy about is the one that did the most: 13 tabs, every check reachable, and testers still calling it cluttered. I had confused covering the standard with helping the person using it, and watching someone click through it was the only thing that showed me.\n\nIf I started again I’d change the order: settle what the designer is actually trying to do before writing a single check, because four tabs came from that question and no feature I added later came close.\n\nWhat I’d keep is the habit of putting every claim on screen where it can be tested. The audit states what it can’t check, the contrast fix uses the file’s own colours instead of a convenient hex, and the screen reader shows the real reading order rather than promising it works. AI got me to a tested plugin in 15 days, but none of those calls came from the model."
    },
    {
     "type": "list",
     "heading": "What I learned",
     "items": [
      "Complete isn’t the same as usable. The 13-tab version did everything and helped no one; organising around the designer’s job did more than any feature.",
      "Keep the user where the problem is. Moving every fix into its card removed the biggest source of confusion.",
      "AI speeds up building, not judgement. It got me to a tested plugin in 15 days, but every iteration still came from looking at it the way a designer would use it."
     ]
    },
    {
     "type": "text",
     "kicker": "Future scope",
     "heading": "Next: every variant, every mode, every platform",
     "body": "Each next step comes from a gap the current version leaves. Designers work in component variants and colour modes, so the audit should check every variant and mode at once, not one frame at a time.\n\nMobile designers need to see iOS Dynamic Type and Android text scaling, not just a minimum font size. And developers building native apps should get SwiftUI and Jetpack Compose snippets alongside HTML."
    },
    {
     "type": "link",
     "heading": "Try the journey yourself",
     "body": "The real plugin code running against a sample Figma file: run an audit, apply a fix, play the screen reader, or switch to dark mode. Best on a wide screen.",
     "url": "https://www.figma.com/proto/jFU8GnV1TyqGUaZCWz5hph/Accessly-Lens?node-id=1-18&viewport=145%2C301%2C0.51&t=hBJND2oeNij9vXtI-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
     "label": "Open the Figma prototype"
    }
   ],
   "headline": "Catching WCAG issues while the screen is still a design — Accessly Lens for Figma"
  }
 ]
};
