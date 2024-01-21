import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      // 第三方库的console不打印
      if (log === 'message from third party library' && type === 'stdout')
        return false
    },
  },
})
