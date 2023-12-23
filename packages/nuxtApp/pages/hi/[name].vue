<script setup lang="ts">
const router = useRouter()
const route = useRoute()
console.log(route.params.name)
</script>

<template>
  <div>
    <div i-carbon-pedestrian inline-block text-4xl />
    <p>
      Hi, {{ $route.params.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="basic-btn" m-3 mt-8 text-sm
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
