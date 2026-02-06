<script lang='ts' setup>
import type { Position } from '@vueuse/core'
import { CanvasConfigKey } from './canstans'

defineOptions({ name: 'CanvasTool' })
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
  state.setEraser(Number.parseInt((e.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="p-5px border border-(b-0 gray-400) flex gap-x-5px h-50px w-full items-center top-0 absolute z-1">
    <div class="toolitem">
      <label for="strokeStyle" class="gap-5px">
        线条颜色:&nbsp;
      </label>
      <input id="strokeStyle" :value="state.config.strokeStyle" type="color" @change="toolChange">
    </div>
    <div class="toolitem">
      <label for="lineWidth" class="gap-5px">
        线条宽度:&nbsp;
      </label>
      <input id="lineWidth" :value="state.config.lineWidth" type="range" step="1" min="1" max="50" @click="toolChange">
    </div>
    <div class="toolitem">
      <button id="clear" class="btn-mask p-5px border border-(gray-400) b-rd-5px hover:border-(#000 dark:#fff)" @click="clearCanvas">
        清空画布
      </button>
    </div>
    <div class="toolitem">
      <button id="clear" class="btn-mask p-5px border border-(gray-400) b-rd-5px hover:border-(#000 dark:#fff)" :active.attr="!!state.eraser.enabled" @click="state.setEraser(!state.eraser.enabled)">
        橡皮擦
      </button>&nbsp;
      <input id="eraserSize" :value="state.eraser.size" type="range" step="1" min="10" max="50" @change="canvasEraserChange">
    </div>

    <teleport v-if="state.eraser.enabled" :to="state.ctx?.canvas.parentElement || 'body'">
      <div ref="eraser" :style="eraserStyle" class="border border-(#fff) h-20px w-20px pointer-events-none top-0 absolute z-10" />
    </teleport>
  </div>
</template>

<style>
.toolitem {
  --at-apply: flex items-center;
}
</style>
