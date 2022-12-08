<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const main = ref<HTMLAttributes>()

const style = computed(() => {
  return {
    height: 'calc(100vh - 52px)',
  }
})

console.log(111)
</script>

<template>
  <main :style="style" font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
  </main>

  <footer text-center h-52px>
    <Footer />
  </footer>
</template>

