let fmt='qrcode',lastTxt='',qrInst=null;

function selFmt(b){
  document.querySelectorAll('.fb').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');fmt=b.dataset.fmt;
}

function generate(){
  const txt=document.getElementById('gi').value.trim();
  if(!txt){toast('Enter some content first');return;}
  const sz=parseInt(document.getElementById('gs').value);
  const col=document.getElementById('gc').value;
  const out=document.getElementById('qr-out');
  out.innerHTML='';qrInst=null;lastTxt=txt;

  if(fmt==='qrcode'){
    try{
      qrInst=new QRCode(out,{text:txt,width:sz,height:sz,colorDark:col,colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
    }catch(e){toast('QR error: '+e.message);return;}
  } else {
    const c=document.createElement('canvas');
    out.appendChild(c);
    const sc=Math.max(2,Math.round(sz/80));
    try{
      bwipjs.toCanvas(c,{
        bcid:fmt,text:txt,scale:sc,
        height:Math.round(sz/18),
        includetext:false,
        backgroundcolor:'ffffff',
        barcolor:col.replace('#',''),
      });
    }catch(e){
      out.innerHTML='';
      const d=document.createElement('div');
      d.style.cssText='color:#FF8FAA;font-size:12px;padding:16px;text-align:center;max-width:260px;line-height:1.5';
      d.textContent='Cannot generate '+fmt.toUpperCase()+': '+e;
      out.appendChild(d);
      toast('Check your input for '+fmt.toUpperCase());
    }
  }
  const r=document.getElementById('qr-res');
  r.classList.add('on');
  setTimeout(()=>r.scrollIntoView({behavior:'smooth',block:'nearest'}),80);
}

function getC(){return document.querySelector('#qr-out canvas');}

function dlPNG(){
  const c=getC();if(!c)return;
  const a=document.createElement('a');a.download='barcode-'+fmt+'.png';a.href=c.toDataURL('image/png');a.click();toast('Downloaded!');
}
async function copyImg(){
  const c=getC();if(!c)return;
  try{c.toBlob(async b=>{await navigator.clipboard.write([new ClipboardItem({'image/png':b})]);toast('Copied!')});}
  catch{toast('Copy not supported — use Download');}
}
async function shareNative(){
  const c=getC();if(!c)return;
  if(!navigator.share){toast('Share not available here');return;}
  c.toBlob(async b=>{
    const f=new File([b],'barcode.png',{type:'image/png'});
    try{await navigator.share({files:[f],title:'Barcode',text:lastTxt});}catch{}
  });
}
function shareWA(){window.open('https://wa.me/?text='+encodeURIComponent(lastTxt),'_blank');}
function shareEmail(){window.open('mailto:?subject=Barcode&body='+encodeURIComponent(lastTxt),'_blank');}

// DECODE
function oDO(e){e.preventDefault();document.getElementById('dz').classList.add('ov');}
function oDL(){document.getElementById('dz').classList.remove('ov');}
function oDD(e){e.preventDefault();document.getElementById('dz').classList.remove('ov');const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))procImg(f);else toast('Drop an image file');}
function hFile(e){const f=e.target.files[0];if(f)procImg(f);}

function procImg(file){
  const rd=new FileReader();
  rd.onload=function(ev){
    const src=ev.target.result;
    document.getElementById('dprev').src=src;
    const img=new Image();
    img.onload=function(){
      const cv=document.createElement('canvas');
      cv.width=img.width;cv.height=img.height;
      const ctx=cv.getContext('2d');
      ctx.drawImage(img,0,0);
      const id=ctx.getImageData(0,0,cv.width,cv.height);
      // jsQR first
      const qr=jsQR(id.data,id.width,id.height,{inversionAttempts:'dontInvert'});
      if(qr){showDec('QR Code',qr.data);return;}
      // ZXing fallback
      try{
        const hints=new Map();
        hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS,[
          ZXing.BarcodeFormat.DATA_MATRIX,ZXing.BarcodeFormat.AZTEC,
          ZXing.BarcodeFormat.PDF_417,ZXing.BarcodeFormat.CODE_128,
          ZXing.BarcodeFormat.CODE_39,ZXing.BarcodeFormat.EAN_13,
          ZXing.BarcodeFormat.UPC_A,ZXing.BarcodeFormat.QR_CODE,
          ZXing.BarcodeFormat.ITF,ZXing.BarcodeFormat.EAN_8,
        ]);
        hints.set(ZXing.DecodeHintType.TRY_HARDER,true);
        const rdr=new ZXing.MultiFormatReader();rdr.setHints(hints);
        const lum=new ZXing.HTMLCanvasElementLuminanceSource(cv);
        const bin=new ZXing.HybridBinarizer(lum);
        const bmp=new ZXing.BinaryBitmap(bin);
        const res=rdr.decode(bmp);
        if(res)showDec(res.getBarcodeFormat().toString(),res.getText());
      }catch{showDecErr();}
    };
    img.src=src;
    document.getElementById('dec-res').classList.add('on');
  };
  rd.readAsDataURL(file);
}

function showDec(format,text){
  const isUrl=/^https?:\/\//i.test(text);
  const disp=isUrl?`<a href="${text}" target="_blank" rel="noopener">${esc(text)}</a>`:esc(text);
  document.getElementById('dcontent').innerHTML=`
    <div class="rc">
      <div class="rf">${esc(format)}</div>
      <div class="rt">${disp}</div>
      <div class="ra">
        <button class="btn-out" onclick="cpTxt(${JSON.stringify(text)})">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy text
        </button>
        ${isUrl?`<button class="btn-out" onclick="window.open(${JSON.stringify(text)},'_blank')">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open URL
        </button>`:''}
      </div>
    </div>`;
}
function showDecErr(){
  document.getElementById('dcontent').innerHTML=`<div class="derr">No barcode detected. Try a cleaner image — good contrast and the full barcode visible helps. Supported: QR, Data Matrix, Aztec, PDF417, Code128, Code39, EAN, UPC.</div>`;
}
function cpTxt(t){navigator.clipboard.writeText(t).then(()=>toast('Copied!')).catch(()=>toast('Copy failed'));}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2600);}
document.getElementById('gi').addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.metaKey||e.ctrlKey))generate();});