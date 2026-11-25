import { html } from '../../../src/core/dom.js';
import { icon } from '../../../src/components/icons.js';
import { labs } from '../data/labs-content.js';
import { getApps, getDeveloperPages } from '../data/projects.js';
import { richText } from '../components/rich-text.js';

const appCard = (app) => html`
  <a class="app-card reveal" href="${app.href}" target="_blank" rel="noopener noreferrer">
    ${app.icon && html`<img class="app-icon" src="${app.icon}" data-fallback="${app.fallbackIcon}" alt="${app.name} icon" width="64" height="64" loading="lazy" decoding="async">`}
    <h3 class="app-name">${app.name}</h3>
    <p class="app-desc">${app.description}</p>
    <ul class="app-tags">${app.tags.slice(0, labs.projects.tagLimit).map((tag) => html`<li class="tag">${tag}</li>`)}</ul>
    <div class="app-footer">
      <div class="app-stats">
        ${app.stats.map(({ value, label }) => html`<span class="app-stat"><strong>${value}</strong> ${label}</span>`)}
      </div>
      <span class="app-link">${labs.projects.storeLabel}${icon('arrowRight')}</span>
    </div>
  </a>
`;

export default {
  className: 'section-pad',
  render: () => html`
    <div class="container">
      <div class="section-label">${labs.projects.label}</div>
      <h2 class="section-title">${richText(labs.projects.title)}</h2>
      <div class="apps-grid">${getApps().map(appCard)}</div>
      <div class="play-row">
        ${getDeveloperPages().map(
          ({ label, url }) => html`<a class="play-badge reveal" href="${url}" target="_blank" rel="noopener noreferrer">${icon('play')}<span>${label}${labs.projects.developerSuffix}</span></a>`,
        )}
      </div>
    </div>
  `,
};
