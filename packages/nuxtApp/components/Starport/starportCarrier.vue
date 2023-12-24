<script lang='ts' setup>
import { StarportKey } from './constants'
import { createStarportState } from './state'

const state = createStarportState()
provide(StarportKey, state)
</script>

<template>
  <slot />
  <template v-for="[id, port], in state.portArr.value" :key="id">
    <StarportCraft :port-id="id" :component="port.component" />
  </template>
</template>
