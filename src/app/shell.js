import { $ } from '../core/dom.js';
import { store } from '../core/state.js';

const keys = ['booted', 'explorerOpen', 'terminalOpen', 'emulatorOpen', 'pane', 'overlay', 'terminalTab', 'building', 'rainbow'];

export function initShell() {
  const ide = $('#ide');
  const root = document.documentElement;

  const apply = (state) => {
    ide.dataset.explorer = state.explorerOpen ? 'open' : 'closed';
    ide.dataset.terminal = state.terminalOpen ? 'open' : 'closed';
    ide.dataset.emulator = state.emulatorOpen ? 'open' : 'closed';
    ide.dataset.pane = state.pane;
    ide.dataset.overlay = state.overlay ?? '';
    ide.dataset.tab = state.terminalTab;
    ide.dataset.building = String(state.building);
    ide.inert = !state.booted;
    root.dataset.rainbow = String(state.rainbow);
  };

  store.subscribe(keys, apply);
  apply(store.get());
}
