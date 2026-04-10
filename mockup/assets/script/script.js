// ─── DATA ───────────────────────────────────────────────────────────
const SCREENS = [
  {
    id: 1,
    name: "Screen 1",
    sub: "Your headline here",
    line1: "YOUR HEADLINE",
    accent: "KEY FEATURE",
    sub_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    badge1: { icon: "shield-halved", text: "Badge One" },
    badge2: { icon: "bolt", text: "Badge Two" },
    features: ["Feature One","Feature Two","Feature Three"],
    uiType: "connect",
  },
  {
    id: 2,
    name: "Screen 2",
    sub: "Subtitle goes here",
    line1: "ANOTHER SCREEN",
    accent: "STAND OUT",
    sub_text: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    badge1: { icon: "star", text: "Highlight" },
    badge2: { icon: "check", text: "Verified" },
    features: ["Feature A","Feature B","Feature C"],
    uiType: "tools",
  },
  {
    id: 3,
    name: "Screen 3",
    sub: "Describe your screen",
    line1: "SHOW YOUR",
    accent: "BEST SIDE",
    sub_text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    badge1: { icon: "award", text: "Top Rated" },
    badge2: { icon: "thumbs-up", text: "User Loved" },
    features: ["Benefit One","Benefit Two","Benefit Three"],
    uiType: "widget",
  }
];

const THEMES = {
  teal:   { bg: "#040d1a", accent: "#00d4b8", accent2: "#0052cc", card: "rgba(0,212,184,0.12)", text: "#00d4b8" },
  fire:   { bg: "#0d0800", accent: "#f59e0b", accent2: "#ef4444", card: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  purple: { bg: "#0a0415", accent: "#a855f7", accent2: "#ec4899", card: "rgba(168,85,247,0.12)", text: "#a855f7" },
  green:  { bg: "#010d08", accent: "#10b981", accent2: "#059669", card: "rgba(16,185,129,0.12)", text: "#10b981" },
  mono:   { bg: "#111111", accent: "#e0e0e0", accent2: "#888888", card: "rgba(255,255,255,0.08)", text: "#ffffff" },
};

let currentScreen = 0;
let currentDevice = 'pixel';
let currentTheme = 'teal';

// ─── INIT ────────────────────────────────────────────────────────────
function init() {
  buildScreenList();
  buildTextEditor();
  buildMiniGrid();
  renderMockup();
}

function buildScreenList() {
  const el = document.getElementById('screenList');
  el.innerHTML = SCREENS.map((s,i) => `
    <div class="screen-item ${i===currentScreen?'active':''}" onclick="selectScreen(${i})" style="position:relative">
      <div class="num">${i+1}</div>
      <div style="flex:1;min-width:0">
        <div class="screen-name" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.name}</div>
        <div class="screen-sub" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.sub}</div>
      </div>
      ${SCREENS.length > 1 ? `<button onclick="event.stopPropagation();deleteScreen(${i})" style="
        background:none;border:none;cursor:pointer;padding:4px 6px;border-radius:6px;
        color:var(--muted);font-size:11px;flex-shrink:0;opacity:0;transition:opacity .15s;
        pointer-events:all;" class="screen-del-btn"
        title="Delete screen">
        <i class="fa fa-trash-can"></i>
      </button>` : ''}
    </div>
  `).join('') + `
    <button class="add-screen-btn" onclick="addScreen()">
      <i class="fa fa-plus"></i>
      <span>Add Screen</span>
    </button>`;
  // Show delete buttons on hover via JS (CSS :hover on child not easy with dynamic HTML)
  el.querySelectorAll('.screen-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const btn = item.querySelector('.screen-del-btn');
      if (btn) btn.style.opacity = '1';
    });
    item.addEventListener('mouseleave', () => {
      const btn = item.querySelector('.screen-del-btn');
      if (btn) btn.style.opacity = '0';
    });
  });
}

function buildTextEditor() {
  const s = SCREENS[currentScreen];
  document.getElementById('textEditor').innerHTML = `
    <div class="field-group">
      <div class="field-label">Headline Line 1</div>
      <input class="field-input" value="${s.line1}" oninput="SCREENS[${currentScreen}].line1=this.value;renderMockup()">
    </div>
    <div class="field-group">
      <div class="field-label">Accent Line</div>
      <input class="field-input" value="${s.accent}" oninput="SCREENS[${currentScreen}].accent=this.value;renderMockup()" style="color:var(--teal)">
    </div>
    <div class="field-group">
      <div class="field-label">Subtitle</div>
      <textarea class="field-input" rows="2" oninput="SCREENS[${currentScreen}].sub_text=this.value;renderMockup()">${s.sub_text}</textarea>
    </div>
<!-- Badge 1/2 removed - use Overlays > Add Badge instead -->
  `;
}

function buildMiniGrid() {
  _doUpdatePreviews();
}

// ─── INTERACTIONS ─────────────────────────────────────────────────────

// ─── ADD / DELETE SCREENS ─────────────────────────────────────────────
let _screenIdCounter = 100;

function addScreen() {
  _screenIdCounter++;
  const n = SCREENS.length + 1;
  const newScreen = {
    id: _screenIdCounter,
    name: 'Screen ' + n,
    sub: 'Your subtitle here',
    line1: 'YOUR HEADLINE',
    accent: 'KEY FEATURE',
    sub_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    badge1: { icon: 'star', text: 'Badge One' },
    badge2: { icon: 'check', text: 'Badge Two' },
    features: ['Feature One', 'Feature Two', 'Feature Three'],
    uiType: 'connect',
  };
  newScreen._state = makeScreenState();
  SCREENS.push(newScreen);
  currentScreen = SCREENS.length - 1;
  currentDevice = 'pixel';
  currentTheme  = 'teal';
  buildScreenList();
  buildTextEditor();
  buildMiniGrid();
  syncBgCfgToUI(scState().bgCfg);
  renderMockup();
  showToast('Screen ' + n + ' added');
  updateScreenPreviews();
}

function deleteScreen(i) {
  if (SCREENS.length <= 1) { showToast('Need at least one screen'); return; }
  SCREENS.splice(i, 1);
  if (currentScreen >= SCREENS.length) currentScreen = SCREENS.length - 1;
  const st = scState();
  currentDevice = st.device || 'pixel';
  currentTheme  = st.theme  || 'teal';
  buildScreenList();
  buildTextEditor();
  buildMiniGrid();
  syncBgCfgToUI(scState().bgCfg);
  restoreUploadPreviews();
  renderMockup();
  showToast('Screen deleted');
  updateScreenPreviews();
}


// ─── TOGGLE PER-SCREEN BOOLEAN ────────────────────────────────────────
function togglePerScreen(key, togEl) {
  togEl.classList.toggle('on');
  scState()[key] = togEl.classList.contains('on');
  renderMockup();
}

// ─── RESET DEVICE TRANSFORM ───────────────────────────────────────────
function resetDeviceTransform() {
  const st = scState();
  st.devicePos   = { x: null, y: null };
  st.deviceScale = 1.0;
  st.deviceRotate= 0;
  // Sync sliders
  const ds = document.getElementById('devScale');
  const dr = document.getElementById('devRotate');
  if (ds) { ds.value = 100; document.getElementById('devScaleVal').textContent = '100%'; }
  if (dr) { dr.value = 0;   document.getElementById('devRotateVal').textContent = '0deg'; }
  renderMockup();
  showToast('Device reset');
}

// ─── SYNC ALL CONTROLS TO CURRENT SCREEN STATE ────────────────────────
function syncControlsToScreen() {
  const st = scState();
  // Device
  const ds = document.getElementById('devScale');
  const dr = document.getElementById('devRotate');
  if (ds) {
    ds.value = Math.round((st.deviceScale||1)*100);
    const dsvEl = document.getElementById('devScaleVal'); if (dsvEl) dsvEl.textContent = ds.value+'%';
    const dsn = document.getElementById('devScaleNum'); if (dsn) dsn.value = ds.value;
  }
  if (dr) {
    dr.value = st.deviceRotate||0;
    const drvEl = document.getElementById('devRotateVal'); if (drvEl) drvEl.textContent = (st.deviceRotate||0)+'deg';
    const drn = document.getElementById('devRotateNum'); if (drn) drn.value = dr.value;
  }
  // Feature strip
  const fp = document.getElementById('featurePos');
  const ff = document.getElementById('featFontSize');
  const togF = document.getElementById('toggleFeatures');
  if (fp)   fp.value = st.featurePos || 'bottom';
  if (ff)   {
    ff.value = st.featureFontSize||11;
    const ffvEl = document.getElementById('featFontVal'); if (ffvEl) ffvEl.textContent = (st.featureFontSize||11)+'px';
    const ffn = document.getElementById('featFontNum'); if (ffn) ffn.value = ff.value;
  }
  if (togF) togF.classList.toggle('on', st.featureShow !== false);
  // Watermark
  const wt   = document.getElementById('watermarkText');
  const togW = document.getElementById('toggleWatermark');
  if (wt)   wt.value = st.watermarkText !== undefined ? st.watermarkText : 'VELIU LABS';
  if (togW) togW.classList.toggle('on', st.watermarkShow !== false);
  // Badges
  const togB = document.getElementById('toggleBadges');
  if (togB) togB.classList.toggle('on', st.badgesShow !== false);
  // Typography
  const hls = document.getElementById('hlFontSize');
  const sus = document.getElementById('subFontSize');
  const hlf = document.getElementById('hlFont');
  const suf = document.getElementById('subFont');
  if (hls) {
    hls.value = Math.round((st.headlineFontSize||1)*100);
    const hlvEl = document.getElementById('hlFontVal'); if (hlvEl) hlvEl.textContent = hls.value+'%';
    const hlsn = document.getElementById('hlFontNum'); if (hlsn) hlsn.value = hls.value;
  }
  if (sus) {
    sus.value = Math.round((st.subtitleFontSize||1)*100);
    const svEl = document.getElementById('subFontVal'); if (svEl) svEl.textContent = sus.value+'%';
    const susn = document.getElementById('subFontNum'); if (susn) susn.value = sus.value;
  }
  if (hlf) hlf.value = st.headlineFont || 'Montserrat';
  if (suf) suf.value = st.subtitleFont || 'Poppins';
  // Custom size
  const cwi = document.getElementById('customW');
  const chi = document.getElementById('customH');
  if (cwi) cwi.value = st.customW || '';
  if (chi) chi.value = st.customH || '';
  // Feature items
  buildFeatureItemsList();
}

function selectScreen(i) {
  currentScreen = i;
  // Restore per-screen state
  const st = SCREENS[i]._state || makeScreenState();
  SCREENS[i]._state = st;
  currentDevice = st.device || 'pixel';
  currentTheme  = st.theme  || 'teal';
  syncBgCfgToUI(st.bgCfg);
  // Rebuild list to update active highlight (handles dynamic count)
  buildScreenList();
  buildMiniGrid();
  document.querySelectorAll('.mini-screen').forEach((el,j) => {
    el.classList.toggle('current', j===i);
  });
  if (document.getElementById('screenTitle'))
    document.getElementById('screenTitle').textContent = `Screen ${i+1} of ${SCREENS.length}`;
  document.querySelectorAll('.device-card').forEach(d => {
    d.classList.toggle('active', d.dataset.device === currentDevice);
  });
  document.querySelectorAll('.theme-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.theme === currentTheme);
  });
  buildTextEditor();
  refreshOverlaysList();
  restoreUploadPreviews();
  syncControlsToScreen();
  buildFeatureItemsList();
  // Apply custom canvas size for this screen
  const _st2 = scState();
  if (_st2.customW || _st2.customH) updateCanvasSizeBadge();
  renderMockup();
  updateScreenPreviews();
  buildCarousel();
}

