<script setup lang="ts">
useRuntimeConfig()
</script>

<template>
  <StarportCarrier>
    <Astralbackground>
      <NuxtLayout>
        <div>
          <NuxtLoadingIndicator />
          <NuxtPage />
        </div>
      </NuxtLayout>
    </Astralbackground>
  </StarportCarrier>
</template>
