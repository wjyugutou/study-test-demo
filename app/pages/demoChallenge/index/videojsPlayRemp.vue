<script lang='ts' setup>
defineOptions({ description: 'videojs demo' })

function initVideoPlayer() {

}

onMounted(() => {
  initVideoPlayer()
})
</script>

<template>
  <video id="video" class="vjs-big-play-centered" src="" />
</template>
