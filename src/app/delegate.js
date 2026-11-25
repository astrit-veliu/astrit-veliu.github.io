import { runCommand } from '../core/registry.js';
import { store } from '../core/state.js';
import { playClick } from '../core/audio.js';
import { closePopover } from '../components/popover.js';
import { submitContact } from '../services/contact.js';

export function initDelegation() {
  document.addEventListener('click', (event) => {
    if (store.get().soundOn && event.target.closest('button, a, summary, [data-command]')) playClick();

    const target = event.target.closest('[data-command]');
    if (!target || target.disabled) return;
    if (target.tagName === 'A') event.preventDefault();
    if (target.closest('#popover')) closePopover();
    runCommand(target.dataset.command, target.dataset.arg);
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form[data-form="contact"]');
    if (!form) return;
    event.preventDefault();
    submitContact(form);
  });
}
