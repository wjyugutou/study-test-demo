<script lang='ts' setup>
import type { PropType } from 'vue'

defineOptions({ name: 'Overlayer' })

defineProps({
  mask: {
    required: true,
  },
  maskClass: {
    type: Object as PropType<any>,
  },
})

const emits = defineEmits<{
  click: [e: Event]
}>()

function clickHandle(e: Event) {
  emits('click', e)
}
</script>

<template>
  <div v-if="mask" class="mask_container" :class="maskClass" @click.self="clickHandle">
    <slot />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<style>
.mask_container {
  @apply: fixed top-0 left-0 right-0 bottom-0 bg-[var(--mask-bg-light)] z-[var(--mask-z-index)];
}
</style>
