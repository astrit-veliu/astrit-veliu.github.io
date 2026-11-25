import { promo } from './config.js'

export function burst(origin) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const styles = getComputedStyle(document.documentElement)
  const colors = promo.ui.confettiColors.map((name) => styles.getPropertyValue(name).trim())
  const rect = origin.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let index = 0; index < promo.ui.confettiCount; index++) {
    const piece = document.createElement('i')
    piece.className = 'confetti'
    piece.style.background = colors[index % colors.length]
    piece.style.left = `${centerX}px`
    piece.style.top = `${centerY}px`
    document.body.append(piece)

    const angle = Math.random() * Math.PI * 2
    const distance = 80 + Math.random() * 170
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance - 70

    piece
      .animate(
        [
          { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y + 160}px)) rotate(${Math.random() * 720 - 360}deg)`,
            opacity: 0
          }
        ],
        { duration: 1100 + Math.random() * 800, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
      )
      .finished.then(() => piece.remove())
  }
}
