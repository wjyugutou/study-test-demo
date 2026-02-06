<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import GamePlay from './logic'

defineOptions({ name: 'Minesweeper' })

const paly = new GamePlay(10, 10, 5)

const now = useNow()

const isDev = ref(false)
const toggleDev = useToggle(isDev)

const timeMS = computed(() => {
  if (paly.state.value.endTime)
    return Math.round(((+paly.state.value.endTime || +now.value) - paly.state.value.startTime) / 1000)

  if (!paly.state.value.mineGenerate)
    return 0
  return Math.round((+now.value - (paly.state.value.startTime)) / 1000)
})

useStorage('vue-minesweeper', paly.state)
const state = computed(() => paly.board)

const mineRest = computed(() => paly.blocks.reduce((pre, cur) => {
  if (!paly.state.value.mineGenerate)
    return paly.mines

  if (cur.mine) {
    if (cur.flagged)
      pre -= 1

    return pre += 1
  }
  else {
    if (cur.flagged)
      return pre -= 1
  }

  return pre
}, 0))

watchEffect(() => {
  paly.checkGameState()
})

function newGame(difficulty: 'easy' | 'normal' | 'hard') {
  switch (difficulty) {
    case 'easy':
      paly.reset(9, 9, 10)
      break
    case 'normal':
      paly.reset(16, 16, 40)
      break
    case 'hard':
      paly.reset(16, 30, 99)
      break
  }
}
</script>

<template>
  <div>
    <div>
      minesweeper
    </div>

    <div flex items-center justify-center>
      <div text-2xl p-3 flex items-center justify-center>
        <div i-carbon-timer />
        {{ timeMS }}
      </div>

      <div text-2xl p-3 flex items-center justify-center>
        <div i-carbon-switch-layer-3 />
        {{ mineRest }}
      </div>
    </div>

    <div flex="~ gap-1" justify-center>
      <button text-black p-1 rounded bg-green-500 @click="toggleDev()">
        {{ isDev ? 'DEV' : 'NORMAL' }}
      </button>
      <button text-black p-1 rounded bg-green-500 @click="paly.reset()">
        NEW GAME
      </button>
      <button text-black p-1 rounded bg-green-500 @click="newGame('easy')">
        easy
      </button>
      <button text-black p-1 rounded bg-green-500 @click="newGame('normal')">
        normal
      </button>
      <button text-black p-1 rounded bg-green-500 @click="newGame('hard')">
        hard
      </button>
    </div>

    <div p-5>
      <div v-for="row, y in state" :key="y" flex items-center justify-center>
        <MinesweeperBlock
          v-for="block, x in row"
          :key="x"
          :is-dev="isDev"
          :block="block"
          @click="paly.onClick(block)"
          @contextmenu.prevent="paly.onRightClick(block)"
          @dblclick="paly.onDoubleClick(block)"
        />
      </div>
    </div>

    <Fireworks :passed=" paly.state.value.mineGenerate && paly.state.value.gameState === 'won'" />
  </div>
</template>
