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
    <div class="p-1 border b-green rounded-1.5 right-4 top-0 fixed z-50">
      <p>starBg: {{ starBg }}</p>
      <p>partBg: {{ partBg }}</p>
    </div>
    <CosmicStars v-if="starBg" />
    <Tsparticles v-if="partBg" />
    <slot />
  </ClientOnly>
</template>
