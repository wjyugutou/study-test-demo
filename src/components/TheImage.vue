<script setup lang="ts">
const props = defineProps<{
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
  <div h-full w-full relative overflow-hidden @click="clickHandle">
    <img h-full w-full :src="img" alt="">
    <p left="50%" translate-x="-50%" text-white cursor-pointer select-none bottom-0 absolute>
      {{ count }}
    </p>
  </div>
</template>
