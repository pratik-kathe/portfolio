/* Motion case studies: mounts the live Figma prototypes (ProtoPlayer, motion/player.js) into
   `motion` sections of the case study overlay. Parts: fb-stage, fb-loops, fb-curves, fb-mobile,
   si-stage, si-moments, si-grammar, si-bento. Exposes window.MOTION = { mountAll(root), destroyAll() }. */
(function () {
  'use strict';
  const BASE = 'motion/';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const APPS = {
    fuzzybox: { json: 'fuzzybox/fb_runtime.json', atlases: [0, 1, 2, 3].map(i => 'fuzzybox/fb_atlas' + i + '.webp') },
    sitare: { json: 'sitare/si_runtime.json', atlases: [0, 1, 2, 3, 4, 5, 6].map(i => 'sitare/si_atlas' + i + '.webp') },
    bento: { json: 'sitare/sb_runtime.json', atlases: ['sitare/sb_atlas0.webp'] }
  };
  const DATA_V = '20261023b';
  const cache = {};
  const img = u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; });
  function load(app) {
    if (cache[app]) return cache[app];
    const a = APPS[app], atlases = a.atlases.map(u => BASE + u);
    cache[app] = Promise.all([fetch(BASE + a.json + '?v=' + DATA_V).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }), ...atlases.map(img)])
      .then(([data]) => ({ data, atlases }))
      .catch(e => { delete cache[app]; throw e; });
    return cache[app];
  }

  // ---------- lifecycle ----------
  let live = [], timers = [], io = null, cleanups = [];
  const every = (f, ms) => timers.push(setInterval(f, ms));
  function player(host, ctx, opts) {
    const p = new ProtoPlayer(host, ctx.data, Object.assign({ atlases: ctx.atlases, keys: false, wheel: false }, opts));
    live.push(p); host._player = p; if (io) io.observe(host);
    return p;
  }
  function destroyAll() {
    live.splice(0).forEach(p => { try { p.stopPilot(); p.destroy(); } catch (e) { } });
    timers.splice(0).forEach(clearInterval);
    cleanups.splice(0).forEach(f => { try { f(); } catch (e) { } });
    if (io) { io.disconnect(); io = null; }
  }
  function mountAll(root) {
    destroyAll();
    io = new IntersectionObserver(es => es.forEach(e => { const p = e.target._player; e.target._vis = e.isIntersecting; if (!p) return; e.isIntersecting ? p.resume() : p.pause(); }), { threshold: 0.05 });
    root.querySelectorAll('.mo[data-part]').forEach(el => {
      const part = el.dataset.part, fn = PARTS[part]; if (!fn) return;
      const app = part === 'si-bento' ? 'bento' : part.startsWith('fb') ? 'fuzzybox' : 'sitare';
      el.innerHTML = '<div class="mo-load">Loading the prototype…</div>';
      load(app).then(ctx => { if (!el.isConnected) return; el.innerHTML = ''; fn(el, ctx); })
        .catch(() => { if (el.isConnected) el.innerHTML = '<p class="mo-load">The prototype could not load. Reload the page to try again.</p>'; });
    });
  }
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const spec = rows => '<dl class="mo-spec">' + rows.map(([a, b, g]) => '<div><dt>' + a + '</dt><dd' + (g ? ' class="g"' : '') + '>' + b + '</dd></div>').join('') + '</dl>';
  const visible = (el, min) => { const r = el.getBoundingClientRect(), vh = innerHeight; const seen = Math.min(r.bottom, vh) - Math.max(r.top, 0); return seen > r.height * (min || 0.45); };

  // ======================= FuzzyBox =======================
  const FB_FOLDS = [['Hero', '1:21436'], ['Stories', '1:21524'], ['Viewfinder', '1:21717'], ['Product', '1:23518'], ['Service', '1:23596'],
    ['Gallery', '1:21072'], ['Gossip', '1:23998'], ['Creators', '1:24191'], ['Brands', '1:24477'], ['Collaborate', '1:24685'], ['Footer', '1:25007']];
  const CUT = { y: 'SMART_ANIMATE', d: 0.8, e: 'EASE_IN_AND_OUT' };

  function fbStage(el, ctx) {
    const box = h(`<div class="mo-stage">
      <div class="mo-screen"><div class="mo-chrome" aria-hidden="true"><i></i><i></i><i></i><span class="url">fuzzybox.live</span><span class="tc">00:00:00</span></div>
        <div class="mo-host mo-desk"></div>
        <button class="mo-cue" type="button">Click to take the wheel · <b>scroll</b> or <b>↓ ↑</b></button></div>
      <div class="mo-deck">
        <button class="mo-btn" type="button" data-a="auto" aria-pressed="${!RM}">Autoplay</button>
        <button class="mo-btn" type="button" data-a="up"><kbd>↑</kbd> Previous fold</button>
        <button class="mo-btn" type="button" data-a="down"><kbd>↓</kbd> Next fold</button>
        <button class="mo-btn" type="button" data-a="intro">Replay intro</button>
        <span class="mo-read">Frame <b class="fn">—</b> · Cut <b class="fc">—</b></span>
      </div>
      <div class="mo-chips" role="group" aria-label="Jump to a fold"></div></div>`);
    el.appendChild(box);
    const q = s => box.querySelector(s), host = q('.mo-host');
    let driving = false, auto = !RM, idle = 0, t0 = performance.now();
    const chips = FB_FOLDS.map(([name, id], i) => { const b = h(`<button class="mo-chip" type="button"><small>${String(i + 1).padStart(2, '0')}</small>${name}</button>`); q('.mo-chips').appendChild(b); b.onclick = () => { setAuto(false); P.go(id, CUT); }; return [b, id]; });
    const P = player(host, ctx, { start: '1:21264', device: [1440, 900], keys: true, keyGate: () => driving && visible(host),
      onscene: id => { const s = ctx.data.scenes[id]; q('.fn').textContent = s ? s.n : id; chips.forEach(([b, cid]) => b.classList.toggle('on', cid === id)); } });
    const go0 = P.go.bind(P);
    P.go = (id, tr, back) => { if (tr) q('.fc').textContent = (tr.d || 0) + 's ' + String(tr.e || '').toLowerCase().replace(/_/g, ' '); return go0(id, tr, back); };
    const setAuto = v => { auto = v; idle = 0; q('[data-a="auto"]').setAttribute('aria-pressed', v); };
    const take = () => { if (driving) return; driving = true; P.o.wheel = true; setAuto(false); box.classList.add('driving'); q('.mo-cue').innerHTML = 'Driving · <b>scroll</b> or <b>↓ ↑</b> to change fold'; };
    q('.mo-cue').onclick = take; host.addEventListener('pointerdown', take);
    q('[data-a="auto"]').onclick = () => setAuto(!auto);
    q('[data-a="down"]').onclick = () => { setAuto(false); P.press(40); };
    q('[data-a="up"]').onclick = () => { setAuto(false); P.press(38); };
    q('[data-a="intro"]').onclick = () => { P.restart('1:21264'); t0 = performance.now(); idle = 0; };
    every(() => {
      const s = Math.floor((performance.now() - t0) / 1000); q('.tc').textContent = [s / 3600, s / 60 % 60, s % 60].map(v => String(Math.floor(v)).padStart(2, '0')).join(':');
      if (!auto || P.busy || P.paused || !host._vis) return; idle += 500; if (idle < 3500) return; idle = 0;
      if (P.hasKey(40)) P.press(40); else if (P.keyReactions().length) { P.restart('1:21264'); t0 = performance.now(); }
    }, 500);
  }

  function fbLoops(el, ctx) {
    const d = ctx.data;
    const wrapMany = (key, w, ht, items) => { d.scenes[key] = { n: 'wrap', i: key, w, h: ht, k: items.map(([vid, x, y]) => Object.assign({}, d.scenes[vid], { m: [1, 0, 0, 1, x, y], v: vid, _vid: vid, set: undefined, i: undefined, I: 1 })) }; return key; };
    const CARDS = [
      { t: 'Lights · camera · create', w: 6, scene: ProtoPlayer.wrapVariant(d, '111:2715'), dev: [600, 500], fit: 1, spec: [['Trigger', 'After 0.6s'], ['Motion', 'Smart animate, Slow spring'], ['Duration', '1.25s'], ['Variants', '3, looping']], note: 'The hero illustration. Clapper, spotlight and projector trade places while the script line recolours word by word.' },
      { t: 'Piano keys', w: 6, scene: '1:21524', dev: [1440, 900], crop: [760, 120, 560, 520], ctx: 1, spec: [['Trigger', 'Hover'], ['Motion', 'Smart animate, Quick spring'], ['Duration', '0.74s'], ['Keys', '14 instances']], note: 'Hover the keys. Each one dips and springs back, so running the cursor down the column plays it.' },
      { t: 'Social dock', w: 12, scene: '1:21436', dev: [1440, 900], crop: [500, 786, 940, 100], ctx: 1, spec: [['Trigger', 'Hover and click'], ['Motion', 'Smart animate, Slow spring'], ['Duration', '1.25s'], ['Switch', 'Gentle spring, 1.02s']], note: 'Each icon swells on hover. The FUuN / BORE switch flips the whole site palette.' },
      { t: 'Film cut', w: 8, scene: ProtoPlayer.wrapVariant(d, '210:5016'), dev: [1440, 780], crop: [0, 0, 1440, 560], spec: [['Trigger', 'After 0s'], ['Motion', 'Smart animate, Linear'], ['Duration', '8s per pass'], ['Variants', '4, endless']], note: 'Two strips of brand logos run in opposite directions, like film through a gate.' },
      { t: 'Gossip columns', w: 4, scene: wrapMany('gossip', 728, 900, [['1:15290', 0, 0], ['1:15331', 374, 0]]), dev: [728, 900], spec: [['Trigger', 'After 0s'], ['Motion', 'Linear, 2s per step'], ['Columns', 'Up and down, offset']], note: 'Two image columns drift in opposite directions, so the Gossip Gazette fold keeps moving while it sits still.' },
      { t: 'Creator reel', w: 12, scene: ProtoPlayer.wrapVariant(d, '1:15372'), dev: [2518, 480], spec: [['Trigger', 'After 0s'], ['Motion', 'Smart animate, Linear'], ['Duration', '2s per step'], ['Variants', '16']], note: 'Creator portraits travel across the fold in sixteen steps. Linear timing means no step ever settles.' },
      { t: 'Level meter', w: 4, scene: ProtoPlayer.wrapVariant(d, '1:16157', 12), dev: [373, 68], fit: 1, spec: [['Trigger', 'After 0s'], ['Motion', 'Linear, 0.8s'], ['Variants', '30']], note: 'An audio level meter under Creators, thirty variants long.' },
      { t: 'Typed form', w: 8, scene: '1:24685', dev: [1440, 900], crop: [120, 140, 1200, 640], ctx: 1, spec: [['Trigger', 'After 0.2s per letter'], ['Motion', 'Instant swap'], ['Fields', 'Name, message, email, phone'], ['Send', 'Hover, linear 0.3s']], note: 'The contact form types its own placeholder copy, one 0.2s variant per character, with a blinking cursor.' }
    ];
    const grid = h('<div class="mo-grid"></div>'); el.appendChild(grid);
    CARDS.forEach(c => {
      const card = h(`<article class="mo-card w${c.w}"><div class="mo-frame${c.fit ? ' fit' : ''}"><div class="mo-host"></div></div>
        <div class="mo-body"><h3>${c.t}<span>${c.ctx ? 'In context' : 'Component'}</span></h3><p>${c.note}</p>${spec(c.spec)}</div></article>`);
      grid.appendChild(card);
      const host = card.querySelector('.mo-host');
      if (c.fit) host.style.maxWidth = c.dev[0] + 'px';
      player(host, ctx, { start: c.scene, device: c.dev, crop: c.crop });
    });
  }

  function fbCurves(el) {
    const CURVES = [['Slow', 'SLOW', 1.25, 237, 'Icon swells, hero illustration'], ['Quick', 'QUICK', 0.74, 157, 'Piano keys'], ['Linear', 'LINEAR', 2, 113, 'Loops, film, tickers'],
      ['Ease in-out', 'EASE_IN_AND_OUT', 0.8, 99, 'Cuts between folds'], ['Gentle', 'GENTLE', 1.02, 60, 'Intro, theme switch'], ['Bouncy', 'BOUNCY', 0.96, 3, 'Character drop-in']];
    const SPR = { GENTLE: [1, 100, 15], QUICK: [1, 300, 20], BOUNCY: [1, 600, 15], SLOW: [1, 80, 20] };
    const sample = (e, dur) => {
      const pts = [];
      if (SPR[e]) { const f = ProtoPlayer.spring(...SPR[e]); for (let i = 0; i <= 60; i++) pts.push([i / 60, i === 60 ? 1 : f(i / 60 * dur)]); }
      else if (e === 'LINEAR') { for (let i = 0; i <= 60; i++) pts.push([i / 60, i / 60]); }
      else { const b = [0.42, 0, 0.58, 1]; for (let i = 0; i <= 60; i++) { const s = i / 60; pts.push([3 * (1 - s) ** 2 * s * b[0] + 3 * (1 - s) * s * s * b[2] + s ** 3, 3 * (1 - s) ** 2 * s * b[1] + 3 * (1 - s) * s * s * b[3] + s ** 3]); } }
      return pts;
    };
    const grid = h('<div class="mo-curves"></div>'); el.appendChild(grid);
    const W = 120, H = 90, top = 18, Y = y => (top + (1 - y) * (H - top - 6)).toFixed(1);
    const balls = [];
    CURVES.forEach(([name, e, dur, uses, where]) => {
      const pts = sample(e, dur);
      const c = h(`<div class="mo-curve"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${name} easing curve"><line class="ax" x1="0" y1="${H - 6}" x2="${W}" y2="${H - 6}"/><line class="ax" x1="0" y1="${top}" x2="${W}" y2="${top}" stroke-dasharray="2 3"/><polyline class="pa" points="${pts.map(([x, y]) => (x * W).toFixed(1) + ',' + Y(y)).join(' ')}"/><circle class="ba" r="4" cx="0" cy="${H - 6}"/></svg><h4>${name}</h4><p><b>${dur}s</b> · used <b>${uses}</b> times<br>${where}</p></div>`);
      grid.appendChild(c); balls.push([c.querySelector('.ba'), pts, dur * 1000]);
    });
    if (RM) return;
    let raf, start = performance.now(), on = true;
    const step = now => { if (!on) return; balls.forEach(([b, pts, total]) => { const p = Math.max(0, Math.min(1, ((now - start) % (total + 900)) / total)); const [x, y] = pts[Math.round(p * (pts.length - 1))]; b.setAttribute('cx', (x * W).toFixed(1)); b.setAttribute('cy', Y(y)); }); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    cleanups.push(() => { on = false; cancelAnimationFrame(raf); });
  }

  function fbMobile(el, ctx) {
    const box = h(`<div class="mo-split">
      <div class="mo-phone"><div class="mo-host"></div></div>
      <div class="mo-side"><ul class="mo-rows">
        <li><span>Intro</span>Logo, character and headline land on Gentle and Bouncy springs, 0.96 to 1.02s</li>
        <li><span>Folds</span>Swipe up or down for a 0.8s ease-in-out cut</li>
        <li><span>Gallery</span>Cards step every 0.1 to 0.2s with 0.3s smart animate, then hand back to the scroll</li>
        <li><span>Loops</span>Film strip at 8s linear, gossip columns at 2s linear</li></ul>
        <div class="mo-deck"><button class="mo-btn" type="button" data-a="up"><kbd>↑</kbd></button><button class="mo-btn" type="button" data-a="down"><kbd>↓</kbd></button><button class="mo-btn" type="button" data-a="auto" aria-pressed="${!RM}">Autoplay</button><button class="mo-btn" type="button" data-a="intro">Replay intro</button></div></div></div>`);
    el.appendChild(box);
    const q = s => box.querySelector(s), host = q('.mo-host');
    let auto = !RM, idle = 0;
    const P = player(host, ctx, { start: '210:6324', device: [360, 800] });
    const setAuto = v => { auto = v; idle = 0; q('[data-a="auto"]').setAttribute('aria-pressed', v); };
    q('[data-a="up"]').onclick = () => { setAuto(false); P.press(38); };
    q('[data-a="down"]').onclick = () => { setAuto(false); P.press(40); };
    q('[data-a="auto"]').onclick = () => setAuto(!auto);
    q('[data-a="intro"]').onclick = () => { setAuto(true); P.restart('210:6241'); };
    let ty = null;
    host.addEventListener('touchstart', e => { ty = e.touches[0].clientY; setAuto(false); }, { passive: true });
    host.addEventListener('touchend', e => { if (ty == null) return; const dy = ty - e.changedTouches[0].clientY; ty = null; if (Math.abs(dy) > 40) P.press(dy > 0 ? 40 : 38); }, { passive: true });
    every(() => { if (!auto || P.busy || P.paused || !host._vis) return; idle += 500; if (idle < 3500) return; idle = 0; if (P.hasKey(40)) P.press(40); else if (P.keyReactions().length) P.restart('210:6241'); }, 500);
  }

  // ======================= Sitare =======================
  const SPLASH = '32:31912';
  const TOUR = [{ tap: '32:31069', wait: 4300 }, { tap: '32:31484', wait: 2300 }, { tap: '32:32419', wait: 2300 }, { tap: '32:20911', wait: 2500 }, { tap: '32:20971', wait: 2300 },
    { tap: '32:21029', wait: 2300 }, { tap: '32:29141', wait: 4400 }, { tap: '32:29233', wait: 2300 }, { tap: '32:29003', wait: 2300 }, { tap: '32:22044', wait: 2300 }, { wait: 5000 }];
  const CHAPTERS = [['♈︎', 'Onboarding', 'Splash, walkthrough, sign up', SPLASH], ['♋︎', 'Home', 'Astrologers, horoscope, kundli', '32:22044'],
    ['♎︎', 'Soul Sitare', 'Matchmaking subscription', '32:27137'], ['♏︎', 'Compatibility', 'Seven-question test', '32:26902'], ['♑︎', 'Astrologer app', 'Dashboard and live requests', '211:5636']];

  function siStage(el, ctx) {
    const box = h(`<div class="mo-split rev">
      <div class="mo-side"><ul class="mo-chapters"></ul><p class="mo-now">Screen <b>—</b></p></div>
      <div><div class="mo-phone big"><div class="mo-host"></div></div>
        <div class="mo-deck c"><button class="mo-btn" type="button" data-a="tour" aria-pressed="${!RM}">Guided tour</button><button class="mo-btn" type="button" data-a="back">Back</button><button class="mo-btn" type="button" data-a="restart">Restart</button></div></div></div>`);
    el.appendChild(box);
    const q = s => box.querySelector(s), host = q('.mo-host');
    const btns = CHAPTERS.map(([g, name, sub, id]) => { const li = h(`<li><button type="button"><span class="gl" aria-hidden="true">${g}</span><span><b>${name}</b><small>${sub}</small></span><span class="op">Open</span></button></li>`); q('.mo-chapters').appendChild(li); const b = li.firstElementChild; b.onclick = () => { setTour(false); P.go(id, { y: 'DISSOLVE', d: 0.35, e: 'EASE_IN_AND_OUT' }); }; return [b, id]; });
    const P = player(host, ctx, { start: SPLASH, device: [393, 852],
      onscene: id => { const s = ctx.data.scenes[id]; q('.mo-now b').textContent = s ? s.n.replace('iPhone 14 Pro - ', '#') : id; btns.forEach(([b, cid]) => b.classList.toggle('on', cid === id)); } });
    let touring = false;
    const setTour = v => { touring = v; q('[data-a="tour"]').setAttribute('aria-pressed', v); if (v) { P.show(SPLASH); P.autopilot(TOUR, SPLASH); } else P.stopPilot(); };
    if (!RM) setTour(true);
    host.addEventListener('pointerdown', () => { if (touring) setTour(false); });
    q('[data-a="tour"]').onclick = () => setTour(!touring);
    q('[data-a="back"]').onclick = () => { setTour(false); P.back(); };
    q('[data-a="restart"]').onclick = () => { setTour(false); P.show(SPLASH); };
  }

  function siMoments(el, ctx) {
    const M = [
      { t: 'Subscription sky', s: '32:27137', note: 'The Soul Sitare paywall rotates through five backdrops while the plan cards stay put.', spec: [['Trigger', 'After 1.6s'], ['Motion', 'Smart animate'], ['Curve', 'Slow spring, 1.25s', 1]] },
      { t: 'Match reveal', s: '32:27055', cycle: 9000, note: 'Three matched profiles shuffle their stack every two seconds after the result lands.', spec: [['Trigger', 'After 2s'], ['Motion', 'Variant swap'], ['Curve', 'Slow spring, 1.25s', 1]] },
      { t: 'Profile carousel', s: '32:27537', note: 'A match profile cycles its photos and the progress pips follow along.', spec: [['Trigger', 'After 1s'], ['Motion', 'Variant swap'], ['Curve', 'Slow spring, 1.25s', 1]] },
      { t: 'Incoming request', s: '211:5636', cycle: 6500, note: 'On the astrologer dashboard, a chat request drops in from the top after two seconds.', spec: [['Trigger', 'After 2s'], ['Motion', 'Smart animate'], ['Curve', 'Ease in-out, 0.3s']] },
      { t: 'Compatibility test', s: '32:26902', pilot: ['32:26924', '32:26946', '32:26968', '32:26990', '32:27012', '32:27034', '32:27069'], step: 1700, note: 'Each answer advances the progress bar and swaps the question in place.', spec: [['Trigger', 'Tap Next'], ['Motion', 'Smart animate'], ['Curve', 'Slow spring, 1.25s', 1]] },
      { t: 'Live video call', s: '32:27329', cycle: 6000, note: 'The call timer runs out and a low balance strip rises under the caller.', spec: [['Trigger', 'After 2s'], ['Motion', 'Smart animate'], ['Curve', 'Ease in-out, 0.3s']] },
      { t: 'Sort and filter', s: '32:26537', pilot: ['32:26697', '32:26783', '32:26857', '32:26617'], step: 1500, note: 'Filter categories switch panes in place; the selection glides between rows.', spec: [['Trigger', 'Tap category'], ['Motion', 'Smart animate'], ['Curve', 'Ease in-out, 0.3s']] },
      { t: 'Consultation chat', s: '32:22414', cycle: 6000, note: 'Two seconds into a chat, the timer turns red and a low balance warning slides in.', spec: [['Trigger', 'After 2s'], ['Motion', 'Smart animate'], ['Curve', 'Ease in-out, 0.3s']] }
    ];
    const grid = h('<div class="mo-moments"></div>'); el.appendChild(grid);
    M.forEach(m => {
      const card = h(`<article class="mo-moment"><div class="mo-phone"><div class="mo-host"></div></div><h3>${m.t}</h3><p>${m.note}</p>${spec(m.spec)}</article>`);
      grid.appendChild(card);
      const host = card.querySelector('.mo-host');
      const P = player(host, ctx, { start: m.s, device: [393, 852] });
      host.addEventListener('pointerdown', () => { P._manual = true; P.stopPilot(); });
      if (RM) return;
      if (m.pilot) { const steps = m.pilot.map((id, k) => ({ tap: id, wait: k === 0 ? 2200 : m.step })); steps.push({ wait: 3600 }); P.autopilot(steps, m.s); }
      else if (m.cycle) every(() => { if (!P._manual && host._vis && !document.hidden) P.show(m.s); }, m.cycle);
    });
  }

  function siGrammar(el) {
    const B = [['Smart animate', 'Ease in-out 0.3s', 353], ['Slide in / out', 'Ease in-out 0.3s', 142], ['Smart animate', 'Linear 0.3s', 139],
      ['Move in / out', 'Ease in-out 0.3s', 52], ['Slow spring', '1.25s reveals', 50, 1], ['Gentle and Quick', 'Springs 0.74 to 1.02s', 13, 1], ['Dissolve', 'Overlays', 4]];
    const max = Math.max(...B.map(b => b[2]));
    el.appendChild(h(`<div class="mo-bars">${B.map(([a, b, n, g]) => `<div class="mo-bar"><div><b>${a}</b><small>${b}</small></div><div class="tr"><i class="${g ? 'g' : ''}" style="width:${(n / max * 100).toFixed(1)}%"></i></div><span>${n}</span></div>`).join('')}</div>`));
  }


  // Bento showcase: one animated layout, desktop 1440x900 and mobile 393x2872, every tile a looping component set.
  function siBento(el, ctx) {
    const box = h(`<div class="mo-bento"><div class="mo-screen"><div class="mo-chrome" aria-hidden="true"><i></i><i></i><i></i><span class="url">sitare.app</span><span class="tc">1440 × 900</span></div><div class="mo-host"></div></div></div>`);
    el.appendChild(box);
    player(box.querySelector('.mo-host'), ctx, { start: '4078:5714', device: [1440, 900], cw: true });
  }


  const PARTS = { 'fb-stage': fbStage, 'fb-loops': fbLoops, 'fb-curves': fbCurves, 'fb-mobile': fbMobile, 'si-stage': siStage, 'si-moments': siMoments, 'si-grammar': siGrammar, 'si-bento': siBento };
  window.MOTION = { mountAll, destroyAll };
})();
