<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
</script>

<template>
  <nav class="footer text-xl flex gap-2 h-full items-center justify-center">
    <button class="icon-btn !outline-none" @click="router.push('/')">
      <div class="i-carbon-home" />
    </button>
    <button class="icon-btn !outline-none" @click="router.push('/blog')">
      <div class="i-carbon-doc" />
    </button>
    <button class="icon-btn !outline-none" @click="() => toggleDark()">
      <div v-if="isDark" class="i-carbon-moon" />
      <div v-else class="i-carbon-sun" />
    </button>
  </nav>
</template>

<style scoped>
.footer {
  & > button {
    pointer-events: auto;
  }
}
</style>
