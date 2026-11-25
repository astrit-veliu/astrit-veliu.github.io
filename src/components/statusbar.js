import { $, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { workspace } from '../data/workspace.js';
import { icon } from './icons.js';

export function mountStatusbar() {
  const { editor, branch } = workspace;
  mount(
    $('#statusbar'),
    html`
      <span class="status-message" id="statusMessage" role="status" aria-live="polite"></span>
      <span class="status-spacer"></span>
      <span class="status-item" id="statusCursor"></span>
      <span class="status-item status-optional">${editor.lineSeparator}</span>
      <span class="status-item status-optional">${editor.encoding}</span>
      <span class="status-item status-optional">${editor.indent}</span>
      <span class="status-item status-optional">${editor.language}</span>
      <span class="status-item status-branch">${icon('branch')}<span>${branch}</span></span>
    `,
  );

  const message = $('#statusMessage');
  const cursor = $('#statusCursor');

  store.subscribe(['status'], ({ status }) => {
    message.textContent = status;
  });
  store.subscribe(['cursor'], ({ cursor: position }) => {
    cursor.textContent = `${position.line}:${position.col}`;
  });
  message.textContent = store.get().status;
  cursor.textContent = `${store.get().cursor.line}:${store.get().cursor.col}`;
}
