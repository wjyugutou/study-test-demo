const SlotRenderCom = defineComponent({
  name: 'SlotRenderCom',
  props: ['vnode'],
  emits: {
    mounted(el: HTMLElement) {
      return el
    },
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    onMounted(() => {
      emit('mounted', instance?.proxy?.$el)
    })
    return () => props.vnode
  },
})
export default SlotRenderCom
