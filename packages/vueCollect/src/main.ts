import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles/main.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
