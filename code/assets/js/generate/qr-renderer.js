import { loadScript } from '../core/loader.js'
import { QR_STYLES } from './formats.js'

const LIB = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js'
const QUIET_MODULES = 4
const FINDER_MODULES = 7
const MIN_MODULE_PX = 3
const ICON_RATIO = 0.2

const encodingMode = text =>
  /^\d+$/.test(text) ? 'Numeric' : /^[0-9A-Z $%*+\-./:]+$/.test(text) ? 'Alphanumeric' : 'Byte'

const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.onerror = () => reject(new Error('The center icon could not be read.'))
  image.src = src
})

export async function renderQr({ text, size, color, style, icon }) {
  await loadScript(LIB)
  qrcode.stringToBytes = value => Array.from(new TextEncoder().encode(value))

  const qr = qrcode(0, icon ? 'H' : 'M')
  qr.addData(text, encodingMode(text))
  qr.make()

  const count = qr.getModuleCount()
  const total = count + QUIET_MODULES * 2
  const module = Math.max(MIN_MODULE_PX, Math.floor(size / total))
  const px = module * total
  const canvas = Object.assign(document.createElement('canvas'), { width: px, height: px })
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, px, px)
  ctx.fillStyle = color

  const { inset, radius } = QR_STYLES[style]
  const isFinder = (row, col) =>
    (row < FINDER_MODULES && (col < FINDER_MODULES || col >= count - FINDER_MODULES)) ||
    (row >= count - FINDER_MODULES && col < FINDER_MODULES)

  ctx.beginPath()
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!qr.isDark(row, col)) continue
      const finder = isFinder(row, col)
      const pad = finder ? 0 : inset * module
      const side = module - pad * 2
      ctx.roundRect((col + QUIET_MODULES) * module + pad, (row + QUIET_MODULES) * module + pad, side, side, finder ? 0 : radius * side)
    }
  }
  ctx.fill()

  if (icon) {
    const image = await loadImage(icon)
    const box = px * ICON_RATIO
    const pad = box * 0.18
    const origin = (px - box) / 2 - pad
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.roundRect(origin, origin, box + pad * 2, box + pad * 2, box * 0.2)
    ctx.fill()
    const fit = Math.min(box / image.width, box / image.height)
    ctx.drawImage(image, (px - image.width * fit) / 2, (px - image.height * fit) / 2, image.width * fit, image.height * fit)
  }
  return canvas
}
