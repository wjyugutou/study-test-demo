import { } from '@vueuse/core'

// 根据主题变量设置 CSS 变量到 layer theme
function setCSSVariable(obj: Record<string, string>) {
  const styleSheet = new CSSStyleSheet()
  styleSheet.insertRule(`:root { ${Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(';')}; }`)
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet]
}

export function useTheme() {
  const isClient = import.meta.client
  if (!isClient)
    return

  // 应用主题
  const appConfig = useAppConfig()

  const deviceTheme = useColorMode()

  watchEffect(() => {
    const mode = deviceTheme.value === 'auto' ? appConfig.theme.mode : deviceTheme.value

    updateAppConfig({ mode: deviceTheme.value })

    setCSSVariable(appConfig.theme[mode])
  })
}
