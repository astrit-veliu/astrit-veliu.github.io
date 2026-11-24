import { ASSET_TYPES } from '../config/assetTypes.js'
import { h } from '../lib/dom.js'
import { outputSize } from '../lib/geometry.js'
import { store } from '../state/store.js'

export function mountToolbar(host) {
  const title = h('span', { class: 'toolbar-count' })
  const note = h('span', { class: 'toolbar-note' })
  const badge = h('span', { class: 'size-badge' })
  host.append(h('strong', { class: 'toolbar-title' }, 'Live Preview'), title, note, badge)

  const sync = () => {
    const { w, h: height } = outputSize(store.screen(), store.state.assetType)
    title.textContent = `Screen ${store.index + 1} of ${store.state.screens.length}`
    note.textContent = ASSET_TYPES[store.state.assetType].note
    badge.textContent = `${w} × ${height} px`
  }
  store.subscribe(e => { if (!e.live) sync() })
  sync()
}
