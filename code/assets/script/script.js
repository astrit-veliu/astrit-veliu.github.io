// ─── bwip-js: load on demand ──────────────────────────────────────────
let bwipReady = false, bwipLoading = false, bwipCallbacks = [];
function loadBwip(cb) {
  if (bwipReady) { cb(); return; }
  bwipCallbacks.push(cb);
  if (bwipLoading) return;
  bwipLoading = true;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/bwip-js@4.3.0/dist/bwip-js-min.js';
  s.onload = () => { bwipReady=true; bwipLoading=false; bwipCallbacks.forEach(f=>f()); bwipCallbacks=[]; };
  s.onerror = () => { bwipLoading=false; bwipCallbacks=[]; toast('⚠️','Failed to load barcode library. Check your connection.'); };
  document.head.appendChild(s);
}

// ─── FORMAT HINTS ─────────────────────────────────────────────────────
const hints = {
  qrcode:     'Any text or URL, up to ~4000 chars.',
  datamatrix: 'Any ASCII text or binary data.',
  azteccode:  'Any text. Good for small sizes.',
  pdf417:     'Text or numeric data, up to ~1800 chars.',
  code128:    'Any ASCII text — common in logistics.',
  code39:     'UPPERCASE letters, digits, and - . $ / + % space only.',
  ean13:      'Exactly 12 digits (13th check digit is auto-added).',
  upca:       'Exactly 11 digits (12th check digit is auto-added).',
  maxicode:   'Text data. Used by UPS / postal services.',
};

// square formats (bwip should NOT receive height= override)
const squareFmts = new Set(['datamatrix','azteccode','maxicode','qrcode']);

let fmt = 'qrcode', lastTxt = '', dotStyle = 'square', centerIconSrc = null;

// ─── FORMAT SELECT ────────────────────────────────────────────────────
function selFmt(b) {
  document.querySelectorAll('.fb').forEach(x=>x.classList.remove('on'));
  b.classList.add('on'); fmt = b.dataset.fmt;
  document.getElementById('fmt-hint').textContent = hints[fmt] || '';
  // show QR-only customization panel only for qrcode
  document.getElementById('qr-custom').style.display = fmt === 'qrcode' ? '' : 'none';
}
document.getElementById('fmt-hint').textContent = hints['qrcode'];

// ─── QR DOT STYLE ────────────────────────────────────────────────────
function selStyle(b) {
  document.querySelectorAll('.style-chip').forEach(x=>x.classList.remove('on'));
  b.classList.add('on'); dotStyle = b.dataset.style;
}

// ─── CENTER ICON ─────────────────────────────────────────────────────
function handleIcon(e) {
  const file = e.target.files[0]; if (!file) return;
  const rd = new FileReader();
  rd.onload = ev => {
    centerIconSrc = ev.target.result;
    const prev = document.getElementById('icon-prev');
    prev.src = centerIconSrc; prev.style.display = 'block';
    document.getElementById('icon-clear').style.display = 'block';
  };
  rd.readAsDataURL(file);
}
function clearIcon() {
  centerIconSrc = null;
  document.getElementById('icon-prev').style.display = 'none';
  document.getElementById('icon-clear').style.display = 'none';
  document.getElementById('icon-file').value = '';
}

// ─── LOAD qrcode-generator (exposes raw module matrix) ───────────────
let qrgenReady = false, qrgenLoading = false, qrgenCallbacks = [];
function loadQrGen(cb) {
  if (qrgenReady) { cb(); return; }
  qrgenCallbacks.push(cb);
  if (qrgenLoading) return;
  qrgenLoading = true;
  const s = document.createElement('script');
  // qrcode-generator: tiny lib that gives us isDark(row,col) directly
  s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';
  s.onload = () => { qrgenReady=true; qrgenLoading=false; qrgenCallbacks.forEach(f=>f()); qrgenCallbacks=[]; };
  s.onerror = () => { qrgenLoading=false; qrgenCallbacks=[]; };
  document.head.appendChild(s);
}

