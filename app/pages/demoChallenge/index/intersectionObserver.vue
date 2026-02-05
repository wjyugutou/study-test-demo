<script lang='ts' setup>
defineOptions({
  description: 'IntersectionObserver 提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法',
})

const colorChangeRef = ref<HTMLDivElement>()

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
</script>

<template>
  <div ref="colorChangeRef" bg-red-500 h-70 w-50 />
  <button text-white p-3 rounded-6 bg-blue-500 @click="debounceHandle">
    debounce
  </button>

  <div ref="interSectionParent" bg-pink-500 h-300px w-500px relative overflow-auto>
    <div bg-purple h-200px w-full />
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

  <Suspense>
    <!-- 不会加载asd文件 -->
    <template #fallback>
      loading
    </template>
    <AsyncComponent />
  </Suspense>
</template>
