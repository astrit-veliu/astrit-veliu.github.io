import { $ } from '../../src/core/dom.js';
import { observeLayout, widthAtLeast } from '../../src/core/layout.js';
import { mountSections, sectionIds } from './sections/index.js';
import { mountNav } from './components/nav.js';
import { mountMobileNav, setMobileNav } from './components/mobile-nav.js';
import { mountFooter } from './components/footer.js';
import { initTheme, toggleTheme } from './components/theme.js';
import { initCursor } from './components/cursor.js';
import { initReveal } from './components/reveal.js';
import { initCarousels } from './components/carousel.js';
import { layoutCascades } from './components/cascade.js';
import { initSectionTracker } from './components/section-tracker.js';
import { initScrollState } from './components/scroll-state.js';
import { submitContact } from './services/contact-form.js';

const actions = {
  'toggle-nav': () => setMobileNav($('#mobileNav').hidden),
  'close-nav': () => setMobileNav(false),
  'toggle-theme': toggleTheme,
  'scroll-top': () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  },
};

observeLayout(({ widthClass }) => {
  if (widthAtLeast(widthClass, 'expanded')) setMobileNav(false);
});

mountSections($('#main'));
mountNav();
mountMobileNav();
mountFooter();
initTheme();

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-action]');
  if (trigger) actions[trigger.dataset.action]?.();
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('form[data-form="contact"]');
  if (!form) return;
  event.preventDefault();
  submitContact(form);
});

document.addEventListener(
  'error',
  (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.dataset.fallback) return;
    const { fallback } = image.dataset;
    delete image.dataset.fallback;
    image.src = fallback;
  },
  true,
);

layoutCascades();
initCarousels();
initCursor();
initReveal();
initSectionTracker(sectionIds);
initScrollState();
document.documentElement.dataset.ready = 'true';
