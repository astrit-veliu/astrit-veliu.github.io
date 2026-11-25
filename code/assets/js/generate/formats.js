export const FORMATS = {
  qrcode: { label: 'QR Code', hint: 'Any text or URL. Unicode is supported.', renderer: 'qr' },
  datamatrix: { label: 'Data Matrix', hint: 'Any text. Compact, suited to small labels.', quiet: 2 },
  azteccode: { label: 'Aztec Code', hint: 'Any text. Common on tickets.', quiet: 2 },
  pdf417: { label: 'PDF417', hint: 'Text or data. Wide stacked format.', quiet: 2 },
  maxicode: { label: 'MaxiCode', hint: 'Generation only. Browsers cannot decode MaxiCode.', quiet: 2 },
  code128: {
    label: 'Code 128', hint: 'ASCII text only.', linear: true, quiet: 10,
    pattern: /^[\x00-\x7f]+$/, error: 'Code 128 accepts ASCII characters only.',
  },
  code39: {
    label: 'Code 39', hint: 'Uppercase letters, digits and - . $ / + % space.', linear: true, quiet: 10,
    pattern: /^[0-9A-Z\-. $/+%]+$/, error: 'Code 39 accepts uppercase letters, digits and - . $ / + % space.',
  },
  ean13: {
    label: 'EAN-13', hint: '12 digits. The check digit is added for you.', linear: true, quiet: 10,
    pattern: /^\d{12,13}$/, error: 'EAN-13 needs 12 digits, or 13 with a valid check digit.',
  },
  upca: {
    label: 'UPC-A', hint: '11 digits. The check digit is added for you.', linear: true, quiet: 10,
    pattern: /^\d{11,12}$/, error: 'UPC-A needs 11 digits, or 12 with a valid check digit.',
  },
}

export const QR_STYLES = {
  square: { label: 'Square', inset: 0, radius: 0 },
  rounded: { label: 'Rounded', inset: 0.04, radius: 0.3 },
  dots: { label: 'Dots', inset: 0.12, radius: 0.5 },
  circle: { label: 'Circle', inset: 0, radius: 0.5 },
}

export const SIZES = [
  { value: 180, label: 'Small, 180 px' },
  { value: 260, label: 'Medium, 260 px' },
  { value: 380, label: 'Large, 380 px' },
]

export const DEFAULT_SIZE = 260
const MIN_CONTRAST = 3

function contrastAgainstWhite(hex) {
  const [r, g, b] = [1, 3, 5]
    .map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05)
}

export function validate(formatId, text, color) {
  const { pattern, error } = FORMATS[formatId]
  if (pattern && !pattern.test(text)) return error
  if (contrastAgainstWhite(color) < MIN_CONTRAST) return 'The code color is too light to scan. Choose a darker color.'
  return null
}
