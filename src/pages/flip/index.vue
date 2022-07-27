<script lang="ts" setup>
const route = useRoute ()
</script>

<template>
  <div text-2xl mb-10>
    {{ route.fullPath }}
  </div>
  <router-view />
</template>
