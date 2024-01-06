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
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'

// import webfontDownload from 'vite-plugin-webfont-dl'
// import resolve from 'vite-plugin-resolve'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => ({
  css: {
    postcss: {
      plugins: [autoprefixer() as any],
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
      prefix: 'icon',
      treeShaking: true,
      componentStyle: 'width: 50px; height: 50px;',
    }),

    // 图片压缩
    // https://github.com/FatehAK/vite-plugin-image-optimizer
    ViteImageOptimizer(),

    /**
     * 自定义加载模块内容
     * import { version, wj } from 'w'
       console.log({ wj, version })
     */
    // resolve({
    //   w: `
    //   import {version} from 'vue'
    //   const wj = 'wujie吴杰';
    //   export {
    //     version,
    //     wj,
    //   }
    // `,
    // }),

    // 下载并注入网络字体（谷歌字体）以提高网站的性能。
    // https://github.com/feat-agency/vite-plugin-webfont-dl
    // webfontDownload(),

    // 一个vite插件，当你自动点击浏览器的元素时，它提供了跳转到本地IDE的能力。它支持Vue2&3&SSR
    // https://github.com/webfansplz/vite-plugin-vue-inspector
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
    Components({ dts: true }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
  base: command === 'serve' ? '/' : '/study-test-demo',
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
}))
