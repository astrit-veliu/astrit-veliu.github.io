import { LIMITS } from '../config/defaults.js'

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']

/** Validates an uploaded file and returns an object URL (cheap to re-render, unlike base64). */
export async function readImage(file, types = IMAGE_TYPES) {
  if (!types.includes(file.type)) throw new Error(`Unsupported file type. Use ${types.map(t => t.split('/')[1].replace('svg+xml', 'svg')).join(', ')}.`)
  if (file.size > LIMITS.maxUploadBytes) throw new Error('Image is larger than 15 MB')
  const url = URL.createObjectURL(file)
  try {
    const probe = new Image()
    probe.src = url
    await probe.decode()
    return url
  } catch {
    URL.revokeObjectURL(url)
    throw new Error('This file is not a valid image')
  }
}

export const releaseUrl = url => { if (url?.startsWith('blob:')) URL.revokeObjectURL(url) }
