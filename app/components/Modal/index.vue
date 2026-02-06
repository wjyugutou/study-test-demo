<script lang='ts' setup>
import type { CSSProperties, Ref } from 'vue'

defineOptions({ name: 'Modal' })

const props = withDefaults(defineProps<Props>(), {
  width: 500,
  showMask: true,
  drag: true,
  clickMaskClose: true,
})
const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
}>()

export interface Props {
  modelValue: boolean
  appendTo?: string | HTMLElement
  title: string
  width?: number
  showMask?: boolean
  drag?: boolean
  maskClass?: string
  clickMaskClose?: boolean
  footerClass?: string
  class?: string
  style?: CSSProperties
  content?: string | number
}

const dragEle = ref() as Ref<HTMLElement>

const width = computed(() => isNumber(props.width) ? `${props.width}px` : props.width)

const { x, y } = useDrag(dragEle)

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
    <Transition name="modal-fade">
      <Overlayer v-if="modelValue" :mask="showMask" :mask-class="maskClass" @click="clickMaskHandle">
        <div :x="x" :y="y" :style="modalContainerStyle" class="modal-container" :class="props.class">
          <header ref="dragEle" class="modal-header" :style="{ cursor: drag ? 'move' : 'default' }">
            <template v-if="$slots.header">
              <slot name="header">
                <span class="modal-title-text">{{ title }}</span>
              </slot>
            </template>
            <div class="modal-close" @click="closeHandle" @pointerdown.stop="(e) => {}" />
          </header>
          <div class="modal-content" :style="modalContentStyle">
            <slot v-if="$slots.default">
              {{ content }}
            </slot>
          </div>

          <footer class="modal-footer" :class="footerClass">
            <template v-if="$slots.footer">
              <slot name="footer" />
            </template>
          </footer>
        </div>
      </Overlayer>
    </Transition>
  </Teleport>
</template>

<style>
.modal-container {
  --at-apply: min-w-400px w-fit border-1 border-gray-400 border-rd-10px overflow-hidden z-[var(--modal-z-index)] mx-auto mt-15vh;
}

.modal-header {
  --at-apply: h-10 pl-2 pr-10 text-7 border-b-1 border-gray-400 relative  bg-[var(--modal-header-bg)];
}

.modal-title-text {
  user-select: none;
}

.modal-close {
  --at-apply: absolute top-50% right-2 translate-y--50% i-carbon-close hover:text-#fff cursor-pointer text-26px;
}

.modal-content {
  --at-apply: p-4 bg-[var(--modal-content-bg)]
}

.modal-footer {
  --at-apply: p-4  bg-[var(--modal-footer-bg)];
}

.modal-fade-enter-active {
  animation: modal-enter 0.4s;
}

.modal-fade-leave-active {
  animation: modal-enter 0.4s reverse;
}

@keyframes modal-enter {
  0% {
    opacity: 0;
    transform: translate(0, -20px);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
