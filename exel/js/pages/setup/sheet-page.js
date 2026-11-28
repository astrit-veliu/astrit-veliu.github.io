import { el } from '../../core/dom.js';
import { columnName } from '../../core/columns.js';

export function sheetPage(layout, page, { mini = false } = {}) {
  const { width, height, margin, scale, sheet } = layout;
  const unit = 100 / width;
  const cell = sheet.colWidth * scale * unit;
  const row = sheet.rowHeight * scale * unit;

  const cells = page.rows.flatMap(rowIndex =>
    Array.from({ length: page.colCount }, (_, offset) =>
      el('span', { class: rowIndex === 0 ? 'cell head' : 'cell' },
        rowIndex === 0 ? columnName(page.colStart + offset) : '')));

  const area = el('div', {
    class: 'paper-area',
    style: `inset:${margin.y * unit}cqw ${margin.x * unit}cqw;grid-template-columns:repeat(${page.colCount},${cell}cqw);grid-auto-rows:${row}cqw;font-size:${cell * 0.4}cqw`,
  }, cells);

  return el('div', { class: mini ? 'paper paper-mini' : 'paper', style: `--pw:${width};--ph:${height}` }, area);
}
