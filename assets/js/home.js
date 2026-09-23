/* ==========================================================================
   home.js — renders every section of the landing page from Store data,
   then hands off to Portfolio.Anims for hero/reveal/parallax motion.
   ========================================================================== */
(function () {
  "use strict";

  var Store = window.Portfolio.Store;
  var UI = window.Portfolio.UI;
  var esc = UI.esc;
  var icons = UI.icons;

  function $(id) { return document.getElementById(id); }

  /* ---- head: title + description from data -------------------------------- */
  var site = Store.getSite();
  if (site.meta) {
    document.title = site.meta.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && site.meta.description) meta.content = site.meta.description;
  }

  /* ---- navigation ---------------------------------------------------------- */
  $("site-nav").innerHTML = UI.nav(null, true);

  /* ---- hero ---------------------------------------------------------------- */
  (function () {
    var h = site.hero;
    $("hero-inner").innerHTML =
      '<p class="hero__eyebrow" data-hero>' + esc(h.eyebrow) + "</p>" +
      '<h1 class="hero__title" data-hero>' + esc(h.title) + "</h1>" +
      '<p class="hero__subtitle" data-hero>' + esc(h.subtitle) + "</p>" +
      '<div class="hero__actions" data-hero>' +
        UI.link(h.primary.href, h.primary.label, "btn--solid", icons.arrow()) +
        UI.link(h.secondary.href, h.secondary.label, "btn--outline", icons.arrowDown()) +
      "</div>";
  })();

  /* ---- stats --------------------------------------------------------------- */
  $("stats").innerHTML =
    '<div class="stats__grid" data-hero>' +
    site.stats.map(function (s) {
      return "<div>" +
        '<div class="stats__value">' + esc(s.value) + "</div>" +
        '<div class="stats__label">' + esc(s.label) + "</div>" +
      "</div>";
    }).join("") +
    "</div>";

  /* ---- about --------------------------------------------------------------- */
  (function () {
    var a = site.about;
    $("about-inner").innerHTML =
      '<div class="about__grid">' +
        '<div class="about__frame" data-parallax="' + (a.parallaxSpeed || 0.04) + '">' +
          '<img class="about__photo" src="' + esc(a.image.src) + '" alt="' + esc(a.image.alt) + '">' +
        "</div>" +
        "<div>" +
          '<h2 class="h2 about__heading" data-reveal>' + esc(a.heading) + "</h2>" +
          a.paragraphs.map(function (p) {
            return '<p class="about__copy" data-reveal>' + esc(p) + "</p>";
          }).join("") +
          '<div class="about__details" data-reveal>' +
            a.details.map(function (d) {
              return "<div>" +
                '<div class="meta-grid__label">' + esc(d.label) + "</div>" +
                '<div class="meta-grid__value">' + esc(d.value) + "</div>" +
              "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>";
  })();

  /* ---- selected work -------------------------------------------------------- */
  (function () {
    var w = site.work;
    $("work-inner").innerHTML =
      UI.sectionHead(w.heading, w.intro, w.cta) +
      '<div class="card-list" data-reveal>' +
        UI.cardList(Store.list().slice(0, w.limit || 3)) +
      "</div>";
  })();

  /* ---- skills --------------------------------------------------------------- */
  (function () {
    var s = site.skills;
    $("skills-inner").innerHTML =
      '<div data-reveal><h2 class="h2 section-title">' + esc(s.heading) + "</h2></div>" +
      '<div class="skills__grid" data-reveal>' +
        s.groups.map(function (g) {
          return "<div>" +
            '<div class="skills__group-title">' + esc(g.title) + "</div>" +
            '<ul class="skills__list">' +
              g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") +
            "</ul>" +
          "</div>";
        }).join("") +
      "</div>";
  })();

  /* ---- experience ------------------------------------------------------------ */
  (function () {
    var x = site.experience;
    $("experience-inner").innerHTML =
      '<div data-reveal><h2 class="h2 section-title">' + esc(x.heading) + "</h2></div>" +
      '<div class="exp__list" data-reveal>' +
        x.items.map(function (it) {
          return '<div class="exp__item">' +
            '<div class="exp__period">' + esc(it.period) + "</div>" +
            "<div>" +
              '<div class="exp__role">' + esc(it.role) + "</div>" +
              '<div class="exp__org">' + esc(it.org) + "</div>" +
            "</div>" +
          "</div>";
        }).join("") +
      "</div>";
  })();

  /* ---- education + certifications --------------------------------------------- */
  function resumeCol(block) {
    return "<div>" +
      '<h2 class="h2 h2--sm resume__heading">' + esc(block.heading) + "</h2>" +
      '<div class="resume__list">' +
        block.items.map(function (it) {
          return '<div class="resume__item">' +
            '<div class="resume__item-line1">' + esc(it.line1) + "</div>" +
            '<div class="resume__item-line2">' + esc(it.line2) + "</div>" +
            (it.line3 ? '<div class="resume__item-line3">' + esc(it.line3) + "</div>" : "") +
          "</div>";
        }).join("") +
      "</div>" +
    "</div>";
  }
  $("education-inner").innerHTML =
    '<div class="resume__grid" data-reveal>' +
      resumeCol(site.education) + resumeCol(site.certifications) +
    "</div>";

  /* ---- hobby ------------------------------------------------------------------ */
  (function () {
    var hb = site.hobby;
    $("hobby-inner").innerHTML =
      '<div class="hobby__grid">' +
        "<div>" +
          '<p class="label" data-reveal>' + esc(hb.label) + "</p>" +
          '<h2 class="hobby__heading" data-reveal>' + esc(hb.heading) + "</h2>" +
          '<p class="hobby__body" data-reveal>' + esc(hb.body) + "</p>" +
        "</div>" +
        '<div class="hobby__media" data-reveal>' +
          '<img class="hobby__photo" src="' + esc(hb.image.src) + '" alt="' + esc(hb.image.alt) + '" data-parallax="' + (hb.parallaxSpeed || 0.04) + '">' +
        "</div>" +
      "</div>";
  })();

  /* ---- contact footer ------------------------------------------------------------ */
  $("contact").innerHTML = UI.contactFooter();

  /* ---- motion -------------------------------------------------------------------- */
  window.Portfolio.Anims.init();
})();
