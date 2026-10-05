/* ==========================================================================
   work.js — work index: nav, head copy, full case-study card list, footer.
   ========================================================================== */
(function () {
  "use strict";

  var Store = window.Portfolio.Store;
  var UI = window.Portfolio.UI;

  var site = Store.getSite();

  document.getElementById("site-nav").innerHTML = UI.nav("work", false);

  if (site.workPage) {
    document.getElementById("work-heading").textContent = site.workPage.heading;
    document.getElementById("work-intro").textContent = site.workPage.intro;
  }

  document.getElementById("work-list").innerHTML = UI.cardList(Store.list());
  document.getElementById("footer-bar").innerHTML = UI.workFooter();

  window.Portfolio.Anims.init();
})();
