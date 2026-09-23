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

  /* ---- v1 → v2 migration: fixed named sections → ordered blocks ----------
     v2 case studies carry an ordered `blocks` array (any section type, any
     order — image / video / Figma / quote / …). Legacy studies keep their
     original keys as a safety copy; the renderer and the portal editor only
     ever read `blocks`. */
  var DATA_VERSION = 2;

  /* Seed fingerprints: exact djb2+FNV-1a hashes of the stored JSON of published
     but UNEDITED seeds that predate newer seed-only fields (thumbnails, metric
     chips, keyword chips, goals…). A stored copy matching one of these is
     provably a pristine old seed, so the first read quietly swaps in the new
     seed — any user edit changes the hash, so edited data is never touched.
     Compute the next hash BEFORE changing seed content: open the site, run
     Store.reset(), hash localStorage[KEY], append it here first. */
  var OLD_SEED_HASHES = ["2433b7db13797edd", "36e301856980357f", "fabea60293a76e9c"];

  function matchesOldSeed(d) {
    try {
      var s = JSON.stringify(d);
      var a = 5381, b = 2166136261;
      for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        a = ((a * 33) ^ c) >>> 0;
        b = (b ^ c) >>> 0;
        b = Math.imul(b, 16777619) >>> 0;
      }
      var h = a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0");
      return OLD_SEED_HASHES.indexOf(h) >= 0;
    } catch (e) { return false; }
  }

  function blocksFromLegacy(cs) {
    var out = [];
    try {
      if (Array.isArray(cs.meta) && cs.meta.length) {
        out.push({ type: "meta", items: cs.meta });
      }
      if (cs.outcomes && Array.isArray(cs.outcomes.items) && cs.outcomes.items.length) {
        out.push({
          type: "outcomes",
          heading: cs.outcomes.heading || "",
          items: cs.outcomes.items,
          note: cs.outcomes.note || ""
        });
      }
      // "What I did" bullets belong in the opening, right after the impact
      // numbers (template Frame 3: impact at a glance + what I did).
      if (cs.scope && Array.isArray(cs.scope.items) && cs.scope.items.length) {
        out.push({
          type: "list",
          heading: cs.scope.heading || "",
          items: cs.scope.items.map(function (t) { return { text: t }; })
        });
      }
      if (cs.context && cs.context.body) {
        out.push({
          type: "text",
          label: cs.context.label || "",
          heading: cs.context.heading || "",
          body: cs.context.body,
          flush: ""
        });
      }
      // business / user goal — same label+value strip as the role meta, so the
      // problem is explicitly tied to what success meant (guide: body items).
      if (Array.isArray(cs.goals) && cs.goals.length) {
        out.push({ type: "meta", items: cs.goals });
      }
      if (cs.quote && cs.quote.text) {
        out.push({ type: "quote", text: cs.quote.text, attribution: cs.quote.attribution || "" });
      }
      if (cs.solution && Array.isArray(cs.solution.panels) && cs.solution.panels.length) {
        out.push({
          type: "panels",
          label: cs.solution.label || "",
          heading: cs.solution.heading || "",
          intro: cs.solution.intro || "",
          panels: cs.solution.panels
        });
      }
      if (cs.decisions && Array.isArray(cs.decisions.stories) && cs.decisions.stories.length) {
        out.push({
          type: "decisions",
          label: cs.decisions.label || "",
          heading: cs.decisions.heading || "",
          stories: cs.decisions.stories
        });
      }
      // next / reflection sat flush under the previous section (no top
      // padding of their own) — tagged so they keep their original rhythm.
      if (cs.next && cs.next.body) {
        out.push({ type: "text", label: cs.next.label || "", heading: "", body: cs.next.body, flush: "1" });
      }
      if (cs.reflection && cs.reflection.body) {
        out.push({ type: "text", label: cs.reflection.label || "", heading: "", body: cs.reflection.body, flush: "1" });
      }
    } catch (e) { /* a malformed legacy study must never block the read */ }
    return out;
  }

  /** Runs on every read. Returns true when the data changed (caller persists). */
  function migrate(d) {
    if (!d || !Array.isArray(d.caseStudies)) return false;
    if ((d.version || 1) >= DATA_VERSION) return false;
    d.caseStudies.forEach(function (cs) {
      if (cs && !Array.isArray(cs.blocks)) cs.blocks = blocksFromLegacy(cs);
    });
    d.version = DATA_VERSION;
    return true;
  }

  function db() {
    if (cache) return cache;
    var d = null;
    try { d = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { d = null; }
    if (d && matchesOldSeed(d)) d = null; // pristine old seed → take the new one
    if (!d || !d.site || !Array.isArray(d.caseStudies)) {
      d = seed();
      persist(d);
    }
    if (migrate(d)) persist(d);
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
      title: "", cardLine: "", blurb: "", impact: "", summary: "",
      thumbnail: "", metrics: [],
      blocks: [
        { type: "meta", items: [{ label: "", value: "" }, { label: "", value: "" }] },
        { type: "text", label: "CONTEXT", heading: "", body: "", flush: "" }
      ],
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
    migrate(d); // old exports (v1) come in legacy shape — upgrade on the way in
    persist(d);
    return d;
  }

  function reset() {
    var d = seed();
    migrate(d);
    persist(d);
  }

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
