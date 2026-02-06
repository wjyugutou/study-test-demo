<script lang='ts' setup>
import { StarportKey } from './constants'
import { createStarportState } from './utils/state'

defineOptions({ name: 'StarportCarrier' })

const state = createStarportState()
provide(StarportKey, state)
</script>

<template>
  <div class="starport-carrier">
    <slot />
    <template v-for="[id, port], in state.portArr.value" :key="id">
      <StarportCraft :port-id="id" :component="port.component" />
    </template>
  </div>
</template>
