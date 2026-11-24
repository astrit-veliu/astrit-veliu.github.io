import { TextInput } from '../fields.js'
import { Field, Section } from '../primitives.js'

export const TextSection = () => Section('Text',
  Field('Headline', TextInput({ path: 'content.headline', label: 'Headline' })),
  Field('Accent line', TextInput({ path: 'content.accent', label: 'Accent line', className: 'accent-text' })),
  Field('Subtitle', TextInput({ path: 'content.subtitle', label: 'Subtitle', multiline: true })))
