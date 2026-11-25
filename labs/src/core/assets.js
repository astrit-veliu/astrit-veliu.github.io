const labsRoot = new URL('../../', import.meta.url);

export const labsAsset = (path) => new URL(path, labsRoot).href;
