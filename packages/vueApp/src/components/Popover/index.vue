<script lang='ts' setup>
import type { ArrowOptions, AutoPlacementOptions, FlipOptions, OffsetOptions, Placement, ShiftOptions, Strategy } from '@floating-ui/vue'
import { arrow, autoPlacement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import { eleIsIdNodeChild } from '@yugutou/utils'
import { isBoolean } from 'lodash-es'

interface Props {
  content?: string
  mode?: 'hover' | 'click' | 'both'
  offset?: OffsetOptions
  flip?: FlipOptions
  shift?: ShiftOptions
  arrow?: ArrowOptions
  placement?: Placement
  strategy?: Strategy
  autoPlacement?: AutoPlacementOptions | boolean
}

defineOptions({ name: 'Popover' })

const props = withDefaults(defineProps<Props>(), {
  mode: 'hover',
  offset: 15,
})

const defaultRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const visible = ref(false)
const clickVisible = ref(false)

const middleware = computed(() => {
  const list = [shift(props.shift), offset(props.offset), arrow(Object.assign({
    element: arrowRef,
  }, props.arrow))]

  if (props.autoPlacement)
    list.unshift(autoPlacement(isBoolean(props.autoPlacement) ? undefined : props.autoPlacement))

  else
    list.unshift(flip(props.flip))

  return list
})

const {
  x, y, placement,
  strategy,
  middlewareData,
  isPositioned,
  update,
} = useFloating(defaultRef, contentRef, {
  placement: props.placement,
  strategy: props.strategy,
  middleware,
  whileElementsMounted: autoUpdate,
})

const contentStyle = computed<CSSProperties>(() => {
  return ({
    top: `${y.value || 0}px`,
    left: `${x.value || 0}px`,
    position: strategy.value,
  })
})

const arrowStyle = computed<CSSProperties>(() => ({
  top: `${middlewareData.value.arrow?.y || ''}px`, left: `${middlewareData.value.arrow?.x || ''}px`,
}))

const popoverBound = useElementBounding(contentRef)
const defaultBound = useElementBounding(defaultRef)
const arrowPos = computed(() => {
  switch (placement.value) {
    case 'top':
    case 'top-start':
    case 'top-end':
      return {}
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return {}
    case 'left':
    case 'left-start':
    case 'left-end':
      return {}
    case 'right':
    case 'right-start':
    case 'right-end':
      return {}

    default:
      return undefined
  }
})

function enterHandle() {
  if (props.mode !== 'both' && props.mode !== 'hover')
    return
  visible.value = !visible.value
}

function clickHandle() {
  if (props.mode !== 'both' && props.mode !== 'click')
    return
  const timer = setTimeout(() => {
    clickVisible.value = !clickVisible.value
    clearTimeout(timer)
  }, 0)
}

function leaveHidePopover() {
  visible.value = false
}

function clickHidePopover(e: MouseEvent) {
  if (eleIsIdNodeChild('contentParent', (e.target as Element).parentElement))
    return
  visible.value = false
  clickVisible.value = false
}

function sourceEleBindEvent() {
  if (props.mode === 'hover') {
    defaultRef.value?.addEventListener('pointerenter', enterHandle)
    defaultRef.value?.addEventListener('pointerleave', leaveHidePopover)
  }
  else if (props.mode === 'click') {
    defaultRef.value?.addEventListener('pointerup', clickHandle)
  }
  else {
    defaultRef.value?.addEventListener('pointerup', clickHandle)
    defaultRef.value?.addEventListener('pointerenter', enterHandle)
    defaultRef.value?.addEventListener('pointerleave', leaveHidePopover)
  }
}
function sourceEleRemoveEvent() {
  defaultRef.value?.removeEventListener('pointerenter', enterHandle)
  defaultRef.value?.addEventListener('pointerleave', leaveHidePopover)
  defaultRef.value?.removeEventListener('pointerup', clickHandle)
}

useEventListener(document.documentElement, 'click', clickHidePopover)

onMounted(() => {
  sourceEleBindEvent()
})
onUnmounted(() => {
  sourceEleRemoveEvent()
})
</script>

<template>
  <div ref="defaultRef" w-fit>
    <slot />
  </div>

  <div v-if="visible || clickVisible" id="contentParent" ref="contentRef" px-10px :style="contentStyle" class="popover_container">
    <slot name="content">
      <span>{{ content }}</span>
    </slot>

    <div ref="arrowRef" absolute :style="arrowStyle">
      <slot name="arrow">
        <div class="popover_arrow" />
      </slot>
    </div>
  </div>
</template>

<style>
.popover_container {
  @apply: relative bg-[var(--popover-bg)] rounded-2;
}

.popover_arrow {
  @apply: w-15px h-15px bg-red-400  bg-[var(--popover-bg)];

  background-color: red;
}
</style>
