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

    let prevTop = initTop.value
    let prevLeft = initLeft.value

    const stopMove = useEventListener(document, 'pointermove', mousemoveHandle)
    const stopUp = useEventListener(document, 'pointerup', mouseupHandle)

    function mousemoveHandle(event: MouseEvent) {
      const moveX = event.clientX - downLeft
      const moveY = event.clientY - downTop
      position.y = prevTop + moveY
      position.x = prevLeft + moveX
    }

    function mouseupHandle() {
      prevTop = (position.y!)
      prevLeft = (position.x!)
      stopMove()
      stopUp()
    }
  }

  watch(() => toValue(eleRef), (el) => {
    if (!el || !(el instanceof HTMLElement))
      return
    const rect = el.getBoundingClientRect()

    position.y = rect.top
    position.x = rect.left

    initTop.value = rect.top
    initLeft.value = rect.left
  })

  watch(() => disabled, (v) => {
    if (v)
      stop()
  })

  return toRefs(position) as UseDragReturn
}
