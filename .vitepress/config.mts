import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "FCL Frauen",
  cleanUrls: true,
  description: "Spielleitung beim FC Luzern Frauen",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/fcl-logo.svg' }],
    ['meta', { name: 'theme-color', content: '#00519e' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  themeConfig: {
    logo: '/fcl-logo.svg',
    siteTitle: 'Spielleitung',

    nav: [],

    sidebar: [
      {
        text: 'Spielleitung',
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
  },
  srcDir: './content',
})
