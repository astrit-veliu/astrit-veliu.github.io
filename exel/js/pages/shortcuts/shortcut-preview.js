import { el, icon } from '../../core/dom.js';
import { buildDemo } from './demo-engine.js';
import { miniGrid } from './mini-grid.js';

export function shortcutPreview(id, page, ui) {
  const panel = page.panels[id];
  if (panel) {
    return el('div', { class: 'demo' },
      el('div', { class: 'dialog' },
        el('p', { class: 'dialog-title' }, icon(panel.icon), panel.title),
        el('ul', { class: 'dialog-list' }, panel.options.map((option, index) =>
          el('li', { class: index === panel.picked ? 'on' : '' }, option)))));
  }

  const { before, after } = buildDemo(id, page.sample);
  const pair = el('div', { class: 'demo-pair' });
  const side = (label, node) => el('figure', { class: 'demo-side' }, node, el('figcaption', {}, label));

  const play = () => pair.replaceChildren(
    side(ui.before, miniGrid(before, page.sample)),
    icon('fa-arrow-right', 'demo-arrow'),
    side(ui.after, miniGrid(after, page.sample, before)));

  play();
  return el('div', { class: 'demo' }, pair,
    el('button', { type: 'button', class: 'btn demo-replay', onclick: play }, icon('fa-play'), ui.replay));
}
