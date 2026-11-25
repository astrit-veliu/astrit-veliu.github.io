import { loadScript } from '../core/loader.js'

const JSQR = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
const ZXING = 'https://cdn.jsdelivr.net/npm/@zxing/library@0.19.1/umd/index.min.js'
const MAX_SIDES = [1600, 800]
const ZXING_FORMATS = [
  'QR_CODE', 'DATA_MATRIX', 'AZTEC', 'PDF_417', 'CODE_128', 'CODE_39', 'CODE_93',
  'EAN_13', 'EAN_8', 'UPC_A', 'UPC_E', 'ITF', 'CODABAR',
]

function fit(bitmap, maxSide) {
  const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * ratio))
  canvas.height = Math.max(1, Math.round(bitmap.height * ratio))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas
}

function viaJsQr(canvas) {
  const { data, width, height } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
  const result = jsQR(data, width, height, { inversionAttempts: 'attemptBoth' })
  return result && { format: 'QR CODE', text: result.data }
}

function viaZxing(canvas) {
  const { DecodeHintType, BarcodeFormat, MultiFormatReader, HTMLCanvasElementLuminanceSource, InvertedLuminanceSource, BinaryBitmap, HybridBinarizer } = ZXing
  const hints = new Map([
    [DecodeHintType.POSSIBLE_FORMATS, ZXING_FORMATS.map(name => BarcodeFormat[name])],
    [DecodeHintType.TRY_HARDER, true],
  ])
  for (const invert of [false, true]) {
    try {
      const reader = new MultiFormatReader()
      reader.setHints(hints)
      const base = new HTMLCanvasElementLuminanceSource(canvas)
      const source = invert ? new InvertedLuminanceSource(base) : base
      const result = reader.decode(new BinaryBitmap(new HybridBinarizer(source)))
      return { format: BarcodeFormat[result.getBarcodeFormat()].replace(/_/g, ' '), text: result.getText() }
    } catch { /* not found in this pass */ }
  }
  return null
}

export async function decodeImage(file) {
  await Promise.all([loadScript(JSQR), loadScript(ZXING)])
  const bitmap = await createImageBitmap(file)
  for (const side of MAX_SIDES) {
    const canvas = fit(bitmap, side)
    const hit = viaJsQr(canvas) ?? viaZxing(canvas)
    if (hit) return hit
  }
  return null
}
