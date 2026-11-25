import { $ } from '../../../src/core/dom.js';

const STORAGE_KEY = 'vl-theme';
const browserColors = { light: '#f4f7fb', dark: '#050e1a' };

const reflect = (theme) => {
  document.documentElement.dataset.theme = theme;
  $('meta[name="theme-color"]')?.setAttribute('content', browserColors[theme]);
  $('.theme-toggle')?.setAttribute('aria-pressed', String(theme === 'dark'));
};

export const currentTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function setTheme(theme) {
  reflect(theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }
}

export const toggleTheme = () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark');

export const initTheme = () => reflect(currentTheme());
