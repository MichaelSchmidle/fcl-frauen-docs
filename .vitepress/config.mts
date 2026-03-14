import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "FC Luzern Frauen · Spielleitung",
  cleanUrls: true,
  description: "Alles was du als Spielleiter:in beim FCL Frauen brauchst – an einem Ort.",
  lang: 'de-CH',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/fcl-logo.svg' }],
    ['meta', { name: 'theme-color', content: '#00519e' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  themeConfig: {
    logo: '/fcl-logo.svg',
    siteTitle: 'Spielleitung',

    nav: [
      { text: 'Kontakt', link: '/kontakt' },
    ],

    sidebar: [
      {
        items: [
          { text: 'Einsatzplan', link: '/einsatzplan' },
          { text: 'Checkliste', link: '/checkliste' },
          { text: 'Ausrüstung', link: '/ausruestung' },
        ]
      },
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'FC Luzern Frauen · Spielleitung',
    },

    outline: {
      label: 'Auf dieser Seite',
    },

    docFooter: {
      prev: 'Vorherige Seite',
      next: 'Nächste Seite',
    },

    darkModeSwitchLabel: 'Darstellung',
    sidebarMenuLabel: 'Menü',
    returnToTopLabel: 'Nach oben',
  },
  srcDir: './content',
})
