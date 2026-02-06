import type { Component } from 'vue'

export function createStarportInstance(portId: string, component: Component) {
  const el: Ref<HTMLElement | undefined> = ref()
  const landed = ref(true)
  const rect = ref<DOMRect>()
  const options = ref<{
    duration: number
    timingfunc: string
  }>()
  const attrs = ref<any>()
  const proxy = ref(true)

  function liftOff() {
    landed.value = false
  }
  function land() {
    landed.value = true
  }
  return reactive({
    portId,
    el,
    rect,
    attrs,
    options,
    component,
    landed,
    liftOff,
    land,
    proxy,
  })
}

export type StarportInstance = ReturnType<typeof createStarportInstance>
