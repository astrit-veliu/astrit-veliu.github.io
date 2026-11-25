import { createStore } from './store.js';
import { workspace } from '../data/workspace.js';

export const store = createStore({
  booted: false,
  page: 'about',
  tabs: [],
  overlay: null,
  explorerOpen: true,
  terminalOpen: true,
  emulatorOpen: true,
  terminalTab: 'terminal',
  pane: 'emulator',
  deviceTheme: 'dark',
  deviceProfile: workspace.devices[0].id,
  soundOn: true,
  building: false,
  refreshing: false,
  screenVersion: 0,
  buildLines: workspace.build.lines,
  status: 'Gradle sync finished',
  cursor: { line: 1, col: 1 },
  rainbow: false,
  widthClass: 'compact',
  heightClass: 'medium',
});
