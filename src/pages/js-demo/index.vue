<script lang='ts' setup>
import { debounce, throttle } from '@/utils'

const colorChangeRef = $ref<HTMLDivElement>()

function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

useEventListener(window, 'resize', throttle(() => {
  colorChangeRef.style.backgroundColor = randomColor()
}))

const debounceHandle = debounce(() => {
  colorChangeRef.style.backgroundColor = randomColor()
})
</script>

<template>
  <div ref="colorChangeRef" w-50 h-70 bg-red-500 />
  <button bg-blue-500 rounded-6 text-white p-3 @click="debounceHandle">
    debounce
  </button>
</template>

<style lang='less' scoped>

</style>
