import { mountHeader } from '../components/header.js'
import { toast } from '../components/toast.js'
import { $, h } from '../core/dom.js'
import { DEFAULT_SIZE, FORMATS, QR_STYLES, SIZES, validate } from './formats.js'
import { renderQr } from './qr-renderer.js'
import { renderBwip } from './bwip-renderer.js'
import { TARGETS, copyImage, downloadImage, shareImage } from './share.js'

const DEBOUNCE_MS = 200
const state = { format: 'qrcode', style: 'square', icon: null, run: 0, canvas: null }
const ui = Object.fromEntries(
  ['formats', 'hint', 'content', 'size', 'color', 'qr-options', 'styles', 'icon', 'icon-preview', 'icon-clear', 'stage', 'actions', 'share']
    .map(id => [id, $(`#${id}`)])
)

function chipGroup(root, items, active, onPick) {
  const buttons = items.map(([id, label]) =>
    h('button', {
      type: 'button', class: 'chip', 'aria-pressed': String(id === active),
      onclick: () => {
        buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(items[i][0] === id)))
        onPick(id)
      },
    }, label))
  root.replaceChildren(...buttons)
}

const cleanError = error => String(error?.message ?? error).replace(/^bwipp\.\w+:\s*/, '')
const debounce = (fn, ms) => { let t; return () => { clearTimeout(t); t = setTimeout(fn, ms) } }

function showStage(message, canvas = null) {
  state.canvas = canvas
  ui.stage.className = `stage${canvas ? ' ready' : ''}${message ? ' error' : ''}`
  ui.stage.replaceChildren(canvas ?? h('p', {}, message ?? 'Your code appears here as you type.'))
  ui.actions.querySelectorAll('button').forEach(button => { button.disabled = !canvas })
  const text = ui.content.value.trim()
  const targets = canvas ? TARGETS.filter(t => t.available?.(text) ?? true) : []
  ui.share.replaceChildren(...targets.map(t =>
    h('a', { class: 'btn', href: t.href(text), target: '_blank', rel: 'noopener noreferrer' }, t.label)))
}

async function render() {
  const run = ++state.run
  const text = ui.content.value.trim()
  if (!text) return showStage(null)

  const format = FORMATS[state.format]
  const problem = validate(state.format, text, ui.color.value)
  if (problem) return showStage(problem)

  const common = { text, size: Number(ui.size.value), color: ui.color.value }
  try {
    const canvas = format.renderer === 'qr'
      ? await renderQr({ ...common, style: state.style, icon: state.icon })
      : await renderBwip({ ...common, id: state.format, quiet: format.quiet, linear: format.linear })
    if (run === state.run) showStage(null, canvas)
  } catch (error) {
    if (run === state.run) showStage(cleanError(error))
  }
}

const schedule = debounce(render, DEBOUNCE_MS)

function setFormat(id) {
  state.format = id
  ui.hint.textContent = FORMATS[id].hint
  ui['qr-options'].hidden = id !== 'qrcode'
  render()
}

function setIcon(src) {
  state.icon = src
  ui['icon-preview'].hidden = ui['icon-clear'].hidden = !src
  if (src) ui['icon-preview'].src = src
  else ui.icon.value = ''
  render()
}

async function run(action, success) {
  try {
    await action()
    if (success) toast(success)
  } catch (error) {
    toast(cleanError(error), 'error')
  }
}

function init() {
  mountHeader()
  ui.size.replaceChildren(...SIZES.map(({ value, label }) => h('option', { value, selected: value === DEFAULT_SIZE }, label)))
  chipGroup(ui.formats, Object.entries(FORMATS).map(([id, f]) => [id, f.label]), state.format, setFormat)
  chipGroup(ui.styles, Object.entries(QR_STYLES).map(([id, s]) => [id, s.label]), state.style, id => { state.style = id; render() })
  setFormat(state.format)

  ui.content.addEventListener('input', schedule)
  ui.size.addEventListener('change', render)
  ui.color.addEventListener('input', schedule)
  ui['icon-clear'].addEventListener('click', () => setIcon(null))
  ui.icon.addEventListener('change', () => {
    const file = ui.icon.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setIcon(reader.result)
    reader.readAsDataURL(file)
  })

  const name = () => `barcode-${state.format}.png`
  $('#copy').addEventListener('click', () => run(() => copyImage(state.canvas), 'Image copied'))
  $('#download').addEventListener('click', () => run(() => downloadImage(state.canvas, name()), 'Download started'))
  const shareButton = $('#native-share')
  shareButton.hidden = !navigator.share
  shareButton.addEventListener('click', () => run(() => shareImage(state.canvas, name(), ui.content.value.trim())))
}

init()
