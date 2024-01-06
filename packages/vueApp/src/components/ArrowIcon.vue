<script lang='ts' setup>
import type { CSSProperties } from 'vue'

defineOptions({ name: '' })

const props = withDefaults(defineProps<{
  direction?: 'down' | 'up' | 'left' | 'right'
  toDirection?: 'down' | 'up' | 'left' | 'right'
  // s
  duration?: CSSProperties['transition-duration']
  timingFunc?: CSSProperties['transition-timing-function']
  rotate?: boolean
}>(), {
  direction: 'down',
  toDirection: 'right',
  duration: '0.5s',
  timingFunc: 'linear',
  rotate: false,
})

const emits = defineEmits<{
  click: []
}>()

// i-material-symbols-arrow-drop-down-rounded
const arrowClass = computed(() => `i-material-symbols-arrow-drop-${props.direction}-rounded ${props.direction}`)

const style = computed(() => {
  const angleObj = {
    down: { down: 360, up: -180, left: -270, right: -90 },
    up: { down: 180, up: 360, left: -90, right: 90 },
    left: { down: 270, up: 90, left: 360, right: 180 },
    right: { down: 90, up: 270, left: 180, right: 360 },
  }
  return {
    transform: !props.rotate ? undefined : `rotate3d(0, 0, 1, ${angleObj[props.direction][props.toDirection]}deg)`,
  } as CSSProperties
})
</script>

<template>
  <span class="arrow hover:bg-gray-400" :class="arrowClass" :style="style" @click="emits('click')" />
</template>

<style scoped>
.arrow {
  font-size: 24px;
  transition-duration: 0.5s;
  transition-property: all;
  cursor: pointer;
  user-select:none;

}
</style>
