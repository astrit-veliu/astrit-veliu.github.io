import { promo } from './config.js'

const { cookieName, cookieDays, storeVisitedKey, pendingKey } = promo.storage
const cookiePath = new URL('./', location.href).pathname

const validClaim = (claim) =>
  typeof claim?.code === 'string' && claim.code ? claim : null

export function saveClaim(claim) {
  const expires = new Date(Date.now() + cookieDays * 864e5).toUTCString()
  const secure = location.protocol === 'https:' ? ';Secure' : ''
  const value = encodeURIComponent(JSON.stringify(claim))
  document.cookie = `${cookieName}=${value};expires=${expires};path=${cookiePath};SameSite=Lax${secure}`
}

export function readClaim() {
  const entry = document.cookie.split('; ').find((part) => part.startsWith(`${cookieName}=`))
  if (!entry) return null
  try {
    return validClaim(JSON.parse(decodeURIComponent(entry.slice(cookieName.length + 1))))
  } catch {
    return null
  }
}

export function stashPending(claim) {
  try {
    sessionStorage.setItem(pendingKey, JSON.stringify(claim))
  } catch {
    return
  }
}

export function takePending() {
  try {
    const raw = sessionStorage.getItem(pendingKey)
    sessionStorage.removeItem(pendingKey)
    return raw ? validClaim(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

export function hasVisitedStore() {
  try {
    return sessionStorage.getItem(storeVisitedKey) === '1'
  } catch {
    return false
  }
}

export function markStoreVisited() {
  try {
    sessionStorage.setItem(storeVisitedKey, '1')
  } catch {
    return
  }
}
