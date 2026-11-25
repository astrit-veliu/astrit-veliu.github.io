import { html } from '../../../src/core/dom.js';
import { labs } from '../data/labs-content.js';
import { getApps, getHeroStats } from '../data/projects.js';
import { logoMark } from '../components/logo.js';
import { richText } from '../components/rich-text.js';

export default {
  className: 'hero',
  render: () => {
    const { hero } = labs;
    const values = getHeroStats();
    const orbiting = getApps().filter(({ icon }) => icon);
    return html`
      <div class="hero-wrap">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          ${hero.badge.map((item) => html`<span class="hero-badge-item">${item}</span>`)}
        </div>
        <h1 class="hero-title">${hero.headline.map((line) => html`<span class="hero-line">${richText(line)}</span>`)}</h1>
        <p class="hero-sub">${hero.subtitle}</p>
        <div class="hero-actions">
          ${hero.actions.map(({ label, href, variant }) => html`<a class="btn btn--${variant}" href="${href}">${label}</a>`)}
        </div>
        <div class="hero-stats">
          ${hero.stats
            .filter(({ key }) => values[key])
            .map(
              ({ key, label }) => html`
                <div class="hero-stat">
                  <div class="hero-stat-value">${values[key]}</div>
                  <div class="hero-stat-label">${label}</div>
                </div>
              `,
            )}
        </div>
      </div>
      <div class="hero-deco" aria-hidden="true">
        <div class="hero-ring hero-ring--inner"></div>
        <div class="hero-ring hero-ring--middle"></div>
        <div class="hero-ring hero-ring--outer"></div>
        <div class="hero-emblem">${logoMark()}</div>
        <div class="hero-orbit" data-orbit>
          ${orbiting.map(({ icon, fallbackIcon }) => html`<span class="hero-app"><img src="${icon}" data-fallback="${fallbackIcon}" alt="" width="48" height="48" decoding="async"></span>`)}
        </div>
      </div>
    `;
  },
};
