import { DEVICES } from '../../config/devices.js'
import { HEADLINE_FONTS, SUBTITLE_FONTS } from '../../config/fonts.js'
import { THEMES } from '../../config/themes.js'
import { Choice, Select, Slider } from '../fields.js'
import { Field, Section } from '../primitives.js'

export const FrameSection = () => Section('Frame', Choice({
  path: 'style.device', label: 'Device frame',
  items: Object.entries(DEVICES).map(([value, d]) => ({ value, label: d.label, icon: d.icon })),
}))

export const ThemeSection = () => Section('Color Theme', Choice({
  path: 'style.theme', label: 'Color theme', variant: 'dot',
  items: Object.entries(THEMES).map(([value, t]) => ({ value, label: t.label, swatch: t.accent })),
}))

export const TypographySections = () => [
  Section('Typography',
    Field('Headline font', Select({ path: 'style.headlineFont', options: HEADLINE_FONTS, label: 'Headline font' })),
    Field('Subtitle font', Select({ path: 'style.subtitleFont', options: SUBTITLE_FONTS, label: 'Subtitle font' }))),
  Section('Sizes',
    Slider({ path: 'style.headlineScale', min: 60, max: 160, factor: 100, label: 'Headline size %', icon: 'heading' }),
    Slider({ path: 'style.subtitleScale', min: 60, max: 160, factor: 100, label: 'Subtitle size %', icon: 'align-left' })),
]
