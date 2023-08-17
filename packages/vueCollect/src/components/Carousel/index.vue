<script lang='ts' setup>
import { CarouselCurrentIndexKey, CarouselDataLenKey } from './constans'

const props = defineProps({
  autoplay: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  initial: {
    type: Number,
    default: 0,
  },
  dot: {
    type: Boolean,
    default: true,
  },
  director: {
    type: Boolean,
    default: true,
  },
})

defineOptions({ name: 'Carousel' })

const instance = getCurrentInstance()

const currentIndex = ref(props.initial)
const dataLen = computed(() => instance?.slots.default?.()[0].children?.length as number ?? 0)
provide(CarouselCurrentIndexKey, currentIndex.value)
provide(CarouselDataLenKey, dataLen.value)

let t: NodeJS.Timer

function setIndex(type: 'next' | 'prev') {
  switch (type) {
    case 'next':
      currentIndex.value++
      if (currentIndex.value >= dataLen.value)
        currentIndex.value = 0
      break
    case 'prev':
      currentIndex.value--
      if (currentIndex.value <= dataLen.value)
        currentIndex.value = dataLen.value - 1
      break
    default:
      break
  }
}

function autoPlay() {
  t = setInterval(() => {
    setIndex('next')
  }, props.duration)
}

function pointerover() {
  clearInterval(t)
}

function pointerleave() {
  autoPlay()
}

onMounted(() => {
  if (props.autoplay)
    autoPlay()
})

onUnmounted(() => {
  clearInterval(t)
})
</script>

<template>
  <div class="carousel" mx-auto my-0>
    <div
      class="inner" w-full h-full relative overflow-hidden
      @pointerenter="pointerover" @pointerleave="pointerleave"
    >
      <slot />
      <CarouselDot v-if="dot" />
    </div>
  </div>
</template>
./constance
