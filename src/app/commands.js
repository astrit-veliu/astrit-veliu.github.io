import { defineCommand, runCommand } from '../core/registry.js';
import { store } from '../core/state.js';
import { widthAtLeast } from '../core/layout.js';
import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { pages } from '../pages/index.js';
import { $ } from '../core/dom.js';
import { closeTab, openPage } from '../services/navigation.js';
import { runApp } from '../services/run.js';
import { refreshDevice } from '../services/device.js';
import { copyLink, openLink, shareLink } from '../services/share.js';
import { clearTerminal, execInTerminal } from '../components/terminal.js';
import { closePopover } from '../components/popover.js';
import { showToast } from '../components/toast.js';

const toggleTerminalTab = (tab) => {
  const { widthClass, terminalOpen, terminalTab } = store.get();
  if (widthClass === 'compact') {
    store.set({ pane: 'terminal', terminalTab: tab });
    return;
  }
  const closing = terminalOpen && terminalTab === tab;
  store.set({ terminalOpen: !closing, terminalTab: tab });
};

const setOverlay = (overlay) => () => store.set({ overlay });

pages.forEach((page) =>
  defineCommand(`open.${page.id}`, {
    title: `Open ${page.file}`,
    description: page.description,
    icon: page.icon,
    palette: true,
    run: () => openPage(page.id),
  }),
);

defineCommand('page.open', { run: openPage });
defineCommand('tab.close', { run: closeTab });

defineCommand('run.app', {
  title: 'Run App',
  description: 'Build and run the application',
  icon: 'play',
  palette: true,
  run: runApp,
});

defineCommand('view.cv', {
  title: 'Download CV',
  description: 'Open the resume PDF',
  icon: 'download',
  palette: true,
  run: () => window.open(content.profile.cvPath, '_blank', 'noopener'),
});

defineCommand('view.explorer', {
  title: 'Toggle Project View',
  description: 'Show or hide the project files',
  icon: 'folder',
  palette: true,
  run: () => {
    const { widthClass, overlay, explorerOpen } = store.get();
    if (widthClass === 'compact') store.set({ pane: 'project' });
    else if (!widthAtLeast(widthClass, 'expanded')) store.set({ overlay: overlay === 'explorer' ? null : 'explorer' });
    else store.set({ explorerOpen: !explorerOpen });
  },
});

defineCommand('view.terminal', {
  title: 'Toggle Terminal',
  description: 'Show or hide the terminal',
  icon: 'terminal',
  palette: true,
  run: () => toggleTerminalTab('terminal'),
});

defineCommand('view.build', {
  title: 'Toggle Build Output',
  description: 'Show or hide the build output',
  icon: 'build',
  palette: true,
  run: () => toggleTerminalTab('build'),
});

defineCommand('view.emulator', {
  title: 'Toggle Running Devices',
  description: 'Show or hide the emulator',
  icon: 'phone',
  palette: true,
  run: () => {
    if (store.get().widthClass === 'compact') store.set({ pane: 'emulator' });
    else store.set((state) => ({ emulatorOpen: !state.emulatorOpen }));
  },
});

defineCommand('terminal.tab', { run: (tab) => store.set({ terminalTab: tab }) });
defineCommand('terminal.hide', { run: () => store.set({ terminalOpen: false }) });
defineCommand('terminal.exec', {
  run: (command) => {
    store.set({ overlay: null });
    execInTerminal(command);
  },
});
defineCommand('terminal.clear', {
  title: 'Clear Terminal',
  description: 'Clear terminal output',
  icon: 'delete',
  palette: true,
  run: clearTerminal,
});
defineCommand('terminal.portfolio', {
  title: 'Show Portfolio Summary',
  description: 'Display portfolio stats in the terminal',
  icon: 'chart',
  palette: true,
  run: () => execInTerminal('portfolio'),
});

defineCommand('pane.set', { run: (pane) => store.set({ pane }) });

defineCommand('palette.open', { run: () => store.get().booted && store.set({ overlay: 'palette' }) });
defineCommand('palette.run', {
  run: (id) => {
    store.set({ overlay: null });
    runCommand(id);
  },
});

defineCommand('dialog.about', {
  title: 'About Studio',
  description: 'About this portfolio',
  icon: 'info',
  palette: true,
  run: setOverlay('about'),
});
defineCommand('dialog.shortcuts', {
  title: 'Keyboard Shortcuts',
  description: 'Shortcuts and features',
  icon: 'keyboard',
  palette: true,
  run: setOverlay('shortcuts'),
});
defineCommand('dialog.commands', { run: setOverlay('commands') });

defineCommand('overlay.close', {
  run: () => {
    closePopover();
    store.set({ overlay: null });
  },
});

defineCommand('device.sound', {
  run: () => {
    const soundOn = !store.get().soundOn;
    store.set({ soundOn });
    showToast(soundOn ? 'Sound enabled' : 'Sound muted');
  },
});
defineCommand('device.theme', {
  run: () => {
    const deviceTheme = store.get().deviceTheme === 'dark' ? 'light' : 'dark';
    store.set({ deviceTheme });
    showToast(`${deviceTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`);
  },
});
defineCommand('device.refresh', { run: refreshDevice });
defineCommand('device.select', { run: (id) => store.set({ deviceProfile: id }) });
defineCommand('device.scrollTop', {
  run: () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('#deviceScreen').scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  },
});

defineCommand('link.copy', { run: copyLink });
defineCommand('link.open', { run: openLink });
defineCommand('link.share', { run: shareLink });

defineCommand('project.open', {
  run: () => {
    store.set({ booted: true });
    openPage(store.get().page);
    showToast(`Opening ${workspace.projectName}...`);
  },
});
defineCommand('file.close', {
  run: () => {
    store.set({
      booted: false,
      overlay: null,
      tabs: [],
      page: pages[0].id,
      pane: 'emulator',
      cursor: { line: 1, col: 1 },
      status: 'Project closed',
    });
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  },
});
