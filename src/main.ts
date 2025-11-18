import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
import { createApp } from 'vue'
import SvgIcon from '~virtual/svg-component'
import App from './App.vue'
import router from './router'

import 'virtual:uno.css'
import './styles/global.css'

const app = createApp(App)

app.component(SvgIcon.name as string, SvgIcon)

app
  .use(router)
  .use(Particles, {
    init: async (engine) => {
      await loadFull(engine) // you can load the full tsParticles library from "tsparticles" if you need it
    },
  })
app.mount('#app')
