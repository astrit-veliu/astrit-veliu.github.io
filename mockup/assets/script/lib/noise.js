let tile

/** Semi-transparent grain tile. Plain alpha instead of blend modes so exports match the preview. */
export function noiseTile() {
  if (tile) return tile
  const size = 128
  const canvas = Object.assign(document.createElement('canvas'), { width: size, height: size })
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(size, size)
  for (let i = 0; i < image.data.length; i += 4) {
    image.data[i] = image.data[i + 1] = image.data[i + 2] = Math.random() * 255
    image.data[i + 3] = Math.random() * 110
  }
  ctx.putImageData(image, 0, 0)
  return (tile = canvas.toDataURL('image/png'))
}
