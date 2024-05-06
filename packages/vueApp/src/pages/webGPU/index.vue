<script lang='ts' setup>
import { onMounted } from 'vue'

async function init() {
  if (!navigator.gpu)
    throw new Error('WebGPU not supported.')

  const adapter = await navigator.gpu.requestAdapter()
  if (!adapter)
    throw new Error('Couldn\'t request WebGPU adapter.')

  const device = await adapter.requestDevice()
}
  
onMounted(() => {
  init()
})
</script>

<template>
  <div class="container">
    <canvas id="gpuCanvas" class="h-100 w-full" />
  </div>
</template>
