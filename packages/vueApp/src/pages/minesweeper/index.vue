<script lang="ts" setup>
import GamePlay from './logic'

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
      <div flex items-center justify-center p-3 text-2xl>
        <div i-carbon-timer />
        {{ timeMS }}
      </div>

      <div flex items-center justify-center p-3 text-2xl>
        <div i-carbon-switch-layer-3 />
        {{ mineRest }}
      </div>
    </div>

    <div flex="~ gap-1" justify-center>
      <button rounded bg-green-500 p-1 text-black @click="toggleDev()">
        {{ isDev ? 'DEV' : 'NORMAL' }}
      </button>
      <button rounded bg-green-500 p-1 text-black @click="paly.reset()">
        NEW GAME
      </button>
      <button rounded bg-green-500 p-1 text-black @click="newGame('easy')">
        easy
      </button>
      <button rounded bg-green-500 p-1 text-black @click="newGame('normal')">
        normal
      </button>
      <button rounded bg-green-500 p-1 text-black @click="newGame('hard')">
        hard
      </button>
    </div>

    <div p-5>
      <div v-for="row, y in state" :key="y" flex items-center justify-center>
        <MineBlock
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
