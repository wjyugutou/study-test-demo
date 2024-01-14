<script setup lang="ts">
import { isDark, toggleDark } from '@/composables/dark'

const router = useRouter()
</script>

<template>
  <nav h-full flex items-center justify-center gap-2 text-xl>
    <button class="icon-btn !outline-none" @click="router.push('/')">
      <div i-carbon-home />
    </button>
    <button class="icon-btn !outline-none" @click="router.push('/blog')">
      <div i-carbon-doc />
    </button>
    <button class="icon-btn !outline-none" @click="toggleDark">
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
