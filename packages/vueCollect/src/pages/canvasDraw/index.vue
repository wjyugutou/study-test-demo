<script lang='ts' setup>
defineOptions({ name: 'DrawCanvas' })

const canvas = ref() as Ref<HTMLCanvasElement>
let context = {} as CanvasRenderingContext2D

function init() {
  const clientWidth = canvas.value.clientWidth
  const clientHeight = canvas.value.clientHeight
  canvas.value.width = clientWidth
  canvas.value.height = clientHeight
}

onMounted(() => {
  context = canvas.value.getContext('2d') as CanvasRenderingContext2D
})
</script>

<template>
  <canvas ref="canvas" width="200" height="200" />
</template>

<style scoped>

</style>
