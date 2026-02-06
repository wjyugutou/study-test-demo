<script lang='ts' setup>
import { CanvasConfigKey } from './canstans'
import { initDrawFn as bindFn } from './event'
import { createCanvasState } from './state'

defineOptions({ name: 'CanvasDraw' })
const canvas = ref() as Ref<HTMLCanvasElement>
const ctx = ref() as Ref<CanvasRenderingContext2D>
const state = createCanvasState(ctx)
const config = computed(() => state.config)

provide(CanvasConfigKey, state)

function initCanvas() {
  const clientWidth = canvas.value.clientWidth
  const clientHeight = canvas.value.clientHeight
  canvas.value.width = clientWidth
  canvas.value.height = clientHeight
  ctx.value = canvas.value.getContext('2d')!

  canvasConfigUpdate()

  bindFn(canvas, ctx.value, state)
}

function canvasConfigUpdate() {
  ctx.value!.strokeStyle = config.value.strokeStyle
  ctx.value!.fillStyle = config.value.fillStyle
  ctx.value!.lineWidth = config.value.lineWidth
  ctx.value!.lineCap = config.value.lineCap
  // ctx.lineJoin = config.lineJoin
}

onMounted(() => {
  initCanvas()
})
</script>

<template>
  <div class="pt-50px h-full w-full relative">
    <CanvasDrawTool />
    <div class="h-full w-full relative overflow-hidden">
      <canvas ref="canvas" class="border border-(gray-400) h-full w-full" />
    </div>
  </div>
</template>
