import { $$ } from '../../../src/core/dom.js';

export function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }),
    { rootMargin: '0px 0px -30px 0px' },
  );
  items.forEach((item) => observer.observe(item));
}
