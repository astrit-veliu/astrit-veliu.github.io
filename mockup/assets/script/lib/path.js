export const getPath = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj)

export function setPath(obj, path, value) {
  const keys = path.split('.')
  const last = keys.pop()
  keys.reduce((o, k) => o[k], obj)[last] = value
}
