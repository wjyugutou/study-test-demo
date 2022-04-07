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
  /* 是否是炸弹 */
  mine?: boolean
  /*  */
  flagged?: boolean
  /* 周围炸弹数 */
  adjacentMines: number
}

const WIDTH = 10
const HEIGHT = 10
const state = reactive(Array.from({ length: HEIGHT }, (_, y) =>
  Array.from({ length: WIDTH }, (_, x): BlockState => ({
    x, y, adjacentMines: 0, revealed: false,
  }))))

// 生成炸弹
function generateMines(initial: BlockState) {
  for (const row of state) {
    for (const block of row) {
      // 点击的第一下不能是炸弹 判断 === 0  电机的第一下的周围也不能是炸弹 判断 <= 1
      if (Math.abs(initial.x - block.x) <= 1 || Math.abs(initial.y - block.y) <= 1)
        continue
      block.mine = Math.random() < 0.3
    }
  }
}

// 格子周围的8宫格数组
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

const numberColors = [
  'text-trans',
  'text-red-500',
  'text-blue-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-orange-500',
  'text-teal-500',
]

// 更新周围炸弹数
function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      // 如果是炸弹 return
      if (block.mine)
        return
      // 更新周围炸弹数
      getSiblings(block).forEach((b) => {
        if (b.mine)
          block.adjacentMines++
      })
    })
  })
}

function getSiblings(block: BlockState) {
  return directions.map(([dx, dy]) => {
    const x2 = block.x + dx
    const y2 = block.y + dy
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return undefined

    return state[y2][x2]
  }).filter(v => v) as BlockState[]
}

// 点击周围没有炸弹就掀开周围 九宫格
function expendZero(block: BlockState) {
  // 周围没有炸弹或被翻开 return
  if (block.adjacentMines)
    return
  getSiblings(block).forEach((b) => {
    if (!b.revealed) {
      b.revealed = true
      expendZero(b)
    }
  })
}

let mineGenerate = false
const dev = true

function onClick(block: BlockState) {
  if (!mineGenerate) {
    generateMines(block)
    updateNumbers()
    mineGenerate = true
  }

  block.revealed = true
  if (block.mine)
    alert('游戏结束')
  expendZero(block)
}

function getBlockClass(block: BlockState) {
  if (!block.revealed)
    return 'bg-gray/50'
  return block.mine ? 'bg-red/50' : numberColors[block.adjacentMines]
}

</script>

<template>
  <div>
    minesweeper
    <!-- {{ state }} -->
    <div p-5>
      <div v-for="row, y in state" :key="y" flex items-center justify-center>
        <button
          v-for="block, x in row"
          :key="x"
          flex
          items-center
          justify-center
          m-1
          w-10 h-10 border
          hover="bg-gray/50"
          :class="getBlockClass(block)"
          @click="onClick(block)"
        >
          <template v-if="block.revealed || dev">
            <div v-if="block.mine">
              💣
            </div>
            <div v-else>
              {{ block.adjacentMines || '0' }}
            </div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
