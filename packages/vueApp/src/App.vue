<script lang="ts" setup>
onErrorCaptured((err, instance, info) => {
  console.log({ err, instance, info })
})
</script>

<template>
  <StarportCarrier>
    <PageBackground>
      <main p="x-4" relative font-sans text="gray-700 dark:gray-200">
        <router-view />
      </main>
      <footer h-52px text-center>
        <Footer />
      </footer>
    </PageBackground>
  </StarportCarrier>
</template>
