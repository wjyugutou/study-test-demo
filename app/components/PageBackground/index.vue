<script lang="ts" setup>
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
    <CosmicStars v-if="starBg" />
    <Tsparticles v-if="partBg" />
    <slot />
  </ClientOnly>
</template>
