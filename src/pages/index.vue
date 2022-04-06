/**
  2022/4/6
  https://www.bilibili.com/video/BV1ia411b7jY/?spm_id_from=pageDriver
  0:31:48
 */

<script setup lang="ts">
interface BlockState {
  x: number
  y: number
  /* 是否掀开 */
  revealed?: boolean
  /*  */
  mine?: boolean
  /* 是否是炸弹 */
  flagged?: boolean
  /* 周围炸弹数 */
  adjacentMines: number
}

const WIDTH = 10
const HEIGHT = 10
const state = reactive(Array.from({ length: HEIGHT }, (_, y) =>
  Array.from({ length: WIDTH }, (_, x): BlockState => ({
    x, y, adjacentMines: 0,
  }))))

function generateMines() {
  for (const row of state) {
    for (const block of row)
      block.mine = Math.random() < 0.3
  }
}

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx
        const y2 = y + dy
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
          return

        if (state[y2][x2].mine)
          block.adjacentMines += 1
      })
    })
  })
}

function getBlockClass(block: BlockState) {
  return block.mine ? 'text-red' : 'text-gray'
}

function onClick(x: number, y: number) {
  console.log(`Clicked ${x}, ${y}`)
}

generateMines()
updateNumbers()
</script>

<template>
  <div>
    minesweeper
    {{ state }}
    <div v-for="row, y in state" :key="y">
      <button
        v-for="item, x in row"
        :key="x"
        w-10 h-10 border
        hover:bg-gray
        :class="getBlockClass(item)"
        @click="onClick(x, y)"
      >
        {{ item.mine ? '💣': item.adjacentMines || '-' }}
      </button>
    </div>
  </div>
</template>
