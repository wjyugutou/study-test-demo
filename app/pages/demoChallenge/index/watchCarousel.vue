<script lang='ts' setup>
import img1 from '@/assets/images/1.jpg'
import img from '@/assets/images/mio.jpg'

defineOptions({ description: '手表型轮播图' })

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
  <div class="m-auto flex w-500px items-center justify-center relative" :style="{ height: `${radius}px` }">
    <div class="h-500px w-500px perspective-300px transition duration-1s relative">
      <ol ref="carousel" class="preserve-3d h-210px w-full transition absolute">
        <template v-for="i in count" :key="i">
          <li ref="items" class="border border-(2px gray-400) b-rd-4 op-70 h-200px w-500px absolute overflow-hidden">
            <img class="w-full pointer-events-none translate-y--10px" :src="i % 2 === 0 ? img : img1" alt="">
          </li>
        </template>
      </ol>
    </div>
    <div class="arrows flex flex-col gap-5 right-10px top-1/2 absolute -translate-y-1/2">
      <button class="border border-(gray-400) bg-gray-400/50 transform-rotate-180deg transition hover:bg-gray-400" @click="changeActiveUp">
        <div class="i-carbon-caret-down text-8" />
      </button>
      <button class="border border-(gray-400) bg-gray-400/50 transition hover:bg-gray-400" @click="changeActiveDown">
        <div class="i-carbon-caret-down text-8" />
      </button>
    </div>
  </div>
</template>
