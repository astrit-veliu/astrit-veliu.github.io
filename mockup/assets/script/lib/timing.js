export function rafOnce(fn) {
  let id = 0
  return () => {
    if (id) return
    id = requestAnimationFrame(() => { id = 0; fn() })
  }
}

export function debounce(fn, ms) {
  let timer
  return () => { clearTimeout(timer); timer = setTimeout(fn, ms) }
}

export function observeSize(el, fn) {
  const observer = new ResizeObserver(rafOnce(() => fn(el.getBoundingClientRect())))
  observer.observe(el)
  return () => observer.disconnect()
}
