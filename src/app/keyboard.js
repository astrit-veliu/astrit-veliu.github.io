import { runCommand } from '../core/registry.js';
import { store } from '../core/state.js';
import { matchesShortcut, shortcuts } from '../core/shortcuts.js';
import { showToast } from '../components/toast.js';

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let progress = 0;

const isTextField = (target) => target instanceof HTMLElement && target.matches('input, textarea, [contenteditable]');

export function initKeyboard() {
  document.addEventListener('keydown', (event) => {
    const { booted } = store.get();
    const shortcut = shortcuts.find(({ keys }) => matchesShortcut(event, keys));
    if (shortcut && (booted || shortcut.command === 'overlay.close')) {
      event.preventDefault();
      runCommand(shortcut.command);
      return;
    }

    if (!booted || isTextField(event.target)) return;
    progress = event.key === konami[progress] ? progress + 1 : Number(event.key === konami[0]);
    if (progress === konami.length) {
      progress = 0;
      const rainbow = !store.get().rainbow;
      store.set({ rainbow });
      showToast(rainbow ? 'Rainbow mode activated' : 'Rainbow mode deactivated');
    }
  });
}