// ─── CUSTOM QR RENDERER ──────────────────────────────────────────────
// Uses qrcode-generator for the raw boolean module matrix — 100% accurate.
// Then draws styled dots and optional center icon on a canvas.
function renderCustomQR(text, size, darkColor, style, iconSrc, callback) {
  loadQrGen(() => {
    try {
      // qr is from qrcode-generator lib (global `qrcode`)
      const qr = qrcode(0, 'H'); // type 0 = auto, H = highest error correction
      qr.addData(text);
      qr.make();

      const count = qr.getModuleCount(); // e.g. 29 for version 3
      const quiet = 4; // quiet zone modules
      const total = count + quiet * 2;
      const mod = size / total;           // pixels per module

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');

      // white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = darkColor;

      for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
          if (!qr.isDark(row, col)) continue;

          const x = (col + quiet) * mod;
          const y = (row + quiet) * mod;
          const s = mod;

          ctx.beginPath();
          if (style === 'dots') {
            ctx.arc(x + s/2, y + s/2, s * 0.44, 0, Math.PI*2);
          } else if (style === 'classy') {
            ctx.arc(x + s/2, y + s/2, s * 0.44, 0, Math.PI*2);
          } else if (style === 'rounded') {
            const r = s * 0.3;
            ctx.moveTo(x+r, y);
            ctx.lineTo(x+s-r, y); ctx.quadraticCurveTo(x+s,y, x+s,y+r);
            ctx.lineTo(x+s, y+s-r); ctx.quadraticCurveTo(x+s,y+s, x+s-r,y+s);
            ctx.lineTo(x+r, y+s); ctx.quadraticCurveTo(x,y+s, x,y+s-r);
            ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x,y, x+r,y);
          } else {
            // square — default, most compatible
            ctx.rect(x, y, s, s);
          }
          ctx.fill();
        }
      }

      // ── center icon overlay ──
      if (iconSrc) {
        const ico = new Image();
        ico.onload = () => {
          const iSize = size * 0.2;   // 20% of QR — safe with H error correction
          const ix = (size - iSize) / 2;
          const iy = (size - iSize) / 2;
          const pad = iSize * 0.18;
          // white rounded-rect background
          ctx.save();
          ctx.fillStyle = '#ffffff';
          const br = (iSize + pad*2) * 0.18;
          const bx = ix - pad, by = iy - pad, bw = iSize + pad*2, bh = iSize + pad*2;
          ctx.beginPath();
          ctx.moveTo(bx+br, by);
          ctx.lineTo(bx+bw-br, by); ctx.quadraticCurveTo(bx+bw,by, bx+bw,by+br);
          ctx.lineTo(bx+bw, by+bh-br); ctx.quadraticCurveTo(bx+bw,by+bh, bx+bw-br,by+bh);
          ctx.lineTo(bx+br, by+bh); ctx.quadraticCurveTo(bx,by+bh, bx,by+bh-br);
          ctx.lineTo(bx, by+br); ctx.quadraticCurveTo(bx,by, bx+br,by);
          ctx.closePath();
          ctx.fill();
          // clip icon to rounded rect
          ctx.beginPath();
          const cr = iSize * 0.14;
          ctx.moveTo(ix+cr, iy);
          ctx.lineTo(ix+iSize-cr, iy); ctx.quadraticCurveTo(ix+iSize,iy, ix+iSize,iy+cr);
          ctx.lineTo(ix+iSize, iy+iSize-cr); ctx.quadraticCurveTo(ix+iSize,iy+iSize, ix+iSize-cr,iy+iSize);
          ctx.lineTo(ix+cr, iy+iSize); ctx.quadraticCurveTo(ix,iy+iSize, ix,iy+iSize-cr);
          ctx.lineTo(ix, iy+cr); ctx.quadraticCurveTo(ix,iy, ix+cr,iy);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ico, ix, iy, iSize, iSize);
          ctx.restore();
          callback(canvas);
        };
        ico.onerror = () => callback(canvas);
        ico.src = iconSrc;
      } else {
        callback(canvas);
      }
    } catch(e) {
      console.error('QR render error', e);
      callback(null);
    }
  });
}

