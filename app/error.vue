<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

function handleError() {
  clearError({
    redirect: '/',
  })
}
</script>

<template>
  <div class="flex-center flex-col h-100vh">
    <h1 class="text-3xl font-bold">
      Error Page
    </h1>
    <h1>ErrorData: {{ error?.data }}</h1>
    <h1>ErrorCode: {{ error?.statusCode || '500' }}</h1>
    <h1>ErrorMessage: {{ error?.message || 'Internal Server Error' }}</h1>
    <button class="color-(green) hover:color-green-500" @click="handleError">
      返回首页
    </button>
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 20px;
  }
</style>
