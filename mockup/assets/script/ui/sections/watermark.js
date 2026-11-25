import { TextInput, Toggle } from '../fields.js'
import { Hint, Section } from '../primitives.js'

export const WatermarkSection = () => Section('Watermark',
  Toggle({ path: 'app.watermark.show', label: 'Show on all screens' }),
  TextInput({ path: 'app.watermark.text', label: 'Watermark text', placeholder: 'Watermark text' }),
  Hint('Applies to every screen and every exported image.'))
