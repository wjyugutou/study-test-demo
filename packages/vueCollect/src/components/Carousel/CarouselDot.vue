<script lang='ts' setup>
import {
  CarouselCurrentIndexKey,
  CarouselDataLenKey,
} from './constans'

const dataLen = inject(CarouselDataLenKey, 0)
const currentIndex = inject(CarouselCurrentIndexKey, 0)
</script>

<template>
  <ul v-if="dataLen > 1" class="dots" flex gap-2 absolute bottom-3px left-5px z-1>
    <li
      v-for="(item, index) of dataLen"
      :key="index"
      class="dot"
      :class="{ 'dot-active': currentIndex === index }"
      @click="currentIndex = index"
    />
  </ul>
</template>

<style>
.dot {
  @apply: rounded-full bg-gray-100/50 w-10px h-10px;
}
.dot-active {
  @apply: bg-gray-700;
}
</style>
./constance
