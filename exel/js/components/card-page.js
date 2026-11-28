import { el, icon, format } from '../core/dom.js';
import { pageHead } from './page-head.js';
import { disclosureGrid } from './disclosure-grid.js';
import { searchField } from './search-field.js';
import { emptyState } from './empty-state.js';
import { richText } from './rich-text.js';

export function mount(root, page, ui) {
  const results = el('div');

  const draw = query => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const shown = page.items.filter(item => {
      const text = [item.name, item.tag, item.desc, item.how].join(' ').toLowerCase();
      return terms.every(term => text.includes(term));
    });
    results.replaceChildren(shown.length
      ? disclosureGrid(shown)
      : emptyState('fa-magnifying-glass', format(ui.noMatches, { query })));
  };

  root.append(
    pageHead({ ...page, count: page.items.length }),
    el('div', { class: 'toolbar' }, searchField({ label: ui.searchList, placeholder: ui.searchListPlaceholder, onInput: draw })),
    results);
  if (page.footnote) root.append(el('p', { class: 'foot' }, icon('fa-circle-info'), richText(page.footnote)));
  draw('');
}
