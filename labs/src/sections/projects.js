import { html } from '../../../src/core/dom.js';
import { icon } from '../../../src/components/icons.js';
import { labs } from '../data/labs-content.js';
import { getApps, getDeveloperPages } from '../data/projects.js';
import { carouselControls, carouselProgress } from '../components/carousel.js';
import { richText } from '../components/rich-text.js';

const appCard = (app) => html`
  <li class="carousel-item">
    <a class="app-card" data-spotlight href="${app.href}" target="_blank" rel="noopener noreferrer" draggable="false">
      <div class="app-top">
        ${app.icon && html`<img class="app-icon" src="${app.icon}" data-fallback="${app.fallbackIcon}" alt="${app.name} icon" width="64" height="64" loading="lazy" decoding="async" draggable="false">`}
        <span class="app-index" aria-hidden="true"></span>
      </div>
      <div class="app-category">${app.category}</div>
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
  </li>
`;

export default {
  className: 'section-pad',
  render: () => {
    const { projects } = labs;
    return html`
      <div class="carousel" data-carousel>
        <div class="container">
          <div class="section-head">
            <div>
              <div class="section-label">${projects.label}</div>
              <h2 class="section-title">${richText(projects.title)}</h2>
              <p class="section-lead">${projects.intro}</p>
            </div>
            ${carouselControls(projects.carousel)}
          </div>
        </div>
        <ul class="carousel-track" role="list" tabindex="0" aria-label="${projects.carousel.region}" data-carousel-track>
          ${getApps().map(appCard)}
        </ul>
        <div class="container">${carouselProgress()}</div>
      </div>
      <div class="container">
        <div class="play-row">
          ${getDeveloperPages().map(
            ({ label, url }) => html`<a class="play-badge reveal" href="${url}" target="_blank" rel="noopener noreferrer">${icon('play')}<span>${label}${projects.developerSuffix}</span></a>`,
          )}
        </div>
      </div>
    `;
  },
};
