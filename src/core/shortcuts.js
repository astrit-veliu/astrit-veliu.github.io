const platform = navigator.userAgentData?.platform ?? navigator.platform ?? '';

export const modKey = /mac|iphone|ipad/i.test(platform) ? 'Cmd' : 'Ctrl';

export const shortcuts = [
  { keys: 'mod+k', command: 'palette.open', label: 'Open command palette' },
  { keys: 'mod+b', command: 'run.app', label: "Run 'app'" },
  { keys: 'mod+/', command: 'dialog.about', label: 'About this portfolio' },
  { keys: 'alt+F12', command: 'view.terminal', label: 'Toggle terminal' },
  { keys: 'Escape', command: 'overlay.close', label: 'Close dialogs and menus' },
];

export const shortcutFor = (command) => shortcuts.find((entry) => entry.command === command)?.keys;

export const formatKeys = (keys) =>
  keys
    .split('+')
    .map((part) => {
      if (part === 'mod') return modKey;
      if (part === 'alt') return 'Alt';
      if (part === 'Escape') return 'Esc';
      return part.length === 1 ? part.toUpperCase() : part;
    })
    .join('+');

export const matchesShortcut = (event, keys) => {
  const parts = keys.split('+');
  const key = parts.at(-1).toLowerCase();
  const modifiers = parts.slice(0, -1);
  return (
    event.key.toLowerCase() === key &&
    (event.ctrlKey || event.metaKey) === modifiers.includes('mod') &&
    event.altKey === modifiers.includes('alt')
  );
};
