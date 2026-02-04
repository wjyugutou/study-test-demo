<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div>
    <h1>{{ error?.statusCode || '500' }}</h1>
    <h1>{{ error?.message || 'Internal Server Error' }}</h1>
    <NuxtLink to="/">
      返回首页
    </NuxtLink>
  </div>
</template>
