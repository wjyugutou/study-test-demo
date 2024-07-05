import * as glMatrix from 'gl-matrix'
import type { WebGPUContext } from '..'
import { rotate } from '../wgsl'

let i = 0

export default async function renderRotate(data: WebGPUContext) {
  const { device, format, canvasContext } = data
  i = 0

  // uniform
  const modelMatrix = glMatrix.mat4.create() as Float32Array
  // 绕z旋转 10 度
  glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, 0)
  // 在GPU显存上创建一个uniform数据缓冲区
  const uniformBuffer = device.createBuffer({
    size: modelMatrix.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(uniformBuffer, 0, modelMatrix)

  const x_y = Math.tan(Math.PI / 6) * 0.5
  const y_y = Math.cos(Math.PI / 6) - x_y
  // 顶点数据
  const vertexData = new Float32Array([
    0.0, y_y, 0.0,
    -0.5, -x_y, 0.0,
    0.5, -x_y, 0.0,
  ])
  const vertexBuffer = device.createBuffer({
    size: vertexData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(vertexBuffer, 0, vertexData)

  // 颜色顶点
  const fragData = new Float32Array([
    // 0.49, 0.24, 0.91,
    // 0.91, 0.5, 0.59,
    // 0.13, 0.91, 0.3,
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ])
  const fragBuffer = device.createBuffer({
    size: fragData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(fragBuffer, 0, fragData)

  const pipeline = await device.createRenderPipelineAsync({
    layout: 'auto',
    vertex: {
      module: device.createShaderModule({ code: rotate }),
      buffers: [
        {
          arrayStride: 3 * 4,
          attributes: [{
            shaderLocation: 0,
            // *3 代表3个数据一组
            format: 'float32x3',
            offset: 0,
          }],
        },
        {
          arrayStride: 3 * 4,
          attributes: [{
            shaderLocation: 1,
            // *3 代表3个数据一组
            format: 'float32x3',
            offset: 0,
          }],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({ code: rotate }),
      targets: [{
        format,
      }],
    },
    primitive: {
      topology: 'triangle-strip',
    },
  })

  // 设置uniform数据的绑定组
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0), // 绑定组，标记为0
    // 一个组里面可以包含多个uniform数据
    entries: [// 每个元素可以用来设置一个uniform数据
      {
        binding: 0, // 标记组里面的uniform数据
        resource: { buffer: uniformBuffer },
      },
    ],
  })

  let destroy = false
  function render() {
    if (destroy)
      return

    // uniform
    const modelMatrix = glMatrix.mat4.create() as Float32Array

    // 绕z旋转 10 度
    glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, 180 * i / Math.PI)

    device.queue.writeBuffer(uniformBuffer, 0, modelMatrix)

    const commandEncoder = device.createCommandEncoder()
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: canvasContext.getCurrentTexture().createView(),
        loadOp: 'clear',
        storeOp: 'store',
      }],
    })

    renderPass.setPipeline(pipeline)

    renderPass.setBindGroup(0, bindGroup)
    renderPass.setVertexBuffer(0, vertexBuffer)
    renderPass.setVertexBuffer(1, fragBuffer)

    renderPass.draw(3)
    renderPass.end()

    const commandBuffer = commandEncoder.finish()
    device.queue.submit([commandBuffer])

    i += 0.005 / 60

    window.requestAnimationFrame(render)
  }

  render()

  return () => {
    destroy = true
  }
}
