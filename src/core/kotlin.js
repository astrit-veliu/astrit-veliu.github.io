import { escapeHtml } from './dom.js';

const INDENT = '    ';
const pad = (level) => INDENT.repeat(level);

export const str = (value) => `"${String(value).replace(/[\\"$]/g, '\\$&')}"`;

export const doc = (lines) => ['/**', ...lines.map((line) => ` * ${line}`), ' */'].join('\n');

export const list = (items, level = 0) =>
  items.length
    ? `listOf(\n${items.map((item) => `${pad(level + 1)}${item}`).join(',\n')}\n${pad(level)})`
    : 'emptyList()';

export const map = (entries, level = 0) =>
  `mapOf(\n${entries.map(([key, value]) => `${pad(level + 1)}${str(key)} to ${str(value)}`).join(',\n')}\n${pad(level)})`;

export const construct = (type, fields, level = 0) => {
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${pad(level + 1)}${key} = ${value}`);
  return `${type}(\n${lines.join(',\n')}\n${pad(level)})`;
};

export const indentBlock = (text, level) =>
  text
    .split('\n')
    .map((line) => (line ? `${pad(level)}${line}` : line))
    .join('\n');

export const join = (...parts) =>
  parts.filter(Boolean).reduce((out, part) => (out ? `${out}${out.endsWith(' */') ? '\n' : '\n\n'}${part}` : part), '');

const keywords = [
  'package',
  'import',
  'class',
  'object',
  'interface',
  'sealed',
  'enum',
  'data',
  'fun',
  'val',
  'var',
  'return',
  'const',
  'companion',
  'if',
  'else',
  'when',
  'for',
  'while',
  'in',
  'is',
  'by',
  'this',
  'private',
  'public',
  'internal',
  'override',
  'lateinit',
  'true',
  'false',
  'null',
];

const tokenPattern = new RegExp(
  [
    '(?<comment>/\\*[\\s\\S]*?\\*/|//[^\\n]*)',
    '(?<string>"""[\\s\\S]*?"""|"(?:\\\\.|[^"\\\\\\n])*")',
    '(?<annotation>@\\w+)',
    '(?<number>\\b\\d[\\d_.]*[LFf]?\\b)',
    `(?<keyword>\\b(?:${keywords.join('|')})\\b)`,
    '(?<call>\\b[a-z_]\\w*(?=\\())',
    '(?<property>\\b[a-z_]\\w*(?=\\s*=(?!=)))',
    '(?<type>\\b[A-Z]\\w*)',
  ].join('|'),
  'g',
);

export function highlight(source) {
  const lines = [''];

  const push = (kind, text) => {
    text.split('\n').forEach((part, index) => {
      if (index > 0) lines.push('');
      if (!part) return;
      const safe = escapeHtml(part);
      lines[lines.length - 1] += kind ? `<span class="tok-${kind}">${safe}</span>` : safe;
    });
  };

  let cursor = 0;
  for (const match of source.matchAll(tokenPattern)) {
    push('', source.slice(cursor, match.index));
    const kind = Object.keys(match.groups).find((name) => match.groups[name] !== undefined);
    push(kind, match[0]);
    cursor = match.index + match[0].length;
  }
  push('', source.slice(cursor));
  return lines;
}
