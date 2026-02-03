export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/demoChallenge') {
    return navigateTo('/demoChallenge/autoNavBar', { replace: true })
  }
})