function restoreUploadPreviews() {
  const st = scState();
  // Screenshot preview
  const sprev = document.getElementById('screenshot-preview');
  if (sprev) {
    if (st.screenshot) {
      sprev.style.display = 'block';
      sprev.innerHTML = `<img src="${st.screenshot}" style="width:100%;border-radius:7px;border:1px solid var(--border2)">
        <button class="small-btn danger full" style="margin-top:4px" onclick="scState().screenshot=null;document.getElementById('screenshot-preview').style.display='none';renderMockup()">Remove</button>`;
    } else {
      sprev.style.display = 'none'; sprev.innerHTML = '';
    }
  }
  // Frame preview
  const fprev = document.getElementById('frame-preview');
  if (fprev) {
    if (st.customFrame) {
      fprev.style.display = 'block';
      fprev.innerHTML = `<img src="${st.customFrame}" style="width:100%;border-radius:7px;border:1px solid var(--border2)">
        <button class="small-btn danger full" style="margin-top:4px" onclick="scState().customFrame=null;document.getElementById('frame-preview').style.display='none';renderMockup()">Remove</button>`;
    } else {
      fprev.style.display = 'none'; fprev.innerHTML = '';
    }
  }
  // BG image preview
  const bgprev = document.getElementById('bgImgPreview');
  if (bgprev) {
    if (st.bgCfg.image) {
      bgprev.style.display = 'block';
      bgprev.innerHTML = `<img src="${st.bgCfg.image}" style="width:100%;border-radius:7px;border:1px solid var(--border2)">
        <button class="small-btn danger full" style="margin-top:4px" onclick="scState().bgCfg.image=null;document.getElementById('bgImgPreview').style.display='none';renderMockup()">Remove</button>`;
    } else {
      bgprev.style.display = 'none'; bgprev.innerHTML = '';
    }
  }
}

function syncBgCfgToUI(cfg) {
  if (!cfg) return;
  try {
    const togStrip  = document.getElementById('togStrip');
    const stripStyle= document.getElementById('stripStyle');
    const bgType    = document.getElementById('bgType');
    const bgCol1    = document.getElementById('bgCol1');
    const bgCol1t   = document.getElementById('bgCol1t');
    const bgCol2    = document.getElementById('bgCol2');
    const bgCol2t   = document.getElementById('bgCol2t');
    const togShapes = document.getElementById('togShapes');
    const noiseRange= document.getElementById('noiseRange');
    const noiseVal  = document.getElementById('noiseVal');
    if (togStrip)   togStrip.classList.toggle('on', cfg.showStrip !== false);
    if (stripStyle) stripStyle.value = cfg.stripStyle || 'gradient';
    if (bgType)     bgType.value     = cfg.bgType     || 'gradient';
    if (bgCol1)     bgCol1.value     = cfg.col1  || '#04101e';
    if (bgCol1t)    bgCol1t.value    = cfg.col1  || '#04101e';
    if (bgCol2)     bgCol2.value     = cfg.col2  || '#0a1628';
    if (bgCol2t)    bgCol2t.value    = cfg.col2  || '#0a1628';
    if (togShapes)  togShapes.classList.toggle('on', cfg.showShapes !== false);
    if (noiseRange) noiseRange.value = cfg.noise || 0;
    if (noiseVal)   noiseVal.textContent = (cfg.noise || 0) + '%';
  } catch(e) {}
}

function setDevice(device, el) {
  currentDevice = device;
  scState().device = device;
  document.querySelectorAll('.device-card').forEach(d => d.classList.remove('active'));
  if (el) el.classList.add('active');
  renderMockup();
}

function setTheme(theme, el) {
  currentTheme = theme;
  scState().theme = theme;
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  if (el) el.classList.add('active');
  renderMockup();
}

// ─── RENDER ──────────────────────────────────────────────────────────
function renderMockup() {
  const s = SCREENS[currentScreen];
  const t = THEMES[currentTheme];
  const showBadges = document.getElementById('toggleBadges').classList.contains('on');
  const showFeatures = document.getElementById('toggleFeatures').classList.contains('on');
  const showWatermark = document.getElementById('toggleWatermark').classList.contains('on');

  const canvas = document.getElementById('mockup-canvas');
  canvas.innerHTML = '';

  // Background
  const bg = document.createElement('div');
  bg.className = 'mock-bg';
  bg.style.background = `radial-gradient(ellipse 100% 70% at 50% 0%, ${t.accent}18 0%, transparent 55%), ${t.bg}`;
  canvas.appendChild(bg);

  // Accent bar top
  const bar = document.createElement('div');
  bar.className = 'mock-accent-bar';
  bar.style.background = `linear-gradient(90deg, ${t.accent}, ${t.accent2})`;
  canvas.appendChild(bar);

  // Decorative shapes
  const sh1 = document.createElement('div'); sh1.className = 'mock-shape-1';
  sh1.style.borderColor = `${t.accent}18`;
  canvas.appendChild(sh1);
  const sh2 = document.createElement('div'); sh2.className = 'mock-shape-2';
  sh2.style.borderColor = `${t.accent}12`;
  canvas.appendChild(sh2);

  // Headline
  const hl = document.createElement('div');
  hl.className = 'mock-headline';
  hl.innerHTML = `
    <div class="line1">${s.line1}<br><span class="accent-word" style="background:${t.accent};color:${t.bg}">${s.accent}</span></div>
    <div class="sub">${s.sub_text}</div>
  `;
  canvas.appendChild(hl);

  // Floating badges
  if (showBadges) {
    const b1 = document.createElement('div');
    b1.className = 'mock-badge';
    b1.style.cssText = `left:10px; top:${currentDevice==='fold'?'190px':'200px'}; background:${t.card}; border:1px solid ${t.accent}44; color:white;`;
    b1.innerHTML = `<span class="badge-icon">${s.badge1.icon}</span>${s.badge1.text}`;
    canvas.appendChild(b1);

    const b2 = document.createElement('div');
    b2.className = 'mock-badge';
    b2.style.cssText = `right:10px; top:${currentDevice==='fold'?'230px':'240px'}; background:${t.card}; border:1px solid ${t.accent}44; color:white;`;
    b2.innerHTML = `<span class="badge-icon">${s.badge2.icon}</span>${s.badge2.text}`;
    canvas.appendChild(b2);
  }

  // Device + screen content
  const deviceEl = buildDevice(s, t);
  canvas.appendChild(deviceEl);

  // Feature strip
  if (showFeatures) {
    const strip = document.createElement('div');
    strip.className = 'mock-features';
    strip.innerHTML = s.features.map(f => {
      const [icon, name] = f.split(' ');
      return `<div class="mock-feat" style="background:${t.card}"><div class="mock-feat-icon">${icon}</div><div class="mock-feat-name">${name}</div></div>`;
    }).join('');
    canvas.appendChild(strip);
  }

  // Watermark
  if (showWatermark) {
    const wm = document.createElement('div');
    wm.className = 'mock-watermark';
    wm.style.color = t.accent;
    wm.textContent = wmText || 'VELIU LABS';
    canvas.appendChild(wm);
  }
}

function buildDevice(s, t) {
  const wrap = document.createElement('div');
  wrap.className = 'mock-device';

  if (currentDevice === 'pixel') {
    wrap.style.cssText = 'width:160px;bottom:10px;left:50%;transform:translateX(-50%) rotate(-2deg)';
    const frame = document.createElement('div');
    frame.className = 'phone-frame';
    frame.style.cssText = 'width:160px;height:310px;';
    const screen = document.createElement('div');
    screen.className = 'phone-screen';
    screen.style.cssText = 'width:154px;height:304px;margin:3px;';
    screen.appendChild(buildAppUI(s, t, 154, 304));
    frame.appendChild(screen);
    wrap.appendChild(frame);
  }
  else if (currentDevice === 'fold') {
    wrap.style.cssText = 'width:230px;bottom:10px;left:50%;transform:translateX(-50%)';
    const frame = document.createElement('div');
    frame.className = 'fold-frame';
    frame.style.cssText = 'width:230px;height:260px;display:flex;';
    const hinge = document.createElement('div'); hinge.className = 'fold-hinge';
    const sl = document.createElement('div');
    sl.className = 'fold-screen';
    sl.style.cssText = 'width:109px;height:254px;margin:3px 3px 3px 3px;';
    sl.appendChild(buildAppUI(s, t, 109, 254));
    const sr = document.createElement('div');
    sr.className = 'fold-screen';
    sr.style.cssText = 'width:109px;height:254px;margin:3px 3px 3px 3px;';
    sr.appendChild(buildAppUI(s, t, 109, 254, true));
    frame.appendChild(sl); frame.appendChild(hinge); frame.appendChild(sr);
    wrap.appendChild(frame);
  }
  else if (currentDevice === 'flat') {
    wrap.style.cssText = 'width:170px;bottom:10px;left:50%;transform:translateX(-50%) rotate(-1deg);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6)';
    const screen = document.createElement('div');
    screen.style.cssText = 'width:170px;height:310px;border-radius:16px;overflow:hidden;';
    screen.appendChild(buildAppUI(s, t, 170, 310));
    wrap.appendChild(screen);
  }
  else if (currentDevice === 'tablet') {
    wrap.style.cssText = 'width:220px;bottom:10px;left:50%;transform:translateX(-50%)';
    const frame = document.createElement('div');
    frame.className = 'tablet-frame';
    frame.style.cssText = 'width:220px;height:280px;';
    const screen = document.createElement('div');
    screen.className = 'tablet-screen';
    screen.style.cssText = 'width:214px;height:274px;margin:3px;';
    screen.appendChild(buildAppUI(s, t, 214, 274));
    frame.appendChild(screen);
    wrap.appendChild(frame);
  }

  return wrap;
}

