import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') {
    return
  }
  const userStore = useUserStore()
  console.log('auth middleware', userStore.token)

  if (!userStore.token) {
    return navigateTo({ path: '/login', query: { redirect: to.path } })
  }
})
