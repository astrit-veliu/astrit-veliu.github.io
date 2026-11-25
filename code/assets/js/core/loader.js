const pending = new Map()

export function loadScript(src) {
  if (!pending.has(src)) {
    pending.set(src, new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = resolve
      script.onerror = () => {
        pending.delete(src)
        reject(new Error('Could not load a required library. Check your connection.'))
      }
      document.head.append(script)
    }))
  }
  return pending.get(src)
}