function buildAppUI(s, t, w, h, secondary = false) {
  const el = document.createElement('div');
  el.className = 'screen-content';
  el.style.cssText = `width:${w}px;height:${h}px;font-family:'Space Grotesk',sans-serif;`;

  const statusBar = `
    <div class="status-bar" style="font-size:7px">
      <span>9:41</span>
      <div class="status-icons">
        <span>●●●</span><span>WiFi</span><span></span>
      </div>
    </div>`;

  if (secondary) {
    // Second fold panel — detail view
    el.innerHTML = statusBar + `
      <div style="padding:8px;flex:1">
        <div style="background:${t.card};border-radius:10px;padding:8px;margin-bottom:6px">
          <div style="font-size:8px;opacity:0.5;margin-bottom:3px;font-weight:700">ACTIVE DNS</div>
          <div style="font-size:11px;font-weight:800;color:${t.accent}">Cloudflare 1.1.1.1</div>
          <div style="font-size:7px;opacity:0.5;margin-top:2px">DNS over HTTPS</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
          ${['Latency<br><b style="font-size:11px;color:${t.accent}">12ms</b>','Requests<br><b style="font-size:11px">2.4k</b>','Blocked<br><b style="font-size:11px;color:#ef4444">34</b>','Uptime<br><b style="font-size:11px;color:${t.accent}">99.9%</b>'].map(c=>`
            <div style="background:${t.card};border-radius:8px;padding:6px;font-size:7px;opacity:0.8">${c.replace(/\${t\.accent}/g,t.accent)}</div>
          `).join('')}
        </div>
      </div>`;
    return el;
  }

  if (s.uiType === 'connect') {
    el.innerHTML = statusBar + `
      <div class="app-ui">
        <div class="ui-dns-card" style="background:${t.card}">
          <div>
            <div class="ui-dns-label">ACTIVE SERVER</div>
            <div class="ui-dns-name" style="color:${t.accent}">Cloudflare 1.1.1.1</div>
          </div>
          <div class="ui-dns-badge" style="background:${t.accent}22;color:${t.accent}">DoH</div>
        </div>
        <div style="text-align:center;padding:8px 0">
          <div class="ui-big-toggle" style="background:${t.accent}22;color:${t.accent}"><i class="fa fa-shield-halved"></i></div>
          <div style="font-size:9px;font-weight:700;color:${t.accent};margin-top:5px">CONNECTED</div>
        </div>
        <div class="ui-stats">
          <div class="ui-stat" style="background:${t.card}">
            <div class="ui-stat-val" style="color:${t.accent}">12ms</div>
            <div class="ui-stat-lbl">LATENCY</div>
          </div>
          <div class="ui-stat" style="background:${t.card}">
            <div class="ui-stat-val">2.4k</div>
            <div class="ui-stat-lbl">QUERIES</div>
          </div>
          <div class="ui-stat" style="background:${t.card}">
            <div class="ui-stat-val" style="color:#ef4444">34</div>
            <div class="ui-stat-lbl">BLOCKED</div>
          </div>
        </div>
      </div>`;
  }
  else if (s.uiType === 'tools') {
    el.innerHTML = statusBar + `
      <div class="app-ui">
        <div style="font-size:9px;font-weight:800;color:${t.accent};padding:2px 0 4px">NETWORK TOOLS</div>
        ${[['fa-satellite-dish','DNS Lookup','1.1.1.1','12ms'],['fa-rotate','Ping','google.com','8ms'],['fa-route','Traceroute','8.8.8.8','Done'],['fa-globe','IP Info','195.x.x.x','DE']].map(([ic,nm,val,res])=>`
          <div style="background:${t.card};border-radius:9px;padding:7px 9px;display:flex;align-items:center;gap:6px">
            <i class="fa ${ic}" style="font-size:12px;color:${t.accent};width:14px;text-align:center"></i>
            <div style="flex:1">
              <div style="font-size:8px;font-weight:700">${nm}</div>
              <div style="font-size:7px;opacity:0.5">${val}</div>
            </div>
            <div style="font-size:8px;font-weight:700;color:${t.accent}">${res}</div>
          </div>`).join('')}
      </div>`;
  }
  else if (s.uiType === 'widget') {
    el.innerHTML = statusBar + `
      <div class="app-ui" style="align-items:center">
        <div style="font-size:8px;font-weight:700;color:${t.accent};width:100%">HOME SCREEN</div>
        <div style="background:${t.card};border-radius:14px;padding:10px;width:100%;border:1px solid ${t.accent}33">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
            <i class="fa fa-shield-halved" style="font-size:11px;color:${t.accent}"></i>
            <div style="font-size:8px;font-weight:800">My DNS</div>
            <div style="margin-left:auto;width:8px;height:8px;border-radius:50%;background:${t.accent};box-shadow:0 0 6px ${t.accent}"></div>
          </div>
          <div style="font-size:11px;font-weight:800;color:${t.accent}">1.1.1.1</div>
          <div style="font-size:7px;opacity:0.5">Cloudflare · Active</div>
          <div style="display:flex;gap:5px;margin-top:6px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:6px;padding:4px;text-align:center">
              <div style="font-size:9px;font-weight:800">12ms</div>
              <div style="font-size:6px;opacity:0.5">ping</div>
            </div>
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:6px;padding:4px;text-align:center">
              <div style="font-size:9px;font-weight:800">IPv6</div>
              <div style="font-size:6px;opacity:0.5">mode</div>
            </div>
          </div>
        </div>
        <div style="font-size:7px;opacity:0.4;margin-top:4px">Glance Widget • Always visible</div>
      </div>`;
  }
  else if (s.uiType === 'monitor') {
    el.innerHTML = statusBar + `
      <div class="app-ui">
        <div style="font-size:9px;font-weight:800;color:${t.accent}">NETWORK MONITOR</div>
        <div class="ui-stats">
          <div class="ui-stat" style="background:${t.card}">
            <div class="ui-stat-val" style="color:${t.accent};font-size:10px">↑2.1</div>
            <div class="ui-stat-lbl">MB/s UP</div>
          </div>
          <div class="ui-stat" style="background:${t.card}">
            <div class="ui-stat-val" style="font-size:10px">↓8.4</div>
            <div class="ui-stat-lbl">MB/s DL</div>
          </div>
        </div>
        <div style="background:${t.card};border-radius:9px;padding:8px">
          <div style="font-size:7px;opacity:0.5;margin-bottom:4px">SPEED HISTORY</div>
          <svg width="100%" height="35" viewBox="0 0 120 35">
            <polyline points="0,30 20,22 35,25 50,15 65,18 80,8 100,12 120,6" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round"/>
            <polyline points="0,30 20,22 35,25 50,15 65,18 80,8 100,12 120,6 120,35 0,35" fill="${t.accent}22"/>
          </svg>
        </div>
        <div style="background:${t.card};border-radius:9px;padding:7px;display:flex;justify-content:space-between">
          <div style="text-align:center"><div style="font-size:9px;font-weight:800">WiFi</div><div style="font-size:7px;color:${t.accent}">●Connected</div></div>
          <div style="text-align:center"><div style="font-size:9px;font-weight:800">4G</div><div style="font-size:7px;opacity:0.5">●Standby</div></div>
          <div style="text-align:center"><div style="font-size:9px;font-weight:800">VPN</div><div style="font-size:7px;color:${t.accent}">●Active</div></div>
        </div>
      </div>`;
  }
  else if (s.uiType === 'privacy') {
    el.innerHTML = statusBar + `
      <div class="app-ui" style="align-items:center">
        <div style="font-size:9px;font-weight:800;color:${t.accent};width:100%">PRIVACY</div>
        <div style="font-size:28px;margin:6px 0;color:${t.accent}"><i class="fa fa-lock"></i></div>
        <div style="font-size:10px;font-weight:800;text-align:center;margin-bottom:6px">All traffic<br>encrypted</div>
        ${[['DNS over HTTPS','',t.accent],['DNS over TLS','',t.accent],['No logs policy','',t.accent],['IP leak protection','',t.accent]].map(([k,v,c])=>`
          <div style="background:${t.card};border-radius:8px;padding:7px 9px;display:flex;justify-content:space-between;width:100%;margin-bottom:4px">
            <div style="font-size:8px;font-weight:600">${k}</div>
            <div style="font-size:8px;font-weight:800;color:${c}">${v}</div>
          </div>`).join('')}
      </div>`;
  }

  return el;
}

// ─── EXPORT ──────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

async function exportCurrent() {
  const btn = document.getElementById('exportBtnText');
  const loader = document.getElementById('exportLoader');
  btn.textContent = 'Rendering...';
  loader.style.display = 'block';

  try {
    await exportScreenV2(currentScreen);
    showToast(`Screen ${currentScreen+1} downloaded!`);
  } catch(e) {
    showToast('Error: ' + e.message);
  } finally {
    btn.textContent = 'Download This Screen';
    loader.style.display = 'none';
  }
}

async function exportAll() {
  const btn = document.getElementById('exportAllText');
  const loader = document.getElementById('exportAllLoader');
  const bar = document.getElementById('progressBar');
  const fill = document.getElementById('progressFill');

  btn.textContent = 'Exporting...';
  loader.style.display = 'block';
  bar.style.display = 'block';

  const orig = currentScreen;
  for (let i = 0; i < SCREENS.length; i++) {
    selectScreen(i);
    await new Promise(r => setTimeout(r, 300));
    await exportScreenV2(i);
    fill.style.width = `${((i+1)/SCREENS.length)*100}%`;
  }

  selectScreen(orig);
  btn.textContent = 'Download All 5 Screens';
  loader.style.display = 'none';
  setTimeout(() => { bar.style.display = 'none'; fill.style.width = '0%'; }, 1500);
  showToast('All screens downloaded!');
}

async function exportScreen(idx) {
  // V1 export — kept for compatibility but defers to V2 below
  return exportScreenV2(idx);
}


// ═══════════════════════════════════════════
// V2 STATE EXTENSIONS
// ═══════════════════════════════════════════
let assetType = 'phone';  // phone | tab7 | tab10 | tv | daydream
let overlays = [];        // {type, ...data, x, y, id}
let selectedOverlay = null;
let customScreenshot = null;
let customFrame = null;
let bgCfg = {
  showStrip: true,
  stripStyle: 'gradient',
  bgType: 'gradient',
  col1: '#04101e',
  col2: '#0a1628',
  showShapes: true,
  noise: 0,
  image: null,
};


// ── Per-screen state initializer ─────────────────────────────────────────
function makeScreenState() {
  return {
    overlays: [],
    screenshot: null,
    customFrame: null,
    devicePos: { x: null, y: null },
    deviceScale: 1.0,
    deviceRotate: 0,
    theme: 'teal',
    device: 'pixel',
    bgCfg: {
      showStrip: true, stripStyle: 'gradient', bgType: 'gradient',
      col1: '#04101e', col2: '#0a1628', showShapes: true, noise: 0, image: null,
    },
    watermarkText: 'VELIU LABS',
    watermarkShow: true,
    featureShow: true,
    featurePos: 'bottom',    // bottom | top | center
    featureFontSize: 11,     // px relative to canvas scale
    badgesShow: true,
    // Page/typography settings
    headlineFontSize: 1.0,
    subtitleFontSize: 1.0,
    headlineFont: 'Montserrat',
    subtitleFont: 'Poppins',
    // Draggable text positions (null = default)
    headlinePos: null,  // {x, y}
    subtitlePos: null,  // {x, y}
    // Custom canvas size override
    customW: null,
    customH: null,
    // Global/individual switch (stored per screen but controlled globally)
    isGlobal: false,
  };
}
// Attach state to each screen on load
SCREENS.forEach(s => { if (!s._state) s._state = makeScreenState(); });

// ── Convenience accessors (always point to current screen) ───────────────
function sc()       { return SCREENS[currentScreen]; }
function scState()  { return sc()._state; }

const ASSET_SPECS = {
  phone:    { w:1080, h:1920, label:'Phone',      note:'320–3840px each side' },
  tab7:     { w:1080, h:1920, label:'Tablet 7"',  note:'320–3840px each side' },
  tab10:    { w:1200, h:1920, label:'Tablet 10"', note:'1080–7680px each side' },
  tv:       { w:1280, h:720,  label:'TV Banner',  note:'Exactly 1280×720px' },
  daydream: { w:4096, h:4096, label:'Daydream',   note:'4096×4096px stereo 360°' },
};

