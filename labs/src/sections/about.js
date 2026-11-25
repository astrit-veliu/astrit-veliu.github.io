import { html } from '../../../src/core/dom.js';
import { icon } from '../../../src/components/icons.js';
import { labs } from '../data/labs-content.js';
import { richText } from '../components/rich-text.js';

const pillar = ({ icon: name, title, text }) => html`
  <li class="pillar reveal">
    <span class="pillar-icon">${icon(name)}</span>
    <div>
      <h3 class="pillar-title">${title}</h3>
      <p class="pillar-text">${text}</p>
    </div>
  </li>
`;

export default {
  className: 'section-pad',
  render: () => {
    const { about } = labs;
    return html`
      <div class="container">
        <div class="about-grid">
          <div>
            <div class="section-label">${about.label}</div>
            <h2 class="section-title">${richText(about.title)}</h2>
            <div class="about-text reveal">${about.paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}</div>
          </div>
          <ul class="pillars">${about.pillars.map(pillar)}</ul>
        </div>
        <div class="stack reveal">
          <div class="stack-label">${about.stackLabel}</div>
          <ul class="stack-chips">${about.stack.map((item) => html`<li class="chip">${item}</li>`)}</ul>
        </div>
      </div>
    `;
  },
};
