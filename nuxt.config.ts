export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 5,
    typescriptBundlerResolution: true,
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
      rollupOptions: {
        output: {
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'static/js/[name]-[hash].js',
          manualChunks: {
            shiki: ['shiki'],
            matter: ['matter-js'],
            glmatrix: ['gl-matrix'],
            lodash: ['lodash-es'],
          },
        },
      },
    },
  },
  app: {
    head: {
      title: 'Vue App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
