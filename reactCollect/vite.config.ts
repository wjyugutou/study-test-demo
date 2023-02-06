import path from 'path'
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React(), Unocss()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
