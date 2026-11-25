import about from './about.js';
import skills from './skills.js';
import experience from './experience.js';
import projects from './projects.js';
import contact from './contact.js';

export const pages = [about, skills, experience, projects, contact];

export const getPage = (id) => pages.find((page) => page.id === id);

export const isPageId = (id) => pages.some((page) => page.id === id);
