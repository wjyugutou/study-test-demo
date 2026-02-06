import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  toml: false,
  yaml: false,
  test: false,
  jsx: false,
  unocss: true,
  pnpm: true,
  typescript: true,
}, [
  {
    rules: {
      'no-console': 'off',
      // 关闭，可使 对象/数组 自由换行
      'antfu/consistent-list-newline': 'off',
    },
  },
  {
    files: ['*.vue'],
    rules: {
      // vue template标签不自动换行
      'vue/singleline-html-element-content-newline': ['error', {
        externalIgnores: ['button'],
      }],
      // 组件名称 书写方式 自动修复为PascalCase
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
      ],
    },
  },
  {
    files: ['tsconfig.json', 'tsconfig.*.json'],
    rules: {
      // tsconfig.json中的key值排序
      'jsonc/sort-keys': 0,
    },
  },
]))
