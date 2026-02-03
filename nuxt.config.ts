export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    '~/styles/global.css',
    '~/styles/componentsVariable.css',
    '~/styles/transition.css',
    '~/styles/variable.css',
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'static/js/[name]-[hash].js',
          manualChunks: {
            vue: ['vue', 'vue-router'],
            shiki: ['shiki'],
            matter: ['matter-js'],
            particles: ['tsparticles', '@tsparticles/vue3'],
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
