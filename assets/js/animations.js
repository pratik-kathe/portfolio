/* ==========================================================================
   animations.js — Motion (Framer Motion's vanilla JS runtime) wrappers

   - heroIn()      entrance stagger on first paint
   - reveal()      scroll-triggered reveals (once per element)
   - parallax()    scroll-linked parallax via Motion's scroll() + animate()
   - transitions() soft page-to-page fade for internal links
   ========================================================================== */
(function () {
  "use strict";

  var EASE = [0.22, 1, 0.36, 1]; // matches the design's decelerating curves

  function M() { return window.Motion; }
  function reduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /** If Motion never loaded, drop the `.js` class so CSS shows everything. */
  function ensureVisible() {
    if (!M() || !M().animate) document.documentElement.classList.remove("js");
  }

  /* ---- hero entrance ---------------------------------------------------- */
  function heroIn() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-hero]"));
    if (!els.length) return;
    ensureVisible();
    if (reduced() || !M()) return;
    els.forEach(function (el, i) {
      M().animate(
        el,
        { opacity: [0, 1], y: [14, 0] },
        { duration: 0.5, delay: i * 0.07, ease: EASE, fill: "both" }
      );
    });
  }

  /* ---- scroll reveals --------------------------------------------------- */
  function reveal(root) {
    var scope = root || document;
    var els = Array.prototype.slice.call(scope.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    ensureVisible();
    if (reduced() || !M() || !M().inView) return;

    els.forEach(function (el) {
      if (el.__revealed) return;
      var delay = parseFloat(el.dataset.delay || "0");
      M().inView(
        el,
        function () {
          if (el.__revealed) return;
          el.__revealed = true;
          M().animate(
            el,
            { opacity: [0, 1], y: [18, 0] },
            { duration: 0.5, delay: delay, ease: EASE, fill: "both" }
          );
        },
        { amount: 0.15, margin: "0px 0px -6% 0px" }
      );
    });
  }

  /* ---- parallax ----------------------------------------------------------
     Reproduces the design's centre-distance parallax:
        offset = clamp((elementCentre - viewportCentre) * speed, ±60px)
     Motion maps a linear y-travel across the element's full trip through the
     viewport, which is algebraically the same curve, and does it on the
     browser's scroll timeline — no per-frame JS, no jank.
  ------------------------------------------------------------------------ */
  var parallaxTeardown = [];

  function parallax() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (!els.length || reduced()) return;
    ensureVisible();
    if (!M() || !M().scroll || !M().animate) return fallbackParallax(els);

    teardownParallax();
    var vh = window.innerHeight;

    els.forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax) || 0.04;
      var height = el.offsetHeight || 1;
      // centre of travel × speed, capped at the design's ±60px
      var max = Math.min(60, Math.max(6, (speed * (vh + height)) / 2));

      var anim = M().animate(el, { y: [max, -max] }, { ease: "linear" });
      var stop = M().scroll(anim, {
        target: el,
        offset: ["start end", "end start"]
      });
      parallaxTeardown.push(function () {
        if (typeof stop === "function") { try { stop(); } catch (e) {} }
        if (anim && typeof anim.stop === "function") { try { anim.stop(); } catch (e) {} }
      });
    });
  }

  function teardownParallax() {
    parallaxTeardown.forEach(function (fn) { fn(); });
    parallaxTeardown = [];
  }

  /** Motion unavailable → original rAF implementation (still smooth). */
  function fallbackParallax(els) {
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var speed = parseFloat(el.dataset.parallax) || 0.04;
        var rect = el.getBoundingClientRect();
        var offset = ((rect.top + rect.height / 2 - vh / 2) * speed);
        offset = Math.max(-60, Math.min(60, offset));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---- page transitions -------------------------------------------------- */
  function transitions() {
    if (reduced()) return;

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      if (a.getAttribute("aria-disabled") === "true") return;

      var href = a.getAttribute("href") || "";
      // leave external / anchor / mail links to the browser
      if (/^(https?:|mailto:|tel:|#)/i.test(href)) return;
      if (href === "") return;

      e.preventDefault();
      var go = function () { window.location.href = href; };

      // Fade out, then navigate. A timer is the source of truth: in a
      // background tab rAF is suspended and finished promises may never
      // settle, which would otherwise strand the click.
      if (M() && M().animate) {
        try { M().animate(document.body, { opacity: [1, 0] }, { duration: 0.16, ease: "easeOut" }); }
        catch (err) { /* fall through to plain timeout */ }
      }
      setTimeout(go, 180);
    });

    // coming back via bfcache: restore opacity immediately
    window.addEventListener("pageshow", function () { document.body.style.opacity = "1"; });
  }

  /* ---- watchdog -----------------------------------------------------------
     If the tab was loaded hidden, rAF-driven Motion animations never tick and
     [data-hero]/[data-reveal] elements would stay at opacity 0. Anything still
     invisible in the viewport after 2.5s is snapped visible instead.
  ------------------------------------------------------------------------ */
  function watchdog() {
    setTimeout(function () {
      var vh = window.innerHeight;
      document.querySelectorAll("[data-hero], [data-reveal]").forEach(function (el) {
        if (el.style.opacity === "1" || getComputedStyle(el).opacity !== "0") return;
        var r = el.getBoundingClientRect();
        var inView = r.top < vh && r.bottom > 0;
        if (el.hasAttribute("data-hero") || inView) {
          el.__revealed = true; // stop inView from re-animating it later
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 2500);
  }

  /* ---- debounce ---------------------------------------------------------- */
  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  /* ---- boot -------------------------------------------------------------- */
  function init() {
    ensureVisible();
    heroIn();
    reveal();
    parallax();
    transitions();
    watchdog();
    window.addEventListener("resize", debounce(parallax, 300));
  }

  window.Portfolio = window.Portfolio || {};
  window.Portfolio.Anims = {
    init: init,
    heroIn: heroIn,
    reveal: reveal,
    parallax: parallax
  };
})();
