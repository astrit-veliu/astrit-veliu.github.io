export function vendor(name) {
  const lib = window[name]
  if (!lib) throw new Error(`${name} could not be loaded. Check your internet connection and reload.`)
  return lib
}
