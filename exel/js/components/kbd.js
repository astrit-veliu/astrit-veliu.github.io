import { el } from '../core/dom.js';

export function kbdGroup(tokens) {
  return el('span', { class: 'keys' }, tokens.flatMap(token =>
    token.split(' / ').flatMap((key, index) => [
      index ? el('span', { class: 'kbd-or', 'aria-hidden': 'true' }, '/') : null,
      el('kbd', {}, key),
    ])
  ));
}
