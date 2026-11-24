import { h } from './dom.js'

export function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = h('a', { href: url, download: filename })
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

export const slug = text =>
  text.toLowerCase().normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'screen'
