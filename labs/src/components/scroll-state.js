import { $ } from '../../../src/core/dom.js';

const STUCK_OFFSET = 10;
const TOP_VIEWPORT_RATIO = 0.5;

export function initScrollState() {
  const nav = $('#nav');
  const top = $('#scrollTop');
  let queued = false;

  const update = () => {
    queued = false;
    nav.classList.toggle('is-stuck', window.scrollY > STUCK_OFFSET);
    top.classList.toggle('is-visible', window.scrollY > window.innerHeight * TOP_VIEWPORT_RATIO);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}
