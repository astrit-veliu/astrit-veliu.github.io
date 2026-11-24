const SVG_NS = 'http://www.w3.org/2000/svg'

export const px = n => `${Math.round(n * 100) / 100}px`

function applyProp(el, key, value) {
  if (value == null) return
  if (key.startsWith('aria-')) return el.setAttribute(key, String(value))
  if (value === false) return
  if (key === 'style' && typeof value === 'object') {
    for (const [prop, v] of Object.entries(value)) {
      if (v == null) continue
      prop.includes('-') ? el.style.setProperty(prop, v) : (el.style[prop] = v)
    }
  } else if (key === 'dataset') Object.assign(el.dataset, value)
  else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2).toLowerCase(), value)
  else if (key !== 'class' && !(el instanceof SVGElement) && key in el) el[key] = value
  else el.setAttribute(key, value === true ? '' : value)
}

function build(el, props, kids) {
  const { value, ...rest } = props ?? {}
  for (const [key, v] of Object.entries(rest)) applyProp(el, key, v)
  if (value !== undefined) applyProp(el, 'value', value)
  el.append(...kids.flat(Infinity).filter(k => k != null && k !== false))
  return el
}

/** Element builder. Children are appended as text or nodes, never parsed as HTML. */
export const h = (tag, props, ...kids) => build(document.createElement(tag), props, kids)
export const svg = (tag, props, ...kids) => build(document.createElementNS(SVG_NS, tag), props, kids)
export const icon = (name, style) => h('i', { class: `fa-solid fa-${name}`, 'aria-hidden': 'true', style })
