import { h } from '../lib/dom.js'
import { BackgroundSection } from './sections/background.js'
import { CanvasSections } from './sections/canvas.js'
import { DeviceTransformSection } from './sections/deviceTransform.js'
import { ExportSection } from './sections/export.js'
import { FeaturesSections } from './sections/features.js'
import { GuideSection } from './sections/guide.js'
import { CustomFrameSection, PopupSection, ScreenshotSection } from './sections/media.js'
import { OverlaysSections } from './sections/overlays.js'
import { ProjectSection } from './sections/project.js'
import { TextSection } from './sections/text.js'
import { WatermarkSection } from './sections/watermark.js'
import { FrameSection, ThemeSection, TypographySections } from './sections/appearance.js'

/** Left panel = this screen. Right panel = the whole project (applies to every screen). */
export function mountPanels() {
  document.getElementById('panelLeft').append(h('div', { class: 'panel-body panel-columns' },
    ScreenshotSection(), TextSection(), TypographySections(),
    OverlaysSections(), PopupSection(), DeviceTransformSection(), FeaturesSections(),
    FrameSection(), CustomFrameSection(), ThemeSection()))

  document.getElementById('panelRight').append(h('div', { class: 'panel-body' },
    ProjectSection(), ExportSection(), CanvasSections(), WatermarkSection(), BackgroundSection(), GuideSection()))
}
