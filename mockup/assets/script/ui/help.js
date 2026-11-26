import { HELP } from '../config/help.js'
import { h, icon } from '../lib/dom.js'

const SEEN_KEY = 'mockup-generator.help-seen'

const storage = {
  get: () => { try { return localStorage.getItem(SEEN_KEY) } catch { return null } },
  set: () => { try { localStorage.setItem(SEEN_KEY, '1') } catch { /* storage blocked: the dot just returns next visit */ } },
}

const keyCombo = combo => h('span', { class: 'combo' }, combo.flatMap((key, i) => [i ? '+' : null, h('kbd', {}, key)]))

function renderItem(group, item, index) {
  if (item.keys) {
    return h('div', { class: 'help-item shortcut' },
      h('span', { class: 'keys' }, item.keys.flatMap((combo, i) => [i ? h('span', { class: 'or' }, '/') : null, keyCombo(combo)])),
      h('span', { class: 'shortcut-text' }, item.text))
  }
  return h('div', { class: 'help-item card' },
    group.ordered ? h('span', { class: 'step-num' }, index + 1) : h('span', { class: 'card-icon' }, icon(item.icon)),
    h('div', {}, h('h4', {}, item.title), h('p', {}, item.text)))
}

const renderGroup = group => h('section', { class: 'help-group' },
  h('h3', { class: 'section-label' }, group.title),
  h('div', { class: group.items[0].keys ? 'help-list' : group.ordered ? 'help-steps' : 'help-grid' }, group.items.map((item, i) => renderItem(group, item, i))))

/** Help dialog: tabs (Quick start, Features, Shortcuts), cross-tab search, `?` shortcut, first-visit attention dot. */
export function mountHelp() {
  let active = HELP[0].id
  const search = h('input', { type: 'search', class: 'input help-search', placeholder: 'Search help…', 'aria-label': 'Search help' })
  const empty = h('p', { class: 'help-empty', hidden: true }, 'Nothing matches your search.')
  const tabs = HELP.map(tab => h('button', {
    type: 'button', role: 'tab', class: 'help-tab', id: `help-tab-${tab.id}`, 'aria-controls': `help-${tab.id}`,
    onclick: () => select(tab.id), onkeydown: onTabKey,
  }, icon(tab.icon), h('span', {}, tab.label)))
  const panels = HELP.map(tab => h('div', { role: 'tabpanel', class: 'help-panel', id: `help-${tab.id}`, 'aria-labelledby': `help-tab-${tab.id}` }, tab.groups.map(renderGroup)))

  const close = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Close help', onclick: () => dialog.close() }, icon('xmark'))
  const dialog = h('dialog', { class: 'help', 'aria-label': 'Help and shortcuts' },
    h('div', { class: 'help-card' },
      h('header', { class: 'help-head' }, h('h2', {}, icon('circle-question'), 'Help'), search, close),
      h('div', { class: 'help-tabs', role: 'tablist' }, tabs),
      h('div', { class: 'help-body' }, panels, empty)))
  document.body.append(dialog)

  function render() {
    const query = search.value.trim().toLowerCase()
    let matches = 0
    dialog.querySelectorAll('.help-item').forEach(item => {
      const hit = !query || item.textContent.toLowerCase().includes(query)
      item.hidden = !hit
      matches += hit
    })
    dialog.querySelectorAll('.help-group').forEach(group => { group.hidden = !group.querySelector('.help-item:not([hidden])') })
    // While searching, results from every tab are shown together
    panels.forEach((panel, i) => { panel.hidden = !query && HELP[i].id !== active })
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(HELP[i].id === active && !query))
      tab.tabIndex = HELP[i].id === active ? 0 : -1
    })
    empty.hidden = matches > 0
  }

  function select(id, focus = false) {
    active = id
    search.value = ''
    render()
    if (focus) tabs[HELP.findIndex(t => t.id === id)].focus()
  }

  function onTabKey(e) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    select(HELP[(HELP.findIndex(t => t.id === active) + step + HELP.length) % HELP.length].id, true)
  }

  function open() {
    if (dialog.open) return
    storage.set()
    document.querySelectorAll('[data-help-open]').forEach(b => b.removeAttribute('data-new'))
    select(active)
    dialog.showModal()
    tabs[HELP.findIndex(t => t.id === active)].focus()
    dialog.querySelector('.help-body').scrollTop = 0
  }

  search.addEventListener('input', render)
  // Clicking the backdrop (the dialog element itself, outside the card) closes it
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close() })

  document.addEventListener('click', e => { if (e.target.closest('[data-help-open]')) open() })
  document.addEventListener('keydown', e => {
    if (e.key !== '?' || e.ctrlKey || e.metaKey || e.altKey || e.target.closest('input, textarea, select, [contenteditable]')) return
    e.preventDefault()
    open()
  })

  if (!storage.get()) document.querySelectorAll('[data-help-open]').forEach(b => b.setAttribute('data-new', ''))
  render()
}
