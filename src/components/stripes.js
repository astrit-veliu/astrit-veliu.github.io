import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { icon } from './icons.js';

const button = (command, name, label) => html`
  <button type="button" class="stripe-btn" data-command="${command}" data-tool="${name}" aria-label="${label}" title="${label}" aria-pressed="false">${icon(name === 'project' ? 'folder' : name === 'terminal' ? 'terminal' : name === 'build' ? 'build' : 'phone')}</button>
`;

export function mountStripes() {
  mount(
    $('#stripeLeft'),
    html`
      <div class="stripe-group">${button('view.explorer', 'project', 'Project')}</div>
      <div class="stripe-group">
        ${button('view.terminal', 'terminal', 'Terminal')}
        ${button('view.build', 'build', 'Build')}
      </div>
    `,
  );
  mount($('#stripeRight'), html`<div class="stripe-group">${button('view.emulator', 'emulator', 'Running Devices')}</div>`);

  const sync = ({ explorerOpen, terminalOpen, terminalTab, emulatorOpen }) => {
    const active = {
      project: explorerOpen,
      terminal: terminalOpen && terminalTab === 'terminal',
      build: terminalOpen && terminalTab === 'build',
      emulator: emulatorOpen,
    };
    $$('.stripe-btn').forEach((btn) => {
      const on = Boolean(active[btn.dataset.tool]);
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  };
  store.subscribe(['explorerOpen', 'terminalOpen', 'terminalTab', 'emulatorOpen'], sync);
  sync(store.get());
}
