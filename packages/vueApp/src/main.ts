import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router/auto'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import SvgIcon from '~virtual/svg-component'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles/global.css'

const app = createApp(App)

app.component(SvgIcon.name as string, SvgIcon)

const router = createRouter({
  history: (import.meta.env.DEV ? createWebHistory : createWebHashHistory)(import.meta.env.BASE_URL),
  routes,
})
app
  .use(router)
  .use(Particles, {
    init: async (engine) => {
      await loadFull(engine) // you can load the full tsParticles library from "tsparticles" if you need it
    },
  })
app.mount('#app')
