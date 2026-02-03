import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'Fira Code:400,500',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition opacity-100 hover:opacity-100 hover:text-teal-600'],
  ],
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
    },
  },
})
