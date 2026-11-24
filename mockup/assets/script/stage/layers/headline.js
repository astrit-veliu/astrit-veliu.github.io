import { fontStack } from '../../config/fonts.js'
import { h, px } from '../../lib/dom.js'

export const PHONE_METRICS = { titleK: 0.082, subK: 0.042, left: 0.07, widthK: 0.86, anchor: 'top' }
export const BANNER_METRICS = { titleK: 0.065, subK: 0.028, left: 0.05, widthK: 0.6, anchor: 'middle' }

export function headlineLayer({ screen, theme, width, height, interactive }, m = PHONE_METRICS) {
  const { content, style } = screen
  const pos = style.headlinePos
  const place = pos ? { left: px(pos.x * width), top: px(pos.y * height) }
    : m.anchor === 'middle' ? { left: px(width * m.left), top: '50%', transform: 'translateY(-50%)' }
    : { left: px(width * m.left), top: px(height * 0.038) }

  return h('div', { dataset: interactive ? { drag: 'headline' } : undefined, style: { position: 'absolute', width: px(width * m.widthK), zIndex: 10, ...place } },
    h('div', { style: { fontFamily: fontStack(style.headlineFont), fontSize: px(width * m.titleK * style.headlineScale), fontWeight: 900, lineHeight: 1.05, color: '#fff', textShadow: `0 ${px(width * 0.007)} ${px(width * 0.05)} rgba(0,0,0,.5)` } },
      content.headline,
      content.accent.trim() && [h('br'), h('span', { style: { background: theme.accent, color: theme.bg, padding: `0 ${px(width * 0.02)}`, borderRadius: px(width * 0.013) } }, content.accent)]),
    h('div', { style: { fontFamily: fontStack(style.subtitleFont), fontSize: px(width * m.subK * style.subtitleScale), fontWeight: 500, color: 'rgba(255,255,255,.62)', marginTop: px(width * 0.02), lineHeight: 1.4 } }, content.subtitle))
}
