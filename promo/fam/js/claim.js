import './components.js'
import { promo } from './config.js'
import { bindContent } from './dom.js'
import { requestCode } from './api.js'
import { readClaim, saveClaim, stashPending, hasVisitedStore, markStoreVisited } from './storage.js'

const copy = promo.copy.claim

const storeStep = document.getElementById('storeStep')
const claimBtn = document.getElementById('claimBtn')
const claimLabel = document.getElementById('claimLabel')
const status = document.getElementById('status')

function setStatus(message = '', kind = '') {
  status.textContent = message
  status.className = `status ${kind}`.trim()
}

function unlockClaim() {
  claimBtn.hidden = false
  claimBtn.classList.add('reveal')
  storeStep.classList.add('done')
  setStatus()
}

async function claim() {
  claimBtn.disabled = true
  claimLabel.textContent = copy.loading
  setStatus()

  try {
    const data = await requestCode()

    if (data.status === 'ok' && data.code) {
      const result = {
        code: data.code,
        redeemed_at: data.redeemed_at || new Date().toISOString()
      }
      saveClaim(result)
      stashPending(result)
      location.replace(promo.pages.code)
      return
    }

    setStatus(data.status === 'empty' ? copy.empty : data.message || copy.generic, 'error')
  } catch (error) {
    setStatus(error.name === 'AbortError' ? copy.timeout : copy.network, 'error')
  }

  claimBtn.disabled = false
  claimLabel.textContent = copy.cta
}

if (readClaim()) {
  location.replace(promo.pages.code)
} else {
  bindContent()
  claimLabel.textContent = copy.cta

  storeStep.addEventListener('click', () => {
    markStoreVisited()
    unlockClaim()
  })
  claimBtn.addEventListener('click', claim)

  if (hasVisitedStore()) unlockClaim()
  else setStatus(copy.hint)
}
