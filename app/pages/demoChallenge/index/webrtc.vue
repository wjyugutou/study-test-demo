<script lang='ts' setup>
const localStream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
})
</script>

<template>
  <div class="h-full w-full">
    webRtc
  </div>
</template>
