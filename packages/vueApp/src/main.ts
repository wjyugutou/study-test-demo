import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'
import SvgIcon from '~virtual/svg-component'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles/global.css'

const app = createApp(App)

app.component(SvgIcon.name, SvgIcon)

const router = createRouter({
  history: (import.meta.env.DEV ? createWebHistory : createWebHashHistory)(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
