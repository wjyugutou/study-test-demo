<script lang='ts'>
import { autoPosition } from '@yugutou/utils'
import type { CSSProperties } from 'vue'
import SlotRenderCom from '@/components/SlotRenderCom'
export default { name: 'Popover' }
</script>

<script lang='ts' setup>
interface Props {
  content?: string
  mode?: 'enter' | 'click' | 'both'
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'enter',
})

const slots = useSlots()
const defaultSlots = slots.default?.()[0]
const contentSlots = slots.content?.()[0]

const defaultRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const visible = ref(false)
const destroyObserve = shallowRef<() => void>()
const contentPos = ref<CSSProperties>({ top: 0, left: 0 })

function enterHandle() {
  if (props.mode !== 'both' && props.mode !== 'enter')
    return
  visible.value = !visible.value
}

function clickHandle() {
  if (props.mode !== 'both' && props.mode !== 'click')
    return
  visible.value = !visible.value
}

function hidePopver() {
  if (visible.value !== true)
    visible.value = false
}

function sourceEleBindEvent() {
  defaultRef.value?.addEventListener('pointerenter', enterHandle)
  defaultRef.value?.addEventListener('pointerleave', hidePopver)
  defaultRef.value?.addEventListener('pointerup', clickHandle)
}
function sourceEleRemoveEvent() {
  defaultRef.value?.removeEventListener('pointerenter', enterHandle)
  defaultRef.value?.addEventListener('pointerleave', hidePopver)
  defaultRef.value?.removeEventListener('pointerup', clickHandle)
}

watch(visible, async () => {
  if (!visible)
    return
  await nextTick(() => { })

  const { style, destroy } = autoPosition(defaultRef.value!, contentRef.value!, {}, (style) => {
    contentPos.value = style
  })
  contentPos.value = style

  destroyObserve.value = destroy
})

onMounted(() => {
  document.addEventListener('click', hidePopver)
  sourceEleBindEvent()
})
onUnmounted(() => {
  destroyObserve.value?.()
  sourceEleRemoveEvent()
  document.removeEventListener('click', hidePopver)
})
</script>

<template>
  <div absolute>
    <SlotRenderCom :vnode="defaultSlots" @mounted="(el: HTMLElement) => defaultRef = el" />
    <template v-if="contentSlots">
      <div v-if="visible" absolute bg-white bg:dark="white" px-10px :style="contentPos">
        <SlotRenderCom :vnode="contentSlots" @mounted="(el: HTMLElement) => contentRef = el" />
      </div>
    </template>
    <template v-else>
      {{ content }}
    </template>
  </div>
</template>

<style scoped>

</style>
