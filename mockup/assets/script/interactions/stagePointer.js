import { LIMITS } from '../config/defaults.js'
import { clamp } from '../lib/geometry.js'
import { store } from '../state/store.js'

const toDegrees = 180 / Math.PI
const wrapAngle = deg => ((((deg + 180) % 360) + 360) % 360) - 180

/**
 * One delegated pointer controller for the preview: move/scale/rotate the device, move the headline,
 * and move/select/resize overlays. Works with mouse, touch and pen; coordinates are converted to
 * logical stage units so it is independent of the preview zoom.
 */
export function attachStagePointer(frame, { stage, getScale, getSize }) {
  let session = null

  frame.addEventListener('pointerdown', e => {
    if (e.button > 0) return
    const target = e.target.closest('[data-action], [data-handle], [data-drag]')
    if (!target) return store.selectOverlay(null)

    const item = target.closest('[data-drag]')
    if (target.dataset.action === 'delete-overlay') return store.removeOverlay(item.dataset.id)

    const kind = item.dataset.drag
    if (kind === 'overlay') store.selectOverlay(item.dataset.id)

    const k = getScale()
    const origin = stage.getBoundingClientRect()
    const rect = item.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const screen = store.screen()
    const overlay = kind === 'overlay' ? screen.overlays.find(o => o.id === item.dataset.id) : null

    session = {
      kind, id: item.dataset.id, handle: target.dataset.handle,
      px: e.clientX, py: e.clientY, cx, cy,
      startDist: Math.hypot(e.clientX - cx, e.clientY - cy) || 1,
      startAngle: Math.atan2(e.clientY - cy, e.clientX - cx) * toDegrees,
      topLeft: { x: (rect.left - origin.left) / k, y: (rect.top - origin.top) / k },
      center: { x: (cx - origin.left) / k, y: (cy - origin.top) / k },
      start: kind === 'device' ? { ...screen.device } : overlay ? { ...overlay } : null,
    }
    frame.setPointerCapture(e.pointerId)
    e.preventDefault()
  })

  frame.addEventListener('pointermove', e => {
    if (!session) return
    const s = session
    const { width, height } = getSize()
    const dx = (e.clientX - s.px) / getScale()
    const dy = (e.clientY - s.py) / getScale()
    const ratio = Math.hypot(e.clientX - s.cx, e.clientY - s.cy) / s.startDist
    const rotation = () => wrapAngle((s.start.rotate ?? 0) + Math.atan2(e.clientY - s.cy, e.clientX - s.cx) * toDegrees - s.startAngle)

    if (s.kind === 'headline') {
      store.set('style.headlinePos', { x: (s.topLeft.x + dx) / width, y: (s.topLeft.y + dy) / height }, { live: true })
    } else if (s.kind === 'device') {
      store.mutate(sc => {
        if (s.handle === 'scale') sc.device.scale = clamp(s.start.scale * ratio, ...LIMITS.deviceScale)
        else if (s.handle === 'rotate') sc.device.rotate = Math.round(rotation())
        else Object.assign(sc.device, { x: (s.center.x + dx) / width, y: (s.center.y + dy) / height })
      }, { live: true })
    } else {
      store.patchOverlay(s.id, () => {
        if (s.handle === 'scale') return { w: clamp(s.start.w * ratio, ...LIMITS.popupWidth) }
        if (s.handle === 'rotate') return { rotate: Math.round(rotation()) }
        return { x: (s.center.x + dx) / width, y: (s.center.y + dy) / height }
      }, { live: true })
    }
  })

  const end = () => {
    if (!session) return
    session = null
    store.commit()
  }
  frame.addEventListener('pointerup', end)
  frame.addEventListener('pointercancel', end)
}
