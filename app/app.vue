<script lang="ts" setup>
import 'vue-sonner/style.css'
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <Toaster expand theme="system" close-button close-button-position="top-right" position="top-center" class="pointer-events-auto" />
</template>
