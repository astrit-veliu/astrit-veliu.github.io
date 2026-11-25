import { $$ } from '../../../src/core/dom.js';

const START_ANGLE = 45;

export function layoutOrbits() {
  $$('[data-orbit]').forEach((orbit) => {
    const items = [...orbit.children];
    items.forEach((item, index) => {
      item.style.setProperty('--angle', `${START_ANGLE + (360 / items.length) * index}deg`);
      item.style.setProperty('--index', index);
    });
  });
}
