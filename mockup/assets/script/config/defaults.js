export const LIMITS = {
  maxFeatures: 3,
  deviceScale: [0.3, 2.5],
  popupWidth: [0.1, 1.2],
  maxUploadBytes: 15 * 1024 * 1024,
}

/** Feature-strip font size is expressed relative to a stage this wide. */
export const FEATURE_REF_WIDTH = 300
export const PREVIEW = { maxScale: 2 }

export const STYLE_DEFAULTS = {
  theme: 'teal', device: 'pixel',
  headlineFont: 'Montserrat', subtitleFont: 'Poppins',
  headlineScale: 1, subtitleScale: 1, headlinePos: null,
  featureShow: true, featurePos: 'bottom', featureSize: 11,
  badgesShow: true, watermarkShow: true, watermarkText: 'VELIU LABS',
}

/** null colours follow the active theme. */
export const BG_DEFAULTS = { type: 'gradient', col1: null, col2: null, strip: true, stripStyle: 'gradient', shapes: true, noise: 0, image: null }

/** x/y null = automatic placement; otherwise fractions of the stage. */
export const DEVICE_DEFAULTS = { x: null, y: null, scale: 1, rotate: 0 }

export const PRESETS = [
  { headline: 'YOUR HEADLINE',  accent: 'KEY FEATURE', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', features: ['Feature One', 'Feature Two', 'Feature Three'] },
  { headline: 'ANOTHER SCREEN', accent: 'STAND OUT',   subtitle: 'Sed do eiusmod tempor incididunt ut labore et dolore magna.', features: ['Feature A', 'Feature B', 'Feature C'] },
  { headline: 'SHOW YOUR',      accent: 'BEST SIDE',   subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', features: ['Benefit One', 'Benefit Two', 'Benefit Three'] },
]
export const BLANK_PRESET = PRESETS[0]
