// https://github.com/vitest-dev/vitest
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
  },
})
