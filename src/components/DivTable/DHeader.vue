<script lang='ts' setup>
defineOptions({
  name: 'DHeader',
})

const props = defineProps<{
  columns: Column[]
}>()

interface Column {
  label: string
  prop?: string
  children?: Column[]
}

interface _Column extends Column {
  /** 内部id */
  _id: string
  /** 当前行 */
  row: number
  /** 当前列 */
  col: number
  rowspan: number
  colspan: number
  hidden?: boolean
  children?: _Column[]
}

// 一共有几行表头,处理表头合并
const maxRow = ref(1)

const _columns = computed(() => {
  // 先获取最大行
  getMaxRow(props.columns, 1)

  const newColumns: _Column[][] = []
  handleColumns(newColumns, props.columns)

  return newColumns
})

function getMaxRow(columns: Column[], level = 1) {
  maxRow.value = Math.max(maxRow.value, level)
  columns.forEach((column) => {
    if (column.children && column.children.length) {
      getMaxRow(column.children, level + 1)
    }
  })
}
/**
 * 将columns 转换成二维数组, 每一层children都是一行
 *  [
     { label: '名称', prop: 'name' },
     {
       label: '信息', prop: 'name',
       children: [
         { label: '年龄', prop: 'age' },
         { label: '身高', prop: 'height' },
       ],
     },
    ] ===>
    [
     [{ label: '名称', prop: 'name' }, { label: '信息', prop: 'name' }],
     [
       { label: '名称', prop: 'name' }, // 用来给第一行的名称作为rowspan合并素材
       { label: '年龄', prop: 'age' },
       { label: '身高', prop: 'height' },
     ],
    ]
 */
function handleColumns(newColumns: _Column[][] = [], columns: Column[], row = 1, col = 1) {
  columns.forEach((column, colIndex) => {
    // 当前操作列的 列数
    const curCol = col + colIndex

    const _column = { ...column, row, col: curCol, _id: `${column.label.replace(/\s/g, '_')}-${row}-${curCol}` } as _Column

    newColumns[row - 1] = newColumns[row - 1] || []

    if (_column.children && _column.children.length) {
      // 列合并 根据children.length
      _column.colspan = getColspan(_column)

      newColumns[row - 1]!.push(_column)

      handleColumns(newColumns, _column.children, row + 1, curCol)
    }
    else {
      // 当前column 需要合并的行数
      const rowspan = maxRow.value - row + 1
      // 没有children, 行合并
      _column.rowspan = rowspan

      // 循环 maxRow - level + 1 次, 最少是1
      for (let i = 0; i < rowspan; i++) {
        const _column2 = { ..._column, row } as _Column

        // 当前操作行
        const currRow = i + row
        // 当前操作行的index
        const rowIndex = currRow - 1

        newColumns[rowIndex] = newColumns[rowIndex] || []
        if (currRow > row) {
          _column2.hidden = true
          _column2.row = i + 1
        }
        newColumns[rowIndex]!.push({
          ..._column2,
          row: currRow,
          col: col + colIndex,
          rowspan,
          colspan: 1,
        })
      }
    }
  })
}

/**
 *
 */
function getColspan(column: _Column) {
  let colspan = 0

  column.children?.length && deepChildren(column.children)

  function deepChildren(columns: _Column[]) {
    colspan += columns.length
    columns.forEach((columnChild) => {
      if (columnChild.children?.length) {
        colspan -= 1
        deepChildren(columnChild.children)
      }
    })
  }

  return colspan
}

console.log('_columns', _columns.value)

const gridArea = computed(() => {
  const area: string[][] = []
  _columns.value.forEach((columns) => {
    const areaLine: string[] = []
    columns.forEach((column) => {
      for (let i = 0; i < column.colspan; i++) {
        areaLine.push(column._id)
      }
    })

    area.push(areaLine)
  })

  return arrayToGridTemplateAreas(area)
})

// 把数组转换成 grid-template-areas 的函数
function arrayToGridTemplateAreas(grid: string[][]) {
  // 处理名称：把空格换成下划线（CSS 区域名不能有空格）
  function sanitize(name: string) {
    return name.replace(/\s+/g, '_')
  }

  // 每行变成 "area1 area2 ..." 格式
  const lines = grid.map((row) => {
    const sanitizedRow = row.map(sanitize)
    return `"${sanitizedRow.join(' ')}"`
  })

  console.log(`${lines.join('\n  ')}`)

  // 组合成完整的 CSS 属性
  return `${lines.join('\n  ')}`
}

function getThClass(column: _Column) {
  return {
    hidden: column.hidden,
  }
}
</script>

<template>
  <div class="d-header" :style="{ gridTemplateAreas: gridArea }">
    <template v-for="_column, i in _columns" :key="i">
      <div
        v-for="col in _column" :key="col.prop" :class="getThClass(col)" :rowspan="col.rowspan" :colspan="col.colspan"
        class="d-header-cell"
        :style="{ gridArea: col._id }"
      >
        {{ col.label }}
      </div>
    </template>
  </div>
</template>

<style>
.d-header {
  --at-apply: bg-gray-200;

  display: grid;
}

.d-header-cell {
  --at-apply: py-2 border-r-(1px red solid) border-t-(1px red solid);
  --at-apply: flex items-center justify-center;
}
</style>
