import { el, icon } from '../../core/dom.js';
import { columnName } from '../../core/columns.js';
import { display, key } from './demo-engine.js';

const covers = ([r1, c1, r2, c2], r, c) => r >= r1 && r <= r2 && c >= c1 && c <= c2;
const touches = ([r1, c1, r2, c2], r, c) => (r === null ? c >= c1 && c <= c2 : r >= r1 && r <= r2);

export function miniGrid(state, sample, against) {
  const rows = state.values.map((_, r) => r).filter(r => !state.hiddenRows.includes(r));
  const cols = state.values[0].map((_, c) => c).filter(c => !state.hiddenCols.includes(c));
  const signature = (s, r, c) => [display(s, r, c, sample), s.styles[key(r, c)], covers(s.sel, r, c), s.hits.includes(key(r, c)), s.table, s.filter].join('|');

  const bar = el('div', { class: 'mini-bar' }, el('b', {}, 'fx'), state.bar);
  const tabs = el('div', { class: 'mini-tabs' }, sample.tabs.map((name, i) =>
    el('span', { class: `mini-tab${i === state.tab ? ' on' : ''}` }, name)));

  const values = state.values.slice(1).map(row => Number(row[1])).filter(Number.isFinite);
  const peak = Math.max(...values);
  const chart = el('div', { class: `mini-chart${state.chart === 'sheet' ? ' full' : ''}` },
    values.map(v => el('span', { style: `height:${(v / peak) * 100}%` })));
  if (state.chart === 'sheet') return el('div', { class: 'mini' }, bar, chart, tabs);

  const cell = (r, c) => {
    const text = display(state, r, c, sample);
    const marks = [
      state.styles[key(r, c)],
      covers(state.sel, r, c) && 'sel',
      state.active[0] === r && state.active[1] === c && (state.editing ? 'edit' : 'active'),
      state.hits.includes(key(r, c)) && 'hit',
      state.table && r === 0 && 'th',
      state.table && r > 0 && r % 2 === 0 && 'band',
      text !== '' && !Number.isNaN(Number(text)) && 'num',
      against && signature(against, r, c) !== signature(state, r, c) && 'changed',
    ].filter(Boolean).join(' ');
    return el('span', { class: `mc ${marks}` }, text, (state.table || state.filter) && r === 0 ? icon('fa-caret-down') : null);
  };

  const grid = el('div', { class: 'mini-grid', style: `--cols:${cols.length}` },
    el('span', { class: 'mc hd' }),
    cols.map(c => el('span', { class: `mc hd${touches(state.sel, null, c) ? ' sel' : ''}` }, columnName(c))),
    rows.map(r => [
      el('span', { class: `mc hd${touches(state.sel, r, null) ? ' sel' : ''}${state.group && r >= state.group[0] && r <= state.group[1] ? ' grp' : ''}` }, String(r + 1)),
      cols.map(c => cell(r, c)),
    ]));

  return el('div', { class: 'mini' }, bar, grid, state.chart ? chart : null, tabs);
}
