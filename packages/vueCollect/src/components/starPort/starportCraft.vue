<script lang='ts' setup>
import type { StyleValue } from 'vue'
import { StarportKey } from './constants'

const props = defineProps<{
  portId: string
  component: Component
}>()
defineOptions({ name: 'StarportCraft' })

const injectState = inject(StarportKey)!

const portIns = computed(() => injectState.getPortIns(props.portId, props.component))
const disabled = computed(() => !!(portIns.value.landed && portIns.value.el))

const style = computed<StyleValue>(() => {
  if (!portIns.value.proxy) {
    return {
      display: 'none',
    }
  }
  return {
    ...portIns.value.attrs.style,
    zIndex: portIns.value.landed ? -1 : undefined,
    pointerEvents: 'none',
    overflow: 'hidden',

    position: 'absolute',
    top: `${portIns.value.rect?.top}px`,
    left: `${portIns.value.rect?.left}px`,
    width: `${portIns.value.rect?.width}px`,
    height: `${portIns.value.rect?.height}px`,
    transitionDuration: `${portIns.value.options!.duration}ms`,
    transitionTimingFunction: portIns.value.options!.timingfunc,
  }
})

function transitionEnd() {
  portIns.value.land()
}
</script>

<template>
  <div :style="style" v-bind="portIns.attrs" bg-red @transitionend="transitionEnd">
    <Teleport :to="disabled ? `#starport-${portId}` : 'body'" :disabled="!disabled">
      <Component :is="component" />
    </Teleport>
  </div>
</template>

<style scoped>

</style>
