import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "FCL Frauen · Spielleitung",
  cleanUrls: true,
  description: "Alles rund um die Spielleitung im Kinderfussball des FC Luzern Frauen",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/fcl-logo.svg' }],
    ['meta', { name: 'theme-color', content: '#00519e' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  themeConfig: {
    logo: '/fcl-logo.svg',

    nav: [
      { text: 'Checkliste', link: '/checkliste' },
      { text: 'Ausrüstung', link: '/ausruestung' },
      { text: 'Einsatzplan', link: '/einsatzplan' },
    ],

    sidebar: [
      {
        text: 'Spielleitung',
        items: [
          { text: 'Willkommen', link: '/' },
          { text: 'Checkliste', link: '/checkliste' },
          { text: 'Ausrüstung', link: '/ausruestung' },
          { text: 'Einsatzplan', link: '/einsatzplan' },
        ]
      },
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'FC Luzern Frauen · Kinderfussball',
    },
  },
  srcDir: './content',
})
