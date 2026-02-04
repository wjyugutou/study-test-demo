export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    console.log('defineNuxtRouteMiddleware', { to, from })
  }
})
