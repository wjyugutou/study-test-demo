<script lang="ts" setup>
const route = useRoute()

const starBg = computed(() => route.meta.starBg !== false)
const partBg = computed(() => !!route.meta.partBg)
</script>

<template>
  <StarportCarrier>
    <PageBackground :star-bg="starBg" :part-bg="partBg">
      <main class="text-gray-700 font-sans px-4 p-b-[var(--footer-height)] min-h-[calc(100vh-var(--footer-height))] relative dark:text-gray-200">
        <NuxtPage />
      </main>
      <footer class="text-center h-[var(--footer-height)] w-full pointer-events-none bottom-0 fixed">
        <Footer />
      </footer>
    </PageBackground>
  </StarportCarrier>
</template>
