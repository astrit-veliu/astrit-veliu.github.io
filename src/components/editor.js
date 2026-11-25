import { $, $$, html, mount, raw } from '../core/dom.js';
import { store } from '../core/state.js';
import { highlight } from '../core/kotlin.js';
import { shortcuts, formatKeys } from '../core/shortcuts.js';
import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { getPage } from '../pages/index.js';
import { icon } from './icons.js';

const highlighted = new Map();

const linesFor = (id) => {
  if (!highlighted.has(id)) highlighted.set(id, highlight(getPage(id).source(content)));
  return highlighted.get(id);
};

const renderTabs = ({ tabs, page }) => html`
  ${tabs.map((id) => {
    const { file } = getPage(id);
    const active = id === page;
    return html`
      <div class="editor-tab ${active ? 'is-active' : ''}" role="tab" aria-selected="${active}">
        <button type="button" class="tab-main" data-command="page.open" data-arg="${id}">${icon('kotlin', 'file-kotlin')}<span>${file}</span></button>
        <button type="button" class="tab-close" data-command="tab.close" data-arg="${id}" aria-label="Close ${file}">${icon('close')}</button>
      </div>
    `;
  })}
`;

const renderCrumbs = (file) => {
  const trail = [workspace.projectName, workspace.moduleName, workspace.sourceRoot, workspace.packageName, file];
  return html`
    <ol class="crumb-list">
      ${trail.map((part, index) => html`<li class="crumb">${index ? icon('chevronRight', 'crumb-sep') : ''}<span>${part}</span></li>`)}
    </ol>
    <span class="inspection" title="No problems found">${icon('check')}</span>
  `;
};

const renderCode = (id) => html`
  <div class="code" role="region" aria-label="${getPage(id).file}" tabindex="0">
    ${linesFor(id).map(
      (line, index) => html`<div class="code-line" data-line="${index + 1}"><span class="line-no">${index + 1}</span><span class="code-text">${raw(line)}</span></div>`,
    )}
  </div>
`;

const renderEmpty = () => html`
  <div class="editor-empty">
    <p class="editor-empty-title">No file is open</p>
    <p class="editor-empty-hint">Pick a file from the Project view or use one of these actions.</p>
    <ul class="editor-empty-actions">
      ${shortcuts
        .filter(({ command }) => command !== 'overlay.close')
        .map(
          ({ command, label, keys }) => html`
            <li><button type="button" data-command="${command}"><span>${label}</span><kbd>${formatKeys(keys)}</kbd></button></li>
          `,
        )}
    </ul>
  </div>
`;

const columnOf = (line) => {
  const selection = window.getSelection();
  const text = line.querySelector('.code-text');
  if (!selection?.rangeCount || !text.contains(selection.anchorNode)) return 1;
  const range = document.createRange();
  range.selectNodeContents(text);
  range.setEnd(selection.anchorNode, selection.anchorOffset);
  return range.toString().length + 1;
};

export function mountEditor() {
  mount(
    $('#editor'),
    html`
      <div class="editor-tabs" id="editorTabs" role="tablist" aria-label="Open files"></div>
      <div class="breadcrumbs" id="breadcrumbs"></div>
      <div class="editor-body" id="editorBody"></div>
    `,
  );

  const tabsEl = $('#editorTabs');
  const crumbsEl = $('#breadcrumbs');
  const bodyEl = $('#editorBody');

  const paintCursor = ({ cursor }) => {
    $$('.code-line.is-current', bodyEl).forEach((line) => line.classList.remove('is-current'));
    $(`.code-line[data-line="${cursor.line}"]`, bodyEl)?.classList.add('is-current');
  };

  const renderBody = (state) => {
    const open = state.tabs.includes(state.page);
    mount(tabsEl, renderTabs(state));
    mount(crumbsEl, open ? renderCrumbs(getPage(state.page).file) : '');
    crumbsEl.hidden = !open;
    mount(bodyEl, open ? renderCode(state.page) : renderEmpty());
    bodyEl.scrollTop = 0;
    bodyEl.scrollLeft = 0;
    $('.editor-tab.is-active', tabsEl)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    paintCursor(state);
  };

  bodyEl.addEventListener('click', (event) => {
    const line = event.target.closest('.code-line');
    if (line) store.set({ cursor: { line: Number(line.dataset.line), col: columnOf(line) } });
  });

  store.subscribe(['tabs', 'page'], renderBody);
  store.subscribe(['cursor'], paintCursor);
  renderBody(store.get());
}
