import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { studioInfo } from './studio-info.js';
import { getPage, pages } from '../pages/index.js';

const out = (...texts) => texts.flat().map((text) => (typeof text === 'string' ? { text } : text));

const absolutePath = () =>
  `/Users/${workspace.user}/${workspace.parentDirectory.replace(/^~\//, '')}/${studioInfo.folderName}`;

const listing = () => {
  const stamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const row = (type, size, name) =>
    `${type}  ${workspace.user}  staff  ${String(size).padStart(5)} ${stamp} ${name}`;
  const sourceFiles = pages.map((page) =>
    row('-rw-r--r--', new Blob([page.source(content)]).size, page.file),
  );
  return out(
    `total ${sourceFiles.length + 4}`,
    row('drwxr-xr-x', 384, '.'),
    row('drwxr-xr-x', 256, '..'),
    row('drwxr-xr-x', 480, '.git'),
    ...sourceFiles,
    row('drwxr-xr-x', 256, 'assets'),
  );
};

const portfolio = () => {
  const { about, contact, profile } = content;
  const rule = '-'.repeat(40);
  return out(
    `${profile.name} - Portfolio Summary`,
    rule,
    'Statistics:',
    about.stats.map(({ label, value }) => `   - ${label}: ${value}`),
    '',
    'Achievements:',
    about.achievements.map(({ value }) => `   - ${value}`),
    '',
    'Links:',
    contact.links.map(({ label, url }) => `   - ${label}: ${url}`),
  );
};

const gitStatus = () =>
  out(
    `On branch ${workspace.branch}`,
    `Your branch is up to date with '${workspace.remote}'.`,
    '',
    'nothing to commit, working tree clean',
  );

const gitLog = () =>
  workspace.commits.flatMap(({ hash, date, message, head }, index) =>
    out(
      index ? '' : [],
      `commit ${hash}${head ? ` (HEAD -> ${workspace.branch}, ${workspace.remote})` : ''}`,
      `Author: ${content.profile.name} <${content.contact.email}>`,
      `Date:   ${date}`,
      '',
      `    ${message}`,
    ),
  );

const whoami = () =>
  out(
    workspace.user,
    `Current User: ${content.profile.name}`,
    `Role: ${content.profile.role}`,
    `Company: ${content.profile.company}`,
  );

const uname = () =>
  out(
    workspace.runtime.system,
    `Android Studio ${content.profile.company} | ${studioInfo.version}`,
    `Build #${studioInfo.buildNumber}, built on ${studioInfo.buildDate}`,
  );

const base = [
  ...pages.map((page) => ({
    name: page.id,
    description: page.description,
    effect: { navigate: page.id },
    run: () => out(page.summary(content)),
  })),
  {
    name: 'apps',
    description: 'Show published applications',
    effect: { navigate: 'projects' },
    run: () => out(getPage('projects').summary(content)),
  },
  { name: 'portfolio', description: 'Show portfolio summary', run: portfolio },
  { name: 'run', description: 'Build and run app', effect: { run: true }, run: () => out('Starting build...') },
  { name: 'git status', description: 'Check repository status', run: gitStatus },
  { name: 'git log', description: 'Show commit history', run: gitLog },
  { name: 'ls', description: 'List project files', run: listing },
  { name: 'pwd', description: 'Print working directory', run: () => out(absolutePath()) },
  { name: 'whoami', description: 'Display current user', run: whoami },
  { name: 'date', description: 'Show current date and time', run: () => out(new Date().toString()) },
  { name: 'uname', description: 'System information', run: uname },
  { name: 'clear', description: 'Clear terminal', effect: { clear: true }, run: () => [] },
];

const helpOutput = () => {
  const width = Math.max(...[...base, { name: 'help' }].map(({ name }) => name.length));
  return out(
    'Available commands:',
    ...[{ name: 'help', description: 'Show this help message' }, ...base].map(
      ({ name, description }) => `  ${name.padEnd(width)} - ${description}`,
    ),
  );
};

export const terminalCommands = [
  { name: 'help', description: 'Show this help message', run: helpOutput },
  ...base,
];

const normalize = (input) => input.trim().replace(/\s+/g, ' ').toLowerCase();

export function execute(input) {
  const command = terminalCommands.find(({ name }) => name === normalize(input));
  if (!command) {
    return {
      lines: out({ text: `Command not found: ${input.trim()}. Type 'help' for available commands.`, tone: 'error' }),
      effect: {},
    };
  }
  return { lines: command.run(), effect: command.effect ?? {} };
}

export const promptLabel = `${workspace.user}@${workspace.host}:~$`;
