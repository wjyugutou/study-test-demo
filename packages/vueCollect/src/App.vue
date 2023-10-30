<script lang="ts" setup>

</script>

<template>
  <StarportCarrier>
    <Astralbackground>
      <main min-h="[calc(100vh-52px)]" font-sans p="x-4" relative text="gray-700 dark:gray-200">
        <router-view />
      </main>
      <footer text-center h-52px>
        <Footer />
      </footer>
    </Astralbackground>
  </StarportCarrier>
</template>
