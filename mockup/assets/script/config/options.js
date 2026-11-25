export const BG_TYPES = [
  { value: 'gradient', label: 'Gradient' }, { value: 'solid', label: 'Solid color' },
  { value: 'mesh', label: 'Mesh glow' },    { value: 'image', label: 'Custom image' },
]
export const STRIP_STYLES = [
  { value: 'gradient', label: 'Gradient' }, { value: 'solid', label: 'Solid accent' },
  { value: 'white', label: 'White' },       { value: 'none', label: 'None' },
]
export const FEATURE_POSITIONS = [{ value: 'bottom', label: 'Bottom' }, { value: 'top', label: 'Top' }, { value: 'center', label: 'Center' }]
export const BADGE_STYLE_OPTIONS = [{ value: 'accent', label: 'Filled' }, { value: 'outline', label: 'Outline' }, { value: 'dark', label: 'Glass' }, { value: 'white', label: 'White' }]
export const AWARD_STYLE_OPTIONS = [{ value: 'gold', label: 'Gold' }, { value: 'accent', label: 'Accent' }, { value: 'dark', label: 'Glass' }]

export const values = options => options.map(o => o.value)
