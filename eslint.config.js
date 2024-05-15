import yugutouEslint, { reactConfig, typescriptConfig, vueConfig } from '@yugutou/eslint-config'

export default [
  yugutouEslint({
    overrides: {
      'no-undef': 0,
      'no-console': 0,
    }
  }),
  vueConfig(),
  typescriptConfig(),
  reactConfig(),
].flat()
