<script lang='ts' setup>
import type { WebGPUContext } from './utils'
import { initWebGPU } from './utils'

const pathMap: Record<string, { default: (data: WebGPUContext) => void }> = import.meta.glob('./utils/render/*.ts', { eager: true })
const nameMap = Object.values(pathMap).reduce((pre, cur) => {
  pre[cur.default.name] = cur.default
  return pre
}, {} as Record<string, any>)

const active = useSessionStorage('webGPU-activename', Reflect.ownKeys(nameMap)[0] as string)

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
    device, // 染器使用的GPU设备对象
    format,
  })
}

function handleClick(renderName: string) {
  active.value = renderName

  render()
}

let destroy: Promise<() => void>
function render() {
  destroy?.then(res => res())

  nextTick(() => {
    try {
      destroy = nameMap[active.value](data)
    }
    catch (error) {
      console.error(error)
    }
  })
}

let frameCount = 0
let lastTime = performance.now()
const fps = ref('0')

function animate() {
  requestAnimationFrame(animate)
  const currentTime = performance.now()
  frameCount++

  if (currentTime - lastTime >= 1000) {
    fps.value = (frameCount / (currentTime - lastTime) * 1000).toFixed(0)
    frameCount = 0
    lastTime = currentTime
  }
}
animate()
onMounted(() => {
  initCanvas()
  render()
})
</script>

<template>
  <div class="h-[calc(100vh-42px-var(--footer-height))] max-h-full max-w-full relative">
    <div class="right-10 top-10 absolute">
      {{ fps }}
    </div>
    <div class="flex gap-20px h-42px">
      <div
        v-for="item, index in nameMap" :key="index"
        class="cursor-pointer hover:text-blue" :class="index === active && 'text-blue'" @click="handleClick(index)"
      >
        {{ index }}
      </div>
    </div>
    <div class="h-[calc(100vh-var(--footer-height))] max-h-full max-w-full">
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
