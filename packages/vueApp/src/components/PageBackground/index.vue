<script lang="ts" setup>
defineOptions({ name: 'PageBackground' })
const props = withDefaults(defineProps<{
  starBg: boolean
  partBg: boolean
}>(), {
  starBg: true,
  partBg: false,
})
</script>

<template>
  <CosmicStars v-if="starBg" />
  <Tsparticles v-if="partBg" />
  <slot />
</template>
