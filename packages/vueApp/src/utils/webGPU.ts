export async function initWEBGPU(): Promise<{
  adapter: GPUAdapter
  device: GPUDevice
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.gpu)
      reject(new Error('WebGPU not supported.'))
    // const adapter = await navigator.gpu.requestAdapter()
    // const device = await adapter?.requestDevice()
    navigator.gpu.requestAdapter().then((adapter) => {
      adapter?.requestDevice().then(device => resolve({
        adapter,
        device,
      }))
    })
  })
}
