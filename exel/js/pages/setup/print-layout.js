const range = (from, to) => Array.from({ length: Math.max(0, to - from) }, (_, i) => from + i);

export function computeLayout(settings, { papers, margins, sheets }) {
  const sheet = sheets[settings.sheet];
  const paper = papers[settings.paper];
  const [width, height] = settings.orientation === 'landscape' ? [paper.height, paper.width] : [paper.width, paper.height];
  const margin = margins[settings.margin];
  const printable = { width: width - 2 * margin.x, height: height - 2 * margin.y };
  const { columns, rows } = settings.printArea ? sheet.area : sheet;

  const scale = settings.fit ? Math.min(1, printable.width / (columns * sheet.colWidth)) : 1;
  const colsPerPage = Math.max(1, Math.floor(printable.width / (sheet.colWidth * scale)));
  const rowsPerPage = Math.max(2, Math.floor(printable.height / (sheet.rowHeight * scale)));
  const dataPerPage = settings.titles ? rowsPerPage - 1 : rowsPerPage;

  const across = Math.ceil(columns / colsPerPage);
  const down = 1 + Math.ceil(Math.max(0, rows - rowsPerPage) / dataPerPage);

  const rowsOn = rowPage => {
    if (rowPage === 0) return range(0, Math.min(rows, rowsPerPage));
    const start = rowsPerPage + (rowPage - 1) * dataPerPage;
    const body = range(start, Math.min(rows, start + dataPerPage));
    return settings.titles ? [0, ...body] : body;
  };

  const pages = range(0, across * down).map(index => {
    const colStart = Math.floor(index / down) * colsPerPage;
    return { colStart, colCount: Math.min(colsPerPage, columns - colStart), rows: rowsOn(index % down) };
  });

  return { width, height, margin, scale, across, down, pages, sheet };
}
