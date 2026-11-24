import { BG_DEFAULTS, BLANK_PRESET, DEVICE_DEFAULTS, STYLE_DEFAULTS } from '../config/defaults.js'

let seq = 0
export const uid = prefix => `${prefix}${++seq}`

/** Every screen owns a deep copy of everything, so no state is ever shared between screens. */
export const createScreen = (preset = BLANK_PRESET) => structuredClone({
  id: uid('s'),
  content: preset,
  style: STYLE_DEFAULTS,
  device: DEVICE_DEFAULTS,
  bg: BG_DEFAULTS,
  media: { screenshot: null, frame: null },
  overlays: [],
  size: { w: null, h: null },
})

/** Overlay positions are the element centre as fractions of the stage. `slot` staggers new items. */
export const createOverlay = (type, props, slot = 0) => ({ id: uid('o'), type, x: 0.5, y: 0.3 + (slot % 5) * 0.08, ...props })
