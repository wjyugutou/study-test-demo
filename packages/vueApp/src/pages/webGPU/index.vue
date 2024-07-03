<script lang='ts' setup>
import { type WebGPUContext, initWebGPU } from './utils'

const pathMap: Record<string, { default: (data: WebGPUContext) => void }> = import.meta.glob('./render/*.ts', { eager: true })
const nameMap = Object.values(pathMap).reduce((pre, cur) => {
  pre[cur.default.name] = cur.default
  return pre
}, {} as Record<string, any>)

const active = ref(Reflect.ownKeys(nameMap)[0] as string)

const { adapter, device, format } = await initWebGPU()

const canvas = ref() as Ref<HTMLCanvasElement>
const width = ref(0)
const height = ref(0)
const canvasContext = ref() as Ref<GPUCanvasContext>

const data = readonly(reactive({
  adapter,
  device,
  format,
  canvas,
  canvasContext,
}))

function initCanvas() {
  width.value = canvas.value!.parentElement!.clientWidth
  height.value = canvas.value!.parentElement!.clientHeight
  canvasContext.value = canvas.value!.getContext('webgpu')!

  canvasContext.value.configure({
    device: device!, // 染器使用的GPU设备对象
    format: format!,
  })
}

function handleClick(renderFn: any) {
  renderFn(data)
}

onMounted(() => {
  initCanvas()
  nextTick(() => {
    nameMap[active.value](data)
  })
})
</script>

<template>
  <div class="h-[calc(100vh-42px-var(--footer-height))] max-w-full max-h-full">
    <div class="h-42px flex gap-20px">
      <div
        v-for="item, index in nameMap" :key="index"
        class="cursor-pointer hover:text-blue" :class="index === active && 'text-blue'" @click="handleClick(item)"
      >
        {{ index }}
      </div>
    </div>
    <div class="h-[calc(100vh-var(--footer-height))] max-w-full max-h-full">
      <canvas ref="canvas" :width="width" :height="height" />
    </div>
  </div>
</template>

<route lang="json">
  {
    "meta": {
      "starBg": false
    }
  }
</route>
