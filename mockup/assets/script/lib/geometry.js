import { ASSET_TYPES, CANVAS_LIMITS, LOGICAL_LONG_EDGE, PLAY_STORE } from '../config/assetTypes.js'

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** Final pixel size of a screen for an asset type. */
export function outputSize(screen, assetKey) {
  const asset = ASSET_TYPES[assetKey]
  if (!asset.resizable) return { w: asset.w, h: asset.h }
  const side = (value, fallback) => clamp(Math.round(value ?? fallback), CANVAS_LIMITS.minSide, CANVAS_LIMITS.maxSide)
  return { w: side(screen.size.w, asset.w), h: side(screen.size.h, asset.h) }
}

/** Logical drawing space for an output size, plus the factor that maps it back to pixels. */
export function stageSize({ w, h }) {
  const k = LOGICAL_LONG_EDGE / Math.max(w, h)
  return { width: w * k, height: h * k, exportScale: 1 / k }
}

export const fitScale = (box, stage, max = Infinity) =>
  Math.max(0.01, Math.min(max, box.width / stage.width, box.height / stage.height))

const gcd = (a, b) => (b ? gcd(b, a % b) : a)

export function ratioLabel({ w, h }) {
  const g = gcd(w, h)
  const [a, b] = [w / g, h / g]
  return Math.max(a, b) <= 32 ? `${a}:${b}` : `${(w / h).toFixed(2)}:1`
}

export function playStoreStatus(assetKey, { w, h }) {
  if (!ASSET_TYPES[assetKey].resizable) return { ok: true, text: 'Compliant' }
  const { minSide, maxSide, maxRatio } = PLAY_STORE
  const issues = []
  if (Math.min(w, h) < minSide) issues.push(`shortest side under ${minSide}px`)
  if (Math.max(w, h) > maxSide) issues.push(`longest side over ${maxSide}px`)
  if (Math.max(w, h) > maxRatio * Math.min(w, h)) issues.push(`ratio beyond ${maxRatio}:1`)
  return issues.length ? { ok: false, text: 'Not compliant', detail: issues.join(', ') } : { ok: true, text: 'Compliant' }
}
