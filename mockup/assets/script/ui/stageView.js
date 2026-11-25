import { PREVIEW } from '../config/defaults.js'
import { attachStagePointer } from '../interactions/stagePointer.js'
import { h, px } from '../lib/dom.js'
import { fitScale } from '../lib/geometry.js'
import { observeSize, rafOnce } from '../lib/timing.js'
import { renderStage } from '../stage/renderStage.js'
import { store } from '../state/store.js'

/** Live preview: renders the current screen and scales it to whatever space the layout gives it. */
export function mountStageView(host) {
  const stage = h('div', { class: 'stage' })
  const frame = h('div', { class: 'stage-frame' }, stage)
  host.append(frame)
  let size = { width: 1, height: 1 }
  let scale = 1

  const fit = () => {
    const cs = getComputedStyle(host)
    const box = {
      width: host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
      height: host.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
    }
    if (box.width <= 0 || box.height <= 0) return
    scale = fitScale(box, size, PREVIEW.maxScale)
    frame.style.width = px(size.width * scale)
    frame.style.height = px(size.height * scale)
    stage.style.transform = `scale(${scale})`
    stage.style.setProperty('--stage-k', scale)
  }

  const render = rafOnce(() => {
    const next = renderStage(stage, store.screen(), { ...store.project(), interactive: true, selectedId: store.state.selectedOverlayId })
    if (next.width !== size.width || next.height !== size.height) { size = next; fit() }
  })

  store.subscribe(render)
  observeSize(host, fit)
  attachStagePointer(frame, { stage, getScale: () => scale, getSize: () => size })
  render()
}
