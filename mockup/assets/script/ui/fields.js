import { CANVAS_LIMITS } from '../config/assetTypes.js'
import { isHex, normalizeHex } from '../lib/color.js'
import { h, icon } from '../lib/dom.js'
import { store } from '../state/store.js'

const syncers = new Set()
store.subscribe(() => syncers.forEach(sync => sync()))

/** Runs `fn` now and after every store change. */
export const watch = fn => { syncers.add(fn); fn() }

/** Two-way binds an element property to a store path. The focused element is never overwritten. */
function bind(el, path, { toView = v => v ?? '', fromView = v => v, prop = 'value', enabled } = {}) {
  const sync = (force = false) => {
    const view = toView(store.read(path))
    if ((force || el !== document.activeElement) && el[prop] !== view) el[prop] = view
    if (enabled) el.disabled = !enabled()
  }
  el.addEventListener('input', () => {
    const next = fromView(el[prop])
    if (next !== undefined) store.set(path, next)
  })
  el.addEventListener('change', () => sync(true))
  watch(sync)
  return el
}

export function Slider({ path, min, max, step = 1, factor = 1, label, icon: name }) {
  const toView = v => String(Math.round((v ?? 0) * factor * 100) / 100)
  const range = bind(h('input', { type: 'range', class: 'range', min, max, step, 'aria-label': label }), path, { toView, fromView: v => parseFloat(v) / factor })
  const number = bind(h('input', { type: 'number', class: 'input input-num', min, max, step, 'aria-label': label }), path, {
    toView,
    fromView: v => { const n = parseFloat(v); return n >= min && n <= max ? n / factor : undefined },
  })
  return h('div', { class: 'slider', title: label }, name ? h('span', { class: 'slider-icon' }, icon(name)) : h('span', { class: 'slider-label' }, label), range, number)
}

/** Nullable integer input: empty means "use the default". */
export function NumberInput({ path, label, min = CANVAS_LIMITS.minSide, max = CANVAS_LIMITS.maxSide, placeholder, enabled }) {
  return bind(h('input', { type: 'number', class: 'input', min, max, placeholder, 'aria-label': label }), path, {
    enabled,
    fromView: v => {
      if (v === '') return null
      const n = parseInt(v, 10)
      return n >= min && n <= max ? n : undefined
    },
  })
}

export function Select({ path, options, label }) {
  const items = options.map(o => (typeof o === 'string' ? { value: o, label: o } : o))
  return bind(h('select', { class: 'input', 'aria-label': label }, items.map(o => h('option', { value: o.value }, o.label))), path)
}

export function TextInput({ path, label, placeholder, multiline = false, className = '' }) {
  const el = h(multiline ? 'textarea' : 'input', { class: `input ${className}`.trim(), 'aria-label': label, placeholder, rows: multiline ? 2 : undefined, type: multiline ? undefined : 'text' })
  return bind(el, path)
}

export function Toggle({ path, label }) {
  const button = h('button', { type: 'button', class: 'toggle', role: 'switch', 'aria-label': label, onclick: () => store.set(path, !store.read(path)) })
  watch(() => button.setAttribute('aria-checked', String(Boolean(store.read(path)))))
  return h('div', { class: 'toggle-row' }, h('span', { class: 'toggle-label' }, label), button)
}

/** Colour picker + hex field. A null value means "follow the theme" and shows `fallback()`. */
export function ColorInput({ path, label, fallback }) {
  const toView = v => v ?? fallback()
  const picker = bind(h('input', { type: 'color', class: 'color', 'aria-label': label }), path, { toView, fromView: normalizeHex })
  const hex = bind(h('input', { type: 'text', class: 'input mono', maxlength: 7, spellcheck: false, 'aria-label': `${label} hex` }), path, {
    toView,
    fromView: v => (isHex(v) ? normalizeHex(v) : undefined),
  })
  const reset = h('button', { type: 'button', class: 'icon-btn', title: 'Follow theme', 'aria-label': `Reset ${label} to theme`, onclick: () => store.set(path, null) }, icon('rotate-left'))
  watch(() => { reset.hidden = store.read(path) === null })
  return h('div', { class: 'color-row' }, picker, hex, reset)
}

/** One-of-N picker (radio group). Variants: card, dot (swatch), row (with hint). */
export function Choice({ path, items, variant = 'card', label }) {
  const buttons = items.map(item => h('button', {
    type: 'button', role: 'radio', class: `choice choice-${variant}`, title: item.label, 'aria-label': item.label,
    style: item.swatch ? { '--swatch': item.swatch } : undefined,
    onclick: () => store.set(path, item.value),
  }, variant !== 'dot' && [item.icon && icon(item.icon), h('span', { class: 'choice-label' }, item.label), item.hint && h('span', { class: 'choice-hint' }, item.hint)]))
  watch(() => buttons.forEach((b, i) => b.setAttribute('aria-checked', String(store.read(path) === items[i].value))))
  return h('div', { class: `choice-group choice-group-${variant}`, role: 'radiogroup', 'aria-label': label }, buttons)
}
