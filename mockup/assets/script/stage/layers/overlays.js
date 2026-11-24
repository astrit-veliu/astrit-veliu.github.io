import { fontStack } from '../../config/fonts.js'
import { h, icon, px, svg } from '../../lib/dom.js'
import { transformHandles } from './handles.js'

const BADGE_STYLES = theme => ({
  accent:  { background: theme.accent, color: theme.bg },
  outline: { background: 'transparent', border: `2px solid ${theme.accent}`, color: theme.accent },
  dark:    { background: 'rgba(0,0,0,.65)', border: '1px solid rgba(255,255,255,.14)', color: '#fff' },
  white:   { background: '#fff', color: '#000' },
})

const AWARD_STYLES = theme => ({
  gold:   { bg: 'linear-gradient(160deg,#2a1f00,#1a1200)', border: 'rgba(212,172,60,.5)', leaf: '#d4ac3c', star: '#f5d06e', text: '#f5d06e', sub: 'rgba(245,208,110,.7)' },
  accent: { bg: `linear-gradient(160deg,${theme.bg},rgba(0,0,0,.85))`, border: `${theme.accent}55`, leaf: theme.accent, star: theme.accent, text: '#fff', sub: 'rgba(255,255,255,.65)' },
  dark:   { bg: 'rgba(10,10,15,.92)', border: 'rgba(255,255,255,.12)', leaf: 'rgba(255,255,255,.5)', star: '#fff', text: '#fff', sub: 'rgba(255,255,255,.55)' },
})

/** [cx, cy, rx, ry, rotation, opacity] for the left branch; the right one is mirrored. */
const LEAVES = [[22, 42, 12, 5.5, -40, 0.9], [13, 28, 11, 5, -60, 0.85], [9, 14, 10, 4.5, -80, 0.8], [14, 4, 9, 4, -100, 0.75]]

function wreath(color) {
  const leaf = ([cx, cy, rx, ry, rot, opacity], mirror) => {
    const x = mirror ? 120 - cx : cx
    return svg('ellipse', { cx: x, cy, rx, ry, opacity, fill: color, transform: `rotate(${mirror ? -rot : rot},${x},${cy})` })
  }
  const stroke = (d, w, opacity) => svg('path', { d, stroke: color, 'stroke-width': w, fill: 'none', opacity })
  return svg('svg', { viewBox: '0 0 120 60', style: { width: '100%', height: '100%', display: 'block' } },
    ...LEAVES.map(l => leaf(l, false)), ...LEAVES.map(l => leaf(l, true)),
    stroke('M60,55 Q38,35 18,40', 1.2, 0.55), stroke('M60,55 Q82,35 102,40', 1.2, 0.55), stroke('M50,57 Q60,62 70,57', 1.8, 0.7))
}

const badge = (ov, { theme, width }) => h('div', {
  style: { display: 'inline-flex', alignItems: 'center', gap: px(width * 0.02), padding: `${px(width * 0.025)} ${px(width * 0.055)}`, borderRadius: '999px', fontFamily: fontStack('Montserrat'), fontSize: px(width * 0.038), fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 6px 20px rgba(0,0,0,.4)', ...(BADGE_STYLES(theme)[ov.style] ?? BADGE_STYLES(theme).accent) },
}, icon('shield-halved', { fontSize: px(width * 0.042) }), ov.text)

function award(ov, { theme, width }) {
  const a = AWARD_STYLES(theme)[ov.style] ?? AWARD_STYLES(theme).gold
  const size = width * 0.3
  const fs = size * 0.18
  return h('div', { style: { width: px(size), height: px(size * 1.05), background: a.bg, border: `1.5px solid ${a.border}`, borderRadius: px(size * 0.1), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: px(size * 0.04), padding: `${px(size * 0.08)} ${px(size * 0.06)} ${px(size * 0.06)}`, boxShadow: '0 8px 32px rgba(0,0,0,.55)', fontFamily: fontStack('Montserrat'), textAlign: 'center' } },
    h('div', { style: { position: 'relative', width: px(size * 0.85), height: px(size * 0.45), flexShrink: 0 } }, wreath(a.leaf),
      h('div', { style: { position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)', color: a.star, fontSize: px(size * 0.14), lineHeight: 1 } }, icon('star'))),
    h('div', { style: { fontSize: px(fs), fontWeight: 900, color: a.text, lineHeight: 1.1 } }, ov.title),
    ov.sub && h('div', { style: { fontSize: px(fs * 0.68), fontWeight: 600, color: a.sub } }, ov.sub))
}

const popup = (ov, { width }) => h('img', { src: ov.src, alt: '', style: { width: px(ov.w * width), display: 'block', borderRadius: px(width * 0.033), boxShadow: '0 8px 28px rgba(0,0,0,.55)', pointerEvents: 'none' } })

const BUILDERS = { badge, award, popup }

export function overlayLayers(ctx) {
  const { screen, width, height, interactive, selectedId } = ctx
  return screen.overlays
    .filter(ov => ov.type !== 'badge' || screen.style.badgesShow)
    .map(ov => {
      const selected = interactive && ov.id === selectedId
      return h('div', {
        class: selected ? 'stage-item is-selected' : 'stage-item',
        dataset: interactive ? { drag: 'overlay', id: ov.id } : undefined,
        style: { position: 'absolute', left: px(ov.x * width), top: px(ov.y * height), transform: `translate(-50%, -50%) rotate(${ov.rotate ?? 0}deg)`, zIndex: 40, '--item-scale': 1 },
      }, BUILDERS[ov.type](ov, ctx),
      interactive && ov.type === 'popup' && transformHandles(),
      selected && h('span', { class: 'stage-delete', dataset: { action: 'delete-overlay' }, 'aria-label': 'Delete overlay' }, '×'))
    })
}
