import { $, html, mount } from '../../../src/core/dom.js';
import { icon } from '../../../src/components/icons.js';
import { labs } from '../data/labs-content.js';
import { logo } from './logo.js';

export const navSections = labs.sections.filter(({ nav }) => nav);

export function mountNav() {
  mount(
    $('#nav'),
    html`
      <div class="nav-inner">
        ${logo()}
        <div class="nav-links">
          ${navSections.map(
            ({ id, label, cta }) =>
              html`<a class="nav-link${cta ? ' nav-cta' : ''}" href="#${id}" data-section="${id}">${label}</a>`,
          )}
        </div>
        <div class="nav-tools">
          <button type="button" class="theme-toggle" data-action="toggle-theme" aria-label="Toggle theme" title="Toggle theme">
            ${icon('moon', 'icon-moon')}${icon('sun', 'icon-sun')}
          </button>
          <button type="button" class="hamburger" data-action="toggle-nav" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `,
  );
}
