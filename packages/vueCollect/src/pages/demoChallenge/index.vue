<script lang='ts' setup>
defineOptions({
  name: 'DemoChallenge',
})

const router = useRouter()

const footerEnter = ref(false)

const visibleList = ref(false)

// demo文件列表
const demoList = import.meta.glob<Record<string, any>>('./index/*.vue', { eager: true })

const allDemo = Object.entries(demoList).map(([path, module]) => {
  const label = path.replace('./index/', '').replace('.vue', '')
  return { path: `/demoChallenge/${label}`, label: module?.default?.label || label }
})

const stop = watchEffect(() => {
  if (router.currentRoute.value.fullPath === '/demoChallenge')
    router.replace(allDemo[0].path)
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
  visibleList.value = true
}

const modalDrag = ref(true)

router.beforeEach(() => {
  visibleList.value = false
})

const r = useRoute()
const title = r.fullPath.split('/').at(-1)

onUnmounted(() => {
  stop()
})
</script>

<template>
  <header h-46px mb-8px py-2 flex justify-center items-center>
    <div
      i-carbon-chevron-left hover:cursor-pointer
      text="hover:gray-200 gray-400" inline-30px h-30px
      absolute left-0
      @click="back"
    />
    <div font-bold text-20px>
      {{ title }}
    </div>
  </header>
  <main min-h="[calc(100%-52px-39px)]">
    <RouterView />
  </main>
  <footer absolute bottom-0 left-0 right-0 flex items-center justify-between text-left px-2 text-26px>
    <div cursor-pointer @pointerenter="pointerEnterHandle" @pointerleave="pointerLeaveHandle">
      <template v-if="footerEnter">
        <div v-for="item in showDemoList" :key="item.path">
          <RouterLink :to="item.path" replace>
            {{ item.label }}
          </RouterLink>
        </div>
      </template>
      <template v-else>
        {{ allDemo[curIndex]?.label }}
      </template>
    </div>
    <Counter />
    <div cursor-pointer @click="listClickHandle">
      list
    </div>
  </footer>
  <Modal v-model="visibleList" title="demoList" :drag="modalDrag">
    <div>
      <p v-for="item in allDemo" :key="item.path" hover:text="[var(--primary)]">
        <RouterLink :to="item.path">
          {{ item.label }}
        </RouterLink>
      </p>
    </div>
    <template #footer>
      <button class="basic-btn" @click="modalDrag = !modalDrag">
        切换拖拽 {{ modalDrag }}
      </button>
    </template>
  </Modal>
</template>

<style scoped>

</style>
