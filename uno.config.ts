import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives, // --at-apply: 代替@apply 避免警告信息
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
  },
  presets: [
    presetWind4({
       preflights: {
        reset: true,
      },
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],

  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
