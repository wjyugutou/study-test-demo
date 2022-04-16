<script lang='ts' setup>
import confetti from 'canvas-confetti'

const props = defineProps<{
  passed: boolean
}>()

function fireworks() {
  const canvas = document.getElementById('fireworks') as HTMLCanvasElement

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  })
  myConfetti({
    particleCount: 100,
    spread: 160,
  // any other options from the global
  // confetti function
  })
}

watch(() => props.passed, (val) => {
  setTimeout(() => {
    fireworks()
  }, 100)
}, { flush: 'post' })

</script>

<template>
  <canvas id="fireworks" />
</template>

<style lang='less' scoped>

</style>
