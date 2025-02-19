<script lang='ts' setup>
import type { CSSProperties } from 'vue'

defineOptions({ description: '模糊图片 鼠标在哪里哪里清晰' })

const lens = ref()
const { x, y } = useDrag(lens)

const style = computed(() => ({
  // top: `${y}px`,
  // left: `${x}px`,
  transform: `translate(${x.value}px, ${y.value}px)`,
  backgroundPosition: `${-x.value}px ${-y.value}px`,
} as CSSProperties))
</script>

<template>
  <div class="lens-box">
    <div class="filter-box" h-full w-full />
    <div ref="lens" class="move-box" h-full w-full :style="style" />
  </div>
</template>

<style scoped>
.lens-box {
  overflow: hidden;
  position: relative;
  height: 1144px;

  & > div {
    position: absolute;
    inset: 0;
    background-image: url('../../../assets/images/mio.jpg');
    background-repeat:  no-repeat ;
    background-position: center;
    background-size: 100% 100%;
  }

  & .filter-box {
      filter: blur(7px);
    }

  & .move-box {
    clip-path: circle(100px at center);
    cursor: move;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      border: 1px solid #000;
      border-radius: 50%;
      width: 200px;
      height: 200px;
      box-shadow: inset 0 0 20px #000;
      transform: translate(-50%, -50%);
      content: '';
      pointer-events: none;
    }
  }
}
</style>
