/* ==========================================================================
   ui.js — shared presentational helpers
   All markup that appears on more than one page (nav, case-study cards,
   footers) is built here from Store data so the portal stays the source
   of truth. Page-specific markup lives in each page's own script.
   ========================================================================== */
(function () {
  "use strict";

  var Store = window.Portfolio.Store;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---- icons (arrow motion handled by CSS .cta-arrow* rules) ------------- */
  var icons = {
    arrow: function () { return '<span class="cta-arrow" aria-hidden="true">→</span>'; },
    arrowLeft: function () { return '<span class="cta-arrow--left" aria-hidden="true">←</span>'; },
    arrowDown: function () { return '<span class="cta-arrow--down" aria-hidden="true">↓</span>'; }
  };

  function isExternal(href) { return /^https?:\/\//i.test(href || ""); }

  /** Button/link honouring external targets. */
  function link(href, label, variant, icon) {
    var ext = isExternal(href);
    return '<a class="btn ' + (variant || "btn--outline") + '"' +
      (ext ? ' target="_blank" rel="noopener"' : "") +
      ' href="' + esc(href) + '">' + esc(label) + (icon || "") + "</a>";
  }

  /* ---- navigation ---------------------------------------------------------
     activeId: nav item id to mark aria-current; onHome: rewrite #anchors
     to index.html#... so the nav works from every page.
  -------------------------------------------------------------------------- */
  function nav(activeId, onHome) {
    var site = Store.getSite();
    var html = '<a class="site-nav__brand" href="index.html">' + esc(site.nav.brand) + "</a>";
    html += '<div class="site-nav__links">';
    site.nav.items.forEach(function (it) {
      var href = it.href;
      if (!onHome && href.charAt(0) === "#") href = "index.html" + href;
      var cls = "site-nav__link" + (it.id === "contact" ? " site-nav__link--btn" : "");
      html += '<a class="' + cls + '" href="' + esc(href) + '"' +
        (it.id === activeId ? ' aria-current="page"' : "") +
        ">" + esc(it.label) + "</a>";
    });
    html += "</div>";
    return html;
  }

  /* ---- case-study card (home + work index) -------------------------------- */
  function card(cs) {
    return '<div class="card">' +
      '<a class="card__link" href="case-study.html?slug=' + esc(cs.slug) + '">' +
        '<div class="card__head"><div>' +
          '<div class="card__meta">' +
            '<span class="chip">' + esc(cs.category) + "</span>" +
            '<span class="meta-text">' + esc(cs.date) + "</span>" +
          "</div>" +
          '<h3 class="card__title">' + esc(cs.title) + "</h3>" +
          '<p class="card__by">' + esc(cs.cardLine) + "</p>" +
          '<p class="card__blurb">' + esc(cs.blurb) + "</p>" +
          (cs.impact ? '<p class="card__impact">' + esc(cs.impact) + "</p>" : "") +
        "</div>" +
        '<span class="card__cta">View case study ' + icons.arrow() + "</span>" +
      "</div>" +
    "</a></div>";
  }

  function cardList(list) {
    return list.map(card).join("");
  }

  /* ---- contact footer (home) ---------------------------------------------- */
  function contactFooter() {
    var s = Store.getSite();
    var c = s.contact;
    var f = s.footer;
    return '<div class="shell">' +
      '<h2 class="contact__heading" data-reveal>' + esc(c.heading) + "</h2>" +
      '<p class="contact__text" data-reveal>' + esc(c.text) + "</p>" +
      '<div class="contact__actions" data-reveal>' +
        link("mailto:" + c.email, c.email, "btn--solid") +
        link(c.linkedin, "LinkedIn", "btn--outline") +
        link(c.resume, "View résumé", "btn--outline") +
      "</div>" +
      '<div class="contact__bottom">' +
        "<span>" + esc(f.note) + "</span>" +
        '<a href="#top">Back to top ↑</a>' +
      "</div>" +
    "</div>";
  }

  /* ---- slim footer bar (work page) ---------------------------------------- */
  function workFooter() {
    var s = Store.getSite();
    return '<div class="site-footer-bar__inner">' +
      "<span>" + esc(s.footer.note) + "</span>" +
      "<span>" +
        '<a href="index.html#contact">' + esc(s.footer.workCta) + "</a>" +
        '<a href="' + esc(s.contact.resume) + '" target="_blank" rel="noopener">View résumé</a>' +
        '<a href="#top">Back to top ↑</a>' +
      "</span>" +
    "</div>";
  }

  /* ---- case-study footer nav (question + all + next) ---------------------- */
  function caseFooter(cs, next) {
    var c = Store.getSite().contact;
    var f = cs.footer || {};
    return '<div class="shell">' +
      '<p class="cs-footer__question" data-reveal>' +
        esc(f.question || "Have a question about a decision here?") + " " +
        '<a href="mailto:' + esc(c.email) + '">Email me</a>' +
        esc(f.tail || "") +
      "</p>" +
      '<div class="cs-footer__nav">' +
        '<a class="cs-footer__all" href="work.html">' + icons.arrowLeft() + " All case studies</a>" +
        (next
          ? '<a href="case-study.html?slug=' + esc(next.slug) + '">Next: ' + esc(next.shortTitle) +
            " " + icons.arrow() + "</a>"
          : "") +
      "</div>" +
    "</div>";
  }

  /* ---- section head (label-free: matches the original's plain h2s) -------- */
  function sectionHead(heading, intro, cta) {
    return '<div class="section-head" data-reveal>' +
      '<div class="section-head__text">' +
        '<h2 class="h2 section-head__heading">' + esc(heading) + "</h2>" +
        (intro ? '<p class="section-head__intro">' + esc(intro) + "</p>" : "") +
      "</div>" +
      (cta ? link(cta.href, cta.label, "btn--outline", icons.arrow()) : "") +
    "</div>";
  }

  window.Portfolio.UI = {
    esc: esc,
    icons: icons,
    isExternal: isExternal,
    link: link,
    nav: nav,
    card: card,
    cardList: cardList,
    contactFooter: contactFooter,
    workFooter: workFooter,
    caseFooter: caseFooter,
    sectionHead: sectionHead
  };
})();
