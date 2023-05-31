<script lang='ts' setup>
defineOptions({
  name: 'DemoChallenge',
})

const router = useRouter()

const footerEnter = ref(false)

const visible = ref(true)

// demo文件列表
const demoList = import.meta.glob<Record<string, any>>('./index/*.vue', { eager: true })
const allDemo = Object.entries(demoList).map(([path, module]) => {
  const label = path.replace('./index/', '').replace('.vue', '')
  return { path: `/demoChallenge/${label}`, label: module?.default?.label || label }
})

const stop = watchEffect(() => {
  if (router.currentRoute.value.fullPath === '/demoChallenge')
    router.replace(allDemo[0].path)
  // visible.value = false
})

const curIndex = computed(() => allDemo.findIndex(item => item.path === router.currentRoute.value.fullPath))

const showDemoList = computed(() => {
  const arr = [allDemo[curIndex.value - 1], allDemo[curIndex.value], allDemo[curIndex.value + 1]]
  return arr.filter(Boolean)
})

function back() {
  router.back()
}

function pointerEnterHandle() {
  footerEnter.value = true
}

function pointerLeaveHandle() {
  footerEnter.value = false
}

function listClickHandle() {
  visible.value = true
}

const modalDrag = ref(false)

onUnmounted(() => {
  stop()
})
</script>

<template>
  <header mb-5>
    <div i-carbon-chevron-left hover:cursor-pointer text="hover:gray-200 gray-400" w-5 h-5 @click="back" />
  </header>
  <main><RouterView /></main>
  <footer fixed bottom-0 left-0 right-0 flex items-center justify-between text-left px-2 text-26px>
    <div cursor-pointer @pointerenter="pointerEnterHandle" @pointerleave="pointerLeaveHandle">
      <template v-if="footerEnter">
        <div v-for="item in showDemoList" :key="item.path">
          <RouterLink :to="item.path">
            {{ item.label }}
          </RouterLink>
        </div>
      </template>
      <template v-else>
        {{ allDemo[curIndex]?.label }}
      </template>
    </div>
    <div cursor-pointer @click="listClickHandle">
      list
    </div>
  </footer>
  <Modal v-model="visible" title="demoList" :drag="modalDrag">
    <div>
      <p v-for="item in allDemo" :key="item.path" hover:text="[var(--primary)]">
        <RouterLink :to="item.path">
          {{ item.label }}
        </RouterLink>
      </p>
    </div>
    <template #footer>
      <button class="basicBtn" @click="modalDrag = !modalDrag">
        切换拖拽 {{ modalDrag }}
      </button>
    </template>
  </Modal>
</template>

<style scoped>

</style>
