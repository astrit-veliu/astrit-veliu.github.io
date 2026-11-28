import { el, icon, format } from '../../core/dom.js';
import { computeLayout } from './print-layout.js';
import { sheetPage } from './sheet-page.js';

export function printPreview(page) {
  const text = page.preview;
  let selected = 0;
  let layout;
  const shown = {};

  const stat = label => {
    const value = el('strong');
    return { value, node: el('p', { class: 'readout-item' }, el('span', { class: 'readout-label' }, label), value) };
  };
  const readout = { pages: stat(text.pages), layout: stat(text.layout), scale: stat(text.scale) };

  const stage = el('div', { class: 'stage' });
  const caption = el('p', { class: 'stage-caption' });
  const thumbs = el('div', { class: 'thumbs', role: 'group', 'aria-label': text.thumbsLabel });
  const fits = el('p', { class: 'fits', hidden: true }, icon('fa-circle-check'), text.fits);

  const node = el('div', { class: 'preview' },
    el('div', { class: 'readout' }, Object.values(readout).map(item => item.node)),
    stage, caption, thumbs, fits);

  function show(key, value) {
    if (shown[key] === value) return;
    const item = readout[key];
    item.value.textContent = value;
    if (key in shown) {
      item.node.classList.remove('flash');
      void item.node.offsetWidth;
      item.node.classList.add('flash');
    }
    shown[key] = value;
  }

  function pick(index) {
    selected = index;
    draw();
  }

  function draw() {
    const total = layout.pages.length;
    stage.replaceChildren(sheetPage(layout, layout.pages[selected]));
    caption.textContent = format(text.page, { n: selected + 1, total });
    thumbs.replaceChildren(
      ...layout.pages.slice(0, text.maxThumbs).map((entry, index) =>
        el('button', {
          type: 'button',
          class: 'thumb',
          'aria-label': format(text.showPage, { n: index + 1 }),
          'aria-pressed': String(index === selected),
          onclick: () => pick(index),
        }, sheetPage(layout, entry, { mini: true }))),
      total > text.maxThumbs ? el('span', { class: 'thumb-more' }, format(text.more, { n: total - text.maxThumbs })) : null);
  }

  function update(settings) {
    layout = computeLayout(settings, page);
    selected = Math.min(selected, layout.pages.length - 1);
    draw();
    show('pages', String(layout.pages.length));
    show('layout', format(text.layoutValue, { across: layout.across, down: layout.down }));
    show('scale', `${Math.round(layout.scale * 100)}%`);
    node.dataset.state = layout.pages.length === 1 ? 'done' : '';
    fits.hidden = layout.pages.length !== 1;
  }

  return { node, update };
}
