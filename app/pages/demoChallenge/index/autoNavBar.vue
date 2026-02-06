<script setup lang="ts">
const menuOriginData = [
  { name: '哆啦a梦', id: 1 },
  { name: '宇智波佐助', id: 2 },
  { name: '香蕉之王奥德彪', id: 3 },
  { name: '漩涡鸣人', id: 4 },
  { name: '雏田', id: 5 },
  { name: '大雄', id: 6 },
  { name: '源静香', id: 7 },
  { name: '骨川小夫', id: 8 },
  { name: '超级马里奥', id: 9 },
  { name: '自来也', id: 10 },
  { name: '孙悟空', id: 11 },
  { name: '卡卡罗特', id: 12 },
  { name: '万年老二贝吉塔', id: 13 },
  { name: '小泽玛丽', id: 14 },
]

const navbarScrollRef = useTemplateRef('navbarScrollDom')

const hiddenTagIndex = ref(14)
const showList = ref<typeof menuOriginData>([])
const hiddenList = ref<typeof menuOriginData>([])

const scrollDomButtons = computed(() => {
  return Array.from(navbarScrollRef.value?.querySelectorAll<HTMLButtonElement>('button.navbar-tag') || [])
})

const displayList = computed(() => {
  return showList.value.length > 0 ? showList.value : menuOriginData
})

useIntersectionObserver(scrollDomButtons, (entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio < 1 && entry.intersectionRatio > 0) {
      console.log(entry.target)
    }
  })
})

function handleShowList() {
  const scrollDom = navbarScrollRef.value
  const clientWidth = scrollDom!.clientWidth
  const scrollWidth = scrollDom!.scrollWidth
  if (!scrollDom || scrollWidth <= clientWidth)
    return

  hiddenTagIndex.value -= 1
  showList.value = menuOriginData.slice(0, hiddenTagIndex.value)
  hiddenList.value = menuOriginData.slice(hiddenTagIndex.value)
  showList.value.push({ name: '更多', id: 0 })

  console.log(hiddenTagIndex.value)
  console.log(showList.value, hiddenList.value)
}

const a = ref(false)
function handleClickMore() {
  a.value = true
}

onMounted(() => {
  handleShowList()
})
</script>

<template>
  <div>
    <div class="navbar h-10 w-50% overflow-hidden overflow-x-auto">
      <div ref="navbarScrollDom" class="whitespace-nowrap">
        <template v-for="item, index in displayList" :key="item.name">
          <button class="navbar-tag" type="button" :data-index="index">
            {{ item.name }}
          </button>
        </template>
      </div>
      <div class="whitespace-nowrap">
        <template v-for="item, in displayList" :key="item.name">
          <button v-if="item.id !== 0" class="navbar-tag" type="button">
            {{ item.name }}
          </button>
          <Popover v-else>
            <template #default>
              <button class="navbar-tag" @click="handleClickMore">
                更多
              </button>
            </template>
            <template #content>
              <div v-for="item in hiddenList" :key="item.name">
                <button class="navbar-tag" type="button">
                  {{ item.name }}
                </button>
              </div>
            </template>
          </Popover>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  scrollbar-width: none;

  .navbar-tag {
    --at-apply: m-l-4 h-10 b b-gray-400 rounded p-x-2 hover:(bg-gray-400);
  }
}
</style>
