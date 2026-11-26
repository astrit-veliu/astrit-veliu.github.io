import { el } from '../core/dom.js';
import { richText } from './rich-text.js';

export function pageHead({ title, description, count, statLabel }) {
  return el('header', { class: 'page-head' },
    el('div', {},
      el('h1', { class: 'page-title' }, title),
      el('p', { class: 'page-desc' }, richText(description))),
    el('p', { class: 'stat' },
      el('span', { class: 'stat-num' }, String(count)),
      el('span', { class: 'stat-label' }, statLabel)));
}
