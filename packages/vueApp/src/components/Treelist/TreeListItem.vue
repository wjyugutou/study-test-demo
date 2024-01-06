<script lang='ts' setup>
import type { TreeData } from './type'

const props = defineProps<{
  data: TreeData
}>()

const [collapse, setCollapse] = useToggle(false)
</script>

<template>
  <div class="tree flex-center hover:bg-dark-400" v-bind="$attrs">
    <div class="flex-center">
      <ArrowIcon v-if="data.children && data.children.length > 0" class="tree-title-arrow" duration="0.3s" :rotate="collapse" @click="setCollapse()" />
      <span>{{ data.title }}</span>
    </div>
    <span class="division-line border-gray-400" />
    <div>20201-1-1</div>
  </div>
  <TreeListItem v-for="item, index in data.children" :key="index" class="tree-item-secondary" :data="item" />
</template>

<style>
   .tree {
    --tree-collapse-time: 0.3s;
    --tree-collapse-timing: linear;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    padding: 0 10px;
    cursor: pointer;

    & .tree-title-arrow {
      transition-timing-function: var(--tree-collapse-timing) ;
      transition-duration: var(--tree-collapse-time) ;
      transition-property: all ;
    }

   & .division-line {
      display: inline-block;
      margin: 0 16px;
      border-top: 1px dashed;
      flex: 1;
    }
  }

  .tree-item-secondary {
    padding-left: 50px;
  }
</style>
