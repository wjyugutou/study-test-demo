import type { Ref } from 'vue'

interface UseDragReturn {
  x: Ref<number>
  y: Ref<number>
}

interface Position {
  x: number
  y: number
}

/** 元素拖拽 */
export function useDrag(eleRef: Ref<HTMLElement>): UseDragReturn {
  let prevTop = 0
  let prevLeft = 0

  const position = reactive<Partial<Position>>({
    x: 0,
    y: 0,
  })

  const stop = useEventListener(eleRef, 'pointerdown', pointerDownHandle)

  function pointerDownHandle(e: PointerEvent) {
    console.log(1)

    toValue(eleRef).setPointerCapture(e.pointerId)
    const downTop = e.y
    const downLeft = e.x

    const stopMove = useEventListener(document, 'pointermove', pointermoveHandle)
    const stopUp = useEventListener(document, 'pointerup', pointerupHandle)

    function pointermoveHandle(event: PointerEvent) {
      console.log(2)

      const moveX = event.x - downLeft
      const moveY = event.y - downTop

      position.y = prevTop + moveY
      position.x = prevLeft + moveX
    }

    function pointerupHandle() {
      prevTop = (position.y!)
      prevLeft = (position.x!)
      stopMove()
      stopUp()

      toValue(eleRef).releasePointerCapture(e.pointerId)
    }
  }

  onUnmounted(stop)
  return toRefs(position) as UseDragReturn
}
