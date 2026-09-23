/* ==========================================================================
   case-study.js — the universal case-study template.
   Reads ?slug=, resolves the study in Store, and renders:
   hero → meta → outcomes → context → solution panels → decision stories →
   what's next → reflection → footer (all / next).
   Unknown slug renders the .not-found state.
   ========================================================================== */
(function () {
  "use strict";

  var Store = window.Portfolio.Store;
  var UI = window.Portfolio.UI;
  var esc = UI.esc;
  var icons = UI.icons;

  var main = document.getElementById("main-content");
  var footer = document.getElementById("cs-footer");
  var all = Store.list();
  var slug = new URLSearchParams(location.search).get("slug");
  var i = all.findIndex(function (c) { return c.slug === slug; });
  var cs = i >= 0 ? all[i] : null;

  document.getElementById("site-nav").innerHTML = UI.nav("work", false);

  /* ---- not-found ----------------------------------------------------------- */
  if (!cs) {
    document.title = "Case study not found — Pratik Kathe";
    main.innerHTML =
      '<section class="page-head" id="top"><div class="shell">' +
        '<a class="page-head__back" href="work.html">' + icons.arrowLeft() + " All case studies</a>" +
      "</div></section>" +
      '<section class="not-found">' +
        '<h1 class="not-found__title" data-hero>Nothing here (yet).</h1>' +
        '<p class="not-found__text" data-reveal>' +
          "That case study doesn’t exist — it may have been renamed or removed in the portal." +
        "</p>" +
        '<a class="btn btn--outline" href="work.html" data-reveal>Browse all case studies ' + icons.arrow() + "</a>" +
      "</section>";
    footer.innerHTML = UI.workFooter();
    window.Portfolio.Anims.init();
    return;
  }

  /* ---- document head -------------------------------------------------------- */
  document.title = (cs.metaTitle || cs.title) + " — Pratik Kathe";
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = cs.summary || "";

  /* ---- section builders ------------------------------------------------------ */

  function heroSection() {
    return '<section class="cs-hero" id="top"><div class="shell">' +
      '<a class="page-head__back" href="work.html">' + icons.arrowLeft() + " All case studies</a>" +
      '<div class="cs-hero__meta" data-hero>' +
        '<span class="chip">' + esc(cs.heroChip || cs.category) + "</span>" +
        '<span class="meta-text">' + esc(cs.date) + "</span>" +
      "</div>" +
      '<h1 class="cs-hero__title" data-hero>' + esc(cs.title) + "</h1>" +
      '<p class="cs-hero__summary" data-hero>' + esc(cs.summary) + "</p>" +
    "</div></section>";
  }

  function metaSection() {
    if (!cs.meta || !cs.meta.length) return "";
    return '<section class="cs-meta"><div class="shell">' +
      '<div class="meta-grid" data-reveal>' +
        cs.meta.map(function (m) {
          if (!m.label && !m.value) return "";
          return "<div>" +
            '<div class="meta-grid__label">' + esc(m.label) + "</div>" +
            '<div class="meta-grid__value">' + esc(m.value) + "</div>" +
          "</div>";
        }).join("") +
      "</div>" +
    "</div></section>";
  }

  function outcomesSection() {
    var o = cs.outcomes;
    if (!o || !o.items || !o.items.length) return "";
    return '<section class="cs-outcomes"><div class="shell">' +
      '<p class="cs-outcomes__heading" data-reveal>' + esc(o.heading) + "</p>" +
      '<div class="cs-outcomes__grid" data-reveal>' +
        o.items.map(function (it) {
          return '<div class="cs-outcomes__item">' +
            '<div class="cs-outcomes__value">' + esc(it.value) + "</div>" +
            '<div class="cs-outcomes__label">' + esc(it.label) + "</div>" +
          "</div>";
        }).join("") +
      "</div>" +
      (o.note ? '<p class="cs-outcomes__note" data-reveal>' + esc(o.note) + "</p>" : "") +
    "</div></section>";
  }

  function contextSection() {
    var c = cs.context;
    if (!c || !c.body) return "";
    return '<section class="cs-context"><div class="shell shell--copy">' +
      '<p class="label" data-reveal>' + esc(c.label) + "</p>" +
      '<h2 class="cs-context__heading" data-reveal>' + esc(c.heading) + "</h2>" +
      '<p class="cs-context__body" data-reveal>' + esc(c.body) + "</p>" +
    "</div></section>";
  }

  function solutionSection() {
    var s = cs.solution;
    if (!s || !s.panels || !s.panels.length) return "";
    return '<section class="cs-solution"><div class="shell shell--solution">' +
      '<div data-reveal><p class="label">' + esc(s.label) + "</p></div>" +
      '<h2 class="h2 cs-solution__heading" data-reveal>' + esc(s.heading) + "</h2>" +
      '<p class="cs-solution__intro" data-reveal>' + esc(s.intro) + "</p>" +
      '<div class="cs-solution__grid">' +
        s.panels.map(function (p) {
          return '<figure class="cs-figure" data-reveal>' +
            p.content + /* raw SVG straight into the figure: it carries its own frame */
            '<figcaption class="cs-figure__caption">' + esc(p.caption) + "</figcaption>" +
          "</figure>";
        }).join("") +
      "</div>" +
    "</div></section>";
  }

  function decisionsSection() {
    var d = cs.decisions;
    if (!d || !d.stories || !d.stories.length) return "";
    return '<section class="cs-decisions"><div class="shell shell--copy">' +
      '<div data-reveal><p class="label">' + esc(d.label) + "</p>" +
      '<h2 class="h2 cs-decisions__heading" data-reveal>' + esc(d.heading) + "</h2></div>" +
      d.stories.map(function (st) {
        var lines = "";
        if (st.before) lines += line("Before", st.before);
        if (st.tradeoff) lines += line("The trade-off", st.tradeoff);
        if (st.action) lines += line("What I did", st.action);
        if (st.result) lines += line("What happened", st.result);
        return '<article class="cs-story" data-reveal>' +
          '<h3 class="cs-story__title">' + esc(st.title) + "</h3>" +
          (st.lead ? '<p class="cs-story__lead">' + esc(st.lead) + "</p>" : "") +
          lines +
        "</article>";
      }).join("") +
    "</div></section>";

    function line(k, v) {
      return '<p class="cs-story__line"><strong>' + esc(k) + ":</strong> " + esc(v) + "</p>";
    }
  }

  function nextSection() {
    var n = cs.next;
    if (!n || !n.body) return "";
    return '<section class="cs-next"><div class="shell shell--copy">' +
      '<div data-reveal><p class="label">' + esc(n.label) + "</p></div>" +
      '<p class="cs-next__body" data-reveal>' + esc(n.body) + "</p>" +
    "</div></section>";
  }

  function reflectionSection() {
    var r = cs.reflection;
    if (!r || !r.body) return "";
    return '<section class="cs-reflection"><div class="shell shell--copy">' +
      '<div data-reveal><p class="label">' + esc(r.label) + "</p></div>" +
      '<p class="cs-reflection__body" data-reveal>' + esc(r.body) + "</p>" +
    "</div></section>";
  }

  /* ---- render ---------------------------------------------------------------- */

  main.innerHTML =
    heroSection() +
    metaSection() +
    outcomesSection() +
    contextSection() +
    solutionSection() +
    decisionsSection() +
    nextSection() +
    reflectionSection();

  // "Next: …" follows list order and wraps around (BarrierBreak → CLXNS → Sankey → …)
  footer.innerHTML = UI.caseFooter(cs, all[(i + 1) % all.length]);

  window.Portfolio.Anims.init();
})();
