// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Email (assembled in JS to avoid scrapers)
const _em = ['veliu.labs','gmail.com'].join('@');
document.querySelectorAll('[data-mail]').forEach(el=>{
  el.href = 'mailto:' + _em;
  if(el.dataset.mailText) el.textContent = _em;
});

// Cursor
const dot = document.getElementById('curDot');
const ring = document.getElementById('curRing');
const ringEl = document.getElementById('curRingEl');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.cssText='left:'+mx+'px;top:'+my+'px;';
});
function animRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.cssText='left:'+rx+'px;top:'+ry+'px;';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.app-card,.chip,.s-dot,.social-item,.play-badge').forEach(el=>{
  el.addEventListener('mouseenter',()=>ringEl.classList.add('hov'));
  el.addEventListener('mouseleave',()=>ringEl.classList.remove('hov'));
});

// Nav stuck
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('stuck', window.scrollY>10);
  document.getElementById('topBtn').classList.toggle('show', window.scrollY>400);
  updateDots();
});

// Section dots
const sections=['home','apps','about','contact'];
const sdots=document.querySelectorAll('.s-dot');
function updateDots(){
  const mid=window.scrollY+window.innerHeight/2;
  sections.forEach((id,i)=>{
    const el=document.getElementById(id);
    if(!el)return;
    sdots[i].classList.toggle('on', mid>=el.offsetTop && mid<el.offsetTop+el.offsetHeight);
  });
}
function goTo(id){ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); }
updateDots();

// Mobile nav
function toggleMobile(){
  document.getElementById('mobileNav').classList.toggle('open');
}
function closeMobile(){
  document.getElementById('mobileNav').classList.remove('open');
}

// Theme
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme');
  const next=cur==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',next);
  try{ localStorage.setItem('vl-theme',next); }catch(e){}
}
(function(){
  try{
    const saved=localStorage.getItem('vl-theme')||'light';
    document.documentElement.setAttribute('data-theme',saved);
  }catch(e){
    document.documentElement.setAttribute('data-theme','light');
  }
})();

// Reveal on scroll - no IntersectionObserver to avoid iframe issues
function checkReveals(){
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top < window.innerHeight - 30) el.classList.add('in');
  });
}
// Run immediately, on scroll, and on load
checkReveals();
window.addEventListener('scroll', checkReveals, {passive:true});
window.addEventListener('load', checkReveals);
// Fallback: reveal everything after 800ms in case scroll never fires
setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')), 800);

// Form
function handleForm(e){
  e.preventDefault();
  const f=e.target;
  const em=['veliu.labs','gmail.com'].join('@');
  const body='Name: '+f.name.value+'%0AEmail: '+f.email.value+'%0A%0A'+f.message.value;
  const link='mailto:'+em+'?subject='+encodeURIComponent(f.subject.value)+'&body='+body;
  window.location.href=link;
  const t=document.getElementById('toast');
  t.classList.add('show');
  f.reset();
  setTimeout(()=>t.classList.remove('show'),5000);
}