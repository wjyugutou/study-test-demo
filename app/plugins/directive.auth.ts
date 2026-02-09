import type { Directive } from 'vue'

const authDirective: Directive = {
  beforeMount(el: HTMLElement, binding: any) {
    if (!binding.value) {
      el.remove()
    }
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('auth', authDirective)
})
