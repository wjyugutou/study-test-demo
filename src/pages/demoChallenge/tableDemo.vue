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
            label: 'Zip', prop: 'zip',
            children: [
              { label: 'Name', prop: 'name' },
              {
                label: 'Address Info', prop: 'age',
                children: [
                  { label: 'State', prop: 'state' },
                  { label: 'City', prop: 'city' },
                  { label: 'Address', prop: 'address' },
                  { label: 'Zip', prop: 'zip' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <table class="text-red m-auto m-t-50 bg-blue-500/50 w-50vw" border>
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
          171
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

  <div class="text-red m-auto m-t-50 bg-blue-500/50 w-50vw">
    <DHeader :columns="columns" />
  </div>
</template>

<style>
tr {
  --at-apply: border-(1px red solid);
}

th,
td {
  --at-apply: py-2 border-r-(1px red solid);
}

th {
  --at-apply: bg-gray-200;
}
</style>
