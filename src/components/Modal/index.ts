import { createVNode, render } from 'vue'
import ModalConstructor from './index.vue'

interface ModalOptions {
  [k: string]: any
  appendTo?: string | Element
  title: string
}

type ModalType = typeof ModalConstructor & {
  alert: (options: ModalOptions) => void
}

const Modal = ModalConstructor

Modal.alert = (options: ModalOptions) => {
  const ModalVNode = createVNode(ModalConstructor, options)
  render(ModalVNode, document.body)
}

export default Modal as ModalType
