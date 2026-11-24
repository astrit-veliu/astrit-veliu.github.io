/** Drives `body[data-view]` (edit | preview | export). CSS decides what each view shows per layout. */
export function initViewSwitcher() {
  const body = document.body
  const sync = () => document.querySelectorAll('[data-view-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.viewSet === body.dataset.view)))

  document.addEventListener('click', e => {
    const set = e.target.closest('[data-view-set]')
    const toggle = e.target.closest('[data-view-toggle]')
    if (set) body.dataset.view = set.dataset.viewSet
    else if (toggle) body.dataset.view = body.dataset.view === toggle.dataset.viewToggle ? 'preview' : toggle.dataset.viewToggle
  })
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && body.dataset.view === 'export') body.dataset.view = 'preview' })
  new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['data-view'] })
  sync()
}
