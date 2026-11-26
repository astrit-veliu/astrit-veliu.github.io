const scoped = name => `excel-guide:${name}`;

export const prefs = {
  get(name) {
    try {
      return localStorage.getItem(scoped(name));
    } catch {
      return null;
    }
  },
  set(name, value) {
    try {
      localStorage.setItem(scoped(name), value);
    } catch {
      return;
    }
  },
};
