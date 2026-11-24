import { DEVICE_DEFAULTS, LIMITS } from '../../config/defaults.js'
import { store } from '../../state/store.js'
import { Slider } from '../fields.js'
import { Button, Hint, Section } from '../primitives.js'
import { toast } from '../toast.js'

export const DeviceTransformSection = () => Section('Device',
  Slider({ path: 'device.scale', min: LIMITS.deviceScale[0] * 100, max: LIMITS.deviceScale[1] * 100, factor: 100, label: 'Scale %', icon: 'expand' }),
  Slider({ path: 'device.rotate', min: -180, max: 180, label: 'Rotate °', icon: 'rotate' }),
  Button({ label: 'Reset', icon: 'arrows-rotate', onClick: () => { store.mutate(s => Object.assign(s.device, DEVICE_DEFAULTS)); toast('Device reset') } }),
  Hint('Drag the device to move it. Hover (or tap) its corners to resize and rotate.'))
