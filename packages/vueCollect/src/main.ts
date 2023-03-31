import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
toggleDark(themeMedia.matches)

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
