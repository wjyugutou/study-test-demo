import type { Component } from 'vue'
import type { StarportInstance } from './instance'
import { createStarportInstance } from './instance'

export function createStarportState() {
  const portMap = reactive<Map<string, StarportInstance>>(new Map())
  const portArr = computed(() => portMap.entries())

  function getPortIns(portId: string, comp: Component) {
    let p = portMap.get(portId)
    if (!p) {
      p = createStarportInstance(portId, comp)
      portMap.set(portId, p)
    }

    return p
  }

  return {
    portMap, portArr, getPortIns,
  }
}

export type StarportState = ReturnType<typeof createStarportState>
