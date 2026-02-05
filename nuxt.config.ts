export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', // 指定应用程序的兼容日期
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', 'dayjs-nuxt', '@vueuse/nuxt', '@nuxt/eslint', '@unocss/nuxt',
  ],
  future: {
    compatibilityVersion: 5,
    typescriptBundlerResolution: true,
  },
  app: {
    buildAssetsDir: 'nuxt_assets',
    head: {
      title: 'Vue App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  ssr: true,
  // fix: github pages排除对 /200.html 以及 /404.html, 预渲染尝试
  routeRules: {
    '/200.html': { prerender: false },
    '/404.html': { prerender: false },
  },
  experimental: {
    nitroAutoImports: true,
  },
  css: [
    '~/styles/global.css',
  ],
  vite: {
    build: {
      emptyOutDir: true,
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  pages: {
    pattern: ['!**/utils/**/*.ts'],
  },
})
