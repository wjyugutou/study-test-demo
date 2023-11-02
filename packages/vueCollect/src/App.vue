<script lang="ts" setup>

</script>

<template>
  <StarportCarrier>
    <Astralbackground>
      <main p="x-4" relative font-sans text="gray-700 dark:gray-200">
        <router-view />
      </main>
      <footer h-52px text-center>
        <Footer />
      </footer>
    </Astralbackground>
  </StarportCarrier>
</template>
