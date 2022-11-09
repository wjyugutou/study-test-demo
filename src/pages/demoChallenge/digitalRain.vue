<script lang="ts">
import { randomNum } from '@/utils/random'
export default { label: '数字雨' }
</script>

<script lang='ts' setup>
interface RainList {
  index: number
  length: number
}

const canvasEl = ref<HTMLCanvasElement>()

const width = 1888
const height = 600
const fontSize = 16
let canvas: CanvasRenderingContext2D
const data = ref<RainList[]>([])
const rowCount = Math.ceil(width / (fontSize * 0.8))
const colCount = Math.ceil(height / fontSize)

function overwhiteRect() {
  canvas.fillStyle = 'rgba(0, 0, 0, 0.1)'
  canvas.fillRect(0, 0, width, height)
}

function randomText(x: number, y: number) {
  const start = 1; const end = 9
  canvas.fillStyle = '#087b15'
  canvas.font = `${fontSize}px STheiti, SimHei`
  const num = randomNum(start, end)

  // if (num > 7)
  canvas.fillText(`${num}`, x, y)
}

function init() {
  canvas = canvasEl.value!.getContext('2d')!
  canvas.fillStyle = '#000'
  canvas.fillRect(0, 0, width, height)

  data.value = Array.from({ length: rowCount } as RainList[]).map(item => (item = ({ index: randomNum(0, 15), length: randomNum(15, colCount) })))

  animate()
}
let i = 0

function animate() {
  i++
  if (i !== 0 && i < 20) {
    requestAnimationFrame(animate)
    return
  }
  i = 0

  canvas.beginPath()
  overwhiteRect()

  data.value.forEach((item, index) => {
    randomText(12 * index, 18 * item.index)
    item.index++
    if (item.index === item.length) {
      item.index = 0
      item.length = randomNum(15, colCount)
    }
  })
  canvas.closePath()

  requestAnimationFrame(animate)
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
