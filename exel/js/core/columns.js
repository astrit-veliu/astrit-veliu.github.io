export const columnName = index =>
  (index >= 26 ? columnName(Math.floor(index / 26) - 1) : '') + String.fromCharCode(65 + (index % 26));
