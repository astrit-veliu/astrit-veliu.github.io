export const content = {
  profile: {
    name: 'Astrit Veliu',
    role: 'Android Software Engineer',
    company: 'Veliu Labs',
    location: 'Köln, Germany',
    experience: '10+ years',
    cvPath: 'assets/cv/Astrit_Veliu_CV_EN.pdf',
  },

  about: {
    summary:
      'Android Software Engineer with 10+ years of experience building innovative mobile applications.',
    currentRole:
      'Founder & Android Engineer at Veliu Labs, focused on developing My DNS and My IP applications.',
    currentWork: 'Building innovative Android apps: My DNS & My IP',
    education: [
      'MSc in Information Technology (2016-2018)',
      'BSc in Information Technology (2013-2016)',
      'CyberSecurity Specialist (2018-2019)',
      'CCNA Certification - Score: 961/1000',
    ],
    achievements: [
      { key: 'users', value: '60,000+ active app users' },
      { key: 'apps', value: '3 published production apps' },
      { key: 'architecture', value: 'Migrated CHECK24 from MVI to MVVM' },
    ],
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '60K+', label: 'App Users' },
      { value: '3', label: 'Published Apps' },
      { value: '10+', label: 'Projects' },
    ],
  },

  experience: [
    {
      company: 'Veliu Labs',
      role: 'Founder & Android Engineer',
      period: 'January 2026 - Present',
      location: 'Köln, Germany',
      highlights: [
        'Developing My DNS app (60,000+ users)',
        'Building My IP network tool',
        'Implementing modern Android architecture',
        'Focus on user privacy and security',
      ],
    },
    {
      company: 'CHECK24 Vergleichsportal Mobilfunk GmbH',
      role: 'Senior Android Developer',
      period: 'October 2020 - December 2025',
      location: 'Köln, Germany',
      highlights: [
        'Maintained and refactored Mobilfunk SIM Only module',
        'Successfully migrated from MVI to MVVM architecture',
        'Implemented multiple features',
        'Delivered extensive UI/UX optimizations',
        'Collaborated with cross-functional teams',
      ],
    },
    {
      company: 'Optima Italia',
      role: 'Android Developer',
      period: 'August 2019 - September 2020',
      location: 'Tirana, Albania',
      highlights: [
        'Developed MyOptima Android application',
        'Built Tuttonizatore app with modern features',
        'Enhanced UI/UX with Material Design',
      ],
    },
    {
      company: 'ASL Tech Web',
      role: 'Android Developer',
      period: 'March 2019 - June 2019',
      location: 'Tirana, Albania',
      highlights: ['Developed Android applications with UI/UX improvements'],
    },
    {
      company: 'Almotech',
      role: 'Android Developer',
      period: 'November 2016 - September 2018',
      location: 'Tirana, Albania',
      highlights: [
        'Led Shife te Shife e-Commerce app',
        'Built and maintained multiple Android apps',
        'Implemented RESTful API integrations',
      ],
    },
  ],

  projects: {
    apps: [
      {
        id: 'myDns',
        name: 'My DNS',
        packageName: 'website.techalbania.generaldns',
        category: 'Networking',
        description:
          'Fast & secure DNS switching application with VPN-based architecture. Provides optimal privacy and modern UI/UX built with Material Design 3.',
        users: '60,000+',
        rating: '4.5',
        technologies: [
          'Jetpack Compose',
          'VPN Service',
          'Material Design 3',
          'MVVM Architecture',
          'Kotlin Coroutines',
        ],
      },
      {
        id: 'fitAl',
        name: 'Fit AL',
        packageName: 'website.techalbania.fit',
        category: 'Health & Fitness',
        description:
          'Pedometer and health tracker application with engaging animations. Tracks steps, calories, and provides health insights with modern Android architecture.',
        technologies: [
          'Step Detection Sensors',
          'Health Connect API',
          'Animated UI',
          'Material Design',
        ],
      },
      {
        id: 'myIp',
        name: 'My IP',
        packageName: 'website.techalbania.mynetworkip',
        category: 'Network Tools',
        description:
          'Network information tool to check IP address and network details instantly. Clean interface with fast performance.',
        technologies: ['Network API', 'Clean Architecture', 'Minimal UI', 'Kotlin'],
      },
    ],
    storeBaseUrl: 'https://play.google.com/store/apps/details?id=',
    developerPages: [
      {
        label: 'Veliu Labs Apps',
        url: 'https://play.google.com/store/apps/dev?id=9023809209412327612',
      },
      {
        label: 'Personal Apps',
        url: 'https://play.google.com/store/apps/dev?id=8902247989998999802',
      },
    ],
  },

  skills: [
    { category: 'Languages', items: ['Kotlin', 'Java'] },
    {
      category: 'UI Development',
      items: ['Jetpack Compose', 'Material Design 3', 'XML Layouts', 'Custom Views'],
    },
    {
      category: 'Architecture',
      items: ['MVVM', 'MVI', 'Clean Architecture', 'Repository Pattern'],
    },
    {
      category: 'Dependency Injection',
      items: ['Dagger 2', 'Hilt'],
    },
    {
      category: 'Libraries & Tools',
      items: [
        'Retrofit',
        'OkHttp',
        'Room DB',
        'SQLite',
        'Coroutines',
        'Flow',
        'JUnit',
        'Mockito',
        'Espresso',
        'Git',
        'CI/CD',
        'Jira & Bamboo',
        'Cyber Security',
      ],
    },
  ],

  contact: {
    email: 'astrit-veliu@hotmail.com',
    links: [
      {
        id: 'github',
        label: 'GitHub',
        handle: '@astrit-veliu',
        url: 'https://github.com/astrit-veliu/',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        handle: '@astrit-veliu',
        url: 'https://www.linkedin.com/in/astrit-veliu/',
      },
      {
        id: 'medium',
        label: 'Medium',
        handle: '@astrit.veliu95',
        url: 'https://medium.com/@astrit.veliu95',
      },
    ],
    availability: 'Open to opportunities',
    responseTime: 'Within 24 hours',
    timezone: 'CET (Central European Time)',
  },
};
