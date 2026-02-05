<script lang='ts' setup>
definePageMeta({
  middleware: 'demo-redirect',
})

const router = useRouter()
const route = useRoute()

const footerEnter = ref(false)

const visibleList = ref(false)

const allDemo = router.options.routes.find(item => item.path === '/demoChallenge')!.children!.map(({ name, path }) => ({
  path,
  label: name,
}))

const stop = watchEffect(() => {
  if (router.currentRoute.value.fullPath === '/demoChallenge')
    router.replace(allDemo[0]!.path)
})

const curIndex = computed(() => allDemo.findIndex(item => item.path === router.currentRoute.value.fullPath))

const showDemoList = computed(() => {
  const arr = [allDemo[curIndex.value - 1], allDemo[curIndex.value], allDemo[curIndex.value + 1]]
  return arr.filter(Boolean) as {
    path: string
    label: string
  }[]
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

const title = computed(() => route.fullPath.split('/').at(-1))

onUnmounted(() => {
  stop()
})
</script>

<template>
  <div>
    <header class="mb-8px py-5px flex h-46px items-center justify-center">
      <div
        class="text-hover:gray-200 i-carbon-chevron-left text-(gray-400) color-white h-30px inline-30px left-0 absolute hover:cursor-pointer"
        @click="back"
      />
      <div class="text-20px font-bold">
        {{ title }}
      </div>
    </header>
    <main class="relative overflow-hidden">
      <NuxtPage />
    </main>
    <footer class="text-26px px-2 text-left flex items-center bottom-0 left-0 right-0 justify-between fixed">
      <div class="cursor-pointer z-2" @pointerenter="pointerEnterHandle" @pointerleave="pointerLeaveHandle">
        <template v-if="footerEnter">
          <div v-for="item in showDemoList" :key="item.path">
            <NuxtLink :to="item.path" replace>
              {{ item.label }}
            </NuxtLink>
          </div>
        </template>
        <template v-else>
          {{ allDemo[curIndex]?.label }}
        </template>
      </div>
      <div class="cursor-pointer z-2" @click="listClickHandle">
        list
      </div>
    </footer>
    <Modal v-model="visibleList" title="demoList" :drag="modalDrag">
      <div>
        <p v-for="item in allDemo" :key="item.path" hover:text="[var(--primary)]">
          <NuxtLink :to="item.path">
            {{ item.label }}
          </NuxtLink>
        </p>
      </div>
      <template #footer>
        <button class="basicBtn" @click="modalDrag = !modalDrag">
          切换拖拽 {{ modalDrag }}
        </button>
      </template>
    </Modal>
  </div>
</template>
