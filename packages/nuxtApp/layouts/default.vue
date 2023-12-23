<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <main p="x-4" relative font-sans text="gray-700 dark:gray-200">
    <NuxtPage />
  </main>
  <footer h-52px text-center>
    <Footer />
  </footer>
</template>
