import type { Props as ModalProps } from '@/components/Modal/index.vue'
import { render } from 'vue'
import Modal from '@/components/Modal/index.vue'

interface CreateContainerOptions {
  id?: string
  className?: string
  tag?: string
}

const containerMap: Map<string, HTMLElement> = new Map()

function createContainer(options: CreateContainerOptions) {
  if (options.id && containerMap.has(options.id)) {
    return containerMap.get(options.id)!
  }

  const container = document.createElement(options.tag || 'div')
  const id = options.id || `modal-${Date.now()}`
  container.id = id
  containerMap.set(id, container)
  options.className && (container.className = options.className)
  return container
}

interface ModalOptions {
  props?: Partial<ModalProps>
  [name: string]: unknown
}

const modalRootId = 'modal-root-container'

function getModalRootContainer() {
  const modalRootContainer = document.getElementById(modalRootId) || createContainer({
    tag: 'div',
    id: modalRootId,
    className: 'modal-root-container',
  })
  document.body.appendChild(modalRootContainer)

  return modalRootContainer
}

function getAppendContainer(appendTo: ModalProps['appendTo']) {
  let appendContainer: HTMLElement
  if (appendTo && typeof appendTo === 'string') {
    const el: HTMLElement | null = document.querySelector(appendTo)
    if (!el)
      throw new Error('appendTo element not found')
    appendContainer = el
  }
  else if (appendTo && typeof appendTo === 'object') {
    appendContainer = appendTo as HTMLElement
  }
  else {
    appendContainer = getModalRootContainer()
  }
  return appendContainer
}

export function useModal(options: ModalOptions) {
  const container = createContainer({
    className: 'modal-container',
  })
  const rootContainer = getAppendContainer(options.props?.appendTo)

  const vNode = h(Modal, {
    'modelValue': true,
    ...(options.props || {}),
    'onUpdate:modelValue': (val: boolean) => {
      if (!val)
        close()
    },
  } as ModalProps)

  open()

  function open() {
    render(vNode, container)
    rootContainer.appendChild(container)
  }

  function close() {
    container.remove()
    containerMap.delete(container.id)
  }

  return {
    open,
    close,
  }
}
