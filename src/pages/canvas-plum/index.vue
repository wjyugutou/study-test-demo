<script lang='ts' setup>
const canvas = $ref<HTMLCanvasElement>()
const ctx = $computed(() => canvas!.getContext('2d')!)
const WIDTH = 600
const HEIGHT = 600
const theta = $ref<number>(0.5)

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  // 角度
  theta: number
}
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function initPlum() {
  const length = 5
  const vertex = [
    {
      start: { x: 0, y: 0 },
      length: length * Math.random() + length,
      theta: Math.PI * getRandomArbitrary(1 / 3, 1 / 6),
    },
    {
      start: { x: WIDTH, y: 0 },
      length: length * Math.random() + length,
      theta: Math.PI * getRandomArbitrary(2 / 3, 5 / 6),
    },
    {
      start: { x: WIDTH, y: HEIGHT },
      length: length * Math.random() + length,
      theta: -Math.PI * getRandomArbitrary(2 / 3, 5 / 6),
    },
    {
      start: { x: 0, y: HEIGHT },
      length: length * Math.random() + length,
      theta: -Math.PI * getRandomArbitrary(1 / 3, 1 / 6),
    },
  ]
  ctx.strokeStyle = '#000'
  vertex.forEach((branch) => {
    step(branch)
  })
}
const tasksPending: Function[] = []
function step(b: Branch, depth = 0) {
  const end = getEndpoint(b)
  drawBranch(b)

  if (depth < 5 || Math.random() < 0.6) {
    tasksPending.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta - (Math.random() * theta * (Math.random() < 0.5 ? 1 : -1)),
    }, depth + 1))
  }
  if (depth < 5 && Math.random() < 0.6) {
    tasksPending.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta + (Math.random() * theta * (Math.random() < 0.5 ? 1 : -1)),
    }, depth + 1))
  }
}
function frame() {
  const tasks = [...tasksPending]
  tasksPending.length = 0
  tasks.forEach(task => task())
}
//
let frameCount = 0
function frameStart() {
  frameCount++
  if (frameCount % 3 === 0)
    frame()

  requestAnimationFrame(frameStart)
}
frameStart()

// 根据起点 随机生成一个终点
function getEndpoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}

function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndpoint(b))
}

onMounted(() => {
  initPlum()
})
</script>

<template>
  <canvas ref="canvas" :width="WIDTH" :height="HEIGHT" mx-auto border="~ #000" />
</template>

<style lang='less' scoped>

</style>
