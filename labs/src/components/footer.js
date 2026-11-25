import { $, html, mount } from '../../../src/core/dom.js';
import { content } from '../../../src/data/content.js';
import { labs } from '../data/labs-content.js';
import { emailAddress } from '../core/email.js';

export function mountFooter() {
  const email = emailAddress();
  mount(
    $('#footer'),
    html`
      <p class="footer-line">
        <span>&copy; ${new Date().getFullYear()} ${content.profile.company}. ${labs.footer.rights}</span>
        <span class="footer-sep" aria-hidden="true"></span>
        <a href="mailto:${email}">${email}</a>
      </p>
    `,
  );
}
