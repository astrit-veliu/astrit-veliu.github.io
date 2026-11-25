export function initSpotlight() {
  document.addEventListener(
    'pointermove',
    (event) => {
      const card = event.target.closest?.('[data-spotlight]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
}
