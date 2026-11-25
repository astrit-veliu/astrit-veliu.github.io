import { PLAY_STORE } from '../config/assetTypes.js'
import { h, icon } from '../lib/dom.js'
import { debounce, observeSize } from '../lib/timing.js'
import { renderStage } from '../stage/renderStage.js'
import { store } from '../state/store.js'
import { closeMenu, openMenu } from './menu.js'
import { toast } from './toast.js'

/**
 * The screen strip under the canvas: real scaled-down renders of every screen (so they can never drift
 * from the preview), an "Add" tile, and a popup menu per screen with Duplicate and Delete.
 */
export function mountCarousel(host) {
  const track = h('div', { class: 'carousel-track', role: 'list', 'aria-label': 'Screens' })
  const add = h('button', { type: 'button', class: 'thumb-add', onclick: () => store.add() || toast(`Maximum ${PLAY_STORE.maxScreens} screens`) },
    icon('plus'), h('span', {}, 'Add'))
  host.append(track)
  const thumbs = new Map()
  const dirty = new Set()
  const flush = debounce(() => { dirty.forEach(id => thumbs.get(id)?.draw()); dirty.clear() }, 150)

  const menuItems = id => {
    const count = store.state.screens.length
    return [
      { label: 'Duplicate', icon: 'copy', disabled: count >= PLAY_STORE.maxScreens, title: count >= PLAY_STORE.maxScreens ? `Maximum ${PLAY_STORE.maxScreens} screens` : undefined,
        onSelect: () => { store.duplicate(id); toast('Screen duplicated') } },
      { label: 'Delete', icon: 'trash-can', danger: true, disabled: count <= 1, title: count <= 1 ? 'At least one screen is required' : undefined,
        onSelect: () => { store.remove(id); toast('Screen deleted') } },
    ]
  }

  function createThumb(id) {
    const stage = h('div', { class: 'stage' })
    const frame = h('div', { class: 'thumb-frame' }, stage)
    const label = h('span', { class: 'thumb-label' })
    const select = h('button', { type: 'button', class: 'thumb-select', onclick: () => store.select(id) }, frame, label)
    const menu = h('button', { type: 'button', class: 'thumb-menu', 'aria-haspopup': 'menu', 'aria-expanded': 'false', onclick: () => openMenu(menu, menuItems(id)) }, icon('ellipsis'))
    const root = h('div', { class: 'thumb', role: 'listitem' }, select, menu)
    let size = null
    const fit = () => { if (size && frame.clientWidth) stage.style.transform = `scale(${frame.clientWidth / size.width})` }
    observeSize(frame, fit)
    return {
      root, select, label, menu,
      draw() {
        const screen = store.screen(id)
        if (!screen) return
        size = renderStage(stage, screen, store.project())
        frame.style.setProperty('--ar', `${size.width} / ${size.height}`)
        fit()
      },
    }
  }

  function sync() {
    const { screens, currentId } = store.state
    for (const id of thumbs.keys()) if (!screens.some(s => s.id === id)) thumbs.delete(id)
    closeMenu()
    track.replaceChildren(...screens.map((s, i) => {
      if (!thumbs.has(s.id)) { const t = createThumb(s.id); thumbs.set(s.id, t); t.draw() }
      const t = thumbs.get(s.id)
      t.label.textContent = `Screen ${i + 1}`
      t.select.setAttribute('aria-current', String(s.id === currentId))
      t.select.setAttribute('aria-label', `Screen ${i + 1}`)
      t.menu.setAttribute('aria-label', `Options for screen ${i + 1}`)
      t.root.classList.toggle('is-active', s.id === currentId)
      return t.root
    }), add)
    add.disabled = screens.length >= PLAY_STORE.maxScreens
    add.title = add.disabled ? `Maximum ${PLAY_STORE.maxScreens} screens` : 'Add a screen'
    thumbs.get(currentId)?.root.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }

  store.subscribe(e => {
    if (e.type === 'structure') sync()
    else if (e.type === 'app') { store.state.screens.forEach(s => dirty.add(s.id)); flush() }
    else if (e.type === 'screen' && !e.live) { dirty.add(e.screenId); flush() }
  })
  sync()
}
