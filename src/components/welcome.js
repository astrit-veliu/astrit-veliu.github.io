import { $, html, mount } from '../core/dom.js';
import { store } from '../core/state.js';
import { studioInfo } from '../core/studio-info.js';
import { content } from '../data/content.js';
import { workspace } from '../data/workspace.js';
import { icon } from './icons.js';

export const androidLogo = html`
  <svg class="android-logo" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <circle cx="24" cy="24" r="22" class="android-logo-disc"/>
    <path d="M17 20L24 13L31 20M17 28L24 35L31 28" class="android-logo-mark"/>
  </svg>
`;

const initials = (name) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

export function mountWelcome() {
  mount(
    $('#welcome'),
    html`
      <div class="welcome-window" role="dialog" aria-modal="true" aria-labelledby="welcomeTitle">
        <header class="welcome-header">
          ${androidLogo}
          <div class="welcome-heading">
            <h1 id="welcomeTitle" class="welcome-title">Android Studio</h1>
            <p class="welcome-version">${content.profile.company} | ${studioInfo.version}</p>
          </div>
        </header>
        <div class="welcome-body">
          <nav class="welcome-sidebar" aria-label="Welcome sections">
            <span class="welcome-nav is-active" aria-current="page">Projects</span>
          </nav>
          <section class="welcome-main">
            <div class="welcome-toolbar">
              <input id="welcomeSearch" class="welcome-search" type="search" placeholder="Search projects" aria-label="Search projects" autocomplete="off">
              <button type="button" class="ui-btn ui-btn--filled" id="welcomeOpen" data-command="project.open">Open</button>
            </div>
            <ul class="recent-projects" id="recentProjects">
              <li>
                <button type="button" class="project-item" data-command="project.open" data-search="${`${workspace.projectName} ${studioInfo.projectPath}`.toLowerCase()}">
                  <span class="project-badge project-badge--large">${initials(content.profile.name)}</span>
                  <span class="project-info">
                    <span class="project-title">${workspace.projectName}</span>
                    <span class="project-path">${studioInfo.projectPath}</span>
                    <span class="project-branch">${icon('branch')}${workspace.branch}</span>
                  </span>
                </button>
              </li>
            </ul>
            <p class="welcome-empty" id="welcomeEmpty" hidden>No projects match your search.</p>
          </section>
        </div>
        <footer class="welcome-footer">
          <button type="button" class="icon-btn" data-command="dialog.about" aria-label="About this portfolio" title="About">${icon('info')}</button>
        </footer>
      </div>
    `,
  );

  const root = $('#welcome');
  const search = $('#welcomeSearch');

  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    root.querySelectorAll('.project-item').forEach((item) => {
      const match = item.dataset.search.includes(query);
      item.parentElement.hidden = !match;
      if (match) visible += 1;
    });
    $('#welcomeEmpty').hidden = visible > 0;
  });

  const sync = ({ booted }) => {
    root.classList.toggle('is-hidden', booted);
    root.inert = booted;
    if (!booted) requestAnimationFrame(() => $('#welcomeOpen').focus({ preventScroll: true }));
  };
  store.subscribe(['booted'], sync);
  sync(store.get());
}
