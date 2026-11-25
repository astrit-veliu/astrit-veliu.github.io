import { FEATURE_POSITIONS } from '../../config/options.js'
import { LIMITS } from '../../config/defaults.js'
import { h, icon } from '../../lib/dom.js'
import { store } from '../../state/store.js'
import { Select, Slider, Toggle, watch } from '../fields.js'
import { Button, Section } from '../primitives.js'

function FeatureItems() {
  const list = h('div', { class: 'feature-list' })
  const add = Button({ label: 'Add', icon: 'plus', onClick: () => store.mutate(s => s.content.features.push('New Feature')) })
  let key = ''

  watch(() => {
    const { id, content } = store.screen()
    const next = `${id}:${content.features.length}`
    if (next === key) return
    key = next
    list.replaceChildren(...content.features.map((text, i) => h('div', { class: 'feature-row' },
      h('input', { class: 'input', value: text, maxlength: 24, 'aria-label': `Feature ${i + 1}`, oninput: e => store.mutate(s => { s.content.features[i] = e.target.value }) }),
      h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Remove feature ${i + 1}`, onclick: () => store.mutate(s => s.content.features.splice(i, 1)) }, icon('xmark')))))
    add.hidden = content.features.length >= LIMITS.maxFeatures
  })
  return h('div', { class: 'stack' }, list, add)
}

export const FeaturesSections = () => [
  Section('Feature Strip',
    Toggle({ path: 'style.featureShow', label: 'Show' }),
    Select({ path: 'style.featurePos', label: 'Position', options: FEATURE_POSITIONS }),
    Slider({ path: 'style.featureSize', min: 6, max: 22, label: 'Size', icon: 'text-height' }),
    FeatureItems())
]
