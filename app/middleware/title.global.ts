// 全局路由中间件
export default defineNuxtRouteMiddleware((to, from) => {
  const { $toast } = useNuxtApp()
  // 判断环境
  if (import.meta.client) {
    $toast.info(`title.middleware: ${from.fullPath}->${to.fullPath}`)
  }

  const { public: { appTitle } } = useRuntimeConfig()
  useHead({
    title: to.meta.title ? `${appTitle}-${to.meta.title}` : appTitle,
  })
})
