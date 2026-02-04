export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // 处理错误，例如报告到某个服务
    console.error('vue:error', { error, instance, info })
  })

  nuxtApp.hook('app:error', (error) => {
    // 处理错误，例如报告到某个服务
    console.error('app:error', { error })
  })
})
