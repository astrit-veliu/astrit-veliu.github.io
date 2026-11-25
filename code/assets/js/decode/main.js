import { mountHeader } from '../components/header.js'
import { toast } from '../components/toast.js'
import { $, h } from '../core/dom.js'
import { decodeImage } from './decoder.js'

const zone = $('#dropzone')
const result = $('#result')
const preview = $('#preview')
let previewUrl = null

const safeUrl = text => {
  try {
    const url = new URL(text)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch { return null }
}

function showResult({ format, text }) {
  const url = safeUrl(text)
  result.replaceChildren(
    h('p', { class: 'badge' }, format),
    url
      ? h('a', { class: 'decoded', href: url, target: '_blank', rel: 'noopener noreferrer' }, text)
      : h('p', { class: 'decoded' }, text),
    h('div', { class: 'actions' },
      h('button', {
        class: 'btn primary', type: 'button',
        onclick: () => navigator.clipboard.writeText(text).then(() => toast('Text copied'), () => toast('Copy failed', 'error')),
      }, 'Copy text'),
      url && h('a', { class: 'btn', href: url, target: '_blank', rel: 'noopener noreferrer' }, 'Open link'))
  )
}

async function handle(file) {
  if (!file?.type.startsWith('image/')) return toast('Choose an image file', 'error')
  if (previewUrl) URL.revokeObjectURL(previewUrl)
  previewUrl = URL.createObjectURL(file)
  preview.src = previewUrl
  preview.hidden = false
  result.replaceChildren(h('p', { class: 'muted' }, 'Scanning'))
  try {
    const hit = await decodeImage(file)
    if (hit) showResult(hit)
    else result.replaceChildren(h('p', { class: 'error-text' }, 'No code found. Use a sharp image with the whole code visible and good contrast.'))
  } catch (error) {
    result.replaceChildren(h('p', { class: 'error-text' }, error.message))
  }
}

mountHeader()
$('#file').addEventListener('change', event => handle(event.target.files[0]))
zone.addEventListener('dragover', event => { event.preventDefault(); zone.classList.add('over') })
zone.addEventListener('dragleave', () => zone.classList.remove('over'))
zone.addEventListener('drop', event => {
  event.preventDefault()
  zone.classList.remove('over')
  handle(event.dataTransfer.files[0])
})
document.addEventListener('paste', event => {
  const file = [...event.clipboardData.files].find(f => f.type.startsWith('image/'))
  if (file) handle(file)
})
