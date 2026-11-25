import { content } from '../../../src/data/content.js';
import { assetUrl } from '../../../src/core/assets.js';
import { formatInstalls, formatRating } from '../../../src/core/format.js';
import { labsAsset } from '../core/assets.js';
import { labs } from './labs-content.js';

const { apps, storeBaseUrl, developerPages } = content.projects;

const statsOf = (app) => {
  const { statLabels } = labs.projects;
  const entries = [
    app.installs && { value: formatInstalls(app.installs, { compact: true }), label: statLabels.installs },
    app.rating && { value: formatRating(app.rating), label: statLabels.rating },
  ].filter(Boolean);
  return entries;
};

const iconsOf = ({ icon }) =>
  icon ? { icon: labsAsset(`assets/img/apps/${icon.split('/').pop()}`), fallbackIcon: assetUrl(icon) } : {};

export const getApps = () =>
  apps.map((app) => ({
    id: app.id,
    name: app.name,
    category: app.category,
    description: app.description,
    ...iconsOf(app),
    href: `${storeBaseUrl}${app.packageName}`,
    tags: app.technologies,
    stats: statsOf(app),
  }));

export const getDeveloperPages = () => developerPages;

export const getSocialLinks = () => content.contact.links;

const foundedYear = () =>
  content.experience.find(({ company }) => company === content.profile.company)?.period.match(/\d{4}/)?.[0] ?? null;

export const getHeroStats = () => {
  const installs = apps.reduce((sum, app) => sum + (app.installs ?? 0), 0);
  const rated = apps.filter((app) => app.rating);
  const average = rated.length ? rated.reduce((sum, app) => sum + app.rating, 0) / rated.length : null;
  return {
    installs: installs ? formatInstalls(installs, { compact: true }) : null,
    apps: String(apps.length),
    rating: average ? formatRating(average) : null,
    founded: foundedYear(),
  };
};
