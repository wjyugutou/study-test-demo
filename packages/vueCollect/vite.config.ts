/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Inspector from 'unplugin-vue-inspector/vite'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  plugins: [

    Vue(),
    Inspector(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      exclude: ['**/components', '**/*.d.ts'],
      importMode: 'async',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
  base: '/study-test-demo',
  build: {
    outDir: `${path.resolve(__dirname, '../../docs')}/`,
    assetsDir: 'assets/',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'static/js/[name]-[hash].js',
      },
    },
  },
})
