import { alpha } from '../../lib/color.js'
import { h, icon, px } from '../../lib/dom.js'

const BODY = '#18213a'
const EDGE = '#2d3c5c'

function content({ screen, theme }, w) {
  const { screenshot } = screen.media
  if (screenshot) return h('img', { src: screenshot, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } })
  return h('div', { style: { width: '100%', height: '100%', background: alpha(theme.accent, 0.08), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: px(w * 0.05), opacity: 0.6, color: theme.accent } },
    icon('image', { fontSize: px(w * 0.12) }),
    h('div', { style: { fontSize: px(w * 0.075), fontWeight: 700, color: 'rgba(255,255,255,.6)' } }, 'Upload Screenshot'))
}

const layer = (style, ...kids) => h('div', { style: { position: 'absolute', ...style } }, ...kids)

const FRAMES = {
  phone: (ctx, w, h_) => [
    layer({ inset: 0, background: BODY, borderRadius: px(w * 0.12), border: `${px(w * 0.014)} solid ${EDGE}`, boxShadow: `0 ${px(w * 0.14)} ${px(w * 0.4)} rgba(0,0,0,.8)` }),
    layer({ top: 0, left: '50%', transform: 'translateX(-50%)', width: px(w * 0.28), height: px(h_ * 0.008), background: EDGE, borderRadius: '0 0 4px 4px', zIndex: 20 }),
    layer({ left: '3.5%', top: '2%', width: '93%', height: '96%', overflow: 'hidden', borderRadius: px(w * 0.1), background: '#000' }, content(ctx, w)),
  ],
  tablet: (ctx, w) => [
    layer({ inset: 0, background: BODY, borderRadius: px(w * 0.08), border: `${px(w * 0.012)} solid ${EDGE}`, boxShadow: `0 ${px(w * 0.12)} ${px(w * 0.35)} rgba(0,0,0,.75)` }),
    layer({ left: '2.5%', top: '1.5%', width: '95%', height: '97%', overflow: 'hidden', borderRadius: px(w * 0.06) }, content(ctx, w)),
  ],
  fold: (ctx, w) => {
    const panel = (radius, opacity) => h('div', { style: { flex: 1, height: '100%', overflow: 'hidden', borderRadius: radius, opacity } }, content(ctx, w / 2))
    const r = px(w * 0.09)
    return [layer({ inset: 0, display: 'flex', background: BODY, borderRadius: px(w * 0.1), border: `${px(w * 0.012)} solid ${EDGE}`, overflow: 'hidden', boxShadow: `0 ${px(w * 0.1)} ${px(w * 0.3)} rgba(0,0,0,.75)` },
      panel(`${r} 0 0 ${r}`, 1), h('div', { style: { width: px(w * 0.02), background: EDGE, flexShrink: 0 } }), panel(`0 ${r} ${r} 0`, 0.85))]
  },
  flat: (ctx, w) => [
    layer({ inset: 0, overflow: 'hidden', borderRadius: px(w * 0.09), boxShadow: `0 ${px(w * 0.13)} ${px(w * 0.35)} rgba(0,0,0,.65)` }, content(ctx, w)),
  ],
  custom: (ctx, w) => [
    layer({ inset: '5%', overflow: 'hidden', borderRadius: px(w * 0.04) }, content(ctx, w)),
    h('img', { src: ctx.screen.media.frame, alt: '', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 } }),
  ],
}

export function buildFrame(ctx, kind, w, height) {
  const key = ctx.screen.media.frame ? 'custom' : kind
  return h('div', { style: { position: 'relative', width: '100%', height: '100%' } }, FRAMES[key](ctx, w, height))
}
