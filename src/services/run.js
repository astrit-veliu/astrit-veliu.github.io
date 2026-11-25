import { store } from '../core/state.js';
import { workspace } from '../data/workspace.js';
import { showToast } from '../components/toast.js';
import { startProgress } from '../components/progress.js';
import { openPage } from './navigation.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runApp() {
  if (store.get().building) {
    showToast('A build is already running', 'error');
    return;
  }

  const { lines, stepDelay } = workspace.build;
  store.set({
    building: true,
    buildLines: [],
    terminalTab: 'build',
    terminalOpen: true,
    status: 'Gradle build running...',
  });
  showToast('Starting build process...');
  startProgress(lines.length * stepDelay + 500);

  for (const line of lines) {
    await sleep(stepDelay);
    store.set((state) => ({ buildLines: [...state.buildLines, line] }));
  }
  await sleep(500);

  openPage('about');
  store.set({ building: false, pane: 'emulator', status: 'Build completed successfully' });
  showToast('App launched successfully!');
}
