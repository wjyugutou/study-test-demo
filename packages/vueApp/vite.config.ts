import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Inspector from 'unplugin-vue-inspector/vite'
import autoprefixer from 'autoprefixer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// isSsrBuild, isPreview
export default defineConfig(({ command, mode }) => ({
  build: {
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
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

    Vue(),

    // svg作为组件加载
    // https://github.com/Jevon617/unplugin-svg-component
    UnpluginSvgComponent({
      iconDir: './src/static/svg',
      dts: true,
      dtsDir: './types/',
      prefix: 'icon',
      treeShaking: true,
      componentStyle: 'width: 50px; height: 50px;',
    }),

    // 图片压缩
    // https://github.com/FatehAK/vite-plugin-image-optimizer
    ViteImageOptimizer(),

    // 一个vite插件，当你自动点击浏览器的元素时，它提供了跳转到本地IDE的能力。它支持Vue2&3&SSR
    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      exclude: ['**/components', '**/*.d.ts'],
      importMode: 'async',
      dts: './types/vue-router.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
      ],
      dirs: ['./src/composables'],
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
  base: command === 'serve' ? '/' : '/study-test-demo',

}))
