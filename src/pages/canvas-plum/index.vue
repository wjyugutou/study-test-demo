<script lang='ts' setup>
const canvas = $ref<HTMLCanvasElement>()
const ctx = $computed(() => canvas!.getContext('2d')!)
const WIDTH = 600
const HEIGHT = 600
const theta = $ref<number>(0.2)

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
function initPlum() {
  ctx.strokeStyle = '#000'
  const branch = {
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 35,
    theta: -Math.PI / 2,
  }
  step(branch)
}
const tasksPending: Function[] = []
function step(b: Branch, depth = 0) {
  const end = getEndpoint(b)
  drawBranch(b)

  if (depth < 2 || Math.random() < 0.6) {
    tasksPending.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta - Math.random() * theta,
    }, depth + 1))
  }
  if (depth < 2 && Math.random() < 0.6) {
    tasksPending.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta + Math.random() * theta,
    }, depth + 1))
  }
}
function frame() {
  const tasks = [...tasksPending]
  tasksPending.length = 0
  tasks.forEach(task => task())
}
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
  <canvas ref="canvas" :width="WIDTH" :height="HEIGHT" border="~ #000" />
</template>

<style lang='less' scoped>

</style>
