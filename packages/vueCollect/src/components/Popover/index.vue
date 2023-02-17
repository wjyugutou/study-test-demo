<script lang='ts' setup>
import type { MaybeReadonlyRef, Placement, Strategy } from '@floating-ui/vue'
import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import { getParentIdChild } from '@yugutou/utils'
interface Props {
  content?: string
  mode?: 'enter' | 'click' | 'both'
  offset?: Parameters<typeof offset>[0]
  flip?: Parameters<typeof flip>[0]
  shift?: Parameters<typeof shift>[0]
  arrow?: Parameters<typeof arrow>[0]
  placement: MaybeReadonlyRef<Placement | undefined>
  strategy: MaybeReadonlyRef<Strategy | undefined>
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'enter',
  offset: 10,
})

const defaultRef = ref<Element>()
const contentRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const visible = ref(false)
const clickVisible = ref(false)

const middleware = ref([flip(props.flip), shift(props.shift), offset(props.offset), arrow(Object.assign({
  element: arrowRef,
}, props.arrow))])

const state = useFloating(defaultRef, contentRef, {
  placement: props.placement,
  strategy: props.strategy,
  middleware,
  whileElementsMounted: autoUpdate,
})

const {
  x, y, placement,
  strategy,
  middlewareData,
  isPositioned,
  update,
} = toRefs(state)

watch([x, y, placement,
  strategy,
  middlewareData,
  isPositioned], () => {
  console.log({
    x,
    y,
    placement,
    strategy,
    middlewareData,
    isPositioned,
  })
})

const contentStyle = computed<CSSProperties>(() => ({
  top: `${y.value || 0}px`,
  left: `${x.value || 0}px`,
  position: strategy.value,
}))

const arrowStyle = computed<CSSProperties>(() => ({ top: `${state.middlewareData.value.arrow?.y || ''}px`, left: `${state.middlewareData.value.arrow?.x || ''}px` }))

function enterHandle() {
  if (props.mode !== 'both' && props.mode !== 'enter')
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

function leaveHidePopver() {
  visible.value = false
}

function clickHidePopver(e: MouseEvent) {
  if (getParentIdChild('contentParent', (e.target as Element).parentElement))
    return
  visible.value = false
  clickVisible.value = false
}

function sourceEleBindEvent() {
  if (props.mode === 'enter') {
    defaultRef.value?.addEventListener('pointerenter', enterHandle)
    defaultRef.value?.addEventListener('pointerleave', leaveHidePopver)
  }
  else if (props.mode === 'click') {
    defaultRef.value?.addEventListener('pointerup', clickHandle)
  }
  else {
    defaultRef.value?.addEventListener('pointerup', clickHandle)
    defaultRef.value?.addEventListener('pointerenter', enterHandle)
    defaultRef.value?.addEventListener('pointerleave', leaveHidePopver)
  }
}
function sourceEleRemoveEvent() {
  defaultRef.value?.removeEventListener('pointerenter', enterHandle)
  defaultRef.value?.addEventListener('pointerleave', leaveHidePopver)
  defaultRef.value?.removeEventListener('pointerup', clickHandle)
}

onMounted(() => {
  document.documentElement.addEventListener('click', clickHidePopver)
  sourceEleBindEvent()
})
onUnmounted(() => {
  sourceEleRemoveEvent()
  document.removeEventListener('click', clickHidePopver)
})
</script>

<template>
  <div max-w-max>
    <div ref="defaultRef">
      <slot />
    </div>
    <div v-if="visible || clickVisible" id="contentParent" ref="contentRef" px-10px :style="contentStyle">
      <div ref="arrowRef" w-5 h-5 bg-red-400 absolute :style="arrowStyle" />

      <slot name="content">
        <span>{{ content }}</span>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
