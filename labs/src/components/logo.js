import { html } from '../../../src/core/dom.js';
import { labs } from '../data/labs-content.js';

export const logoMark = (className = '') => html`
  <svg class="logo-mark ${className}" viewBox="0 6 50 36" aria-hidden="true" focusable="false">
    <polygon class="logo-dark" points="0,6 14,6 32,42 18,42"/>
    <polygon class="logo-teal" points="14,6 28,6 46,42 32,42"/>
    <polygon class="logo-dark" points="28,20 42,20 50,42 36,42"/>
  </svg>
`;

export const logo = () => html`
  <a class="logo" href="#home" aria-label="${labs.brand.name}">
    ${logoMark()}
    <span class="logo-words">${labs.brand.words.map((word) => html`<span>${word}</span>`)}</span>
  </a>
`;
