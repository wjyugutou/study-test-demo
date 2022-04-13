import type { BlockState } from './type'

class GamePlay {
  mineGenerate = false

  state = ref<BlockState[][]>([])
  // 格子周围的8宫格数组
  directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ]

  constructor(public width: number, public height: number) {
    this.reset()
  }

  // 重置
  reset() {
    this.mineGenerate = false
    this.state.value = Array.from({ length: this.height }, (_, y) =>
      Array.from({ length: this.width }, (_, x): BlockState => ({
        x, y, adjacentMines: 0, revealed: false,
      })))
  }

  // 生成炸弹
  generateMines(state: BlockState[][], initial: BlockState) {
    for (const row of state) {
      for (const block of row) {
        // 点击的第一下不能是炸弹 判断 === 0  电机的第一下的周围也不能是炸弹 判断 <= 1
        if (Math.abs(initial.x - block.x) <= 1 || Math.abs(initial.y - block.y) <= 1)
          continue
        block.mine = Math.random() < 0.3
      }
    }
    this.updateNumbers(state)
  }

  // 更新周围炸弹数
  updateNumbers(state: BlockState[][]) {
    state.forEach((row) => {
      row.forEach((block) => {
        // 如果是炸弹 return
        if (block.mine)
          return
        // 更新周围炸弹数
        this.getSiblings(block).forEach((b) => {
          if (b.mine)
            block.adjacentMines++
        })
      })
    })
  }

  getSiblings(block: BlockState) {
    return this.directions.map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height)
        return undefined

      return this.state.value[y2][x2]
    }).filter(v => v) as BlockState[]
  }

  // 点击周围没有炸弹就掀开周围 九宫格
  expendZero(block: BlockState) {
    // 周围没有炸弹或被翻开 return
    if (block.adjacentMines)
      return
    this.getSiblings(block).forEach((b) => {
      if (!b.revealed) {
        b.revealed = true
        this.expendZero(b)
      }
    })
  }

  onRightClick(block: BlockState) {
    if (block.revealed)
      return
    block.flagged = true
  }

  onClick(block: BlockState) {
    if (!this.mineGenerate) {
      this.generateMines(this.state.value, block)
      this.mineGenerate = true
    }

    block.revealed = true
    if (block.mine)
      alert('游戏结束')
    this.expendZero(block)
  }

  checkGameState(state: BlockState[][]) {
    if (!this.mineGenerate)
      return
    const blocks = state.flat()
    if (blocks.every(b => b.revealed || b.flagged)) {
      if (blocks.some(block => block.flagged && !block.mine))
        alert('游戏结束')
      else
        alert('游戏胜利')
    }
  }
}
export default GamePlay
