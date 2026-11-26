import { el, icon } from '../core/dom.js';

export function buildShell({ site, pages }) {
  const links = Object.entries(pages).map(([id, page]) =>
    el('a', { href: `#/${id}`, dataset: { route: id } },
      icon(page.icon),
      el('span', { class: 'nav-label' }, page.nav)));

  const main = el('main', { id: 'main', tabIndex: -1 });
  let firstRoute = true;

  document.getElementById('app').append(
    el('a', {
      class: 'skip',
      href: '#main',
      onclick: event => {
        event.preventDefault();
        main.focus();
      },
    }, site.skip),
    el('div', { class: 'side' },
      el('header', { class: 'brand' },
        el('span', { class: 'brand-mark', title: site.brand }, icon(site.icon)),
        el('span', { class: 'brand-text' }, site.brand, el('small', {}, site.tagline))),
      el('nav', { class: 'nav', 'aria-label': site.navLabel }, links),
      el('p', { class: 'side-note' }, site.note)),
    main);

  return {
    main,
    setActive(id, title) {
      links.forEach(link => {
        if (link.dataset.route === id) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
      document.title = `${title} | ${site.title}`;
      scrollTo(0, 0);
      if (!firstRoute) main.focus({ preventScroll: true });
      firstRoute = false;
    },
  };
}
