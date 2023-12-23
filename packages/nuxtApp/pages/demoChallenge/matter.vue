<script lang='ts' setup>
import type { IChamferableBodyDefinition, World } from 'matter-js'
import {
  Bodies,
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from 'matter-js'

const canvas = ref<HTMLCanvasElement>()
const engine = shallowRef<Engine>()
const render = shallowRef<Render>()
const runner = shallowRef<Runner>()
const mouse = shallowRef<Mouse>()

function createBox(options?: IChamferableBodyDefinition) {
  const box = Bodies.rectangle(400, 0, 80, 80, options)
  return box
}

function addWorld(world: World, body: Parameters<typeof Composite.add>[1]) {
  Composite.add(world, body)
}

function addClickEvent() {
  mouse.value = Mouse.create(canvas.value!)
  const mc = MouseConstraint.create(engine.value!)
  Events.on(mc, 'mouseup', () => {
    const box = createBox()
    addWorld(engine.value!.world, box)
  })
}

function init() {
  // create an engine
  engine.value = Engine.create()

  // create a renderer
  render.value = Render.create({
    engine: engine.value,
    canvas: canvas.value,
    options: {
      width: 800,
      height: 600,
      wireframes: false,
      background: isDark.value ? '#121212' : '#fff',
    },
  })

  // create two boxes and a ground
  const boxA = createBox({
    render: {
      fillStyle: '#df0000',
      strokeStyle: '#df0000',
    },
  })
  const ground = Bodies.rectangle(600, 300, 400, 60, {
    isStatic: true,
    render: {
      fillStyle: '#4c9a80',
      strokeStyle: '#df0000',
      lineWidth: 5,

    },
    chamfer: {

      radius: 5,
    },
  })

  // add all of the bodies to the world
  Composite.add(engine.value.world, [boxA, ground])

  // run the renderer
  Render.run(render.value)

  // create runner
  runner.value = Runner.create()

  // run the engine
  Runner.run(runner.value, engine.value)
}

/**
 * 监听主题变化 改变canvas颜色
 */
watch(isDark, () => {
  if (render.value)
    render.value.options.background = isDark.value ? '#121212' : '#fff'
    // init()
})

onMounted(() => {
  init()
  addClickEvent()
})
</script>

<template>
  <div flex items-center justify-center>
    <canvas ref="canvas" border="~ gray-400" />
  </div>
</template>
