<script lang="ts" setup>
import { TheImageContainer } from '@/composables/image'

defineOptions({
  name: 'Flip',
})

const route = useRoute ()
</script>

<template>
  <div text-2xl mb-10>
    {{ route.fullPath }}
  </div>
  <router-view />
  <TheImageContainer />
</template>