// ═══════════════════════════════════════════
// ASSET TYPE SWITCHING
// ═══════════════════════════════════════════
function setAssetType(type, el) {
  assetType = type;
  document.querySelectorAll('.asset-row').forEach(r => r.classList.remove('active'));
  if (el) el.classList.add('active');

  const canvas = document.getElementById('mockup-canvas');
  canvas.classList.remove('tv-mode','daydream-mode');

  const spec = ASSET_SPECS[type];
  document.getElementById('sizeBadge').textContent = `${spec.w} × ${spec.h} px`;

  if (type === 'tv') {
    canvas.classList.add('tv-mode');
    canvas.style.width  = '512px';
    canvas.style.height = '288px';
  } else if (type === 'daydream') {
    canvas.classList.add('daydream-mode');
    canvas.style.width  = '320px';
    canvas.style.height = '320px';
  } else {
    canvas.style.width  = '300px';
    canvas.style.height = '640px';
  }

  // Update compliance info
  const compEl = document.getElementById('expRes');
  if (compEl) compEl.textContent = `${spec.w} × ${spec.h}`;

  renderMockup();
}

// ═══════════════════════════════════════════
// BACKGROUND CONFIG
// ═══════════════════════════════════════════
function updateBgCfg() {
  const cfg = scState().bgCfg;
  cfg.showStrip  = document.getElementById('togStrip')?.classList.contains('on');
  cfg.stripStyle = document.getElementById('stripStyle')?.value || 'gradient';
  cfg.bgType     = document.getElementById('bgType')?.value || 'gradient';
  cfg.col1       = document.getElementById('bgCol1t')?.value || '#04101e';
  cfg.col2       = document.getElementById('bgCol2t')?.value || '#0a1628';
  cfg.showShapes = document.getElementById('togShapes')?.classList.contains('on');
  cfg.noise      = parseInt(document.getElementById('noiseRange')?.value || 0);
  renderMockup();
}

function handleBgUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    scState().bgCfg.image  = e.target.result;
    scState().bgCfg.bgType = 'image';
    document.getElementById('bgType').value = 'image';
    const prev = document.getElementById('bgImgPreview');
    prev.style.display = 'block';
    prev.innerHTML = `<img src="${scState().bgCfg.image}" style="width:100%;border-radius:7px;border:1px solid var(--border2)">
      <button class="small-btn danger full" style="margin-top:4px" onclick="scState().bgCfg.image=null;document.getElementById('bgImgPreview').style.display='none';renderMockup()">Remove</button>`;
    renderMockup();
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════
// SCREENSHOT + FRAME UPLOADS
// ═══════════════════════════════════════════
function handleScreenshotUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    scState().screenshot = e.target.result;
    const prev = document.getElementById('screenshot-preview');
    prev.style.display = 'block';
    prev.innerHTML = `<img src="${scState().screenshot}" style="width:100%;border-radius:7px;border:1px solid var(--border2)">
      <button class="small-btn danger full" style="margin-top:4px" onclick="scState().screenshot=null;document.getElementById('screenshot-preview').style.display='none';renderMockup()">Remove</button>`;
    renderMockup();
  };
  reader.readAsDataURL(file);
}

function handleFrameUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    scState().customFrame = e.target.result;
    const prev = document.getElementById('frame-preview');
    prev.style.display = 'block';
    prev.innerHTML = `<img src="${scState().customFrame}" style="width:100%;border-radius:7px;border:1px solid var(--border2)">
      <button class="small-btn danger full" style="margin-top:4px" onclick="scState().customFrame=null;document.getElementById('frame-preview').style.display='none';renderMockup()">Remove</button>`;
    renderMockup();
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════
// OVERLAYS: BADGES + AWARDS + POPUP IMAGES
// ═══════════════════════════════════════════
function addBadge() {
  const text  = document.getElementById('badge-text').value.trim();
  const style = document.getElementById('badge-style').value;
  if (!text) { showToast('Enter badge text first'); return; }
  scState().overlays.push({ id: Date.now(), type: 'badge', text, style, x: 20, y: 220 });
  document.getElementById('badge-text').value = '';
  refreshOverlaysList();
  renderMockup();
  showToast('Badge added — drag to position');
}

function addAward() {
  const title = document.getElementById('award-title').value.trim();
  const sub   = document.getElementById('award-sub').value.trim();
  const style = document.getElementById('award-style').value;
  if (!title) { showToast('Enter award title first'); return; }
  scState().overlays.push({ id: Date.now(), type: 'award', title, sub, style, x: 20, y: 300 });
  document.getElementById('award-title').value = '';
  document.getElementById('award-sub').value = '';
  refreshOverlaysList();
  renderMockup();
  showToast('Award added — drag to position');
}

function handlePopupUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    scState().overlays.push({ id: Date.now(), type: 'popup', src: e.target.result, x: 30, y: 180, w: 120, rotate: 0 });
    refreshOverlaysList();
    renderMockup();
    showToast('Popup image added — drag to position');
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function removeOverlay(id) {
  scState().overlays = scState().overlays.filter(o => o.id !== id);
  if (selectedOverlay === id) selectedOverlay = null;
  refreshOverlaysList();
  renderMockup();
}

