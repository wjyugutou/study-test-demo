<script setup lang="ts">
const { initial } = defineProps<{
  initial?: number
}>()

const { count, inc, dec } = useCounter(initial)
</script>

<template>
  <div>
    {{ count }}
    <button class="inc" @click="inc()">
      +
    </button>
    <button class="dec" @click="dec()">
      -
    </button>
  </div>
</template>
