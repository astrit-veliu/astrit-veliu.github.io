export const widthClasses = [
  ['compact', 0],
  ['medium', 600],
  ['expanded', 840],
  ['large', 1200],
  ['xlarge', 1600],
];

export const heightClasses = [
  ['compact', 0],
  ['medium', 480],
  ['expanded', 900],
];

export const widthAtLeast = (current, target) =>
  widthClasses.findIndex(([name]) => name === current) >= widthClasses.findIndex(([name]) => name === target);

const track = (table, feature, apply) => {
  const queries = table.map(([name, min]) => [name, window.matchMedia(`(min-${feature}: ${min}px)`)]);
  const update = () => apply(queries.filter(([, query]) => query.matches).at(-1)[0]);
  queries.forEach(([, query]) => query.addEventListener('change', update));
  update();
};

export function observeLayout(onChange) {
  const root = document.documentElement;
  const current = {};
  const publish = (key, value) => {
    current[key] = value;
    root.dataset[key] = value;
    if (current.width && current.height) onChange({ widthClass: current.width, heightClass: current.height });
  };
  track(widthClasses, 'width', (value) => publish('width', value));
  track(heightClasses, 'height', (value) => publish('height', value));
}
