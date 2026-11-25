import { PLAY_STORE } from '../config/assetTypes.js'
import { fontStack } from '../config/fonts.js'
import { h } from '../lib/dom.js'
import { download, slug } from '../lib/download.js'
import { outputSize, stageSize } from '../lib/geometry.js'
import { vendor } from '../lib/vendor.js'
import { renderStage } from '../stage/renderStage.js'

const toBlob = canvas => new Promise((resolve, reject) =>
  canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('The browser could not encode the PNG'))), 'image/png'))

/** Renders a screen offscreen at its exact output size, independent of the preview. `project` = { assetType, watermark }. */
export async function renderToCanvas(screen, project) {
  const html2canvas = vendor('html2canvas')
  const out = outputSize(project)
  const { exportScale } = stageSize(out)
  const stage = h('div', { class: 'stage' })
  const host = h('div', { class: 'export-host', 'aria-hidden': 'true' }, stage)
  document.body.append(host)

  try {
    renderStage(stage, screen, project)
    const fonts = [screen.style.headlineFont, screen.style.subtitleFont, 'Montserrat'].flatMap(name => [900, 700, 500].map(w => `${w} 1em ${fontStack(name)}`))
    await Promise.all([...fonts.map(f => document.fonts.load(f).catch(() => {})), ...[...stage.querySelectorAll('img')].map(img => img.decode().catch(() => {}))])
    await document.fonts.ready

    const shot = await html2canvas(stage, { scale: exportScale, backgroundColor: null, useCORS: true, logging: false })
    const canvas = h('canvas', { width: out.w, height: out.h })
    canvas.getContext('2d').drawImage(shot, 0, 0, out.w, out.h)
    return canvas
  } finally {
    host.remove()
  }
}

export async function renderToPng(screen, index, project) {
  const canvas = await renderToCanvas(screen, project)
  const blob = await toBlob(canvas)
  const name = `${project.assetType}-${index + 1}-${slug(screen.content.headline)}-${canvas.width}x${canvas.height}.png`
  return { blob, name, oversize: blob.size > PLAY_STORE.maxFileBytes }
}

export async function exportScreen(screen, index, project) {
  const file = await renderToPng(screen, index, project)
  download(file.blob, file.name)
  return file
}

export async function exportZip(screens, project, onProgress) {
  const zip = new (vendor('JSZip'))()
  let oversize = 0
  for (const [i, screen] of screens.entries()) {
    const file = await renderToPng(screen, i, project)
    zip.file(file.name, file.blob)
    oversize += file.oversize
    onProgress?.((i + 1) / screens.length)
  }
  download(await zip.generateAsync({ type: 'blob', compression: 'STORE' }), `playstore-mockups-${project.assetType}.zip`)
  return { oversize }
}
