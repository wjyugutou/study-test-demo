<script lang='ts' setup>
const props = withDefaults(defineProps<{
  modelValue: string
  placeholder: string
}>(), {
  modelValue: '',
  placeholder: '',
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const input = ref<HTMLInputElement>()
defineOptions({ name: 'InputAnimate' })

function inputChange(e: Event) {
  emits('update:modelValue', (e.target as any).value)
}

onMounted(() => {
  if (props.modelValue.length > 0)
    input.value!.focus()
})
</script>

<template>
  <div class="inputBox">
    <input ref="input" :value="modelValue" required @change="inputChange">
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
  position: relative;
  font-size: 20px;
  padding-top: 20px;
  display: inline-block;

  & input {
    background-color: transparent;
    padding: 0 10px;
    width: 100%;
    height: 100%;
    outline: none;
    border-bottom: 2px solid #666;

    &:focus,&:valid {
      @apply: dark:b-b-#fff b-b-#000;

      & ~ label span {
        color: #07f419;
        transform: translateY(-30px);
        text-shadow: 0 0 5px  #07f419, 0 0 15px #07f419, 0 0 25px #07f419;
      }
    }
  }

  & label {
    padding: 0 10px;
    position: absolute;
    left: 0;
    pointer-events: none;
    @apply: text-gray-500;

    & span {
      display: inline-block;
      letter-spacing: 0.05em;
      transition-duration: 0.25s;
      transition-timing-function: cubic-bezier(0.5, 1, 0.5, 1.5);
    }
  }
}
</style>
