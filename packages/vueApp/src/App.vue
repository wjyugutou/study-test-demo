<script lang="ts" setup>
const route = useRoute()

const starBg = computed(() => route.meta.starBg !== false)
const partBg = computed(() => !!route.meta.partBg)
onErrorCaptured((err, instance, info) => {
  console.log({ err, instance, info })
})
</script>

<template>
  <StarportCarrier>
    <PageBackground :star-bg="starBg" :part-bg="partBg">
      <main class="relative h-[calc(100vh-52px)] overflow-auto px-4 text-gray-700 font-sans dark:text-gray-200">
        <Suspense>
          <template #fallback>
            <Loading />
          </template>
          <RouterView />
        </Suspense>
      </main>
      <footer class="pointer-events-none fixed bottom-0 h-52px w-full text-center">
        <Footer />
      </footer>
    </PageBackground>
  </StarportCarrier>
</template>
