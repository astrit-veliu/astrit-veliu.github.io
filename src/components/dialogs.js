import { $, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { studioInfo } from '../core/studio-info.js';
import { terminalCommands } from '../core/terminal-commands.js';
import { formatKeys, shortcuts } from '../core/shortcuts.js';
import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { icon } from './icons.js';
import { androidLogo } from './welcome.js';

const closeButton = html`<button type="button" class="ui-btn ui-btn--outlined" data-command="overlay.close">Close</button>`;

const views = {
  about: () => {
    const github = content.contact.links.find(({ id }) => id === 'github') ?? content.contact.links[0];
    return {
      title: 'About',
      body: html`
        <div class="about-head">
          ${androidLogo}
          <div>
            <p class="about-product">Android Studio Portfolio | ${studioInfo.version}</p>
            <p class="about-build">Build #${studioInfo.buildNumber}, built on ${studioInfo.buildDate}</p>
          </div>
        </div>
        <p class="about-details">Runtime version: ${workspace.runtime.kotlin}<br>VM: ${workspace.runtime.vm}</p>
        <p class="about-details">Copyright (c) ${studioInfo.year} ${content.profile.name}</p>
        <p class="about-links">
          <span>${content.profile.company}</span>
          ${content.contact.links.map(
            ({ label, url }) => html`<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`,
          )}
        </p>
      `,
      footer: html`
        ${closeButton}
        <a class="ui-btn ui-btn--filled" href="${github.url}" target="_blank" rel="noopener noreferrer">Visit ${github.label}</a>
      `,
    };
  },

  shortcuts: () => ({
    title: 'Keyboard Shortcuts and Features',
    body: html`
      <h3 class="dialog-section">Keyboard shortcuts</h3>
      <ul class="shortcut-list">
        ${shortcuts.map(({ label, keys }) => html`<li><span>${label}</span><kbd>${formatKeys(keys)}</kbd></li>`)}
      </ul>
      <h3 class="dialog-section">Features</h3>
      <ul class="feature-list">
        ${workspace.features.map((feature) => html`<li>${feature}</li>`)}
      </ul>
      <h3 class="dialog-section">Easter egg</h3>
      <p class="dialog-text">${workspace.easterEgg}</p>
    `,
    footer: closeButton,
  }),

  commands: () => ({
    title: 'Terminal Commands',
    body: html`
      <ul class="command-list">
        ${terminalCommands.map(
          ({ name, description }) => html`
            <li><button type="button" class="command-item" data-command="terminal.exec" data-arg="${name}"><span class="command-name">${name}</span><span class="command-desc">${description}</span></button></li>
          `,
        )}
      </ul>
    `,
    footer: closeButton,
  }),
};

const focusables = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function mountDialogs() {
  const host = $('#dialog');
  let opener = null;

  const render = ({ overlay }) => {
    const view = views[overlay];
    if (!view) {
      if (!host.hidden) {
        host.hidden = true;
        mount(host, '');
        opener?.focus?.({ preventScroll: true });
        opener = null;
      }
      return;
    }
    const { title, body, footer } = view();
    opener ??= document.activeElement;
    mount(
      host,
      html`
        <div class="dialog-scrim" data-command="overlay.close"></div>
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialogTitle" tabindex="-1">
          <header class="dialog-header">
            <h2 id="dialogTitle" class="dialog-title">${title}</h2>
            <button type="button" class="icon-btn" data-command="overlay.close" aria-label="Close dialog">${icon('close')}</button>
          </header>
          <div class="dialog-body">${body}</div>
          <footer class="dialog-footer">${footer}</footer>
        </div>
      `,
    );
    host.hidden = false;
    ($('.dialog-footer .ui-btn', host) ?? $('.dialog', host)).focus({ preventScroll: true });
  };

  host.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const items = [...host.querySelectorAll(focusables)];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  store.subscribe(['overlay'], render);
  render(store.get());
}
