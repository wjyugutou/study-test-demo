<script lang='ts' setup>
import { StarportKey } from './constants'

defineOptions({ name: 'StarportProxy' })

const props = withDefaults(defineProps<{
  portId: string | number
  duration?: number
  timingfunc?: string
}>(), {
  duration: 1800, timingfunc: 'cubic-bezier(0.6, 0.3, 0.5, 0.6)',
})

const attrs = useAttrs()

const slots = useSlots()

const injectState = inject(StarportKey)!

const el = ref<HTMLDivElement>()

const portIns = computed(() => injectState.getPortIns(`${props.portId}`, slots.default!()[0])!)

portIns.value.proxy = true

portIns.value.options = {
  duration: props.duration,
  timingfunc: props.timingfunc,
}

portIns.value.attrs = attrs

const id = `starport-${props.portId}`

onMounted(() => {
  portIns.value.el = el.value

  portIns.value.rect = el.value!.getBoundingClientRect()
})

onBeforeUnmount(() => {
  portIns.value.liftOff()
  portIns.value.proxy = false
})
</script>

<template>
  <div :id="id" ref="el" overflow-hidden />
</template>

<style scoped>

</style>
