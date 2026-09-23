/* ==========================================================================
   admin.js — login gate + schema-driven content portal

   Two editors, both built from declarative schemas:
     - Case studies: one draft object per study (CRUD, reorder, duplicate)
     - Site: one draft object for the whole site content
   Settings handles export / import / reset / password.
   All persistence goes through Portfolio.Store (localStorage).
   ========================================================================== */
(function () {
  "use strict";

  // Null-safe captures: if seed.js / store.js / ui.js ever fail to load, these
  // must NOT throw at the top of the IIFE — a throw here would abort the whole
  // file and leave the login form with no submit handler (clicking "Sign in"
  // then does a native page reload that looks like "nothing happened").
  var Store = window.Portfolio && window.Portfolio.Store;
  var esc = (window.Portfolio && window.Portfolio.UI && window.Portfolio.UI.esc) ||
            function (s) { return s == null ? "" : String(s); };

  function $(id) { return document.getElementById(id); }
  function showErr(msg) {
    var el = $("login-err");
    if (el) { el.textContent = msg; el.hidden = false; }
  }
  function store() { return window.Portfolio && window.Portfolio.Store; }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  /* ======================================================================
     1. Schema helpers
     ====================================================================== */

  var LISTS = {}; // path → { item: [fields], empty: {...} }

  function F(t, k, l, o) { return { t: t, k: k, l: l || k, o: o }; }
  function SEC(title) { return { sec: title }; }
  /** Repeatable list field; registers its item schema for add/remove. */
  function L(k, l, item, empty) {
    LISTS[k] = { item: item, empty: empty || {} };
    return { t: "list", k: k, l: l };
  }
  /** List field scoped to one block card — its schema rides on the descriptor
      and is registered under the card's full path at render time. */
  function Lb(k, l, item, empty) {
    return { t: "list", k: k, l: l, reg: { item: item, empty: empty || {} } };
  }

  function get(o, path) {
    return path.split(".").reduce(function (x, k) { return x == null ? x : x[k]; }, o);
  }
  function set(o, path, v) {
    var ks = path.split(".");
    var last = ks.pop();
    var target = ks.reduce(function (x, k) {
      if (x[k] == null) x[k] = {};
      return x[k];
    }, o);
    target[last] = v;
  }

  /* ======================================================================
     2. Schemas
     ====================================================================== */

  var STUDY_SCHEMA = [
    SEC("Card & hero"),
    F("text", "slug", "URL slug (case-study.html?slug=…)"),
    F("text", "title", "Full title"),
    F("text", "shortTitle", "Short title (used for “Next: …”)"),
    F("text", "metaTitle", "Browser tab title"),
    F("text", "category", "Card category chip"),
    F("text", "heroChip", "Hero chip (hero, longer)"),
    F("text", "date", "Date line"),
    F("text", "cardLine", "Card byline (role, company)"),
    F("textarea", "blurb", "Card blurb"),
    F("textarea", "summary", "Summary (hero paragraph + meta description)"),

    SEC("Page sections — any type, any order"),
    { t: "blocks", k: "blocks", l: "Sections" },

    SEC("Footer question"),
    F("text", "footer.question", "Question"),
    F("text", "footer.tail", "Tail (after the email link)")
  ];

  /* ---- block types (case-study section builder) ----------------------------
     Each type: label (picker text), fields (rendered inside its card), and
     empty (the object pushed on add/insert). Lists use Lb so their item
     schema travels with the descriptor. */
  var BLOCKS = {
    text: {
      label: "Text",
      fields: [
        F("text", "label", "Section label (empty for none)"),
        F("text", "heading", "Heading (optional)"),
        F("textarea", "body", "Body"),
        F("select", "flush", "Top spacing",
          [["", "Standard (padded)"], ["1", "Flush (sits under the section above)"]])
      ],
      empty: { type: "text", label: "", heading: "", body: "", flush: "" }
    },
    image: {
      label: "Image",
      fields: [
        F("text", "src", "Image URL (https://… or assets/img/…)"),
        F("text", "alt", "Alt text"),
        F("textarea", "caption", "Caption (optional)"),
        F("select", "width", "Width",
          [["normal", "Normal (page width)"], ["inset", "Inset (text column)"], ["full", "Full-bleed"]])
      ],
      empty: { type: "image", src: "", alt: "", caption: "", width: "normal" }
    },
    video: {
      label: "Video",
      fields: [
        F("text", "url", "Link — YouTube, Vimeo or direct .mp4 / .webm"),
        F("text", "title", "Label above (optional)"),
        F("textarea", "caption", "Caption (optional)")
      ],
      empty: { type: "video", url: "", title: "", caption: "" }
    },
    figma: {
      label: "Figma embed",
      fields: [
        F("text", "url", "Figma file / design / proto link"),
        F("text", "title", "Label above (optional)"),
        F("textarea", "caption", "Caption (optional)")
      ],
      empty: { type: "figma", url: "", title: "", caption: "" }
    },
    quote: {
      label: "Pull quote",
      fields: [
        F("textarea", "text", "Quote"),
        F("text", "attribution", "Attribution (optional)")
      ],
      empty: { type: "quote", text: "", attribution: "" }
    },
    list: {
      label: "Bulleted list",
      fields: [
        F("text", "heading", "Heading (optional)"),
        Lb("items", "Items", [F("textarea", "text", "Item")], { text: "" })
      ],
      empty: { type: "list", heading: "", items: [{ text: "" }] }
    },
    meta: {
      label: "Meta strip",
      fields: [
        Lb("items", "Items",
          [F("text", "label", "Label"), F("text", "value", "Value")],
          { label: "", value: "" })
      ],
      empty: { type: "meta", items: [{ label: "", value: "" }, { label: "", value: "" }] }
    },
    outcomes: {
      label: "Metrics",
      fields: [
        F("text", "heading", "Heading"),
        Lb("items", "Metrics",
          [F("text", "value", "Value (e.g. 35–40%)"), F("text", "label", "Label")],
          { value: "", label: "" }),
        F("text", "note", "Italic note (optional)")
      ],
      empty: { type: "outcomes", heading: "Where this landed", items: [{ value: "", label: "" }], note: "" }
    },
    panels: {
      label: "Figure panels (SVG / HTML)",
      fields: [
        F("text", "label", "Section label"),
        F("text", "heading", "Heading"),
        F("textarea", "intro", "Intro"),
        Lb("panels", "Panels",
          [
            F("textarea", "caption", "Caption"),
            F("textarea", "alt", "Alt text"),
            F("mono", "content", "SVG / HTML")
          ],
          {
            caption: "", alt: "",
            content: '<svg viewBox="0 0 280 340" width="100%" role="img" aria-label="" style="display:block;background:#0a0a0a;border:1px solid rgba(255,255,255,0.15);">' +
              '<text x="20" y="34" font-family="IBM Plex Mono, monospace" font-size="12" fill="#9a9993">New panel</text>' +
              "</svg>"
          })
      ],
      empty: { type: "panels", label: "", heading: "", intro: "", panels: [] }
    },
    decisions: {
      label: "Decision stories",
      fields: [
        F("text", "label", "Section label"),
        F("text", "heading", "Heading"),
        Lb("stories", "Stories",
          [
            F("text", "title", "Title"),
            F("textarea", "lead", "Lead (italic)"),
            F("textarea", "before", "Before"),
            F("textarea", "tradeoff", "The trade-off"),
            F("textarea", "action", "What I did"),
            F("textarea", "result", "What happened")
          ],
          { title: "", lead: "", before: "", tradeoff: "", action: "", result: "" })
      ],
      empty: { type: "decisions", label: "", heading: "", stories: [] }
    },
    html: {
      label: "Raw HTML",
      fields: [F("mono", "html", "HTML (rendered as-is)")],
      empty: { type: "html", html: "" }
    }
  };

  function blockEmpty(type) {
    var spec = BLOCKS[type] || BLOCKS.text;
    return clone(spec.empty);
  }

  function pickerType(mount) {
    var sel = mount.querySelector("[data-newblock-type]");
    return (sel && sel.value) || "text";
  }

  var SITE_SCHEMA = [
    SEC("Meta"),
    F("text", "meta.title", "Page title"),
    F("textarea", "meta.description", "Meta description"),

    SEC("Navigation"),
    F("text", "nav.brand", "Brand / name"),
    L("nav.items", "Menu items",
      [F("text", "id", "id (marks active)"), F("text", "label", "Label"), F("text", "href", "Href")],
      { id: "", label: "", href: "#" }),

    SEC("Hero"),
    F("text", "hero.eyebrow", "Eyebrow"),
    F("text", "hero.title", "Headline"),
    F("textarea", "hero.subtitle", "Subtitle"),
    F("text", "hero.primary.label", "Primary button label"),
    F("text", "hero.primary.href", "Primary button href"),
    F("text", "hero.secondary.label", "Secondary button label"),
    F("text", "hero.secondary.href", "Secondary button href"),
    F("text", "hero.decoSrc", "Decorative grid image"),
    F("text", "hero.parallaxSpeed", "Deco parallax speed (0.05)"),

    SEC("Stats strip"),
    L("stats", "Stats",
      [F("text", "value", "Value"), F("text", "label", "Label")],
      { value: "", label: "" }),

    SEC("About"),
    F("text", "about.heading", "Heading"),
    F("lines", "about.paragraphs", "Paragraphs (one per line)"),
    F("text", "about.image.src", "Portrait src"),
    F("text", "about.image.alt", "Portrait alt"),
    F("text", "about.parallaxSpeed", "Parallax speed (0.04)"),
    L("about.details", "Detail items",
      [F("text", "label", "Label"), F("text", "value", "Value")],
      { label: "", value: "" }),

    SEC("Selected work (home)"),
    F("text", "work.heading", "Heading"),
    F("textarea", "work.intro", "Intro"),
    F("text", "work.cta.label", "CTA label"),
    F("text", "work.cta.href", "CTA href"),
    F("text", "work.limit", "How many cards on home"),

    SEC("Work page"),
    F("text", "workPage.heading", "Heading"),
    F("textarea", "workPage.intro", "Intro"),

    SEC("Skills"),
    F("text", "skills.heading", "Heading"),
    L("skills.groups", "Groups",
      [F("text", "title", "Group title"), F("lines", "items", "Items (one per line)")],
      { title: "", items: [] }),

    SEC("Experience"),
    F("text", "experience.heading", "Heading"),
    L("experience.items", "Roles",
      [
        F("text", "period", "Period"),
        F("text", "role", "Role"),
        F("text", "org", "Org / location")
      ],
      { period: "", role: "", org: "" }),

    SEC("Education"),
    F("text", "education.heading", "Heading"),
    L("education.items", "Entries",
      [
        F("text", "line1", "Line 1 (qualification)"),
        F("text", "line2", "Line 2 (institution)"),
        F("text", "line3", "Line 3 (dates)")
      ],
      { line1: "", line2: "", line3: "" }),

    SEC("Certifications & recognition"),
    F("text", "certifications.heading", "Heading"),
    L("certifications.items", "Entries",
      [
        F("text", "line1", "Line 1"),
        F("text", "line2", "Line 2"),
        F("text", "line3", "Line 3")
      ],
      { line1: "", line2: "", line3: "" }),

    SEC("Hobby / cars"),
    F("text", "hobby.label", "Label"),
    F("text", "hobby.heading", "Heading"),
    F("textarea", "hobby.body", "Body"),
    F("text", "hobby.image.src", "Image src"),
    F("text", "hobby.image.alt", "Image alt"),
    F("text", "hobby.parallaxSpeed", "Parallax speed (0.04)"),

    SEC("Contact / footer"),
    F("text", "contact.heading", "Heading"),
    F("textarea", "contact.text", "Text"),
    F("text", "contact.email", "Email"),
    F("text", "contact.linkedin", "LinkedIn URL"),
    F("text", "contact.resume", "Résumé URL"),
    F("text", "footer.note", "Bottom note"),
    F("text", "footer.workCta", "Work-page footer CTA"),
    F("text", "footer.topLabel", "Back-to-top label")
  ];

  /* ======================================================================
     3. Form renderer
     ====================================================================== */

  function fieldHTML(f, basePath, root) {
    var path = basePath ? basePath + "." + f.k : f.k;
    var v = get(root, path);
    if (v == null) v = "";
    var lab = esc(f.l);

    if (f.t === "textarea" || f.t === "mono" || f.t === "lines") {
      var text = f.t === "lines"
        ? (Array.isArray(v) ? v.join("\n") : String(v))
        : String(v);
      var rows = f.t === "mono" ? 9 : f.t === "lines" ? 5 : 3;
      return '<label class="adm-f"><span>' + lab + "</span>" +
        '<textarea data-path="' + path + '" data-kind="' + f.t + '" rows="' + rows + '"' +
        (f.t === "mono" ? ' class="adm-mono"' : "") +
        ">" + esc(text) + "</textarea></label>";
    }
    if (f.t === "select") {
      var opts = (f.o || []).map(function (op) {
        var on = String(v) === String(op[0]) ? " selected" : "";
        return '<option value="' + esc(String(op[0])) + '"' + on + ">" + esc(op[1]) + "</option>";
      }).join("");
      return '<label class="adm-f"><span>' + lab + "</span>" +
        '<select class="adm-sel" data-path="' + path + '">' + opts + "</select></label>";
    }
    return '<label class="adm-f"><span>' + lab + "</span>" +
      '<input type="text" data-path="' + path + '" value="' + esc(String(v)) + '"></label>';
  }

  function listHTML(f, basePath, root) {
    var path = basePath ? basePath + "." + f.k : f.k;
    var arr = get(root, path) || [];
    var reg = LISTS[path];
    if (!reg) return "";
    var html = '<div class="adm-block">' +
      '<div class="adm-block-head"><span>' + esc(f.l) + " · " + arr.length + "</span>" +
      '<button type="button" class="adm-mini" data-add="' + path + '">+ Add</button></div>';

    arr.forEach(function (item, i) {
      var last = i === arr.length - 1;
      html += '<div class="adm-item">' +
        '<div class="adm-item__head"><span>' + esc(f.l) + " " + (i + 1) + "</span>" +
          '<span class="adm-item__acts">' +
            '<button type="button" class="adm-mini" data-move="' + path + "|" + i + '|-1"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
            '<button type="button" class="adm-mini" data-move="' + path + "|" + i + '|1"' + (last ? " disabled" : "") + ">↓</button>" +
            '<button type="button" class="adm-mini adm-mini--danger" data-del="' + path + "|" + i + '">Remove</button>' +
          "</span>" +
        "</div>" +
        reg.item.map(function (fd) { return fieldHTML(fd, path + "." + i, root); }).join("") +
      "</div>";
    });

    return html + "</div>";
  }

  function renderForm(schema, root, mount) {
    mount.innerHTML = schema.map(function (f) {
      if (f.sec) return '<h3 class="adm-sec">' + esc(f.sec) + "</h3>";
      if (f.t === "blocks") return blocksHTML(f, root);
      if (f.t === "list") return listHTML(f, "", root);
      return fieldHTML(f, "", root);
    }).join("");
  }

  /** The section builder: ordered cards with a type select, ↑/↓ reorder,
      insert-after and remove. Nested lists register their schema under
      `blocks.<i>.<key>` at render time so the generic add/del/move handlers
      work unchanged. */
  function blocksHTML(f, root) {
    var arr = get(root, f.k) || [];
    var typeOpts = Object.keys(BLOCKS).map(function (t) {
      return '<option value="' + t + '">' + esc(BLOCKS[t].label) + "</option>";
    }).join("");
    var html = '<div class="adm-block">' +
      '<div class="adm-block-head"><span>' + esc(f.l) + " · " + arr.length + "</span>" +
        '<span class="adm-blocks__add">' +
          '<select class="adm-sel" data-newblock-type>' + typeOpts + "</select>" +
          '<button type="button" class="adm-mini" data-addblock="' + f.k + '">+ Add section</button>' +
        "</span>" +
      "</div>" +
      '<p class="adm-hint">Adds at the bottom — ↑ / ↓ moves a section anywhere; “+ here” on a card inserts right after it using the picker type.</p>';

    arr.forEach(function (b, i) {
      var base = f.k + "." + i;
      var last = i === arr.length - 1;
      var spec = BLOCKS[b.type];
      var head = '<div class="adm-item__head">' +
          '<span class="adm-blk__num">' + (i + 1) + "</span>" +
          '<select class="adm-blk__type" data-path="' + base + '.type" data-rerender="1">' +
            Object.keys(BLOCKS).map(function (t) {
              return '<option value="' + t + '"' + (t === b.type ? " selected" : "") + ">" +
                esc(BLOCKS[t].label) + "</option>";
            }).join("") +
          "</select>" +
          '<span class="adm-item__acts">' +
            '<button type="button" class="adm-mini" data-move="' + f.k + "|" + i + '|-1"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
            '<button type="button" class="adm-mini" data-move="' + f.k + "|" + i + '|1"' + (last ? " disabled" : "") + ">↓</button>" +
            '<button type="button" class="adm-mini" data-blockins="' + f.k + "|" + i + '">+ here</button>' +
            '<button type="button" class="adm-mini adm-mini--danger" data-del="' + f.k + "|" + i + '">Remove</button>' +
          "</span>" +
        "</div>";

      if (!spec) {
        html += '<div class="adm-item">' + head +
          '<p class="adm-hint">Unknown section type “' + esc(b.type || "?") + '” — pick a type above.</p></div>';
        return;
      }

      spec.fields.forEach(function (fd) {
        if (fd.t === "list") LISTS[base + "." + fd.k] = fd.reg;
      });
      var body = spec.fields.map(function (fd) {
        return fd.t === "list" ? listHTML(fd, base, root) : fieldHTML(fd, base, root);
      }).join("");
      html += '<div class="adm-item adm-item--block">' + head + body + "</div>";
    });

    if (!arr.length) {
      html += '<p class="adm-hint">No sections yet — pick a type above and press “+ Add section”. The hero and the footer question are always on.</p>';
    }
    return html + "</div>";
  }

  /** One delegated handler per editor mount: live input binding + list
      add/remove/reorder + action-bar buttons (save/cancel/revert). */
  function bindForm(mount, getDraft, rerender, actions) {
    mount.addEventListener("input", function (e) {
      var el = e.target;
      if (!el.dataset || !el.dataset.path) return;
      var v = el.value;
      if (el.dataset.kind === "lines") v = v.split("\n");
      set(getDraft(), el.dataset.path, v);
      if (el.dataset.rerender) rerender(); // e.g. a block-type switch reshapes the card
    });

    mount.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      if (btn.id) return actions(btn.id); // save / cancel / revert
      var d = getDraft();

      if (btn.dataset.add) {
        var reg = LISTS[btn.dataset.add];
        var arr = get(d, btn.dataset.add) || [];
        arr.push(clone(reg.empty));
        set(d, btn.dataset.add, arr);
        rerender();
        return;
      }
      if (btn.dataset.addblock) {
        var bl = get(d, btn.dataset.addblock) || [];
        bl.push(blockEmpty(pickerType(mount)));
        set(d, btn.dataset.addblock, bl);
        rerender();
        return;
      }
      if (btn.dataset.blockins) {
        var bp = btn.dataset.blockins.split("|");
        var barr = get(d, bp[0]) || [];
        barr.splice(Number(bp[1]) + 1, 0, blockEmpty(pickerType(mount)));
        set(d, bp[0], barr);
        rerender();
        return;
      }
      if (btn.dataset.del) {
        var p = btn.dataset.del.split("|");
        var a = get(d, p[0]) || [];
        a.splice(Number(p[1]), 1);
        set(d, p[0], a);
        rerender();
        return;
      }
      if (btn.dataset.move) {
        var m = btn.dataset.move.split("|");
        var arr2 = get(d, m[0]) || [];
        var from = Number(m[1]);
        var to = from + Number(m[2]);
        if (to < 0 || to >= arr2.length) return;
        var tmp = arr2[from];
        arr2[from] = arr2[to];
        arr2[to] = tmp;
        set(d, m[0], arr2);
        rerender();
      }
    });
  }

  /* ======================================================================
     4. Toast
     ====================================================================== */

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  /* ======================================================================
     5. Login gate
     ====================================================================== */

  function showApp() {
    $("login-view").hidden = true;
    $("app-view").hidden = false;
    initStudiesTab();
    initSiteTab();
    initSettingsTab();
  }

  // preflight: surface broken environments up front instead of letting every
  // attempt fail silently as a generic error
  function portalReady() {
    return !!(window.Portfolio && window.Portfolio.Store &&
              typeof window.Portfolio.Store.login === "function");
  }

  if (!(window.crypto && window.crypto.subtle)) {
    showErr(
      "Password checks are blocked here. Open this page at " +
      "http://localhost:8077/admin.html (running serve.py), not as a file:// " +
      "or a plain-IP address.");
  } else if (!portalReady()) {
    showErr(
      "Portal scripts didn't load properly — hard-refresh this tab " +
      "(Cmd+Shift+R) or open a new tab at http://localhost:8077/admin.html.");
  }

  // Belt-and-suspenders: mark the form so the inline fallback in admin.html
  // knows a real handler is attached and should stand down.
  var loginForm = $("login-form");
  if (loginForm) loginForm.setAttribute("data-live", "1");
  window.__admShowApp = showApp;

  // The whole body is wrapped so that NO exception can ever leave the user
  // staring at an unchanged login screen — a message always gets painted.
  if (loginForm) loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("login-err");
    if (err) err.hidden = true;
    try {
      if (!portalReady()) {
        showErr("Portal scripts didn't load — hard-refresh this tab (Cmd+Shift+R) " +
                "or open a new tab.");
        return;
      }
      if (!(window.crypto && window.crypto.subtle)) {
        showErr("Password checks are blocked here — use https:// or http://localhost.");
        return;
      }
      store().login($("login-pw").value).then(function (ok) {
        if (ok) showApp();
        else showErr("Wrong password.");
      }).catch(function (err) {
        showErr((err && err.message) || "Login failed — see the browser console.");
      });
    } catch (err2) {
      showErr("Login error: " + (err2 && err2.message));
    }
  });

  $("logout-btn").addEventListener("click", function () {
    Store.logout();
    location.reload();
  });

  /* ---- tabs --------------------------------------------------------------- */
  $("tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".adm-tab");
    if (!btn) return;
    document.querySelectorAll(".adm-tab").forEach(function (b) { b.classList.toggle("is-on", b === btn); });
    ["studies", "site", "settings"].forEach(function (id) {
      $("pane-" + id).hidden = id !== btn.dataset.tab;
    });
    if (btn.dataset.tab === "settings") refreshExport();
  });

  /* ======================================================================
     6. Case studies tab
     ====================================================================== */

  var draft = null;       // study being edited
  var draftOrig = null;   // original slug (null when new)

  function initStudiesTab() {
    renderStudyList();

    bindForm(
      $("study-editor"),
      function () { return draft; },
      function () { if (draft) renderStudyEditor(); },
      function (id) {
        if (id === "study-save") saveStudy();
        else if (id === "study-cancel") closeEditor();
      }
    );

    $("add-study").addEventListener("click", function () {
      draft = Store.blank();
      draft.title = "Untitled case study";
      draft.shortTitle = draft.title;
      draftOrig = null;
      renderStudyEditor();
    });
  }

  function renderStudyList() {
    var list = Store.list();
    $("study-list").innerHTML = list.length
      ? list.map(function (cs, i) {
          return '<div class="adm-study-row">' +
            '<span class="adm-study-row__num">' + String(i + 1).padStart(2, "0") + "</span>" +
            '<div class="adm-study-row__main">' +
              '<div class="adm-study-row__title">' + esc(cs.title) + "</div>" +
              '<div class="adm-study-row__slug">?slug=' + esc(cs.slug) + " · " + esc(cs.category) + "</div>" +
            "</div>" +
            '<div class="adm-study-row__acts">' +
              '<button type="button" class="adm-mini" data-act="edit" data-slug="' + esc(cs.slug) + '">Edit</button>' +
              '<button type="button" class="adm-mini" data-act="up" data-slug="' + esc(cs.slug) + '"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
              '<button type="button" class="adm-mini" data-act="down" data-slug="' + esc(cs.slug) + '"' + (i === list.length - 1 ? " disabled" : "") + ">↓</button>" +
              '<button type="button" class="adm-mini" data-act="dup" data-slug="' + esc(cs.slug) + '">Duplicate</button>' +
              '<button type="button" class="adm-mini adm-mini--danger" data-act="del" data-slug="' + esc(cs.slug) + '">Delete</button>' +
            "</div>" +
          "</div>";
        }).join("")
      : '<div class="adm-study-row"><div class="adm-study-row__main">' +
        '<div class="adm-study-row__title">No case studies yet.</div>' +
        '<div class="adm-study-row__slug">Use “+ New case study” to create the first one.</div>' +
        "</div></div>";
  }

  $("study-list").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-act]");
    if (!btn) return;
    var slug = btn.dataset.slug;

    if (btn.dataset.act === "edit") {
      draft = clone(Store.get(slug));
      draftOrig = slug;
      renderStudyEditor();
    } else if (btn.dataset.act === "up") {
      Store.move(slug, -1); renderStudyList();
    } else if (btn.dataset.act === "down") {
      Store.move(slug, 1); renderStudyList();
    } else if (btn.dataset.act === "dup") {
      Store.duplicate(slug); renderStudyList(); toast("Duplicated");
    } else if (btn.dataset.act === "del") {
      if (confirm("Delete “" + Store.get(slug).title + "”?\n\nThis can't be undone (export a backup first if unsure).")) {
        if (draftOrig === slug) closeEditor();
        Store.remove(slug);
        renderStudyList();
        toast("Deleted");
      }
    }
  });

  function renderStudyEditor() {
    var ed = $("study-editor");
    ed.hidden = false;
    renderForm(STUDY_SCHEMA, draft, ed);
    ed.insertAdjacentHTML("beforeend",
      '<div class="adm-actions">' +
        '<button type="button" class="btn btn--solid btn--sm" id="study-save">Save case study</button>' +
        '<button type="button" class="btn btn--outline btn--sm" id="study-cancel">Close without saving</button>' +
      "</div>");
    ed.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function closeEditor() {
    $("study-editor").hidden = true;
    $("study-editor").innerHTML = "";
    draft = null;
    draftOrig = null;
  }

  function saveStudy() {
    draft.title = (draft.title || "").trim() || "Untitled case study";
    if (!draft.shortTitle) draft.shortTitle = draft.title;
    draft.slug = Store.uniqueSlug(draft.slug || draft.title, draftOrig);
    Store.save(draft);
    draftOrig = draft.slug;
    renderStudyList();
    renderStudyEditor();
    toast("Saved — live on the site");
  }

  /* ======================================================================
     7. Site tab
     ====================================================================== */

  var siteDraft = null;

  function initSiteTab() {
    siteDraft = clone(Store.getSite());

    bindForm(
      $("site-editor"),
      function () { return siteDraft; },
      renderSiteForm,
      function (id) {
        if (id === "site-save") {
          Store.saveSite(siteDraft);
          toast("Site content saved");
        } else if (id === "site-revert") {
          siteDraft = clone(Store.getSite());
          renderSiteForm();
          toast("Reverted");
        }
      }
    );

    renderSiteForm();
  }

  function renderSiteForm() {
    var ed = $("site-editor");
    renderForm(SITE_SCHEMA, siteDraft, ed);
    ed.insertAdjacentHTML("beforeend",
      '<div class="adm-actions">' +
        '<button type="button" class="btn btn--solid btn--sm" id="site-save">Save site content</button>' +
        '<button type="button" class="btn btn--outline btn--sm" id="site-revert">Revert</button>' +
      "</div>");
  }

  /* ======================================================================
     8. Settings tab
     ====================================================================== */

  function initSettingsTab() {
    refreshExport();

    $("export-download").addEventListener("click", function () {
      var blob = new Blob([Store.exportJSON()], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "pratik-portfolio-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click();
      URL.revokeObjectURL(a.href);
      toast("Downloaded");
    });

    $("export-copy").addEventListener("click", function () {
      var ta = $("export-out");
      ta.select();
      try {
        navigator.clipboard ? navigator.clipboard.writeText(ta.value) : document.execCommand("copy");
        toast("Copied to clipboard");
      } catch (e) { toast("Copy failed — select and copy manually"); }
    });

    $("import-file").addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () { $("import-text").value = reader.result; };
      reader.readAsText(file);
    });

    $("import-btn").addEventListener("click", function () {
      msg("settings-msg", "", "");
      try {
        Store.importJSON($("import-text").value);
        toast("Imported — reloading");
        setTimeout(function () { location.reload(); }, 600);
      } catch (err) {
        msg("settings-msg", "Import failed: " + err.message, "bad");
      }
    });

    $("reset-btn").addEventListener("click", function () {
      if (confirm("Reset ALL content back to the original site?\n\nYour edits and any imported data in this browser will be lost.")) {
        Store.reset();
        toast("Reset — reloading");
        setTimeout(function () { location.reload(); }, 600);
      }
    });

    $("pw-btn").addEventListener("click", function () {
      var n = $("pw-new").value;
      if (n.length < 6) return msg("pw-msg", "New password needs at least 6 characters.", "bad");
      if (n !== $("pw-new2").value) return msg("pw-msg", "New passwords don't match.", "bad");
      Store.changePassword($("pw-old").value, n).then(function (ok) {
        if (ok) {
          msg("pw-msg", "Password updated.", "ok");
          $("pw-old").value = $("pw-new").value = $("pw-new2").value = "";
        } else {
          msg("pw-msg", "Current password is wrong.", "bad");
        }
      }).catch(function (err) {
        msg("pw-msg", err.message, "bad");
      });
    });
  }

  function refreshExport() {
    $("export-out").value = Store.exportJSON();
  }

  function msg(id, text, kind) {
    var el = $(id);
    el.textContent = text;
    el.className = "adm-msg" + (kind ? " adm-msg--" + kind : "");
    el.hidden = !text;
  }

  /* ======================================================================
     9. Boot
     ====================================================================== */

  if (Store.session()) showApp();
})();
