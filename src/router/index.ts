import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: (import.meta.env.DEV ? createWebHistory : createWebHashHistory)(import.meta.env.BASE_URL),
  routes,
})
export default router
