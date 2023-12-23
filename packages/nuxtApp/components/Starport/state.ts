import type { Component } from 'vue'
import { createStarportInstance } from './instance'
import type { StarportInstance } from './instance'

export function createStarportState() {
  const portMap = reactive<Map<string, StarportInstance>>(new Map())
  const portArr = computed(() => portMap.entries())

  function getPortIns(portId: string, comp: Component): StarportInstance {
    const p = portMap.get(portId)
    if (!p) {
      const ins = createStarportInstance(portId, comp)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      portMap.set(portId, ins)

      return ins
    }

    return p as StarportInstance
  }

  return {
    portMap, portArr, getPortIns,
  }
}

export type StarportState = ReturnType<typeof createStarportState>
