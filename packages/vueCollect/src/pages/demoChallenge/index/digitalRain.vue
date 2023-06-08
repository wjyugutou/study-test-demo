<script lang='ts' setup>
import { randomNum } from '@yugutou/utils'

defineOptions({
  name: 'DigitalRain',
  label: '数字雨',
})

interface RainList {
  index: number
  length: number
}

const width = ref(0)
const height = ref(0)
const canvasEl = ref<HTMLCanvasElement>()
const fontSize = 24
const time = 5
width.value = window.innerWidth - 32
height.value = window.innerHeight - 52 - 40 - 50

const rowCount = Math.ceil(height.value / fontSize)
const colCount = Math.ceil(width.value / (fontSize))
const data: RainList[] = Array.from({ length: colCount })
  .map(item => ({ index: randomNum(0, rowCount), length: randomNum(rowCount / 2, rowCount + 20) } as RainList))

let canvas: CanvasRenderingContext2D

function initial() {
  function start() {
    canvas = canvasEl.value!.getContext('2d')!
    canvas.fillStyle = '#000'
    canvas.fillRect(0, 0, width.value, height.value)

    animate()
  }

  start()

  window.addEventListener('resize', () => {
    width.value = window.innerWidth - 32
    height.value = window.innerHeight - 52 - 40 - 50
  })
}

let i = 0
function animate() {
  i++
  if (i !== 0 && i < time) {
    requestAnimationFrame(animate)
    return
  }
  i = 0

  canvas.beginPath()

  renderOverlayerRect()

  data.forEach((item, index) => {
    randomText(index * fontSize, item.index * fontSize)
    item.index++
    if (item.index >= item.length) {
      item.index = 0
      item.length = randomNum(0, rowCount)
    }
  })
  canvas.closePath()

  requestAnimationFrame(animate)
}

function renderOverlayerRect() {
  canvas.fillStyle = 'rgba(0, 0, 0, 0.1)'
  canvas.fillRect(0, 0, width.value, height.value)
}

function randomText(x: number, y: number) {
  const start = 1
  const end = 9
  canvas.fillStyle = '#087b15'
  canvas.font = `${fontSize}px STheiti, SimHei`
  const num = randomNum(start, end)

  canvas.fillText(`${num}`, x, y)
}

onMounted(() => {
  initial()
})
</script>

<template>
  <div relative>
    <canvas ref="canvasEl" :width="width" :height="height" bg="#000" />
    <div absolute top-0 left-0 right-0 op-0 hover:op-100 transition-opacity>
      <button class="basicBtn" @click="animate">
        next
      </button>
      <button class="basicBtn" m-l-2 @click="animate">
        reload
      </button>
    </div>
  </div>
</template>

<style lang='less' scoped>

</style>
