import { html } from '../core/dom.js';
import { construct, doc, indentBlock, join, list, str } from '../core/kotlin.js';
import { workspace } from '../data/workspace.js';
import { bulletList, card, screen } from '../components/ui-kit.js';

const years = (period) => {
  const [start, end] = period.match(/\d{4}|Present/g);
  return start === end || !end ? start : `${start}-${end}`;
};

export default {
  id: 'experience',
  file: 'Experience.kt',
  label: 'Experience',
  navLabel: 'Work',
  description: 'Work history',
  icon: 'work',

  source: ({ experience }) =>
    join(
      `package ${workspace.packageName}`,
      doc(['Professional Experience', 'Career Journey as Android Developer']),
      `data class WorkExperience(\n${indentBlock(
        [
          'val company: String',
          'val role: String',
          'val period: String',
          'val location: String',
          'val achievements: List<String>',
        ].join(',\n'),
        1,
      )}\n)`,
      `object CareerHistory {\n${indentBlock(
        `val experiences = listOf(\n${experience
          .map(({ company, role, period, location, highlights }) =>
            indentBlock(
              construct(
                'WorkExperience',
                {
                  company: str(company),
                  role: str(role),
                  period: str(period),
                  location: str(location),
                  achievements: list(highlights.map(str), 1),
                },
                0,
              ),
              1,
            ),
          )
          .join(',\n')}\n)`,
        1,
      )}\n}`,
    ),

  screen: ({ experience }) =>
    screen(
      'experience',
      'Experience',
      html`
        <ol class="timeline">
          ${experience.map(
            ({ company, role, period, location, highlights }) => html`
              <li class="timeline-item">
                ${card({
                  title: company,
                  subtitle: role,
                  meta: `${period} - ${location}`,
                  body: bulletList(highlights),
                })}
              </li>
            `,
          )}
        </ol>
      `,
    ),

  summary: ({ experience }) => [
    'Work Experience:',
    ...experience.map(({ company, role, period }) => `- ${company} (${years(period)}) - ${role}`),
  ],
};
