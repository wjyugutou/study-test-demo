interface Options {
  gl: WebGL2RenderingContext
  vertexShaderSource: string
  fragShaderSource: string
}
// 声明初始化着色器函数
export function initShader({ gl, vertexShaderSource, fragShaderSource }: Options) {
  // 创建顶点着色器对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
  // 创建片元着色器对象
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
  // 引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.shaderSource(fragmentShader, fragShaderSource)
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

export function rgbTopercentage(r: number, g: number, b: number) {
  return `${255 / r},${255 / g},${255 / b}`
}

export function renderAxis(gl: WebGL2RenderingContext) {
  function renderX() {
    const vertexShaderSource = `
    attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`

    const fragShaderSource = `
    void main() {
      gl_FragColor = vec4(0.56, 0.94, 0.9, 1.0);
    }
    `

    // 初始化着色器
    const program = initShader({ gl, vertexShaderSource, fragShaderSource })

    // 获取顶点着色器的位置变量apos
    const aposLocation = gl.getAttribLocation(program, 'apos')

    // 创建立方体的顶点坐标数据
    const data = new Float32Array([
      0, 0, 0,
      // 2point
      1, 0, 0,
    ])

    // 创建缓冲区对象
    const buffer = gl.createBuffer()
    // 绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // 顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    // 缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0)
    // 允许数据传递
    gl.enableVertexAttribArray(aposLocation)

    // LINE_LOOP模式绘制前四个点
    gl.drawArrays(gl.LINES, 0, 2)
  // LINE_LOOP模式从第五个点开始绘制四个点
  }
  function renderY() {
    const vertexShaderSource = `
    attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`

    const fragShaderSource = `
    void main() {
      gl_FragColor = vec4(${rgbTopercentage(78, 240, 46)}, 1.0);
    }
  `

    // 初始化着色器
    const program = initShader({ gl, vertexShaderSource, fragShaderSource })

    // 获取顶点着色器的位置变量apos
    const aposLocation = gl.getAttribLocation(program, 'apos')

    // 创建立方体的顶点坐标数据
    const data = new Float32Array([
      0, 0, 0,
      // 2point
      0, 1, 0,
    ])

    // 创建缓冲区对象
    const buffer = gl.createBuffer()
    // 绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // 顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    // 缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0)
    // 允许数据传递
    gl.enableVertexAttribArray(aposLocation)

    // LINE_LOOP模式绘制前四个点
    gl.drawArrays(gl.LINES, 0, 2)
  // LINE_LOOP模式从第五个点开始绘制四个点
  }
  function renderZ() {
    const vertexShaderSource = `
    attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`

    const fragShaderSource = `
    void main() {
      gl_FragColor = vec4(${rgbTopercentage(240, 91, 210)}, 1.0);
    }
  `

    // 初始化着色器
    const program = initShader({ gl, vertexShaderSource, fragShaderSource })

    // 获取顶点着色器的位置变量apos
    const aposLocation = gl.getAttribLocation(program, 'apos')

    // 创建立方体的顶点坐标数据
    const data = new Float32Array([
      0, 0, 0,
      // 2point
      0, 0, 1,
    ])

    // 创建缓冲区对象
    const buffer = gl.createBuffer()
    // 绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // 顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    // 缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0)
    // 允许数据传递
    gl.enableVertexAttribArray(aposLocation)

    // LINE_LOOP模式绘制前四个点
    gl.drawArrays(gl.LINES, 0, 2)
  // LINE_LOOP模式从第五个点开始绘制四个点
  }

  renderX()
  renderY()
  renderZ()
}
