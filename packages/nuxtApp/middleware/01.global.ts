export default defineNuxtRouteMiddleware((to, from) => {
  console.log('middleware--to: ', { to, from })
  // return navigateTo(to)
})
