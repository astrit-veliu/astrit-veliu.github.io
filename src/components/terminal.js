import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { execute, promptLabel } from '../core/terminal-commands.js';
import { openPage } from '../services/navigation.js';
import { runApp } from '../services/run.js';
import { icon } from './icons.js';

const history = [];
let historyIndex = 0;
let renderedBuild = 0;

const lineEl = ({ text, tone }) => {
  const line = document.createElement('div');
  line.className = `terminal-line${tone ? ` terminal-line--${tone}` : ''}`;
  line.textContent = text;
  return line;
};

const scrollEnd = (container) => {
  container.scrollTop = container.scrollHeight;
};

let outputEl;
let buildEl;
let inputEl;

const echo = (command) => {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  const prompt = document.createElement('span');
  prompt.className = 'terminal-prompt';
  prompt.textContent = promptLabel;
  line.append(prompt, ` ${command}`);
  outputEl.append(line);
};

export const clearTerminal = () => {
  outputEl.replaceChildren();
};

export function submitCommand(command) {
  const value = command.trim();
  if (!value) return;
  history.push(value);
  historyIndex = history.length;
  echo(value);

  const { lines, effect } = execute(value);
  if (effect.clear) clearTerminal();
  else outputEl.append(...lines.map(lineEl), lineEl({ text: '' }));
  scrollEnd($('#terminalView'));

  if (effect.navigate) openPage(effect.navigate);
  if (effect.run) runApp();
}

export function execInTerminal(command) {
  const { widthClass } = store.get();
  store.set({
    terminalOpen: true,
    terminalTab: 'terminal',
    ...(widthClass === 'compact' ? { pane: 'terminal' } : {}),
  });
  submitCommand(command);
}

const renderBuild = ({ buildLines }) => {
  if (buildLines.length < renderedBuild) {
    buildEl.replaceChildren();
    renderedBuild = 0;
  }
  buildEl.append(...buildLines.slice(renderedBuild).map(lineEl));
  renderedBuild = buildLines.length;
  scrollEnd($('#buildView'));
};

const stepHistory = (direction) => {
  if (!history.length) return;
  historyIndex = Math.min(Math.max(historyIndex + direction, 0), history.length);
  inputEl.value = history[historyIndex] ?? '';
};

export function mountTerminal() {
  mount(
    $('#terminal'),
    html`
      <header class="tool-header terminal-header">
        <div class="tool-tabs" role="tablist" aria-label="Terminal views">
          <button type="button" class="tool-tab" role="tab" data-command="terminal.tab" data-arg="terminal">Terminal</button>
          <button type="button" class="tool-tab" role="tab" data-command="terminal.tab" data-arg="build">Build</button>
        </div>
        <button type="button" class="icon-btn terminal-hide" data-command="terminal.hide" aria-label="Hide terminal">${icon('close')}</button>
      </header>
      <div class="terminal-view" id="terminalView" data-view="terminal">
        <div class="terminal-lines" id="terminalLines"></div>
        <label class="terminal-input-row">
          <span class="terminal-prompt">${promptLabel}</span>
          <input id="terminalInput" class="terminal-input" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Terminal command" placeholder="Type a command">
        </label>
      </div>
      <div class="terminal-view" id="buildView" data-view="build"><div class="terminal-lines" id="buildLines"></div></div>
    `,
  );

  outputEl = $('#terminalLines');
  buildEl = $('#buildLines');
  inputEl = $('#terminalInput');

  outputEl.append(
    lineEl({ text: 'Android Studio Terminal' }),
    lineEl({ text: "Type 'help' to see available commands." }),
    lineEl({ text: '' }),
  );

  inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      submitCommand(inputEl.value);
      inputEl.value = '';
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      stepHistory(event.key === 'ArrowUp' ? -1 : 1);
    } else if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearTerminal();
    }
  });

  $('#terminalView').addEventListener('pointerup', (event) => {
    if (event.target !== inputEl && window.getSelection().isCollapsed) inputEl.focus();
  });

  const syncTabs = ({ terminalTab }) => {
    $('#terminal').dataset.tab = terminalTab;
    $$('.tool-tab').forEach((tab) => {
      const active = tab.dataset.arg === terminalTab;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  };

  const focusWhenShown = ({ terminalOpen, terminalTab, pane, widthClass }) => {
    const visible = widthClass === 'compact' ? pane === 'terminal' : terminalOpen;
    if (visible && terminalTab === 'terminal' && window.matchMedia('(pointer: fine)').matches) {
      requestAnimationFrame(() => inputEl.focus({ preventScroll: true }));
    }
  };

  store.subscribe(['terminalTab'], syncTabs);
  store.subscribe(['buildLines'], renderBuild);
  store.subscribe(['terminalOpen', 'terminalTab', 'pane'], focusWhenShown);
  syncTabs(store.get());
  renderBuild(store.get());
}
