import { store } from '../core/state.js';
import { getPage, isPageId, pages } from '../pages/index.js';

export function openPage(id) {
  if (!isPageId(id)) return;
  store.set((state) => ({
    page: id,
    tabs: state.tabs.includes(id) ? state.tabs : [...state.tabs, id],
    cursor: { line: 1, col: 1 },
    overlay: state.overlay === 'explorer' ? null : state.overlay,
    pane: state.pane === 'project' ? 'editor' : state.pane,
    status: `Opened ${getPage(id).file}`,
  }));
}

export function closeTab(id) {
  const { tabs, page } = store.get();
  const index = tabs.indexOf(id);
  if (index < 0) return;
  const remaining = tabs.filter((tab) => tab !== id);
  const patch = { tabs: remaining };
  if (page === id && remaining.length) {
    patch.page = remaining[Math.min(index, remaining.length - 1)];
    patch.cursor = { line: 1, col: 1 };
  }
  store.set(patch);
}

export function stepPage(direction) {
  const index = pages.findIndex((page) => page.id === store.get().page);
  const target = pages[index + direction];
  if (target) openPage(target.id);
}
