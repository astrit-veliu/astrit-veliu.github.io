import { el, format } from '../core/dom.js';
import { prefs } from '../core/prefs.js';
import { pageHead } from '../components/page-head.js';
import { choiceGroup } from '../components/choice-group.js';
import { searchField } from '../components/search-field.js';
import { emptyState } from '../components/empty-state.js';
import { kbdGroup } from '../components/kbd.js';
import { icon } from '../core/dom.js';
import { shortcutPreview } from './shortcuts/shortcut-preview.js';

function keysFor(entry, platforms, id) {
  if (id in entry) return entry[id];
  const parent = platforms.find(platform => platform.id === id).inherits;
  return parent ? keysFor(entry, platforms, parent) : null;
}

function detectPlatform(platforms) {
  const saved = prefs.get('platform');
  if (platforms.some(platform => platform.id === saved)) return saved;
  const hint = navigator.userAgentData?.platform ?? navigator.platform ?? '';
  const match = platforms.find(platform => platform.detect && new RegExp(platform.detect, 'i').test(hint));
  return (match ?? platforms[0]).id;
}

export function mount(root, page, ui) {
  const { platforms } = page;
  const entries = page.groups.flatMap(group => group.items.map(item => ({ ...item, category: group.category })));
  const state = { platform: detectPlatform(platforms), category: null, query: '' };

  const note = el('p', { class: 'platform-note' });
  const count = el('p', { class: 'sc-count', 'aria-live': 'polite' });
  const list = el('ul', { class: 'sc-grid' });
  const empty = el('div');

  const matches = entry => {
    const keys = (keysFor(entry, platforms, state.platform) ?? []).flatMap(key => key.toLowerCase().split(' / '));
    const text = `${entry.label} ${entry.category}`.toLowerCase();
    const terms = state.query.toLowerCase().split(/[\s+]+/).filter(Boolean);
    const hasTerm = term => keys.includes(term) || (term.length > 1 && (text.includes(term) || keys.some(key => key.startsWith(term))));
    return (!state.category || entry.category === state.category) && terms.every(hasTerm);
  };

  const row = entry => {
    const keys = keysFor(entry, platforms, state.platform);
    const host = el('div', { class: 'sc-demo' });
    const body = el('div', { class: 'sc-body', inert: true }, el('div', {}, host));
    const head = el('button', {
      type: 'button',
      class: 'sc-head',
      'aria-expanded': 'false',
      onclick: () => {
        const open = item.classList.toggle('open');
        head.setAttribute('aria-expanded', String(open));
        body.inert = !open;
        if (open && !host.hasChildNodes()) host.append(shortcutPreview(entry.demo, page, ui));
      },
    },
      el('span', { class: 'sc-label' }, entry.label),
      keys ? kbdGroup(keys) : el('span', { class: 'sc-none' }, ui.unavailable),
      icon('fa-chevron-down', 'sc-chev'));
    const item = el('li', { class: 'sc' }, head, body);
    return item;
  };

  function render() {
    const shown = entries.filter(matches);
    note.textContent = platforms.find(platform => platform.id === state.platform).note;
    count.textContent = format(ui.resultCount, { count: shown.length, total: entries.length });
    list.replaceChildren(...shown.map(row));
    empty.replaceChildren(...(shown.length ? [] : [emptyState('fa-magnifying-glass', format(ui.noResults, { query: state.query }))]));
  }

  const platformGroup = choiceGroup({
    label: ui.platformLabel,
    variant: 'segmented',
    value: state.platform,
    options: platforms.map(({ id, label, icon }) => ({ value: id, label, icon })),
    onChange: id => {
      state.platform = id;
      prefs.set('platform', id);
      render();
    },
  });

  const categoryGroup = choiceGroup({
    label: ui.categoryLabel,
    value: null,
    options: [{ value: null, label: ui.all }, ...page.groups.map(({ category }) => ({ value: category, label: category }))],
    onChange: category => {
      state.category = category;
      render();
    },
  });

  root.append(
    pageHead({ ...page, count: entries.length }),
    el('div', { class: 'toolbar' },
      searchField({
        label: ui.searchLabel,
        placeholder: ui.searchPlaceholder,
        onInput: query => {
          state.query = query;
          render();
        },
      }),
      platformGroup),
    note,
    el('div', { class: 'sc-filters' }, categoryGroup),
    count,
    list,
    empty);
  render();
}
