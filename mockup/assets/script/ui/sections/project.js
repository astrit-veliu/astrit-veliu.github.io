import { h } from '../../lib/dom.js'
import { download } from '../../lib/download.js'
import { serializeProject } from '../../project/serialize.js'
import { restoreProject } from '../../project/restore.js'
import { store } from '../../state/store.js'
import { Button, Hint, Section } from '../primitives.js'
import { toast } from '../toast.js'

export function ProjectSection() {
  const save = Button({ label: 'Save project', icon: 'floppy-disk', onClick: () => run(async () => {
    download(await serializeProject(store.state), `mockup-project-${new Date().toISOString().slice(0, 10)}.zip`)
    toast('Project saved')
  }) })
  const open = Button({ label: 'Open project', icon: 'folder-open', onClick: () => input.click() })
  const input = h('input', { type: 'file', accept: '.zip,application/zip', hidden: true, onchange: () => {
    const file = input.files[0]
    input.value = ''
    if (file && confirm('Opening a project replaces everything in the current one. Continue?')) run(async () => {
      const { missing, ...project } = await restoreProject(file)
      store.load(project)
      toast(missing ? `Project opened. ${missing} image(s) could not be restored` : 'Project opened')
    })
  } })

  async function run(job) {
    save.disabled = open.disabled = true
    try { await job() } catch (error) { toast(error.message) } finally { save.disabled = open.disabled = false }
  }

  return Section('Project', h('div', { class: 'inline' }, save, open), input,
    Hint('Saves every screen, setting and uploaded image to one file, so you can reopen and keep working on it later.'))
}
