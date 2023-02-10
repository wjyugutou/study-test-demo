<script lang='ts' setup>
import randomNum from '@/utils/randomNum'
interface RainList {
  index: number
  length: number
}

const width = ref(0)
const height = ref(0)
const canvasEl = ref<HTMLCanvasElement>()
const fontSize = 16
const time = 15

function initial() {
  width.value = window.innerWidth - 32
  height.value = window.innerHeight - 52 - 40 - 50

  const rowCount = computed(() => Math.ceil(height.value / fontSize))
  const colCount = computed(() => Math.ceil(width.value / (fontSize * 0.7)))
  const data = computed(() => Array.from({ length: colCount.value } as RainList[]).map(item => (item = ({ index: randomNum(0, 15), length: randomNum(15, rowCount.value) }))))
  let canvas: CanvasRenderingContext2D

  function overwhiteRect() {
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

  function start() {
    canvas = canvasEl.value!.getContext('2d')!
    canvas.fillStyle = '#000'
    canvas.fillRect(0, 0, width.value, height.value)

    animate()
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
    overwhiteRect()

    data.value.forEach((item, index) => {
      randomText(12 * index, 18 * item.index)
      item.index++
      if (item.index === item.length) {
        item.index = 0
        item.length = randomNum(15, colCount.value)
      }
    })
    canvas.closePath()

    requestAnimationFrame(animate)
  }

  start()

  window.addEventListener('resize', () => {
    width.value = window.innerWidth - 32
    height.value = window.innerHeight - 52 - 40 - 50
  })
}

setInterval(() => {
  console.log('digital:', 11)
}, 1000)

onMounted(() => {
  initial()
})
</script>

<template>
  <canvas ref="canvasEl" :width="width" :height="height" border="~ #000" bg="#000" />
</template>

<style lang='less' scoped>

</style>
