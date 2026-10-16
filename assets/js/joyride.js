/* Joyride portfolio: the drive, the roadside stops and the case study pages. */
(() => {

/* ============ CONFIG: contact links, chapters, route, toolkit, dashboard ============ */
const CFG = { email:'kathepratik29@gmail.com', linkedin:'https://www.linkedin.com/in/pratik-kathe-86763b1b9/', resume:'https://drive.google.com/file/d/10RfNOyI53MfQLk3_Z3cHW1KXzABaLdvg/view?usp=sharing' };
const CH = [
  {id:'ignition', exit:'START', name:'Ignition', sub:'Hello'},
  {id:'origins', exit:'EXIT 01', name:'Origins', sub:'Where it started'},
  {id:'route', exit:'EXIT 02', name:'The Route', sub:'How I work'},
  {id:'pits', exit:'EXIT 03', name:'Case Studies', sub:'Selected work'},
  {id:'hood', exit:'EXIT 04', name:'Under the Hood', sub:'My toolkit'},
  {id:'dash', exit:'EXIT 05', name:'Dashboard', sub:'By the numbers'},
  {id:'mirror', exit:'EXIT 06', name:'Rear-view', sub:'Off the clock'},
  {id:'finish', exit:'FINISH', name:'Destination', sub:"Let's talk"}
];
const TRIP_KM = 120;
const TURNS = [
  ['t-straight','START','Read the numbers','Find where people drop off before guessing why.'],
  ['t-right','IN 200 M','Watch someone do the job','Before designing the shortcut. It saved Accessly from batch issue creation.'],
  ['t-round','IN 400 M','Name the real problem','One sentence the whole team agrees on.'],
  ['t-left','IN 600 M','Build the system, not the screen','Tokens, components and accessible states, so the next ten screens are faster.'],
  ['t-uturn','IN 800 M','Test, and turn back if needed','Accessly Extension left the side panel for DevTools after real audits.'],
  ['t-flag','ARRIVING','Ship it with the devs','Annotated specs, focus and error states, and launch-day chai.']
];
const TOOLS = [
  ['Figma','#8B5CF6','Fi','where almost everything starts.'],['Design System','#0E7490','Ds','tokens, components and documented states, built with the product.'],['Accessibility','#15803D','A11','WCAG 2.2 AA/AAA baked into components, not an audit at the end.'],['Interaction Design','#DB2777','Ix','flows, states and the small moments in between.'],
  ['User Research','#B45309','Ur','watch someone do the job before designing the shortcut.'],['Branding','#C2410C','Br','identity, logos and the voice around them.'],['Photoshop','#0284C7','Ps','retouching and mockups.'],['Illustrator','#EA580C','Ai','icons, logos and illustration.'],
  ['Premiere Pro','#4338CA','Pr','case study and demo videos.'],['After Effects','#6D28D9','Ae','motion specs and launch videos.'],['HTML & CSS','#BE123C','Hc','enough to build what I design.'],['AI Assistants','#3F3F46','AI','synthesis, variants and first drafts. Judgement stays mine.']
];
const GAUGES = [
  {n:'Years designing', max:10, v:4.5, unit:'yrs', step:1, dec:1},
  {n:'Screens shipped', max:400, v:300, unit:'+', step:100},
  {n:'Paying customers (Accessly)', max:150, v:100, unit:'+', step:50}
];

const CARS = [
  {n:'The one I drive', d:'A red compact sedan. Sensible boot, very unsensible playlists.', c:'#D7222B',
   body:'M10 72L11 58Q13 50 28 48L66 44L92 27Q100 22 118 22L158 22Q170 22 180 30L198 44L220 47Q230 50 231 60L231 72Z', win:'M96 42L108 28Q112 26 124 26L136 26L136 42ZM142 26L156 26Q166 26 174 32L186 42L142 42Z'},
  {n:'The first one I drew', d:'A boxy hatchback with very optimistic wheels.', c:'#4CC9F0',
   body:'M18 72L20 50Q22 42 38 40L66 38L88 18Q96 14 150 14Q168 14 176 26L196 42Q216 44 220 56L222 72Z', win:'M94 22Q100 18 124 18L124 38H74ZM132 18Q160 18 168 26L182 38H132Z'},
  {n:"The one I'd design next", d:'A quiet electric tourer. Mostly dashboard, honestly.', c:'#F5C842',
   body:'M10 72Q12 56 40 52Q92 24 142 24Q190 26 230 58L232 72Z', win:'M70 50Q104 30 140 30Q170 31 196 50Z'}
];

/* ============ utils ============ */
const $ = (s,r=document) => r.querySelector(s), $$ = (s,r=document) => [...r.querySelectorAll(s)];
const root = document.documentElement; root.classList.add('js');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v,a,b) => Math.max(a,Math.min(b,v)), lerp = (a,b,t) => a+(b-a)*t, smooth = (a,b,x) => { const t = clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };
let seed = 5; const rnd = () => (seed = seed*16807 % 2147483647, (seed-1)/2147483646), R = (a,b) => a + rnd()*(b-a);
const NS = 'http://www.w3.org/2000/svg';
const toastEl = $('#toast'); let toastT; const toast = m => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2600); };
const fmt2 = n => String(n).padStart(2,'0');

/* ============ smooth scroll ============ */
let lenis = null; try { if (window.Lenis && !RM) lenis = new Lenis({lerp:.09, smoothWheel:true}); } catch(e){ lenis = null; }
const tickers = []; let vh = innerHeight;
function frame(t){ if (lenis) lenis.raf(t); for (const f of tickers) f(t); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
const go = sel => { const el = $(sel); if (!el) return; if (lenis) lenis.scrollTo(el, {duration:2, easing:t => 1 - Math.pow(1-t, 3)}); else el.scrollIntoView({behavior: RM ? 'auto' : 'smooth'}); };
$$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.dataset.go); }));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.15});
$$('.rv,#fuel').forEach(el => io.observe(el));
const once = (el, fn, th=.35) => { const o = new IntersectionObserver(es => { if (es[0].isIntersecting){ fn(); o.disconnect(); } }, {threshold:th}); o.observe(el); };

/* ============ sky + stars ============ */
const SKY = [[0,'#2B2152','#E9845E'],[.18,'#1F1F4A','#9A5A82'],[.42,'#121A36','#33355F'],[.7,'#0A0F20','#171D36'],[1,'#060912','#0E1426']];
const hex = h => [1,3,5].map(i => parseInt(h.slice(i,i+2),16)), mix = (a,b,t) => '#' + hex(a).map((v,i) => Math.round(lerp(v, hex(b)[i], t)).toString(16).padStart(2,'0')).join('');
function skyAt(p){ for (let i=0;i<SKY.length-1;i++){ const [p0,a0,b0] = SKY[i], [p1,a1,b1] = SKY[i+1]; if (p <= p1){ const t = (p-p0)/(p1-p0); return [mix(a0,a1,t), mix(b0,b1,t)]; } } return [SKY[4][1], SKY[4][2]]; }
const stars = $('#stars'), sctx = stars.getContext('2d');
function drawStars(){ const d = Math.min(2, devicePixelRatio||1); stars.width = innerWidth*d; stars.height = innerHeight*d; sctx.setTransform(d,0,0,d,0,0); seed = 9;
  for (let i=0;i<240;i++){ const x = R(0,innerWidth), y = R(0,innerHeight), r = R(.3,1.4); sctx.globalAlpha = R(.25,1); sctx.fillStyle = rnd() < .1 ? '#FFE3B0' : '#fff'; sctx.beginPath(); sctx.arc(x,y,r,0,7); sctx.fill(); } }
drawStars();
setInterval(() => { if (nfNow > .5 && !RM){ const s = $('#shoot'); s.style.left = R(40,90)+'%'; s.style.top = R(6,30)+'%'; s.classList.remove('go'); void s.offsetWidth; s.classList.add('go'); } }, 6500);

