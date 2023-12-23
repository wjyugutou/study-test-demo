<script setup lang="ts">
const props = defineProps({
  error: Object,
})
</script>

<template>
  <NuxtLink to="/">
    发生错误。返回首页
  </NuxtLink>
  <div>{{ error }}</div>
</template>
