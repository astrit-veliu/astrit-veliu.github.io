import { el, icon } from '../core/dom.js';

export const emptyState = (iconName, message) =>
  el('div', { class: 'empty' }, icon(iconName), el('p', {}, message));
