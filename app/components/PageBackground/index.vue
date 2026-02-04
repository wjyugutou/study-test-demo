<script lang="ts" setup>
import CosmicStars from './CosmicStars.vue'
import Tsparticles from './Tsparticles.vue'

defineOptions({ name: 'PageBackground' })
withDefaults(defineProps<{
  starBg: boolean
  partBg: boolean
}>(), {
  starBg: true,
  partBg: false,
})
</script>

<template>
  <ClientOnly>
    <h1>阿三大苏打</h1>
    <CosmicStars v-if="starBg" />
    <Tsparticles v-if="partBg" />
    <slot />
  </ClientOnly>
</template>
