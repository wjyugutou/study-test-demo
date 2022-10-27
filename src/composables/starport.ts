import type { Component, StyleValue } from 'vue'
import { Teleport } from 'vue'

export interface FloatingOptions {
  duration?: number
}

export function createStarport<T extends Component>(component: T, options: FloatingOptions = {}) {
  const metadata = reactive<any>({
    attrs: {},
    props: {},
  })
  const { duration = 1000 } = options

  const proxyEl = ref<HTMLElement>()
  const landed = ref(false)
  /**
   * 起飞
   */
  function liftOff() {
    landed.value = false
  }
  /**
   * 降落
   */
  function land() {
    landed.value = true
  }

  const rect = useElementBounding(proxyEl)

  const container = defineComponent({
    name: 'StarportContainer',
    setup() {
      const style = computed((): StyleValue => {
        const style: StyleValue = {
          position: 'fixed',
          top: `${rect.top.value}px`,
          left: `${rect.left.value}px`,
          width: `${rect.width.value}px`,
          height: `${rect.height.value}px`,
          transition: `all ${duration}ms ease-in-out`,
        }

        if (landed)
          style.display = 'none'

        return style
      })

      const first = ref(true)
      if (first)
        land()

      return () => {
        const teleport = landed.value && proxyEl.value
        const children = [h(component, metadata.attrs)]
        return h('div', {
          style: style.value,
          onTransitionend: async () => {
            await nextTick()
            land()
          },
        }, h(Teleport, {
          to: teleport ? '#container' : 'body',
          disabled: !teleport,
        }, children))
      }
    },
  }) as T

  const proxy = defineComponent({
    name: 'StarportProxy',
    setup(props, { attrs }) {
      metadata.props = props
      metadata.attrs = attrs

      const el = ref<HTMLElement>()

      onMounted(() => {
        proxyEl.value = el.value
      })

      onBeforeUnmount(() => {
        console.log('起飞')

        liftOff()
      })

      return () => h('div', { ref: el, id: 'container' })
    },
  }) as T

  return {
    container,
    proxy,
  }
}
