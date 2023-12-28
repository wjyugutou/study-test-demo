import { type Component, type PropType, isVNode } from 'vue'

const SlotRender = defineComponent({
  name: 'SlotRender',
  abstract: true,
  props: ['vnode'],
  emits: {
    mounted() {
      return true
    },
  },
  setup(props, { emit, slots }) {
    onMounted(() => {
      emit('mounted')
    })
    console.log(isVNode(props.vnode))

    return () => slots.default?.()
  },
})
export default SlotRender
