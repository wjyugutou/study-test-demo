import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
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
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    'virtual:uno.css',
    '@/styles/global.css',
  ],
  components: {
    dirs: [
      '~/components',
    ],
  },
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  vite: {
    plugins: [createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
      symbolId: 'icon-[name]',
    }) as any],
  },
  runtimeConfig: {
    // 只在服务器端可用的私有键
    // apiSecret: '123',
    // public中的键也可以在客户端使用
    // public: {
    //   apiBase: '/api',
    // },
  },

})
