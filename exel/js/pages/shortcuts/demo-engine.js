import { columnName } from '../../core/columns.js';

export const key = (r, c) => `${r},${c}`;
const at = (r, c) => [r, c, r, c];
const address = (r, c) => `${columnName(c)}${r + 1}`;
const cells = ([r1, c1, r2, c2]) =>
  Array.from({ length: (r2 - r1 + 1) * (c2 - c1 + 1) }, (_, i) => [r1 + Math.floor(i / (c2 - c1 + 1)), c1 + (i % (c2 - c1 + 1))]);

const used = s => s.values.reduce(([lr, lc], row, r) => {
  const last = row.reduce((m, v, c) => (v !== '' ? c : m), -1);
  return last < 0 ? [lr, lc] : [r, Math.max(lc, last)];
}, [0, 0]);

const go = (s, r, c) => {
  s.active = [r, c];
  s.sel = at(r, c);
};

const flag = (s, r, c, name, on = true) => {
  const set = new Set((s.styles[key(r, c)] ?? '').split(' ').filter(Boolean));
  if (on) set.add(name);
  else set.delete(name);
  s.styles[key(r, c)] = [...set].join(' ');
};

const hitsFor = (s, term) => cells([0, 0, s.values.length - 1, s.values[0].length - 1])
  .filter(([r, c]) => s.values[r][c].includes(term)).map(([r, c]) => key(r, c));

const recalc = (s, x) => {
  s.values.forEach((row, r) => {
    if (r > 0 && row[0]) row[x.total.column] = String(x.total.factors.reduce((p, c) => p * Number(row[c]), 1));
  });
};

const formatting = (kind, area, pre) => ({
  sel: area,
  pre,
  run: s => cells(area).forEach(([r, c]) => {
    if (kind) s.fmt[key(r, c)] = kind;
    else delete s.fmt[key(r, c)];
  }),
});

const formulaFor = (x, r) => x.total.formula.replaceAll('{row}', r + 1);
const rowsWithData = s => s.values.map((_, r) => r).filter(r => r > 0 && s.values[r][0]);

