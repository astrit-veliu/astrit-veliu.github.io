import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { icon } from './icons.js';

const panes = [
  { id: 'project', label: 'Project', icon: 'folder' },
  { id: 'editor', label: 'Code', icon: 'file' },
  { id: 'emulator', label: 'Emulator', icon: 'phone' },
  { id: 'terminal', label: 'Terminal', icon: 'terminal' },
];

export function mountPaneSwitcher() {
  mount(
    $('#paneSwitcher'),
    html`
      ${panes.map(
        ({ id, label, icon: name }) => html`
          <button type="button" class="pane-btn" data-command="pane.set" data-arg="${id}" aria-pressed="false">${icon(name)}<span>${label}</span></button>
        `,
      )}
    `,
  );

  const sync = ({ pane }) =>
    $$('.pane-btn').forEach((button) => {
      const active = button.dataset.arg === pane;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  store.subscribe(['pane'], sync);
  sync(store.get());
}
