<script lang="ts" setup>
import { imgs } from '../utils/data'

defineOptions({
  name: 'FlipOne',
})

const scale = useSessionStorage('size', 0.25)
const style = computed(() => ({
  width: `${100 * scale.value}rem`,
  height: `${50 * scale.value}rem`,
}))
function toggleHandle() {
  scale.value = scale.value === 0.25 ? 0.125 : 0.25
}
</script>

<template>
  <div>
    <div flex gap-2 justify-center>
      <button class="basicBtn" @click="toggleHandle">
        ToggleSize
      </button>
    </div>

    <NuxtLink
      v-for="item in imgs"
      :key="item.id" :to="`/flip/flipTwo/${item.id}`"
    >
      <div pb-2>
        <Starport :port-id="item.id" :style="style">
          <TheImage :img="item.img" />
        </Starport>
      </div>
    </NuxtLink>
  </div>
</template>
