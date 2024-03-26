<script lang='ts' setup>

const comp1 = ref(false)


</script>

<template>
  <div>
    <h1>啊啊纱似的</h1>
    <nav>
      <button class="basicBtn" @click="comp1=!comp1">toggle</button>
    </nav>
    <AliveKeep>
      <Counter  v-if="comp1" />
      <Counter2  v-else />
    </AliveKeep>
  </div>
</template>
