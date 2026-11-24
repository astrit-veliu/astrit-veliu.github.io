import { h, icon } from '../../lib/dom.js'

export const transformHandles = () => [
  h('span', { class: 'stage-handle handle-scale', dataset: { handle: 'scale' } }, icon('up-right-and-down-left-from-center')),
  h('span', { class: 'stage-handle handle-rotate', dataset: { handle: 'rotate' } }, icon('rotate')),
]
