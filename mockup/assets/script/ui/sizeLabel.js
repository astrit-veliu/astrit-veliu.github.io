import { outputSize } from '../lib/geometry.js'
import { store } from '../state/store.js'

/** Floating "W × H px" label over the canvas. */
export function mountSizeLabel(el) {
  const sync = () => {
    const { w, h } = outputSize(store.project())
    el.textContent = `${w} × ${h} px`
  }
  store.subscribe(e => { if (!e.live) sync() })
  sync()
}
