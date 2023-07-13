<script lang='ts' setup>
defineOptions({ name: 'BackgroundAttachment' })
</script>

<template>
  <div class="" bg-dark py-2>
    <div class="box p1" h-200px>
      1
    </div>
    <div class="box p2" h-200px>
      2
    </div>
    <div class="box p3" h-200px>
      3
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 500px;
  height: 300px;
  background-attachment: fixed;
  background-size: 100% ;
  background-repeat: no-repeat;
}
.p1 {
  background-image: url('../../static/images/1.jpg');
}
</style>
