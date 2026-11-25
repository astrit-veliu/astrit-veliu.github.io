import { $, html, mount } from '../../../src/core/dom.js';
import { navSections } from './nav.js';

const toggle = () => $('[data-action="toggle-nav"]');

export const isMobileNavOpen = () => !$('#mobileNav').hidden;

export function setMobileNav(open) {
  const panel = $('#mobileNav');
  if (open === !panel.hidden) return;
  panel.hidden = !open;
  document.documentElement.classList.toggle('nav-open', open);
  toggle().setAttribute('aria-expanded', String(open));
  toggle().setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (open) panel.querySelector('a')?.focus();
  else toggle().focus();
}

export function mountMobileNav() {
  mount(
    $('#mobileNav'),
    html`${navSections.map(({ id, label }) => html`<a class="mobile-link" href="#${id}" data-section="${id}" data-action="close-nav">${label}</a>`)}`,
  );
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobileNavOpen()) setMobileNav(false);
  });
}
