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
    spread: 70,
    origin: { y: 0.6 },
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
  <canvas id="fireworks" class="z--1 fixed top-0 w-100vw h-100vh" />
</template>

<style  scoped>

</style>
