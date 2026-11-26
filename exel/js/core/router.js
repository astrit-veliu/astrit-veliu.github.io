export function createRouter(ids, onRoute) {
  const current = () => {
    const id = location.hash.replace(/^#\/?/, '');
    return ids.includes(id) ? id : ids[0];
  };

  const run = () => {
    const id = current();
    if (location.hash !== `#/${id}`) history.replaceState(null, '', `#/${id}`);
    onRoute(id);
  };

  addEventListener('hashchange', run);
  run();
}
