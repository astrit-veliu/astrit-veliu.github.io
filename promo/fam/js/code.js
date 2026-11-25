import './components.js'
import { promo } from './config.js'
import { bindContent, fill } from './dom.js'
import { copyText } from './clipboard.js'
import { readClaim, takePending } from './storage.js'

const copy = promo.copy.code
const tagIcons = { fresh: 'fa-circle-check', repeat: 'fa-lock' }

const els = {
  tag: document.getElementById('tag'),
  tagIcon: document.getElementById('tagIcon'),
  tagLabel: document.getElementById('tagLabel'),
  code: document.getElementById('codeBox'),
  date: document.getElementById('claimedDate'),
  copyBtn: document.getElementById('copyBtn'),
  shareBtn: document.getElementById('shareBtn'),
  redeemBtn: document.getElementById('redeemBtn')
}

function formatDate(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function flash(button, label, iconClass) {
  if (button.dataset.busy) return
  const icon = button.querySelector('i')
  const text = button.querySelector('span')
  const original = { icon: icon.className, text: text.textContent }

  button.dataset.busy = 'true'
  button.classList.add('copied')
  icon.className = iconClass
  text.textContent = label

  setTimeout(() => {
    button.classList.remove('copied')
    icon.className = original.icon
    text.textContent = original.text
    delete button.dataset.busy
  }, promo.ui.feedbackMs)
}

function render({ code, redeemed_at: redeemedAt }, state) {
  els.tag.dataset.state = state
  els.tagIcon.className = `fa-solid ${tagIcons[state]}`
  els.tagLabel.textContent = copy.tags[state]
  els.code.textContent = code
  els.date.textContent = fill(copy.claimedOn, { date: formatDate(redeemedAt) })
  els.redeemBtn.href = `${promo.store.redeemUrl}?code=${encodeURIComponent(code)}`
}

function bindActions({ code }) {
  const values = { app: promo.app.name, code }

  els.copyBtn.addEventListener('click', async () => {
    if (await copyText(code)) flash(els.copyBtn, copy.copied, 'fa-solid fa-check')
  })

  els.shareBtn.addEventListener('click', async () => {
    const text = fill(copy.shareText, values)

    if (navigator.share) {
      await navigator.share({
        title: fill(copy.shareTitle, values),
        text,
        url: promo.store.url
      }).catch(() => {})
      return
    }

    if (await copyText(`${text} ${promo.store.url}`)) {
      flash(els.shareBtn, copy.shareCopied, 'fa-solid fa-check')
    }
  })
}

const pending = takePending()
const claim = pending ?? readClaim()

if (!claim) {
  location.replace(promo.pages.claim)
} else {
  bindContent()
  render(claim, pending ? 'fresh' : 'repeat')
  bindActions(claim)
}
