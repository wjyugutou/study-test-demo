<!-- 编辑器组件 -->
<!--
  <script setup lang="ts">
  const data = ref({
    text: '萨达{1733748787102}{1733748788226}{1733748788984}{1733748789843}{1733748790958}萨达',
    variableIds: [1733748787102, 1733748788226, 1733748788984, 1733748789843, 1733748790958],
  })
  </script>

  <template>
    // 如果需要赋值, 初始化之后在渲染组件
    <EditorDiv v-if="data.text" v-model="data" />
  </template>
  -->

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:modelValue', value: {
    text: string
    variableIds: number[]
  }): void
}>()

const modelValue = defineModel<{
  text: string
  variableIds: number[]
}>()

const text = ref(modelValue.value?.text ?? '')
const variableIds = ref<number[]>(modelValue.value?.variableIds ?? [])
const isComposition = ref(false)
const editor = useTemplateRef('editor')

const html = ref('')

watch(() => modelValue.value, () => {
  text.value = modelValue.value?.text ?? ''
  variableIds.value = modelValue.value?.variableIds ?? []
}, { deep: true, immediate: true })

// 只执行一次, (改变html会导致光标位置发生变化,未解决)
onMounted(() => {
  let str = text.value

  variableIds.value.forEach((id) => {
    str = str.replace(`{${id}}`, createVariableDomStr(id))
  })

  html.value = str
})

function addVariable() {
  const id = new Date().getTime()
  variableIds.value.push(id)

  insertDomAndRestoreCursor(id)
}

function createVariableDomStr(id: number | string) {
  return `<span class="bg-red-500 underline cursor-pointer" contenteditable="false">{${id}}</span>`
}

function createVariableDom(id: number | string) {
  const dom = document.createElement('span')
  dom.classList.add('bg-red-500', 'underline', 'cursor-pointer')
  dom.textContent = `{${id}}`
  return dom
}
// 获取光标位置，插入变量 并且光标位置回到插入dom后的位置
function insertDomAndRestoreCursor(id?: number | string) {
  const target = editor.value as HTMLDivElement
  if (!target)
    return

  target.focus()

  const selection = window.getSelection()!

  const range = selection.getRangeAt(0)
  if (id)
    range.insertNode(createVariableDom(id))
    // 插入后，光标位置回到插入dom后的位置
  window.getSelection()?.removeAllRanges()
  range.collapse(false)
  window.getSelection()?.addRange(range)

  editorInput()
}

function editorInput() {
  if (isComposition.value)
    return

  const target = editor.value as HTMLDivElement
  text.value = target.textContent!
  emit('update:modelValue', {
    text: text.value,
    variableIds: variableIds.value,
  })
}

function compositionstart() {
  isComposition.value = true
}

function compositionend() {
  isComposition.value = false
  text.value = editor.value!.textContent!
}
</script>

<template>
  <div class="p-10">
    <button class="bg-hover:red-500 h-10 w-10 rounded bg-(red-400)" @click="addVariable">
      <i class="i-mdi-plus" />
      添加
    </button>
    <div
      ref="editor"
      class="m-t-4 min-h-20 w-50% b-(1px #000 solid) rounded-2 p-1 outline-none focus:b-blue-400"
      contenteditable="true" @input="editorInput"
      @compositionstart="compositionstart" @compositionend="compositionend" v-html="html"
    />
  </div>
</template>
