import { $$ } from '../../../src/core/dom.js';

export function layoutCascades() {
  $$('[data-cascade]').forEach((cascade) => {
    const items = [...cascade.children];
    items.forEach((item, index) => {
      item.style.setProperty('--index', index);
      item.style.setProperty('--count', items.length);
    });
  });
}
