export interface BlockState {
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
