<script lang='ts' setup>
import { debounce, throttle } from '@/utils'

const colorChangeRef = ref<HTMLDivElement>()
const asd = ref(1)

console.log('component asdVue')

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

function createIntersectionObserver() {
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
  <div ref="colorChangeRef" h-70 w-50 bg-red-500 />
  <button rounded-6 bg-blue-500 p-3 text-white @click="debounceHandle">
    debounce
  </button>

  <div ref="interSectionParent" relative h-300px w-500px overflow-auto bg-pink-500>
    <div h-200px w-full bg-purple />
    <div>
      <div ref="interSection1" bg-green-500 p-10 />
      <div ref="interSection2" ml-10 bg-green p-10 />
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
    <AsyncComponent />
  </Suspense>
</template>
