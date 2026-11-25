import { $$ } from '../../../src/core/dom.js';

const mark = (id) =>
  $$('[data-section]').forEach((element) => {
    const active = element.dataset.section === id;
    element.classList.toggle('is-active', active);
    if (active) element.setAttribute('aria-current', 'true');
    else element.removeAttribute('aria-current');
  });

export function initSectionTracker(ids) {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && mark(entry.target.id)),
    { rootMargin: '-50% 0px -50% 0px' },
  );
  ids.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
  mark(ids[0]);
}
