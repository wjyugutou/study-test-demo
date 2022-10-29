<script lang='ts' setup>
import asdVue from './asd.vue'
import { debounce, throttle } from '@/utils'

// const asdVue = defineAsyncComponent(() => import('./asd.vue'))
const colorChangeRef = $ref<HTMLDivElement>()
const asd = ref(1)

console.log('component asdVue')

console.log(asdVue.count)

function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

useEventListener(window, 'resize', throttle(() => {
  colorChangeRef.value!.style.backgroundColor = randomColor()
}))

const debounceHandle = debounce(() => {
  colorChangeRef.value!.style.backgroundColor = randomColor()
})

const interSection1 = ref<HTMLDivElement>()
const interSection2 = ref<HTMLDivElement>()
const interSectionParent = ref<HTMLDivElement>()
const createIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    console.log(entries)
  }, {
    // root: interSectionParent,
    threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
  })

  observer.observe(interSection1.value!)
  observer.observe(interSection2.value!)
}

const instance = getCurrentInstance()
onMounted(() => {
  console.log({
    instance,
    parent: instance?.parent,
    $parent: instance?.proxy?.$parent,
  })

  createIntersectionObserver()
})
onBeforeMount(() => {
  console.log('onBeforeMount')
})
console.log('beforeWatch')

watch(asd, (_, oldValue) => {
  console.log('colorChangeRef', asd.value, oldValue)
}, { immediate: true })

watchEffect(() => {
  console.log('watchEffect colorChangeRef', asd.value)
})
</script>

<template>
  <div ref="colorChangeRef" w-50 h-70 bg-red-500 />
  <button bg-blue-500 rounded-6 text-white p-3 @click="debounceHandle">
    debounce
  </button>

  <div ref="interSectionParent" h-300px w-500px bg-pink-500 relative overflow-auto>
    <div h-200px w-full bg-purple />
    <div>
      <div ref="interSection1" p-10 bg-green-500 />
      <div ref="interSection2" ml-10 p-10 bg-green />
    </div>
  </div>

  <div>
    <div v-for="i in 10" :key="i" inline-block>
      <span bg-blue>asdasd</span>
    </div>

    <input type="text" placeholder="asdasd">
    <input type="text" placeholder="asdasd">
  </div>

  <details>
    details标签
  </details>

  <Suspense>
    <!-- 不会加载asd文件 -->
    <template #fallback>
      loading
    </template>
    <asdVue />
  </Suspense>
</template>

<style lang='less' scoped>

</style>
