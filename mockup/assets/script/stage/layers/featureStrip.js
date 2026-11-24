import { FEATURE_REF_WIDTH } from '../../config/defaults.js'
import { fontStack } from '../../config/fonts.js'
import { h, px } from '../../lib/dom.js'

export function featureStripLayer({ screen, width, height }) {
  const { style, content } = screen
  const items = content.features.filter(text => text.trim())
  if (!style.featureShow || !items.length) return null
  const place = {
    bottom: { bottom: px(height * 0.03) },
    top: { top: px(height * 0.22) },
    center: { top: '50%', transform: 'translateY(-50%)' },
  }[style.featurePos]

  return h('div', { style: { position: 'absolute', left: px(width * 0.04), right: px(width * 0.04), display: 'flex', gap: px(width * 0.015), zIndex: 20, ...place } },
    items.map(text => h('div', { style: { flex: 1, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', borderRadius: px(width * 0.025), padding: `${px(height * 0.012)} ${px(width * 0.01)}`, textAlign: 'center', fontFamily: fontStack('Montserrat'), fontSize: px(style.featureSize * width / FEATURE_REF_WIDTH), fontWeight: 700, color: '#fff' } }, text)))
}
