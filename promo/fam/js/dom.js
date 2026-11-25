import { promo } from './config.js'

export const fill = (template, values = {}) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '')

const resolve = (path) => path.split('.').reduce((node, key) => node?.[key], promo)

export function bindContent(root = document) {
  const values = { app: promo.app.name }

  root.querySelectorAll('[data-text]').forEach((el) => {
    el.textContent = fill(resolve(el.dataset.text) ?? '', values)
  })

  root.querySelectorAll('[data-href]').forEach((el) => {
    el.href = resolve(el.dataset.href)
  })

  const title = resolve(document.body.dataset.title ?? '')
  if (title) document.title = `${title} | ${promo.app.name}`
}
