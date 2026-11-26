import { el, icon } from '../core/dom.js';

export function searchField({ label, placeholder, onInput }) {
  const input = el('input', {
    type: 'search',
    placeholder,
    autocomplete: 'off',
    'aria-label': label,
    oninput: () => onInput(input.value.trim()),
  });
  return el('label', { class: 'search' }, icon('fa-magnifying-glass'), input);
}
