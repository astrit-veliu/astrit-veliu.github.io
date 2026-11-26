import { content } from './content.js';
import { createRouter } from './core/router.js';
import { buildShell } from './components/shell.js';
import * as cardPage from './components/card-page.js';
import * as setup from './pages/setup.js';
import * as shortcuts from './pages/shortcuts.js';

const pages = { setup, shortcuts, tools: cardPage, tips: cardPage };
const shell = buildShell(content);

createRouter(Object.keys(content.pages), id => {
  const page = content.pages[id];
  shell.main.replaceChildren();
  pages[id].mount(shell.main, page, content.ui);
  shell.setActive(id, page.title);
});
