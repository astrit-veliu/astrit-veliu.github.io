import { vendor } from '../lib/vendor.js'

export const PROJECT_APP = 'playstore-mockup-generator'
export const PROJECT_VERSION = 2

const EXTENSIONS = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' }

/**
 * Packs the project into a zip: `project.json` (all settings) + `assets/*` (the original uploaded images,
 * stored as-is). Image URLs in the JSON are replaced by their path inside the zip, so the file is portable.
 */
export async function serializeProject(state) {
  const zip = new (vendor('JSZip'))()
  const packed = new Map()

  const pack = async url => {
    if (!url) return null
    if (!packed.has(url)) {
      const blob = await (await fetch(url)).blob()
      const name = `assets/${packed.size + 1}.${EXTENSIONS[blob.type] ?? 'png'}`
      zip.file(name, blob, { compression: 'STORE' })
      packed.set(url, name)
    }
    return packed.get(url)
  }

  const bg = { ...state.bg, image: await pack(state.bg.image) }

  const screens = []
  for (const source of state.screens) {
    const screen = structuredClone(source)
    delete screen.id
    screen.media.screenshot = await pack(source.media.screenshot)
    screen.media.frame = await pack(source.media.frame)
    for (const overlay of screen.overlays) {
      delete overlay.id
      if (overlay.src) overlay.src = await pack(overlay.src)
    }
    screens.push(screen)
  }

  const index = state.screens.findIndex(s => s.id === state.currentId)
  zip.file('project.json', JSON.stringify({
    app: PROJECT_APP, version: PROJECT_VERSION, savedAt: new Date().toISOString(),
    assetType: state.assetType, watermark: state.watermark, bg, size: state.size, current: index, screens,
  }, null, 2))

  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
}
