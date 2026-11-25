import { ASSET_TYPES } from '../config/assetTypes.js'
import { THEMES } from '../config/themes.js'
import { outputSize, stageSize } from '../lib/geometry.js'
import { backgroundLayers } from './layers/background.js'
import { overlayLayers } from './layers/overlays.js'
import { watermarkLayer } from './layers/watermark.js'
import { LAYOUTS } from './layouts.js'

/**
 * Draws one screen into `root` in logical units. The single source of truth for the live preview,
 * the thumbnails and the exported PNG. `project` carries the global settings
 * ({ assetType, watermark, bg, size }) plus optional { interactive, selectedId }.
 * Returns the logical size so callers can fit it.
 */
export function renderStage(root, screen, { interactive = false, selectedId = null, ...project }) {
  const asset = ASSET_TYPES[project.assetType]
  const { width, height } = stageSize(outputSize(project))
  const ctx = { screen, theme: THEMES[screen.style.theme], asset, watermark: project.watermark, bg: project.bg, width, height, interactive, selectedId }

  root.style.width = `${width}px`
  root.style.height = `${height}px`
  root.replaceChildren(
    ...[...backgroundLayers(ctx), ...LAYOUTS[asset.layout](ctx), ...overlayLayers(ctx), watermarkLayer(ctx)].filter(Boolean),
  )
  return { width, height }
}
