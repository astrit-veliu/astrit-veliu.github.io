import { alpha } from '../../lib/color.js'
import { h, px } from '../../lib/dom.js'
import { noiseTile } from '../../lib/noise.js'

const fill = { position: 'absolute', inset: '0' }

function baseFill(bg, theme, c1, c2) {
  if (bg.type === 'image' && bg.image) return { backgroundImage: `url("${bg.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
  if (bg.type === 'mesh') {
    return { background: `radial-gradient(ellipse 120% 80% at 20% 20%, ${alpha(theme.accent, 0.15)} 0%, transparent 55%), radial-gradient(ellipse 80% 100% at 80% 80%, ${alpha(theme.accent2, 0.1)} 0%, transparent 55%), ${c1}` }
  }
  if (bg.type === 'solid') return { background: c1 }
  return { background: `linear-gradient(150deg, ${c1} 0%, ${c2} 100%)` }
}

const stripFill = (style, theme) =>
  ({ white: '#fff', solid: theme.accent, gradient: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})` })[style]

export function backgroundLayers({ bg, theme, width, height }) {
  const layers = [h('div', { style: { ...fill, ...baseFill(bg, theme, bg.col1 ?? theme.bg, bg.col2 ?? theme.bg2) } })]

  if (bg.noise > 0) {
    layers.push(h('div', { style: { ...fill, opacity: bg.noise / 100, backgroundImage: `url(${noiseTile()})`, backgroundSize: '128px 128px' } }))
  }
  if (bg.shapes) {
    const circles = [[width * 1.1, -width * 0.2, -width * 0.2, 0.07], [width * 0.7, width * 0.6, height * 0.55, 0.05]]
    circles.forEach(([size, left, top, opacity]) => layers.push(h('div', {
      style: { position: 'absolute', width: px(size), height: px(size), left: px(left), top: px(top), borderRadius: '50%', border: `1px solid ${theme.accent}`, opacity },
    })))
  }
  if (bg.strip && bg.stripStyle !== 'none') {
    layers.push(h('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: px(width * 0.0133), background: stripFill(bg.stripStyle, theme), zIndex: 30 } }))
  }
  return layers
}
