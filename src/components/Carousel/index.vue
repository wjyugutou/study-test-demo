<script lang='ts' setup>
import { currentIndexKey, dataLenKey } from '.'
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
const dataLen = computed(() => instance.slots.default()[0].children.length as number)
provide(currentIndexKey, currentIndex)
provide(dataLenKey, dataLen)

let t: NodeJS.Timer

const setIndex = (type: 'next' | 'prev') => {
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

const autoPlay = () => {
  t = setInterval(() => {
    setIndex('next')
  }, props.duration)
}

const pointerover = () => {
  clearInterval(t)
}

const pointerleave = () => {
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

<style scoped>

</style>
