/**
  2022/4/7
  https://www.bilibili.com/video/BV15b4y1s7it/?spm_id_from=pageDriver
  00： 18：57
 */

<script lang="ts" setup>
import MineBlock from './components/MineBlock.vue'
import GamePlay from './logic'
import { isDev, toggleDev } from '~/composables'

const paly = new GamePlay(10, 10, 30)
useStorage('vue-minesweeper', paly.state)
const state = computed(() => paly.board)

const mineCount = computed(() => paly.blocks.reduce((pre, cur) => {
  if (cur.mine)
    return pre += 1
  else
    return pre
}, 0))

watchEffect(() => {
  paly.checkGameState()
})
</script>

<template>
  <div>
    minesweeper

    <div>
      {{ mineCount }}
    </div>

    <div flex="~ gap-1" justify-center>
      <button bg-green-500 p-1 rounded text-black @click="toggleDev()">
        {{ isDev ? 'DEV' : 'normal' }}
      </button>
      <button bg-green-500 p-1 rounded text-black @click="paly.reset">
        REST
      </button>
    </div>
    <div p-5>
      <div v-for="row, y in state" :key="y" flex items-center justify-center>
        <MineBlock
          v-for="block, x in row"
          :key="x"
          :block="block"
          @click="paly.onClick(block)"
          @contextmenu.prevent="paly.onRightClick(block)"
        />
      </div>
    </div>
  </div>
</template>
