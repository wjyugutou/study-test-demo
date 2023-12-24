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

const instance = getCurrentInstance()

const currentIndex = ref(props.initial)
const dataLen = computed(() => instance?.slots.default?.()[0].children?.length as number ?? 0)
provide(CarouselCurrentIndexKey, currentIndex)
provide(CarouselDataLenKey, dataLen)

let t: NodeJS.Timeout

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
  <div class="carousel">
    <div
      class="inner" relative h-full w-full overflow-hidden
      @pointerenter="pointerover" @pointerleave="pointerleave"
    >
      <slot />
      <CarouselDot v-if="dot" />
    </div>
  </div>
</template>
