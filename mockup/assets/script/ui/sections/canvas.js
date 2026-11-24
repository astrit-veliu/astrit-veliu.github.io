import { ASSET_TYPES } from '../../config/assetTypes.js'
import { store } from '../../state/store.js'
import { Choice, NumberInput } from '../fields.js'
import { Button, Field, Section } from '../primitives.js'
import { toast } from '../toast.js'

const resizable = () => ASSET_TYPES[store.state.assetType].resizable

export const CanvasSections = () => [
  Section('Custom Canvas Size',
    Field('Width px', NumberInput({ path: 'size.w', label: 'Width', placeholder: 'default', enabled: resizable })),
    Field('Height px', NumberInput({ path: 'size.h', label: 'Height', placeholder: 'default', enabled: resizable })),
    Button({ label: 'Reset to default size', icon: 'arrows-rotate', onClick: () => { store.mutate(s => { s.size.w = s.size.h = null }); toast('Size reset to default') } })),
  Section('Asset Type', Choice({
    path: 'app.assetType', label: 'Asset type', variant: 'row',
    items: Object.entries(ASSET_TYPES).map(([value, a]) => ({ value, label: a.label, icon: a.icon, hint: `${a.w}×${a.h}` })),
  })),
]
