import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
// import Inspector from 'unplugin-vue-inspector/vite'
import autoprefixer from 'autoprefixer'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// isSsrBuild, isPreview
export default defineConfig(({ command, mode }) => ({
  base: command === 'serve' ? '/' : '/study-test-demo',

  build: {
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000, // 调整警告阈值为1000kB
    rollupOptions: {
      output: {
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'static/js/[name]-[hash].js',
        manualChunks: {
          // 拆分大型依赖
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
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      exclude: ['**/*/components', '**/*.d.ts'],
      importMode: 'async',
      dts: './types/vue-router.d.ts',
    }),

    Vue(),

    // svg作为组件加载
    // https://github.com/Jevon617/unplugin-svg-component
    UnpluginSvgComponent({
      iconDir: './src/assets/svg',
      dts: true,
      dtsDir: './types/',
      prefix: 'icon',
      treeShaking: true,
      componentStyle: 'width: 50px; height: 50px;',
    }),

    // 图片压缩
    // https://github.com/FatehAK/vite-plugin-image-optimizer

    // 一个vite插件，当你自动点击浏览器的元素时，它提供了跳转到本地IDE的能力。它支持Vue2&3&SSR
    // 与 unplugin-vue-router 的 definePage 冲突
    // https://github.com/webfansplz/vite-plugin-vue-inspector
    // Inspector(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
      ],
      dirs: ['./src/hooks', './src/utils'],
      dts: './types/auto-import.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './types/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      'unplugin-vue-router',
      'shiki',
    ],
  },
}))
