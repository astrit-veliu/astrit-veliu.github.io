const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => entities[char]);

class Safe {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

export const raw = (value) => new Safe(value);

const render = (value) => {
  if (value instanceof Safe) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  if (value === null || value === undefined || value === false) return '';
  return escapeHtml(value);
};

export const html = (strings, ...values) =>
  raw(
    strings.reduce(
      (out, chunk, index) => out + chunk + (index < values.length ? render(values[index]) : ''),
      '',
    ),
  );

export const mount = (element, view) => {
  element.innerHTML = render(view);
};

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
