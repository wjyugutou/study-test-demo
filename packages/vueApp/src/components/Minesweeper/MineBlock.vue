<script lang='ts' setup>
import type { BlockState } from './type'

defineOptions({ name: 'MineBlock' })

defineProps<{
  block: BlockState
  isDev: boolean
}>()

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

function getBlockClass(block: BlockState) {
  if (!block.revealed)
    return 'bg-gray/50 hover:bg-gray/10'
  return block.mine ? 'bg-red/50' : numberColors[block.adjacentMines]
}
</script>

<template>
  <button

    m="0.5"
    h-10 w-10 flex items-center justify-center border
    :class="getBlockClass(block)"
  >
    <template v-if="block.flagged">
      <div>
        🚩
      </div>
    </template>
    <template v-else-if="block.revealed || isDev">
      <div v-if="block.mine">
        💣
      </div>
      <div v-else font-bold>
        {{ block.adjacentMines || '' }}
      </div>
    </template>
  </button>
</template>
