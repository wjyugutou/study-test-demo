<script lang='ts' setup>
import img from '@/static/images/mio.jpg'
import img1 from '@/static/images/1.jpg'

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
  <div relative m-auto w-500px flex items-center justify-center :style="{ height: `${radius}px` }">
    <div transition="~ 1s" relative h-500px w-500px perspective-300px>
      <ol ref="carousel" absolute h-210px w-full preserve-3d transition="~">
        <template v-for="i in count" :key="i">
          <li ref="items" border="~ 2px gray-400" absolute h-200px w-500px overflow-hidden b-rd-4 op-70>
            <img pointer-events-none w-full translate-y--10px :src="i % 2 === 0 ? img : img1" alt="">
          </li>
        </template>
      </ol>
    </div>
    <div class="arrows" absolute top="50%" right-10px translate-y="-50%" flex flex-col gap-5>
      <button border="~ gray-400" bg="gray-400/50" transform-rotate-180deg transition hover:bg-gray-400 @click="changeActiveUp">
        <div i-carbon-caret-down text-8 />
      </button>
      <button border="~ gray-400" bg="gray-400/50" transition hover:bg-gray-400 @click="changeActiveDown">
        <div i-carbon-caret-down text-8 />
      </button>
    </div>
  </div>
</template>
