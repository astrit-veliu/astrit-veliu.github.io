import { html } from '../core/dom.js';
import { doc, indentBlock, join, str } from '../core/kotlin.js';
import { workspace } from '../data/workspace.js';
import { icon } from '../components/icons.js';
import { button, card, screen } from '../components/ui-kit.js';

const field = (name, label, type = 'text') => html`
  <label class="contact-field">
    <span class="contact-label">${label}</span>
    <input class="contact-input" name="${name}" type="${type}" required autocomplete="off">
  </label>
`;

export default {
  id: 'contact',
  file: 'Contact.kt',
  label: 'Contact',
  navLabel: 'Contact',
  description: 'Get in touch',
  icon: 'mail',

  source: ({ contact }) =>
    join(
      `package ${workspace.packageName}`,
      doc(['Contact Information', 'Get in touch for opportunities and collaborations']),
      `object Contact {\n${indentBlock(
        join(
          `const val EMAIL = ${str(contact.email)}`,
          contact.links
            .map(({ id, url }) => `const val ${id.toUpperCase()} = ${str(url)}`)
            .join('\n'),
          `val openToOpportunities = true`,
          `companion object {\n${indentBlock(
            [
              `const val AVAILABILITY = ${str(contact.availability)}`,
              `const val RESPONSE_TIME = ${str(contact.responseTime)}`,
              `const val TIMEZONE = ${str(contact.timezone)}`,
            ].join('\n'),
            1,
          )}\n}`,
        ),
        1,
      )}\n}`,
    ),

  screen: ({ contact }) =>
    screen(
      'contact',
      'Contact',
      card({
        title: 'Get in Touch',
        body: html`
          <form class="contact-form" data-form="contact">
            ${field('name', 'Your name')}
            ${field('email', 'Your email', 'email')}
            ${field('subject', 'Subject')}
            <label class="contact-field">
              <span class="contact-label">Your message</span>
              <textarea class="contact-input contact-textarea" name="message" required></textarea>
            </label>
            ${button({ label: 'Send message', variant: 'filled', type: 'submit' })}
          </form>
        `,
      }),
      card({
        title: 'Connect With Me',
        body: html`
          <ul class="social-list">
            ${contact.links.map(
              ({ id, label, handle, url }) => html`
                <li>
                  <a class="social-link" href="${url}" target="_blank" rel="noopener noreferrer">
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
        `,
      }),
    ),

  summary: ({ contact }) => [
    'Contact Information:',
    `Email: ${contact.email}`,
    ...contact.links.map(({ label, url }) => `${label}: ${url}`),
    '',
    `Availability: ${contact.availability}`,
    `Response Time: ${contact.responseTime}`,
    `Timezone: ${contact.timezone}`,
  ],
};
