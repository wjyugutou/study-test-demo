<script lang='ts' setup>
defineOptions({ name: 'InputAnimate' })
const props = withDefaults(defineProps<{
  modelValue: string
  placeholder: string
}>(), {
  modelValue: '',
  placeholder: '',
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', ev: string): void
  (e: 'change', ev: string): void

}>()
const inputRef = useTemplateRef<HTMLInputElement>('input')

function inputChange(e: Event) {
  const target: HTMLInputElement = e.target as HTMLInputElement
  emits('change', target.value)
}

function inputInput(e: Event) {
  const target: HTMLInputElement = e.target as HTMLInputElement
  emits('update:modelValue', target.value)
  emits('input', target.value)
}

onMounted(() => {
  if (props.modelValue.length > 0)
    inputRef.value!.focus()
})
</script>

<template>
  <div class="inputBox">
    <input ref="input" :value="modelValue" required @change="inputChange" @input="inputInput">
    <label>
      <span
        v-for="v, i in placeholder.length" :key="i" :style="{
          transitionDelay: `${i * 30}ms`,
          filter: `hue-rotate(${i * 15}deg)`,
        }"
      >
        {{ placeholder[i] }}
      </span>
    </label>
  </div>
</template>

<style scoped>
.inputBox {
  display: inline-block;
  position: relative;
  padding-top: 20px;
  font-size: 20px;

  & label {
    position: absolute;
    left: 0;
    padding: 0 10px;
    pointer-events: none;

    --at-apply: text-gray-500;

    & span {
      display: inline-block;
      letter-spacing: 0.05em;
      transition-timing-function: cubic-bezier(0.5, 1, 0.5, 1.5);
      transition-duration: 0.25s;
    }
  }

  & input {
    border-bottom: 2px solid #666;
    padding: 0 10px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    outline: none;

    &:focus,&:valid {
      --at-apply: dark:b-b-#fff b-b-#000;

      & ~ label span {
        color: #07f419;
        text-shadow: 0 0 5px  #07f419, 0 0 15px #07f419, 0 0 25px #07f419;
        transform: translateY(-30px);
      }
    }
  }

}
</style>
