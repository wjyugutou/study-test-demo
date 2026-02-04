import type { CustomDirective } from '.'

const authDirective: CustomDirective = {
  name: 'auth',
  beforeMount(el: HTMLElement, binding: any) {
    if (!binding.value) {
      el.remove()
    }
  },
}

export default authDirective
