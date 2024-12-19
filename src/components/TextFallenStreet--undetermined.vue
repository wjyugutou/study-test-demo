<script lang='ts' setup>
import { random } from 'lodash-es'

const text = ref('\u00A0你好世界你好世界你好世界')

function randomLStyle(color: string, text: string) {
  const length = text.length
  const index = random(0, length - 1)
  let str = ''
  console.log(text, length)
  const stra = `inear-gradient(90deg, currentcolor 0%, 
currentcolor 7.59231%, 
currentcolor 7.69231%, 
currentcolor 15.2846%, rgb(186, 136, 179) 15.3846%, rgb(186, 136, 179) 22.9769%, 
currentcolor 23.0769%, 
currentcolor 30.6692%, 
currentcolor 30.7692%, 
currentcolor 38.3615%, 
currentcolor 38.4615%, 
currentcolor 46.0538%, 
currentcolor 46.1538%, 
currentcolor 53.7462%, 
currentcolor 53.8462%, 
currentcolor 61.4385%, 
currentcolor 61.5385%, 
currentcolor 69.1308%, 
currentcolor 69.2308%, 
currentcolor 76.8231%, 
currentcolor 76.9231%, 
currentcolor 84.5154%, 
currentcolor 84.6154%, currentcolor 92.2077%, currentcolor 92.3077%, currentcolor 99.9%);`

  for (let i = 0; i < length; i++) {
    if (index === i) {
      str += `${color} ${i / length * 100}%${i === length ? '' : ', '}`
      + `${color} ${(i + 1) / length * 100 - 0.1}%${i === length - 1 ? '' : ', '}`

      continue
    }

    str += `currentColor ${(i) / length * 100}%${i === length ? '' : ', '}`
    + `currentColor ${(i + 1) / length * 100 - 0.1}%${i === length - 1 ? '' : ', '}`
  }

  return `
    --color: ${color};
    background-image: linear-gradient(90deg, ${str});
  `
}
let t: string | number | NodeJS.Timeout | undefined
function getStyle() {
  console.log(111)

  const color = randomColor()

  const style = ref(randomLStyle(color, text.value))
  clearInterval(t)

  t = setInterval(() => {
    console.log('interval')

    style.value = randomLStyle(color, text.value)
  }, 1000)

  return style.value
}

onBeforeMount(() => {

})

onUnmounted(() => {
  clearInterval(t)
})
</script>

<template>
  <ul class="fallen-street">
    <li class="" :data-text="text" :style="getStyle()">
      {{ text }}
    </li>
    <li class="" :style="`--color: ${randomColor()};`">
      <!-- <span :data-text="text"> home</span> -->
      {{ text }}
    </li>
  </ul>
  <div class="test">
    你好世界
  </div>
</template>

<style>
.test {
  width: fit-content;
  font-size: 50px;
  color: transparent;
  background-image: linear-gradient(90deg, red 0%, red 24.9%, blue 25%, blue 49.9%, green 50%, green 74.9%, black 75%);
}

.fallen-street {
  position: relative;

  & > li {
    position: relative;
    font-size: 40px;
    letter-spacing: 1em;
    background-color: #fff;
    mix-blend-mode: difference;

    &::marker {
      color: red;
    }

    &,
    & > span {
      position: relative;
      width: fit-content;
      text-transform: capitalize;
      color: transparent;
      background-clip: text;

      &::before {
        overflow: hidden;
        position: absolute;
        border-right: 2px solid var(--color);
        width: 0;
        color: var(--color);
        transition: 1s;
        content: attr(data-text);
      }

      &:hover::before {
        width: 100%;
        filter: drop-shadow(0 0 1em var(--color));
      }
    }
  }
}
</style>
