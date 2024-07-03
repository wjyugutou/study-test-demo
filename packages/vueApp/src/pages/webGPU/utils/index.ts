export interface WebGPUContext {
  readonly adapter: GPUAdapter
  readonly device: GPUDevice
  readonly format: GPUTextureFormat
  readonly canvas: HTMLCanvasElement
  readonly canvasContext: GPUCanvasContext
}

export async function initWebGPU() {
  let adapter: GPUAdapter | null = null
  let device: GPUDevice | null = null
  let format: GPUTextureFormat | null = null
  let isError = false
  try {
    format = navigator.gpu.getPreferredCanvasFormat()

    adapter = (await navigator.gpu.requestAdapter())!

    device = await adapter.requestDevice()
    isError = false
  }
  catch (error) {
    console.error(error)
    isError = true
    // eslint-disable-next-line no-alert
    alert('不支持WebGPU')
  }

  return {
    adapter,
    device,
    format,
    isError,
  }
}
