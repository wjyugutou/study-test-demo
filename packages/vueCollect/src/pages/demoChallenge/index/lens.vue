<script lang='ts' setup>
import type { CSSProperties } from 'vue'
import { useDrag } from '@/composables'

defineOptions({ name: 'Lens' })

const lens = ref()
const { x, y } = useDrag(lens)

const style = computed(() => ({
  // top: `${y}px`,
  // left: `${x}px`,
  transform: `translate(${x.value}px, ${y.value}px)`,
  backgroundPosition: `${-x.value}px ${-y.value}px`,
} as CSSProperties))
console.log(style)
</script>

<template>
  <div w-full h-full class="lensBox">
    <div w-full h-full />
    <div ref="lens" w-full h-full :style="style" />
  </div>
</template>

<style scoped>
.lensBox {
  position: relative;
  overflow: hidden;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    background-repeat:  no-repeat ;
    background-size: 100% 100%;
    background-position: center;
    background-image: url('@/static/images/mio.jpg');

    &:nth-child(1) {
      filter: blur(4px);
    }

    &:nth-child(2) {
      clip-path: circle(100px at center);
      cursor: move;

      &::after {
        pointer-events: none;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #000;
        box-shadow: inset 0 0 20px #000;
      }
    }
  }
}
</style>
