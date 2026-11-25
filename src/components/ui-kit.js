import { html } from '../core/dom.js';

export const screen = (name, title, ...children) => html`
  <div class="ui-screen page-${name}">
    <h2 class="ui-title">${title}</h2>
    ${children}
  </div>
`;

export const card = ({ title, subtitle, meta, body, footer, href, className = '' }) => {
  const inner = html`
    ${title && html`<h3 class="ui-card-title">${title}</h3>`}
    ${subtitle && html`<p class="ui-card-subtitle">${subtitle}</p>`}
    ${meta && html`<p class="ui-card-meta">${meta}</p>`}
    ${body}
    ${footer}
  `;
  return href
    ? html`<a class="ui-card ui-card--link ${className}" href="${href}" target="_blank" rel="noopener noreferrer">${inner}</a>`
    : html`<section class="ui-card ${className}">${inner}</section>`;
};

export const text = (value) => html`<p class="ui-text">${value}</p>`;

export const bulletList = (items) => html`
  <ul class="ui-list">
    ${items.map((item) => html`<li>${item}</li>`)}
  </ul>
`;

export const chips = (items) => html`
  <ul class="ui-chips">
    ${items.map((item) => html`<li class="ui-chip">${item}</li>`)}
  </ul>
`;

export const stats = (entries) => html`
  <div class="ui-stats">
    ${entries.map(
      ({ value, label }) => html`
        <div class="ui-stat">
          <div class="ui-stat-value">${value}</div>
          <div class="ui-stat-label">${label}</div>
        </div>
      `,
    )}
  </div>
`;

export const button = ({ label, command, arg, variant = 'outlined', type = 'button' }) => html`
  <button type="${type}" class="ui-btn ui-btn--${variant}" ${command ? html`data-command="${command}"` : ''} ${arg ? html`data-arg="${arg}"` : ''}>${label}</button>
`;
