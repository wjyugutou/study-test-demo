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
  <div relative h-full w-full overflow-hidden @click="clickHandle">
    <NuxtImg h-full w-full :src="img" alt="" />
    <p left="50%" translate-x="-50%" absolute bottom-0 cursor-pointer select-none text-white>
      {{ count }}
    </p>
  </div>
</template>
