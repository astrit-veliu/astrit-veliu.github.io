import { ASSET_TYPES, CANVAS_LIMITS, DEFAULT_ASSET, PLAY_STORE } from '../config/assetTypes.js'
import { LIMITS, WATERMARK_DEFAULTS } from '../config/defaults.js'
import { DEVICES } from '../config/devices.js'
import { HEADLINE_FONTS, SUBTITLE_FONTS } from '../config/fonts.js'
import { AWARD_STYLE_OPTIONS, BADGE_STYLE_OPTIONS, BG_TYPES, FEATURE_POSITIONS, STRIP_STYLES, values } from '../config/options.js'
import { THEMES } from '../config/themes.js'
import { isHex, normalizeHex } from '../lib/color.js'
import { clamp } from '../lib/geometry.js'
import { readImage } from '../lib/images.js'
import { vendor } from '../lib/vendor.js'
import { createOverlay, createScreen } from '../state/screenFactory.js'
import { PROJECT_APP, PROJECT_VERSION } from './serialize.js'

const MAX_FILE_BYTES = 300 * 1024 * 1024
const MAX_OVERLAYS = 30
const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' }

// A project file is untrusted input: every field is type-checked, range-clamped and
// matched against the known options, and anything else is replaced by its default.
const obj = v => (v && typeof v === 'object' && !Array.isArray(v) ? v : {})
const text = (v, max, fallback) => (typeof v === 'string' ? v.slice(0, max) : fallback)
const bool = (v, fallback) => (typeof v === 'boolean' ? v : fallback)
const num = (v, [min, max], fallback) => (Number.isFinite(v) ? clamp(v, min, max) : fallback)
const nullableNum = (v, range) => (Number.isFinite(v) ? clamp(v, ...range) : null)
const oneOf = (v, allowed, fallback) => (allowed.includes(v) ? v : fallback)
const color = v => (typeof v === 'string' && isHex(v) ? normalizeHex(v) : null)
const position = v => (Number.isFinite(obj(v).x) && Number.isFinite(v.y) ? { x: clamp(v.x, -1, 2), y: clamp(v.y, -1, 2) } : null)
const side = v => (Number.isFinite(v) ? clamp(Math.round(v), CANVAS_LIMITS.minSide, CANVAS_LIMITS.maxSide) : null)

async function sanitizeBg(raw, loadAsset) {
  const b = obj(raw)
  return {
    type: oneOf(b.type, values(BG_TYPES), 'gradient'),
    col1: color(b.col1), col2: color(b.col2),
    strip: bool(b.strip, true), stripStyle: oneOf(b.stripStyle, values(STRIP_STYLES), 'gradient'),
    shapes: bool(b.shapes, true), noise: num(b.noise, [0, 60], 0),
    image: await loadAsset(b.image),
  }
}

const sanitizeSize = raw => ({ w: side(obj(raw).w), h: side(obj(raw).h) })

