import { el } from '../core/dom.js';
import { kbdGroup } from './kbd.js';

const markup = /\*\*(.+?)\*\*|\{\{(.+?)\}\}/g;

export function richText(source) {
  const fragment = document.createDocumentFragment();
  let cursor = 0;
  for (const match of source.matchAll(markup)) {
    if (match.index > cursor) fragment.append(source.slice(cursor, match.index));
    fragment.append(match[1] ? el('b', {}, match[1]) : kbdGroup(match[2].split('+')));
    cursor = match.index + match[0].length;
  }
  if (cursor < source.length) fragment.append(source.slice(cursor));
  return fragment;
}
