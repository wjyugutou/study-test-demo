<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const main = ref<HTMLAttributes>()

const style = computed(() => {
  return {
    height: 'calc(100vh - 52px)',
  }
})
</script>

<template>
  <header text-center h-52px>
    <Footer />
  </header>
  <main :style="style" font-sans p="x-4" relative text="center gray-700 dark:gray-200">
    <router-view />
  </main>
</template>

