<script lang='ts' setup>
import { isNumber } from '@vueuse/core'
import type { CSSProperties, Ref } from 'vue'
import { modalProps } from '.'
import { useDrag } from '@/composables'

const props = defineProps(modalProps)

const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
}>()

defineOptions({
  name: 'Modal',
})

const dragEle = ref() as Ref<HTMLElement>

const width = computed(() => isNumber(props.width) ? `${props.width}px` : props.width)

const { x, y } = useDrag(dragEle, !props.drag)

const modalContainerStyle = computed<CSSProperties | undefined>(() => {
  return Object.assign({}, props.style, { transform: props.drag && `translate(${x.value}px, ${y.value}px)` })
})

const modalContentStyle = computed(() => ({
  width: width.value,
}))

function closeHandle() {
  emits('update:modelValue', false)
}

function clickMaskHandle() {
  props.clickMaskClose && closeHandle()
}
</script>

<template>
  <Teleport :to="appendTo" :disabled="!appendTo">
    <Transition name="modal_fade">
      <Overlayer v-show="modelValue" :mask="showMask" :mask-class="maskClass" @click="clickMaskHandle">
        <div :style="modalContainerStyle" class="modal_container" :class="props.class">
          <header ref="dragEle" class="modal_header" :style="{ cursor: drag ? 'move' : 'default' }">
            <template v-if="$slots.header">
              <slot name="header" />
            </template>
            <template v-else>
              <span class="modal_title_text">{{ title }}</span>
            </template>
            <div class="modal_close" @click="closeHandle" @mousedown="(e) => e.stopPropagation()" />
          </header>
          <div class="modal_content" :style="modalContentStyle">
            <slot v-if="$slots.default" />
            <template v-else>
              {{ content }}
            </template>
          </div>

          <footer class="modal_footer" :class="footerClass">
            <template v-if="$slots.footer">
              <slot name="footer" />
            </template>
            <template v-else>
              <div>footer</div>
            </template>
          </footer>
        </div>
      </Overlayer>
    </Transition>
  </Teleport>
</template>

<style>
.modal_container {
  @apply:  w-fit border-1 border-gray-400 border-rd-10px overflow-hidden z-[var(--modal-z-index)] mx-auto mt-15vh;
}
.modal_header {
  @apply: pl-2 pr-10 text-7 border-b-1 border-gray-400 relative  bg-[var(--modal-header-bg)];
}
.modal_title_text {
  user-select: none;
}
.modal_close {
  @apply: absolute top-50% right-2 translate-y--50% i-carbon-close cursor-pointer text-26px;
}
.modal_content {
  @apply: p-4 bg-[var(--modal-content-bg)]
}
.modal_footer {
  @apply: p-4;
}

.modal_fade-enter-active {
  animation: modal-enter 0.4s;
}

.modal_fade-leave-active {
  animation: modal-enter 0.4s reverse;
}

@keyframes modal-enter {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
