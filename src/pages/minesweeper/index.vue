/**
  2022/4/7
  https://www.bilibili.com/video/BV1ia411b7jY/?spm_id_from=pageDriver
  1:26:00
 */

<script lang="ts" setup>
import MineBlock from './components/MineBlock.vue'
import GamePlay from './logic'
import { isDev, toggleDev } from '~/composables'

const paly = new GamePlay(10, 10)
useStorage('vue-minesweeper', paly.state)
const state = paly.board
</script>

<template>
  <div>
    minesweeper
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
