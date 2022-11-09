<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const footer = ref<Element>()
const main = ref<HTMLAttributes>()

const style = computed(() => {
  return {
    height: footer.value ? `calc(100vh - ${footer.value?.clientHeight}px - 1px) ` : undefined,
  }
})
</script>

<template>
  <main :style="style" font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
  </main>

  <footer ref="footer" text-center>
    <Footer />
  </footer>
</template>