// ─── GENERATE ─────────────────────────────────────────────────────────
function generate() {
  const txt = document.getElementById('gi').value.trim();
  if (!txt) { toast('✏️','Enter some content first'); return; }
  const sz  = parseInt(document.getElementById('gs').value);
  const col = document.getElementById('gc').value;
  const out = document.getElementById('qr-out');
  const btn = document.getElementById('gen-btn');
  out.innerHTML = ''; lastTxt = txt;

  if (fmt === 'qrcode') {
    btn.innerHTML = '<span class="spinner"></span>Rendering…';
    btn.disabled = true;
    renderCustomQR(txt, sz, col, dotStyle, centerIconSrc, (canvas) => {
      btn.textContent = 'Generate Barcode'; btn.disabled = false;
      if (!canvas) { toast('❌','QR render failed'); return; }
      out.appendChild(canvas); showResult();
    });
    return;
  }

  // non-QR: load bwip-js dynamically
  btn.innerHTML = '<span class="spinner"></span>Loading library…';
  btn.disabled = true;

  loadBwip(() => {
    btn.textContent = 'Generate Barcode'; btn.disabled = false;
    out.innerHTML = '';
    const c = document.createElement('canvas');
    out.appendChild(c);

    // For square formats: don't pass height (let bwip decide)
    // For linear formats: pass a reasonable height
    const isSquare = squareFmts.has(fmt);
    const sc = Math.max(3, Math.round(sz / 70));

    const opts = {
      bcid: fmt, text: txt, scale: sc,
      includetext: false,
      backgroundcolor: 'ffffff',
      barcolor: col.replace('#',''),
    };
    if (!isSquare) opts.height = Math.round(sz / 16); // row units for linear barcodes

    try {
      bwipjs.toCanvas(c, opts);
      // For square formats, force the canvas to render at equal width/height visually
      if (isSquare) {
        const side = Math.max(c.width, c.height);
        // redraw to a square canvas with centered content
        const sq = document.createElement('canvas');
        sq.width = sq.height = side;
        const sctx = sq.getContext('2d');
        sctx.fillStyle = '#ffffff';
        sctx.fillRect(0,0,side,side);
        const ox = Math.round((side - c.width) / 2);
        const oy = Math.round((side - c.height) / 2);
        sctx.drawImage(c, ox, oy);
        out.innerHTML = '';
        out.appendChild(sq);
      }
      showResult();
    } catch(e) {
      out.innerHTML = '';
      const d = document.createElement('div');
      d.style.cssText = 'color:#FF8FAA;font-size:12px;padding:14px 10px;text-align:center;line-height:1.6;';
      const msg = String(e);
      d.textContent = '⚠ ' + (
        (msg.includes('must be')||msg.includes('length')||msg.includes('numeric')||msg.includes('digit'))
          ? hints[fmt] || 'Invalid input for this format.'
          : 'Cannot generate ' + fmt.toUpperCase() + '. ' + (hints[fmt]||'')
      );
      out.appendChild(d);
      document.getElementById('qr-res').classList.add('on');
    }
  });
}

function showResult() {
  const r = document.getElementById('qr-res');
  r.classList.add('on');
  setTimeout(() => r.scrollIntoView({ behavior:'smooth', block:'nearest' }), 80);
}

function getC() { return document.querySelector('#qr-out canvas'); }

function dlPNG() {
  const c = getC(); if (!c) return;
  const a = document.createElement('a');
  a.download = 'barcode-' + fmt + '.png';
  a.href = c.toDataURL('image/png'); a.click();
  toast('⬇','Downloaded!');
}
async function copyImg() {
  const c = getC(); if (!c) return;
  try { c.toBlob(async b => { await navigator.clipboard.write([new ClipboardItem({'image/png':b})]); toast('📋','Image copied!'); }); }
  catch { toast('⚠','Copy not supported — use Download'); }
}
async function shareNative() {
  const c = getC(); if (!c) return;
  if (!navigator.share) { toast('⚠','Share not available in this browser'); return; }
  c.toBlob(async b => {
    const f = new File([b],'barcode.png',{type:'image/png'});
    try { await navigator.share({files:[f],title:'Barcode',text:lastTxt}); } catch {}
  });
}
function shareWA()    { open('https://wa.me/?text='+enc(lastTxt),'_blank'); }
function shareTG()    { open('https://t.me/share/url?url='+enc(location.href)+'&text='+enc(lastTxt),'_blank'); }
function shareTW()    { open('https://twitter.com/intent/tweet?text='+enc(lastTxt),'_blank'); }
function shareEmail() { open('mailto:?subject=Barcode&body='+enc(lastTxt),'_blank'); }
function shareLI()    { open('https://www.linkedin.com/shareArticle?mini=true&url='+enc(location.href)+'&summary='+enc(lastTxt),'_blank'); }
function shareRD()    { open('https://reddit.com/submit?title='+enc(lastTxt),'_blank'); }
function enc(s)       { return encodeURIComponent(s); }

