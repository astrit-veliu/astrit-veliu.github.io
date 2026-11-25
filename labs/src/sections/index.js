import { mount } from '../../../src/core/dom.js';
import { labs } from '../data/labs-content.js';
import hero from './hero.js';
import projects from './projects.js';
import about from './about.js';
import contact from './contact.js';

const renderers = { home: hero, apps: projects, about, contact };

export const sectionIds = labs.sections.map(({ id }) => id);

export function mountSections(root) {
  labs.sections.forEach(({ id }) => {
    const { className, render } = renderers[id];
    const section = document.createElement('section');
    section.id = id;
    section.className = className;
    mount(section, render());
    root.append(section);
  });
}
