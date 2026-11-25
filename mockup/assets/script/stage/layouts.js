import { fontStack } from '../config/fonts.js'
import { alpha } from '../lib/color.js'
import { h, icon, px } from '../lib/dom.js'
import { deviceLayer } from './layers/device.js'
import { featureStripLayer } from './layers/featureStrip.js'
import { BANNER_METRICS, headlineLayer } from './layers/headline.js'

const tagLayer = ({ asset, theme, width }) => asset.tag && h('div', {
  style: { position: 'absolute', top: px(width * 0.03), right: px(width * 0.05), zIndex: 5, fontFamily: fontStack('Montserrat'), fontSize: px(width * 0.03), fontWeight: 800, color: theme.accent, display: 'flex', gap: px(width * 0.01), alignItems: 'center' },
}, icon(asset.tag.icon), asset.tag.text)

function bannerLayout(ctx) {
  const scrim = ctx.bg.type === 'image' && ctx.bg.image && h('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient(120deg, rgba(0,0,0,.7) 30%, transparent 100%)', zIndex: 1 } })
  return [scrim, headlineLayer(ctx, BANNER_METRICS), tagLayer(ctx)]
}

function iconLayout(ctx) {
  const { screen, theme, width, height, asset, interactive } = ctx
  const size = width * 0.45
  const { screenshot } = screen.media
  const art = screenshot
    ? h('img', { src: screenshot, alt: '', style: { width: px(size), height: px(size), objectFit: 'cover', borderRadius: px(width * 0.12), boxShadow: `0 0 ${px(width * 0.12)} ${alpha(theme.accent, 0.35)}` } })
    : h('div', { style: { width: px(size), height: px(size), borderRadius: px(width * 0.12), background: alpha(theme.accent, 0.13), border: `2px solid ${alpha(theme.accent, 0.27)}`, display: 'grid', placeItems: 'center', color: theme.accent, opacity: 0.6 } }, icon('image', { fontSize: px(width * 0.15) }))
  const text = (style, ...kids) => h('div', { style: { textAlign: 'center', ...style } }, ...kids)

  return [
    h('div', { style: { position: 'absolute', inset: '0', background: `radial-gradient(circle at center, ${alpha(theme.accent, 0.13)} 0%, transparent 70%)` } }),
    h('div', { style: { position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: px(height * 0.04), zIndex: 5 } },
      art,
      text({ fontFamily: fontStack(screen.style.headlineFont), fontSize: px(width * 0.06), fontWeight: 800, color: '#fff' }, screen.content.headline),
      asset.tag && text({ fontSize: px(width * 0.04), fontWeight: 600, color: theme.accent }, icon('vr-cardboard'), ` ${asset.tag.text}`),
      text({ fontFamily: 'var(--font-mono)', fontSize: px(width * 0.028), color: 'rgba(255,255,255,.4)' }, `${asset.w} × ${asset.h} px`)),
    interactive && !screenshot && text({ position: 'absolute', bottom: px(height * 0.03), left: 0, right: 0, fontSize: px(width * 0.03), color: 'rgba(255,255,255,.3)' }, 'Upload an icon via Screenshot'),
  ]
}

export const LAYOUTS = {
  device: ctx => [headlineLayer(ctx), deviceLayer(ctx), featureStripLayer(ctx)],
  banner: bannerLayout,
  icon: iconLayout,
}
