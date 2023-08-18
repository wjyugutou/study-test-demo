<script lang='ts' setup>
import type { Position } from '@vueuse/core'
import { CanvasConfigKey } from './canstans'

const state = inject(CanvasConfigKey)!
const eraser = ref<HTMLDivElement>()

const eraserStyle = computed(() => {
  return {
    width: `${state.eraser.size}px`,
    height: `${state.eraser.size}px`,
    transformOrigin: 'center',
    transform: `translate3d(calc(${(state.eraser as Position).x}px - 50%), calc(${(state.eraser as Position).y}px - 50%), 0)`,
  }
})

function toolChange(e: Event) {
  const value = (e.target as HTMLInputElement)!.value

  state.setConfig({
    [(e.target as HTMLInputElement)!.id]: value,
  })
}

function clearCanvas() {
  state.ctx.clearRect(0, 0, state.ctx.canvas.width, state.ctx.canvas.height)
}

function canvasEraserChange(e: Event) {
  state.setEraser(parseInt((e.target as HTMLInputElement).value))
}
</script>

<template>
  <div absolute top-0 flex items-center gap-x-5px w-full h-50px p-5px border="~ gray-400" border-b="0" z-1>
    <div class="toolitem ">
      <label for="strokeStyle" gap-5px>
        线条颜色:&nbsp;
      </label>
      <input id="strokeStyle" :value="state.config.strokeStyle" type="color" @change="toolChange">
    </div>
    <div class="toolitem ">
      <label for="lineWidth" gap-5px>
        线条宽度:&nbsp;
      </label>
      <input id="lineWidth" :value="state.config.lineWidth" type="range" step="1" min="1" max="50" @click="toolChange">
    </div>
    <div class="toolitem ">
      <button id="clear" class="btnMask" p-5px b-rd-5px border="~ gray-400" hover:border="#000 dark:#fff" @click="clearCanvas">
        清空画布
      </button>
    </div>
    <div class="toolitem ">
      <button id="clear" class="btnMask" :active.attr="!!state.eraser.enabled" p-5px b-rd-5px border="~ gray-400" hover:border="#000 dark:#fff" @click="state.setEraser(!state.eraser.enabled)">
        橡皮擦
      </button>&nbsp;
      <input id="eraserSize" :value="state.eraser.size" type="range" step="1" min="10" max="50" @change="canvasEraserChange">
    </div>

    <teleport v-if="state.eraser.enabled" :to="state.ctx?.canvas.parentElement || 'body'">
      <div ref="eraser" absolute top-0 pointer-events-none :style="eraserStyle" z-10 w-20px h-20px border="~ #fff" />
    </teleport>
  </div>
</template>

<style>
.toolitem {
  @apply: flex items-center;
}
</style>
