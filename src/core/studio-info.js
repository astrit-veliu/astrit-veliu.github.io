import { workspace } from '../data/workspace.js';

const pad = (value) => String(value).padStart(2, '0');

const now = new Date();
const year = now.getFullYear();
const month = pad(now.getMonth() + 1);
const day = pad(now.getDate());
const monthName = now.toLocaleString('en-US', { month: 'long' });
const buildSuffix = Math.floor(Math.random() * 90000) + 10000;

export const studioInfo = {
  year,
  version: `${year}.${month}.${day}`,
  buildNumber: `AS-${year}${month}${day}.${buildSuffix}`,
  buildDate: `${monthName} ${now.getDate()}, ${year}`,
  folderName: `${workspace.folderPrefix}_${year}`,
  projectPath: `${workspace.parentDirectory}/${workspace.folderPrefix}_${year}`,
};
