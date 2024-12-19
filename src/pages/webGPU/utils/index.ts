export interface WebGPUContext {
  readonly adapter: GPUAdapter
  readonly device: GPUDevice
  readonly format: GPUTextureFormat
  readonly canvas: HTMLCanvasElement
  readonly canvasContext: GPUCanvasContext
}

export async function initWebGPU() {
  const format = navigator.gpu.getPreferredCanvasFormat()

  const adapter = (await navigator.gpu.requestAdapter())!

  const device = await adapter.requestDevice()

  return {
    adapter,
    device,
    format,
  }
}