function refreshOverlaysList() {
  const el = document.getElementById('overlays-list');
  if (!el) return;
  const overlays = scState().overlays;
  if (!overlays.length) {
    el.innerHTML = '<div style="font-size:11px;color:var(--muted2);padding:6px 0">No overlays yet</div>';
    return;
  }
  el.innerHTML = overlays.map(ov => {
    const isSelected = selectedOverlay === ov.id;
    const label = ov.type === 'badge' ? ov.text
                : ov.type === 'award' ? ov.title
                : `Popup (${ov.w||120}px${ov.rotate ? ', '+Math.round(ov.rotate)+'°' : ''})`;
    const icon  = ov.type === 'badge' ? 'fa-tag'
                : ov.type === 'award' ? 'fa-trophy'
                : 'fa-image';
    return `<div style="display:flex;align-items:center;gap:7px;padding:6px 9px;border-radius:7px;
      border:1px solid ${isSelected ? 'var(--teal)' : 'var(--border2)'};
      background:${isSelected ? 'var(--teal-glow)' : 'var(--card)'};
      margin-bottom:4px;cursor:pointer;transition:all .15s"
      onclick="selectedOverlay=${ov.id};renderMockup();refreshOverlaysList()">
      <i class="fa ${icon}" style="color:var(--teal);font-size:11px;flex-shrink:0"></i>
      <span style="flex:1;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${label}</span>
      <button class="small-btn danger" style="padding:2px 7px;flex-shrink:0"
        onclick="event.stopPropagation();removeOverlay(${ov.id})">
        <i class="fa fa-trash"></i>
      </button>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════
// DRAGGABLE DEVICE + OVERLAYS
// ═══════════════════════════════════════════
let devicePos = { x: null, y: null };

function makeDraggable(el, onMove) {
  let dragging = false, moved = false, startX, startY, origX, origY;
  el.addEventListener('mousedown', e => {
    if (e.target.classList.contains('overlay-del')) return;
    dragging = true; moved = false;
    startX = e.clientX; startY = e.clientY;
    origX = parseFloat(el.style.left) || 0;
    origY = parseFloat(el.style.top)  || 0;
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return; // threshold
    moved = true;
    el.style.left = (origX + dx) + 'px';
    el.style.top  = (origY + dy) + 'px';
    onMove(origX + dx, origY + dy);
  });
  window.addEventListener('mouseup', () => { dragging = false; });
}

// ═══════════════════════════════════════════
// RENDERING EXTENSIONS — injected into renderMockup
// ═══════════════════════════════════════════
const _origRenderMockup = window.renderMockup;

function renderMockup() {
  const s = SCREENS[currentScreen];
  const t = THEMES[currentTheme];
  const st = scState();  // per-screen state
  const bgCfg = st.bgCfg;
  const overlays = st.overlays;
  const customScreenshot = st.screenshot;
  const customFrame = st.customFrame;
  const devicePos = st.devicePos;
  const showBadgesOld = st.badgesShow !== false;
  const showFeatures  = st.featureShow !== false;
  const showWatermark = st.watermarkShow !== false;
  const deviceScale   = st.deviceScale  || 1.0;
  const deviceRotate  = st.deviceRotate || 0;
  const featurePos    = st.featurePos   || 'bottom';
  const featureFontSz = st.featureFontSize || 11;
  const wmText        = st.watermarkText !== undefined ? st.watermarkText : 'VELIU LABS';
  const hlFontMult    = st.headlineFontSize || 1.0;
  const subFontMult   = st.subtitleFontSize || 1.0;
  const hlFont        = st.headlineFont || 'Montserrat';
  const subFont       = st.subtitleFont || 'Poppins';

  const canvas = document.getElementById('mockup-canvas');
  canvas.innerHTML = '';

  // ── BACKGROUND ───────────────────────────
  const bg = document.createElement('div');
  bg.className = 'mock-bg';
  let bgStyle = '';
  const c1 = bgCfg.col1 || t.bg || '#04101e';
  const c2 = bgCfg.col2 || '#0a1628';

  if (bgCfg.bgType === 'image' && bgCfg.image) {
    bgStyle = `background:url(${bgCfg.image}) center/cover no-repeat`;
  } else if (bgCfg.bgType === 'mesh') {
    bgStyle = `background:radial-gradient(ellipse 120% 80% at 20% 20%,${t.accent}25 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 80% 80%,${t.accent2||t.accent}18 0%,transparent 55%),${c1}`;
  } else if (bgCfg.bgType === 'solid') {
    bgStyle = `background:${c1}`;
  } else {
    bgStyle = `background:linear-gradient(150deg,${c1} 0%,${c2} 100%)`;
  }
  bg.style.cssText = `position:absolute;inset:0;${bgStyle}`;
  canvas.appendChild(bg);

  // ── NOISE ───────────────────────────────
  if (bgCfg.noise > 0) {
    const noise = document.createElement('div');
    noise.style.cssText = `position:absolute;inset:0;opacity:${bgCfg.noise/100};
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      pointer-events:none;mix-blend-mode:overlay`;
    canvas.appendChild(noise);
  }

  // ── TOP STRIP ───────────────────────────
  if (bgCfg.showStrip) {
    const strip = document.createElement('div');
    const stripBg = bgCfg.stripStyle === 'white' ? '#fff'
      : bgCfg.stripStyle === 'solid' ? t.accent
      : bgCfg.stripStyle === 'none'  ? 'transparent'
      : `linear-gradient(90deg,${t.accent},${t.accent2||t.accent})`;
    strip.style.cssText = `position:absolute;top:0;left:0;right:0;height:4px;background:${stripBg};z-index:30`;
    canvas.appendChild(strip);
  }

  // ── SHAPES ──────────────────────────────
  if (bgCfg.showShapes) {
    const cw = canvas.offsetWidth || 300;
    const ch = canvas.offsetHeight || 640;
    [[cw*1.1,-cw*0.2,-cw*0.2,0.07],[cw*0.7,cw*0.6,ch*0.55,0.05]].forEach(([sz,l,tp,op]) => {
      const sh = document.createElement('div');
      sh.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;
        border:1px solid ${t.accent};opacity:${op};left:${l}px;top:${tp}px;pointer-events:none`;
      canvas.appendChild(sh);
    });
  }

  // ── TV / DAYDREAM special layout ─────────
  if (assetType === 'tv') {
    renderTVBanner(canvas, t, showWatermark, customScreenshot);
    return;
  }
  if (assetType === 'daydream') {
    renderDaydream(canvas, t, customScreenshot);
    return;
  }

  // ── HEADLINE ────────────────────────────
  if (showBadgesOld) {
    const cw = canvas.offsetWidth || 300;
    const ch = canvas.offsetHeight || 640;
    const hl = document.createElement('div');
    hl.style.cssText = `position:absolute;top:${ch*0.038}px;left:${cw*0.07}px;right:${cw*0.07}px;z-index:10`;
    hl.innerHTML = `
      <div style="font-family:'${hlFont}',sans-serif;font-size:${cw*0.082*hlFontMult}px;font-weight:900;line-height:1.05;color:#fff;text-shadow:0 2px 16px rgba(0,0,0,.5)">
        ${s.line1}${s.accent && s.accent.trim() ? `<br><span style="background:${t.accent};color:${t.bg||'#04101e'};padding:0 6px;border-radius:4px">${s.accent}</span>` : ''}
      </div>
      <div style="font-family:'${subFont}',sans-serif;font-size:${cw*0.042*subFontMult}px;font-weight:500;color:rgba(255,255,255,0.62);margin-top:6px;line-height:1.4">${s.sub_text}</div>`;
    canvas.appendChild(hl);
    makeTextDraggable(hl, 'headlinePos');
  }

  // ── DEVICE FRAME ────────────────────────
  const cw = canvas.offsetWidth || 300;
  const ch = canvas.offsetHeight || 640;
  const devEl = buildDeviceElement(s, t, cw, ch, customScreenshot, customFrame);
  const devWrap = document.createElement('div');
  devWrap.className = 'stage-device-wrap';
  devWrap.style.cssText = `position:absolute;z-index:5;`;
  const _dx = devicePos.x !== null ? devicePos.x : cw/2 - (devEl._dw * deviceScale)/2;
  const _dy = devicePos.y !== null ? devicePos.y : ch*0.28;
  devWrap.style.left = _dx + 'px';
  devWrap.style.top  = _dy + 'px';
  devWrap.style.transform = `rotate(${deviceRotate}deg) scale(${deviceScale})`;
  devWrap.style.transformOrigin = 'top left';

  devWrap.appendChild(devEl);

  // ── Scale handle (bottom-right corner) ──────────────
  const scaleHandle = document.createElement('div');
  scaleHandle.className = 'dev-edge-handle dev-edge-scale';
  scaleHandle.innerHTML = '<i class="fa fa-up-right-and-down-left-from-center"></i>';
  scaleHandle.title = 'Drag to scale';
  devWrap.appendChild(scaleHandle);

  // ── Rotate handle (top-right corner) ────────────────
  const rotHandle = document.createElement('div');
  rotHandle.className = 'dev-edge-handle dev-edge-rotate';
  rotHandle.innerHTML = '<i class="fa fa-rotate"></i>';
  rotHandle.title = 'Drag to rotate';
  devWrap.appendChild(rotHandle);

  canvas.appendChild(devWrap);

  // Drag to move (on body of wrap, not handles)
  makeDraggable(devWrap, (x,y) => { scState().devicePos.x = x; scState().devicePos.y = y; });

  // Scale handle drag
  (function() {
    let scaling = false, startX, startScale;
    scaleHandle.addEventListener('mousedown', e => {
      e.stopPropagation(); e.preventDefault();
      scaling = true;
      startX = e.clientX;
      startScale = scState().deviceScale || 1;
    });
    window.addEventListener('mousemove', e => {
      if (!scaling) return;
      const delta = (e.clientX - startX) / 200;
      const newScale = Math.min(2.5, Math.max(0.3, startScale + delta));
      scState().deviceScale = newScale;
      devWrap.style.transform = `rotate(${scState().deviceRotate || 0}deg) scale(${newScale})`;
      // sync sidebar slider
      const sl = document.getElementById('devScale');
      const sn = document.getElementById('devScaleNum');
      const v  = Math.round(newScale * 100);
      if (sl) sl.value = v;
      if (sn) sn.value = v;
    });
    window.addEventListener('mouseup', () => {
      if (scaling) { scaling = false; renderMockup(); }
    });
  })();

  // Rotate handle drag
  (function() {
    let rotating = false, startX, startRot;
    rotHandle.addEventListener('mousedown', e => {
      e.stopPropagation(); e.preventDefault();
      rotating = true;
      startX = e.clientX;
      startRot = scState().deviceRotate || 0;
    });
    window.addEventListener('mousemove', e => {
      if (!rotating) return;
      const delta = (e.clientX - startX) * 0.4;
      const newRot = Math.min(180, Math.max(-180, startRot + delta));
      scState().deviceRotate = newRot;
      devWrap.style.transform = `rotate(${newRot}deg) scale(${scState().deviceScale || 1})`;
      // sync sidebar slider
      const sl = document.getElementById('devRotate');
      const sn = document.getElementById('devRotateNum');
      const v  = Math.round(newRot);
      if (sl) sl.value = Math.max(-30, Math.min(30, v));
      if (sn) sn.value = v;
    });
    window.addEventListener('mouseup', () => {
      if (rotating) { rotating = false; renderMockup(); }
    });
  })();

  // ── FEATURE STRIP ───────────────────────
  if (showFeatures && s.features.length) {
    const strip = document.createElement('div');
    const _fpos = featurePos || 'bottom';
    let _fposStyle = '';
    if (_fpos === 'bottom')  _fposStyle = `bottom:${ch*0.03}px;left:${cw*0.04}px;right:${cw*0.04}px`;
    else if (_fpos === 'top') _fposStyle = `top:${ch*0.22}px;left:${cw*0.04}px;right:${cw*0.04}px`;
    else                     _fposStyle = `top:50%;transform:translateY(-50%);left:${cw*0.04}px;right:${cw*0.04}px`;
    strip.style.cssText = `position:absolute;${_fposStyle};display:flex;gap:${cw*0.015}px;z-index:20`;
    strip.innerHTML = s.features.slice(0,5).map(f => `
      <div style="flex:1;background:rgba(255,255,255,0.07);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);
        border-radius:${cw*0.025}px;padding:${ch*0.012}px ${cw*0.01}px;text-align:center">
        <div style="font-family:var(--font-display);font-size:${featureFontSz * (cw/300)}px;font-weight:700;color:#fff">${f}</div>
      </div>`).join('');
    canvas.appendChild(strip);
  }

  // ── OVERLAYS (badges/awards/popups) ─────
  overlays.forEach((ov, idx) => {
    const el = document.createElement('div');
    el.className = 'overlay-handle' + (selectedOverlay === ov.id ? ' selected' : '');
    el.style.cssText = `position:absolute;left:${ov.x}px;top:${ov.y}px;z-index:40`;

    const delBtn = document.createElement('button');
    delBtn.className = 'overlay-del';
    delBtn.innerHTML = '×';
    delBtn.onclick = (e) => { e.stopPropagation(); removeOverlay(ov.id); };

    if (ov.type === 'badge') {
      const BADGE_STYLES = {
        accent: `background:${t.accent};color:${t.bg||'#04101e'}`,
        outline:`background:transparent;border:2px solid ${t.accent};color:${t.accent}`,
        dark:   `background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.14);color:#fff`,
        white:  `background:#fff;color:#000`,
      };
      el.innerHTML = `<div class="badge-pill" style="${BADGE_STYLES[ov.style]||BADGE_STYLES.accent};font-size:${cw*0.038}px;padding:${cw*0.025}px ${cw*0.055}px">
        <i class="fa fa-shield-halved" style="font-size:${cw*0.042}px"></i> ${ov.text}
      </div>`;
    } else if (ov.type === 'award') {
      const AWARD_STYLES = {
        gold:   { bg:'linear-gradient(160deg,#2a1f00 0%,#1a1200 100%)', border:'rgba(212,172,60,0.5)', leaf:'#d4ac3c', star:'#f5d06e', text:'#f5d06e', sub:'rgba(245,208,110,0.7)' },
        accent: { bg:`linear-gradient(160deg,${t.bg||'#04101e'} 0%,rgba(0,0,0,0.85) 100%)`, border:`${t.accent}55`, leaf:t.accent, star:t.accent, text:'#fff', sub:'rgba(255,255,255,0.65)' },
        dark:   { bg:'rgba(10,10,15,0.92)', border:'rgba(255,255,255,0.12)', leaf:'rgba(255,255,255,0.5)', star:'#fff', text:'#fff', sub:'rgba(255,255,255,0.55)' },
      };
      const aw = AWARD_STYLES[ov.style] || AWARD_STYLES.gold;
      const sz = cw * 0.3;
      const fsz = sz * 0.18;
      el.innerHTML = `<div style="
        position:relative;
        width:${sz}px; height:${sz*1.05}px;
        background:${aw.bg};
        border:1.5px solid ${aw.border};
        border-radius:${sz*0.1}px;
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        backdrop-filter:blur(10px);
        box-shadow:0 8px 32px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.06);
        overflow:hidden;padding:${sz*0.08}px ${sz*0.06}px ${sz*0.06}px;
        font-family:Montserrat,sans-serif;gap:${sz*0.04}px">
        <!-- Wreath -->
        <div style="color:${aw.leaf};width:${sz*0.85}px;height:${sz*0.45}px;position:relative;flex-shrink:0">
          <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
            <g fill="currentColor">
              <!-- Left branch leaves -->
              <ellipse cx="22" cy="42" rx="12" ry="5.5" transform="rotate(-40,22,42)" opacity=".9"/>
              <ellipse cx="13" cy="28" rx="11" ry="5" transform="rotate(-60,13,28)" opacity=".85"/>
              <ellipse cx="9"  cy="14" rx="10" ry="4.5" transform="rotate(-80,9,14)" opacity=".8"/>
              <ellipse cx="14" cy="4"  rx="9"  ry="4" transform="rotate(-100,14,4)" opacity=".75"/>
              <!-- Right branch leaves -->
              <ellipse cx="98" cy="42" rx="12" ry="5.5" transform="rotate(40,98,42)" opacity=".9"/>
              <ellipse cx="107" cy="28" rx="11" ry="5" transform="rotate(60,107,28)" opacity=".85"/>
              <ellipse cx="111" cy="14" rx="10" ry="4.5" transform="rotate(80,111,14)" opacity=".8"/>
              <ellipse cx="106" cy="4"  rx="9"  ry="4" transform="rotate(100,106,4)" opacity=".75"/>
              <!-- Stems -->
              <path d="M60,55 Q38,35 18,40" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".55"/>
              <path d="M60,55 Q82,35 102,40" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".55"/>
              <!-- Bottom ribbon -->
              <path d="M50,57 Q60,62 70,57" stroke="currentColor" stroke-width="1.8" fill="none" opacity=".7"/>
            </g>
          </svg>
          <!-- Star centered in wreath -->
          <div style="position:absolute;top:2px;left:50%;transform:translateX(-50%);color:${aw.star};font-size:${sz*0.14}px;line-height:1">
            <i class='fa fa-star'></i>
          </div>
        </div>
        <div style="font-size:${fsz}px;font-weight:900;color:${aw.text};text-align:center;line-height:1.1;letter-spacing:.3px">${ov.title}</div>
        ${ov.sub ? `<div style="font-size:${fsz*0.68}px;color:${aw.sub};text-align:center;font-weight:600;letter-spacing:.5px">${ov.sub}</div>` : ''}
      </div>`;
    } else if (ov.type === 'popup' && ov.src) {
      const imgW   = ov.w      || 120;
      const imgRot = ov.rotate || 0;
      el.style.transform = `rotate(${imgRot}deg)`;
      el.style.transformOrigin = 'top left';
      el.innerHTML = `<img src="${ov.src}" style="width:${imgW}px;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.55);display:block;pointer-events:none">`;

      // Scale handle (bottom-right)
      const popScaleH = document.createElement('div');
      popScaleH.style.cssText = `
        position:absolute;bottom:-7px;right:-7px;
        width:16px;height:16px;border-radius:4px;
        background:var(--teal);cursor:se-resize;z-index:55;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,200,168,.5);
        opacity:${selectedOverlay === ov.id ? '1' : '0'};
        transition:opacity .15s;font-size:8px;color:var(--navy);`;
      popScaleH.innerHTML = '<i class="fa fa-up-right-and-down-left-from-center"></i>';
      el.appendChild(popScaleH);

      // Rotate handle (top-right)
      const popRotH = document.createElement('div');
      popRotH.style.cssText = `
        position:absolute;top:-7px;right:-7px;
        width:16px;height:16px;border-radius:50%;
        background:#f59e0b;cursor:crosshair;z-index:55;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(245,158,11,.5);
        opacity:${selectedOverlay === ov.id ? '1' : '0'};
        transition:opacity .15s;font-size:8px;color:#000;`;
      popRotH.innerHTML = '<i class="fa fa-rotate"></i>';
      el.appendChild(popRotH);

      // Scale drag
      (function(overlay, scaleHandle, imgEl) {
        let scaling = false, sStartX, sStartW;
        scaleHandle.addEventListener('mousedown', e => {
          e.stopPropagation(); e.preventDefault();
          scaling = true; sStartX = e.clientX; sStartW = overlay.w || 120;
          selectedOverlay = overlay.id;
        });
        window.addEventListener('mousemove', e => {
          if (!scaling) return;
          const dx = e.clientX - sStartX;
          overlay.w = Math.max(40, Math.min(500, sStartW + dx));
          const img = imgEl.querySelector('img');
          if (img) img.style.width = overlay.w + 'px';
          scaleHandle.style.opacity = '1';
        });
        window.addEventListener('mouseup', () => {
          if (scaling) { scaling = false; renderMockup(); }
        });
      })(ov, popScaleH, el);

      // Rotate drag
      (function(overlay, rotHandle) {
        let rotating = false, rStartX, rStartRot;
        rotHandle.addEventListener('mousedown', e => {
          e.stopPropagation(); e.preventDefault();
          rotating = true; rStartX = e.clientX; rStartRot = overlay.rotate || 0;
          selectedOverlay = overlay.id;
        });
        window.addEventListener('mousemove', e => {
          if (!rotating) return;
          const dx = e.clientX - rStartX;
          overlay.rotate = ((rStartRot + dx * 0.5) + 360) % 360;
          el.style.transform = `rotate(${overlay.rotate}deg)`;
          rotHandle.style.opacity = '1';
        });
        window.addEventListener('mouseup', () => {
          if (rotating) { rotating = false; renderMockup(); }
        });
      })(ov, popRotH);

      // Show handles on hover even if not selected
      el.addEventListener('mouseenter', () => {
        popScaleH.style.opacity = '1';
        popRotH.style.opacity = '1';
      });
      el.addEventListener('mouseleave', () => {
        if (selectedOverlay !== ov.id) {
          popScaleH.style.opacity = '0';
          popRotH.style.opacity = '0';
        }
      });
    }

    el.appendChild(delBtn);
    el.onclick = (e) => {
      if (e.target === el || e.target.tagName === 'IMG') {
        selectedOverlay = ov.id;
        renderMockup();
      }
    };
    canvas.appendChild(el);

    makeDraggable(el, (x,y) => {
      ov.x = x; ov.y = y;
    });
  });

  // ── WATERMARK ───────────────────────────
  if (showWatermark) {
    const wm = document.createElement('div');
    wm.style.cssText = `position:absolute;bottom:8px;right:12px;font-size:8px;font-weight:700;
      color:${t.accent};opacity:0.35;letter-spacing:1.5px;font-family:var(--font-mono);z-index:20`;
    wm.textContent = wmText || 'VELIU LABS';
    canvas.appendChild(wm);
  }
}

