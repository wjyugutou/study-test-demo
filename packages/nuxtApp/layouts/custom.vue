<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

console.log(runtimeConfig)
</script>

<template>
  <!-- <StarportCarrier> -->
  <Astralbackground>
    <main p="x-4" relative font-sans text="gray-700 dark:gray-200">
      <NuxtPage />
    </main>
  </Astralbackground>
  <!-- </StarportCarrier> -->
</template>
