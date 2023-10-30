<script lang='ts' setup>
import img from '@/static/images/mio.jpg'
import img1 from '@/static/images/1.jpg'

const carousel = ref() as Ref<HTMLDivElement>
const items = ref() as Ref<HTMLDivElement[]>

const count = ref(22)
// 半径
const radius = ref(0)
// 每个子元素角度
const theta = 360 / count.value

const index = ref(0)
function rotateFunc() {
  const angel = theta * index.value * -1

  carousel.value.style.transform = `translateZ(${-radius.value}px) rotateX(${-Math.round(angel)}deg)`
}

function initial() {
  radius.value = Math.round((carousel.value.parentElement!.clientWidth / 1.8) / (Math.tan(Math.PI / count.value * 2)))

  items.value.forEach((li, index) => {
    const angel = theta * index

    // 先rotate translateZ的位移方向会变化从而实现效果
    li.style.transform = `rotateX(${-Math.round(angel)}deg) translateZ(${radius.value}px)`
  })
  rotateFunc()
}

function changeActiveUp() {
  index.value++
  rotateFunc()
}
function changeActiveDown() {
  index.value--
  rotateFunc()
}

onMounted(initial)
</script>

<template>
  <div relative w-500px flex items-center justify-center m-auto :style="{ height: `${radius}px` }">
    <div relative w-500px h-500px transition="~ 1s" perspective-300px>
      <ol ref="carousel" absolute w-full h-210px preserve-3d transition="~">
        <template v-for="i in count" :key="i">
          <li ref="items" absolute w-500px h-200px b-rd-4 border="~ 2px gray-400" op-70 overflow-hidden>
            <img w-full pointer-events-none translate-y--10px :src="i % 2 === 0 ? img : img1" alt="">
          </li>
        </template>
      </ol>
    </div>
    <div class="arrows" absolute top="50%" right-10px translate-y="-50%" flex flex-col gap-5>
      <button transform-rotate-180deg border="~ gray-400" hover:bg-gray-400 bg="gray-400/50" transition @click="changeActiveUp">
        <div text-8 i-carbon-caret-down />
      </button>
      <button border="~ gray-400" hover:bg-gray-400 bg="gray-400/50" transition @click="changeActiveDown">
        <div text-8 i-carbon-caret-down />
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
