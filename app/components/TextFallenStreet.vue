<script lang='ts' setup>

const props = defineProps<{
  list: { title: string, [key: string]: any }[]
}>()

const _list = computed(() => {
  return props.list.map((item) => {
    item.title = `\u00A0${item.title}`
    item.TFS_color = randomColor()
    return item
  })
})

const TextFallenStreetItem = defineComponent((props) => {
  const spans = ref<HTMLSpanElement[]>([])

  onMounted(() => {
    spans.value!.forEach((span) => {
      span.style.animationDuration = `${Math.random() * 5 + 0.25}s`
    })
  })

  return () => props.text.split('').map((str, index) => (h('span', { ref: ref => spans.value.push(ref as HTMLSpanElement) }, str)))
}, {
  name: 'TextFallenStreetItem',
  props: { text: String, color: String },
})
</script>

<template>
  <ul class="fallen-street">
    <template v-for="item, index in _list" :key="index">
      <li class="" :data-text="item.title" :style="`--color: ${item.TFS_color}`">
        <TextFallenStreetItem :text="item.title" :color="item.TFS_color" />
      </li>
    </template>
  </ul>
</template>

<style>
.fallen-street {
  position: relative;

  & > li {
    position: relative;
    width: fit-content;
    font-size: 40px;
    letter-spacing: 1em;
    text-transform: capitalize;

    & > span {
      animation: animate-text linear infinite;
    }

    &::before {
      overflow: hidden;
      position: absolute;
      border-right: 0.25em solid var(--color);
      width: 0;
      color: var(--color);
      transition: 1s;
      content: attr(data-text);
    }

    &:hover {
      &::before {
        width: 100%;
        filter: drop-shadow(0 0 1em var(--color));
      }

      & > span {
        animation: none;
      }
    }

  }
}

@keyframes animate-text {
  0%,
  20% {
    filter: drop-shadow( 0 0 0 var(--color));
  }

  21.001%,
  79.999% {
    color: var(--color);
    filter: drop-shadow( 0 0 25px var(--color));
  }

 80%,
 100% {
    filter: drop-shadow( 0 0 0 var(--color));
  }
}
</style>
