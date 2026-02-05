<script lang='ts' setup>
const columns = [
  { label: 'Date', prop: 'date' },
  {
    label: 'Delivery Info', prop: 'name',
    children: [
      { label: 'Name', prop: 'name' },
      {
        label: 'Address Info', prop: 'age',
        children: [
          { label: 'State', prop: 'state' },
          { label: 'City', prop: 'city' },
          { label: 'Address', prop: 'address' },
          {
            label: 'Zip Info', prop: 'zip',
            children: [
              { label: 'Zip Name', prop: 'zip-name' },
              { label: 'Zip Code', prop: 'zip-code' },
              { label: 'Zip Size', prop: 'zip-size' },
            ],
          },
        ],
      },
    ],
  },
]

const data = [
  {
    'date': '2016-05-02',
    'name': '王小虎',
    'state': '上海',
    'city': '普陀区',
    'address': '上海市普陀区金沙江路 1518 弄',
    'zip': 200333,
    'zip-name': '上海',
    'zip-code': 200333,
    'zip-size': 200333,
  },
  {
    'date': '2016-05-04',
    'name': '王小虎',
    'state': '上海',
    'city': '普陀区',
    'address': '上海市普陀区金沙江路 1517 弄',
    'zip': 333,
    'zip-name': '上海',
    'zip-code': 2055,
    'zip-size': 36489,
  },
  {
    'date': '2016-05-01',
    'name': '王小虎',
    'state': '上海',
    'city': '普陀区',
    'address': '上海市普陀区金沙江路 1519 弄',
    'zip': 31,
    'zip-name': '上海',
    'zip-code': 4234,
    'zip-size': 3256,
  },
]
</script>

<template>
  <table class="m-auto m-t-10 bg-blue-500/50 w-70vw" border>
    <caption>表格2</caption>
    <!-- 表头 名称 年龄 身高 -->
    <thead>
      <THeader :columns="columns" />
    </thead>
    <tbody>
      <tr>
        <td class="text-center">
          小明
        </td>
        <td class="text-center">
          18
        </td>
        <td class="text-center">
          170
        </td>
      </tr>
      <tr>
        <td colspan="2" rowspan="2" class="text-center">
          小红
        </td>
        <td rowspan="0" class="text-center hidden">
          19
        </td>
        <td class="text-center">
          17阿三顶顶顶顶顶顶顶顶顶顶1
        </td>
      </tr>
      <tr>
        <td colspan="0" class="text-center hidden">
          小王
        </td>
        <td colspan="0" class="text-center hidden">
          20
        </td>
        <td class="text-center">
          172
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" class="text-center">
          Average age
        </td>
        <td class="text-center">
          33
        </td>
      </tr>
    </tfoot>
  </table>

  <div class="m-auto m-t-10 bg-blue-500/50 w-70vw">
    <DTable :columns="columns" :data="data" />
  </div>
</template>

<style>
tr {
  --at-apply: border-(1px red solid);
}

th,
td {
  --at-apply: py-2 border-r-(1px #ff0000 solid);
}

th {
  --at-apply: bg-gray-200;
}
</style>
