<script lang='ts' setup>
import type { ShallowRef } from 'vue'
import { onMounted } from 'vue'
import { initWEBGPU } from '@/utils'

const gpu = navigator.gpu
const adapter = shallowRef() as ShallowRef<GPUAdapter>
const context = shallowRef() as ShallowRef<GPUCanvasContext>
const res = await initWEBGPU()
const device: GPUDevice = res.device
// = shallowRef() as ShallowRef<GPUDevice>
adapter.value = res.adapter

function init() {
  const canvas: HTMLCanvasElement = document.querySelector('#gpuCanvas')!
  context.value = canvas.getContext('webgpu')!
  context.value.configure({
    device,
    format: gpu.getPreferredCanvasFormat(),
  })
}

function create2Dsanjiao() {
  const vertexArray = new Float32Array([
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
  ])
  // 告诉gpu创建一个定点缓冲区
  const buffer = device.createBuffer({
    size: vertexArray.byteLength, // 字节长度
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST, // 缓冲区用途
  })
  // 写入缓冲区
  device.queue.writeBuffer(buffer, 0, vertexArray)

  const pieline = device.createRenderPipeline({
    vertex: {
      buffers: [{
        arrayStride: vertexArray.byteLength / 3, // 一个顶点数据占用的字节长度 3 * 4 数据里包含3个顶点，
        attributes: [{
          shaderLocation: 0, // 把缓冲区标记为0
          format: 'float32x3',
          offset: 0,
        }],
      }],
      module: {},
    },

  })
}

onMounted(() => {
  init()
  create2Dsanjiao()
})
</script>

<template>
  <div class="container">
    <canvas id="gpuCanvas" class="h-100 w-full" />
  </div>
</template>
