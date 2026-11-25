const HOVER_TARGETS = 'a, button, .chip';
const RING_EASE = 0.12;
const SETTLE_DISTANCE = 0.1;

const create = (name) => {
  const outer = document.createElement('div');
  outer.className = 'cursor';
  const inner = document.createElement('div');
  inner.className = `cursor-${name}`;
  outer.append(inner);
  document.body.append(outer);
  return { outer, inner };
};

export function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = create('dot');
  const ring = create('ring');
  const target = { x: 0, y: 0 };
  const position = { x: 0, y: 0 };
  let frame = 0;

  const place = (element, point) => {
    element.style.transform = `translate(${point.x}px, ${point.y}px)`;
  };

  const follow = () => {
    position.x += (target.x - position.x) * RING_EASE;
    position.y += (target.y - position.y) * RING_EASE;
    place(ring.outer, position);
    const distance = Math.hypot(target.x - position.x, target.y - position.y);
    frame = distance > SETTLE_DISTANCE ? requestAnimationFrame(follow) : 0;
  };

  document.documentElement.dataset.cursor = 'custom';

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    target.x = event.clientX;
    target.y = event.clientY;
    place(dot.outer, target);
    if (!frame) frame = requestAnimationFrame(follow);
  });

  document.addEventListener('pointerover', (event) => {
    ring.inner.classList.toggle('is-hover', Boolean(event.target.closest?.(HOVER_TARGETS)));
  });
}
