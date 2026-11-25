import { h } from '../core/dom.js'

const PAGES = [
  { id: 'generate', href: 'index.html', label: 'Generate' },
  { id: 'decode', href: 'decode.html', label: 'Decode' },
]

export function mountHeader() {
  const root = document.querySelector('.site-header')
  const current = document.body.dataset.page
  root.replaceChildren(
    h('a', { class: 'brand', href: 'index.html' }, 'Barcode Studio'),
    h('nav', { class: 'nav', 'aria-label': 'Main' },
      ...PAGES.map(({ id, href, label }) =>
        h('a', { href, 'aria-current': id === current ? 'page' : null }, label)))
  )
}
