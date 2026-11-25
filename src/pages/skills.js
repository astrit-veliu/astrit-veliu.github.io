import { doc, indentBlock, join, str } from '../core/kotlin.js';
import { workspace } from '../data/workspace.js';
import { card, chips, screen } from '../components/ui-kit.js';

const propertyName = (label) =>
  label
    .replace(/&/g, 'And')
    .split(/\s+/)
    .map((word, index) => (index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1)))
    .join('')
    .replace(/[^A-Za-z0-9]/g, '');

export default {
  id: 'skills',
  file: 'Skills.kt',
  label: 'Technical Skills',
  navLabel: 'Skills',
  description: 'Technical expertise',
  icon: 'lightbulb',

  source: ({ skills }) =>
    join(
      `package ${workspace.packageName}`,
      doc(['Technical Skills & Expertise', 'Modern Android Development Stack']),
      `object TechStack {\n${indentBlock(
        skills
          .map(
            ({ category, items }) =>
              `val ${propertyName(category)} = listOf(\n${items.map((item) => `    ${str(item)}`).join(',\n')}\n)`,
          )
          .join('\n\n'),
        1,
      )}\n}`,
    ),

  screen: ({ skills }) =>
    screen(
      'skills',
      'Technical Skills',
      skills.map(({ category, items }) => card({ title: category, body: chips(items) })),
    ),

  summary: ({ skills }) => [
    'Technical Skills:',
    ...skills.map(
      ({ category, items }, index) =>
        `${index === skills.length - 1 ? '`--' : '|--'} ${category}: ${items.join(', ')}`,
    ),
  ],
};
