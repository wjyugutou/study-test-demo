<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="pt-80 flex-center flex-col">
    <h1 class="text-3xl font-bold">
      Error  Page
    </h1>
    <h1>{{ error?.statusCode || '500' }}</h1>
    <h1>{{ error?.message || 'Internal Server Error' }}</h1>
    <NuxtLink to="/demoChallenge/autoNavBar" class="color-(green) hover:color-green-500">
      返回首页
    </NuxtLink>
  </div>
</template>
