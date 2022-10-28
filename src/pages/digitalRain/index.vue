<script lang='ts' setup>
const canvasEl = ref<HTMLCanvasElement>()

const width = 1888
const height = 600
const fontSize = 16
let canvas: CanvasRenderingContext2D

function overwhiteRect() {
  canvas.fillStyle = 'rgba(0, 0, 0, 0.1)'
  canvas.fillRect(0, 0, width, height)
}

function randomText(x: number, y: number) {
  const start = 1; const end = 9
  canvas.fillStyle = '#087b15'
  canvas.font = `${fontSize}px STheiti, SimHei`
  const num = Math.floor(Math.random() * (end - start + 1) + start)

  // if (num > 7)
  canvas.fillText(`${num}`, x, y)
}

function init() {
  canvas = canvasEl.value!.getContext('2d')!
  canvas.fillStyle = '#000'
  canvas.fillRect(0, 0, width, height)
  draw()

  // Array(width / fontSize).fill(1).forEach((_, index) => {
  //   draw(24 * index, 24 * index - index)
  // })
}

function draw() {
  canvas.beginPath()
  overwhiteRect()

  Array(width / fontSize).fill(1).forEach((_, index) => {
    randomText(12 * index, 24 + j)
  })

  canvas.closePath()

  requestAnimationFrame(draw)
}

function text(index = 0, count = 10) {
  return () => {

  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <canvas ref="canvasEl" :width="width" :height="height" border="~ #000" />
</template>

<style lang='less' scoped>

</style>
