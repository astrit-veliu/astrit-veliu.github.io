import { h } from '../lib/dom.js'
import { BackgroundSection } from './sections/background.js'
import { CanvasSections } from './sections/canvas.js'
import { DeviceTransformSection } from './sections/deviceTransform.js'
import { ExportSection } from './sections/export.js'
import { FeaturesSections } from './sections/features.js'
import { GuideSection } from './sections/guide.js'
import { MediaSections } from './sections/media.js'
import { OverlaysSections } from './sections/overlays.js'
import { ScreensSection } from './sections/screens.js'
import { TextSection } from './sections/text.js'
import { FrameSection, ThemeSection, TypographySections } from './sections/appearance.js'

export function mountPanels() {
  document.getElementById('panelLeft').append(h('div', { class: 'panel-body panel-columns' },
    ScreensSection(), FrameSection(), ThemeSection(), TypographySections(),
    MediaSections(), TextSection(), OverlaysSections(), DeviceTransformSection(), FeaturesSections()))

  document.getElementById('panelRight').append(h('div', { class: 'panel-body' },
    ExportSection(), CanvasSections(), BackgroundSection(), GuideSection()))
}
