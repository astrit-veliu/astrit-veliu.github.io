import { store } from '../state/store.js'
import { outputSize, stageSize } from '../lib/geometry.js'

const ARROWS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }

/** Escape deselects, Delete removes, arrows nudge (Shift = 10 logical px) the selected overlay. */
export function attachKeyboard() {
  document.addEventListener('keydown', e => {
    const id = store.state.selectedOverlayId
    if (!id || e.target.closest('input, textarea, select, [contenteditable]')) return

    if (e.key === 'Escape') return store.selectOverlay(null)
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); return store.removeOverlay(id) }

    const dir = ARROWS[e.key]
    if (!dir) return
    e.preventDefault()
    const { width, height } = stageSize(outputSize(store.project()))
    const step = e.shiftKey ? 10 : 1
    store.patchOverlay(id, o => ({ x: o.x + (dir[0] * step) / width, y: o.y + (dir[1] * step) / height }))
  })
}
