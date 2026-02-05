export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
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
  experimental: { nitroAutoImports: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    '~/styles/global.css',
  ],
  vite: {
    build: {
      emptyOutDir: true,
    },
  },
})
