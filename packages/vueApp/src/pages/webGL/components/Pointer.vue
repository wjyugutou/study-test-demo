<script lang='ts' setup>
import type { ShallowRef } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const glContext = shallowRef() as ShallowRef<WebGL2RenderingContext>
const width = ref(0)
const height = ref(0)
function initGL() {
  glContext.value = canvas.value!.getContext('webgl2')!
}

function renderPointer() {
  const gl = glContext.value
  // 顶点着色器源码
  const vertexShaderSource = ''
    + 'void main() {'
    // 给内置变量gl_PointSize赋值像素大小
    + '   gl_PointSize = 20.0;'
    // 顶点位置，位于坐标原点
    + '   gl_Position = vec4(0.5, 0.5, 0.5, 1.0);'
    + '}'

  // 片元着色器源码
  const fragShaderSource = ''
    + 'void main() {'
    // 定义片元颜色 代表红色
    + '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);'
    + '}'

  // 初始化着色器
  const _program = initShader({
    gl: glContext.value, vertexShaderSource, fragShaderSource,
  })
  // 开始绘制，显示器显示结果
  gl.drawArrays(gl.POINTS, 0, 1)
}

function renderRect() {
  const gl = glContext.value
  const vertexShaderSource = ` 
  // 用attribute声明vec4类型变量apos
  attribute vec4 apos;
  void main() {
    //顶点坐标apos赋值给内置变量gl_Position
    //逐顶点处理数据
    gl_Position = apos;
  }`
  // 逐片元处理数据，所有片元(像素)设置为红色
  const fragShaderSource = `
  void main() {
    gl_FragColor = vec4(1.0,1.0,0.0,1.0);
  }`
  const program = initShader({ gl: glContext.value, vertexShaderSource, fragShaderSource })

  // 获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
  const aposLocation = gl.getAttribLocation(program, 'apos')

  // 类型数组构造函数Float32Array创建顶点数组
  const data = new Float32Array([
    0.5, 0.5,
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, -0.5])

  // 创建缓冲区对象
  const buffer = gl.createBuffer()
  // 绑定缓冲区对象,激活buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  // 顶点数组data数据传入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  // 缓冲区中的数据按照一定的规律传递给位置变量apos
  gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0)
  // 允许数据传递
  gl.enableVertexAttribArray(aposLocation)

  // 开始绘制图形
  gl.drawArrays(gl.LINE_LOOP, 0, 4)
}

function initial() {
  width.value = canvas.value!.parentElement!.clientWidth
  height.value = canvas.value!.parentElement!.clientHeight
  nextTick(() => {
    initGL()
    renderPointer()
    renderRect()
  })
}

onMounted(() => {
  initial()
})

useEventListener('resize', () => {
  initial()
})
</script>

<template>
  <div class="h-[calc(100vh-var(--footer-height))] max-w-full max-h-full">
    <canvas ref="canvas" :width="width" :height="height" />
  </div>
</template>

<route lang="json">
  {
    "meta": {
      "starBg": false
    }
  }
</route>
