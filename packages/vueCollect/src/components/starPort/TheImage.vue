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
  <div relative w-full h-full overflow-hidden @click="clickHandle">
    <img w-full h-full :src="img" alt="">
    <p text-white absolute bottom-0 left="50%" translate-x="-50%" cursor-pointer select-none>
      {{ count }}
    </p>
  </div>
</template>
