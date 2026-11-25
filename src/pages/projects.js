import { html } from '../core/dom.js';
import { construct, doc, indentBlock, join, list, str } from '../core/kotlin.js';
import { formatInstalls, formatRating } from '../core/format.js';
import { assetUrl } from '../core/assets.js';
import { workspace } from '../data/workspace.js';
import { card, chips, screen, stats, text } from '../components/ui-kit.js';

const storeUrl = ({ projects }, app) => `${projects.storeBaseUrl}${app.packageName}`;

const figures = (app) => ({
  users: app.installs ? formatInstalls(app.installs) : null,
  rating: app.rating ? formatRating(app.rating) : null,
});

const metrics = (app) => {
  const { users, rating } = figures(app);
  return [users && { value: users, label: 'Users' }, rating && { value: rating, label: 'Rating' }].filter(Boolean);
};

export default {
  id: 'projects',
  file: 'Projects.kt',
  label: 'Projects',
  navLabel: 'Apps',
  description: 'Published apps',
  icon: 'phone',

  source: ({ projects }) =>
    join(
      `package ${workspace.packageName}`,
      doc(['Published Android Applications', 'Available on Google Play Store']),
      `data class AndroidApp(\n${indentBlock(
        [
          'val name: String',
          'val packageName: String',
          'val category: String',
          'val description: String',
          'val stats: AppStats?',
          'val technologies: List<String>',
        ].join(',\n'),
        1,
      )}\n)`,
      `data class AppStats(\n${indentBlock('val users: String?,\nval rating: String?', 1)}\n)`,
      `object PublishedApps {\n${indentBlock(
        join(
          ...projects.apps.map(
            (app) =>
              `val ${app.id} = ${construct(
                'AndroidApp',
                {
                  name: str(app.name),
                  packageName: str(app.packageName),
                  category: str(app.category),
                  description: str(app.description),
                  stats:
                    figures(app).users || figures(app).rating
                      ? construct(
                          'AppStats',
                          {
                            users: figures(app).users ? str(figures(app).users) : 'null',
                            rating: figures(app).rating ? str(figures(app).rating) : 'null',
                          },
                          1,
                        )
                      : 'null',
                  technologies: list(app.technologies.map(str), 1),
                },
                0,
              )}`,
          ),
          projects.developerPages
            .map(
              ({ label, url }) =>
                `const val ${label.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_URL = ${str(url)}`,
            )
            .join('\n'),
        ),
        1,
      )}\n}`,
    ),

  screen: (content) =>
    screen(
      'projects',
      'Projects',
      content.projects.apps.map((app) =>
        card({
          leading: html`<img class="ui-app-icon" src="${assetUrl(app.icon)}" alt="" width="64" height="64" loading="lazy" decoding="async">`,
          title: app.name,
          subtitle: app.category,
          href: storeUrl(content, app),
          body: html`
            ${text(app.description)}
            ${metrics(app).length ? stats(metrics(app)) : ''}
            ${chips(app.technologies)}
          `,
        }),
      ),
      card({
        title: 'Play Store',
        body: html`
          <ul class="store-links">
            ${content.projects.developerPages.map(
              ({ label, url }) =>
                html`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`,
            )}
          </ul>
        `,
      }),
    ),

  summary: ({ projects }) => [
    'Published Applications:',
    ...projects.apps.map((app, index) => {
      const { users, rating } = figures(app);
      const detail = [users && `${users} users`, rating && `${rating} rating`].filter(Boolean).join(', ');
      return `${index + 1}. ${app.name} - ${detail || app.category}`;
    }),
    '',
    ...projects.developerPages.map(({ label, url }) => `${label}: ${url}`),
  ],
};
