import path from 'node:path'
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return ({
    server: {
      port: 3000,
    },
    plugins: [
      React(),
      Unocss({
        rules: [
          [/^letter-spacing-(\d+)$/, ([, d]) => ({ 'letter-spacing': `${+d / 4}rem` })],
          [/^letter-spacing-(\d+)px$/, ([, d]) => ({ 'letter-spacing': `${d}px` })],
        ],
      }),
      viteMockServe({
        mockPath: './mock', // mock文件存放的位置
        prodEnabled: false,
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'react',
          'react-router-dom',
          'ahooks',
        ],
        dts: true,
      }),
      Pages(),
    ],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
  })
})
