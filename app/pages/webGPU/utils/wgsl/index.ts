// 两个location 一个代表 顶点缓冲区的 标记， 一个代表显存的标记

export const triangle = /* wgsl */`
  // @vertex 代表这是一个顶点着色器代码,在GPU渲染管线的顶点着色器单元上执行
  // 函数名 是 createRenderPipeline 中 vertex.entryPoint 的属性值
  //  createRenderPipeline中 vertex.buffers.shaderLocation 的
  // renderPass.setVertexBuffer 设置 createRenderPipeline中 vertex.buffers 的值
  // createRenderPipeline中 vertex.buffers 的值 传递给 @vertex 函数
  // @vertex 函数的返回值 根据 @location(value) 传递给 @fragment 函数
  @vertex 
  fn vertex(@location(0) pos: vec3<f32>) -> @builtin(position) vec4<f32> {
    var pos2 = vec4<f32>(pos, 1.0);//pos转齐次坐标
    var S = mat4x4<f32>(
      0.5, 0.0, 0.0, 0.0, 
      0.0, 0.5, 0.0, 0.0,  
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
    return pos2*S;
  }

  // @location(0) 返回值储存到显存上，位置标记为 0
  @fragment
  fn fragment() -> @location(0) vec4<f32> {
    return vec4<f32>(0.91, 0.5, 0.59, 0.5);
  }
`

// 渐变wgsl
export const gradient = /* wgsl */`
  struct Out {
    @builtin(position) position : vec4<f32>,
    // vColor表示顶点颜色插值后，每个片元对应的颜色数据
    @location(0) vColor: vec4<f32>
  }

  @vertex 
  fn vertex(@location(0) pos: vec3<f32>, @location(1) color: vec3<f32>) -> Out {
    var out: Out;
    out.position = vec4<f32>(pos,1.0);
    out.vColor = vec4<f32>(color, 1.0);
    return out;
  };

  @fragment
  fn fragment(@location(0) vColor2: vec4<f32>) -> @location(0) vec4<f32> {
    return vColor2;
  };
`

// rotate动画
export const rotate = /* wgsl */`
  //@group(0)的参数0对应webgpu代码.getBindGroupLayout(0)参数0
  //@binding(0)的参数对应webgpu代码 createBindGroup.entries.binding的值，保持一致，比如都是0
  @group(0) @binding(0) var<uniform> S: mat4x4<f32>;

  struct Out {
    @builtin(position) pos: vec4<f32>,
    @location(0) color: vec4<f32>
  }

  @vertex
  fn vertex(@location(0) pos: vec3<f32>, @location(1) color: vec3<f32>) -> Out {
    var out: Out;
    // out.pos = vec4<f32>(pos, 1.0);
    out.pos = S * vec4<f32>(pos, 1.0);
    out.color = vec4<f32>(color, 1.0);
    return out;
  }

  @fragment
  fn fragment(@location(0) color: vec4<f32>) -> @location(0) vec4<f32> {
    return color;
  }
`
// 粒子波浪
export const pointsWave = /* wgsl */`
  //@group(0)的参数0对应webgpu代码.getBindGroupLayout(0)参数0
  //@binding(0)的参数对应webgpu代码 createBindGroup.entries.binding的值，保持一致，比如都是0
  @group(0) @binding(0) var<uniform> S: mat4x4<f32>;

  struct Out {
    @builtin(position) pos: vec4<f32>,
    @location(0) color: vec4<f32>
  }

  @vertex
  fn vertex(@location(0) pos: vec3<f32>, @location(1) color: vec3<f32>) -> Out {
    var out: Out;
    // out.pos = vec4<f32>(pos, 1.0);
    out.pos = S * vec4<f32>(pos, 1.0);
    out.color = vec4<f32>(color, 1.0);
    return out;
  }

  @fragment
  fn fragment(@location(0) color: vec4<f32>) -> @location(0) vec4<f32> {
    return color;
  }
`
