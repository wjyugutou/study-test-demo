<script lang='ts' setup>
import type { _Column } from './type'

defineOptions({
  name: 'DHeader',
})

const props = defineProps<{
  rows: _Column[][]
}>()

function getThClass(column: _Column, columnIndex: number, columns: _Column[]) {
  return {
    'hidden': column.hidden,
    'hide-r-border': columnIndex === columns.length - 1,
  }
}

// 生成[min, max]范围内的随机整数
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const a = ref({
  vvv: [] as number[],
})

// setInterval(() => {
//   const newV = Array.from({ length: getRandomInt(1, 10) }, () => getRandomInt(1, 100))

//   a.value.vvv = newV
// }, 1500)

cwatch([() => a.value.vvv], (nV, oV) => {
  console.log('basic==========', { nV, oV })
})

// cwatch([a.value.vvv], (a, b) => {
//   console.log('array===========', a, b)
// }, { deep: true })

function cwatch(...arg: any[]) {
  const target = arg[0]
  const cb = arg[1]
  const opt = arg[2]

  const _v = ref()

  _v.value = getValue()

  // 修改引用
  watch(target, () => {
    cb(getValue(target), JSON.parse(JSON.stringify(_v.value)))
    _v.value = getValue()
  }, opt)

  function getValue(param = target): any {
    let valye

    if (Array.isArray(param)) {
      valye = param.map((item) => {
        return getValue(item)
      })
    }
    else if (typeof param === 'function') {
      valye = JSON.parse(JSON.stringify(param()))
    }
    else {
      valye = JSON.parse(JSON.stringify(param))
    }

    return valye
  }
}
</script>

<template>
  <template v-for="row, i in rows" :key="i">
    <div
      v-for="col, colI in row" :key="col.prop" :class="getThClass(col, colI, row)" :rowspan="col.rowspan" :colspan="col.colspan"
      class="d-header-cell"
      :style="{ gridArea: col.areaId }"
    >
      {{ col.label }}
    </div>
  </template>
</template>

<style>
.d-header-cell {
  --at-apply: py-2 border-r-(1px red solid) border-b-(1px red solid);
  --at-apply: flex items-center justify-center font-700;

  &:last-child {
    --at-apply: border-r-0;
  }
}

.hide-r-border {
  --at-apply: border-r-0;
}
</style>