export const effects = {
  home: { at: [3, 3], run: s => go(s, 0, 0) },
  end: { at: [0, 0], run: s => go(s, ...used(s)) },
  edge: { at: [0, 0], run: s => go(s, used(s)[0], 0) },
  nextSheet: { at: [0, 0], run: s => { s.tab = 1; } },
  goTo: { at: [0, 0], run: s => { go(s, 3, 3); s.bar = `Go To ${address(3, 3)}`; } },
  find: { at: [0, 0], run: (s, x) => { s.bar = `Find: ${x.text.find}`; s.hits = hitsFor(s, x.text.find); } },
  replace: {
    at: [0, 0],
    run: (s, x) => {
      s.bar = `Replace ${x.text.find} with ${x.text.replacement}`;
      s.values = s.values.map(row => row.map(v => v.replaceAll(x.text.find, x.text.replacement)));
      s.hits = hitsFor(s, x.text.replacement);
    },
  },
  selectCol: { at: [1, 1], run: s => { s.sel = [0, 1, s.values.length - 1, 1]; } },
  selectRow: { at: [2, 0], run: s => { s.sel = [2, 0, 2, s.values[0].length - 1]; } },
  selectAll: { at: [1, 1], run: s => { s.sel = [0, 0, s.values.length - 1, s.values[0].length - 1]; } },
  fillDown: { sel: [1, 1, 4, 1], run: s => rowsWithData(s).slice(1).forEach(r => { s.values[r][1] = s.values[1][1]; }) },
  fillRight: { sel: [1, 1, 1, 4], run: s => { for (let c = 2; c <= 4; c++) s.values[1][c] = s.values[1][1]; } },
  fillSame: {
    sel: [2, 1, 4, 2],
    pre: (s, x) => { s.bar = x.text.typed; s.editing = true; },
    run: (s, x) => { cells(s.sel).forEach(([r, c]) => { s.values[r][c] = x.text.typed; }); s.bar = ''; s.editing = false; },
  },
  newLine: {
    at: [1, 0],
    pre: s => { s.editing = true; s.bar = s.values[1][0]; },
    run: (s, x) => { s.values[1][0] += `\n${x.text.extraLine}`; },
  },
  edit: { at: [1, 0], run: s => { s.editing = true; s.bar = s.values[1][0]; } },
  dateNow: { at: [4, 5], run: s => { s.values[4][5] = new Date().toLocaleDateString(); } },
  timeNow: { at: [3, 5], run: s => { s.values[3][5] = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } },
  undo: { at: [1, 0], pre: s => flag(s, 1, 0, 'b'), run: s => flag(s, 1, 0, 'b', false) },
  repeat: { at: [3, 0], pre: s => flag(s, 1, 0, 'b'), run: s => flag(s, 3, 0, 'b') },
  flashFill: {
    at: [2, 5],
    pre: s => {
      rowsWithData(s).forEach(r => { s.values[r][5] = ''; });
      s.values[1][5] = s.values[1][0].slice(0, 2);
    },
    run: s => rowsWithData(s).forEach(r => { s.values[r][5] = s.values[r][0].slice(0, 2); }),
  },
  link: { at: [1, 0], run: s => flag(s, 1, 0, 'link') },
  textStyle: { sel: [0, 0, 0, 2], run: s => { flag(s, 0, 0, 'b'); flag(s, 0, 1, 'i'); flag(s, 0, 2, 'u'); } },
  currency: formatting('currency', [1, 2, 4, 2]),
  percent: formatting('percent', [1, 3, 4, 3]),
  date: formatting('date', [1, 5, 4, 5]),
  general: formatting(null, [1, 5, 4, 5], s => cells(s.sel).forEach(([r, c]) => { s.fmt[key(r, c)] = 'date'; })),
  autosum: {
    at: [5, 1],
    run: s => {
      s.values[5][1] = String(rowsWithData(s).reduce((sum, r) => sum + Number(s.values[r][1]), 0));
      s.bar = '=SUM(B2:B5)';
    },
  },
  showFormulas: { at: [1, 4], run: s => { s.formulas = true; } },
  recalc: { at: [1, 4], pre: s => { s.values[1][1] = '20'; }, run: (s, x) => recalc(s, x) },
  absolute: {
    at: [1, 4],
    pre: (s, x) => { s.editing = true; s.bar = formulaFor(x, 1); },
    run: (s, x) => { s.bar = formulaFor(x, 1).replace(/([A-Z])(\d+)/g, '$$$1$$$2'); },
  },
  insertFunction: { at: [5, 2], pre: s => { s.editing = true; s.bar = '='; }, run: s => { s.bar = '=SUM('; } },
  table: { sel: [0, 0, 4, 5], run: s => { s.table = true; } },
  filter: { sel: [0, 0, 0, 5], run: s => { s.filter = true; } },
  insertRow: { sel: [2, 0, 2, 5], run: s => { s.values.splice(2, 0, s.values[0].map(() => '')); } },
  deleteRow: { sel: [2, 0, 2, 5], run: s => { s.values.splice(2, 1); } },
  chart: { sel: [0, 1, 4, 1], run: s => { s.chart = 'embedded'; } },
  chartSheet: { sel: [0, 1, 4, 1], run: s => { s.chart = 'sheet'; } },
  hideRows: { sel: [2, 0, 2, 5], run: s => { s.hiddenRows = [2]; } },
  hideCols: { sel: [0, 2, 5, 2], run: s => { s.hiddenCols = [2]; } },
  showRows: { sel: [1, 0, 3, 5], pre: s => { s.hiddenRows = [2]; }, run: s => { s.hiddenRows = []; } },
  showCols: { sel: [0, 1, 5, 3], pre: s => { s.hiddenCols = [2]; }, run: s => { s.hiddenCols = []; } },
  group: { sel: [1, 0, 3, 5], run: s => { s.group = [1, 3]; } },
  ungroup: { sel: [1, 0, 3, 5], pre: s => { s.group = [1, 3]; }, run: s => { s.group = null; } },
};

export function buildDemo(id, sample) {
  const fx = effects[id];
  const before = {
    values: sample.rows.map(row => [...row]),
    styles: {}, fmt: {}, hiddenRows: [], hiddenCols: [], hits: [],
    bar: '', editing: false, formulas: false, table: false, filter: false, group: null, chart: null, tab: 0,
  };
  before.sel = fx.sel ?? at(...fx.at);
  before.active = [before.sel[0], before.sel[1]];
  fx.pre?.(before, sample);
  const after = structuredClone(before);
  fx.run(after, sample);
  return { before, after };
}

const formatters = {
  currency: new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format,
  percent: new Intl.NumberFormat(undefined, { style: 'percent' }).format,
  date: serial => new Date(Date.UTC(1899, 11, 30) + serial * 864e5).toLocaleDateString(undefined, { timeZone: 'UTC' }),
};

export function display(s, r, c, x) {
  const raw = s.values[r]?.[c] ?? '';
  if (s.formulas && r > 0 && c === x.total.column && raw !== '') return formulaFor(x, r);
  const kind = s.fmt[key(r, c)];
  return kind && raw !== '' && !Number.isNaN(Number(raw)) ? formatters[kind](Number(raw)) : raw;
}
