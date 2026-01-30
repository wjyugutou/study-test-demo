import{c as T,r as E}from"./glmatrix-Bhxl8LeJ.js";import{b as F}from"../../assets/index-ByPwO6BV.js";import{d as z,U as D,o as j,c as S,e as B,Z as R,u as x,j as b,F as k,l as Y,n as I,v as X,b as U,V as N,h as W}from"./vue-BNDGywnP.js";import{b as V}from"./route-block-B_A1xBdJ.js";import"./particles-DxQy181U.js";import"./shiki-CGx1dPWx.js";const A=`
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
`,L=`
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
`,q=`
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
`;let O=0;async function Z(l){const{device:e,format:i,canvasContext:m}=l;O=0;const t=T();E(t,t,0);const r=e.createBuffer({size:t.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(r,0,t);const c=Math.tan(Math.PI/6)*.5,f=Math.cos(Math.PI/6)-c,o=new Float32Array([0,f,0,-.5,-c,0,.5,-c,0]),n=e.createBuffer({size:o.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(n,0,o);const d=new Float32Array([1,0,0,0,1,0,0,0,1]),s=e.createBuffer({size:d.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(s,0,d);const v=await e.createRenderPipelineAsync({layout:"auto",vertex:{module:e.createShaderModule({code:q}),buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:q}),targets:[{format:i}]},primitive:{topology:"triangle-strip"}}),w=e.createBindGroup({layout:v.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:r}}]});let _=!1;function y(){if(_)return;const g=T();E(g,g,180*O/Math.PI),e.queue.writeBuffer(r,0,g);const p=e.createCommandEncoder(),u=p.beginRenderPass({colorAttachments:[{view:m.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store"}]});u.setPipeline(v),u.setBindGroup(0,w),u.setVertexBuffer(0,n),u.setVertexBuffer(1,s),u.draw(3),u.end();const h=p.finish();e.queue.submit([h]),O+=.005/60,window.requestAnimationFrame(y)}return y(),()=>{_=!0}}const H=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function K(l){const{device:e,format:i,canvasContext:m}=l,t=new Float32Array([0,0,0,1,0,0,0,1,0]),r=e.createBuffer({size:t.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(r,0,t);const c=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:A}),entryPoint:"vertex",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:A}),entryPoint:"fragment",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),f=e.createCommandEncoder(),o=f.beginRenderPass({colorAttachments:[{view:m.getCurrentTexture().createView(),storeOp:"store",clearValue:{r:0,g:0,b:0,a:.5},loadOp:"clear"}]});o.setPipeline(c),o.setVertexBuffer(0,r),o.draw(3),o.end();const n=f.finish();e.queue.submit([n])}const $=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function J(l){const{device:e,format:i,canvasContext:m}=l,t=Math.cos(Math.PI/6)*.5,r=new Float32Array([0,t,0,-.5,-t,0,.5,-t,0]),c=e.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(c,0,r);const f=new Float32Array([.49,.24,.91,.91,.5,.59,.13,.91,.3]),o=e.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(o,0,f);const n=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:L}),entryPoint:"vertex",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:L}),entryPoint:"fragment",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),d=e.createCommandEncoder(),s=d.beginRenderPass({colorAttachments:[{view:m.getCurrentTexture().createView(),storeOp:"store",clearValue:{r:0,g:0,b:0,a:.5},loadOp:"clear"}]});s.setPipeline(n),s.setVertexBuffer(0,c),s.setVertexBuffer(1,o),s.draw(3),s.end();const v=d.finish();e.queue.submit([v])}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));async function ee(){const l=navigator.gpu.getPreferredCanvasFormat(),e=await navigator.gpu.requestAdapter(),i=await e.requestDevice();return{adapter:e,device:i,format:l}}const te={class:"h-[calc(100vh-42px-var(--footer-height))] max-h-full max-w-full relative"},re={class:"right-10 top-10 absolute"},oe={class:"flex gap-20px h-42px"},ae=["onClick"],ne={class:"h-[calc(100vh-var(--footer-height))] max-h-full max-w-full"},se=["width","height"],ie=z({__name:"index",async setup(l){let e,i;const t=Object.values(Object.assign({"./utils/render/rotate.ts":H,"./utils/render/triangle.ts":$,"./utils/render/triangleGradient.ts":Q})).reduce((a,C)=>(a[C.default.name]=C.default,a),{}),r=F("webGPU-activename",Reflect.ownKeys(t)[0]),{adapter:c,device:f,format:o}=([e,i]=D(()=>ee()),e=await e,i(),e),n=b(),d=b(0),s=b(0),v=b(),w=X(W({adapter:c,device:f,format:o,canvas:n,canvasContext:v}));function _(){d.value=n.value.parentElement.clientWidth,s.value=n.value.parentElement.clientHeight,v.value=n.value.getContext("webgpu"),v.value.configure({device:f,format:o})}function y(a){r.value=a,p()}let g;function p(){g?.then(a=>a()),I(()=>{try{g=t[r.value](w)}catch(a){console.error(a)}})}let u=0,h=performance.now();const G=b("0");function M(){requestAnimationFrame(M);const a=performance.now();u++,a-h>=1e3&&(G.value=(u/(a-h)*1e3).toFixed(0),u=0,h=a)}return M(),j(()=>{_(),p()}),(a,C)=>(U(),S("div",te,[B("div",re,R(x(G)),1),B("div",oe,[(U(!0),S(k,null,Y(x(t),(ce,P)=>(U(),S("div",{key:P,class:N(["cursor-pointer hover:text-blue",P===x(r)&&"text-blue"]),onClick:ue=>y(P)},R(P),11,ae))),128))]),B("div",ne,[B("canvas",{ref_key:"canvas",ref:n,width:x(d),height:x(s)},null,8,se)])]))}});typeof V=="function"&&V(ie);export{ie as default};
