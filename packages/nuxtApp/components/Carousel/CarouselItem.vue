<script lang='ts' setup>
import type { PropType } from 'vue'
import { CarouselCurrentIndexKey } from './constans'

const props = defineProps({
  data: {
    type: Object as PropType<{
      url: string
      title: string
    }>,
    required: true,
  },
})
const currentIndex = inject(CarouselCurrentIndexKey)
const state = reactive({
  selfIndex: getCurrentInstance()?.vnode.key,
})
</script>

<template>
  <Transition name="carousel">
    <div v-show="currentIndex === state.selfIndex" class="carouselItem" absolute h-full w-full origin-top-left>
      <NuxtImg :src="data.url" :alt="data.title" loading="lazy" preload h-full w-full />
    </div>
  </Transition>
</template>

<style>
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.5s linear;
}

.carousel-enter-active {
  transform: translateX(100%);
}

.carousel-enter-to {
  transform: translateX(0);
}

.carousel-leave-active {
  transform: translateX(-100%);
}
</style>
