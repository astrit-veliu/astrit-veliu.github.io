import { html } from '../../../src/core/dom.js';
import { labs } from '../data/labs-content.js';
import { richText } from '../components/rich-text.js';

export default {
  className: 'section-pad',
  render: () => {
    const { about } = labs;
    return html`
      <div class="container">
        <div class="about-layout">
          <div class="section-label">${about.label}</div>
          <h2 class="section-title">${richText(about.title)}</h2>
          <div class="about-text reveal">${about.paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}</div>
          <div class="stack reveal">
            <div class="stack-label">${about.stackLabel}</div>
            <ul class="stack-chips">${about.stack.map((item) => html`<li class="chip">${item}</li>`)}</ul>
          </div>
        </div>
      </div>
    `;
  },
};
