import { $, html, mount } from '../core/dom.js';
import { formatKeys } from '../core/shortcuts.js';
import { icon } from './icons.js';

const GAP = 4;
const MARGIN = 8;

let current = null;

const renderItem = (item) => {
  if (item.divider) return html`<div class="popover-divider" role="separator"></div>`;
  if (item.heading) return html`<div class="popover-heading">${item.heading}</div>`;
  return html`
    <button type="button" class="popover-item" role="menuitem" data-command="${item.command}" ${item.arg ? html`data-arg="${item.arg}"` : ''}>
      ${item.icon ? icon(item.icon, 'popover-icon') : html`<span class="popover-icon"></span>`}
      <span class="popover-label">${item.label}</span>
      ${item.shortcut ? html`<kbd class="popover-keys">${formatKeys(item.shortcut)}</kbd>` : ''}
    </button>
  `;
};

const place = (surface, anchor) => {
  const isElement = anchor instanceof Element;
  const rect = isElement
    ? anchor.getBoundingClientRect()
    : { left: anchor.x, right: anchor.x, top: anchor.y, bottom: anchor.y };
  const gap = isElement ? GAP : 0;
  const { width, height } = surface.getBoundingClientRect();
  const left = Math.min(Math.max(rect.left, MARGIN), window.innerWidth - width - MARGIN);
  let top = rect.bottom + gap;
  if (top + height > window.innerHeight - MARGIN) {
    top = isElement && rect.top - height - gap > MARGIN ? rect.top - height - gap : window.innerHeight - height - MARGIN;
  }
  surface.style.left = `${Math.max(left, MARGIN)}px`;
  surface.style.top = `${Math.max(top, MARGIN)}px`;
};

export const popoverAnchor = () => current?.anchor ?? null;

export function closePopover() {
  if (!current) return;
  const { cleanup, anchor } = current;
  current = null;
  cleanup();
  const host = $('#popover');
  mount(host, '');
  host.hidden = true;
  if (anchor instanceof Element) anchor.setAttribute('aria-expanded', 'false');
}

export function openPopover(anchor, items) {
  if (current?.anchor === anchor) {
    closePopover();
    return;
  }
  closePopover();

  const host = $('#popover');
  mount(host, html`<div class="popover-surface" role="menu" tabindex="-1">${items.map(renderItem)}</div>`);
  host.hidden = false;
  const surface = host.firstElementChild;
  place(surface, anchor);
  if (anchor instanceof Element) anchor.setAttribute('aria-expanded', 'true');

  const onPointerDown = (event) => {
    if (surface.contains(event.target) || (anchor instanceof Element && anchor.contains(event.target))) return;
    closePopover();
  };
  const onKeyDown = (event) => {
    const entries = [...surface.querySelectorAll('.popover-item')];
    const index = entries.indexOf(document.activeElement);
    const moves = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: entries.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    entries[(moves[event.key] + entries.length) % entries.length]?.focus();
  };
  const dismiss = () => closePopover();

  document.addEventListener('pointerdown', onPointerDown, true);
  surface.addEventListener('keydown', onKeyDown);
  window.addEventListener('resize', dismiss);
  window.addEventListener('blur', dismiss);

  current = {
    anchor,
    cleanup: () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('blur', dismiss);
    },
  };
  surface.focus({ preventScroll: true });
}
