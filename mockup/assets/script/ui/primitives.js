import { h, icon } from '../lib/dom.js'
import { store } from '../state/store.js'

export const Section = (title, ...children) =>
  h('section', { class: 'section' }, h('h3', { class: 'section-label' }, title), ...children)

export const Field = (label, control) =>
  h('label', { class: 'field' }, h('span', { class: 'field-label' }, label), control)

export const Hint = text => h('p', { class: 'hint' }, icon('circle-info'), h('span', {}, text))

export const Button = ({ label, icon: name, variant = '', onClick, ...rest }) =>
  h('button', { type: 'button', class: `btn ${variant}`.trim(), onclick: onClick, ...rest }, name && icon(name), label && h('span', {}, label))

export function Upload({ label, icon: name, accept, onFile }) {
  const input = h('input', { type: 'file', accept, hidden: true, onchange: () => { const file = input.files[0]; input.value = ''; if (file) onFile(file) } })
  const zone = h('button', {
    type: 'button', class: 'upload', onclick: () => input.click(),
    ondragover: e => { e.preventDefault(); zone.classList.add('dragover') },
    ondragleave: () => zone.classList.remove('dragover'),
    ondrop: e => { e.preventDefault(); zone.classList.remove('dragover'); const file = e.dataTransfer.files[0]; if (file) onFile(file) },
  }, icon(name), h('span', {}, label))
  return h('div', {}, zone, input)
}

/** Thumbnail + remove button for an uploaded image stored at `path`. */
export function MediaPreview({ path, label, onRemove }) {
  const img = h('img', { alt: label })
  const root = h('div', { class: 'media-preview', hidden: true }, img, Button({ label: 'Remove', icon: 'trash', variant: 'danger', onClick: onRemove }))
  const sync = () => {
    const url = store.read(path)
    root.hidden = !url
    if (url && img.getAttribute('src') !== url) img.src = url
  }
  store.subscribe(sync)
  sync()
  return root
}

/** Key/value rows whose values are recomputed on every non-live store change. */
export function InfoList(rows) {
  const cells = rows.map(row => ({ row, value: h('span', { class: 'info-val' }) }))
  const sync = () => cells.forEach(({ row, value }) => {
    const { text, tone, title } = row.read()
    value.textContent = text
    value.className = `info-val ${tone ?? ''}`.trim()
    value.title = title ?? ''
  })
  store.subscribe(e => { if (!e.live) sync() })
  sync()
  return h('div', { class: 'info-list' }, cells.map(({ row, value }) => h('div', { class: 'info-row' }, h('span', { class: 'info-key' }, row.key), value)))
}
