/* ==========================================================================
   store.js — single source of truth for site + case-study content

   Data model (localStorage key: pratik-portfolio.v1)
     { version, auth: {salt, hash}, site: {...}, caseStudies: [...] }

   First read seeds from window.SEED (seed.js). Everything — copy, sections,
   case studies — is read from here, so the admin portal can edit it live.
   Session flag (pratik-portfolio.session) lives in sessionStorage only.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "pratik-portfolio.v1";
  var SESSION = "pratik-portfolio.session";
  var SALT = "pk.portfolio.salt";

  var cache = null;

  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function seed() {
    return window.SEED
      ? clone(window.SEED)
      : { version: 1, auth: { salt: SALT, hash: "" }, site: {}, caseStudies: [] };
  }

  function persist(d) {
    cache = d;
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* private mode: memory only */ }
  }

  function db() {
    if (cache) return cache;
    var d = null;
    try { d = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { d = null; }
    if (!d || !d.site || !Array.isArray(d.caseStudies)) {
      d = seed();
      persist(d);
    }
    cache = d;
    return cache;
  }

  /* ---- site --------------------------------------------------------------- */

  function getSite() { return db().site; }

  function saveSite(site) {
    db().site = site;
    persist(db());
    return site;
  }

  /* ---- slugs -------------------------------------------------------------- */

  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled";
  }

  function uniqueSlug(title, ignoreSlug) {
    var base = slugify(title);
    var s = base;
    var n = 2;
    while (db().caseStudies.some(function (c) { return c.slug === s; }) && s !== ignoreSlug) {
      s = base + "-" + n++;
    }
    return s;
  }

  /* ---- case studies ------------------------------------------------------- */

  function reindex() {
    list().forEach(function (cs, i) { cs.order = i; });
  }

  function list() {
    return db().caseStudies.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }

  function get(slug) {
    return db().caseStudies.find(function (c) { return c.slug === slug; }) || null;
  }

  function save(cs) {
    var d = db();
    var i = d.caseStudies.findIndex(function (c) { return c.slug === cs.slug; });
    if (i >= 0) d.caseStudies[i] = cs;
    else {
      cs.order = d.caseStudies.length;
      d.caseStudies.push(cs);
    }
    persist(d);
    return cs;
  }

  function blank() {
    return {
      slug: "", order: 0,
      metaTitle: "", shortTitle: "", category: "", heroChip: "", date: "",
      title: "", cardLine: "", blurb: "", summary: "",
      meta: [{ label: "", value: "" }, { label: "", value: "" }],
      outcomes: { heading: "Where this landed", items: [{ value: "", label: "" }], note: "" },
      context: { label: "CONTEXT", heading: "", body: "" },
      solution: { label: "SOLUTION AS A JOURNEY", heading: "", intro: "", panels: [] },
      decisions: { label: "DECISION STORIES", heading: "Three calls that shaped this project", stories: [] },
      next: { label: "WHAT'S NEXT", body: "" },
      reflection: { label: "REFLECTION", body: "" },
      footer: { question: "Have a question about a decision here?", tail: " — I'm happy to talk through it." }
    };
  }

  function create(title) {
    var cs = blank();
    cs.title = title || "Untitled case study";
    cs.shortTitle = cs.title;
    cs.slug = uniqueSlug(cs.title);
    db().caseStudies.push(cs);
    persist(db());
    return cs;
  }

  function remove(slug) {
    var d = db();
    d.caseStudies = d.caseStudies.filter(function (c) { return c.slug !== slug; });
    reindex();
    persist(d);
  }

  function duplicate(slug) {
    var src = get(slug);
    if (!src) return null;
    var copy = clone(src);
    copy.title = src.title + " (copy)";
    copy.slug = uniqueSlug(copy.title);
    var d = db();
    var i = d.caseStudies.findIndex(function (c) { return c.slug === slug; });
    d.caseStudies.splice(i + 1, 0, copy);
    reindex();
    persist(d);
    return copy;
  }

  function move(slug, delta) {
    var arr = list();
    var i = arr.findIndex(function (c) { return c.slug === slug; });
    var j = i + delta;
    if (i < 0 || j < 0 || j >= arr.length) return false;
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    arr.forEach(function (cs, n) { cs.order = n; });
    persist(db());
    return true;
  }

  /* ---- auth (SHA-256 of "salt:password") ---------------------------------- */

  function digest(text) {
    if (!(window.crypto && window.crypto.subtle)) {
      return Promise.reject(new Error(
        "This browser won't run password checks on this address. " +
        "Open the portal at http://localhost:8077/admin.html — opening the file " +
        "directly (file://) or via a plain IP/hostname isn't a secure connection."
      ));
    }
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, "0"); })
        .join("");
    });
  }

  function hashPw(pw) { return digest(db().auth.salt + ":" + pw); }

  // true  = logged in
  // false = wrong password
  // rejects with a descriptive Error when the environment can't check the
  // password at all (no crypto.subtle / broken storage) — never silently false
  function login(pw) {
    return hashPw(pw).then(function (h) {
      if (h !== db().auth.hash) return false;
      try { sessionStorage.setItem(SESSION, "1"); } catch (e) {}
      return true;
    });
  }

  function session() {
    try { return sessionStorage.getItem(SESSION) === "1"; } catch (e) { return false; }
  }

  function logout() {
    try { sessionStorage.removeItem(SESSION); } catch (e) {}
  }

  function changePassword(oldPw, newPw) {
    return Promise.all([hashPw(oldPw), digest(db().auth.salt + ":" + newPw)])
      .then(function (r) {
        if (r[0] !== db().auth.hash) return false;
        db().auth.hash = r[1];
        persist(db());
        return true;
      });
  }

  /* ---- export / import / reset -------------------------------------------- */

  function exportJSON() { return JSON.stringify(db(), null, 2); }

  function importJSON(text) {
    var d = JSON.parse(text);
    if (!d || !d.site || !Array.isArray(d.caseStudies)) {
      throw new Error("That file isn't a portfolio export.");
    }
    persist(d);
    return d;
  }

  function reset() { persist(seed()); }

  /* ---- public -------------------------------------------------------------- */

  window.Portfolio = window.Portfolio || {};
  window.Portfolio.Store = {
    getSite: getSite,
    saveSite: saveSite,
    slugify: slugify,
    uniqueSlug: uniqueSlug,
    list: list,
    get: get,
    save: save,
    create: create,
    remove: remove,
    duplicate: duplicate,
    move: move,
    blank: blank,
    login: login,
    session: session,
    logout: logout,
    changePassword: changePassword,
    exportJSON: exportJSON,
    importJSON: importJSON,
    reset: reset
  };
})();
