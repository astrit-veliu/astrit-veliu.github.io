const KEY_STEP = 16

/** Drag (or arrow-key) a handle to resize the neighbouring panel. Only visible on desktop layouts. */
export function initResizers() {
  const root = document.documentElement
  const setup = (handleId, cssVar, panel, direction) => {
    const handle = document.getElementById(handleId)
    const limits = () => {
      const cs = getComputedStyle(panel)
      return [parseFloat(cs.minWidth) || 0, parseFloat(cs.maxWidth) || Infinity]
    }
    const apply = width => {
      const [min, max] = limits()
      const value = Math.min(max, Math.max(min, width))
      root.style.setProperty(cssVar, `${value}px`)
      handle.setAttribute('aria-valuenow', Math.round(value))
    }
    let drag = null

    handle.addEventListener('pointerdown', e => {
      drag = { x: e.clientX, w: panel.getBoundingClientRect().width }
      handle.setPointerCapture(e.pointerId)
      handle.classList.add('dragging')
    })
    handle.addEventListener('pointermove', e => drag && apply(drag.w + (e.clientX - drag.x) * direction))
    const end = () => { drag = null; handle.classList.remove('dragging') }
    handle.addEventListener('pointerup', end)
    handle.addEventListener('pointercancel', end)
    handle.addEventListener('dblclick', () => root.style.removeProperty(cssVar))
    handle.addEventListener('keydown', e => {
      const delta = { ArrowLeft: -KEY_STEP, ArrowRight: KEY_STEP }[e.key]
      if (!delta) return
      e.preventDefault()
      apply(panel.getBoundingClientRect().width + delta * direction)
    })
  }

  setup('resizeLeft', '--panel-left-w', document.getElementById('panelLeft'), 1)
  setup('resizeRight', '--panel-right-w', document.getElementById('panelRight'), -1)
}
