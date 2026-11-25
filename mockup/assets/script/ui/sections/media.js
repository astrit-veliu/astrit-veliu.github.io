import { createOverlay } from '../../state/screenFactory.js'
import { readImage } from '../../lib/images.js'
import { store } from '../../state/store.js'
import { MediaPreview, Section, Upload } from '../primitives.js'
import { toast } from '../toast.js'

const guarded = fn => async file => {
  try { await fn(file) } catch (error) { toast(error.message) }
}

const remove = path => () => store.setAsset(path, null)

export const ScreenshotSection = () => Section('Screenshot',
  Upload({ label: 'Drop or click', icon: 'mobile-screen-button', accept: 'image/*', onFile: guarded(async f => store.setAsset('media.screenshot', await readImage(f))) }),
  MediaPreview({ path: 'media.screenshot', label: 'Screenshot preview', onRemove: remove('media.screenshot') }))

export const CustomFrameSection = () => Section('Custom Frame',
  Upload({ label: 'Upload PNG', icon: 'border-all', accept: 'image/png', onFile: guarded(async f => store.setAsset('media.frame', await readImage(f, ['image/png']))) }),
  MediaPreview({ path: 'media.frame', label: 'Frame preview', onRemove: remove('media.frame') }))

export const PopupSection = () => Section('Popup Image',
  Upload({ label: 'Upload', icon: 'image', accept: 'image/*', onFile: guarded(async f => {
    const src = await readImage(f)
    store.addOverlay(createOverlay('popup', { src, w: 0.4, rotate: 0 }, store.screen().overlays.length))
    toast('Popup added. Drag to position')
  }) }))
