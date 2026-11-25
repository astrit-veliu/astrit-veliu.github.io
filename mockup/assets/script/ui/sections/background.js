import { BG_TYPES, STRIP_STYLES } from '../../config/options.js'
import { THEMES } from '../../config/themes.js'
import { readImage } from '../../lib/images.js'
import { store } from '../../state/store.js'
import { ColorInput, Select, Slider, Toggle } from '../fields.js'
import { Field, Hint, MediaPreview, Section, Upload } from '../primitives.js'
import { toast } from '../toast.js'

const theme = () => THEMES[store.screen().style.theme]

export const BackgroundSection = () => Section('Background',
  Toggle({ path: 'app.bg.strip', label: 'Top strip' }),
  Field('Strip style', Select({ path: 'app.bg.stripStyle', label: 'Strip style', options: STRIP_STYLES })),
  Field('Background type', Select({ path: 'app.bg.type', label: 'Background type', options: BG_TYPES })),
  Field('Color 1', ColorInput({ path: 'app.bg.col1', label: 'Color 1', fallback: () => theme().bg })),
  Field('Color 2', ColorInput({ path: 'app.bg.col2', label: 'Color 2', fallback: () => theme().bg2 })),
  Toggle({ path: 'app.bg.shapes', label: 'Shapes' }),
  Field('Noise overlay %', Slider({ path: 'app.bg.noise', min: 0, max: 60, label: 'Noise overlay %' })),
  Upload({
    label: 'Upload custom background', icon: 'image', accept: 'image/*',
    onFile: async file => {
      try { store.setAsset('app.bg.image', await readImage(file)); store.set('app.bg.type', 'image') } catch (error) { toast(error.message) }
    },
  }),
  MediaPreview({ path: 'app.bg.image', label: 'Background preview', onRemove: () => store.setAsset('app.bg.image', null) }),
  Hint('Applies to all screens. Colors you have not changed follow each screen’s theme.'))
