export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // 处理错误，例如报告到某个服务
    console.error('error-handle:plugin:vue:error', { error, instance, info })
  })
})
