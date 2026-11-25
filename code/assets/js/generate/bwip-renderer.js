import { loadScript } from '../core/loader.js'

const LIB = 'https://cdn.jsdelivr.net/npm/bwip-js@4.3.0/dist/bwip-js-min.js'
const MIN_SCALE = 2
const PROBE_HEIGHT = 10
const MIN_BAR_HEIGHT = 6
const LINEAR_ASPECT = 0.28

const draw = options => {
  const canvas = document.createElement('canvas')
  bwipjs.toCanvas(canvas, { includetext: false, ...options })
  return canvas
}

export async function renderBwip({ id, text, size, color, quiet, linear }) {
  await loadScript(LIB)
  const base = { bcid: id, text, barcolor: color.slice(1) }
  const probe = draw({ ...base, scale: 1, ...(linear && { height: PROBE_HEIGHT }) })

  const height = linear
    ? { height: Math.max(MIN_BAR_HEIGHT, (PROBE_HEIGHT * probe.width * LINEAR_ASPECT) / probe.height) }
    : {}
  const scale = Math.max(MIN_SCALE, Math.floor(size / (Math.max(probe.width, probe.height) + quiet * 2)))
  const symbol = draw({ ...base, ...height, scale })

  const margin = quiet * scale
  const canvas = Object.assign(document.createElement('canvas'), {
    width: symbol.width + margin * 2,
    height: symbol.height + margin * 2,
  })
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(symbol, margin, margin)
  return canvas
}
