import { $, $$, html } from '../../../src/core/dom.js';
import { icon } from '../../../src/components/icons.js';

const DRAG_THRESHOLD = 6;

export const carouselControls = ({ previous, next }) => html`
  <div class="carousel-controls">
    <button type="button" class="carousel-btn" data-carousel-prev aria-label="${previous}">${icon('arrowRight', 'icon-flip')}</button>
    <button type="button" class="carousel-btn" data-carousel-next aria-label="${next}">${icon('arrowRight')}</button>
  </div>
`;

export const carouselProgress = () => html`<div class="carousel-progress" aria-hidden="true"><span></span></div>`;

function enableDrag(track) {
  let drag = null;
  let blockClick = false;

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { x: event.clientX, left: track.scrollLeft, moved: false };
  });

  window.addEventListener('pointermove', (event) => {
    if (!drag) return;
    const delta = event.clientX - drag.x;
    if (!drag.moved && Math.abs(delta) < DRAG_THRESHOLD) return;
    drag.moved = true;
    track.classList.add('is-dragging');
    track.scrollLeft = drag.left - delta;
  });

  const release = () => {
    if (!drag) return;
    blockClick = drag.moved;
    drag = null;
    track.classList.remove('is-dragging');
    setTimeout(() => {
      blockClick = false;
    }, 0);
  };

  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  track.addEventListener('dragstart', (event) => event.preventDefault());
  track.addEventListener(
    'click',
    (event) => {
      if (!blockClick) return;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
}

function setup(root) {
  const track = $('[data-carousel-track]', root);
  const prev = $('[data-carousel-prev]', root);
  const next = $('[data-carousel-next]', root);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;

  const stride = () => {
    const [first, second] = track.children;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  const update = () => {
    queued = false;
    const max = track.scrollWidth - track.clientWidth;
    root.dataset.scrollable = String(max > 1);
    root.style.setProperty('--thumb', max > 0 ? track.clientWidth / track.scrollWidth : 1);
    root.style.setProperty('--progress', max > 0 ? track.scrollLeft / max : 0);
    prev.disabled = track.scrollLeft < 1;
    next.disabled = track.scrollLeft > max - 1;
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  const move = (direction) =>
    track.scrollBy({ left: direction * stride(), behavior: reduce.matches ? 'auto' : 'smooth' });

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', schedule, { passive: true });
  new ResizeObserver(schedule).observe(track);
  enableDrag(track);
  update();
}

export const initCarousels = () => $$('[data-carousel]').forEach(setup);
