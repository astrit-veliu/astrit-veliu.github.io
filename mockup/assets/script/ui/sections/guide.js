import { PLAY_STORE } from '../../config/assetTypes.js'
import { store } from '../../state/store.js'
import { InfoList, Section } from '../primitives.js'

export const GuideSection = () => Section('Play Store Guide', InfoList([
  { key: 'Side length', read: () => ({ text: `${PLAY_STORE.minSide}–${PLAY_STORE.maxSide} px` }) },
  { key: 'Max ratio', read: () => ({ text: `${PLAY_STORE.maxRatio}:1` }) },
  { key: 'Max file', read: () => ({ text: `${PLAY_STORE.maxFileBytes / 1048576} MB` }) },
  { key: 'Screens', read: () => {
    const n = store.state.screens.length
    const ok = n >= PLAY_STORE.minScreens && n <= PLAY_STORE.maxScreens
    return { text: `${n} (need ${PLAY_STORE.minScreens}–${PLAY_STORE.maxScreens})`, tone: ok ? 'ok' : 'warn' }
  } },
]))