// ═══════════════════════════════════════════
// DEVICE BUILDER
// ═══════════════════════════════════════════
function buildDeviceElement(s, t, cw, ch, customScreenshot, customFrame) {
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';

  const isCurrentFold = currentDevice === 'fold';
  const isNoFrame     = currentDevice === 'flat';
  const isTablet      = currentDevice === 'tablet';

  const frameH = isTablet ? ch * 0.48 : ch * 0.62;
  const frameW = isCurrentFold ? frameH * 0.86
                : isTablet      ? frameH * 0.72
                : frameH * 0.46;

  wrap._dw = frameW;
  wrap._dh = frameH;

  const screenHtml = customScreenshot
    ? `<img src="${customScreenshot}" style="width:100%;height:100%;object-fit:cover;display:block">`
    : `<div style="width:100%;height:100%;background:${t.accent}15;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;opacity:.4">
        <i class="fa fa-image" style="font-size:${frameW*0.12}px;color:${t.accent}"></i>
        <div style="font-size:${frameW*0.07}px;font-family:var(--font-display);font-weight:700;color:rgba(255,255,255,.5)">Upload Screenshot</div>
       </div>`;

  if (customFrame) {
    // Custom uploaded frame — place screenshot behind, frame on top
    wrap.style.cssText = `width:${frameW}px;height:${frameH}px;position:relative`;
    wrap.innerHTML = `
      <div style="position:absolute;inset:5%;border-radius:8px;overflow:hidden">${screenHtml}</div>
      <img src="${customFrame}" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:10">`;
  } else if (isNoFrame) {
    wrap.style.cssText = `width:${frameW}px;height:${frameH}px;border-radius:14px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.65)`;
    wrap.innerHTML = screenHtml;
  } else if (isCurrentFold) {
    const panelW = (frameW - 5) / 2;
    wrap.style.cssText = `width:${frameW}px;height:${frameH}px;background:#18213a;border-radius:24px;border:2.5px solid #2d3c5c;box-shadow:0 24px 70px rgba(0,0,0,.75);display:flex;overflow:hidden`;
    wrap.innerHTML = `
      <div style="width:${panelW}px;height:100%;overflow:hidden;border-radius:22px 0 0 22px">${screenHtml}</div>
      <div style="width:5px;background:#2d3c5c;flex-shrink:0"></div>
      <div style="width:${panelW}px;height:100%;overflow:hidden;border-radius:0 22px 22px 0;opacity:.85">${screenHtml}</div>`;
  } else if (isTablet) {
    const br = '18px';
    wrap.style.cssText = `width:${frameW}px;height:${frameH}px;position:relative`;
    wrap.innerHTML = `
      <div style="position:absolute;inset:0;background:#18213a;border-radius:${br};border:2.5px solid #2d3c5c;box-shadow:0 24px 70px rgba(0,0,0,.75)"></div>
      <div style="position:absolute;left:2.5%;top:1.5%;width:95%;height:97%;overflow:hidden;border-radius:14px">${screenHtml}</div>`;
  } else {
    // Standard phone (Pixel-style)
    const notchW = frameW * 0.28;
    wrap.style.cssText = `width:${frameW}px;height:${frameH}px;position:relative`;
    wrap.innerHTML = `
      <div style="position:absolute;inset:0;background:#18213a;border-radius:${frameW*0.12}px;border:2.5px solid #2d3c5c;
        box-shadow:0 0 0 1px rgba(255,255,255,0.04),0 28px 70px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.03)"></div>
      <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:${notchW}px;height:${frameH*0.006}px;background:#2d3c5c;border-radius:0 0 4px 4px;z-index:20"></div>
      <div style="position:absolute;left:3.5%;top:2%;width:93%;height:96%;overflow:hidden;border-radius:${frameW*0.1}px;background:#000">${screenHtml}</div>`;
  }

  return wrap;
}

// ═══════════════════════════════════════════
// TV BANNER RENDER
// ═══════════════════════════════════════════
function renderTVBanner(canvas, t, showWatermark, customScreenshot) {
  const cw = canvas.offsetWidth  || 512;
  const ch = canvas.offsetHeight || 288;
  const bg2 = bgCfg.image
    ? `<img src="${bgCfg.image}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`
    : '';

  canvas.insertAdjacentHTML('beforeend', `
    ${bg2}
    <div style="position:absolute;inset:0;background:linear-gradient(120deg,rgba(0,0,0,.7) 30%,transparent 100%);z-index:1"></div>
    <div style="position:absolute;left:${cw*0.05}px;top:50%;transform:translateY(-50%);z-index:5">
      <div style="font-family:var(--font-display);font-size:${cw*0.065}px;font-weight:900;color:#fff;line-height:1.1">
        ${SCREENS[currentScreen]?.line1 || 'YOUR APP'}
        ${SCREENS[currentScreen]?.accent ? `<br><span style="color:${t.accent}">${SCREENS[currentScreen].accent}</span>` : ''}
      </div>
      <div style="font-family:var(--font-body);font-size:${cw*0.028}px;color:rgba(255,255,255,.65);margin-top:${ch*0.04}px">${SCREENS[currentScreen]?.sub_text || ''}</div>
    </div>
    <div style="position:absolute;right:${cw*0.05}px;top:${ch*0.06}px;z-index:5;font-family:var(--font-display);font-size:${cw*0.03}px;font-weight:800;color:${t.accent}">
      <i class="fa fa-tv"></i> Android TV
    </div>
    ${showWatermark ? `<div style="position:absolute;bottom:8px;right:10px;font-size:9px;color:${t.accent};opacity:.35;font-family:var(--font-mono);letter-spacing:1px;z-index:10">${wmText||'VELIU LABS'}</div>` : ''}
  `);
}

