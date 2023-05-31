import type { MaybeRef, Ref } from 'vue'
import { toValue } from 'vue'

interface UseDragReturn {
  x: Ref<number>
  y: Ref<number>
}

interface Position {
  x: number
  y: number
}

/** 元素拖拽 */
export function useDrag(eleRef: MaybeRef<HTMLElement>, disabled?: boolean): UseDragReturn {
  const initTop = ref(0)
  const initLeft = ref(0)

  const position = reactive<Partial<Position>>({
    x: undefined,
    y: undefined,
  })

  const stop = useEventListener(eleRef, 'pointerdown', mouseDownHandle)

  function mouseDownHandle(e: MouseEvent) {
    const downTop = e.clientY
    const downLeft = e.clientX

    const stopMove = useEventListener(document, 'pointermove', mousemoveHandle)
    const stopUp = useEventListener(document, 'pointerup', mouseupHandle)

    function mousemoveHandle(event: MouseEvent) {
      const moveX = event.clientX - downLeft
      const moveY = event.clientY - downTop
      position.y = initTop.value + moveY
      position.x = initLeft.value + moveX
    }

    function mouseupHandle() {
      initTop.value = (position.y!)
      initLeft.value = (position.x!)
      stopMove()
      stopUp()
    }
  }

  watchEffect(() => {
    const element = toValue(eleRef)

    if (!(element instanceof HTMLElement) || disabled)
      return

    const rect = element.getBoundingClientRect()

    position.y = rect.top
    position.x = rect.left

    initTop.value = rect.top
    initLeft.value = rect.left
  })

  watch(() => toValue(eleRef), (el) => {
    stop()
    if (!el || !(el instanceof HTMLElement))
      return
    const rect = el.getBoundingClientRect()

    position.y = rect.top
    position.x = rect.left

    initTop.value = rect.top
    initLeft.value = rect.left
  })

  watch(() => disabled, (v) => {
    console.log('disables', v)
    if (v)
      stop()
  })

  return toRefs(position) as UseDragReturn
}
