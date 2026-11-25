import './app/commands.js';
import { runCommand } from './core/registry.js';
import { store } from './core/state.js';
import { observeLayout, widthAtLeast } from './core/layout.js';
import { initRouter } from './app/router.js';
import { initShell } from './app/shell.js';
import { initDelegation } from './app/delegate.js';
import { initKeyboard } from './app/keyboard.js';
import { mountWelcome } from './components/welcome.js';
import { mountTitlebar } from './components/titlebar.js';
import { mountStripes } from './components/stripes.js';
import { mountExplorer } from './components/explorer.js';
import { mountEditor } from './components/editor.js';
import { mountTerminal } from './components/terminal.js';
import { mountEmulator } from './components/emulator.js';
import { mountStatusbar } from './components/statusbar.js';
import { mountPaneSwitcher } from './components/pane-switcher.js';
import { mountDialogs } from './components/dialogs.js';
import { mountPalette } from './components/palette.js';

let firstLayout = true;

observeLayout(({ widthClass, heightClass }) => {
  store.set((state) => ({
    widthClass,
    heightClass,
    terminalOpen: firstLayout ? widthAtLeast(widthClass, 'expanded') : state.terminalOpen,
    overlay: state.overlay === 'explorer' && widthAtLeast(widthClass, 'expanded') ? null : state.overlay,
  }));
  firstLayout = false;
});

const deepLink = initRouter();
if (deepLink) store.set({ page: deepLink });

mountWelcome();
mountTitlebar();
mountStripes();
mountExplorer();
mountEditor();
mountTerminal();
mountEmulator();
mountStatusbar();
mountPaneSwitcher();
mountDialogs();
mountPalette();
initShell();
initDelegation();
initKeyboard();

if (deepLink) runCommand('project.open');
