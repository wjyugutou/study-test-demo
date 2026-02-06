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
export default defineAppConfig({
  foo: 'bar',
})