// ═══════════════════════════════════════════
// DAYDREAM RENDER
// ═══════════════════════════════════════════
function renderDaydream(canvas, t, customScreenshot) {
  const cw = canvas.offsetWidth  || 320;
  const ch = canvas.offsetHeight || 320;

  const iconSrc = customScreenshot;
  canvas.insertAdjacentHTML('beforeend', `
    <div style="position:absolute;inset:0;background:radial-gradient(circle at center,${t.accent}22 0%,transparent 70%)"></div>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:5;gap:${ch*0.04}px">
      ${iconSrc
        ? `<img src="${iconSrc}" style="width:${cw*0.45}px;height:${cw*0.45}px;border-radius:${cw*0.12}px;box-shadow:0 0 40px ${t.accent}55">`
        : `<div style="width:${cw*0.45}px;height:${cw*0.45}px;border-radius:${cw*0.12}px;background:${t.accent}22;border:2px solid ${t.accent}44;display:flex;align-items:center;justify-content:center">
             <i class="fa fa-image" style="font-size:${cw*0.15}px;color:${t.accent};opacity:.5"></i>
           </div>`}
      <div style="font-family:var(--font-display);font-size:${cw*0.06}px;font-weight:800;color:#fff;text-align:center">${SCREENS[currentScreen]?.line1 || 'App Name'}</div>
      <div style="font-size:${cw*0.04}px;color:${t.accent};font-weight:600;font-family:var(--font-body)"><i class="fa fa-vr-cardboard"></i> Daydream 360°</div>
      <div style="font-size:${cw*0.028}px;color:rgba(255,255,255,.4);font-family:var(--font-mono)">4096 × 4096 px</div>
    </div>
    <div style="position:absolute;bottom:8px;left:0;right:0;text-align:center;font-size:${cw*0.03}px;color:rgba(255,255,255,.25);font-family:var(--font-mono)">Upload icon via Screenshot Upload</div>
  `);
}

// ═══════════════════════════════════════════
// EXPORT: Use canvas.toBlob for accuracy
// ═══════════════════════════════════════════
async function exportScreenV2(idx) {
  const savedIdx = currentScreen;
  const savedSel = selectedOverlay;
  currentScreen = idx;
  // Restore per-screen state for this index
  const st = SCREENS[idx]._state || makeScreenState();
  SCREENS[idx]._state = st;
  currentDevice = st.device || 'pixel';
  currentTheme  = st.theme  || 'teal';
  // Deselect overlays — no outlines or handles in export
  selectedOverlay = null;
  renderMockup();
  await new Promise(r => setTimeout(r, 300));

  const mockCanvas = document.getElementById('mockup-canvas');
  // Hide selection UI
  mockCanvas.querySelectorAll('.overlay-del,.dev-edge-scale,.dev-edge-rotate').forEach(el => {
    el._prevDisplay = el.style.display;
    el.style.display = 'none';
  });
  mockCanvas.querySelectorAll('.overlay-handle.selected').forEach(el => el.classList.remove('selected'));

  const spec = ASSET_SPECS[assetType];

  const c = await html2canvas(mockCanvas, {
    scale: Math.round(spec.w / mockCanvas.offsetWidth),
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  // Restore hidden elements
  mockCanvas.querySelectorAll('.overlay-del,.dev-edge-scale,.dev-edge-rotate').forEach(el => {
    el.style.display = el._prevDisplay || '';
    delete el._prevDisplay;
  });

  const link = document.createElement('a');
  const screenName = SCREENS[idx]?.name.replace(/\s+/g,'-').toLowerCase() || 'screen';
  link.download = `${assetType}-${idx+1}-${screenName}-${spec.w}x${spec.h}.png`;
  link.href = c.toDataURL('image/png');
  link.click();

  // Restore state
  selectedOverlay = savedSel;
  if (savedIdx !== idx) {
    currentScreen = savedIdx;
    const rst = SCREENS[savedIdx]._state || makeScreenState();
    currentDevice = rst.device || 'pixel';
    currentTheme  = rst.theme  || 'teal';
  }
  renderMockup();
}

// ═══════════════════════════════════════════
// INIT EXTENSION
// ═══════════════════════════════════════════
const _origInit = window.init;
window.addEventListener('DOMContentLoaded', () => {
  // Auto-refresh bg when toggles clicked
  document.querySelectorAll('.tog').forEach(tog => {
    tog.addEventListener('click', () => setTimeout(updateBgCfg, 50));
  });
  refreshOverlaysList();
});


// Ensure per-screen state exists for all screens on boot
SCREENS.forEach(s => { if (!s._state) s._state = makeScreenState(); });

// ═══════════════════════════════════════════════════════
// GLOBAL SETTINGS SWITCH
// ═══════════════════════════════════════════════════════
let globalSettingsOn = false;

function toggleGlobalSettings(togEl) {
  togEl.classList.toggle('on');
  globalSettingsOn = togEl.classList.contains('on');
  togEl.classList.toggle('global-on', globalSettingsOn);
  const hint = document.getElementById('globalHint');
  if (hint) hint.textContent = globalSettingsOn
    ? 'Global mode — settings apply to ALL screens'
    : 'Individual mode — settings apply per screen';
  hint.style.color = globalSettingsOn ? 'var(--teal)' : '';
}

// Wrapper: if global, apply setting to ALL screens, else just current
function applyGlobalOrCurrent(key, value) {
  if (globalSettingsOn) {
    SCREENS.forEach(s => {
      if (!s._state) s._state = makeScreenState();
      s._state[key] = value;
    });
  } else {
    scState()[key] = value;
  }
  renderMockup();
  updateScreenPreviews();
}

// ═══════════════════════════════════════════════════════
// DRAG+DROP SCREENSHOT
// ═══════════════════════════════════════════════════════
function handleScreenshotDrop(event) {
  event.preventDefault();
  const zone = document.getElementById('screenshotDropZone');
  if (zone) zone.style.borderColor = '';
  const file = event.dataTransfer?.files?.[0];
  if (!file || !file.type.startsWith('image/')) {
    showToast('Please drop an image file'); return;
  }
  loadImageFile(file, (dataUrl) => {
    scState().screenshot = dataUrl;
    restoreUploadPreviews();
    renderMockup();
    updateScreenPreviews();
    showToast('Screenshot loaded');
  });
}

function loadImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = e => callback(e.target.result);
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════
// FLOATING DEVICE CONTROLS (click on device to show)
// ═══════════════════════════════════════════════════════
function showFloatingControls(x, y) { return; // removed
  const __noop = 0;
  const panel = document.getElementById('floatingDevControls');
  if (!panel) return;
  syncFloatingPanel();
  panel.classList.add('visible');
  // Position near click, keep in viewport
  const pw = 240, ph = 160;
  const vw = window.innerWidth, vh = window.innerHeight;
  panel.style.left = Math.min(x + 10, vw - pw - 10) + 'px';
  panel.style.top  = Math.min(y + 10, vh - ph - 10) + 'px';
}

function syncFloatingPanel() { return; // removed
  const __noop2 = 0;
  const st = scState();
  const fs = document.getElementById('fdevScale');
  const fr = document.getElementById('fdevRotate');
  const fsn = document.getElementById('fdevScaleNum');
  const frn = document.getElementById('fdevRotateNum');
  if (fs)  fs.value  = Math.round((st.deviceScale  || 1) * 100);
  if (fr)  fr.value  = st.deviceRotate || 0;
  if (fsn) fsn.value = Math.round((st.deviceScale  || 1) * 100);
  if (frn) frn.value = st.deviceRotate || 0;
}

function syncFloatCtrl(key, value, numId, label) { return; // removed
  const __noop3 = 0;
  scState()[key] = value;
  // Sync sidebar sliders too
  const sidebarMap = { deviceScale: 'devScale', deviceRotate: 'devRotate' };
  const sideId = sidebarMap[key];
  if (sideId) {
    const el = document.getElementById(sideId);
    const numEl = document.getElementById(sideId + 'Num');
    const valEl = document.getElementById(sideId + 'Val');
    const rawVal = key === 'deviceScale' ? Math.round(value * 100) : value;
    if (el)    el.value    = rawVal;
    if (numEl) numEl.value = rawVal;
    if (valEl) valEl.textContent = label;
  }
  renderMockup();
}



// ═══════════════════════════════════════════════════════
// DRAGGABLE HEADLINE + SUBTITLE
// ═══════════════════════════════════════════════════════
function makeTextDraggable(el, stateKey) {
  let dragging = false, startX, startY, origX, origY;
  el.style.cursor = 'grab';
  el.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    origX = parseFloat(el.style.left) || 0;
    origY = parseFloat(el.style.top)  || 0;
    el.style.cursor = 'grabbing';
    e.preventDefault(); e.stopPropagation();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.left = (origX + dx) + 'px';
    el.style.top  = (origY + dy) + 'px';
    scState()[stateKey] = { x: origX + dx, y: origY + dy };
  });
  window.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; el.style.cursor = 'grab'; }
  });
}

// ═══════════════════════════════════════════════════════
// FEATURE STRIP EDITOR (up to 3 items)
// ═══════════════════════════════════════════════════════
function buildFeatureItemsList() {
  const el = document.getElementById('featureItemsList');
  const addBtn = document.getElementById('addFeatureBtn');
  if (!el) return;
  const features = sc().features || [];
  el.innerHTML = features.map((f, i) => `
    <div class="feat-item-row">
      <input value="${f.replace(/"/g,'&quot;')}" placeholder="Feature text"
        oninput="updateFeatureItem(${i}, this.value)">
      <button class="feat-del" onclick="removeFeatureItem(${i})" title="Remove">
        <i class="fa fa-xmark"></i>
      </button>
    </div>`).join('');
  if (addBtn) addBtn.style.display = features.length >= 3 ? 'none' : '';
}

function updateFeatureItem(i, value) {
  if (sc().features) {
    sc().features[i] = value;
    renderMockup();
    updateScreenPreviews();
  }
}

function addFeatureItem() {
  if (!sc().features) sc().features = [];
  if (sc().features.length >= 3) { showToast('Maximum 3 items'); return; }
  sc().features.push('New Feature');
  buildFeatureItemsList();
  renderMockup();
  updateScreenPreviews();
}

function removeFeatureItem(i) {
  if (sc().features) {
    sc().features.splice(i, 1);
    buildFeatureItemsList();
    renderMockup();
    updateScreenPreviews();
  }
}

// ═══════════════════════════════════════════════════════
// SCREEN PREVIEWS (mini canvas renders)
// ═══════════════════════════════════════════════════════
let _previewTimer = null;
function updateScreenPreviews() {
  clearTimeout(_previewTimer);
  _previewTimer = setTimeout(_doUpdatePreviews, 400);
}

function _doUpdatePreviews() {
  buildCarousel();  // also rebuild carousel
  const grid = document.getElementById('allScreensGrid');
  if (!grid) return;
  grid.innerHTML = SCREENS.map((s, i) => `
    <div class="mini-screen ${i === currentScreen ? 'current' : ''}"
      id="miniScreen${i}" onclick="selectScreen(${i})" title="${s.name}">
      <div class="mini-label">${s.name}</div>
    </div>`).join('');
  // Render each screen to a tiny canvas thumbnail
  SCREENS.forEach((s, i) => {
    const cell = document.getElementById('miniScreen' + i);
    if (!cell) return;
    // Simple color preview (fast, no full render)
    const st = s._state || makeScreenState();
    const t  = (window.THEMES || {})[st.theme || 'teal'] || { bg: '#040d1a', accent: '#00c8a8' };
    const bg = st.bgCfg?.col1 || t.bg || '#040d1a';
    const ac = st.customAc  || t.accent;
    cell.style.background = `linear-gradient(145deg, ${bg}, ${st.bgCfg?.col2 || bg})`;
    // mini text
    const textEl = document.createElement('div');
    textEl.style.cssText = `position:absolute;top:18%;left:8%;right:8%;font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;color:#fff;line-height:1.2`;
    textEl.textContent = s.line1 || 'Screen ' + (i+1);
    // mini accent bar
    const bar = document.createElement('div');
    bar.style.cssText = `position:absolute;top:0;left:0;right:0;height:2px;background:${ac}`;
    // mini device outline
    const dev = document.createElement('div');
    dev.style.cssText = `position:absolute;left:50%;top:38%;transform:translateX(-50%);width:28%;height:40%;border:1.5px solid rgba(255,255,255,0.15);border-radius:4px;background:rgba(0,0,0,0.3)`;
    cell.appendChild(bar);
    cell.appendChild(textEl);
    cell.appendChild(dev);
  });
}