/* skyline */
(function(){ seed = 13; let s = '<g fill="#140F26">', w = ''; let x = 0;
  while (x < 1600){ const bw = R(40,110), bh = R(70,260); s += `<rect x="${x.toFixed(0)}" y="${(400-bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}"/>`;
    for (let wy = 400-bh+14; wy < 390; wy += 18) for (let wx = x+8; wx < x+bw-10; wx += 14) if (rnd() < .22) w += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="5" height="8" fill="#FFD27A" opacity="${R(.4,.95).toFixed(2)}"/>`;
    x += bw + R(2,10); }
  $('#skyline').innerHTML = s + '</g>' + w + '<rect y="392" width="1600" height="8" fill="#0D0A1A"/>'; })();

/* ============ ROAD ============ */
const main = $('#main'), road = $('#road'), gantries = $('#gantries'), lampSvg = $('#lampsvg'), trailSvg = $('#trailsvg'), roadTop = $('#roadtop'), carLayer = $('#carsvg'), skyEl = $('.sky'), sunEl = $('.sun'), shootEl = $('#shoot');
var lastY = -1, docH = 0, carSet = false, nfNow = 0;
const memo = new WeakMap(); const put = (el, k, v, fn) => { let m = memo.get(el); if (!m) memo.set(el, m = {}); if (m[k] !== v){ m[k] = v; fn(); } };
const setA = (el, k, v) => put(el, 'a' + k, v, () => el.setAttribute(k, v));
const setS = (el, k, v) => put(el, 's' + k, v, () => el.style.setProperty(k, v));
const setT = (el, v) => put(el, 't', v, () => { el.textContent = v; });
const LAYERS = [lampSvg, road, trailSvg, roadTop];
let L = 0, SX = [], SY = [], SL = [], STEP = 5, mainTop = 0, segs = [], mobile = false, RW = 84, gs = [];
const carSVG = s => `<g id="car"><g transform="scale(${s})"><g id="carRev">
  <path id="beams" d="M-16 54L-80 290L80 290L16 54Z" fill="url(#beamG)" opacity="0"/>
  <ellipse cx="0" cy="2" rx="28" ry="61" fill="#000" opacity=".45"/>
  <g fill="#0B0D12"><rect x="-24.5" y="22" width="7" height="17" rx="2.5"/><rect x="17.5" y="22" width="7" height="17" rx="2.5"/><rect x="-24.5" y="-40" width="7" height="17" rx="2.5"/><rect x="17.5" y="-40" width="7" height="17" rx="2.5"/></g>
  <path d="M-19 -52Q-22.5 -36 -22 -8Q-22 28 -20.5 44Q-18 54 -9 56.5L9 56.5Q18 54 20.5 44Q22 28 22 -8Q22.5 -36 19 -52Q10 -57 0 -57Q-10 -57 -19 -52Z" fill="url(#paintG)"/>
  <path d="M-12 49Q0 52 12 49M-10 33Q0 36 10 33" stroke="#7E0F14" stroke-width="1" fill="none" opacity=".7"/>
  <path d="M-16.5 21Q0 25.5 16.5 21L13.5 8Q0 5 -13.5 8Z" fill="#17202F"/>
  <path d="M-13.5 8Q0 5 13.5 8L14 -18Q0 -21 -14 -18Z" fill="#B3121A"/>
  <path d="M-11 -2Q0 -4 11 -2" stroke="#fff" stroke-opacity=".2" stroke-width="2" fill="none"/>
  <path d="M-17.5 19L-14.5 7L-15 -18L-18.5 -14ZM17.5 19L14.5 7L15 -18L18.5 -14Z" fill="#17202F" opacity=".85"/>
  <path d="M-14 -18Q0 -21 14 -18L15.5 -30Q0 -33.5 -15.5 -30Z" fill="#17202F"/>
  <path d="M-16 -42Q0 -45 16 -42" stroke="#7E0F14" stroke-width="1.2" fill="none"/>
  <ellipse cx="-23.5" cy="16" rx="3.2" ry="2.6" fill="#C2161F"/><ellipse cx="23.5" cy="16" rx="3.2" ry="2.6" fill="#C2161F"/>
  <rect x="-7" y="53" width="14" height="2.6" rx="1.3" fill="#1A1D24"/>
  <path d="M-19.5 45L-9 51.5L-9.5 54.5L-17 52ZM19.5 45L9 51.5L9.5 54.5L17 52Z" fill="#FFF6D8"/>
  <g id="tailGlow" opacity=".35"><circle cx="-13" cy="-56" r="16" fill="url(#tailG)"/><circle cx="13" cy="-56" r="16" fill="url(#tailG)"/></g>
  <path d="M-19 -50.5L-8 -55L-8 -53L-17.5 -48ZM19 -50.5L8 -55L8 -53L17.5 -48Z" fill="#FF3B3B"/>
  <rect id="revL" x="-3" y="-56.5" width="6" height="2.5" rx="1.2" fill="#fff" opacity="0"/>
</g></g></g>`;

function buildRoad(){
  mobile = innerWidth <= 820; RW = mobile ? 30 : 84;
  LAYERS.forEach(s => s.style.height = '0px'); gantries.innerHTML = '';
  const W = main.clientWidth, H = main.scrollHeight, mr = main.getBoundingClientRect(); mainTop = mr.top + scrollY;
  LAYERS.forEach(s => { s.setAttribute('viewBox', `0 0 ${W} ${H}`); s.style.width = W+'px'; s.style.height = H+'px'; });
  segs = $$('.ch', main).map((s,i) => { const r = s.getBoundingClientRect(); let cx = 30;
    if (!mobile){ const lr = $('.lane', s).getBoundingClientRect(); cx = lr.left - mr.left + lr.width/2; }
    return {t: r.top - mr.top, b: r.bottom - mr.top, cx}; });
  let d = ''; const n = segs.length;
  segs.forEach((g,i) => {
    g.y1 = i === 0 ? g.t + (g.b - g.t)*.58 : g.t + 70; g.y2 = i === n-1 ? g.b - 150 : g.b - 70;
    const w = mobile ? 5 : 36 * (i%2 ? -1 : 1);
    if (i === 0) d += `M${g.cx} ${g.y1}`; else { const p = segs[i-1], m = (p.y2 + g.y1)/2; d += ` C${p.cx} ${m} ${g.cx} ${m} ${g.cx} ${g.y1}`; }
    d += ` C${g.cx+w} ${g.y1 + (g.y2-g.y1)*.33} ${g.cx-w} ${g.y1 + (g.y2-g.y1)*.66} ${g.cx} ${g.y2}`;
  });
  lampSvg.innerHTML = `<defs><radialGradient id="lampG"><stop offset="0" stop-color="#FFD98A" stop-opacity=".5"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient></defs><g id="lamps"></g>`;
  road.innerHTML = `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="${RW+22}" stroke-linecap="round" transform="translate(0 8)"/>
    <path d="${d}" fill="none" stroke="var(--shoulder)" stroke-width="${RW+8}" stroke-linecap="round"/>
    <path id="rp" d="${d}" fill="none" stroke="var(--asphalt)" stroke-width="${RW}" stroke-linecap="round"/>
    ${mobile ? '' : `<path d="${d}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="${RW-10}"/><path d="${d}" fill="none" stroke="var(--asphalt)" stroke-width="${RW-14}"/>`}`;
  trailSvg.innerHTML = `<path id="trail" d="${d}" fill="none" stroke="#F5C842" stroke-opacity=".13" stroke-width="${RW-16}"/>`;
  roadTop.innerHTML = `<defs><pattern id="chk" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#111"/><rect width="7" height="7" fill="#fff"/><rect x="7" y="7" width="7" height="7" fill="#fff"/></pattern></defs><path d="${d}" fill="none" stroke="#F5C842" stroke-width="${mobile ? 2 : 3}" stroke-dasharray="${mobile ? '10 12' : '20 22'}" opacity=".85"/><g id="finishLine"></g>`;
  carLayer.innerHTML = `<defs><radialGradient id="tailG"><stop offset="0" stop-color="#FF3B3B" stop-opacity=".9"/><stop offset="1" stop-color="#FF3B3B" stop-opacity="0"/></radialGradient><linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF4D0" stop-opacity=".55"/><stop offset="1" stop-color="#FFF4D0" stop-opacity="0"/></linearGradient><linearGradient id="paintG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E0B12"/><stop offset=".5" stop-color="#E3262F"/><stop offset="1" stop-color="#8E0B12"/></linearGradient></defs>${carSVG(mobile ? .5 : 1)}`;
  const rp = $('#rp'); L = rp.getTotalLength(); STEP = 5; SX = []; SY = []; SL = [];
  for (let l = 0; l <= L; l += STEP){ const p = rp.getPointAtLength(l); SX.push(p.x); SY.push(p.y); SL.push(l); }
  const tr = $('#trail'); tr.style.strokeDasharray = L; tr.style.strokeDashoffset = L;
  // finish line
  const last = segs[n-1]; $('#finishLine').innerHTML = `<rect x="${last.cx - RW/2}" y="${last.y2 - 14}" width="${RW}" height="16" fill="url(#chk)"/>`;
  // lamps
  if (!mobile){ let s = ''; let side = 1; for (let l = 260; l < L - 120; l += 380){ const i = Math.round(l/STEP), j = Math.min(i+2, SX.length-1); const dx = SX[j]-SX[i], dy = SY[j]-SY[i], m = Math.hypot(dx,dy)||1;
      const nx = -dy/m*side, ny = dx/m*side, x = SX[i] + nx*(RW/2+26), y = SY[i] + ny*(RW/2+26);
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="80" fill="url(#lampG)" class="lg"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#7E8798"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#FFE7A8"/>`; side *= -1; }
    $('#lamps').innerHTML = s; }
  // gantries
  gantries.innerHTML = ''; gs = [];
  if (!mobile) segs.forEach((g,i) => { if (i === 0) return; const fin = i === n-1; const y = fin ? g.y2 - 230 : g.y1 + 110; const idx = nearest(y); const c = CH[i];
    const el = document.createElement('div'); el.className = 'gantry' + (fin ? ' finish' : ''); el.style.left = SX[idx] + 'px'; el.style.top = y + 'px';
    el.innerHTML = `<span class="bar"></span><span class="post l"></span><span class="post r"></span><div class="board"><span class="exit">${c.exit}</span><b>${c.name}</b><small><span>${c.sub}</span><span>KM ${(SL[idx]/L*TRIP_KM).toFixed(0)}</span></small><svg class="ar"><use href="#i-down"/></svg></div>`;
    gantries.appendChild(el); gs.push({el, y}); });
  car = $('#car'); car.addEventListener('click', honk); beams = $('#beams'); tailGlow = $('#tailGlow'); revL = $('#revL'); trail = tr; lampsG = $('#lamps');
  curLen = tgtLen = lenForY(scrollY + vh*.62 - mainTop); lastLen = curLen;
  docH = document.documentElement.scrollHeight; lastY = -1; carSet = false;
  labelGps();
}
function nearest(y){ let lo = 0, hi = SY.length-1; while (lo < hi){ const m = (lo+hi) >> 1; if (SY[m] < y) lo = m+1; else hi = m; } return lo; }
function lenForY(y){ if (!SY.length) return 0; if (y <= SY[0]) return 0; if (y >= SY[SY.length-1]) return L; return SL[nearest(y)]; }
let car, beams, tailGlow, revL, trail, lampsG, curLen = 0, tgtLen = 0, lastLen = 0, speed = 0, topSpeed = 0, maxKm = 0, ignited = false, finished = false;
buildRoad();
let rbT; const rebuild = () => { clearTimeout(rbT); rbT = setTimeout(() => { vh = innerHeight; buildRoad(); buildSketchLen(); buildMilestones(); measureGeo(); measureTurns(); }, 120); };
addEventListener('resize', () => { rebuild(); drawStars(); });
if (document.fonts) document.fonts.ready.then(rebuild);
new ResizeObserver(rebuild).observe(main);

/* ============ HUD + per-frame drive ============ */
const needle = $('#needle'), spdArc = $('#spdArc'), spdEl = $('#spd'), odoEl = $('#odo'), hudLab = $('#hudLab'), hudBar = $('#hudBar');
let chIdx = -1, ang = 90;
let angT = 90;
tickers.push(() => {
  if (!SY.length) return;
  const y = scrollY, tb = document.body.classList.contains('turbo');
  if (carSet && y === lastY && !tb && !eng && Math.abs(tgtLen - curLen) < .01 && speed < .01 && Math.abs(ang - angT) < .01) return;
  lastY = y; carSet = true;
  tgtLen = lenForY(y + vh*.62 - mainTop);
  curLen = RM ? tgtLen : lerp(curLen, tgtLen, .22);
  const dl = curLen - lastLen; lastLen = curLen;
  const kmh = clamp(Math.abs(dl)*2.4*(tb ? 2 : 1) + (tb ? 150 : 0), 0, 260); speed = lerp(speed, kmh, .1); if (speed > topSpeed) topSpeed = speed;
  const f = curLen/STEP, i = Math.min(Math.floor(f), SX.length-2), t = f - i;
  const x = lerp(SX[i], SX[i+1], t), yy = lerp(SY[i], SY[i+1], t);
  const j = Math.min(i+4, SX.length-1), k = Math.max(0, j-8);
  angT = Math.atan2(SY[j]-SY[k], SX[j]-SX[k]) * 180/Math.PI;
  ang = lerp(ang, angT, .2);
  carX = x; carY = yy; setS(carLayer, 'transform', `translate3d(${x.toFixed(1)}px,${yy.toFixed(1)}px,0) rotate(${(ang-90).toFixed(2)}deg)`);
  setS(trail, 'stroke-dashoffset', (L - curLen).toFixed(1));
  // lights
  const pageP = clamp(y / Math.max(1, docH - vh), 0, 1);
  const nf = smooth(.08, .5, pageP), nfs = nf.toFixed(3); nfNow = nf;
  const [st, sb] = skyAt(pageP); setS(skyEl, '--sky-top', st); setS(skyEl, '--sky-bot', sb);
  setS(stars, '--night-f', nfs); setS(gantries, '--night-f', nfs); setS(shootEl, '--night-f', nfs); if (sunEl) setS(sunEl, '--night-f', nfs);
  setA(beams, 'opacity', (Math.max(ignited ? 1 : 0, smooth(.04,.2,pageP)) * .95).toFixed(2));
  setS(lampSvg, 'opacity', nfs);
  setA(tailGlow, 'opacity', (speed < 6 ? .95 : .35 + nf*.2).toFixed(2));
  setA(revL, 'opacity', dl < -1 ? '1' : '0');
  // gauge
  setA(needle, 'transform', `rotate(${(-135 + speed/260*270).toFixed(1)} 50 50)`); setA(spdArc, 'stroke-dashoffset', (100 - speed/260*100).toFixed(1));
  setT(spdEl, String(Math.round(speed)));
  const km = curLen / L * TRIP_KM; if (km > maxKm) maxKm = km;
  setT(odoEl, km.toFixed(1).padStart(5,'0')); setS(hudBar, '--p', (curLen/L).toFixed(4));
  // chapter
  let c = 0; for (let n=0;n<segs.length;n++) if (yy >= segs[n].t - 40) c = n;
  if (c !== chIdx){ chIdx = c; hudLab.textContent = `${CH[c].exit} · ${CH[c].name.toUpperCase()}`; $$('#gpsList button').forEach((b,n) => { b.classList.toggle('on', n === c); b.classList.toggle('done', n < c); }); }
  for (const g of gs){ const on = yy > g.y - 520; if (g.on !== on){ g.on = on; g.el.classList.toggle('lit', on); } }
  if (eng) engineUpdate();
  if (!finished && curLen > L - 8 && tgtLen > L - 8){ finished = true; finishParty(x, yy); }
});

/* ============ engine (ignition + sound) ============ */
let ac = null, eng = null;
function engineStart(){ try { ac = ac || new (window.AudioContext||window.webkitAudioContext)(); } catch(e){ return; } ac.resume();
  const o1 = ac.createOscillator(), o2 = ac.createOscillator(), lf = ac.createOscillator(), lfg = ac.createGain(), f = ac.createBiquadFilter(), g = ac.createGain();
  o1.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; f.Q.value = 5; f.frequency.value = 300; g.gain.value = 0;
  lf.frequency.value = 9; lfg.gain.value = 6; lf.connect(lfg); lfg.connect(o1.frequency);
  o1.connect(f); o2.connect(f); f.connect(g); g.connect(ac.destination); const t = ac.currentTime;
  o1.frequency.setValueAtTime(30, t); o1.frequency.linearRampToValueAtTime(95, t+.35); o1.frequency.exponentialRampToValueAtTime(36, t+1.3);
  o2.frequency.setValueAtTime(45, t); o2.frequency.linearRampToValueAtTime(140, t+.35); o2.frequency.exponentialRampToValueAtTime(55, t+1.3);
  [o1,o2,lf].forEach(o => o.start()); g.gain.setTargetAtTime(.06, t, .06); eng = {o1,o2,f,g,lf,ramp: t+1.3}; }
function engineUpdate(){ const t = ac.currentTime; if (t < eng.ramp) return; const b = 36 + speed*.75; eng.o1.frequency.setTargetAtTime(b, t, .08); eng.o2.frequency.setTargetAtTime(b*1.52, t, .08); eng.f.frequency.setTargetAtTime(280 + speed*7, t, .08); }
function engineStop(){ if (!eng) return; const e = eng; eng = null; e.g.gain.setTargetAtTime(0, ac.currentTime, .12); setTimeout(() => [e.o1,e.o2,e.lf].forEach(o => o.stop()), 600); }
function setIgnition(on){
  ignited = on; document.body.classList.toggle('ignited', on);
  $('#igniteLbl').textContent = on ? 'Engine running' : 'Start the engine';
  $('#engineBtn').setAttribute('aria-pressed', on);
  if (on){ engineStart(); const r = $('#carRev'); r.animate([{transform:'translate(0,0)'},{transform:'translate(1.5px,-1px)'},{transform:'translate(-1.5px,1px)'},{transform:'translate(1px,0)'},{transform:'translate(0,0)'}], {duration:160, iterations:6}); toast('Engine on. Scroll to drive, and listen to it rev.'); }
  else engineStop();
}
$('#igniteBtn').addEventListener('click', () => setIgnition(!ignited));
$('#engineBtn').addEventListener('click', () => setIgnition(!ignited));

/* ============ GPS menu ============ */
const gps = $('#gps'), routeBtn = $('#routeBtn');
$('#gpsList').innerHTML = CH.map((c,i) => `<button role="menuitem" data-i="${i}"><span class="e">${c.exit}</span><b>${c.name}</b><span>${i === 0 ? 'KM 0' : ''}</span></button>`).join('');
$$('#gpsList button').forEach(b => b.addEventListener('click', () => { gps.classList.remove('show'); routeBtn.setAttribute('aria-expanded','false'); go('#' + CH[+b.dataset.i].id); }));
routeBtn.addEventListener('click', e => { e.stopPropagation(); const s = gps.classList.toggle('show'); routeBtn.setAttribute('aria-expanded', s); });
document.addEventListener('click', e => { if (!e.target.closest('#gps,#routeBtn')){ gps.classList.remove('show'); routeBtn.setAttribute('aria-expanded','false'); } });
function labelGps(){ gs.forEach((g,i) => { const b = $$('#gpsList button')[i+1]; if (b) b.lastElementChild.textContent = $('.board small span:last-child', g.el).textContent; }); }
setTimeout(labelGps, 400);

/* ============ ORIGINS: word scrub + sketch ============ */
const scrub = $('#scrub'), words = [];
(function(){ const txt = scrub.textContent.trim(); scrub.textContent = ''; txt.split(/\s+/).forEach((w,i) => { const s = document.createElement('span'); s.className = 'wd'; s.textContent = w; if (/notebooks|dashboard|obvious|job/.test(w)) s.classList.add('k'); words.push(s); scrub.append(s, ' '); }); })();
let wN = -1; const sketch = $('#sketch'); let skP = [];
function buildSketchLen(){ skP = $$('path,circle', sketch).map(p => { p.style.strokeDasharray = '1'; return p; }); }
buildSketchLen();
var geo = null, gY = -1;
function measureGeo(){ const sy = scrollY, r = scrub.getBoundingClientRect(), s = sketch.getBoundingClientRect(); geo = {sT: r.top + sy, sH: r.height, kT: s.top + sy, kH: s.height}; gY = -1; }
tickers.push(() => {
  if (!geo) measureGeo();
  const y = scrollY; if (y === gY) return; gY = y;
  const rt = geo.sT - y, rb = rt + geo.sH;
  if (rb > -100 && rt < vh + 100){ const p = clamp((vh*.85 - rt) / (geo.sH + vh*.3), 0, 1), n = Math.round(p*words.length); if (n !== wN){ wN = n; words.forEach((w,i) => w.classList.toggle('on', i < n)); } }
  const st = geo.kT - y, sb = st + geo.kH;
  if (sb > -100 && st < vh + 100){ const p = RM ? 1 : clamp((vh*.95 - st) / (vh*.75), 0, 1); skP.forEach((el,i) => setS(el, 'stroke-dashoffset', (1 - clamp(p*1.8 - i*.09, 0, 1)).toFixed(3))); }
});

/* ============ ROUTE turns ============ */
$('#turns').innerHTML = TURNS.map(t => `<div class="turn"><span class="ic"><svg><use href="#${t[0]}"/></svg></span><div><span class="dist">${t[1]}</span><b>${t[2]}</b><p>${t[3]}</p></div></div>`).join('');
const turnEls = $$('.turn'); let tOn = -2;
var tGeo = null, tY = -1;
function measureTurns(){ const sy = scrollY; tGeo = turnEls.map(el => { const r = el.getBoundingClientRect(); return {t: r.top + sy, b: r.bottom + sy, m: r.top + sy + r.height/2}; }); tY = -1; }
$('#navCard').addEventListener('transitionend', e => { if (e.target.id === 'navCard') measureTurns(); });
tickers.push(() => { if (!tGeo) measureTurns(); const y = scrollY; if (y === tY) return; tY = y;
  if (tGeo[0].t - y > vh*1.2 || tGeo[tGeo.length-1].b - y < -vh*.3) return;
  let a = -1; tGeo.forEach((g,i) => { if (g.m - y < vh*.66) a = i; });
  if (a !== tOn){ tOn = a; turnEls.forEach((el,i) => { el.classList.toggle('on', i === a); el.classList.toggle('done', i < a); }); } });

/* ============ HOOD tags ============ */
$('#tags').innerHTML = TOOLS.map((t,i) => `<div class="tagw"><span class="hook"></span><span class="tag" tabindex="0" data-i="${i}" style="--tc:${t[1]}"><span class="t"><i>${t[2]}</i><b>${t[0]}</b></span></span></div>`).join('');
const readout = $('#readout');
$$('.tag').forEach(t => { const nudge = () => { const d = TOOLS[+t.dataset.i]; readout.textContent = `${d[0].toUpperCase()}: ${d[3]}`; if (t.classList.contains('sw')) return; t.style.setProperty('--sa', ((rnd() < .5 ? -1 : 1) * R(10,18)).toFixed(1)+'deg'); t.classList.add('sw'); };
  t.addEventListener('pointerenter', nudge); t.addEventListener('focus', nudge); t.addEventListener('click', nudge); t.addEventListener('animationend', () => t.classList.remove('sw')); });

/* ============ DASH gauges ============ */
const polar = (cx,cy,r,deg) => { const a = (deg-90)*Math.PI/180; return [cx + r*Math.cos(a), cy + r*Math.sin(a)]; };
const arcD = (cx,cy,r,a0,a1) => { const [x0,y0] = polar(cx,cy,r,a0), [x1,y1] = polar(cx,cy,r,a1); return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${a1-a0 > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
$('#gauges').innerHTML = GAUGES.map((g,gi) => { let ticks = '';
  const majors = g.max/g.step; for (let k=0;k<=majors*5;k++){ const a = -120 + k/(majors*5)*240, maj = k%5 === 0, [x0,y0] = polar(100,108,maj ? 66 : 70,a), [x1,y1] = polar(100,108,78,a);
    ticks += `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${a > 72 ? '#FF4D3D' : '#C9CED8'}" stroke-width="${maj ? 2.4 : 1.2}" opacity="${maj ? 1 : .55}"/>`;
    if (maj){ const [tx,ty] = polar(100,108,54,a); ticks += `<text x="${tx.toFixed(1)}" y="${(ty+4).toFixed(1)}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#A6AEC0">${+(k/5*g.step).toFixed(1)}</text>`; } }
  return `<div class="g3 rv" style="transition-delay:${gi*.1}s"><svg viewBox="0 0 200 140" aria-label="${g.n}: ${g.v}${g.unit}">
    <path d="${arcD(100,108,86,-120,120)}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="5" stroke-linecap="round"/>
    <path d="${arcD(100,108,86,72,120)}" fill="none" stroke="#FF4D3D" stroke-width="5" stroke-linecap="round" opacity=".7"/>${ticks}
    <g class="ndl" transform="rotate(-120 100 108)"><path d="M98 112L100 34L102 112Z" fill="#FF4D3D"/></g><circle cx="100" cy="108" r="8" fill="#F3EFE6"/><circle cx="100" cy="108" r="3" fill="#141821"/></svg>
    <div class="rd"><span class="rv2">0</span><small>${g.unit}</small></div><div class="nm">${g.n}</div></div>`; }).join('');
$$('.g3').forEach((el,gi) => { io.observe(el); const g = GAUGES[gi], ndl = $('.ndl', el), rd = $('.rv2', el);
  once(el, () => { const t0 = performance.now() + gi*160; const f = t => { const s = Math.max(0, (t - t0)/1000); let v;
      if (s < .7){ const e = 1 - Math.pow(1 - s/.7, 3); v = g.max*e; } else { const u = s - .7; v = g.v + (g.max - g.v)*Math.exp(-4.2*u)*Math.cos(9*u); }
      if (RM) v = g.v;
      ndl.setAttribute('transform', `rotate(${(-120 + clamp(v/g.max,0,1.02)*240).toFixed(2)} 100 108)`); rd.textContent = g.dec ? Math.max(0,v).toFixed(1) : Math.round(Math.max(0,v));
      if (s < 2.4 && !RM) requestAnimationFrame(f); else { ndl.setAttribute('transform', `rotate(${(-120 + g.v/g.max*240).toFixed(2)} 100 108)`); rd.textContent = g.dec ? g.v.toFixed(1) : g.v; } };
    requestAnimationFrame(f); }, .5); });

/* ============ GARAGE ============ */
$('#garage').innerHTML = CARS.map((c,i) => { const wheel = x => `<g class="wheel"><circle cx="${x}" cy="72" r="15" fill="#10131B"/><circle cx="${x}" cy="72" r="8.5" fill="#B9C0CC"/><path d="M${x} 64V80M${x-8} 72H${x+8}M${x-5.7} 66.3L${x+5.7} 77.7M${x+5.7} 66.3L${x-5.7} 77.7" stroke="#5E6676" stroke-width="1.6"/></g>`;
  return `<div class="car rv" style="--cc:${c.cc||c.c};transition-delay:${i*.08}s"><svg viewBox="0 0 240 96" aria-hidden="true"><ellipse cx="122" cy="88" rx="104" ry="5" fill="#000" opacity=".4"/>
    <path class="hl" d="M224 60L320 50L320 80Z" fill="#FFF2C4" opacity="0" style="mix-blend-mode:screen"/>
    <g class="bodyc"><path d="${c.body}" fill="${c.c}"/><path d="${c.win}" fill="#17202F" opacity=".9"/><rect x="214" y="58" width="9" height="5" rx="2" fill="#FFF6D8"/><rect x="12" y="60" width="7" height="5" rx="2" fill="#FF3B3B"/></g>
    ${wheel(62)}${wheel(182)}</svg><b>${c.n}</b><small>${c.d}</small></div>`; }).join('');
$$('.car').forEach(el => io.observe(el));

/* ============ FINISH ============ */
$('#emailTxt').textContent = CFG.email;
$('#copyBtn').addEventListener('click', async () => { try { await navigator.clipboard.writeText(CFG.email); toast('Email copied: ' + CFG.email); $('#copyBtn').textContent = 'COPIED'; setTimeout(() => $('#copyBtn').textContent = 'COPY', 1800); } catch(e){ const r = document.createRange(); r.selectNodeContents($('#emailTxt')); getSelection().removeAllRanges(); getSelection().addRange(r); toast('Select and copy: ' + CFG.email); } });
const FOBS = [['LinkedIn','#i-in',CFG.linkedin],['Resume','#i-doc',CFG.resume]];
$('#fobs').innerHTML = FOBS.map(f => `<a class="fob" href="${f[2] || '#'}" ${f[2] ? 'target="_blank" rel="noopener"' : 'data-soon'}><span class="bt"><svg><use href="${f[1]}"/></svg></span>${f[0]}</a>`).join('');
$$('.fob[data-soon]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); toast('Resume link coming soon.'); }));
const t0 = Date.now();
setInterval(() => { const s = Math.floor((Date.now()-t0)/1000); $('#tTime').textContent = `${fmt2(Math.floor(s/60))}:${fmt2(s%60)}`; $('#tDist').textContent = maxKm.toFixed(1) + ' km'; }, 500);

/* ============ FINISH confetti ============ */
const cv = $('#confetti'), cx = cv.getContext('2d');
function burst(sx, sy, n=170){
  if (RM) return; const d = Math.min(2, devicePixelRatio||1); cv.width = innerWidth*d; cv.height = innerHeight*d; cx.setTransform(d,0,0,d,0,0);
  const cols = ['#F5C842','#FF4D3D','#4CC9F0','#3DDC84','#fff','#D7222B']; const ps = [];
  for (let i=0;i<n;i++){ const a = -Math.PI/2 + R(-1.3,1.3), sp = R(6,16); ps.push({x:sx, y:sy, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, w:R(5,10), h:R(8,14), r:R(0,6), vr:R(-.3,.3), c: i%3 === 0 ? 'chk' : cols[i%6]}); }
  const tS = performance.now(); const f = t => { const el = t - tS; cx.clearRect(0,0,innerWidth,innerHeight);
    ps.forEach(p => { p.vy += .33; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; cx.save(); cx.translate(p.x,p.y); cx.rotate(p.r); cx.globalAlpha = clamp(1 - (el-1500)/900, 0, 1);
      if (p.c === 'chk'){ cx.fillStyle = '#fff'; cx.fillRect(-5,-5,10,10); cx.fillStyle = '#111'; cx.fillRect(-5,-5,5,5); cx.fillRect(0,0,5,5); } else { cx.fillStyle = p.c; cx.fillRect(-p.w/2,-p.h/2,p.w,p.h*Math.abs(Math.cos(p.r*1.4))); } cx.restore(); });
    if (el < 2500) requestAnimationFrame(f); else cx.clearRect(0,0,innerWidth,innerHeight); };
  requestAnimationFrame(f);
}
function finishParty(x, y){
  burst(x, y + mainTop - scrollY);
  const s = Math.floor((Date.now()-t0)/1000); toast(`You made it to the destination in ${fmt2(Math.floor(s/60))}:${fmt2(s%60)}.`);
  setTimeout(() => discover('finish'), 1400);
}

/* ============ sound effects ============ */
function AC(){ try { ac = ac || new (window.AudioContext||window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac; } catch(e){ return null; } }
function tone(type, f0, f1, dur, vol=.06, when=0, lp=0){ const a = AC(); if (!a) return; const t = a.currentTime + when;
  const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t+dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t+.02); g.gain.setValueAtTime(vol, t+Math.max(.03, dur-.06)); g.gain.linearRampToValueAtTime(0, t+dur);
  let n = o; if (lp){ const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp; o.connect(f); n = f; } n.connect(g); g.connect(a.destination); o.start(t); o.stop(t+dur+.05); }
const SFX = {
  honk(){ tone('square',392,0,.3,.045,0,1500); tone('square',494,0,.3,.045,0,1500); tone('square',392,0,.22,.045,.36,1500); tone('square',494,0,.22,.045,.36,1500); },
  moo(){ tone('sawtooth',150,92,1.1,.08,0,520); },
  beep(){ tone('sine',1760,0,.09,.05); tone('sine',2350,0,.14,.05,.12); },
  clink(){ tone('triangle',2400,2200,.2,.05); tone('sine',600,300,.5,.03,.05,900); },
  glug(){ tone('sine',140,90,.12,.04); },
  ding(){ tone('sine',880,0,.16,.045); tone('sine',1320,0,.32,.045,.11); },
  whoosh(){ tone('sawtooth',70,700,.7,.04,0,1100); }
};

/* ============ discoveries ============ */
const FINDS = [
  ['honk','Honk the horn','Tap the red car on the road, or press H.'],
  ['chai','Cutting chai break','There is a tea stall at Exit 01.'],
  ['cones','Clear the road works','Something is blocking a lane at Exit 02.'],
  ['toll','Pay the toll','The plaza is right before the work.'],
  ['fuel','Fill the tank','The dashboard has a fuel pump.'],
  ['cow','Meet the locals','Someone is resting near the rear-view.'],
  ['plate','Flip the number plate','Tap my plate in the corner a few times, fast.'],
  ['turbo','Turbo mode','Type "vroom", or triple-tap the speedometer.'],
  ['finish','Reach the destination','Drive all the way to the finish line.']
];
let found = new Set();
try { found = new Set(JSON.parse(localStorage.getItem('pr-joyride-finds') || '[]')); } catch(e){}
const findsEl = $('#finds'), findBtn = $('#findBtn');
function renderFinds(){
  const n = found.size, t = FINDS.length;
  $('#findN').textContent = n; $('#heroFound').textContent = n; $('#tFound').textContent = `${n}/${t}`;
  $('#findSub').textContent = n === t ? 'All of them. You are officially a road-trip legend.' : `${n} of ${t} found. Hints for the rest are below.`;
  $('#findList').innerHTML = FINDS.map(([k,name,hint]) => { const g = found.has(k); return `<li class="${g ? 'got' : ''}"><span class="ck">${g ? '✓' : '?'}</span><div><b>${g ? name : 'Not found yet'}</b><span class="h">${g ? 'Found' : hint}</span></div></li>`; }).join('');
}
renderFinds();
let achT;
function discover(k){
  if (found.has(k)) return; found.add(k);
  try { localStorage.setItem('pr-joyride-finds', JSON.stringify([...found])); } catch(e){}
  renderFinds(); const f = FINDS.find(x => x[0] === k);
  $('#achK').textContent = `FOUND ${found.size}/${FINDS.length}`; $('#achT').textContent = f[1];
  const a = $('#ach'); a.classList.add('show'); clearTimeout(achT); achT = setTimeout(() => a.classList.remove('show'), 2800);
  SFX.ding();
  if (found.size === FINDS.length) setTimeout(() => { burst(innerWidth/2, innerHeight*.7, 220); toast('You found all 9. Road-trip legend status unlocked.'); }, 900);
}
findBtn.addEventListener('click', e => { e.stopPropagation(); const s = findsEl.classList.toggle('show'); findBtn.setAttribute('aria-expanded', s); gps.classList.remove('show'); });
document.addEventListener('click', e => { if (!e.target.closest('#finds,#findBtn')){ findsEl.classList.remove('show'); findBtn.setAttribute('aria-expanded','false'); } });

/* ============ honk ============ */
let carX = 0, carY = 0, honks = [];
function bubble(txt, x, y){ const b = document.createElement('span'); b.className = 'bub'; b.textContent = txt; b.style.left = x + 'px'; b.style.top = y + 'px'; $('#props').appendChild(b); setTimeout(() => b.remove(), 1050); }
function honk(){
  SFX.honk(); bubble(['BEEP BEEP!','HONK!','PAA-PAA!','OUT OF THE WAY!'][Math.floor(rnd()*4)], carX, carY - (mobile ? 34 : 70)); discover('honk');
  const r = $('#carRev'); if (r && !RM) r.animate([{transform:'translate(0,0)'},{transform:'translate(1px,-1px)'},{transform:'translate(-1px,1px)'},{transform:'translate(0,0)'}], {duration:120, iterations:3});
  const now = Date.now(); honks = honks.filter(t => now - t < 4000); honks.push(now);
  if (honks.length === 6) toast('Easy on the horn. People are trying to read.');
}
$('#hornBtn').addEventListener('click', honk);

/* ============ number plate ============ */
let plateTaps = [];
$('#plate').addEventListener('click', () => { const now = Date.now(); plateTaps = plateTaps.filter(t => now - t < 2500); plateTaps.push(now);
  if (plateTaps.length >= 5){ plateTaps = []; const p = $('#plate'), t = $('#plateTxt'); p.classList.remove('flip'); void p.offsetWidth; p.classList.add('flip');
    setTimeout(() => { t.textContent = t.textContent === 'PRATIK KATHE' ? 'MH 01 UX' : 'PRATIK KATHE'; }, 300); discover('plate'); toast('New plate: registered in Mumbai, licensed to design.'); } });

/* ============ turbo ============ */
let turboT;
function turbo(){ document.body.classList.add('turbo'); SFX.whoosh(); toast('Turbo mode! Hold on to your chai.'); discover('turbo'); clearTimeout(turboT); turboT = setTimeout(() => document.body.classList.remove('turbo'), 4500); }
let gTaps = [];
$('#gauge').addEventListener('click', () => { const now = Date.now(); gTaps = gTaps.filter(t => now - t < 1200); gTaps.push(now); if (gTaps.length >= 3){ gTaps = []; turbo(); } });

/* ============ chai stall ============ */
let chai = 0;
$('#chaiBtn').addEventListener('click', () => { chai++; const st = $('#chaiStop'), tea = $('#tea');
  st.classList.add('pouring'); tea.style.transition = 'none'; tea.style.height = '6%'; void tea.offsetWidth; tea.style.transition = ''; tea.style.height = '80%';
  SFX.clink(); setTimeout(() => st.classList.remove('pouring'), 900);
  $('#chaiN').textContent = chai; discover('chai');
  if (chai === 3) toast('Three cuttings. The road can wait a minute.');
  if (chai === 8) toast('The chaiwala says you are his best customer today.'); });

/* ============ road works ============ */
const lanebox = $('#lanebox'), cones = $$('.cone', lanebox); let laneClear = false;
function coneOnGrass(c){ return c.offsetTop + c.offsetHeight*.75 < lanebox.clientHeight*.4; }
function checkCones(){ const n = cones.filter(coneOnGrass).length; $('#coneN').textContent = n;
  if (n === cones.length && !laneClear){ laneClear = true; lanebox.classList.add('clear'); SFX.honk(); toast('Lane cleared. Traffic is moving again.'); discover('cones'); } }
cones.forEach(c => { let sx, sy, ox, oy, drag = false;
  const move = (x, y) => { c.style.left = clamp(x, 0, lanebox.clientWidth - c.offsetWidth) + 'px'; c.style.top = clamp(y, 0, lanebox.clientHeight - c.offsetHeight) + 'px'; };
  c.addEventListener('pointerdown', e => { drag = true; try { c.setPointerCapture(e.pointerId); } catch(_){} sx = e.clientX; sy = e.clientY; ox = c.offsetLeft; oy = c.offsetTop; c.classList.add('grab'); e.preventDefault(); });
  c.addEventListener('pointermove', e => { if (drag) move(ox + e.clientX - sx, oy + e.clientY - sy); });
  const up = () => { if (!drag) return; drag = false; c.classList.remove('grab'); checkCones(); };
  c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  c.addEventListener('keydown', e => { const d = {ArrowUp:[0,-14],ArrowDown:[0,14],ArrowLeft:[-14,0],ArrowRight:[14,0]}[e.key]; if (!d) return; e.preventDefault(); move(c.offsetLeft + d[0], c.offsetTop + d[1]); checkCones(); });
});

/* ============ toll ============ */
$('#tollBtn').addEventListener('click', () => { const t = $('#toll'), led = $('#tollLed'), b = $('#tollBtn');
  if (t.classList.toggle('paid')){ SFX.beep(); led.textContent = 'PAID ₹0 · DESIGNERS RIDE FREE'; b.textContent = 'Lower the barrier'; discover('toll'); }
  else { led.textContent = 'TOLL · TAP TAG'; b.textContent = 'Tap your toll tag'; } });

/* ============ fuel pump ============ */
let fuel = .32, fillT = null; const pumpBtn = $('#pumpBtn');
function setFuel(){ $('#pumpBar').style.transform = `scaleX(${fuel.toFixed(3)})`; $('#pumpL').textContent = (fuel*45).toFixed(1); $('#pumpPct').textContent = Math.round(fuel*100) + '%'; }
function stopFill(){ if (!fillT) return; clearInterval(fillT); fillT = null; pumpBtn.classList.remove('on'); pumpBtn.textContent = fuel >= 1 ? 'Tank full' : 'Hold to refuel'; }
function startFill(e){ if (e) e.preventDefault(); if (fillT) return;
  if (fuel >= 1){ fuel = .32; setFuel(); toast('Burned through it already. Curiosity drains fast.'); }
  pumpBtn.classList.add('on'); pumpBtn.textContent = 'Filling…'; let k = 0;
  fillT = setInterval(() => { fuel = Math.min(1, fuel + .011); setFuel(); if (++k % 6 === 0) SFX.glug(); if (fuel >= 1){ stopFill(); discover('fuel'); toast('Tank full. Curiosity at 100%.'); } }, 40); }
pumpBtn.addEventListener('pointerdown', startFill);
['pointerup','pointerleave','pointercancel'].forEach(ev => pumpBtn.addEventListener(ev, stopFill));
pumpBtn.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) startFill(e); });
pumpBtn.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') stopFill(); });
pumpBtn.addEventListener('contextmenu', e => e.preventDefault());

/* ============ cow ============ */
$('#cowBtn').addEventListener('click', () => { const c = $('#cowBtn'), s = $('#cowSay'); if (c.classList.contains('walk')) return;
  SFX.moo(); c.classList.add('walk'); s.classList.add('show'); discover('cow');
  setTimeout(() => s.classList.remove('show'), 1400); setTimeout(() => c.classList.remove('walk'), RM ? 10 : 3250); });

/* ============ milestones along the road (desktop) ============ */
const MILES = ['Mumbai. Where every trip starts.','Diploma in mechanical engineering before any pixels.','Rising Star of the Year, Sankey Solutions, 2022.','Maverick Performer of the Year, BarrierBreak, 2024.','Every colour token gets a contrast check the day it is made.','Accessly Lens: concept to tested plugin in 15 days.'];
function buildMilestones(){ const p = $('#props'); $$('.mile', p).forEach(m => m.remove()); if (mobile || !SX.length) return; let side = -1;
  MILES.forEach((m,i) => { const l = L*(i+.62)/MILES.length, k = Math.min(Math.round(l/STEP), SX.length-3), j = k+2; const dx = SX[j]-SX[k], dy = SY[j]-SY[k], mm = Math.hypot(dx,dy)||1;
    const nx = -dy/mm*side, ny = dx/mm*side, km = Math.round(l/L*TRIP_KM); const el = document.createElement('button'); el.className = 'mile'; el.type = 'button';
    el.setAttribute('aria-label', `Milestone at kilometre ${km}`); el.style.left = (SX[k] + nx*(RW/2+42)).toFixed(1) + 'px'; el.style.top = (SY[k] + ny*(RW/2+42)).toFixed(1) + 'px';
    el.innerHTML = `<svg viewBox="0 0 34 44" aria-hidden="true"><path d="M3 44V14Q3 2 17 2Q31 2 31 14V44Z" fill="#F3EFE6"/><path d="M3 15Q3 2 17 2Q31 2 31 15Z" fill="#F5C842"/><text x="17" y="33" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" font-weight="700" fill="#141821">${km}</text></svg>`;
    el.addEventListener('click', () => toast(`KM ${km} · ${m}`)); p.appendChild(el); side *= -1; }); }
buildMilestones();

/* ============ keyboard ============ */
let typed = '';
document.addEventListener('keydown', e => {
  if (e.key === 'Escape'){ if (openId) closeCase(); gps.classList.remove('show'); findsEl.classList.remove('show'); return; }
  if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input,textarea,select,[contenteditable]')) return;
  if (e.key.length === 1){ typed = (typed + e.key.toLowerCase()).slice(-5); if (typed === 'vroom') turbo(); if (e.key.toLowerCase() === 'h' && !openId) honk(); }
});

/* ======================================================================
   CASE STUDIES
   All projects live in the JSON block with id "cs-data" near the end of
   the page. Edit them with the in-page editor (owner only) or by hand.
   Section types: text, image, gallery, beforeafter, metrics, process, quote.
   ====================================================================== */
let W = window.CASE_STUDIES || {projects:[]};
if (!Array.isArray(W.projects)) W.projects = [];
let filter = 'All', openId = null, lastCard = null;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const src = v => !v ? '' : String(v).startsWith('asset:') ? '/_blob/' + String(v).slice(6) : String(v);
const safeColor = c => /^#[0-9a-f]{3,8}$/i.test(c || '') ? c : '#F5C842';
const paras = s => String(s || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p => `<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');
const pad = n => String(n).padStart(2,'0');
function pic(v, label, ratio='16/10'){
  return v ? `<img src="${esc(src(v))}" alt="${esc(label)}" loading="lazy" decoding="async">`
           : `<div class="ph" style="aspect-ratio:${ratio}" role="img" aria-label="${esc(label)}, placeholder image"><span><svg aria-hidden="true"><use href="#i-img"/></svg>${esc(label || 'Image')}</span></div>`;
}
function art(p){
  if (p.cover) return `<img src="${esc(src(p.cover))}" alt="" loading="lazy" decoding="async">`;
  const ini = String(p.title || '?').split(/\s+/).slice(0,2).map(w => w[0]).join('');
  return `<span class="art"><svg viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 190C70 180 110 70 190 80S300 30 350 0" stroke="#0A0E19" stroke-opacity=".4" stroke-width="40" fill="none"/><path d="M-20 190C70 180 110 70 190 80S300 30 350 0" stroke="#F7F4EC" stroke-opacity=".75" stroke-width="2.5" stroke-dasharray="14 12" fill="none"/></svg><span class="ini">${esc(ini)}</span></span>`;
}

function renderFilters(){
  const m = new Map(); W.projects.forEach(p => { const c = p.category || 'Other'; m.set(c, (m.get(c)||0) + 1); });
  if (filter !== 'All' && !m.has(filter)) filter = 'All';
  $('#filters').innerHTML = [['All', W.projects.length], ...m].map(([c,n]) => `<button class="chip" type="button" aria-pressed="${c === filter}" data-f="${esc(c)}">${esc(c)} <small>${n}</small></button>`).join('');
}
/* Cards leave out the company name; the full client line shows inside the case study. */
const cardClient = c => String(c || '').replace(/^\s*BarrierBreak\s*[·•|,-]?\s*/i, '');
function renderCards(anim){
  const list = W.projects.map((p,i) => ({p,i})).filter(o => filter === 'All' || (o.p.category || 'Other') === filter);
  $('#cards').innerHTML = list.length ? list.map(({p,i},k) => `<button class="ccard${anim ? ' pop' : ''}" type="button" style="--pc:${safeColor(p.color)};animation-delay:${k*.06}s" data-id="${esc(p.id)}" aria-label="Open case study: ${esc(p.title)}">
    <span class="cov">${art(p)}</span>
    <span class="cbody"><span class="no"><span>PIT ${pad(i+1)}</span><small>${[p.category, p.year].filter(Boolean).map(esc).join(' · ')}</small></span>
    <span class="mtr"><span class="big">${esc(p.metric?.value)}</span><span class="mt">${esc(p.metric?.label)}</span></span>
    <span class="ttl"><span class="t">${esc(p.title)}</span>${p.headline ? `<span class="hl">${esc(p.headline)}</span>` : ''}${cardClient(p.client) ? `<span class="co">${esc(cardClient(p.client))}</span>` : ''}</span>
    ${p.lap ? `<span class="lap"><svg aria-hidden="true"><use href="#i-clock"/></svg>${esc(p.lap)}</span>` : ''}</span>
    <span class="open" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></button>`).join('')
    : `<div class="empty">${W.projects.length ? 'Nothing in this lane yet. Try another filter.' : 'No case studies yet. Open the editor to add your first one.'}</div>`;
}
$('#filters').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; filter = b.dataset.f; renderFilters(); renderCards(true); });
$('#cards').addEventListener('click', e => { const c = e.target.closest('.ccard'); if (c){ lastCard = c.dataset.id; openCase(c.dataset.id); } });

function secHTML(s){
  const H = s.heading ? `<h2 class="sh">${esc(s.heading)}</h2>` : '', cap = s.caption ? `<p class="cap">${esc(s.caption)}</p>` : '';
  switch (s.type){
    case 'text': return `<section class="sec sec-text">${s.kicker ? `<span class="kicker">${esc(s.kicker)}</span>` : ''}${H}${paras(s.body)}</section>`;
    case 'image': { const sz = s.size || (s.wide ? 'full' : 'normal'), notes = (s.src && Array.isArray(s.notes)) ? s.notes.filter(n => n && n.text) : [];
      const img = pic(s.src, s.alt || s.caption || 'Project image', sz === 'panel' ? '800/1360' : sz === 'full' ? '16/9' : '16/10');
      const pins = notes.map((n,k) => `<span class="pin ${['l','r','t','b','c'].includes(n.side) ? n.side : 'l'}" aria-hidden="true" data-n="${k+1}" style="left:${clamp(+n.x || 0, 0, 100)}%;top:${clamp(+n.y || 0, 0, 100)}%">${k+1}</span>`).join('');
      const fig = `<figure>${notes.length ? `<div class="pinwrap">${img}${pins}</div>` : img}${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ''}</figure>`;
      const nl = notes.length ? `<ol class="pins" aria-label="What to notice on this screen">${notes.map((n,k) => `<li data-n="${k+1}"><span class="pn" aria-hidden="true">${k+1}</span><span>${esc(n.text)}</span></li>`).join('')}</ol>` : '';
      const txt = (s.heading || s.body || nl) ? `<div class="sec-copy">${s.heading ? `<h3 class="sh3">${esc(s.heading)}</h3>` : ''}${paras(s.body)}${nl}</div>` : '';
      return sz === 'panel' ? `<section class="sec split">${txt}<div class="panelfig">${fig}</div></section>` : `<section class="sec img-${sz}">${txt}${fig}</section>`; }
    case 'gallery': return `<section class="sec">${H}<div class="gal" style="--cols:${Math.max(1, Math.min(4, +s.cols || 3))}">${(s.items||[]).map((it,k) => pic(it.src, it.alt || `Gallery image ${k+1}`, '4/3')).join('')}</div>${cap}</section>`;
    case 'list': return `<section class="sec sec-text">${H}<ul class="blist">${(s.items||[]).filter(Boolean).map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>`;
    case 'decision': return `<section class="sec"><article class="dec"><h3>${esc(s.title)}</h3>${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}<dl>${[['Before',s.before],['Options',s.options],['The trade-off',s.tradeoff],['What I did',s.action],['Result',s.result]].filter(r => r[1]).map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl></article></section>`;
    case 'link': return `<section class="sec"><div class="golink">${H}${paras(s.body)}<div class="golinks">${[[s.url, s.label, 'y'], [s.url2, s.label2, 'g']].filter(l => /^https:\/\//.test(l[0] || '')).map(l => `<a class="btn ${l[2]}" href="${esc(l[0])}" target="_blank" rel="noopener">${esc(l[1] || 'Open link')} <svg aria-hidden="true"><use href="#i-arrow"/></svg></a>`).join('')}</div></div></section>`;
    case 'beforeafter': return `<section class="sec">${H}<div class="ba"><div class="a">${pic(s.after, s.afterLabel || 'After', '16/10')}</div><div class="b">${pic(s.before, s.beforeLabel || 'Before', '16/10')}</div><span class="tagb l">${esc(s.beforeLabel || 'Before')}</span><span class="tagb r">${esc(s.afterLabel || 'After')}</span><input type="range" min="0" max="100" value="50" aria-label="Drag to compare ${esc(s.beforeLabel || 'before')} and ${esc(s.afterLabel || 'after')}"><span class="hd"><i></i></span></div>${cap}</section>`;
    case 'metrics': return `<section class="sec">${H}<div class="mets">${(s.items||[]).map(m => `<div class="met"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}</div></section>`;
    case 'process': return `<section class="sec">${H}<ol class="steps">${(s.steps||[]).map((st,k) => `<li><span class="sn">${pad(k+1)}</span><div><b>${esc(st.title)}</b><p>${esc(st.body)}</p></div></li>`).join('')}</ol></section>`;
    case 'quote': return `<section class="sec"><figure class="quote"><blockquote>${esc(s.text)}</blockquote><figcaption><b>${esc(s.name)}</b>${s.role ? ' · ' + esc(s.role) : ''}</figcaption></figure></section>`;
  }
  return '';
}
const csEl = $('#cs'), csIn = $('#csIn');
function renderCase(id){
  const i = W.projects.findIndex(p => p.id === id); if (i < 0) return false;
  const p = W.projects[i], nx = W.projects[(i+1) % W.projects.length];
  const meta = [['Role',p.role],['Timeline',p.duration],['Team',p.team],['Platform',p.platform]].filter(m => m[1]);
  csEl.style.setProperty('--pc', safeColor(p.color));
  csIn.innerHTML = `<header class="cs-hero">
      <span class="kicker">${[`PIT ${pad(i+1)}`, p.category, p.year].filter(Boolean).map(esc).join(' · ')}</span>
      <h1>${esc(p.title)}</h1>${p.headline ? `<p class="cs-hl">${esc(p.headline)}</p>` : ''}<p class="cs-client">${esc(p.client)}</p>${p.summary ? `<p class="cs-sum">${esc(p.summary)}</p>` : ''}
      ${meta.length ? `<dl class="meta">${meta.map(m => `<div><dt>${m[0]}</dt><dd>${esc(m[1])}</dd></div>`).join('')}</dl>` : ''}
      <figure class="cs-cover">${pic(p.hero || p.cover, p.title + ' cover image', '16/9')}${p.metric?.value ? `<span class="badge"><b>${esc(p.metric.value)}</b>${esc(p.metric.label)}</span>` : ''}</figure>
    </header>
    ${(p.sections||[]).map(secHTML).join('')}
    <nav class="cs-end" aria-label="More case studies">
      ${W.projects.length > 1 ? `<button class="nextx" type="button" data-next="${esc(nx.id)}"><small>NEXT EXIT · PIT ${pad((i+1) % W.projects.length + 1)}</small><b>${esc(nx.title)}</b><span>Keep driving <svg aria-hidden="true"><use href="#i-arrow"/></svg></span></button>` : ''}
      <button class="allx" type="button" data-all>All case studies</button>
    </nav>`;
  $('#csExit').textContent = `PIT ${pad(i+1)} / ${pad(W.projects.length)}`;
  return true;
}
function openCase(id){
  if (!renderCase(id)) return; const was = openId; openId = id;
  csEl.classList.add('show'); csEl.setAttribute('aria-hidden','false'); if (!was) document.documentElement.classList.add('cs-open');
  csEl.scrollTop = 0; updMini(); lenis && lenis.stop();
  try { history.replaceState(null, '', '#case-' + id); } catch(e){}
  setTimeout(() => $('#csBack').focus({preventScroll:true}), 80);
}
function closeCase(){
  if (!openId) return; openId = null; csEl.classList.remove('show'); csEl.setAttribute('aria-hidden','true'); document.documentElement.classList.remove('cs-open');
  lenis && lenis.start(); try { history.replaceState(null, '', '#pits'); } catch(e){}
  const c = lastCard && $(`.ccard[data-id="${CSS.escape(lastCard)}"]`); if (c) c.focus({preventScroll:true});
}
function updMini(){ const m = csEl.scrollHeight - csEl.clientHeight; $('#minir').style.setProperty('--p', m > 0 ? (csEl.scrollTop/m).toFixed(3) : 0); }
csEl.addEventListener('scroll', updMini, {passive:true});
$('#csBack').addEventListener('click', closeCase);
csIn.addEventListener('click', e => { const n = e.target.closest('[data-next]'); if (n){ openCase(n.dataset.next); return; } if (e.target.closest('[data-all]')){ closeCase(); go('#pits'); } });
csIn.addEventListener('input', e => { if (e.target.matches('.ba input')) e.target.closest('.ba').style.setProperty('--pos', e.target.value + '%'); });
/* Annotation pins: pointing at a note lights its pin on the screenshot, and the other way round. */
const pinLight = (e, on) => { const t = e.target.closest && e.target.closest('.pins li[data-n], .pin[data-n]'); if (!t) return; const sec = t.closest('.sec'); if (!sec) return;
  sec.querySelectorAll(`[data-n="${t.dataset.n}"]`).forEach(el => el.classList.toggle('lit', on)); };
csIn.addEventListener('pointerover', e => pinLight(e, true));
csIn.addEventListener('pointerout', e => pinLight(e, false));
function refreshAll(){ renderFilters(); renderCards(false); if (openId && !renderCase(openId)) closeCase(); }
renderFilters(); renderCards(false);
{ const m = /^#case-([a-z0-9-]+)$/.exec(location.hash); if (m) setTimeout(() => openCase(m[1]), 300); }


})();
