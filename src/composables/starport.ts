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
  let landed = $ref(false)
  /**
   * 起飞
   */
  function liftOff() {
    landed = false
  }
  /**
   * 降落
   */
  function land() {
    landed = true
  }

  const rect = useElementBounding(proxyEl)

  const container = defineComponent({
    setup() {
      const router = useRouter()

      /**
       * 等待 Teleport 将component插入到指定位置 然后切换路由
       */
      const cleanRouterGuard = router.beforeEach(async () => {
        liftOff()
      })

      onBeforeUnmount(() => {
        cleanRouterGuard()
      })

      const style = $computed((): StyleValue => {
        return {
          position: 'fixed',
          top: `${rect.top.value}px`,
          left: `${rect.left.value}px`,
          width: `${rect.width.value}px`,
          height: `${rect.height.value}px`,
          transition: `all ${duration}ms ease-in-out`,
        }
      })

      return () => {
        const children = [h(component, metadata.attrs)]
        return h('div', {
          style,
          onTransitionend: async () => {
            await nextTick()
            land()
          },
        }, h(Teleport, {
          to: landed ? proxyEl.value : 'body',
          disabled: !landed,
        }, children))
      }
    },
  }) as T

  const proxy = defineComponent({
    setup(props, { attrs }) {
      metadata.props = props
      metadata.attrs = attrs

      const el = ref<HTMLElement>()

      onMounted(() => {
        proxyEl.value = el.value
      })

      onBeforeUnmount(() => {
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
