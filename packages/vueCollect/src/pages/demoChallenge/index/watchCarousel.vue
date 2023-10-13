<script lang='ts' setup>
import img from '@/static/images/mio.jpg'
import img1 from '@/static/images/1.jpg'

const carousel = ref() as Ref<HTMLDivElement>
const items = ref() as Ref<HTMLDivElement[]>

const count = ref(23)

const radius = Math.round((500 / 1.8) / (Math.tan(Math.PI / count.value)))
const theta = 360 / count.value

const index = ref(0)
function rotateFunc() {
  const angel = theta * index.value * -1
  carousel.value.style.transform = `translateZ(${-radius}px) rotateX(${-angel}deg)`
}

function initial() {
  items.value.forEach((li, index) => {
    const angel = theta * index

    // 先rotate translateZ的位移方向会变化从而实现效果
    li.style.transform = `rotateX(${-angel}deg) translateZ(${radius}px)`
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
  <div relative w-500px flex items-center justify-center m-auto top="40%" bg-red>
    <div relative w-500px h-500px pt-150px transition="~ 1s" perspective-300px>
      <ol ref="carousel" absolute w-full h-210px preserve-3d>
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
