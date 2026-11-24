const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

export const isHex = value => HEX.test(value)

export const normalizeHex = hex =>
  hex.length === 4 ? `#${[...hex.slice(1)].map(c => c + c).join('')}`.toLowerCase() : hex.toLowerCase()

export function alpha(hex, a) {
  const n = parseInt(normalizeHex(hex).slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}
