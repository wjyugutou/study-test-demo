import type { CustomDirective } from '.'

const [open, close] = useLoading()

const loadingDirective: CustomDirective = {
  name: 'loading',
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

export default loadingDirective
