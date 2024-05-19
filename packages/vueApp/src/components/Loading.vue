<script lang='ts' setup>

</script>

<template>
  <div class="loader" />
</template>

<style>
/* HTML: <div class="loader"></div> */
.loader {
  display: flex;
  padding-bottom: 8px;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  font-size: 30px;
  font-weight: bold;
  background: linear-gradient(currentcolor 0 0) 0 100%/0% 3px no-repeat;
  animation: l2 2s linear infinite;
  align-items: center;
  justify-content: center;
}

.loader::before {
  content:"Loading..."
}

@keyframes l2 {to{background-size: 100% 3px}}
</style>
