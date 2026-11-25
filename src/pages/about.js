import { html } from '../core/dom.js';
import { doc, indentBlock, join, list, map, str } from '../core/kotlin.js';
import { assetUrl } from '../core/assets.js';
import { workspace } from '../data/workspace.js';
import { bulletList, button, card, screen, stats, text } from '../components/ui-kit.js';

export default {
  id: 'about',
  file: 'AboutMe.kt',
  label: 'About Me',
  navLabel: 'About',
  description: 'Personal information',
  icon: 'person',

  source: ({ profile, about }) =>
    join(
      `package ${workspace.packageName}`,
      doc(['Personal Information', `About ${profile.name} - ${profile.role}`]),
      `data class Developer(\n${indentBlock(
        [
          `val name: String = ${str(profile.name)}`,
          `val role: String = ${str(profile.role)}`,
          `val experience: String = ${str(profile.experience)}`,
          `val location: String = ${str(profile.location)}`,
          `val company: String = ${str(profile.company)}`,
        ].join(',\n'),
        1,
      )}\n)`,
      `class Profile {\n${indentBlock(
        join(
          'private val developer = Developer()',
          `fun getEducation(): List<String> = ${list(about.education.map(str), 0)}`,
          `fun getCurrentWork(): String {\n${indentBlock(`return ${str(about.currentWork)}`, 1)}\n}`,
          `fun getAchievements(): Map<String, String> = ${map(
            about.achievements.map(({ key, value }) => [key, value]),
            0,
          )}`,
        ),
        1,
      )}\n}`,
    ),

  screen: ({ profile, about }) =>
    screen(
      'about',
      'About Me',
      card({
        leading: html`<img class="ui-avatar" src="${assetUrl(profile.avatar)}" alt="${profile.name}" width="96" height="96" decoding="async">`,
        title: profile.name,
        subtitle: profile.role,
        body: text(about.summary),
      }),
      card({ title: 'Current Role', body: text(about.currentRole) }),
      stats(about.stats),
      card({ title: 'Education', body: bulletList(about.education) }),
      html`<div class="about-actions">${button({ label: 'Open CV', command: 'view.cv' })}</div>`,
    ),

  summary: ({ profile, about }) => [
    `${profile.name} - ${profile.role}`,
    `Location: ${profile.location}`,
    `Experience: ${profile.experience}`,
    `Company: ${profile.company}`,
    '',
    about.summary,
  ],
};
