/**
 * const appConfig = useAppConfig()
 * console.log(appConfig.foo)+
 *
 * 更新 appConfig
 * const appConfig = useAppConfig() // { foo: 'bar' }
 * const newAppConfig = { foo: 'baz' }
 * updateAppConfig(newAppConfig)
 * console.log(appConfig) // { foo: 'baz' }
 */

interface AppConfigTheme {
  mode: 'light' | 'dark'
  light: Record<string, string>
  dark: Record<string, string>
}

export default defineAppConfig({
  theme: {
    mode: 'light',
    light: {
      '--bg-color': '#fff',
      '--primary': '#39c',
      '--modal-header-bg': '#fff',
      '--modal-content-bg': '#fff',
      '--modal-footer-bg': '#fff',
      '--mask-bg-light': 'rgb(0 0 0 / 50%)',
      '--footer-height': '52px',
    },
    dark: {
      '--bg-color': '#121212',
      '--primary': '#23566f',
      '--modal-content-bg': '#3b3b3b',
      '--modal-header-bg': '#181818',
      '--modal-footer-bg': '#181818',
      '--mask-bg-light': 'rgb(0 0 0 / 50%)',
      '--footer-height': '52px',
    },
  } as AppConfigTheme,
})
