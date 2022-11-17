<script lang="ts" setup>
import { throttle } from '@/utils'

const allSanxins = ref<{
  id: string
  msg: string
  src: string
}[]>([]) // 所有数据
const itemHiehgt = ref(150) // 列表每一项的宽度
const boxHeight = ref(0) // 可视区域的高度
const startIndex = ref(0) // 元素开始索引
const scrollBox = ref<HTMLDivElement>()

const itemNum = computed(() => {
  // 可视区域可展示多少个列表项？ 计算公式：~~(可视化区域高度 / 列表项高度) + 2
  // ~~是向下取整的运算符，等同于Math.floor()，为什么要 +2 ，是因为可能最上面和最下面的元素都只展示一部分
  return ~~(boxHeight.value / itemHiehgt.value) + 2
})
const endIndex = computed(() => {
  // endIndex的计算公式：(开始索引 + 可视区域可展示多少个列表项 * 2)
  // 比如可视区域可展示8个列表项，startIndex是0的话endIndex就是0 + 8 * 2 = 16，startIndex是1的话endIndex就是1 + 8 * 2 = 17，以此类推
  // 为什么要乘2呢，因为这样的话可以预加载出一页的数据，防止滚动过快，出现暂时白屏现象
  let index = startIndex.value + itemNum.value * 2
  if (!allSanxins.value[index]) {
    // 到底的情况，比如startIndex是99995，那么endIndex本应该是99995 + 8 * 2 = 10011
    // 但是列表数据总数只有10000条，此时就需要让endIndex = (列表数据长度 - 1)
    index = allSanxins.value.length - 1
  }
  return index
})
const tempSanxins = computed(() => {
  //   可视区域展示的截取数据，使用了数组的slice方法，不改变原数组又能截取
  let startIndex = 0
  if (startIndex <= itemNum.value)
    startIndex = 0
  else
    startIndex = startIndex + itemNum.value

  return allSanxins.value.slice(startIndex, endIndex.value + 1)
})
const blankStyle = computed(() => {
  // 上下方的空白处使用padding来充当
  let startIndex = 0
  if (startIndex <= itemNum.value)
    startIndex = 0
  else
    startIndex = startIndex - itemNum.value

  return {
    // 上方空白的高度计算公式：(开始index * 列表项高度)
    // 比如你滚过了3个列表项，那么上方空白区高度就是3 * 150 = 450，这样才能假装10000个数据的滚动状态
    paddingTop: `${startIndex * itemHiehgt.value}px`,
    // 下方空白的高度计算公式：(总数据的个数 - 结束index - 1) * 列表项高度
    // 例如现在结束index是100，那么下方空白高度就是：(10000 - 100 - 1) * 150 = 1,484,850
    paddingBottom:
          `${(allSanxins.value.length - endIndex.value - 1) * itemHiehgt.value}px`,
    // 不要忘了加px哦
  }
})

function getAllSanxin(count: number) {
  // 模拟获取数据
  const length = allSanxins.value.length
  for (let i = 0; i < count; i++) {
    allSanxins.value.push({
      id: `sanxin${length + i}`,
      msg: `我是三心${length + i}号`,
      // 这里随便选一张图片就行
      src: '',
    })
  }
}
// 使用节流，提高性能
const doScroll = throttle(() => {
  console.log('doScroll')
  // 监听可视区域的滚动事件
  // 公式：~~(滚动的距离 / 列表项 )，就能算出已经滚过了多少个列表项，也就能知道现在的startIndex是多少
  // 例如我滚动条滚过了160px，那么index就是1，因为此时第一个列表项已经被滚上去了，可视区域里的第一项的索引是1
  const index = ~~(scrollBox.value!.scrollTop / itemHiehgt.value)
  if (index === startIndex.value)
    return
  startIndex.value = index
  if (startIndex.value + itemNum.value > allSanxins.value.length - 1)
    getAllSanxin(3000)
}, 200)
function getScrollBoxHeight() {
  // 获取可视区域的高度
  boxHeight.value = scrollBox.value!.clientHeight
}

onMounted(() => {
  // 在mounted时获取可视区域的高度
  getScrollBoxHeight()
  // 监听屏幕变化以及旋转，都要重新获取可视区域的高度
  window.onresize = getScrollBoxHeight
  window.onorientationchange = getScrollBoxHeight
})

onBeforeMount(() => {
  // 模拟请求数据
  getAllSanxin(30)
})
</script>

<template>
  <div ref="scrollBox" class="v-scroll" @scroll.passive="doScroll">
    <div :style="blankStyle" style="height: 100%">
      <div v-for="item in tempSanxins" :key="item.id" class="scroll-item">
        <span>{{ item.msg }}</span>
        <img :src="item.src">
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.v-scroll {
  height: 800px;
  /* padding-bottom: 500px; */
  overflow: auto;

}
.scroll-item {
  height: 148px;
  /* width: 100%; */
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

}

.scroll-item img {
  height: 100%;
}
</style>
