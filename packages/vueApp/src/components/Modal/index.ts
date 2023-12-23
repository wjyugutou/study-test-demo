import type { PropType, VNode } from 'vue'

export const modalProps = {
  modelValue: {
    required: true,
    type: Boolean,
  },
  appendTo: {
    type: String as PropType<string | Element>,
  },
  title: {
    required: true,
    type: String,
  },
  width: {
    type: [String, Number],
    default: 500,
  },
  showMask: {
    type: Boolean,
    default: true,
  },
  drag: {
    type: Boolean,
    default: true,
  },
  maskClass: { type: Object as PropType<any> },
  clickMaskClose: {
    type: Boolean,
    default: true,
  },
  footerClass: { type: Object as PropType<any> },
  class: { type: Object as PropType<any> },
  style: { type: Object as PropType<any> },
  content: Object as PropType<VNode | string>,
}
