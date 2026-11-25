import { $, mount, html } from '../core/dom.js';
import { icon } from './icons.js';

const DURATION = 3000;
let timer;

export function showToast(message, tone = 'success') {
  const host = $('#toast');
  mount(host, html`<span class="toast-icon toast-icon--${tone}">${icon(tone === 'success' ? 'check' : 'error')}</span><span>${message}</span>`);
  host.dataset.tone = tone;
  host.classList.add('is-visible');
  clearTimeout(timer);
  timer = setTimeout(() => host.classList.remove('is-visible'), DURATION);
}
