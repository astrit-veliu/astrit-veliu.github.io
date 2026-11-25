import { h, icon } from '../lib/dom.js'

let current = null

export function closeMenu() {
  if (!current) return
  const { menu, trigger, dispose } = current
  current = null
  dispose()
  menu.remove()
  trigger.setAttribute('aria-expanded', 'false')
}

/**
 * One shared popup menu, positioned in the viewport so scrolling containers can't clip it.
 * items: [{ label, icon, onSelect, danger?, disabled?, title? }]. Opens above the trigger when there is room.
 */
export function openMenu(trigger, items) {
  if (current?.trigger === trigger) return closeMenu()
  closeMenu()

  const buttons = items.map(item => h('button', {
    type: 'button', role: 'menuitem', class: item.danger ? 'menu-item danger' : 'menu-item',
    disabled: item.disabled, title: item.title,
    onclick: () => { closeMenu(); trigger.focus(); item.onSelect() },
  }, icon(item.icon), h('span', {}, item.label)))
  const menu = h('div', { class: 'menu', role: 'menu' }, buttons)
  document.body.append(menu)

  const t = trigger.getBoundingClientRect()
  const m = menu.getBoundingClientRect()
  const gap = 6
  menu.style.left = `${Math.max(8, Math.min(t.right - m.width, innerWidth - m.width - 8))}px`
  menu.style.top = `${t.top - m.height - gap >= 8 ? t.top - m.height - gap : t.bottom + gap}px`
  trigger.setAttribute('aria-expanded', 'true')

  const enabled = () => buttons.filter(b => !b.disabled)
  const onPointerDown = e => { if (!menu.contains(e.target) && !trigger.contains(e.target)) closeMenu() }
  const onKey = e => {
    if (e.key === 'Escape') { closeMenu(); trigger.focus() }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const list = enabled()
      const next = list.indexOf(document.activeElement) + (e.key === 'ArrowDown' ? 1 : -1)
      list[(next + list.length) % list.length]?.focus()
    }
  }
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('keydown', onKey)
  addEventListener('resize', closeMenu)
  const dispose = () => {
    document.removeEventListener('pointerdown', onPointerDown, true)
    document.removeEventListener('keydown', onKey)
    removeEventListener('resize', closeMenu)
  }
  current = { menu, trigger, dispose }
  enabled()[0]?.focus()
}
