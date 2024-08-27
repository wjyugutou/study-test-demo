<script lang='ts' setup>
const canvas = ref() as Ref<HTMLCanvasElement>
const width = ref(0)
const height = ref(0)
const canvasContext = ref() as Ref<GPUCanvasContext>
function initCanvas() {
  width.value = canvas.value!.parentElement!.clientWidth
  height.value = canvas.value!.parentElement!.clientHeight
  canvasContext.value = canvas.value!.getContext('webgpu')!
}
onMounted(() => {
  initCanvas()
  render()
})
</script>

<template>
  <div class="h-[calc(100vh-42px-var(--footer-height))] max-w-full max-h-full relative">
    <div class="absolute top-10 right-10">
      {{ fps }}
    </div>
    <div class="h-42px flex gap-20px">
      <div
        v-for="item, index in nameMap" :key="index"
        class="cursor-pointer hover:text-blue" :class="index === active && 'text-blue'" @click="handleClick(index)"
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
