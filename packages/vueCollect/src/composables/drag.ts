import type { Ref } from 'vue'

export function useDrag(eleRef: Ref<HTMLElement>, initialValue?: {
  top: string
  left: string
}) {
  const initTop = ref(0)
  const initLeft = ref(0)

  const position = reactive({
    top: initialValue?.top || '0px',
    left: initialValue?.left || '0px',
  })

  watch(eleRef, () => {
    if (!eleRef.value)
      return
    initTop.value = eleRef.value.getBoundingClientRect().top
    initLeft.value = eleRef.value.getBoundingClientRect().left
    eleRef.value.addEventListener('mousedown', mouseDownHandle)
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

  return toRefs(position)
}
