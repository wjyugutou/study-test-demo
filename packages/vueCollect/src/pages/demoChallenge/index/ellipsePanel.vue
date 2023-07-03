<script lang='ts' setup>
import img1 from '@/static/images/1.jpg'
import img2 from '@/static/images/2.jpg'
import img3 from '@/static/images/3.jpg'
import img4 from '@/static/images/4.jpg'
import img5 from '@/static/images/5.jpg'

defineOptions({ name: 'EllipseCarousel' })
</script>

<template>
  <div class="carousel">
    <div flex w-full h-full gap-10px overflow-x-scroll>
      <img :src="img1" alt="">
      <img :src="img2" alt="">
      <img :src="img3" alt="">
      <img :src="img4" alt="">
      <img :src="img5" alt="">
    </div>
  </div>
  <div class="bg" />
</template>

<style scoped>
.carousel {
  width: 1440px;
  height: 500px;
  mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDE0NDAgNTAwIiBpZD0iaiI+CiAgPHBhdGggZmlsbD0icmdiKDIwMCwyMDAsMjAwKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwczI3NS4wNCAxMDAgNzIwIDEwMFMxNDQwIDAgMTQ0MCAwdjUwMHMtMjc1LjA0LTEwMC03MjAtMTAwUzAgNTAwIDAgNTAwVjB6Ii8+Cjwvc3ZnPgo=);
  mask-repeat: no-repeat;
  mask-size: 1440px 500px;
  mask-position: center;
  overflow: hidden;
}

.bg {
  margin-top: 10px;
  height: 200px;
    background-image: linear-gradient(
        to top,
        #000 0%,
        #000 50%,
        transparent 50%,
        transparent 100%
    ),
        linear-gradient(to right, transparent 0%, transparent 50%, #000 50%, #000 100%);
    background-size: 50px 50px;
}
</style>
