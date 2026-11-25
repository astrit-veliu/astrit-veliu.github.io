import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { buildMenus, flattenMenus } from '../core/menus.js';
import { shortcutFor, formatKeys } from '../core/shortcuts.js';
import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { icon } from './icons.js';
import { openPopover, popoverAnchor } from './popover.js';

const initials = (name) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

export function mountTitlebar() {
  const menus = buildMenus();
  const lookup = {
    hamburger: () => flattenMenus(menus),
    project: () => [
      { heading: workspace.projectName },
      { label: 'Close Project', command: 'file.close' },
    ],
    ...Object.fromEntries(menus.map(({ id, items }) => [id, () => items])),
  };

  mount(
    $('#titlebar'),
    html`
      <button type="button" class="icon-btn titlebar-menu" data-menu="hamburger" aria-label="Main menu" aria-haspopup="menu" aria-expanded="false">${icon('menu')}</button>
      <nav class="menubar" aria-label="Main menu">
        ${menus.map(
          ({ id, label }) => html`<button type="button" class="menu-trigger" data-menu="${id}" aria-haspopup="menu" aria-expanded="false">${label}</button>`,
        )}
      </nav>
      <button type="button" class="project-widget" data-menu="project" aria-haspopup="menu" aria-expanded="false">
        <span class="project-badge">${initials(content.profile.name)}</span>
        <span class="project-name">${workspace.projectName}</span>
        ${icon('caretDown', 'project-caret')}
      </button>
      <span class="branch-widget">${icon('branch')}<span>${workspace.branch}</span></span>
      <span class="titlebar-spacer"></span>
      <button type="button" class="icon-btn run-btn" data-command="run.app" aria-label="Run app" title="Run 'app' (${formatKeys(shortcutFor('run.app'))})">${icon('play')}</button>
      <button type="button" class="icon-btn" data-command="palette.open" aria-label="Search everywhere" title="Search Everywhere (${formatKeys(shortcutFor('palette.open'))})">${icon('search')}</button>
    `,
  );

  const open = (trigger) => openPopover(trigger, lookup[trigger.dataset.menu]());

  $('#titlebar').addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-menu]');
    if (trigger) open(trigger);
  });

  $('#titlebar').addEventListener('pointerover', (event) => {
    const trigger = event.target.closest('.menu-trigger');
    const active = popoverAnchor();
    if (event.pointerType !== 'mouse' || !trigger || !active || trigger === active) return;
    if (active.classList.contains('menu-trigger')) open(trigger);
  });

  store.subscribe(['building'], ({ building }) => {
    $$('.run-btn').forEach((button) => button.classList.toggle('is-busy', building));
  });
}
