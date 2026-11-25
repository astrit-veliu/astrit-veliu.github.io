import { promo } from './config.js'

export async function requestCode() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), promo.api.timeoutMs)
  try {
    const response = await fetch(promo.api.endpoint, { signal: controller.signal })
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}
