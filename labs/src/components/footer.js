import { $, html, mount } from '../../../src/core/dom.js';
import { content } from '../../../src/data/content.js';
import { labs } from '../data/labs-content.js';
import { emailAddress } from '../core/email.js';
import { logo } from './logo.js';
import { navSections } from './nav.js';

export function mountFooter() {
  const email = emailAddress();
  mount(
    $('#footer'),
    html`
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            ${logo()}
            <p class="footer-tagline">${labs.footer.tagline}</p>
          </div>
          <nav class="footer-links" aria-label="Footer">
            ${navSections.map(({ id, label }) => html`<a href="#${id}">${label}</a>`)}
          </nav>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ${content.profile.company}. ${labs.footer.rights}</span>
          <a href="mailto:${email}">${email}</a>
        </div>
      </div>
    `,
  );
}
