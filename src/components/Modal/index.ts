import { createVNode, render } from 'vue'
import ModalConstructor from './index.vue'

interface ModalOptions {
  [k: string]: any
  appendTo?: string | Element
  title: string
}

const Modal = {
  alert: (options: ModalOptions) => {
    const ModalVNode = createVNode(ModalConstructor, options)
    render(ModalVNode, document.body)
  },
}

export default ModalConstructor
export const {
  alert,
} = Modal
