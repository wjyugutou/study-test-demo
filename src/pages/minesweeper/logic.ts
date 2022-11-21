import type { Ref } from 'vue'
import type { BlockState } from './type'

interface StateBoard {
  board: BlockState[][]
  mineGenerate: boolean
  gameState: 'play'|'won'|'lost'
  startTime: number
  endTime?: number
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

  get blocks() {
    return this.state.value.board.flat()
  }

  constructor(public width: number, public height: number, public mines: number) {
    this.reset()
  }

  // 重置
  reset(width: number = this.width, height: number = this.height, mines: number = this.mines) {
    this.width = width
    this.height = height
    this.mines = mines

    this.state.value = {
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from({ length: this.width }, (_, x): BlockState => ({
          x, y, adjacentMines: 0, revealed: false,
        }))),
      gameState: 'play',
      mineGenerate: false,
      startTime: +Date.now(),
    }
  }

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
      if (Math.abs(initial.x - block.x) <= 1 && Math.abs(initial.y - block.y) <= 1)
        return false

      if (block.mine)
        return false

      block.mine = true
      return true
    }
    Array.from({ length: this.mines }).forEach(() => {
      // eslint-disable-next-line no-empty
      while (!placeRandom()) {}
    })

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
    block.flagged = !block.flagged
  }

  onClick(block: BlockState) {
    if (!this.state.value.mineGenerate) {
      this.generateMines(this.board, block)
      this.state.value.mineGenerate = true
    }

    if (block.flagged)
      block.flagged = false

    block.revealed = true
    if (block.mine) {
      this.onGameOver('lost')
      this.showAllMines()
      return
    }
    this.expendZero(block)
  }

  onDoubleClick(block: BlockState) {
    this.autoExpand(block)
  }

  showAllMines() {
    this.board.forEach((row) => {
      row.forEach((block) => {
        if (block.mine)
          block.revealed = true
      })
    })
  }

  autoExpand(block: BlockState) {
    // 周围旗子数
    const flags = this.getSiblings(block).reduce((a, b) => {
      if (b.flagged)
        return a += 1
      else
        return a
    }, 0)
    // 如果周围的炸弹数等于标记的数量 就掀开周围
    if (flags === block.adjacentMines) {
      this.getSiblings(block).forEach((b) => {
        if (!b.flagged) {
          b.revealed = true
          if (b.mine)
            this.onGameOver('lost')
        }
      })
    }
    // 如果未掀开数量 === 炸弹数量 就插个旗子
    const missingflagged = block.adjacentMines - flags
    const missingRevealed = this.getSiblings(block).reduce((a, b) => {
      if (!b.revealed && !b.flagged)
        return a += 1
      else
        return a
    }, 0)
    if (missingRevealed === missingflagged) {
      this.getSiblings(block).forEach((b) => {
        if (!b.revealed)
          b.flagged = true
      })
    }
  }

  onGameOver(state: StateBoard['gameState']) {
    this.state.value.gameState = state
    this.state.value.endTime = +Date.now()
    if (state === 'lost') {
      this.showAllMines()
      setTimeout(() => {
        alert('lost')
      }, 100)
    }
  }

  checkGameState() {
    if (!this.state.value.mineGenerate || this.state.value.gameState !== 'play')
      return
    const blocks = this.state.value.board.flat()

    if (blocks.every(b => b.revealed || b.flagged || b.mine)) {
      if (blocks.some(block => block.flagged && !block.mine))
        this.onGameOver('lost')

      else
        this.onGameOver('won')
    }
  }
}
export default GamePlay
