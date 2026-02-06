<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
</script>

<template>
  <nav class="footer text-xl flex gap-2 h-full items-center justify-center">
    <button class="icon-btn !outline-none">
      <div i-carbon-home />
    </button>
    <button class="icon-btn !outline-none" @click="router.push('/blog')">
      <div i-carbon-doc />
    </button>
    <button class="icon-btn !outline-none" @click="() => toggleDark()">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>

    <!-- <a
      class="icon-btn"
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    /> -->
  </nav>
</template>

<style scoped>
.footer {
  & > button {
    pointer-events: auto;
  }
}
</style>
