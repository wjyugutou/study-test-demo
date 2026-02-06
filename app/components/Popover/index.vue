<script lang='ts' setup>
import type { ArrowOptions, AutoPlacementOptions, FlipOptions, OffsetOptions, Placement, ShiftOptions, Strategy } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import { arrow, autoPlacement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
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

// 容器
const wrapperRef = useTemplateRef('wrapperDom')
// 触发器
const triggerRef = ref<HTMLElement | null>(null)
// 内容
const contentRef = useTemplateRef('contentDom')
// 箭头
const arrowRef = useTemplateRef('arrowDom')

// 是否显示
const showPopover = ref(false)
// 离开定时器
const closeTimer = ref<NodeJS.Timeout | null>(null)

// 计算 floating-ui 中间件配置
const middleware = computed(() => {
  const list = [shift(props.shift), offset(props.offset), arrow(Object.assign({
    element: arrowRef,
  }, props.arrow || {}))]

  if (props.autoPlacement)
    list.unshift(autoPlacement(isBoolean(props.autoPlacement) ? undefined : props.autoPlacement))

  else
    list.unshift(flip(props.flip))

  return list
})

// floating-ui 核心功能配置
const {
  x, y,
  strategy,
  middlewareData,
} = useFloating(wrapperRef, contentRef, {
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

// 鼠标进入事件
function enterHandle(e: MouseEvent) {
  console.log('enterHandle', e.target)

  closeTimer.value = null
  if (props.mode !== 'both' && props.mode !== 'hover')
    return

  showPopover.value = true
}

// 鼠标点击事件
function clickHandle() {
  if (props.mode !== 'both' && props.mode !== 'click')
    return
  // const timer = setTimeout(() => {
  showPopover.value = !showPopover.value
  // clearTimeout(timer)
  // }, 0)
}

// 鼠标离开事件
function leaveHidePopover() {
  console.log('leaveHidePopover')
  closeTimer.value = setTimeout(() => {
    showPopover.value = false
    closeTimer.value && clearTimeout(closeTimer.value)
  }, 1000)
}

// 点击trigger以外的事件 隐藏popover
function clickHidePopover(e: MouseEvent) {
  if (eleIsIdNodeChild('contentParent', (e.target as Element).parentElement))
    return
  showPopover.value = false
}

// 鼠标点击trigger元素
useEventListener(triggerRef, 'click', clickHandle)
// 鼠标进入trigger元素
useEventListener(triggerRef, 'mouseenter', enterHandle)
// 鼠标离开trigger元素
useEventListener(triggerRef, 'mouseleave', leaveHidePopover)

// 点击 trigger 之外 隐藏popover
useEventListener(document.documentElement, 'click', clickHidePopover)

// 鼠标进入内容元素
useEventListener(contentRef, 'mouseenter', enterHandle)
// 鼠标离开内容元素
useEventListener(contentRef, 'mouseleave', leaveHidePopover)

onMounted(() => {
  triggerRef.value = wrapperRef.value?.children[0] as HTMLElement
})
</script>

<template>
  <div ref="wrapperDom" class="inline-block w-fit">
    <slot />
  </div>

  <div v-if="showPopover" id="contentParent" ref="contentDom" :style="contentStyle" class="popover-container px-10px">
    <slot name="content">
      <span>{{ content }}</span>
    </slot>

    <div ref="arrowDom" class="absolute" :style="arrowStyle">
      <slot name="arrow">
        <div class="popover_arrow" />
      </slot>
    </div>
  </div>
</template>

<style>
.popover-container {
  --at-apply: relative bg-[var(--popover-bg)] rounded-2;
}

.popover_arrow {
  --at-apply: w-15px h-15px bg-red-400  bg-[var(--popover-bg)];

  background-color: red;
}
</style>
