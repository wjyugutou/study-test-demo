<script setup lang="ts">
const route = useRoute()
const name = route.params.name

const router = useRouter()
</script>

<template>
  <div class="p-t-80 flex-center flex-col">
    <div class="i-carbon-pedestrian text-4xl inline-block" />
    <p>
      Hi, {{ name }}
    </p>
    <p class="text-sm op50">
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="basicBtn text-sm m-3 mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
