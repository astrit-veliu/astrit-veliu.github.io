import { pages } from '../pages/index.js';
import { shortcutFor } from './shortcuts.js';
import { terminalCommands } from './terminal-commands.js';

export const buildMenus = () => [
  {
    id: 'file',
    label: 'File',
    items: [{ label: 'Close Project', command: 'file.close' }],
  },
  {
    id: 'view',
    label: 'View',
    items: [
      { label: 'Project', command: 'view.explorer' },
      { label: 'Terminal', command: 'view.terminal', shortcut: shortcutFor('view.terminal') },
      { label: 'Build', command: 'view.build' },
      { label: 'Running Devices', command: 'view.emulator' },
      { divider: true },
      { label: 'Open CV', command: 'view.cv' },
    ],
  },
  {
    id: 'navigate',
    label: 'Navigate',
    items: pages.map((page) => ({ label: page.file, command: 'page.open', arg: page.id, icon: page.icon })),
  },
  {
    id: 'run',
    label: 'Run',
    items: [
      { label: "Run 'app'", command: 'run.app', shortcut: shortcutFor('run.app'), icon: 'play' },
      { label: 'Refresh Device', command: 'device.refresh', icon: 'refresh' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { label: 'Search Everywhere', command: 'palette.open', shortcut: shortcutFor('palette.open') },
      { divider: true },
      ...terminalCommands.map(({ name }) => ({ label: name, command: 'terminal.exec', arg: name })),
    ],
  },
  {
    id: 'help',
    label: 'Help',
    items: [
      { label: 'Keyboard Shortcuts and Features', command: 'dialog.shortcuts' },
      { label: 'Terminal Commands', command: 'dialog.commands' },
      { divider: true },
      { label: 'About', command: 'dialog.about', shortcut: shortcutFor('dialog.about') },
    ],
  },
];

export const flattenMenus = (menus) =>
  menus.flatMap(({ label, items }, index) => [
    ...(index ? [{ divider: true }] : []),
    { heading: label },
    ...items,
  ]);
