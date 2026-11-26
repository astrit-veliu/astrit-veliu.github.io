import { attachKeyboard } from './interactions/keyboard.js'
import { initResizers } from './interactions/resizer.js'
import { mountCarousel } from './ui/carousel.js'
import { mountHelp } from './ui/help.js'
import { mountPanels } from './ui/panels.js'
import { mountSizeLabel } from './ui/sizeLabel.js'
import { mountStageView } from './ui/stageView.js'
import { initViewSwitcher } from './ui/viewSwitcher.js'

const $ = id => document.getElementById(id)

mountPanels()
mountHelp()
mountSizeLabel($('sizeBadge'))
mountStageView($('stageView'))
mountCarousel($('carousel'))
initViewSwitcher()
initResizers()
attachKeyboard()
