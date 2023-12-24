import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      script: [
        {
          children: `
        ;(function () {
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          const setting = localStorage.getItem('color-schema') || 'auto'
          if (setting === 'dark' || (prefersDark && setting !== 'light')) document.documentElement.classList.toggle('dark', true)
        })()`,
        },
      ],
      noscript: [
        { children: 'JavaScript is required' },
      ],
    },
  },
  build: {
    analyze: {
      enabled: true,
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    'virtual:uno.css',
    '@/styles/global.css',
  ],
  components: [
    {
      path: '@/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],
  postcss: {
    plugins: {
      autoprefixer: [
        'last 2 versions',
      ],
    },
  },
  modules: ['@vueuse/nuxt', '@unocss/nuxt', 'nuxt-svgo', '@nuxt/image'],
  svgo: {
    autoImportPath: 'assets/svg/',
  },

})
