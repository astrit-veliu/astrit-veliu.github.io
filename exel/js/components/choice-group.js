import { el, icon } from '../core/dom.js';

export function choiceGroup({ label, options, value, onChange, variant = 'chip' }) {
  const buttons = options.map(option =>
    el('button', { type: 'button', class: 'choice', onclick: () => select(option.value) },
      option.icon && icon(option.icon),
      option.label));

  const mark = current =>
    options.forEach((option, index) =>
      buttons[index].setAttribute('aria-pressed', String(option.value === current)));

  function select(next) {
    mark(next);
    onChange(next);
  }

  mark(value);
  return el('div', { class: `choices choices-${variant}`, role: 'group', 'aria-label': label }, buttons);
}
