import { $, $$, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { getPage, pages } from '../pages/index.js';
import { stepPage } from '../services/navigation.js';
import { icon } from './icons.js';
import { closePopover, openPopover } from './popover.js';

const SWIPE_RATIO = 0.15;
const SWIPE_DOMINANCE = 1.5;
const CLOCK_INTERVAL = 30000;

const deviceOf = (id) => workspace.devices.find((device) => device.id === id) ?? workspace.devices[0];

export function mountEmulator() {
  mount(
    $('#emulator'),
    html`
      <header class="tool-header emulator-header">
        <button type="button" class="device-chip" data-menu="device" aria-haspopup="menu" aria-expanded="false">
          ${icon('phone')}<span id="deviceLabel"></span>${icon('caretDown')}
        </button>
        <span class="tool-spacer"></span>
        <button type="button" class="icon-btn" id="soundToggle" data-command="device.sound"></button>
        <button type="button" class="icon-btn" id="themeToggle" data-command="device.theme"></button>
        <button type="button" class="icon-btn" data-command="device.refresh" aria-label="Refresh device" title="Refresh">${icon('refresh')}</button>
        <button type="button" class="icon-btn emulator-hide" data-command="view.emulator" aria-label="Hide running devices">${icon('close')}</button>
      </header>
      <div class="emulator-stage">
        <div class="device" id="device" data-theme="dark">
          <div class="device-screen">
            <div class="phone-status">
              <span id="phoneTime"></span>
              <span class="phone-status-icons">${icon('wifi')}${icon('signal')}${icon('battery')}</span>
            </div>
            <div class="app-content" id="deviceScreen" tabindex="0" aria-live="polite"></div>
            <button type="button" class="scroll-top" id="scrollTop" data-command="device.scrollTop" aria-label="Scroll to top">${icon('arrowUp')}</button>
            <nav class="bottom-nav" aria-label="Portfolio sections">
              ${pages.map(
                ({ id, navLabel, icon: name }) => html`
                  <button type="button" class="nav-item" data-command="page.open" data-arg="${id}"><span class="nav-pill">${icon(name)}</span><span class="nav-label">${navLabel}</span></button>
                `,
              )}
            </nav>
            <div class="gesture-bar"></div>
            <div class="device-loader" id="deviceLoader" aria-hidden="true"><div class="spinner"></div><span>Installing...</span></div>
          </div>
          <span class="device-camera"></span>
        </div>
      </div>
    `,
  );

  const device = $('#device');
  const screenEl = $('#deviceScreen');
  const scrollTopBtn = $('#scrollTop');
  const root = document.documentElement;

  const renderScreen = ({ page }) => {
    mount(screenEl, getPage(page).screen(content));
    screenEl.scrollTop = 0;
    screenEl.classList.remove('is-entering');
    void screenEl.offsetWidth;
    screenEl.classList.add('is-entering');
    scrollTopBtn.classList.remove('is-visible');
    $$('.nav-item', device).forEach((item) => {
      const active = item.dataset.arg === page;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-current', active ? 'page' : 'false');
    });
  };

  const syncProfile = ({ deviceProfile }) => {
    const profile = deviceOf(deviceProfile);
    root.style.setProperty('--device-ratio', String(profile.width / profile.height));
    $('#deviceLabel').textContent = `${profile.name} ${profile.api}`;
  };

  const syncTheme = ({ deviceTheme }) => {
    device.dataset.theme = deviceTheme;
    const toggle = $('#themeToggle');
    const next = deviceTheme === 'dark' ? 'light' : 'dark';
    mount(toggle, icon(deviceTheme === 'dark' ? 'sun' : 'moon'));
    toggle.setAttribute('aria-label', `Switch emulator to ${next} theme`);
    toggle.title = `Switch to ${next} theme`;
  };

  const syncSound = ({ soundOn }) => {
    const toggle = $('#soundToggle');
    mount(toggle, icon(soundOn ? 'volumeOn' : 'volumeOff'));
    toggle.setAttribute('aria-pressed', String(soundOn));
    toggle.setAttribute('aria-label', soundOn ? 'Mute sound' : 'Enable sound');
    toggle.title = soundOn ? 'Mute sound' : 'Enable sound';
  };

  const syncLoader = ({ building, refreshing }) => {
    $('#deviceLoader').classList.toggle('is-active', building || refreshing);
  };

  const updateClock = () => {
    $('#phoneTime').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const devicePopover = (anchor) =>
    openPopover(
      anchor,
      workspace.devices.map(({ id, name, api }) => ({ label: `${name} ${api}`, command: 'device.select', arg: id, icon: 'phone' })),
    );

  $('.device-chip').addEventListener('click', (event) => devicePopover(event.currentTarget));

  screenEl.addEventListener(
    'scroll',
    () => scrollTopBtn.classList.toggle('is-visible', screenEl.scrollTop > screenEl.clientHeight * 0.5),
    { passive: true },
  );

  let swipeStart = null;
  screenEl.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0];
      swipeStart = { x: touch.clientX, y: touch.clientY };
    },
    { passive: true },
  );
  screenEl.addEventListener(
    'touchend',
    (event) => {
      if (!swipeStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - swipeStart.x;
      const dy = touch.clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(dx) >= screenEl.clientWidth * SWIPE_RATIO && Math.abs(dx) > Math.abs(dy) * SWIPE_DOMINANCE) {
        stepPage(dx < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );

  device.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    closePopover();
    openPopover({ x: event.clientX, y: event.clientY }, [
      { label: 'Copy Link', command: 'link.copy', icon: 'copy' },
      { label: 'Open in New Tab', command: 'link.open', icon: 'openInNew' },
      { label: 'Share', command: 'link.share', icon: 'share' },
      { divider: true },
      { label: 'Download CV', command: 'view.cv', icon: 'download' },
    ]);
  });

  store.subscribe(['page', 'screenVersion'], renderScreen);
  store.subscribe(['deviceProfile'], syncProfile);
  store.subscribe(['deviceTheme'], syncTheme);
  store.subscribe(['soundOn'], syncSound);
  store.subscribe(['building', 'refreshing'], syncLoader);

  const state = store.get();
  renderScreen(state);
  syncProfile(state);
  syncTheme(state);
  syncSound(state);
  syncLoader(state);
  updateClock();
  setInterval(updateClock, CLOCK_INTERVAL);
}
