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
    html += '<button class="nav-toggle" type="button" data-nav-toggle' +
      ' aria-expanded="false" aria-controls="site-menu">' +
      '<span class="nav-toggle__box" aria-hidden="true">' +
        '<span class="nav-toggle__bar"></span>' +
        '<span class="nav-toggle__bar"></span>' +
        '<span class="nav-toggle__bar"></span>' +
      "</span>" +
      '<span class="sr-only">Menu</span>' +
      "</button>";
    html += '<div class="site-nav__links" id="site-menu">';
    site.nav.items.forEach(function (it, idx) {
      var href = it.href;
      if (!onHome && href.charAt(0) === "#") href = "index.html" + href;
      var cls = "site-nav__link" + (it.id === "contact" ? " site-nav__link--btn" : "");
      html += '<a class="' + cls + '" href="' + esc(href) + '" style="--i:' + idx + '"' +
        (it.id === activeId ? ' aria-current="page"' : "") +
        ">" + esc(it.label) + "</a>";
    });
    html += "</div>";
    return html;
  }

  /* ---- mobile menu (hamburger) --------------------------------------------
     Delegated at document level so it works no matter when a page injects
     UI.nav() markup. Panel itself is CSS (≤820px media query at the bottom
     of style.css): opacity + translateY reveal with staggered link delays.
  -------------------------------------------------------------------------- */
  var MENU_MQ = "(max-width: 820px)";

  function menuBtn() { return document.querySelector("[data-nav-toggle]"); }
  function menuPanel() { return document.getElementById("site-menu"); }
  function menuIsOpen() { return document.body.classList.contains("nav-open"); }

  function setMenu(open) {
    var btn = menuBtn(), menu = menuPanel();
    if (!btn || !menu) return;
    document.body.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    /* lock page scroll and keep background content out of the tab order
       while the overlay is up (inert is a no-op on older browsers) */
    document.body.style.overflow = open ? "hidden" : "";
    Array.prototype.forEach.call(document.querySelectorAll("main, footer"), function (el) {
      if (open) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
    if (!open && menu.contains(document.activeElement)) btn.focus();
  }

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    if (e.target.closest("[data-nav-toggle]")) { setMenu(!menuIsOpen()); return; }
    if (e.target.closest("#site-menu a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuIsOpen()) setMenu(false);
  });
  var menuWasMobile = window.matchMedia ? window.matchMedia(MENU_MQ).matches : false;
  window.addEventListener("resize", function () {
    var now = window.matchMedia ? window.matchMedia(MENU_MQ).matches : false;
    if (menuWasMobile && !now && menuIsOpen()) setMenu(false); // grew to desktop → reset
    menuWasMobile = now;
  });

  /* ---- case-study card (home + work index) -------------------------------- */
  function card(cs) {
    // thumbnail: NDA-safe wireframe-style image (portal-editable); decorative —
    // the adjacent copy already describes the project.
    var media = cs.thumbnail
      ? '<div class="card__media"><img src="' + esc(cs.thumbnail) +
        '" alt="" aria-hidden="true" loading="lazy"></div>'
      : "";
    var ms = (Array.isArray(cs.metrics) ? cs.metrics : [])
      .filter(function (m) { return m && m.value; });
    var metrics = ms.length
      ? '<ul class="card__metrics">' +
          ms.map(function (m) {
            return '<li class="card__metric">' +
              '<span class="card__metric-value">' + esc(m.value) + "</span>" +
              '<span class="card__metric-label">' + esc(m.label) + "</span>" +
            "</li>";
          }).join("") +
        "</ul>"
      : (cs.impact ? '<p class="card__impact">' + esc(cs.impact) + "</p>" : "");
    return '<div class="card">' +
      '<a class="card__link" href="case-study.html?slug=' + esc(cs.slug) + '">' +
        media +
        '<div class="card__head"><div>' +
          '<div class="card__meta">' +
            '<span class="chip">' + esc(cs.category) + "</span>" +
            '<span class="meta-text">' + esc(cs.date) + "</span>" +
          "</div>" +
          '<h3 class="card__title">' + esc(cs.title) + "</h3>" +
          '<p class="card__by">' + esc(cs.cardLine) + "</p>" +
          '<p class="card__blurb">' + esc(cs.blurb) + "</p>" +
          metrics +
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
        /* guide: one-click copy-email as the primary action (the separate
           "Send email" mailto CTA removed on request). */
        '<button type="button" class="btn btn--solid btn--copy" data-copy-email="' +
          esc(c.email) + '" title="Click to copy" aria-label="' + esc(c.email) +
          ' — copy to clipboard">' +
          '<span class="btn__copy-label">' + esc(c.email) + "</span></button>" +
        link(c.linkedin, "LinkedIn", "btn--outline") +
        link(c.resume, "View résumé", "btn--outline") +
      "</div>" +
      '<span class="sr-only" role="status" id="copy-status"></span>' +
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
    /* closing recap (guide: restate final impact at the end) — pulled from the
       same outcomes block so there's a single source of truth for numbers. */
    var ob = (cs.blocks || []).filter(function (b) {
      return b && b.type === "outcomes" && Array.isArray(b.items) && b.items.length;
    })[0];
    var recap = ob
      ? '<div class="cs-footer__recap" data-reveal>' +
          '<p class="label cs-footer__recap-label">Final impact</p>' +
          '<div class="cs-outcomes__grid cs-footer__recap-grid">' +
            ob.items.map(function (it) {
              return '<div class="cs-outcomes__item">' +
                '<div class="cs-outcomes__value">' + esc(it.value) + "</div>" +
                '<div class="cs-outcomes__label">' + esc(it.label) + "</div>" +
              "</div>";
            }).join("") +
          "</div>" +
        "</div>"
      : "";
    return '<div class="shell">' +
      recap +
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
