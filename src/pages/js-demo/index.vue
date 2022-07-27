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

const interSection1 = $ref<HTMLDivElement>()
const interSection2 = $ref<HTMLDivElement>()
const interSectionParent = $ref<HTMLDivElement>()
const createIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    console.log(entries)
  }, {
    // root: interSectionParent,
    threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
  })

  observer.observe(interSection1)
  observer.observe(interSection2)
}
onMounted(() => {
  createIntersectionObserver()
})
</script>

<template>
  <div ref="colorChangeRef" w-50 h-70 bg-red-500 />
  <button bg-blue-500 rounded-6 text-white p-3 @click="debounceHandle">
    debounce
  </button>

  <div ref="interSectionParent" h-1000px w-500px bg-pink-500 relative overflow-auto>
    <div h-2000px w-full bg-purple />
    <div>
      <div ref="interSection1" p-10 bg-green-500 />
      <div ref="interSection2" ml-10 p-10 bg-green />
    </div>
  </div>
</template>

<style lang='less' scoped>

</style>