// ─── DECODE ───────────────────────────────────────────────────────────
function oDO(e) { e.preventDefault(); document.getElementById('dz').classList.add('ov'); }
function oDL()  { document.getElementById('dz').classList.remove('ov'); }
function oDD(e) {
  e.preventDefault(); document.getElementById('dz').classList.remove('ov');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) procImg(f); else toast('⚠', 'Drop an image file');
}
function hFile(e) { const f = e.target.files[0]; if (f) procImg(f); }

function procImg(file) {
  const rd = new FileReader();
  rd.onload = function(ev) {
    const src = ev.target.result;
    document.getElementById('dprev').src = src;
    document.getElementById('dcontent').innerHTML = '<div style="color:var(--ink-f);font-size:12px;padding:10px 0;">Scanning…</div>';
    document.getElementById('dec-res').classList.add('on');

    const img = new Image();
    img.onload = function() {
      const cv = document.createElement('canvas');
      cv.width = img.width; cv.height = img.height;
      const ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, cv.width, cv.height);

      // jsQR first
      const qr = jsQR(id.data, id.width, id.height, { inversionAttempts: 'dontInvert' });
      if (qr) { showDec('QR Code', qr.data); return; }

      // ZXing fallback
      try {
        const hints = new Map();
        hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
          ZXing.BarcodeFormat.DATA_MATRIX, ZXing.BarcodeFormat.AZTEC,
          ZXing.BarcodeFormat.PDF_417, ZXing.BarcodeFormat.CODE_128,
          ZXing.BarcodeFormat.CODE_39, ZXing.BarcodeFormat.EAN_13,
          ZXing.BarcodeFormat.UPC_A, ZXing.BarcodeFormat.QR_CODE,
          ZXing.BarcodeFormat.ITF, ZXing.BarcodeFormat.EAN_8,
        ]);
        hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
        const rdr = new ZXing.MultiFormatReader(); rdr.setHints(hints);
        const lum = new ZXing.HTMLCanvasElementLuminanceSource(cv);
        const bmp = new ZXing.BinaryBitmap(new ZXing.HybridBinarizer(lum));
        const res = rdr.decode(bmp);
        if (res) showDec(res.getBarcodeFormat().toString(), res.getText());
      } catch { showDecErr(); }
    };
    img.src = src;
  };
  rd.readAsDataURL(file);
}

function showDec(format, text) {
  const isUrl = /^https?:\/\//i.test(text);
  const disp = isUrl ? `<a href="${text}" target="_blank" rel="noopener">${esc(text)}</a>` : esc(text);
  document.getElementById('dcontent').innerHTML = `
    <div class="rc">
      <div class="rf">${esc(format)}</div>
      <div class="rtxt">${disp}</div>
      <div class="ra">
        <button class="btn-out" onclick="cpTxt(${JSON.stringify(text)})">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy text
        </button>
        ${isUrl ? `<button class="btn-out" onclick="window.open(${JSON.stringify(text)},'_blank')">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open URL
        </button>` : ''}
      </div>
    </div>`;
}
function showDecErr() {
  document.getElementById('dcontent').innerHTML = `
    <div class="derr">No barcode detected. Try a cleaner image with good contrast and the full barcode visible. Supports: QR, Data Matrix, Aztec, PDF417, Code128, Code39, EAN, UPC.</div>`;
}

function cpTxt(t) { navigator.clipboard.writeText(t).then(() => toast('📋', 'Copied!')).catch(() => toast('⚠', 'Copy failed')); }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function toast(icon, msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('on');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('on'), 2800);
}

// ─── STICKY NAV + SCROLL PROGRESS ────────────────────────────────────
const navEl = document.getElementById('nav');
const progEl = document.getElementById('progress');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // nav frosted glass trigger
  if (y > 20) navEl.classList.add('scrolled');
  else navEl.classList.remove('scrolled');

  // progress bar
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? y / total : 0;
  progEl.style.transform = `scaleX(${pct})`;
}, { passive: true });

// keyboard shortcut
document.getElementById('gi').addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate();
});