import { loadSlim } from '@tsparticles/slim'
import VueParticles from '@tsparticles/vue3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueParticles, {
    init: async (engine) => {
      await loadSlim(engine)
    },
  })
})
