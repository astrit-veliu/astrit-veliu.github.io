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
    refs.set(url, 1)
    return url
  } catch {
    URL.revokeObjectURL(url)
    throw new Error('This file is not a valid image')
  }
}

/** Object URLs are reference counted: duplicated screens share them, and the last release frees them. */
const refs = new Map()

export function retainUrl(url) {
  if (refs.has(url)) refs.set(url, refs.get(url) + 1)
  return url
}

export function releaseUrl(url) {
  const count = refs.get(url)
  if (count === undefined) return
  if (count > 1) return void refs.set(url, count - 1)
  refs.delete(url)
  URL.revokeObjectURL(url)
}
