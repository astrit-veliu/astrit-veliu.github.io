import { DEVICES } from '../../config/devices.js'
import { h, px } from '../../lib/dom.js'
import { buildFrame } from './frames.js'
import { transformHandles } from './handles.js'

export function deviceLayer(ctx) {
  const { screen, width, height, interactive } = ctx
  const spec = DEVICES[screen.style.device]
  const frameH = Math.min(height * spec.heightRatio, (width * 0.92) / spec.aspect)
  const frameW = frameH * spec.aspect
  const { x, y, scale, rotate } = screen.device
  const cx = (x ?? 0.5) * width
  const cy = (y ?? 0.28 + spec.heightRatio / 2) * height

  return h('div', {
    class: 'stage-item',
    dataset: interactive ? { drag: 'device' } : undefined,
    style: { position: 'absolute', left: px(cx - frameW / 2), top: px(cy - frameH / 2), width: px(frameW), height: px(frameH), transform: `rotate(${rotate}deg) scale(${scale})`, zIndex: 5, '--item-scale': scale },
  }, buildFrame(ctx, spec.kind, frameW, frameH), interactive && transformHandles())
}
