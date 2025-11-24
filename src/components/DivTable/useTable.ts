import type { _Column, Column, DataItem } from './type'

export function useTable(columns: Column[], data: Record<string, any>[]) {
  const { maxHeaderRow,
    headerRows, getHeaderMaxRow, handleTableHeaders, getColspan,
  } = handleHeader(columns)

  const { dataRows } = handleBody(data, headerRows)

  return {
    maxHeaderRow,
    headerRows,
    dataRows,
    getMaxRow: getHeaderMaxRow,
    handleTableHeaders,
    getColspan,
  }
}

// 处理表头
function handleHeader(columns: Column[]) {
  // 一共有几行表头,处理表头合并
  const maxHeaderRow = ref(1)
  const headerRows = ref<_Column[][]>([])

  watch(columns, () => {
    maxHeaderRow.value = 1
    headerRows.value = []

    // 一定在 handleTableHeaders 之前
    getHeaderMaxRow(columns)
    handleTableHeaders(columns)
  }, { immediate: true, deep: true })

  function getHeaderMaxRow(columns: Column[], level = 1) {
    maxHeaderRow.value = Math.max(maxHeaderRow.value, level)
    columns.forEach((column) => {
      if (column.children && column.children.length) {
        getHeaderMaxRow(column.children, level + 1)
      }
    })
  }
  /**
   * 将columns 转换成二维数组, 每一层children都是一行
   */
  function handleTableHeaders(columns: Column[], row = 1, col = 1) {
    /**
      [
        { label: '名称', prop: 'name' },
        {
          label: '信息', prop: 'name',
          children: [
            { label: '年龄', prop: 'age' },
            { label: '身高', prop: 'height' },
          ],
        },
        ] ======>
        [
        [{ label: '名称', prop: 'name' }, { label: '信息', prop: 'name' }],
        [
          { label: '名称', prop: 'name' }, // 用来给第一行的名称作为rowspan合并素材
          { label: '年龄', prop: 'age' },
          { label: '身高', prop: 'height' },
        ],
      ]
     */

    columns.forEach((column, colIndex) => {
      // 当前操作列的 列数
      const curCol = col + colIndex

      const _column = {
        ...column,
        row,
        col: curCol,
        rowspan: 1,
        colspan: 1,
        areaId: `${column.label.replace(/\s/g, '_')}-${row}-${curCol}`,
      } as _Column

      headerRows.value[row - 1] = headerRows.value[row - 1] || []

      if (_column.children && _column.children.length) {
        // 列合并 根据children.length
        _column.colspan = getColspan(_column)

        headerRows.value[row - 1]!.push(_column)

        handleTableHeaders(_column.children, row + 1, curCol)
      }
      else {
        // 当前column 需要合并的行数
        const rowspan = maxHeaderRow.value - row + 1
        // 没有children, 行合并
        _column.rowspan = rowspan

        // 循环 maxRow - level + 1 次, 最少是1
        for (let i = 0; i < rowspan; i++) {
          const _column2 = { ..._column, row } as _Column

          // 当前操作行
          const currRow = i + row
          // 当前操作行的index
          const rowIndex = currRow - 1

          // 此处选择使用hidden, 1是方便生成 grid-areas
          // 2是方便 表体数据处理, 直接取最后一个数组就行
          headerRows.value[rowIndex] = headerRows.value[rowIndex] || []
          if (currRow > row) {
            _column2.hidden = true
            _column2.row = i + 1
          }

          headerRows.value[rowIndex]!.push({
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

  return {
    maxHeaderRow,
    headerRows,
    getHeaderMaxRow,
    handleTableHeaders,
    getColspan,
  }
}

function handleBody(data: Record<string, any>[], headerRows: Ref<_Column[][]>) {
  const lastHeaderRow = computed(() => headerRows.value.at(-1))

  const dataRows = computed(() => {
    return data.map((dataItem, dataIndex) => {
      const obj = {
        rowData: dataItem,
        columns: [],
        $index: dataIndex,
      } as DataItem

      lastHeaderRow.value?.forEach((headerItem) => {
        obj.columns.push({
          ...headerItem,
          areaId: `${dataIndex}-${headerItem.prop}-${headerItem.col}`,
        })
      })
      return obj
    })
  })

  return {
    dataRows,
  }
}
