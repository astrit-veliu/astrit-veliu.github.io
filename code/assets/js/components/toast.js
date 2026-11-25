import { h } from '../core/dom.js'

const VISIBLE_MS = 2800
let node
let timer

export function toast(message, type = 'info') {
  node ??= document.body.appendChild(h('div', { class: 'toast', role: 'status', 'aria-live': 'polite' }))
  node.textContent = message
  node.dataset.type = type
  node.classList.add('on')
  clearTimeout(timer)
  timer = setTimeout(() => node.classList.remove('on'), VISIBLE_MS)
}
