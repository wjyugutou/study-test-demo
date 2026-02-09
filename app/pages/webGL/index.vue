<script lang='ts' setup>
definePageMeta({
  starBg: false,
})

const router = useRouter()
const route = useRoute()

const pathMap: Record<string, { default: any }> = import.meta.glob('./components/*.vue', { eager: true })
const nameMap = Object.values(pathMap).reduce((pre, cur) => {
  pre[cur.default.__name] = cur.default
  return pre
}, {} as Record<string, any>)

if (!route.query.type) {
  router.push({
    query: {
      type: Reflect.ownKeys(nameMap)[0] as string,
    },
  })
}

const component = computed(() => nameMap[route.query.type as string])

function handleClick(com: any) {
  router.push({
    query: {
      type: com.__name,
    },
  })
}
</script>

<template>
  <div class="h-[calc(100vh-var(--footer-height))] max-h-full max-w-full">
    <div class="flex gap-20px h-42px">
      <div
        v-for="item, index in nameMap" :key="index"
        class="cursor-pointer hover:text-blue" :class="index === route.query.type && 'text-blue'"
        @click="handleClick(item)"
      >
        {{ index }}
      </div>
    </div>
    <div>
      <component :is="component" />
    </div>
  </div>
</template>
