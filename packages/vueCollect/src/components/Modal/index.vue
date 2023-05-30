<script lang='ts' setup>
import { isNumber } from '@vueuse/core'
import type { PropType, Ref, VNode } from 'vue'
import { useDrag } from '@/composables'

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

defineOptions({
  name: 'Modal',
})

const instance = getCurrentInstance()
const slots = instance?.slots.default?.()

const width = computed(() => isNumber(props.width) ? `${props.width}px` : props.width)
const height = computed(() => isNumber(props.height) ? `${props.height}px` : props.height)

const dragEle = ref() as Ref<HTMLElement>

const { top, left } = useDrag(dragEle, {
  top: `calc(50% - ${width.value}/2)`,
  left: `calc(50% - ${height.value}/2)`,
})

const modalContainerStyle = computed(() => {
  return {
    top: top.value,
    left: left.value,
  }
})

const modalContentStyle = computed(() => ({
  width: width.value,
  height: height.value,
}))

function closeHandle(e: Event) {
  emits('update:modelValue', false)
}
</script>

<template>
  <Teleport v-if="modelValue" :to="appendTo">
    <div :style="modalContainerStyle" fixed class="modal_box">
      <header ref="dragEle" class="modal_title" bg="[var(--modal-header-bg)]">
        <span class="modal_title_text">{{ title }}</span>
        <div class="modal_close" @click="closeHandle" @mousedown="(e) => e.stopPropagation()" />
      </header>
      <div class="modal_content" :style="modalContentStyle">
        <slot v-if="slots" />
        <template v-else>
          {{ content }}
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal_box {
  @apply: border-1 border-gray-400 border-rd-15px overflow-hidden
}
.modal_title {
  @apply: pl-4 pr-10 text-7 border-b-1 border-gray-400 relative cursor-move bg-[var(--model-header-bg)]
}
.modal_title_text {
  user-select: none;
}
.modal_close {
  @apply: absolute top-50% right-0 translate-y--50% i-carbon-close cursor-pointer text-26px
}
.modal_content {
  @apply: p-4 bg-[var(--modal-content-bg)]
}
</style>
