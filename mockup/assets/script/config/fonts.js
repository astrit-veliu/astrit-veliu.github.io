const STACKS = {
  Montserrat:    "'Montserrat', sans-serif",
  Poppins:       "'Poppins', sans-serif",
  Georgia:       'Georgia, serif',
  Impact:        'Impact, sans-serif',
  'Arial Black': "'Arial Black', sans-serif",
  Arial:         'Arial, sans-serif',
}

export const HEADLINE_FONTS = ['Montserrat', 'Poppins', 'Georgia', 'Impact', 'Arial Black']
export const SUBTITLE_FONTS = ['Poppins', 'Montserrat', 'Georgia', 'Arial']
export const fontStack = name => STACKS[name] ?? 'sans-serif'
