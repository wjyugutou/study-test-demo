import type { MaybeRef } from 'vue'
import { toValue } from 'vue'

/** 元素拖拽 */
export function useDrag(eleRef: MaybeRef<HTMLElement>, initialValue?: {
  top: string
  left: string
}) {
  const initTop = ref(0)
  const initLeft = ref(0)

  const position = reactive({
    top: initialValue?.top || '0px',
    left: initialValue?.left || '0px',
  })

  function mouseDownHandle(e: MouseEvent) {
    const downTop = e.clientY
    const downLeft = e.clientX

    document.addEventListener('mousemove', mousemoveHandle)

    document.addEventListener('mouseup', mouseupHandle)

    function mousemoveHandle(event: MouseEvent) {
      const moveX = event.clientX - downLeft
      const moveY = event.clientY - downTop
      position.top = `${initTop.value + moveY}px`
      position.left = `${initLeft.value + moveX}px`
    }

    function mouseupHandle() {
      initTop.value = parseInt(position.top)
      initLeft.value = parseInt(position.left)
      document.removeEventListener('mousemove', mousemoveHandle)
      document.removeEventListener('mouseup', mouseupHandle)
    }
  }

  onMounted(() => {
    const element = toValue(eleRef)

    if (!(element instanceof HTMLElement))
      return

    initTop.value = element.getBoundingClientRect().top
    initLeft.value = element.getBoundingClientRect().left
    element.addEventListener('mousedown', mouseDownHandle)
  })

  return toRefs(position)
}
