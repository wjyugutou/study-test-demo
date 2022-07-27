<script lang="ts" setup>
import { TheImageProxy } from '@/composables/image'

const scale = ref(0.25)
const style = computed(() => ({
  width: `${100 * scale.value}rem`,
  height: `${50 * scale.value}rem`,
}))
const toggleHandle = () => {
  scale.value = scale.value === 0.25 ? 0.125 : 0.25
}
</script>

<template>
  <div gap-2 flex justify-center>
    <button btn @click="toggleHandle">
      ToggleSize
    </button>
    <router-link btn to="/flip/flip-two">
      Navigate
    </router-link>
  </div>

  <TheImageProxy :style="style" />
</template>
