import { BG_TYPES, STRIP_STYLES } from '../../config/options.js'
import { THEMES } from '../../config/themes.js'
import { readImage } from '../../lib/images.js'
import { store } from '../../state/store.js'
import { ColorInput, Select, Slider, Toggle } from '../fields.js'
import { Field, MediaPreview, Section, Upload } from '../primitives.js'
import { toast } from '../toast.js'

const theme = () => THEMES[store.screen().style.theme]

export const BackgroundSection = () => Section('Background',
  Toggle({ path: 'bg.strip', label: 'Top strip' }),
  Field('Strip style', Select({ path: 'bg.stripStyle', label: 'Strip style', options: STRIP_STYLES })),
  Field('Background type', Select({ path: 'bg.type', label: 'Background type', options: BG_TYPES })),
  Field('Color 1', ColorInput({ path: 'bg.col1', label: 'Color 1', fallback: () => theme().bg })),
  Field('Color 2', ColorInput({ path: 'bg.col2', label: 'Color 2', fallback: () => theme().bg2 })),
  Toggle({ path: 'bg.shapes', label: 'Shapes' }),
  Field('Noise overlay %', Slider({ path: 'bg.noise', min: 0, max: 60, label: 'Noise overlay %' })),
  Upload({
    label: 'Upload custom background', icon: 'image', accept: 'image/*',
    onFile: async file => {
      try { store.setAsset('bg.image', await readImage(file)); store.set('bg.type', 'image') } catch (error) { toast(error.message) }
    },
  }),
  MediaPreview({ path: 'bg.image', label: 'Background preview', onRemove: () => store.setAsset('bg.image', null) }))
