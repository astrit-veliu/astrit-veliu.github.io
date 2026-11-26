import { el, icon } from '../core/dom.js';
import { richText } from './rich-text.js';

export const callout = ({ icon: iconName, title, text }) =>
  el('aside', { class: 'callout' },
    icon(iconName),
    el('p', {}, el('b', {}, `${title}: `), richText(text)));
