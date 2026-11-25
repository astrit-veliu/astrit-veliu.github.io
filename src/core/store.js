export function createStore(initial) {
  let state = initial;
  const listeners = new Set();

  return {
    get: () => state,
    set(patch) {
      const previous = state;
      state = { ...previous, ...(typeof patch === 'function' ? patch(previous) : patch) };
      listeners.forEach(({ keys, handler }) => {
        if (keys.some((key) => !Object.is(previous[key], state[key]))) handler(state, previous);
      });
    },
    subscribe(keys, handler) {
      const entry = { keys, handler };
      listeners.add(entry);
      return () => listeners.delete(entry);
    },
  };
}
