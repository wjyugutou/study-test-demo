<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()
</script>

<template>
  <div absolute top="50%" left="50%" translate-x="-50%" translate-y="-50%">
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ props.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="basic-btn" m-3 text-sm mt-8
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
