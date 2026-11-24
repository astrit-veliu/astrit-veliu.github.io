import { h } from '../lib/dom.js'
import { debounce, observeSize } from '../lib/timing.js'
import { renderStage } from '../stage/renderStage.js'
import { store } from '../state/store.js'

/** Thumbnails are real, scaled-down renders of each screen, so they can never drift from the preview. */
export function mountCarousel(host) {
  const track = h('div', { class: 'carousel-track', role: 'tablist', 'aria-label': 'Screens' })
  host.append(track)
  const thumbs = new Map()
  const dirty = new Set()
  const flush = debounce(() => { dirty.forEach(id => thumbs.get(id)?.draw()); dirty.clear() }, 150)

  function createThumb(id) {
    const stage = h('div', { class: 'stage' })
    const frame = h('div', { class: 'thumb-frame' }, stage)
    const label = h('span', { class: 'thumb-label' })
    const button = h('button', { type: 'button', class: 'thumb', role: 'tab', onclick: () => store.select(id) }, frame, label)
    let size = null
    const fit = () => { if (size && frame.clientWidth) stage.style.transform = `scale(${frame.clientWidth / size.width})` }
    observeSize(frame, fit)
    return {
      button, label,
      draw() {
        const screen = store.screen(id)
        if (!screen) return
        size = renderStage(stage, screen, { assetType: store.state.assetType })
        frame.style.setProperty('--ar', `${size.width} / ${size.height}`)
        fit()
      },
    }
  }

  function sync() {
    const { screens, currentId } = store.state
    for (const id of thumbs.keys()) if (!screens.some(s => s.id === id)) thumbs.delete(id)
    track.replaceChildren(...screens.map((s, i) => {
      if (!thumbs.has(s.id)) { const t = createThumb(s.id); thumbs.set(s.id, t); t.draw() }
      const t = thumbs.get(s.id)
      t.label.textContent = `Screen ${i + 1}`
      t.button.setAttribute('aria-selected', String(s.id === currentId))
      return t.button
    }))
    thumbs.get(currentId)?.button.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }

  store.subscribe(e => {
    if (e.type === 'structure') sync()
    else if (e.type === 'app') { store.state.screens.forEach(s => dirty.add(s.id)); flush() }
    else if (e.type === 'screen' && !e.live) { dirty.add(e.screenId); flush() }
  })
  sync()
}
