import { h, icon } from '../../lib/dom.js'
import { createOverlay } from '../../state/screenFactory.js'
import { store } from '../../state/store.js'
import { Toggle } from '../fields.js'
import { Button, Hint, Section } from '../primitives.js'
import { toast } from '../toast.js'

const options = list => list.map(([value, label]) => h('option', { value }, label))

function OverlayList() {
  const root = h('div', { class: 'overlay-list' })
  let signature = ''
  const labelOf = o => (o.type === 'badge' ? o.text : o.type === 'award' ? o.title : 'Popup image')
  const iconOf = { badge: 'tag', award: 'trophy', popup: 'image' }

  const sync = () => {
    const { overlays } = store.screen()
    const next = `${store.state.currentId}|${store.state.selectedOverlayId}|${overlays.map(o => o.id + labelOf(o)).join()}`
    if (next === signature) return
    signature = next
    root.replaceChildren(...(overlays.length ? overlays.map(o => h('div', {
      class: 'overlay-item', 'aria-current': o.id === store.state.selectedOverlayId, tabindex: 0,
      onclick: () => store.selectOverlay(o.id),
      onkeydown: e => { if (e.key === 'Enter') store.selectOverlay(o.id) },
    }, icon(iconOf[o.type]), h('span', { class: 'overlay-label' }, labelOf(o)),
    h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Remove overlay', onclick: e => { e.stopPropagation(); store.removeOverlay(o.id) } }, icon('trash')))) : [h('p', { class: 'muted' }, 'No overlays yet')]))
  }
  store.subscribe(sync)
  sync()
  return root
}

export function OverlaysSections() {
  const badgeText = h('input', { class: 'input', placeholder: 'e.g. Fast & Secure', 'aria-label': 'Badge text', maxlength: 40 })
  const badgeStyle = h('select', { class: 'input', 'aria-label': 'Badge style' }, options([['accent', 'Filled'], ['outline', 'Outline'], ['dark', 'Glass'], ['white', 'White']]))
  const awardTitle = h('input', { class: 'input', placeholder: 'Title', 'aria-label': 'Award title', maxlength: 30 })
  const awardSub = h('input', { class: 'input', placeholder: 'e.g. Google Play 2025', 'aria-label': 'Award subtitle', maxlength: 40 })
  const awardStyle = h('select', { class: 'input', 'aria-label': 'Award style' }, options([['gold', 'Gold'], ['accent', 'Accent'], ['dark', 'Glass']]))
  const slot = () => store.screen().overlays.length

  const addBadge = () => {
    const text = badgeText.value.trim()
    if (!text) return toast('Enter badge text first')
    store.addOverlay(createOverlay('badge', { text, style: badgeStyle.value }, slot()))
    badgeText.value = ''
  }
  const addAward = () => {
    const title = awardTitle.value.trim()
    if (!title) return toast('Enter award title first')
    store.addOverlay(createOverlay('award', { title, sub: awardSub.value.trim(), style: awardStyle.value }, slot()))
    awardTitle.value = awardSub.value = ''
  }

  return [
    Section('Badge', badgeText, h('div', { class: 'inline' }, badgeStyle, Button({ icon: 'plus', 'aria-label': 'Add badge', onClick: addBadge })), Toggle({ path: 'style.badgesShow', label: 'Show badges' })),
    Section('Award', awardTitle, awardSub, h('div', { class: 'inline' }, awardStyle, Button({ icon: 'trophy', 'aria-label': 'Add award', onClick: addAward })),
      Hint('Click an overlay to select · Delete removes · Arrow keys nudge'), OverlayList()),
  ]
}
