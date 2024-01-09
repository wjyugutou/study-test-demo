<script lang="ts" setup>
onErrorCaptured((err, instance, info) => {
  console.log({ err, instance, info })
})
</script>

<template>
  <StarportCarrier>
    <PageBackground>
      <main class="relative max-h-[calc(100vh-52px)] overflow-auto px-4 text-gray-700 font-sans dark:text-gray-200">
        <RouterView />
      </main>
      <footer h-52px text-center>
        <Footer />
      </footer>
    </PageBackground>
  </StarportCarrier>
</template>
