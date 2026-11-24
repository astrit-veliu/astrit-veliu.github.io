import { attachKeyboard } from './interactions/keyboard.js'
import { initResizers } from './interactions/resizer.js'
import { mountCarousel } from './ui/carousel.js'
import { mountPanels } from './ui/panels.js'
import { mountStageView } from './ui/stageView.js'
import { mountToolbar } from './ui/toolbar.js'
import { initViewSwitcher } from './ui/viewSwitcher.js'

const $ = id => document.getElementById(id)

mountPanels()
mountToolbar($('toolbar'))
mountStageView($('stageView'))
mountCarousel($('carousel'))
initViewSwitcher()
initResizers()
attachKeyboard()
