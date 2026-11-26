import { el, icon } from '../core/dom.js';
import { richText } from './rich-text.js';

let sequence = 0;

function disclosureCard(item) {
  const bodyId = `dcard-${++sequence}`;

  const body = el('div', { class: 'dcard-body', id: bodyId, inert: true },
    el('div', {},
      el('div', { class: 'dcard-copy' },
        el('p', {}, richText(item.desc)),
        el('p', { class: 'how' }, icon('fa-turn-down'), richText(item.how)))));

  const head = el('button', {
    type: 'button',
    class: 'dcard-head',
    'aria-expanded': 'false',
    'aria-controls': bodyId,
    onclick: () => {
      const open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', String(open));
      body.inert = !open;
    },
  },
    el('span', { class: 'dcard-icon' }, icon(item.icon)),
    el('span', { class: 'dcard-title' }, item.name, el('small', {}, item.tag)),
    icon('fa-chevron-down', 'dcard-chev'));

  const card = el('article', { class: 'dcard' }, el('h3', {}, head), body);
  return card;
}

export const disclosureGrid = items =>
  el('div', { class: 'card-grid' }, items.map(disclosureCard));
