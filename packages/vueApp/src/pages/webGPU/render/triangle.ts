import type { WebGPUContext } from '../utils'
import { triangleFrag, triangleVertex } from '../utils/wgsl'

export default function renderTriangle(data: WebGPUContext) {
  const { device, format, canvasContext } = data

  const vertexArr = new Float32Array([
    // 三角形三个顶点坐标的x、y、z值
    0.0, 0.0, 0.0, // 顶点1坐标
    1.0, 0.0, 0.0, // 顶点2坐标
    0.0, 1.0, 0.0, // 顶点3坐标
  ])

  const vertexBuffer = device.createBuffer({
    size: vertexArr.byteLength,
    // COPY_DST 该缓冲区可以写入顶点数据，作为复制顶点数据的目的地。
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })
  // 把vertexArray里面的顶点数据写入到vertexBuffer对应的GPU显存缓冲区中
  // 参数2的0表示从vertexArray的数据开头读取数据。
  device.queue.writeBuffer(vertexBuffer, 0, vertexArr)

  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      // 顶点着色器
      module: device.createShaderModule({ code: triangleVertex }),
      entryPoint: 'main',
      buffers: [
        {
          // 一个顶点数据占用的字节长度
          arrayStride: 3 * 4,
          attributes: [{
            shaderLocation: 0, // wgsl 设置着色器的location
            // *3 代表3个数据一组
            format: 'float32x3',
            offset: 0,
          }],
        },
      ],
    },
    fragment: {
      // 片元着色器
      module: device.createShaderModule({ code: triangleFrag }),
      entryPoint: 'main',
      targets: [{
        format, // 和WebGPU上下文配置的颜色格式保持一致
      }],
    },
    primitive: {
      topology: 'triangle-list', // 三角形绘制顶点数据
    },
  })

  const commandEncoder = device.createCommandEncoder()
  // 渲染通道
  const renderPass = commandEncoder.beginRenderPass({
    // 指定 renderPass(渲染通道)的 颜色缓冲区
    colorAttachments: [{
      // 指向用于Canvas画布的纹理视图对象(Canvas对应的颜色缓冲区)
      // 该渲染通道renderPass输出的像素数据会存储到Canvas画布对应的颜色缓冲区(纹理视图对象)
      view: canvasContext.getCurrentTexture().createView(),
      storeOp: 'store', // 像素数据写入颜色缓冲区
      clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.1 }, // 背景颜色
      loadOp: 'clear',
    }],
  })

  renderPass.setPipeline(pipeline)

  // 关联顶点缓冲区数据和渲染管线 shaderLocation: 0
  renderPass.setVertexBuffer(0, vertexBuffer)
  renderPass.draw(3)
  renderPass.end()

  // 命令编码器.finish()创建命令缓冲区(生成GPU指令存入缓冲区)
  const commandBuffer = commandEncoder.finish()
  device.queue.submit([commandBuffer])
}
