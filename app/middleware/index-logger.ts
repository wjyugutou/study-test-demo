export default defineNuxtRouteMiddleware((to, from) => {
  console.log('index', { to, from })
})
