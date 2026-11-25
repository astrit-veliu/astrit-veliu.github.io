import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { listCommands, runCommand } from '../core/registry.js';
import { formatKeys, shortcutFor } from '../core/shortcuts.js';
import { icon } from './icons.js';

let selected = 0;
let results = [];

const matches = (command, query) =>
  `${command.title} ${command.description}`.toLowerCase().includes(query);

export function mountPalette() {
  const host = $('#palette');

  mount(
    host,
    html`
      <div class="palette-scrim" data-command="overlay.close"></div>
      <div class="palette" role="dialog" aria-label="Search Everywhere">
        <div class="palette-search">
          ${icon('search')}
          <input id="paletteInput" class="palette-input" type="text" role="combobox" aria-expanded="true" aria-controls="paletteResults" aria-autocomplete="list" placeholder="Type a command or search..." autocomplete="off" spellcheck="false">
        </div>
        <ul class="palette-results" id="paletteResults" role="listbox"></ul>
      </div>
    `,
  );

  const input = $('#paletteInput');
  const list = $('#paletteResults');

  const paintSelection = () => {
    $$('.palette-item', list).forEach((item, index) => {
      const on = index === selected;
      item.classList.toggle('is-selected', on);
      item.setAttribute('aria-selected', String(on));
      if (on) item.scrollIntoView({ block: 'nearest' });
    });
  };

  const renderResults = () => {
    const query = input.value.trim().toLowerCase();
    results = listCommands((command) => command.palette && matches(command, query));
    selected = Math.min(selected, Math.max(results.length - 1, 0));
    mount(
      list,
      results.length
        ? results.map(
            (command, index) => html`
              <li role="option" class="palette-item" data-command="palette.run" data-arg="${command.id}" data-index="${index}">
                <span class="palette-icon">${icon(command.icon ?? 'info')}</span>
                <span class="palette-text">
                  <span class="palette-name">${command.title}</span>
                  <span class="palette-desc">${command.description}</span>
                </span>
                ${shortcutFor(command.id) ? html`<kbd class="palette-keys">${formatKeys(shortcutFor(command.id))}</kbd>` : ''}
              </li>
            `,
          )
        : html`<li class="palette-empty">No matching commands</li>`,
    );
    paintSelection();
  };

  input.addEventListener('input', () => {
    selected = 0;
    renderResults();
  });

  input.addEventListener('keydown', (event) => {
    if (!results.length) return;
    const moves = { ArrowDown: selected + 1, ArrowUp: selected - 1, Home: 0, End: results.length - 1 };
    if (event.key in moves) {
      event.preventDefault();
      selected = (moves[event.key] + results.length) % results.length;
      paintSelection();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      store.set({ overlay: null });
      runCommand(results[selected].id);
    }
  });

  list.addEventListener('pointermove', (event) => {
    const item = event.target.closest('.palette-item');
    if (!item || Number(item.dataset.index) === selected) return;
    selected = Number(item.dataset.index);
    paintSelection();
  });

  const sync = ({ overlay }) => {
    const open = overlay === 'palette';
    host.hidden = !open;
    if (!open) return;
    input.value = '';
    selected = 0;
    renderResults();
    requestAnimationFrame(() => input.focus());
  };
  store.subscribe(['overlay'], sync);
  sync(store.get());
}
