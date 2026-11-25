import { $, html, mount } from '../../../src/core/dom.js';
import { labs } from '../data/labs-content.js';

export function mountSectionDots() {
  mount(
    $('#sectionDots'),
    html`${labs.sections.map(({ id, label }) => html`<a class="section-dot" href="#${id}" data-section="${id}" aria-label="${label}"></a>`)}`,
  );
}