// ═══════════════════════════════════════════════════════
// CUSTOM CANVAS SIZE
// ═══════════════════════════════════════════════════════
function updateCanvasSizeBadge() {
  const st = scState();
  const spec = ASSET_SPECS[assetType] || ASSET_SPECS.phone;
  const outW = st.customW || spec.w;
  const outH = st.customH || spec.h;
  const badge = document.getElementById('sizeBadge');
  if (badge) badge.textContent = `${outW} × ${outH} px`;
  // Resize preview canvas to match aspect ratio
  const canvas = document.getElementById('mockup-canvas');
  if (canvas && assetType !== 'tv' && assetType !== 'daydream') {
    const maxH = 640;
    const aspect = outW / outH;
    const previewH = maxH;
    const previewW = Math.round(maxH * aspect);
    canvas.style.width  = previewW  + 'px';
    canvas.style.height = previewH + 'px';
  }
  const expRes = document.getElementById('expRes');
  if (expRes) expRes.textContent = `${outW} × ${outH}`;
  renderMockup();
}

function resetCustomSize() {
  scState().customW = null;
  scState().customH = null;
  const cw = document.getElementById('customW');
  const ch = document.getElementById('customH');
  if (cw) cw.value = '';
  if (ch) ch.value = '';
  updateCanvasSizeBadge();
  showToast('Size reset to default');
}

// ═══════════════════════════════════════════════════════
// ZIP EXPORT
// ═══════════════════════════════════════════════════════
async function exportAllZip() {
  if (typeof JSZip === 'undefined') {
    showToast('JSZip not loaded — check internet connection'); return;
  }
  const btn = document.getElementById('exportAllText');
  const loader = document.getElementById('exportAllLoader');
  const bar = document.getElementById('progressBar');
  const fill = document.getElementById('progressFill');

  btn.textContent = 'Building ZIP...';
  if (loader) loader.style.display = 'block';
  if (bar)  bar.style.display = 'block';

  const zip = new JSZip();
  const savedIdx = currentScreen;

  for (let i = 0; i < SCREENS.length; i++) {
    currentScreen = i;
    const st = SCREENS[i]._state || makeScreenState();
    currentDevice = st.device || 'pixel';
    currentTheme  = st.theme  || 'teal';
    renderMockup();
    await new Promise(r => setTimeout(r, 300));

    const mockCanvas = document.getElementById('mockup-canvas');
    const spec = ASSET_SPECS[assetType] || ASSET_SPECS.phone;
    const outW = st.customW || spec.w;
    const outH = st.customH || spec.h;
    const scale = Math.min(Math.round(outW / (mockCanvas.offsetWidth || 300)), 4);

    try {
      // Hide selection UI during ZIP capture
      selectedOverlay = null;
      mockCanvas.querySelectorAll('.overlay-del,.dev-edge-scale,.dev-edge-rotate').forEach(el => { el.style.display='none'; });
      const c = await html2canvas(mockCanvas, {
        scale, useCORS: true, allowTaint: true,
        backgroundColor: null, logging: false,
      });
      mockCanvas.querySelectorAll('.overlay-del,.dev-edge-scale,.dev-edge-rotate').forEach(el => { el.style.display=''; });
      const blob = await new Promise(res => c.toBlob(res, 'image/png'));
      const name = `${assetType}-screen${i+1}-${SCREENS[i].name.replace(/\s+/g,'-').toLowerCase()}.png`;
      zip.file(name, blob);
    } catch (e) { console.warn('Screen', i, 'export failed:', e); }

    if (fill) fill.style.width = `${((i+1)/SCREENS.length)*100}%`;
  }

  // Restore
  currentScreen = savedIdx;
  const st = SCREENS[savedIdx]._state || makeScreenState();
  currentDevice = st.device || 'pixel';
  currentTheme  = st.theme  || 'teal';
  renderMockup();

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = `playstore-mockups-${assetType}.zip`;
  link.click();

  btn.textContent = 'Download All as ZIP';
  if (loader) loader.style.display = 'none';
  setTimeout(() => { if (bar) bar.style.display = 'none'; if (fill) fill.style.width = '0%'; }, 1500);
  showToast(`ZIP with ${SCREENS.length} screens downloaded`);
}


// ═══════════════════════════════════════════════════════
// SIDEBAR TAB SWITCHING
// ═══════════════════════════════════════════════════════
function switchTab(name, btnEl) {
  // No tabs anymore — all content visible. Just rebuild dynamic sections.
  buildScreenList();
  buildTextEditor();
  refreshOverlaysList();
  restoreUploadPreviews();
  buildFeatureItemsList();
  syncControlsToScreen();
}


// ═══════════════════════════════════════════════════════
// SCREEN CAROUSEL (bottom of canvas)
// ═══════════════════════════════════════════════════════
function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  track.innerHTML = SCREENS.map((s, i) => {
    const st  = s._state || makeScreenState();
    const t   = THEMES[st.theme || 'teal'] || THEMES.teal;
    const bg  = st.bgCfg?.col1 || t.bg || '#040d1a';
    const bg2 = st.bgCfg?.col2 || bg;
    const ac  = st.customAc  || t.accent || '#00c8a8';
    const isActive = i === currentScreen;
    return `<div class="carousel-thumb ${isActive ? 'active' : ''}"
      onclick="selectScreen(${i})"
      style="background:linear-gradient(160deg,${bg},${bg2})">
      <span class="ct-num">${i + 1}</span>
      <!-- mini accent strip -->
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:${ac}"></div>
      <!-- mini headline text -->
      <div style="position:absolute;top:10px;left:4px;right:4px;font-family:Montserrat,sans-serif;
        font-size:6px;font-weight:900;color:#fff;line-height:1.2;overflow:hidden;
        display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">
        ${s.line1 || 'Screen ' + (i+1)}
      </div>
      <!-- mini accent badge if set -->
      ${s.accent ? `<div style="position:absolute;top:28px;left:4px;right:4px;
        background:${ac};border-radius:2px;padding:1px 3px;
        font-size:5px;font-weight:900;color:${bg};font-family:Montserrat,sans-serif;
        overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${s.accent}</div>` : ''}
      <!-- mini device silhouette -->
      <div style="position:absolute;top:42px;left:50%;transform:translateX(-50%);
        width:22px;height:40px;border:1.5px solid rgba(255,255,255,0.15);
        border-radius:4px;background:rgba(0,0,0,0.3)">
        ${st.screenshot ? `<img src="${st.screenshot}" style="width:100%;height:100%;object-fit:cover;border-radius:3px">` : ''}
      </div>
      <!-- feature strip dots -->
      ${(s.features && s.features.length && (st.featureShow !== false)) ? `
      <div style="position:absolute;bottom:14px;left:2px;right:2px;display:flex;gap:2px">
        ${s.features.slice(0,3).map(() => `
          <div style="flex:1;height:4px;background:rgba(255,255,255,0.12);
            border-radius:1px"></div>`).join('')}
      </div>` : ''}
      <div class="ct-label">${s.name}</div>
    </div>`;
  }).join('');
}


// ── Click outside overlay → deselect ─────────────────────────
document.getElementById('mockup-canvas').addEventListener('click', (e) => {
  // Deselect if clicked on canvas background or non-overlay elements
  const isOverlay = e.target.closest('.overlay-handle');
  if (!isOverlay && selectedOverlay !== null) {
    selectedOverlay = null;
    renderMockup();
    refreshOverlaysList();
  }
});


// ── Keyboard shortcuts for overlays ─────────────────────────────────
document.addEventListener('keydown', (e) => {
  // Don't intercept when typing in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  if (e.key === 'Escape') {
    if (selectedOverlay !== null) {
      selectedOverlay = null;
      renderMockup();
      refreshOverlaysList();
    }
    return;
  }

  if ((e.key === 'Delete' || e.key === 'Backspace') && selectedOverlay !== null) {
    e.preventDefault();
    removeOverlay(selectedOverlay);
    return;
  }

  // Arrow keys nudge selected overlay
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key) && selectedOverlay !== null) {
    e.preventDefault();
    const step = e.shiftKey ? 10 : 1;
    const ov = scState().overlays.find(o => o.id === selectedOverlay);
    if (ov) {
      if (e.key === 'ArrowLeft')  ov.x -= step;
      if (e.key === 'ArrowRight') ov.x += step;
      if (e.key === 'ArrowUp')    ov.y -= step;
      if (e.key === 'ArrowDown')  ov.y += step;
      renderMockup();
    }
  }
});

// Boot
init();
syncBgCfgToUI(scState().bgCfg);
syncControlsToScreen();
buildFeatureItemsList();
updateScreenPreviews();
// Activate first tab
buildScreenList();
buildTextEditor();
refreshOverlaysList();
buildFeatureItemsList();
syncControlsToScreen();
buildCarousel();
setAssetType("phone", document.querySelector(".asset-row"));

// ═══════════════════════════════════════════
// RESIZABLE SIDEBARS
// ═══════════════════════════════════════════
(function() {
  function initResizer(handleId, panelEl, side) {
    const handle = document.getElementById(handleId);
    if (!handle || !panelEl) return;

    let dragging = false, startX = 0, startW = 0;

    handle.addEventListener('mousedown', e => {
      dragging = true;
      startX   = e.clientX;
      startW   = panelEl.getBoundingClientRect().width;
      handle.classList.add('dragging');
      document.body.style.cursor     = 'col-resize';
      document.body.style.userSelect = 'none';
      document.body.style.pointerEvents = 'none';
      handle.style.pointerEvents = 'auto';
      e.preventDefault();
    });

    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      const dx  = e.clientX - startX;
      const min = side === 'left' ? 320 : 260;
      const max = side === 'left' ? 700 : 500;
      const newW = side === 'left'
        ? Math.min(max, Math.max(min, startW + dx))
        : Math.min(max, Math.max(min, startW - dx));
      panelEl.style.setProperty('width', newW + 'px', 'important');
    });

    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('dragging');
      document.body.style.cursor        = '';
      document.body.style.userSelect    = '';
      document.body.style.pointerEvents = '';
      handle.style.pointerEvents        = '';
    });

    // Double-click resets
    handle.addEventListener('dblclick', () => {
      const def = side === 'left' ? '460px' : '300px';
      panelEl.style.setProperty('width', def, 'important');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const leftPanel  = document.querySelector('.panel-left');
    const rightPanel = document.querySelector('.panel-right');
    if (leftPanel)  leftPanel.style.setProperty('width',  '460px', 'important');
    if (rightPanel) rightPanel.style.setProperty('width', '300px', 'important');
    initResizer('resize-left',  leftPanel,  'left');
    initResizer('resize-right', rightPanel, 'right');
  });
})();