async function sanitizeScreen(raw, loadAsset) {
  const s = createScreen()
  const c = obj(raw.content), st = obj(raw.style), d = obj(raw.device), m = obj(raw.media)
  const def = { content: s.content, style: s.style }

  s.content = {
    headline: text(c.headline, 200, def.content.headline),
    accent: text(c.accent, 200, def.content.accent),
    subtitle: text(c.subtitle, 400, def.content.subtitle),
    features: Array.isArray(c.features) ? c.features.filter(f => typeof f === 'string').slice(0, LIMITS.maxFeatures).map(f => f.slice(0, 24)) : def.content.features,
  }
  s.style = {
    theme: oneOf(st.theme, Object.keys(THEMES), def.style.theme),
    device: oneOf(st.device, Object.keys(DEVICES), def.style.device),
    headlineFont: oneOf(st.headlineFont, HEADLINE_FONTS, def.style.headlineFont),
    subtitleFont: oneOf(st.subtitleFont, SUBTITLE_FONTS, def.style.subtitleFont),
    headlineScale: num(st.headlineScale, [0.6, 1.6], 1),
    subtitleScale: num(st.subtitleScale, [0.6, 1.6], 1),
    headlinePos: position(st.headlinePos),
    featureShow: bool(st.featureShow, true),
    featurePos: oneOf(st.featurePos, values(FEATURE_POSITIONS), 'bottom'),
    featureSize: num(st.featureSize, [6, 22], 11),
    badgesShow: bool(st.badgesShow, true),
  }
  s.device = {
    x: nullableNum(d.x, [-1, 2]), y: nullableNum(d.y, [-1, 2]),
    scale: num(d.scale, LIMITS.deviceScale, 1), rotate: num(d.rotate, [-180, 180], 0),
  }
  s.media = { screenshot: await loadAsset(m.screenshot), frame: await loadAsset(m.frame, ['image/png']) }

  for (const [i, item] of (Array.isArray(raw.overlays) ? raw.overlays.slice(0, MAX_OVERLAYS) : []).entries()) {
    const o = obj(item)
    const base = { x: num(o.x, [-1, 2], 0.5), y: num(o.y, [-1, 2], 0.5) }
    if (o.type === 'badge') s.overlays.push({ ...createOverlay('badge', { text: text(o.text, 40, 'Badge'), style: oneOf(o.style, values(BADGE_STYLE_OPTIONS), 'accent') }, i), ...base })
    else if (o.type === 'award') s.overlays.push({ ...createOverlay('award', { title: text(o.title, 30, 'Award'), sub: text(o.sub, 40, ''), style: oneOf(o.style, values(AWARD_STYLE_OPTIONS), 'gold') }, i), ...base })
    else if (o.type === 'popup') {
      const src = await loadAsset(o.src)
      if (src) s.overlays.push({ ...createOverlay('popup', { src, w: num(o.w, LIMITS.popupWidth, 0.4), rotate: num(o.rotate, [-180, 180], 0) }, i), ...base })
    }
  }
  return s
}

/** Reads a project zip and returns validated data ready for `store.load`, plus a count of unrestorable images. */
export async function restoreProject(file) {
  if (file.size > MAX_FILE_BYTES) throw new Error('This file is too large to be a project')
  let zip
  try { zip = await vendor('JSZip').loadAsync(file) } catch { throw new Error('This is not a valid project file') }

  const entry = zip.file('project.json')
  if (!entry) throw new Error('This is not a project file (project.json is missing)')
  let data
  try { data = obj(JSON.parse(await entry.async('string'))) } catch { throw new Error('The project data is corrupted') }
  if (data.app !== PROJECT_APP) throw new Error('This file was not created by this app')
  if (!Number.isInteger(data.version) || data.version < 1) throw new Error('The project data is corrupted')
  if (data.version > PROJECT_VERSION) throw new Error('This project was saved by a newer version of the app')
  if (!Array.isArray(data.screens) || !data.screens.length) throw new Error('The project contains no screens')

  let missing = 0
  const loadAsset = async (ref, types) => {
    if (ref == null) return null
    const blob = typeof ref === 'string' && ref.startsWith('assets/') ? await zip.file(ref)?.async('blob') : null
    const type = MIME[String(ref).split('.').pop().toLowerCase()]
    try {
      if (!blob || !type) throw new Error()
      return await readImage(new File([blob], ref, { type }), types)
    } catch {
      missing++
      return null
    }
  }

  // Version 1 stored background and canvas size per screen; those settings are global now, so take the first screen's.
  const legacy = obj(data.screens[0])
  const bg = await sanitizeBg(data.bg ?? legacy.bg, loadAsset)
  const size = sanitizeSize(data.size ?? legacy.size)

  const screens = []
  for (const raw of data.screens.slice(0, PLAY_STORE.maxScreens)) screens.push(await sanitizeScreen(obj(raw), loadAsset))
  return {
    screens, bg, size, missing,
    current: Number.isInteger(data.current) ? clamp(data.current, 0, screens.length - 1) : 0,
    assetType: oneOf(data.assetType, Object.keys(ASSET_TYPES), DEFAULT_ASSET),
    watermark: { show: bool(obj(data.watermark).show, WATERMARK_DEFAULTS.show), text: text(obj(data.watermark).text, 60, WATERMARK_DEFAULTS.text) },
  }
}
