import { h, px } from '../../lib/dom.js'

export function watermarkLayer({ watermark, theme, width }) {
  if (!watermark.show || !watermark.text.trim()) return null
  return h('div', { style: { position: 'absolute', bottom: px(width * 0.027), right: px(width * 0.04), fontFamily: 'var(--font-mono)', fontSize: px(width * 0.027), fontWeight: 700, letterSpacing: px(width * 0.005), color: theme.accent, opacity: 0.4, zIndex: 20 } }, watermark.text)
}
