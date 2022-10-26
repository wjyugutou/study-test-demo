<script lang="ts" setup>
import { TheImageContainer } from '@/composables/image'
const route = useRoute ()
</script>

<template>
  <div text-2xl mb-10>
    {{ route.fullPath }}
  </div>
  <router-view />
  <TheImageContainer />
</template>
