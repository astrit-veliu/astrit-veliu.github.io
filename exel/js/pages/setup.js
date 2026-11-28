import { el, icon, format } from '../core/dom.js';
import { pageHead } from '../components/page-head.js';
import { callout } from '../components/callout.js';
import { richText } from '../components/rich-text.js';
import { choiceGroup } from '../components/choice-group.js';
import { printPreview } from './setup/print-preview.js';

export function mount(root, page, ui) {
  const { steps } = page;
  const settings = { ...page.defaults };
  const preview = printPreview(page);
  let index = 0;

  const num = el('p', { class: 'step-num' });
  const title = el('h2', { class: 'step-title' });
  const text = el('p', { class: 'step-text' });
  const control = el('div', { class: 'step-control' });
  const text_ = page.preview;

  const dots = steps.map((_, position) =>
    el('button', {
      type: 'button',
      class: 'step-dot',
      'aria-label': format(ui.goToStep, { n: position + 1 }),
      onclick: () => go(position),
    }));

  const back = el('button', { type: 'button', class: 'btn', onclick: () => go(index - 1) }, icon('fa-arrow-left'), ui.back);
  const reset = el('button', {
    type: 'button',
    class: 'btn reset',
    onclick: () => {
      Object.assign(settings, page.defaults, { sheet: settings.sheet });
      render();
    },
  }, icon('fa-rotate-left'), page.preview.reset);
  const next = el('button', {
    type: 'button',
    class: 'btn btn-primary',
    onclick: () => go(index === steps.length - 1 ? 0 : index + 1),
  });

  const sheetPicker = el('div', { class: 'toolbar sheet-picker' },
    el('span', { class: 'step-control-label' }, page.preview.sheetLabel),
    choiceGroup({
      label: page.preview.sheetLabel,
      options: Object.entries(page.sheets).map(([value, sheet]) => ({ value, label: sheet.label })),
      value: settings.sheet,
      onChange: value => {
        settings.sheet = value;
        preview.update(settings);
      },
    }));

  const stepper = el('section', {
    class: 'stepper',
    'aria-label': page.title,
    onkeydown: event => {
      if (event.target.closest('.choices')) return;
      if (event.key === 'ArrowRight') go(index + 1);
      if (event.key === 'ArrowLeft') go(index - 1);
    },
  },
    el('div', { class: 'step-progress' }, dots),
    el('div', { class: 'step-body' },
      el('div', { class: 'step-copy', 'aria-live': 'polite' }, num, title, text, control),
      preview.node),
    el('div', { class: 'step-controls' }, back, reset, next));

  function summary(layout) {
    const total = layout.pages.length;
    const result = total === 1
      ? format(text_.resultOne, { scale: `${Math.round(layout.scale * 100)}%` })
      : format(text_.resultMany, { pages: total, across: layout.across, down: layout.down, scale: `${Math.round(layout.scale * 100)}%` });
    const chosen = steps.filter(step => step.control).map(({ control: { key, label, menu, options } }) =>
      el('li', {},
        el('span', { class: 'summary-value' }, el('b', {}, `${label}: `), options.find(option => option.value === settings[key]).label),
        el('small', {}, `${text_.menuLabel}: ${menu}`)));
    return [
      el('p', { class: 'step-control-label' }, text_.summaryTitle),
      el('ul', { class: 'summary' }, chosen),
      el('p', { class: total === 1 ? 'summary-result fits' : 'summary-result' }, icon(total === 1 ? 'fa-circle-check' : 'fa-circle-info'), result),
      total === 1 ? null : el('p', { class: 'step-control-label' }, text_.adviceMany),
    ].filter(Boolean);
  }

  function go(target) {
    if (target < 0 || target >= steps.length) return;
    index = target;
    render();
  }

  function render() {
    const step = steps[index];
    const last = index === steps.length - 1;
    const setting = step.control;

    num.replaceChildren(icon(step.icon), format(ui.stepOf, { n: index + 1, total: steps.length }));
    title.textContent = step.title;
    text.replaceChildren(richText(step.text));
    const layout = preview.update(settings);
    control.replaceChildren(...(step.summary ? summary(layout) : setting ? [
      el('p', { class: 'step-control-label' }, setting.label),
      choiceGroup({
        label: setting.label,
        options: setting.options,
        value: settings[setting.key],
        onChange: value => {
          settings[setting.key] = value;
          preview.update(settings);
        },
      }),
    ] : []));

    preview.node.dataset.focus = setting?.key ?? '';

    back.disabled = index === 0;
    next.replaceChildren(...(last ? [ui.restart, icon('fa-rotate-left')] : [ui.next, icon('fa-arrow-right')]));
    dots.forEach((dot, position) => {
      dot.classList.toggle('done', position < index);
      if (position === index) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
  }

  root.append(pageHead({ ...page, count: steps.length }), el('p', { class: 'how-to' }, page.howTo), sheetPicker, stepper, callout({ icon: 'fa-circle-info', ...page.callout }));
  render();
}
