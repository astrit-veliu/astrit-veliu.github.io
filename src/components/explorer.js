import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { studioInfo } from '../core/studio-info.js';
import { workspace } from '../data/workspace.js';
import { pages } from '../pages/index.js';
import { icon } from './icons.js';

const tree = {
  name: workspace.projectName,
  hint: studioInfo.projectPath,
  children: [
    {
      name: workspace.moduleName,
      children: [
        {
          name: workspace.sourceRoot,
          children: [{ name: workspace.packageName, files: pages }],
        },
      ],
    },
  ],
};

const file = (page, depth) => html`
  <button type="button" class="tree-row tree-file depth-${depth}" role="treeitem" data-command="page.open" data-arg="${page.id}">
    ${icon('kotlin', 'file-kotlin')}<span class="tree-name">${page.file}</span>
  </button>
`;

const folder = (node, depth) => html`
  <details class="tree-node" open>
    <summary class="tree-row depth-${depth}">
      ${icon('chevronRight', 'tree-caret')}${icon('folder', 'tree-folder')}
      <span class="tree-name">${node.name}</span>
      ${node.hint ? html`<span class="tree-hint">${node.hint}</span>` : ''}
    </summary>
    ${node.children?.map((child) => folder(child, depth + 1))}
    ${node.files?.map((page) => file(page, depth + 1))}
  </details>
`;

export function mountExplorer() {
  mount(
    $('#explorer'),
    html`
      <header class="tool-header">
        <span class="tool-title">Project</span>
        <button type="button" class="icon-btn explorer-close" data-command="view.explorer" aria-label="Hide project view">${icon('close')}</button>
      </header>
      <div class="tree" role="tree" aria-label="Project files">${folder(tree, 0)}</div>
    `,
  );

  const sync = ({ page }) =>
    $$('.tree-file').forEach((row) => {
      const active = row.dataset.arg === page;
      row.classList.toggle('is-active', active);
      row.setAttribute('aria-selected', String(active));
    });
  store.subscribe(['page'], sync);
  sync(store.get());
}
