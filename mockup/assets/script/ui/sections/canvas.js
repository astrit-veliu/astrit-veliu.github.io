import { ASSET_TYPES } from '../../config/assetTypes.js'
import { SIZE_DEFAULTS } from '../../config/defaults.js'
import { h } from '../../lib/dom.js'
import { store } from '../../state/store.js'
import { Choice, NumberInput, watch } from '../fields.js'
import { Button, Field, Hint, Section } from '../primitives.js'
import { toast } from '../toast.js'

const resizable = () => ASSET_TYPES[store.state.assetType].resizable

/** Describes what the selected asset type draws (the layout differs per type). */
function AssetNote() {
  const text = h('span', {})
  watch(() => { text.textContent = ASSET_TYPES[store.state.assetType].note })
  return h('p', { class: 'hint' }, h('i', { class: 'fa-solid fa-circle-info', 'aria-hidden': 'true' }), text)
}

export const CanvasSections = () => [
  Section('Custom Canvas Size',
    Field('Width px', NumberInput({ path: 'app.size.w', label: 'Width', placeholder: 'default', enabled: resizable })),
    Field('Height px', NumberInput({ path: 'app.size.h', label: 'Height', placeholder: 'default', enabled: resizable })),
    Button({ label: 'Reset to default size', icon: 'arrows-rotate', onClick: () => { store.set('app.size', { ...SIZE_DEFAULTS }); toast('Size reset to default') } }),
    Hint('Applies to all screens. Fixed-size asset types ignore it.')),
  Section('Asset Type',
    Choice({
      path: 'app.assetType', label: 'Asset type', variant: 'row',
      items: Object.entries(ASSET_TYPES).map(([value, a]) => ({ value, label: a.label, icon: a.icon, hint: `${a.w}×${a.h}` })),
    }),
    AssetNote()),
]
