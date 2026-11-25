import { PLAY_STORE } from '../../config/assetTypes.js'
import { exportScreen, exportZip } from '../../export/exporter.js'
import { h } from '../../lib/dom.js'
import { outputSize, playStoreStatus, ratioLabel } from '../../lib/geometry.js'
import { store } from '../../state/store.js'
import { Button, InfoList, Section } from '../primitives.js'
import { toast } from '../toast.js'

const size = () => outputSize(store.project())

export function ExportSection() {
  const progress = h('div', { class: 'progress', hidden: true }, h('div', { class: 'progress-fill' }))
  const single = Button({ label: 'Download This Screen', icon: 'download', variant: 'primary block' })
  const all = Button({ label: 'Download All as ZIP', icon: 'file-zipper', variant: 'block' })
  const buttons = [single, all]

  async function run(button, job) {
    const label = button.querySelector('span')
    const original = label.textContent
    buttons.forEach(b => { b.disabled = true })
    label.textContent = 'Rendering…'
    try {
      const { oversize } = await job()
      toast(oversize ? `Exported, but a file is over the ${PLAY_STORE.maxFileBytes / 1048576} MB Play Store limit` : 'Download started')
    } catch (error) {
      toast(error.message)
    } finally {
      label.textContent = original
      buttons.forEach(b => { b.disabled = false })
      setTimeout(() => { progress.hidden = true }, 800)
    }
  }

  single.onclick = () => run(single, async () => ({ oversize: (await exportScreen(store.screen(), store.index, store.project())).oversize }))
  all.onclick = () => run(all, () => {
    progress.hidden = false
    const fill = progress.firstChild
    return exportZip(store.state.screens, store.project(), ratio => { fill.style.width = `${ratio * 100}%` })
  })

  return Section('Export',
    InfoList([
      { key: 'Resolution', read: () => ({ text: `${size().w} × ${size().h}`, tone: 'ok' }) },
      { key: 'Format', read: () => ({ text: 'PNG', tone: 'ok' }) },
      { key: 'Ratio', read: () => ({ text: ratioLabel(size()), tone: 'ok' }) },
      { key: 'Play Store', read: () => { const s = playStoreStatus(store.state.assetType, size()); return { text: s.text, tone: s.ok ? 'ok' : 'warn', title: s.detail } } },
    ]), single, all, progress)
}
