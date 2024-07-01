<script lang='ts' setup>
import type { ShallowRef } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const glContext = shallowRef() as ShallowRef<WebGL2RenderingContext>
const width = ref(0)
const height = ref(0)
function initGL() {
  glContext.value = canvas.value!.getContext('webgl2')!
}

// 声明初始化着色器函数
function initShader(vertexShaderSource: string, fragmentShaderSource: string) {
  const gl = glContext.value
  // 创建顶点着色器对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
  // 创建片元着色器对象
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
  // 引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.shaderSource(fragmentShader, fragmentShaderSource)
  // 编译顶点、片元着色器
  gl.compileShader(vertexShader)
  gl.compileShader(fragmentShader)

  // 创建程序对象program
  const program = gl.createProgram()!
  // 附着顶点着色器和片元着色器到program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  // 链接program
  gl.linkProgram(program)
  // 使用program
  gl.useProgram(program)
  // 返回程序program对象
  return program
}

function renderPointer() {
  const gl = glContext.value
  // 顶点着色器源码
  const vertexShaderSource = ''
    + 'void main() {'
    // 给内置变量gl_PointSize赋值像素大小
    + '   gl_PointSize = 20.0;'
    // 顶点位置，位于坐标原点
    + '   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);'
    + '}'

  // 片元着色器源码
  const fragShaderSource = ''
    + 'void main() {'
    // 定义片元颜色 代表红色
    + '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);'
    + '}'

  // 初始化着色器
  const program = initShader(vertexShaderSource, fragShaderSource)
  // 开始绘制，显示器显示结果
  gl.drawArrays(gl.POINTS, 0, 1)
}

function renderRect() {
  const gl = glContext.value
  // attribute声明vec4类型变量apos
  const vertextShader = ` attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`
  // 逐片元处理数据，所有片元(像素)设置为红色
  const fragShader = `void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }`
  const program = initShader(vertextShader, fragShader)

  // 获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
  const aposLocation = gl.getAttribLocation(program, 'apos')

  // 类型数组构造函数Float32Array创建顶点数组
  const data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5])

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

onMounted(() => {
  width.value = canvas.value!.parentElement!.clientWidth
  height.value = canvas.value!.parentElement!.clientHeight
  nextTick(() => {
    initGL()
    // renderPointer()
    renderRect()
  })
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
