export const ASSET_TYPES = {
  phone:    { label: 'Phone',      icon: 'mobile-screen',        w: 1080, h: 1920, layout: 'device', resizable: true,  note: 'Device mockup, headline and feature strip' },
  tab7:     { label: 'Tablet 7"',  icon: 'tablet-screen-button', w: 1080, h: 1920, layout: 'device', resizable: true,  note: 'Device mockup, headline and feature strip' },
  tab10:    { label: 'Tablet 10"', icon: 'tablet',               w: 1200, h: 1920, layout: 'device', resizable: true,  note: 'Device mockup, headline and feature strip' },
  tv:       { label: 'TV Banner',  icon: 'tv',                   w: 1280, h: 720,  layout: 'banner', resizable: false, note: 'Fixed 1280×720 banner: headline and overlays only', tag: { icon: 'tv', text: 'Android TV' } },
  daydream: { label: 'Daydream',   icon: 'vr-cardboard',         w: 4096, h: 4096, layout: 'icon',   resizable: false, note: 'Fixed 4096×4096 icon: uses the screenshot as icon', tag: { icon: 'vr-cardboard', text: 'Daydream 360°' } },
}

export const DEFAULT_ASSET = 'phone'

export const PLAY_STORE = { minSide: 320, maxSide: 3840, maxRatio: 2, maxFileBytes: 8 * 1024 * 1024, minScreens: 2, maxScreens: 8 }

/** Hard technical limits for any canvas the user can request. */
export const CANVAS_LIMITS = { minSide: 64, maxSide: 8192 }

/** Long edge of the logical drawing space; output pixels = logical × exportScale. */
export const LOGICAL_LONG_EDGE = 640
