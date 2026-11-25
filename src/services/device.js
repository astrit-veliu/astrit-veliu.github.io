import { store } from '../core/state.js';
import { workspace } from '../data/workspace.js';
import { showToast } from '../components/toast.js';
import { startProgress } from '../components/progress.js';

export async function refreshDevice() {
  if (store.get().refreshing || store.get().building) return;
  const { refreshDuration } = workspace;
  store.set({ refreshing: true });
  startProgress(refreshDuration);
  await new Promise((resolve) => setTimeout(resolve, refreshDuration));
  store.set((state) => ({ refreshing: false, screenVersion: state.screenVersion + 1, status: 'Device refreshed' }));
  showToast('Refreshed successfully');
}
