<script lang='ts' setup>
defineOptions({ description: 'videojs demo' })

const player = ref()

function initVideoPlayer() {

}

onMounted(() => {
  initVideoPlayer()
})
</script>

<template>
  <video id="video" class="vjs-big-play-centered" src="" />
</template>
