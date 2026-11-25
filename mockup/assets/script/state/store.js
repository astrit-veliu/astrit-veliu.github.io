import { DEFAULT_ASSET, PLAY_STORE } from '../config/assetTypes.js'
import { BG_DEFAULTS, PRESETS, SIZE_DEFAULTS, WATERMARK_DEFAULTS } from '../config/defaults.js'
import { releaseUrl } from '../lib/images.js'
import { getPath, setPath } from '../lib/path.js'
import { cloneScreen, createScreen } from './screenFactory.js'

const state = {
  screens: PRESETS.map(preset => createScreen(preset)),
  currentId: null,
  assetType: DEFAULT_ASSET,
  watermark: { ...WATERMARK_DEFAULTS },
  bg: { ...BG_DEFAULTS },
  size: { ...SIZE_DEFAULTS },
  selectedOverlayId: null,
}
state.currentId = state.screens[0].id

const listeners = new Set()
const emit = (type, extra) => listeners.forEach(fn => fn({ type, ...extra }))

const screen = (id = state.currentId) => state.screens.find(s => s.id === id)
const scoped = path => (path.startsWith('app.') ? [state, path.slice(4)] : [screen(), path])
const screenEvent = live => emit('screen', { screenId: state.currentId, live })

function releaseScreen(s) {
  releaseUrl(s.media.screenshot)
  releaseUrl(s.media.frame)
  s.overlays.forEach(o => releaseUrl(o.src))
}

/**
 * Events: 'structure' (screens added/removed/selected), 'screen' (a screen changed; `live` while dragging),
 * 'app' (asset type changed), 'selection' (selected overlay changed).
 */
export const store = {
  state,
  screen,
  get index() { return state.screens.findIndex(s => s.id === state.currentId) },
  /** Everything the renderer needs besides the screen itself. */
  project() { return { assetType: state.assetType, watermark: state.watermark, bg: state.bg, size: state.size } },
  /** Replaces the whole project (already validated by project/restore.js). */
  load({ screens, current, assetType, watermark, bg, size }) {
    state.screens.forEach(releaseScreen)
    releaseUrl(state.bg.image)
    Object.assign(state, { screens, currentId: screens[current].id, assetType, watermark, bg, size, selectedOverlayId: null })
    emit('structure')
    emit('app')
  },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },

  read(path) { const [root, p] = scoped(path); return getPath(root, p) },
  set(path, value, { live = false } = {}) {
    const [root, p] = scoped(path)
    setPath(root, p, value)
    path.startsWith('app.') ? emit('app') : screenEvent(live)
  },
  mutate(fn, { live = false } = {}) { fn(screen()); screenEvent(live) },
  commit() { screenEvent(false) },

  /** Replaces an uploaded asset and frees the previous object URL. */
  setAsset(path, url) { releaseUrl(store.read(path)); store.set(path, url) },

  select(id) {
    if (id === state.currentId || !screen(id)) return
    state.currentId = id
    state.selectedOverlayId = null
    emit('structure')
  },
  add() {
    if (state.screens.length >= PLAY_STORE.maxScreens) return false
    const s = createScreen()
    state.screens.push(s)
    state.currentId = s.id
    state.selectedOverlayId = null
    emit('structure')
    return true
  },
  duplicate(id) {
    const i = state.screens.findIndex(s => s.id === id)
    if (i < 0 || state.screens.length >= PLAY_STORE.maxScreens) return false
    const copy = cloneScreen(state.screens[i])
    state.screens.splice(i + 1, 0, copy)
    state.currentId = copy.id
    state.selectedOverlayId = null
    emit('structure')
    return true
  },
  remove(id) {
    if (state.screens.length <= 1) return false
    const i = state.screens.findIndex(s => s.id === id)
    releaseScreen(state.screens[i])
    state.screens.splice(i, 1)
    if (state.currentId === id) state.currentId = state.screens[Math.min(i, state.screens.length - 1)].id
    state.selectedOverlayId = null
    emit('structure')
    return true
  },

  selectOverlay(id) {
    if (state.selectedOverlayId === id) return
    state.selectedOverlayId = id
    emit('selection')
  },
  addOverlay(overlay) {
    screen().overlays.push(overlay)
    state.selectedOverlayId = overlay.id
    screenEvent(false)
  },
  removeOverlay(id) {
    const s = screen()
    const i = s.overlays.findIndex(o => o.id === id)
    if (i < 0) return
    releaseUrl(s.overlays[i].src)
    s.overlays.splice(i, 1)
    if (state.selectedOverlayId === id) state.selectedOverlayId = null
    screenEvent(false)
  },
  patchOverlay(id, patch, opts) {
    store.mutate(s => {
      const o = s.overlays.find(item => item.id === id)
      if (o) Object.assign(o, typeof patch === 'function' ? patch(o) : patch)
    }, opts)
  },
}
