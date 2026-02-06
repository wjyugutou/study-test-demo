<script setup lang="ts">
defineProps<{
  img: string
}>()
const a = ref(false)

const count = ref(0)

function clickHandle() {
  a.value = !a.value
  count.value++
}
</script>

<template>
  <!-- overflow-hidden transition-all duration-1000 relative  hover:border="yellow" -->
  <div class="h-full w-full relative overflow-hidden" @click="clickHandle">
    <img class="h-full w-full" :src="img" alt="">
    <p class="text-white cursor-pointer select-none bottom-0 left-50% absolute -translate-x-50%">
      {{ count }}
    </p>
  </div>
</template>
