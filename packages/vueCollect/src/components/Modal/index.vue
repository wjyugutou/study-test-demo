<script lang='ts'>
import { isNumber } from '@vueuse/core'
import type { PropType, VNode } from 'vue'
export default { name: 'Modal' }
</script>

<script lang='ts' setup>
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean,
  },
  appendTo: {
    type: String as PropType<string | Element>,
    default: 'body',
  },
  title: {
    required: true,
    type: String,
  },
  width: {
    type: [String, Number],
    default: 500,
  },
  height: {
    type: [String, Number],
    default: 400,
  },
  content: Object as PropType<VNode | string>,
})

const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
}>()

const instance = getCurrentInstance()
const slots = instance?.slots.default?.()

const style = computed(() => ({
  width: isNumber(props.width) ? `${props.width}px` : props.width,
  height: isNumber(props.height) ? `${props.height}px` : props.height,
}))

function closeHandle() {
  emits('update:modelValue', false)
}
</script>

<template>
  <Teleport v-if="modelValue" :to="appendTo">
    <div :style="style" absolute top="1/2" left="50%" translate-x="-50%" translate-y="-50%" bg-white dark:bg-hex-121212>
      <div class="modal_title">
        {{ title }}
        <div class="modal_close" @click="closeHandle" />
      </div>
      <div class="modal_content">
        <slot v-if="slots" />
        <template v-else>
          {{ content }}
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal_close {
  @apply: absolute top-50% right-0 translate-y--50% i-carbon-close cursor-pointer text-26px
}
.modal_title {
  @apply: pl-4 pr-10 text-7 relative
}
.modal_content {
  @apply: p-4
}
</style>
