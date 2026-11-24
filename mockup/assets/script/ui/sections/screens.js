import { PLAY_STORE } from '../../config/assetTypes.js'
import { h, icon } from '../../lib/dom.js'
import { store } from '../../state/store.js'
import { Button, Section } from '../primitives.js'
import { toast } from '../toast.js'

export function ScreensSection() {
  const list = h('div', { class: 'screen-list', role: 'listbox', 'aria-label': 'Screens' })
  const add = Button({ label: 'Add Screen', icon: 'plus', variant: 'dashed', onClick: () => store.add() || toast(`Maximum ${PLAY_STORE.maxScreens} screens`) })
  const titles = new Map()

  const rebuild = () => {
    const { screens, currentId } = store.state
    titles.clear()
    list.replaceChildren(...screens.map((s, i) => {
      const title = h('span', { class: 'screen-sub' }, s.content.headline)
      titles.set(s.id, title)
      return h('div', {
        class: 'screen-item', role: 'option', tabindex: 0, 'aria-selected': s.id === currentId,
        onclick: () => store.select(s.id),
        onkeydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); store.select(s.id) } },
      },
      h('span', { class: 'screen-num' }, i + 1),
      h('span', { class: 'screen-text' }, h('span', { class: 'screen-name' }, `Screen ${i + 1}`), title),
      screens.length > 1 && h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Delete screen ${i + 1}`, onclick: e => { e.stopPropagation(); store.remove(s.id); toast('Screen deleted') } }, icon('trash-can')))
    }))
    add.disabled = screens.length >= PLAY_STORE.maxScreens
  }

  store.subscribe(e => {
    if (e.type === 'structure') rebuild()
    else if (e.type === 'screen' && !e.live) titles.get(e.screenId)?.replaceChildren(store.screen(e.screenId).content.headline)
  })
  rebuild()
  return Section('Screens', list, add)
}
