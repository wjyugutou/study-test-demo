export const triangleVertex = /* wgsl */`
// @vertex 代表这是一个顶点着色器代码,在GPU渲染管线的顶点着色器单元上执行
// 函数名 main 是 createRenderPipeline 中 vertex.entryPoint 的属性值
// @location createRenderPipeline 中 vertex.buffers.shaderLocation 的属性值
@vertex 
fn main(@location(0) pos: vec3<f32>) -> @builtin(position) vec4<f32> {
  var pos2 = vec4<f32>(pos, 1.0);//pos转齐次坐标
  // pos2.x -= 0.2;//偏移所有顶点的x坐标
  return pos2;
}
`

// @location(0) 返回值储存到显存上，位置标记为 0
export const triangleFrag = /* wgsl */`
@fragment
fn main() -> @location(0) vec4<f32> {
  return vec4<f32>(0.49, 0.24, 0.91, 1.0);
}
`

// 两个location 一个代表 顶点缓冲区的 标记， 一个代表显存的标记
