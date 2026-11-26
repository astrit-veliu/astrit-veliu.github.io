import { el, icon, format } from '../core/dom.js';
import { pageHead } from '../components/page-head.js';
import { callout } from '../components/callout.js';
import { richText } from '../components/rich-text.js';

export function mount(root, page, ui) {
  const { steps } = page;
  let index = 0;

  const num = el('p', { class: 'step-num' });
  const title = el('h2', { class: 'step-title' });
  const text = el('p', { class: 'step-text' });
  const visual = el('div', { class: 'step-visual', 'aria-hidden': 'true' });

  const dots = steps.map((_, position) =>
    el('button', {
      type: 'button',
      class: 'step-dot',
      'aria-label': format(ui.goToStep, { n: position + 1 }),
      onclick: () => go(position),
    }));

  const back = el('button', { type: 'button', class: 'btn', onclick: () => go(index - 1) },
    icon('fa-arrow-left'), ui.back);
  const next = el('button', {
    type: 'button',
    class: 'btn btn-primary',
    onclick: () => go(index === steps.length - 1 ? 0 : index + 1),
  });

  const stepper = el('section', {
    class: 'stepper',
    'aria-label': page.title,
    onkeydown: event => {
      if (event.key === 'ArrowRight') go(index + 1);
      if (event.key === 'ArrowLeft') go(index - 1);
    },
  },
    el('div', { class: 'step-progress' }, dots),
    el('div', { class: 'step-body', 'aria-live': 'polite' }, el('div', {}, num, title, text), visual),
    el('div', { class: 'step-controls' }, back, next));

  function go(target) {
    if (target < 0 || target >= steps.length) return;
    index = target;
    render();
  }

  function render() {
    const step = steps[index];
    const last = index === steps.length - 1;
    num.textContent = format(ui.stepOf, { n: index + 1, total: steps.length });
    title.textContent = step.title;
    text.replaceChildren(richText(step.text));
    visual.replaceChildren(icon(step.icon, 'step-icon'), el('p', { class: 'step-figure' }, step.figure));
    back.disabled = index === 0;
    next.replaceChildren(...(last ? [ui.restart, icon('fa-rotate-left')] : [ui.next, icon('fa-arrow-right')]));
    dots.forEach((dot, position) => {
      dot.classList.toggle('done', position < index);
      if (position === index) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
  }

  root.append(pageHead({ ...page, count: steps.length }), stepper, callout({ icon: 'fa-circle-info', ...page.callout }));
  render();
}
