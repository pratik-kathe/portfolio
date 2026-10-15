/* ==========================================================================
   case-study.js — the universal case-study template.
   Reads ?slug=, resolves the study in Store, and renders:
   hero → ordered blocks → footer (all / next).
   Blocks (v2 data model) are typed and ordered: text, meta, metrics,
   figure panels, decision stories, image, video, Figma embed, pull quote,
   list, outcomes, "it's live" links, raw HTML — any type, anywhere. Unknown types render nothing.
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
  /* Scoped styling hook — lets CSS tune one study (e.g. its canvas shots)
     without adding study-specific branches to the shared block renderer. */
  document.documentElement.setAttribute("data-study", cs.slug);

  /* ---- structural section (always first) ------------------------------------- */

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

  /* ---- embed helpers ---------------------------------------------------------- */

  function embedBox(src, title) {
    return '<div class="cs-embed cs-embed--16x9"><iframe src="' + esc(src) +
      '" title="' + esc(title) + '" loading="lazy" allowfullscreen></iframe></div>';
  }

  /** YouTube / Vimeo / direct file → embeddable HTML; "" when unknown. */
  function videoEmbed(url, name) {
    var m = url.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    if (m) return embedBox("https://www.youtube.com/embed/" + m[1], name ? "YouTube video — " + name : "Embedded YouTube video");
    m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return embedBox("https://player.vimeo.com/video/" + m[1], name ? "Vimeo video — " + name : "Embedded Vimeo video");
    if (/\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i.test(url)) {
      return '<video class="cs-embed__file" src="' + esc(url) +
        '" controls preload="metadata" playsinline aria-label="' +
        esc(name || "Case study video") + '"></video>';
    }
    return "";
  }

  /** Figma file/design/proto → official embed; "" for non-Figma links. */
  function figmaEmbed(url, name) {
    if (!/figma\.com\/(file|design|proto|board|slides|deck)\//i.test(url)) return "";
    return '<div class="cs-embed cs-embed--figma"><iframe src="https://www.figma.com/embed?embed_host=share&amp;url=' +
      esc(encodeURIComponent(url)) + '" title="' + esc(name ? "Figma embed — " + name : "Figma file") +
      '" loading="lazy" allowfullscreen></iframe></div>';
  }

  /* ---- block sections (any type, any order) ------------------------------------ */

  function metaSection(b) {
    var items = b.items || [];
    if (!items.length) return "";
    return '<section class="cs-meta"><div class="shell">' +
      '<div class="meta-grid" data-reveal>' +
        items.map(function (m) {
          if (!m.label && !m.value) return "";
          return "<div>" +
            '<div class="meta-grid__label">' + esc(m.label) + "</div>" +
            '<div class="meta-grid__value">' + esc(m.value) + "</div>" +
          "</div>";
        }).join("") +
      "</div>" +
    "</div></section>";
  }

  function outcomesSection(b) {
    if (!b.items || !b.items.length) return "";
    return '<section class="cs-outcomes"><div class="shell">' +
      (b.heading ? '<p class="cs-outcomes__heading" data-reveal>' + esc(b.heading) + "</p>" : "") +
      '<div class="cs-outcomes__grid" data-reveal>' +
        b.items.map(function (it) {
          return '<div class="cs-outcomes__item">' +
            '<div class="cs-outcomes__value">' + esc(it.value) + "</div>" +
            '<div class="cs-outcomes__label">' + esc(it.label) + "</div>" +
          "</div>";
        }).join("") +
      "</div>" +
      (b.note ? '<p class="cs-outcomes__note" data-reveal>' + esc(b.note) + "</p>" : "") +
    "</div></section>";
  }

  /** "It's live" — the one claim in a case study a reader can open and check
      for themselves, so it gets a section of its own rather than a line in the
      outcomes block. Panelled to stand out from the plain copy blocks; the dot
      is decorative, the words carry the meaning. Every link is external and
      announces that it opens in a new tab. */
  function liveSection(b) {
    var links = (b.links || []).filter(function (l) { return l && l.href && l.text; });
    if (!links.length) return "";
    return '<section class="cs-live"><div class="shell shell--copy">' +
      '<div class="cs-live__panel" data-reveal>' +
        '<p class="label cs-live__label">' +
          '<span class="cs-live__dot" aria-hidden="true"></span>' +
          esc(b.label || "It’s live") +
        "</p>" +
        (b.heading ? '<h2 class="cs-live__heading">' + esc(b.heading) + "</h2>" : "") +
        (b.body ? '<p class="cs-live__body">' + esc(b.body) + "</p>" : "") +
        '<ul class="cs-live__links">' +
          links.map(function (l) {
            return '<li class="cs-live__link">' +
              UI.link(l.href, l.text, "btn--solid",
                '<span class="cta-arrow--ext" aria-hidden="true">↗</span>' +
                '<span class="sr-only"> (opens in a new tab)</span>') +
              (l.note ? '<span class="cs-live__note">' + esc(l.note) + "</span>" : "") +
            "</li>";
          }).join("") +
        "</ul>" +
      "</div>" +
    "</div></section>";
  }

  function textSection(b) {
    if (!b.label && !b.heading && !b.body) return "";
    var flush = b.flush === "1" || b.flush === 1;
    return '<section class="cs-context' + (flush ? " cs-context--flush" : "") +
        '"><div class="shell shell--copy">' +
      (b.label ? '<p class="label" data-reveal>' + esc(b.label) + "</p>" : "") +
      (b.heading ? '<h2 class="cs-context__heading" data-reveal>' + esc(b.heading) + "</h2>" : "") +
      (b.body ? '<p class="cs-context__body' + (b.heading ? "" : " cs-context__body--bare") +
        '" data-reveal>' + esc(b.body) + "</p>" : "") +
    "</div></section>";
  }

  /** A block whose next block is a single screenshot renders as one
      two-column section — copy on one side, image on the other — instead of
      two stacked full-width sections. Two screenshot shapes fold: a
      `.cs-panel` html block (the tall portrait plugin panels, narrow track)
      and a plain `image` block (wide landscape shots, wider track).
      A grid of two or more screenshots deliberately does NOT fold — see
      blocksHTML(). `standalone` on an image block opts out entirely. */
  function featureSection(t, h, n) {
    var flush = t.flush === "1" || t.flush === 1;
    /* Alternate sides down the walkthrough: even rows copy-left/screenshot-right,
       odd rows reversed, so the eye zig-zags instead of tracking one column. */
    var flip = n % 2 === 1 ? " cs-feature--flip" : "";
    /* An `image` block is a wide landscape shot rather than a portrait panel,
       so it renders its own figure and takes the wider media track. */
    var isImage = h.type === "image";
    var media = isImage
      ? '<figure class="cs-media__figure">' +
          '<img class="cs-media__img" src="' + esc(h.src) + '" alt="' +
            esc(h.alt || h.caption || "") + '" loading="lazy">' +
          (h.caption ? '<figcaption class="cs-media__caption">' + esc(h.caption) + "</figcaption>" : "") +
        "</figure>"
      : h.html;
    return '<section class="cs-context cs-feature' + flip +
        (isImage ? " cs-feature--wide" : "") +
        (flush ? " cs-context--flush cs-feature--flush" : "") +
        '"><div class="shell cs-feature__grid">' +
      '<div class="cs-feature__copy">' +
        (t.label ? '<p class="label" data-reveal>' + esc(t.label) + "</p>" : "") +
        (t.heading ? '<h2 class="cs-context__heading" data-reveal>' + esc(t.heading) + "</h2>" : "") +
        (t.body ? '<p class="cs-context__body' + (t.heading ? "" : " cs-context__body--bare") +
          '" data-reveal>' + esc(t.body) + "</p>" : "") +
        /* A `list` block carries items instead of a body. Same em-dash markers
           and 17px measure as listSection(), so the row reads identically to
           the stacked version it replaced. */
        (t.items && t.items.length
          ? '<ul class="cs-list__items" data-reveal>' +
              t.items.filter(function (it) { return it && it.text; }).map(function (it) {
                return "<li>" + esc(it.text).replace(/\n/g, "<br>") + "</li>";
              }).join("") +
            "</ul>"
          : "") +
      "</div>" +
      '<div class="cs-feature__media" data-reveal>' + media + "</div>" +
    "</div></section>";
  }

  function panelsSection(b) {
    if (!b.panels || !b.panels.length) return "";
    return '<section class="cs-solution"><div class="shell shell--solution">' +
      (b.label ? '<div data-reveal><p class="label">' + esc(b.label) + "</p></div>" : "") +
      (b.heading ? '<h2 class="h2 cs-solution__heading" data-reveal>' + esc(b.heading) + "</h2>" : "") +
      (b.intro ? '<p class="cs-solution__intro" data-reveal>' + esc(b.intro) + "</p>" : "") +
      '<div class="cs-solution__grid">' +
        b.panels.map(function (p) {
          return '<figure class="cs-figure" data-reveal>' +
            (p.content || "") + /* raw SVG straight into the figure: it carries its own frame */
            '<figcaption class="cs-figure__caption">' + esc(p.caption) + "</figcaption>" +
          "</figure>";
        }).join("") +
      "</div>" +
    "</div></section>";
  }

  function storyLine(k, v) {
    return '<p class="cs-story__line"><strong>' + esc(k) + ":</strong> " + esc(v) + "</p>";
  }

  /** One decision story as an <article>. Used by decisionsSection() (stories
      stacked full width) and by featureSection() (a single story folded beside
      its evidence screenshot), so both render byte-identical story markup. */
  function storyHTML(st) {
    var lines = "";
    if (st.before) lines += storyLine("Before", st.before);
    if (st.options) lines += storyLine("Options I weighed", st.options);
    if (st.tradeoff) lines += storyLine(st.options ? "The turning point" : "The trade-off", st.tradeoff);
    if (st.action) lines += storyLine("What I did", st.action);
    if (st.result) lines += storyLine("What happened", st.result);
    return '<article class="cs-story" data-reveal>' +
      '<h3 class="cs-story__title">' + esc(st.title) + "</h3>" +
      (st.lead ? '<p class="cs-story__lead">' + esc(st.lead) + "</p>" : "") +
      lines +
    "</article>";
  }

  function decisionsSection(b) {
    if (!b.stories || !b.stories.length) return "";
    return '<section class="cs-decisions"><div class="shell shell--copy">' +
      ((b.label || b.heading) ? "<div data-reveal>" +
        (b.label ? '<p class="label">' + esc(b.label) + "</p>" : "") +
        (b.heading ? '<h2 class="h2 cs-decisions__heading">' + esc(b.heading) + "</h2>" : "") +
      "</div>" : "") +
      b.stories.map(storyHTML).join("") +
    "</div></section>";
  }

  function imageSection(b) {
    if (!b.src) return "";
    var alt = esc(b.alt || b.caption || "");
    if (b.width === "full") {
      return '<section class="cs-media cs-media--full">' +
        '<img class="cs-media__img" src="' + esc(b.src) + '" alt="' + alt +
          '" loading="lazy" data-reveal>' +
        (b.caption ? '<div class="shell"><p class="cs-media__caption">' + esc(b.caption) + "</p></div>" : "") +
      "</section>";
    }
    var shellCls = b.width === "inset" ? "shell shell--copy" : "shell";
    var mediaCls = b.width === "medium" ? "cs-media cs-media--medium" : "cs-media";
    return '<section class="' + mediaCls + '"><div class="' + shellCls + '">' +
      '<figure class="cs-media__figure" data-reveal>' +
        '<img class="cs-media__img" src="' + esc(b.src) + '" alt="' + alt + '" loading="lazy">' +
        (b.caption ? '<figcaption class="cs-media__caption">' + esc(b.caption) + "</figcaption>" : "") +
      "</figure>" +
    "</div></section>";
  }

  function videoSection(b) {
    if (!b.url) return "";
    var embed = videoEmbed(b.url, b.title);
    var body = embed ||
      '<a class="btn btn--outline btn--sm" href="' + esc(b.url) +
        '" target="_blank" rel="noopener">Open video ' + icons.arrow() + "</a>";
    return '<section class="cs-media cs-media--embed"><div class="shell shell--solution">' +
      (b.title ? '<p class="label" data-reveal>' + esc(b.title) + "</p>" : "") +
      '<div data-reveal>' + body + "</div>" +
      (b.caption ? '<p class="cs-media__caption" data-reveal>' + esc(b.caption) + "</p>" : "") +
    "</div></section>";
  }

  function figmaSection(b) {
    if (!b.url) return "";
    var embed = figmaEmbed(b.url, b.title);
    var body = embed
      ? embed + '<p class="cs-embed__link"><a href="' + esc(b.url) +
          '" target="_blank" rel="noopener">Open in Figma ' + icons.arrow() + "</a></p>"
      : '<a class="btn btn--outline btn--sm" href="' + esc(b.url) +
          '" target="_blank" rel="noopener">Open in Figma ' + icons.arrow() + "</a>";
    return '<section class="cs-media cs-media--embed"><div class="shell shell--solution">' +
      (b.title ? '<p class="label" data-reveal>' + esc(b.title) + "</p>" : "") +
      '<div data-reveal>' + body + "</div>" +
      (b.caption ? '<p class="cs-media__caption" data-reveal>' + esc(b.caption) + "</p>" : "") +
    "</div></section>";
  }

  function quoteSection(b) {
    if (!b.text) return "";
    return '<section class="cs-quote"><div class="shell shell--copy" data-reveal>' +
      '<blockquote class="cs-quote__text">' + esc(b.text) + "</blockquote>" +
      (b.attribution ? '<cite class="cs-quote__by">' + esc(b.attribution) + "</cite>" : "") +
    "</div></section>";
  }

  function listSection(b) {
    var items = (b.items || []).filter(function (it) { return it && it.text; });
    if (!b.heading && !items.length) return "";
    return '<section class="cs-list"><div class="shell shell--copy">' +
      (b.heading ? '<h2 class="cs-list__heading" data-reveal>' + esc(b.heading) + "</h2>" : "") +
      '<ul class="cs-list__items" data-reveal>' +
        items.map(function (it) {
          return "<li>" + esc(it.text).replace(/\n/g, "<br>") + "</li>";
        }).join("") +
      "</ul>" +
    "</div></section>";
  }

  function htmlSection(b) {
    if (!b.html) return "";
    return '<section class="cs-html"><div class="shell" data-reveal>' + b.html + "</div></section>";
  }

  function blockHTML(b) {
    if (!b || !b.type) return "";
    switch (b.type) {
      case "meta": return metaSection(b);
      case "outcomes": return outcomesSection(b);
      case "live": return liveSection(b);
      case "text": return textSection(b);
      case "panels": return panelsSection(b);
      case "decisions": return decisionsSection(b);
      case "image": return imageSection(b);
      case "video": return videoSection(b);
      case "figma": return figmaSection(b);
      case "quote": return quoteSection(b);
      case "list": return listSection(b);
      case "html": return htmlSection(b);
      default: return ""; // unknown/future type — skip, never break the page
    }
  }

  /** Render the block list, folding a block and the SINGLE screenshot that
      follows it into one featureSection, so copy and image sit side by side.
      A grid of two or more screenshots never folds: two shots belong under
      their copy at half-row width each, not squeezed into the media column
      stacked or halved — so those render as a text section with the full-width
      pair below it.

      Single screenshots fold beside a `text` block or a `list` block (only ever
      a `.cs-panel`), so a step and its shot share a row. An `image` block
      carrying `standalone` opts out and renders below the copy on its own.
      Every other block renders exactly as it did. */
  function blocksHTML(blocks) {
    var out = "";
    var n = 0; // feature-row counter, drives the left/right alternation
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      var next = blocks[i + 1];
      var isPanel = !!next && next.type === "html" && /class="cs-panel"/.test(next.html || "");
      var isImage = !!next && next.type === "image";
      var pairable = !!b && (
        b.type === "text" ||
        (b.type === "list" && isPanel)
      );
      /* Matches the `flush` convention elsewhere: boolean or "1". */
      var standalone = !!next && (next.standalone === true || next.standalone === 1 || next.standalone === "1");
      if (pairable && !standalone && (isPanel || isImage)) {
        out += featureSection(b, next, n++);
        i++; // consumed the screenshot
      } else {
        out += blockHTML(b);
      }
    }
    return out;
  }

  /* ---- render ---------------------------------------------------------------- */

  main.innerHTML =
    heroSection() +
    blocksHTML(Array.isArray(cs.blocks) ? cs.blocks : []);

  // "Next: …" follows list order and wraps around to the first study
  footer.innerHTML = UI.caseFooter(cs, all[(i + 1) % all.length]);

  window.Portfolio.Anims.init();
})();
