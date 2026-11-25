const root = new URL('../../', import.meta.url);

export const assetUrl = (path) => new URL(path, root).href;
