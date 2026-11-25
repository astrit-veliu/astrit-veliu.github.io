const q = encodeURIComponent

export const isHttpUrl = text => {
  try { return ['http:', 'https:'].includes(new URL(text).protocol) } catch { return false }
}

export const TARGETS = [
  { label: 'WhatsApp', href: t => `https://wa.me/?text=${q(t)}` },
  { label: 'Telegram', href: t => `https://t.me/share/url?url=${q(t)}` },
  { label: 'X', href: t => `https://x.com/intent/post?text=${q(t)}` },
  { label: 'Email', href: t => `mailto:?subject=${q('Barcode')}&body=${q(t)}` },
  { label: 'Reddit', href: t => `https://www.reddit.com/submit?${isHttpUrl(t) ? 'url' : 'text'}=${q(t)}` },
  { label: 'LinkedIn', href: t => `https://www.linkedin.com/sharing/share-offsite/?url=${q(t)}`, available: isHttpUrl },
]

const toBlob = canvas => new Promise((resolve, reject) =>
  canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Image export failed'))), 'image/png'))

export async function copyImage(canvas) {
  if (!navigator.clipboard?.write || !window.ClipboardItem) throw new Error('Copying images is not supported in this browser')
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': toBlob(canvas) })])
}

export async function downloadImage(canvas, name) {
  const url = URL.createObjectURL(await toBlob(canvas))
  const link = Object.assign(document.createElement('a'), { href: url, download: name })
  link.click()
  URL.revokeObjectURL(url)
}

export async function shareImage(canvas, name, text) {
  const file = new File([await toBlob(canvas)], name, { type: 'image/png' })
  if (!navigator.canShare?.({ files: [file] })) throw new Error('Sharing images is not supported in this browser')
  try {
    await navigator.share({ files: [file], text })
  } catch (error) {
    if (error.name !== 'AbortError') throw error
  }
}
