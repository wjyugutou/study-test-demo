<script lang='ts' setup>
import { CanvasConfigKey } from './canstans'
import { createCanvasState } from './state'
import { initDrawFn as bindFn } from './event'

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
  <div relative h-full w-full pt-50px>
    <CanvasTool />
    <div relative h-full w-full overflow-hidden>
      <canvas ref="canvas" h-full w-full border="~ gray-400" />
    </div>
  </div>
</template>
