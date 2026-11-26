import { el, icon } from '../core/dom.js';
import { pageHead } from './page-head.js';
import { disclosureGrid } from './disclosure-grid.js';
import { richText } from './rich-text.js';

export function mount(root, page) {
  root.append(
    pageHead({ ...page, count: page.items.length }),
    disclosureGrid(page.items),
    page.footnote && el('p', { class: 'foot' }, icon('fa-circle-info'), richText(page.footnote)));
}
