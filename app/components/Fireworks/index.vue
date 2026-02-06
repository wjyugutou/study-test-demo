<script lang='ts' setup>
import confetti from 'canvas-confetti'

defineOptions({ name: 'Fireworks' })

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

watch(() => props.passed, () => {
  setTimeout(() => {
    fireworks()
  }, 100)
}, { flush: 'post' })
</script>

<template>
  <canvas id="fireworks" class="h-100vh w-100vw top-0 fixed z--1" />
</template>
