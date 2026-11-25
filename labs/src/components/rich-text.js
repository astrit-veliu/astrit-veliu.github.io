import { html } from '../../../src/core/dom.js';

export const richText = (segments) =>
  segments.map(({ text, accent }) => (accent ? html`<em>${text}</em>` : text));
