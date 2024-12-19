<script lang='ts' setup>
import type { ShallowRef } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const glContext = shallowRef() as ShallowRef<WebGL2RenderingContext>
const width = ref(0)
const height = ref(0)
function initGL() {
  glContext.value = canvas.value!.getContext('webgl2')!
}

function renderGradientLine() {
  const gl = glContext.value
  // 顶点着色器源码
  const vertexShaderSource = `
  //attribute声明vec4类型变量apos
  attribute vec4 apos;
  // attribute声明顶点颜色变量
  attribute vec4 a_color;
  //varying声明顶点颜色插值后变量
  varying vec4 v_color;
  void main() {
    // 顶点坐标apos赋值给内置变量gl_Position
    gl_Position = apos;
    //顶点颜色插值计算
    v_color = a_color;
  }
  `

  // 片元着色器源码
  // 所有float类型数据的精度是lowp
  // 接收顶点着色器中v_color数据
  // 插值后颜色数据赋值给对应的片元
  const fragShaderSource = `
  precision lowp float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
  `

  // 初始化着色器
  const program = initShader({ gl: glContext.value, vertexShaderSource, fragShaderSource })

  /**
    创建顶点位置数据数组data，存储两个顶点(-0.5,0.5、(0.5,0.5)
    创建顶点颜色数组colorData，存储两个顶点对应RGB颜色值(0,0,1)、(1,0,0)
   */
  const data = new Float32Array([
    -0.5, 0.5,
    0.5, 0.5,
  ])
  // 两个颜色顶点, 对应线段两个顶点
  const colorData = new Float32Array([
    0, 1, 1,
    1, 1, 0,
  ])

  /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
   */
  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW)
  // 给着色器里的 a_color 变量 赋值
  const a_color = gl.getAttribLocation(program, 'a_color')
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_color)
  /**
     创建缓冲区buffer，传入顶点位置数据data
   */
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  const aposLocation = gl.getAttribLocation(program, 'apos')
  gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(aposLocation)

  /** 执行绘制命令 */
  gl.drawArrays(gl.LINES, 0, 2)
}

function renderGradientTriangle() {
  const gl = glContext.value
  const vertexShaderSource = `
  attribute vec4 a_pos;
  attribute vec4 a_color;
  varying vec4 v_color;
  void main() {
    gl_Position = a_pos;
    v_color = a_color;
  }
  `
  const fragShaderSource = `
  // 设置所有float的精度
  precision lowp float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
  `

  const program = initShader({ gl, vertexShaderSource, fragShaderSource })

  const data = new Float32Array([
    0.0, 0.5, 0,
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
  ])

  const colorData = new Float32Array([
    0.49, 0.24, 0.91,
    0.91, 0.5, 0.59,
    0.13, 0.91, 0.3,
  ])

  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW)
  const a_color = gl.getAttribLocation(program, 'a_color')
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_color)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  const a_pos = gl.getAttribLocation(program, 'a_pos')
  gl.vertexAttribPointer(a_pos, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_pos)

  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function initial() {
  width.value = canvas.value!.parentElement!.clientWidth
  height.value = canvas.value!.parentElement!.clientHeight
  nextTick(() => {
    initGL()
    renderGradientLine()
    renderGradientTriangle()
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
