export const labs = {
  brand: { name: 'Veliu Labs', words: ['Veliu', 'Labs'] },

  sections: [
    { id: 'home', label: 'Home' },
    { id: 'apps', label: 'Projects', nav: true },
    { id: 'about', label: 'Company', nav: true },
    { id: 'contact', label: 'Contact', nav: true, cta: true },
  ],

  hero: {
    badge: ['Android', 'Kotlin', 'Jetpack Compose'],
    headline: [
      [{ text: 'Crafting apps' }],
      [{ text: 'people ' }, { text: 'love', accent: true }],
      [{ text: 'to use.' }],
    ],
    subtitle:
      'Veliu Labs builds focused, high-quality Android applications powered by modern architecture and thoughtful design.',
    actions: [
      { label: 'Explore Projects', href: '#apps', variant: 'primary' },
      { label: 'Get in Touch', href: '#contact', variant: 'ghost' },
    ],
    stats: [
      { key: 'installs', label: 'Installs' },
      { key: 'apps', label: 'Published Apps' },
      { key: 'rating', label: 'Average Rating' },
      { key: 'founded', label: 'Founded' },
    ],
  },

  projects: {
    label: 'What we build',
    title: [{ text: 'Featured ' }, { text: 'Projects', accent: true }],
    tagLimit: 4,
    intro: 'Production Android apps we design, build and maintain end to end.',
    carousel: { region: 'Projects', previous: 'Previous project', next: 'Next project' },
    storeLabel: 'Play Store',
    developerSuffix: ' - Play Store',
    statLabels: { installs: 'installs', rating: 'rating' },
  },

  about: {
    label: 'Who we are',
    title: [{ text: 'Building for ' }, { text: 'Android', accent: true }, { text: ', built for people.' }],
    paragraphs: [
      'Veliu Labs is a software development company specializing in high-quality Android applications. We focus on creating user-centric mobile experiences using cutting-edge technology and modern architecture patterns.',
      'Our portfolio spans VPN & privacy tools, health & fitness trackers, and network utilities - all built with a strong emphasis on performance, accessibility, and thoughtful UX.',
      'We leverage Jetpack Compose, Material Design 3, and scalable clean architecture to ship apps that are fast, reliable, and a pleasure to use.',
    ],
    pillars: [
      {
        icon: 'build',
        title: 'Modern architecture',
        text: 'Clean, modular codebases built on MVVM and MVI that stay easy to extend.',
      },
      {
        icon: 'lightbulb',
        title: 'Thoughtful design',
        text: 'Material Design 3 interfaces shaped around how people actually use their phones.',
      },
      {
        icon: 'chart',
        title: 'Built to perform',
        text: 'Fast start-up, low battery impact and dependable behavior across devices.',
      },
    ],
    stackLabel: 'Tech Stack',
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'MVVM / MVI',
      'Hilt / Dagger',
      'Coroutines',
      'Kotlin Flow',
      'Retrofit',
      'Room DB',
      'Paging 3',
      'Material Design 3',
      'Glance Widgets',
      'CI/CD',
    ],
  },

  contact: {
    label: 'Get in touch',
    title: [{ text: "Let's build something " }, { text: 'great', accent: true }, { text: '.' }],
    infoLabel: 'Reach out',
    emailLabel: 'Email',
    intro:
      "Have a project in mind? Whether it's a new Android app, architecture consultation, or a collaboration - we'd love to hear from you.",
    email: ['veliu.labs', 'gmail.com'],
    form: {
      rows: [
        [
          { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
        ],
        [{ name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" }],
        [{ name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your project...' }],
      ],
      submit: 'Send Message',
      success: "Message sent - we'll be in touch soon!",
    },
  },

  footer: { tagline: 'Android software, built with care.', rights: 'All rights reserved' },
};
