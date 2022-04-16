import type { Ref } from 'vue'
import type { BlockState } from './type'
interface StateBoard {
  board: BlockState[][]
  mineGenerate: boolean
  gameState: 'play'|'won'|'lost'
}

class GamePlay {
  state = ref() as Ref<StateBoard>
  // 格子周围的8宫格数组
  directions = [
    [1, 0], [1, 1], [0, 1],
    [-1, 1], [-1, 0],
    [-1, -1], [0, -1], [1, -1],
  ]

  get board() {
    return this.state.value.board
  }

<<<<<<< HEAD
  get blocks() {
    return this.state.value.board.flat()
  }

  constructor(public width: number, public height: number, public mines: number) {
=======
  constructor(public width: number, public height: number) {
>>>>>>> main
    this.reset()
  }

  // 重置
  reset() {
<<<<<<< HEAD
    console.warn('reset')

=======
>>>>>>> main
    this.state.value = {
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from({ length: this.width }, (_, x): BlockState => ({
          x, y, adjacentMines: 0, revealed: false,
        }))),
      gameState: 'play',
      mineGenerate: false,
    }
  }

<<<<<<< HEAD
  random(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  randomInt(min: number, max: number) {
    return Math.round(this.random(min, max))
  }

  // 生成炸弹
  generateMines(state: BlockState[][], initial: BlockState) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1)
      const y = this.randomInt(0, this.height - 1)
      const block = state[y][x]
      // 点击的第一下不能是炸弹 判断 === 0  点击的第一下的周围也不能是炸弹 判断 <= 1
      if (Math.abs(initial.x - block.x) <= 1 || Math.abs(initial.y - block.y) <= 1)
        return false

      if (block.mine)
        return false

      block.mine = true
      return true
    }
    Array.from({ length: this.mines }).forEach(() => {
      // eslint-disable-next-line no-empty
      while (placeRandom()) {}
    })

=======
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
>>>>>>> main
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

      return this.board[y2][x2]
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
    if (!this.state.value.mineGenerate) {
      this.generateMines(this.board, block)
      this.state.value.mineGenerate = true
    }

    block.revealed = true
    if (block.mine) {
      this.state.value.gameState = 'lost'
      this.showAllMines()
<<<<<<< HEAD
      alert('You lost')
=======
>>>>>>> main
    }
    this.expendZero(block)
  }

  showAllMines() {
    this.board.forEach((row) => {
      row.forEach((block) => {
        if (block.mine)
          block.revealed = true
      })
    })
  }

<<<<<<< HEAD
  checkGameState() {
    if (!this.state.value.mineGenerate)
      return
    const blocks = this.state.value.board.flat()
=======
  checkGameState(state: BlockState[][]) {
    if (!this.state.value.mineGenerate)
      return
    const blocks = state.flat()
>>>>>>> main
    if (blocks.every(b => b.revealed || b.flagged)) {
      if (blocks.some(block => block.flagged && !block.mine)) {
        this.state.value.gameState = 'lost'
        this.showAllMines()
<<<<<<< HEAD
        alert('You lost')
      }
      else {
        this.state.value.gameState = 'won'
        alert('You won')
      }
=======
      }
      else { this.state.value.gameState = 'won' }
>>>>>>> main
    }
  }
}
export default GamePlay
