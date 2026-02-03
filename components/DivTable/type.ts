export interface Column {
  label: string
  prop?: string
  children?: Column[]
}

export interface _Column extends Column {
  /** 用于grid-area */
  areaId: string
  /** 当前行,从1开始 */
  row: number
  /** 当前列,从1开始 */
  col: number
  rowspan: number
  colspan: number
  hidden?: boolean
  children?: _Column[]
}

export interface DataItem {
  rowData: Record<string, any>
  columns: _Column[]
  $index: number
}
