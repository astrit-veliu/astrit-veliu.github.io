import { $ } from '../core/dom.js';

let reset;

export function startProgress(duration) {
  const bar = $('#progress');
  clearTimeout(reset);
  bar.style.transition = 'none';
  bar.style.width = '0%';
  bar.style.opacity = '1';
  bar.getBoundingClientRect();
  bar.style.transition = `width ${duration}ms linear`;
  bar.style.width = '100%';
  reset = setTimeout(() => {
    bar.style.opacity = '0';
    reset = setTimeout(() => {
      bar.style.transition = 'none';
      bar.style.width = '0%';
    }, 300);
  }, duration + 200);
}
