import { html } from '../../../src/core/dom.js';
import { icon } from '../../../src/components/icons.js';
import { labs } from '../data/labs-content.js';
import { getSocialLinks } from '../data/projects.js';
import { richText } from '../components/rich-text.js';

const field = ({ name, label, type, placeholder }) => html`
  <div class="field">
    <label class="field-label" for="field-${name}">${label}</label>
    ${type === 'textarea'
      ? html`<textarea class="field-input" id="field-${name}" name="${name}" placeholder="${placeholder}" required></textarea>`
      : html`<input class="field-input" id="field-${name}" type="${type}" name="${name}" placeholder="${placeholder}" required>`}
  </div>
`;

export default {
  className: 'section-pad',
  render: () => {
    const { contact } = labs;
    return html`
      <div class="container">
        <div class="section-label">${contact.label}</div>
        <h2 class="section-title">${richText(contact.title)}</h2>
        <div class="contact-grid">
          <div>
            <div class="contact-info-label">${contact.infoLabel}</div>
            <p class="contact-intro">${contact.intro}</p>
            <ul class="social-list">
              ${getSocialLinks().map(
                ({ id, label, handle, url }) => html`
                  <li>
                    <a class="social-item reveal" href="${url}" target="_blank" rel="noopener noreferrer">
                      <span class="social-icon">${icon(id)}</span>
                      <span class="social-text">
                        <span class="social-name">${label}</span>
                        <span class="social-handle">${handle}</span>
                      </span>
                    </a>
                  </li>
                `,
              )}
            </ul>
          </div>
          <div class="form-card reveal">
            <form class="contact-form" data-form="contact">
              ${contact.form.rows.map((row) => html`<div class="form-row${row.length > 1 ? ' form-row--pair' : ''}">${row.map(field)}</div>`)}
              <button type="submit" class="btn btn--primary btn--block">${contact.form.submit}${icon('arrowRight')}</button>
              <p class="form-success" id="formSuccess" role="status" hidden>${contact.form.success}</p>
            </form>
          </div>
        </div>
      </div>
    `;
  },
};
