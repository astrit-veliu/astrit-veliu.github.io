import { store } from '../core/state.js';
import { isPageId } from '../pages/index.js';
import { openPage } from '../services/navigation.js';

const hashPage = () => window.location.hash.slice(1);

export function initRouter() {
  window.addEventListener('hashchange', () => {
    const id = hashPage();
    const { booted, page } = store.get();
    if (booted && isPageId(id) && id !== page) openPage(id);
  });

  store.subscribe(['page', 'booted'], ({ page, booted }) => {
    if (booted && hashPage() !== page) window.history.replaceState(null, '', `#${page}`);
  });

  const initial = hashPage();
  return isPageId(initial) ? initial : null;
}
