import type { Directive } from 'vue'

const [open, close] = useLoading()

const loadingDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    if (binding.value)
      open?.(el)
  },
  updated(el: HTMLElement, binding) {
    const value = binding.value
    const oldValue = binding.oldValue

    if (value !== oldValue) {
      if (value && !oldValue)
        open?.(el)
      else
        close?.(el)
    }
  },
  beforeUnmount(el) {
    close?.(el)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('loading', loadingDirective)
})
