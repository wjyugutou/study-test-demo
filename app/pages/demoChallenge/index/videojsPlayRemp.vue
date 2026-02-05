<script lang='ts' setup>
defineOptions({ description: '视频播放' })

function initVideoPlayer() {

}

onMounted(() => {
  initVideoPlayer()
})
</script>

<template>
  <video id="video" class="vjs-big-play-centered" src="" />
</template>
