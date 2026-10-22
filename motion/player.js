/* Figma prototype player — rebuilds Smart Animate & friends from exported scene data.
   Usage: const p = new ProtoPlayer(el, data, { start, device:[w,h], atlases:[urls] }); */
(function (global) {
  'use strict';

  // ---------- easing ----------
  const SPRINGS = { GENTLE: [1, 100, 15], QUICK: [1, 300, 20], BOUNCY: [1, 600, 15], SLOW: [1, 80, 20] };
  const BEZ = {
    LINEAR: 'linear', EASE_IN: 'cubic-bezier(0.42,0,1,1)', EASE_OUT: 'cubic-bezier(0,0,0.58,1)',
    EASE_IN_AND_OUT: 'cubic-bezier(0.42,0,0.58,1)', EASE_IN_BACK: 'cubic-bezier(0.3,-0.05,0.7,-0.5)',
    EASE_OUT_BACK: 'cubic-bezier(0.45,1.45,0.8,1)', EASE_IN_AND_OUT_BACK: 'cubic-bezier(0.7,-0.4,0.4,1.4)'
  };
  let linearOK = null;
  function supportsLinear() {
    if (linearOK === null) { try { linearOK = CSS.supports('animation-timing-function', 'linear(0, 1)'); } catch (e) { linearOK = false; } }
    return linearOK;
  }
  function springFn(mass, k, c) {
    const w0 = Math.sqrt(k / mass), z = c / (2 * Math.sqrt(k * mass));
    if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return t => 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
    if (z === 1) return t => 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const r1 = -w0 * (z - Math.sqrt(z * z - 1)), r2 = -w0 * (z + Math.sqrt(z * z - 1));
    const A = r2 / (r2 - r1), B = -r1 / (r2 - r1);
    return t => 1 - (A * Math.exp(r1 * t) + B * Math.exp(r2 * t));
  }
  function easingOf(tr) {
    const e = (tr && tr.e) || 'EASE_OUT';
    if (BEZ[e]) return BEZ[e];
    if (e === 'CUSTOM_CUBIC_BEZIER' && tr.cb) return 'cubic-bezier(' + tr.cb.join(',') + ')';
    let sp = SPRINGS[e]; if (e === 'CUSTOM_SPRING' && tr.sp) sp = tr.sp;
    if (sp) {
      if (!supportsLinear()) return 'cubic-bezier(0.2,0.9,0.25,1.1)';
      const f = springFn(sp[0], sp[1], sp[2]); const dur = (tr.d || 0.8); const N = 48; const pts = [];
      for (let i = 0; i <= N; i++) { const v = i === N ? 1 : f((i / N) * dur); pts.push(+v.toFixed(4)); }
      return 'linear(' + pts.join(',') + ')';
    }
    return BEZ.EASE_OUT;
  }

  // ---------- styles ----------
  const rgba = (c, a) => 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a == null ? 1 : +(+a).toFixed(3)) + ')';
  function gradientCss(p, w, h) {
    // gradientTransform maps node(unit) -> gradient space; invert to get start/end in unit space
    const t = p.gt; const a = t[0][0], b = t[0][1], c = t[0][2], d = t[1][0], e = t[1][1], f = t[1][2];
    const det = a * e - b * d; if (!det) return null;
    const ia = e / det, ib = -b / det, ic = (b * f - e * c) / det, id = -d / det, ie = a / det, iff = (d * c - a * f) / det;
    const P = (x, y) => [ia * x + ib * y + ic, id * x + ie * y + iff];
    const stops = p.gs.map(s => rgba([s[1], s[2], s[3]], s[4] * (p.o == null ? 1 : p.o)) + ' ' + (s[0] * 100).toFixed(1) + '%');
    if (p.y === 'GRADIENT_LINEAR') {
      const s = P(0, 0.5), en = P(1, 0.5);
      const x1 = s[0] * w, y1 = s[1] * h, x2 = en[0] * w, y2 = en[1] * h;
      const ang = Math.atan2(x2 - x1, -(y2 - y1)); // css angle from top, clockwise
      const sin = Math.sin(ang), cos = -Math.cos(ang);
      const L = Math.abs(w * sin) + Math.abs(h * cos);
      const cx = w / 2, cy = h / 2;
      const proj = (x, y) => ((x - cx) * sin + (y - cy) * cos) / L + 0.5;
      const p1 = proj(x1, y1), p2 = proj(x2, y2);
      const st = p.gs.map(s => rgba([s[1], s[2], s[3]], s[4] * (p.o == null ? 1 : p.o)) + ' ' + ((p1 + (p2 - p1) * s[0]) * 100).toFixed(2) + '%');
      return 'linear-gradient(' + (ang * 180 / Math.PI).toFixed(2) + 'deg,' + st.join(',') + ')';
    }
    const c0 = P(0.5, 0.5), r1 = P(1, 0.5), r2 = P(0.5, 1);
    const rx = Math.hypot((r1[0] - c0[0]) * w, (r1[1] - c0[1]) * h), ry = Math.hypot((r2[0] - c0[0]) * w, (r2[1] - c0[1]) * h);
    return 'radial-gradient(' + rx.toFixed(1) + 'px ' + ry.toFixed(1) + 'px at ' + (c0[0] * 100).toFixed(2) + '% ' + (c0[1] * 100).toFixed(2) + '%,' + stops.join(',') + ')';
  }
  function cssOf(n) {
    const st = n.st; const o = {};
    if (!st) return o;
    if (st.f) {
      const layers = []; let color = null;
      for (let i = st.f.length - 1; i >= 0; i--) {
        const p = st.f[i];
        if (p.y === 'SOLID') { if (i === 0 && layers.length === 0) color = rgba(p.c, p.o); else layers.push('linear-gradient(' + rgba(p.c, p.o) + ',' + rgba(p.c, p.o) + ')'); }
        else { const g = gradientCss(p, Math.max(n.w, 0.01), Math.max(n.h, 0.01)); if (g) layers.push(g); }
      }
      if (color && !layers.length) o.backgroundColor = color;
      else { if (color) layers.push('linear-gradient(' + color + ',' + color + ')'); o.backgroundImage = layers.join(','); }
    }
    if (st.r != null) { if (st.r === -1) o.borderRadius = '50%'; else if (Array.isArray(st.r)) o.borderRadius = st.r.map(v => v + 'px').join(' '); else o.borderRadius = st.r + 'px'; }
    const sh = [];
    if (st.e) for (const e of st.e) {
      if (e.y === 'DROP_SHADOW' || e.y === 'INNER_SHADOW') sh.push((e.y === 'INNER_SHADOW' ? 'inset ' : '') + (e.of ? e.of[0] : 0) + 'px ' + (e.of ? e.of[1] : 0) + 'px ' + e.rd + 'px ' + (e.sp || 0) + 'px ' + rgba(e.c, e.c[3]));
      else if (e.y === 'LAYER_BLUR') o.filter = 'blur(' + (e.rd / 2) + 'px)';
      else if (e.y === 'BACKGROUND_BLUR') { o.backdropFilter = 'blur(' + (e.rd / 2) + 'px)'; o.webkitBackdropFilter = o.backdropFilter; }
    }
    if (st.s) {
      const [r, g, b, a, w, al] = st.s; const col = rgba([r, g, b], a);
      if (al === 'INSIDE') sh.push('inset 0 0 0 ' + w + 'px ' + col);
      else if (al === 'OUTSIDE') sh.push('0 0 0 ' + w + 'px ' + col);
      else { sh.push('inset 0 0 0 ' + (w / 2) + 'px ' + col); sh.push('0 0 0 ' + (w / 2) + 'px ' + col); }
    }
    if (sh.length) o.boxShadow = sh.join(',');
    if (st.bm) o.mixBlendMode = st.bm.toLowerCase().replace(/_/g, '-').replace('linear-burn', 'color-burn').replace('linear-dodge', 'color-dodge');
    return o;
  }
  const IDM = [1, 0, 0, 1, 0, 0];
  const mat = m => 'matrix(' + (m || IDM).map(v => +(+v).toFixed(4)).join(',') + ')';

  // ---------- player ----------
  class ProtoPlayer {
    constructor(host, data, opts) {
      this.host = host; this.data = data; this.o = Object.assign({ fit: true, keys: true, wheel: true }, opts || {});
      this.crop = this.o.crop || null;
      this.dev = this.o.device; this.view = this.crop ? [this.crop[2], this.crop[3]] : this.dev; this.timers = new Set(); this.history = []; this.busy = 0; this.anims = []; this.listeners = [];
      this.overlays = [];
      host.classList.add('pp-host');
      this.vp = document.createElement('div'); this.vp.className = 'pp-vp';
      this.vp.style.cssText = 'position:absolute;left:0;top:0;width:' + this.view[0] + 'px;height:' + this.view[1] + 'px;overflow:hidden;transform-origin:0 0;';
      host.appendChild(this.vp);
      this.stage = document.createElement('div'); this.stage.className = 'pp-stage';
      this.stage.style.cssText = 'position:absolute;left:0;top:0;width:' + this.dev[0] + 'px;height:' + this.dev[1] + 'px;' + (this.crop ? 'transform:translate(' + (-this.crop[0]) + 'px,' + (-this.crop[1]) + 'px);' : '');
      this.vp.appendChild(this.stage);
      this.spriteCss();
      this.fit(); this._ro = new ResizeObserver(() => this.fit()); this._ro.observe(host);
      this.bindGlobal();
      this.onscene = this.o.onscene || null;
      if (this.o.start) this.show(this.o.start);
    }
    spriteCss() {
      if (!this.data._cls) {
        const id = 'pp' + Math.random().toString(36).slice(2, 7); this.data._cls = id;
        const css = '.pp-n{position:absolute;left:0;top:0;transform-origin:0 0;box-sizing:border-box}.pp-root{position:absolute!important}\n' + this.o.atlases.map((u, i) => '.' + id + 'a' + i + '{background-image:url("' + u + '")}').join('\n');
        const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
      }
    }
    fit() {
      if (!this.o.fit) return;
      const W = this.host.clientWidth || this.view[0];
      const s = Math.min(this.o.maxScale || 1, W / this.view[0]);
      this.scale = s; this.vp.style.transform = 'scale(' + s + ')';
      if (!this.o.fixedHeight) this.host.style.height = (this.view[1] * s) + 'px';
    }
    destroy() { this.clearTimers(); this._ro.disconnect(); this.listeners.forEach(([t, e, f, o]) => t.removeEventListener(e, f, o)); this.host.innerHTML = ''; }
    on(t, e, f, o) { t.addEventListener(e, f, o); this.listeners.push([t, e, f, o]); }

    // ----- DOM build -----
    build(n, parentW, parentH) {
      const el = document.createElement('div'); el._n = n; el.className = 'pp-n';
      this.applyBox(el, n);
      const css = cssOf(n); for (const k in css) el.style[k] = css[k];
      if (n.c) el.style.overflow = 'hidden';
      if (n.bgsp) el.appendChild(this.spriteEl(n.bgsp, n));
      if (n.sp) { el.appendChild(this.spriteEl(n.sp, n)); }
      if (n.k) for (const c of n.k) el.appendChild(this.build(c));
      if (n.rx || n.v) this.wire(el, n);
      return el;
    }
    applyBox(el, n) {
      el.style.width = Math.max(n.w, 0) + 'px'; el.style.height = Math.max(n.h, 0) + 'px';
      el.style.transform = mat(n.m);
      el.style.opacity = n.o == null ? 1 : n.o;
    }
    spriteEl(key, n) {
      const s = this.data.sprites[key]; const i = document.createElement('i'); if (!s) { i.className = 'pp-sp'; return i; } i.className = 'pp-sp ' + this.data._cls + 'a' + s[0]; i._sk = key;
      const A = this.data.atlas[s[0]]; const [ai, sx, sy, pw, ph, ox, oy, rw, rh] = s;
      const pxX = n.w < 1, pxY = n.h < 1, w = Math.max(n.w, 0.01), h = Math.max(n.h, 0.01);
      const L = pxX ? ox + 'px' : (ox / w * 100) + '%', T = pxY ? oy + 'px' : (oy / h * 100) + '%';
      const Wd = pxX ? rw + 'px' : (rw / w * 100) + '%', Ht = pxY ? rh + 'px' : (rh / h * 100) + '%';
      i.style.cssText = 'position:absolute;pointer-events:none;left:' + L + ';top:' + T + ';width:' + Wd + ';height:' + Ht + ';' +
        'background-size:' + (A[0] / pw * 100) + '% ' + (A[1] / ph * 100) + '%;background-position:' + (A[0] === pw ? 0 : sx / (A[0] - pw) * 100) + '% ' + (A[1] === ph ? 0 : sy / (A[1] - ph) * 100) + '%;background-repeat:no-repeat;';
      return i;
    }

    // ----- show / navigate -----
    sceneData(id) { return this.data.scenes[id]; }
    mountRoot(id) {
      const n = this.sceneData(id); if (!n) return null;
      const wrap = document.createElement('div'); wrap.className = 'pp-scene'; wrap._sid = id;
      wrap.style.cssText = 'position:absolute;left:0;top:0;width:' + this.dev[0] + 'px;height:' + this.dev[1] + 'px;overflow:hidden;';
      const scroll = n.h > this.dev[1] + 1 && (!n.ov || /VERT|BOTH/.test(n.ov));
      const scroller = document.createElement('div'); scroller.className = 'pp-scroller';
      scroller.style.cssText = 'position:absolute;inset:0;' + (scroll ? 'overflow-y:auto;overflow-x:hidden;scrollbar-width:none;overscroll-behavior:contain;' : 'overflow:hidden;');
      const sizer = document.createElement('div'); sizer.style.cssText = 'position:relative;width:' + n.w + 'px;height:' + n.h + 'px;';
      // split fixed children
      const rootN = Object.assign({}, n, { k: (n.k || []).filter(c => c.sb !== 'FIXED') });
      const fixedN = (n.k || []).filter(c => c.sb === 'FIXED');
      const root = this.build(rootN); root.style.transform = 'none'; root.classList.add('pp-root');
      sizer.appendChild(root); scroller.appendChild(sizer); wrap.appendChild(scroller);
      if (fixedN.length) {
        const fl = document.createElement('div'); fl.className = 'pp-fixed'; fl.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
        for (const c of fixedN) {
          let cc = c;
          const y = (c.m || IDM)[5]; if (scroll && y + c.h > this.dev[1]) { const m = (c.m || IDM).slice(); m[5] = this.dev[1] - (n.h - y); cc = Object.assign({}, c, { m }); }
          const e = this.build(cc); e.style.pointerEvents = 'auto'; fl.appendChild(e);
        }
        wrap.appendChild(fl);
      }
      wrap._root = root; wrap._scroller = scroller; wrap._node = n;
      return wrap;
    }
    show(id) {
      this.finishAll(); this.clearTimers();
      const w = this.mountRoot(id); if (!w) return;
      this.stage.innerHTML = ''; this.stage.appendChild(w); this.cur = w; this.curId = id; this.history = [];
      this.entered();
    }
    entered() {
      if (this.onscene) this.onscene(this.curId, this);
      this.startTimers(this.cur);
    }
    startTimers(scope) {
      // scene-level timeout on root node
      const n = scope._node;
      if (n && n.rx) for (const r of n.rx) if (r.t === 'AFTER_TIMEOUT') this.later(() => this.run(r.a, null, scope), (r.to || 0) * 1000, scope);
      // nested timers
      scope.querySelectorAll('.pp-n').forEach(el => this.armTimers(el));
    }
    armTimers(el) {
      const n = el._n; if (!n || !n.rx || el === this.cur?._root) return;
      for (const r of n.rx) if (r.t === 'AFTER_TIMEOUT') { const gen = el._gen || 0; this.later(() => { if ((el._gen || 0) === gen && el.isConnected) this.run(r.a, el); }, (r.to || 0) * 1000, el); }
    }
    later(f, ms, owner) { const t = setTimeout(() => { this.timers.delete(t); if (this.paused) { this._pausedQ = this._pausedQ || []; this._pausedQ.push(f); return; } f(); }, Math.max(ms, 16)); this.timers.add(t); return t; }
    clearTimers() { this.timers.forEach(t => clearTimeout(t)); this.timers.clear(); }
    finishAll() { this.anims.forEach(a => { try { a.finish(); } catch (e) { } }); this.anims = []; }

    // ----- triggers -----
    rxOf(el, types) { const n = el._n; return (n && n.rx || []).filter(r => types.includes(r.t)); }
    wire(el, n) {
      if (el._wired) return; el._wired = true;
      const has = t => this.rxOf(el, t).length > 0;
      if (has(['ON_CLICK', 'ON_TAP', 'ON_PRESS', 'MOUSE_DOWN'])) el.style.cursor = 'pointer';
      if (has(['ON_DRAG'])) el.style.cursor = 'grab';
      el.addEventListener('click', e => { const rs = this.rxOf(el, ['ON_CLICK', 'ON_TAP']); if (!rs.length) return; e.stopPropagation(); this.run(rs[0].a, el); });
      el.addEventListener('pointerdown', e => {
        const ps = this.rxOf(el, ['ON_PRESS', 'MOUSE_DOWN']); if (ps.length) { e.stopPropagation(); this.run(ps[0].a, el); return; }
        const ds = this.rxOf(el, ['ON_DRAG']); if (!ds.length) return; e.stopPropagation();
        const x0 = e.clientX, y0 = e.clientY;
        const mv = ev => { if (Math.hypot(ev.clientX - x0, ev.clientY - y0) > 12) { up(); this.run(ds[0].a, el); } };
        const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
        window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
      });
      el.addEventListener('mouseenter', () => {
        const hs = this.rxOf(el, ['ON_HOVER', 'MOUSE_ENTER']); if (!hs.length || el._hov) return;
        el._hov = { vid: el._n._vid || el._n.v, tr: hs[0].a[0] && hs[0].a[0].tr, revert: hs[0].t === 'ON_HOVER' };
        this.run(hs[0].a, el);
      });
      el.addEventListener('mouseleave', () => {
        const h = el._hov; el._hov = null;
        if (h && h.revert && h.vid && (el._n._vid || el._n.v) !== h.vid) this.swapVariant(el, h.vid, h.tr);
        const ls = this.rxOf(el, ['MOUSE_LEAVE']); if (ls.length) this.run(ls[0].a, el);
      });
    }
    bindGlobal() {
      this.on(window, 'keydown', e => {
        if (!this.o.keys || this.paused) return;
        if (this.o.keyGate && !this.o.keyGate(this)) return;
        const k = e.keyCode; if (this.press(k)) e.preventDefault();
      });
      let lastEv = 0, fired = false, acc = 0;
      this.on(this.host, 'wheel', e => {
        if (!this.o.wheel) return;
        const dir = e.deltaY > 0 ? 40 : 38;
        if (!this.hasKey(dir)) return; // let the page scroll at the ends
        e.preventDefault();
        const now = Date.now();
        if (now - lastEv > 220) { fired = false; acc = 0; }
        lastEv = now;
        if (fired || this.busy) return;
        acc += e.deltaY; if (Math.abs(acc) < 12) return;
        fired = true; this.press(dir);
      }, { passive: false });
      let ty = null;
      this.on(this.host, 'touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
      this.on(this.host, 'touchend', e => { if (ty == null) return; const dy = ty - e.changedTouches[0].clientY; ty = null; if (Math.abs(dy) > 40) this.press(dy > 0 ? 40 : 38); }, { passive: true });
    }
    keyReactions() { const out = []; const n = this.cur && this.cur._node; if (n && n.rx) for (const r of n.rx) if (r.t === 'ON_KEY_DOWN') out.push(r); return out; }
    hasKey(k) { return this.keyReactions().some(r => (r.k || []).includes(k)); }
    press(k) {
      if (this.busy) return this.hasKey(k);
      for (const r of this.keyReactions()) if ((r.k || []).includes(k)) { this.run(r.a, null); return true; }
      return false;
    }

    // ----- actions -----
    run(actions, el, scope, isHover) {
      for (const a of actions || []) {
        if (a.y === 'NODE' && a.n === 'CHANGE_TO' && !el) { this.go(a.d, a.tr); continue; }
        if (a.y === 'NODE' && a.n === 'CHANGE_TO' && el) { let t = el; while (t && t._n && !t._n.v && !t._n._vid) t = t.parentNode; this.swapVariant(t && t._n ? t : el, a.d, a.tr); }
        else if (a.y === 'NODE' && a.d && this.data.scenes[a.d] && !this.data.scenes[a.d].set) {
          if (a.n === 'OVERLAY' || a.n === 'SWAP') this.openOverlay(a.d, a.tr, a.op);
          else this.go(a.d, a.tr);
        }
        else if (a.y === 'BACK') this.back();
        else if (a.y === 'CLOSE') this.closeOverlay();
        else if (a.y === 'URL' && a.url) window.open(a.url, '_blank', 'noopener');
      }
    }
    go(id, tr, isBack) {
      if (!this.data.scenes[id]) return;
      this.finishAll(); this.clearTimers();
      while (this.overlays.length) this.closeOverlay(true);
      const from = this.cur; const to = this.mountRoot(id);
      if (!isBack) this.history.push({ id: this.curId, tr });
      this.cur = to; this.curId = id;
      const y = tr && tr.y;
      const dur = Math.max(0.001, tr && tr.d != null ? tr.d : 0.3) * 1000; const ease = easingOf(tr);
      this.busy++;
      const done = () => { this.busy = Math.max(0, this.busy - 1); this.entered(); };
      if (!tr || y === 'INSTANT' || !from) { this.stage.innerHTML = ''; this.stage.appendChild(to); done(); return; }
      if (y === 'SMART_ANIMATE') { this.smart(from, to, dur, ease, done); return; }
      this.stage.appendChild(to);
      const W = this.dev[0], H = this.dev[1];
      const dir = tr.dir || 'LEFT';
      const off = { LEFT: [W, 0], RIGHT: [-W, 0], TOP: [0, H], BOTTOM: [0, -H] }[dir] || [W, 0];
      const A = (el, kf) => { const an = el.animate(kf, { duration: dur, easing: ease, fill: 'both' }); this.anims.push(an); return an; };
      let main;
      if (y === 'DISSOLVE') main = A(to, [{ opacity: 0 }, { opacity: 1 }]);
      else if (y === 'MOVE_IN') main = A(to, [{ transform: `translate(${off[0]}px,${off[1]}px)` }, { transform: 'none' }]);
      else if (y === 'MOVE_OUT') { this.stage.insertBefore(to, from); main = A(from, [{ transform: 'none' }, { transform: `translate(${-off[0]}px,${-off[1]}px)` }]); }
      else if (y === 'PUSH') { A(from, [{ transform: 'none' }, { transform: `translate(${-off[0]}px,${-off[1]}px)` }]); main = A(to, [{ transform: `translate(${off[0]}px,${off[1]}px)` }, { transform: 'none' }]); }
      else if (y === 'SLIDE_IN') { A(from, [{ transform: 'none', filter: 'brightness(1)' }, { transform: `translate(${-off[0] * 0.3}px,${-off[1] * 0.3}px)`, filter: 'brightness(0.8)' }]); main = A(to, [{ transform: `translate(${off[0]}px,${off[1]}px)` }, { transform: 'none' }]); }
      else if (y === 'SLIDE_OUT') { this.stage.insertBefore(to, from); A(to, [{ transform: `translate(${off[0] * 0.3}px,${off[1] * 0.3}px)` }, { transform: 'none' }]); main = A(from, [{ transform: 'none' }, { transform: `translate(${-off[0]}px,${-off[1]}px)` }]); }
      else main = A(to, [{ opacity: 0 }, { opacity: 1 }]);
      main.onfinish = () => { this.anims.forEach(a => a.cancel()); this.anims = []; if (from && from.parentNode) from.remove(); done(); };
    }
    back() {
      const h = this.history.pop(); if (!h) return;
      let tr = h.tr ? Object.assign({}, h.tr) : null;
      if (tr) {
        const inv = { LEFT: 'RIGHT', RIGHT: 'LEFT', TOP: 'BOTTOM', BOTTOM: 'TOP' };
        if (tr.dir) tr.dir = inv[tr.dir];
        if (tr.y === 'MOVE_IN') tr.y = 'MOVE_OUT'; else if (tr.y === 'MOVE_OUT') tr.y = 'MOVE_IN'; else if (tr.y === 'SLIDE_IN') tr.y = 'SLIDE_OUT'; else if (tr.y === 'SLIDE_OUT') tr.y = 'SLIDE_IN';
      }
      this.go(h.id, tr, true);
    }
    openOverlay(id, tr, pos) {
      const n = this.data.scenes[id]; if (!n) return;
      const layer = document.createElement('div'); layer.className = 'pp-ov'; layer.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.45);';
      const el = this.build(Object.assign({}, n, { m: null })); el.style.transform = 'none'; el.style.position = 'absolute';
      const W = this.dev[0], H = this.dev[1];
      let x = (W - n.w) / 2, y = (H - n.h) / 2;
      if (/BOTTOM/.test(pos || 'BOTTOM_CENTER') || n.h > H * 0.4) y = H - n.h;
      el.style.left = x + 'px'; el.style.top = y + 'px';
      layer.appendChild(el); layer.addEventListener('click', e => { if (e.target === layer) this.closeOverlay(); });
      this.vp.appendChild(layer); this.overlays.push(layer);
      const dur = (tr && tr.d || 0.3) * 1000, ease = easingOf(tr);
      layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur * 0.8, easing: 'ease-out' });
      if (tr && /MOVE|SLIDE/.test(tr.y)) el.animate([{ transform: 'translateY(' + (n.h) + 'px)' }, { transform: 'none' }], { duration: dur, easing: ease });
      el._node = n; this.startTimers(Object.assign(el, { _node: n }));
    }
    closeOverlay(instant) {
      const l = this.overlays.pop(); if (!l) return;
      if (instant) { l.remove(); return; }
      const a = l.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-in' }); a.onfinish = () => l.remove();
    }

    // ----- smart animate -----
    animatableStyle(n, extraCss) {
      const s = { transform: mat(n.m), width: Math.max(n.w, 0) + 'px', height: Math.max(n.h, 0) + 'px', opacity: n.o == null ? 1 : n.o };
      const c = extraCss || cssOf(n);
      if (c.backgroundColor) s.backgroundColor = c.backgroundColor;
      if (c.borderRadius) s.borderRadius = c.borderRadius;
      if (c.boxShadow) s.boxShadow = c.boxShadow;
      return s;
    }
    smart(fromWrap, toWrap, dur, ease, done) {
      const pairs = [], fadesIn = [], fadesOut = [];
      const fromRoot = fromWrap._root, toRoot = toWrap._root;
      this.matchTree(fromRoot, toRoot, pairs, fadesIn, fadesOut);
      // fixed layers: match by index
      const ff = fromWrap.querySelector('.pp-fixed'), tf = toWrap.querySelector('.pp-fixed');
      if (ff && tf) { const fk = [...ff.children], tk = [...tf.children]; tk.forEach((t, i) => { const f = fk.find(x => x._n.n === t._n.n); if (f) { this.matchTree(f, t, pairs, fadesIn, fadesOut, true); } else fadesIn.push(t); }); }
      else if (tf) [...tf.children].forEach(t => fadesIn.push(t));
      // keep scroll pos
      toWrap._scroller.scrollTop = 0;
      this.stage.appendChild(toWrap);
      const opt = { duration: dur, easing: ease };
      const all = [];
      for (const [a, b, cross] of pairs) {
        const fs = this.animatableStyle(a._n), ts = this.animatableStyle(b._n);
        const kf0 = {}, kf1 = {}; let any = false;
        for (const k in ts) { if (fs[k] !== ts[k] && fs[k] != null) { kf0[k] = fs[k]; kf1[k] = ts[k]; any = true; } }
        if (any) all.push(b.animate([kf0, kf1], opt));
        if (cross) {
          // crossfade sprites: old sprite overlay fades out, new fades in
          const oldSp = a.querySelector(':scope > .pp-sp'), newSp = b.querySelector(':scope > .pp-sp');
          if (oldSp) { const c = oldSp.cloneNode(true); b.insertBefore(c, b.firstChild); const an = c.animate([{ opacity: 1 }, { opacity: 0 }], opt); an.onfinish = () => c.remove(); all.push(an); }
          if (newSp) all.push(newSp.animate([{ opacity: 0 }, { opacity: 1 }], opt));
        }
      }
      for (const b of fadesIn) { const o = b._n.o == null ? 1 : b._n.o; all.push(b.animate([{ opacity: 0 }, { opacity: o }], opt)); }
      for (const [a, parentB, idx] of fadesOut) {
        const c = a; c.style.pointerEvents = 'none';
        parentB.insertBefore(c, parentB.children[idx] || null);
        const an = c.animate([{ opacity: c.style.opacity || 1 }, { opacity: 0 }], opt); an.onfinish = () => c.remove(); all.push(an);
      }
      fromWrap.remove();
      this.anims.push(...all);
      if (!all.length) { done(); return; }
      let left = all.length; const fin = () => { if (--left === 0) { this.anims = []; done(); } };
      all.forEach(a => { a.onfinish = (old => () => { old && old(); fin(); })(a.onfinish); a.oncancel = fin; });
    }
    matchTree(a, b, pairs, fadesIn, fadesOut, isPair) {
      const an = a._n, bn = b._n;
      const cross = (an.sp || bn.sp) && an.sp !== bn.sp;
      pairs.push([a, b, cross]);
      const ak = [...a.children].filter(x => x.classList.contains('pp-n'));
      const bk = [...b.children].filter(x => x.classList.contains('pp-n'));
      const used = new Set();
      for (const bc of bk) {
        const ac = ak.find(x => !used.has(x) && x._n.n === bc._n.n);
        if (ac) { used.add(ac); this.matchTree(ac, bc, pairs, fadesIn, fadesOut); }
        else fadesIn.push(bc);
      }
      ak.forEach((ac, i) => { if (!used.has(ac)) fadesOut.push([ac, b, i]); });
    }
    swapVariant(el, vid, tr) {
      const vn = this.data.scenes[vid]; if (!vn) return;
      const cur = el._n;
      if ((cur._vid || cur.v) === vid) return;
      const nn = Object.assign({}, vn, { n: cur.n, m: cur.m, o: cur.o, v: vid, _vid: vid, set: undefined, i: undefined });
      if (cur.sb) nn.sb = cur.sb;
      const fresh = this.build(nn);
      const holder = document.createElement('div'); holder.className = 'pp-n'; holder._n = cur;
      [...el.children].forEach(k => holder.appendChild(k));
      [...fresh.children].forEach(k => el.appendChild(k));
      el._n = nn;
      // own box/css
      const oc = cssOf(cur), nc = cssOf(nn);
      for (const k in oc) if (!(k in nc)) el.style[k] = '';
      for (const k in nc) el.style[k] = nc[k];
      el.style.width = nn.w + 'px'; el.style.height = nn.h + 'px'; el.style.overflow = nn.c ? 'hidden' : '';
      el._gen = (el._gen || 0) + 1;
      const smart = tr && tr.y === 'SMART_ANIMATE';
      const dur = Math.max(1, (tr && tr.d != null ? tr.d : 0) * 1000), ease = easingOf(tr);
      const opt = { duration: dur, easing: ease };
      const arm = () => { if (!el.isConnected) return; this.armTimers(el); el.querySelectorAll('.pp-n').forEach(x => this.armTimers(x)); };
      if (!smart) {
        if (tr && tr.y === 'DISSOLVE') [...el.children].forEach(k => k.animate([{ opacity: 0 }, { opacity: getComputedStyle(k).opacity }], opt));
        if (tr && tr.y && tr.y !== 'INSTANT') { const t = setTimeout(arm, dur); this.timers.add(t); } else arm();
        return;
      }
      const pairs = [], fadesIn = [], fadesOut = [];
      this.matchTree(holder, el, pairs, fadesIn, fadesOut);
      for (const [a, b, cross] of pairs) {
        if (b === el) {
          const fsr = this.animatableStyle(cur), tsr = this.animatableStyle(nn); const k0 = {}, k1 = {}; let any = false;
          for (const k of ['width', 'height', 'backgroundColor', 'borderRadius', 'boxShadow']) if (fsr[k] !== tsr[k] && fsr[k] != null && tsr[k] != null) { k0[k] = fsr[k]; k1[k] = tsr[k]; any = true; }
          if (any) el.animate([k0, k1], opt);
          continue;
        }
        const fs = this.animatableStyle(a._n), ts = this.animatableStyle(b._n);
        const kf0 = {}, kf1 = {}; let any = false;
        for (const k in ts) if (fs[k] !== ts[k] && fs[k] != null) { kf0[k] = fs[k]; kf1[k] = ts[k]; any = true; }
        if (any) b.animate([kf0, kf1], opt);
        if (cross) {
          const oldSp = a.querySelector(':scope > .pp-sp'), newSp = b.querySelector(':scope > .pp-sp');
          if (oldSp) { const c = oldSp.cloneNode(true); b.insertBefore(c, b.firstChild); const an = c.animate([{ opacity: 1 }, { opacity: 0 }], opt); an.onfinish = () => c.remove(); }
          if (newSp) newSp.animate([{ opacity: 0 }, { opacity: 1 }], opt);
        }
      }
      for (const b of fadesIn) { const o = b._n.o == null ? 1 : b._n.o; b.animate([{ opacity: 0 }, { opacity: o }], opt); }
      for (const [a, parentB, idx] of fadesOut) { a.style.pointerEvents = 'none'; parentB.insertBefore(a, parentB.children[idx] || null); const an = a.animate([{ opacity: +(a.style.opacity || 1) }, { opacity: 0 }], opt); an.onfinish = () => a.remove(); }
      const t = setTimeout(arm, dur); this.timers.add(t);
    }

    // ----- helpers -----
    clickables() { return [...this.stage.querySelectorAll('.pp-n')].filter(e => e._n && e._n.rx && e._n.rx.some(r => r.t === 'ON_CLICK' || r.t === 'ON_TAP')); }
    tap(dest) {
      for (const el of this.clickables()) for (const r of el._n.rx) if ((r.t === 'ON_CLICK' || r.t === 'ON_TAP') && r.a.some(a => a.d === dest)) { this.run(r.a, el); return true; }
      return false;
    }
    autopilot(steps, loopTo) {
      // steps: [{tap|go: id, wait: ms}] ; scene timers keep running on their own
      this.stopPilot(); let i = 0; const tick = () => {
        if (i >= steps.length) { if (loopTo) { i = 0; this.show(loopTo); this._pilot = setTimeout(tick, steps[0].wait || 2000); } return; }
        const st = steps[i++];
        if (!this.paused) { if (st.tap) { if (!this.tap(st.tap)) this.go(st.tap, st.tr || { y: 'SMART_ANIMATE', d: 0.6, e: 'EASE_IN_AND_OUT' }); } else if (st.go) this.go(st.go, st.tr); else if (st.key) this.press(st.key); }
        else i--;
        this._pilot = setTimeout(tick, (steps[i] && steps[i].wait) || st.next || 2500);
      };
      this._pilot = setTimeout(tick, (steps[0] && steps[0].wait) || 2000);
    }
    stopPilot() { clearTimeout(this._pilot); this._pilot = null; }
    restart(id) { this.stopPilot(); this.show(id || this.o.start); }
    static wrapVariant(data, vid, pad) {
      const v = data.scenes[vid]; if (!v) return null; const p = pad || 0; const key = 'wrap:' + vid;
      if (!data.scenes[key]) data.scenes[key] = { n: 'wrap', i: key, w: v.w + 2 * p, h: v.h + 2 * p, k: [Object.assign({}, v, { m: [1, 0, 0, 1, p, p], v: vid, _vid: vid, set: undefined, i: undefined, I: 1 })] };
      return key;
    }

    // ----- autoplay -----
    pause() { this.paused = true; this.vp.getAnimations({ subtree: true }).forEach(a => a.pause()); }
    resume() { this.paused = false; this.vp.getAnimations({ subtree: true }).forEach(a => a.play()); const q = this._pausedQ || []; this._pausedQ = []; q.forEach(f => f()); }
  }
  ProtoPlayer.spring = springFn;
  global.ProtoPlayer = ProtoPlayer;
})(window);
