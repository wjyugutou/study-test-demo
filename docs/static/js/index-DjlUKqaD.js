import{d as D,D as k,w as z,s as j,c as S,b as B,t as A,f as x,r as _,F as Y,k as I,aI as X,aJ as N,o as U,n as W,R as H}from"../../assets/index-BaHEQj1m.js";import{b as T}from"./route-block-B_A1xBdJ.js";var R=typeof Float32Array<"u"?Float32Array:Array;function E(){var t=new R(16);return R!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function V(t,e,c){var n=Math.sin(c),r=Math.cos(c),a=e[0],f=e[1],l=e[2],o=e[3],s=e[4],d=e[5],i=e[6],v=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*r+s*n,t[1]=f*r+d*n,t[2]=l*r+i*n,t[3]=o*r+v*n,t[4]=s*r-a*n,t[5]=d*r-f*n,t[6]=i*r-l*n,t[7]=v*r-o*n,t}const F=`
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
`;let O=0;async function J(t){const{device:e,format:c,canvasContext:n}=t;O=0;const r=E();V(r,r,0);const a=e.createBuffer({size:r.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(a,0,r);const f=Math.tan(Math.PI/6)*.5,l=Math.cos(Math.PI/6)-f,o=new Float32Array([0,l,0,-.5,-f,0,.5,-f,0]),s=e.createBuffer({size:o.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(s,0,o);const d=new Float32Array([1,0,0,0,1,0,0,0,1]),i=e.createBuffer({size:d.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(i,0,d);const v=await e.createRenderPipelineAsync({layout:"auto",vertex:{module:e.createShaderModule({code:q}),buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:q}),targets:[{format:c}]},primitive:{topology:"triangle-strip"}}),w=e.createBindGroup({layout:v.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}}]});let b=!1;function y(){if(b)return;const m=E();V(m,m,180*O/Math.PI),e.queue.writeBuffer(a,0,m);const p=e.createCommandEncoder(),g=p.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store"}]});g.setPipeline(v),g.setBindGroup(0,w),g.setVertexBuffer(0,s),g.setVertexBuffer(1,i),g.draw(3),g.end();const h=p.finish();e.queue.submit([h]),O+=.005/60,window.requestAnimationFrame(y)}return y(),()=>{b=!0}}const K=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));function Z(t){const{device:e,format:c,canvasContext:n}=t,r=new Float32Array([0,0,0,1,0,0,0,1,0]),a=e.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(a,0,r);const f=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:F}),entryPoint:"vertex",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:F}),entryPoint:"fragment",targets:[{format:c}]},primitive:{topology:"triangle-list"}}),l=e.createCommandEncoder(),o=l.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),storeOp:"store",clearValue:{r:0,g:0,b:0,a:.5},loadOp:"clear"}]});o.setPipeline(f),o.setVertexBuffer(0,a),o.draw(3),o.end();const s=l.finish();e.queue.submit([s])}const $=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function Q(t){const{device:e,format:c,canvasContext:n}=t,r=Math.cos(Math.PI/6)*.5,a=new Float32Array([0,r,0,-.5,-r,0,.5,-r,0]),f=e.createBuffer({size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(f,0,a);const l=new Float32Array([.49,.24,.91,.91,.5,.59,.13,.91,.3]),o=e.createBuffer({size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(o,0,l);const s=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:L}),entryPoint:"vertex",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:L}),entryPoint:"fragment",targets:[{format:c}]},primitive:{topology:"triangle-list"}}),d=e.createCommandEncoder(),i=d.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),storeOp:"store",clearValue:{r:0,g:0,b:0,a:.5},loadOp:"clear"}]});i.setPipeline(s),i.setVertexBuffer(0,f),i.setVertexBuffer(1,o),i.draw(3),i.end();const v=d.finish();e.queue.submit([v])}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));async function te(){const t=navigator.gpu.getPreferredCanvasFormat(),e=await navigator.gpu.requestAdapter(),c=await e.requestDevice();return{adapter:e,device:c,format:t}}const re={class:"h-[calc(100vh-42px-var(--footer-height))] max-h-full max-w-full relative"},ae={class:"right-10 top-10 absolute"},oe={class:"flex gap-20px h-42px"},ne=["onClick"],se={class:"h-[calc(100vh-var(--footer-height))] max-h-full max-w-full"},ie=["width","height"],ce=D({__name:"index",async setup(t){let e,c;const r=Object.values(Object.assign({"./utils/render/rotate.ts":K,"./utils/render/triangle.ts":$,"./utils/render/triangleGradient.ts":ee})).reduce((u,C)=>(u[C.default.name]=C.default,u),{}),a=k("webGPU-activename",Reflect.ownKeys(r)[0]),{adapter:f,device:l,format:o}=([e,c]=z(()=>te()),e=await e,c(),e),s=_(),d=_(0),i=_(0),v=_(),w=N(H({adapter:f,device:l,format:o,canvas:s,canvasContext:v}));function b(){d.value=s.value.parentElement.clientWidth,i.value=s.value.parentElement.clientHeight,v.value=s.value.getContext("webgpu"),v.value.configure({device:l,format:o})}function y(u){a.value=u,p()}let m;function p(){m?.then(u=>u()),X(()=>{try{m=r[a.value](w)}catch(u){console.error(u)}})}let g=0,h=performance.now();const M=_("0");function G(){requestAnimationFrame(G);const u=performance.now();g++,u-h>=1e3&&(M.value=(g/(u-h)*1e3).toFixed(0),g=0,h=u)}return G(),j(()=>{b(),p()}),(u,C)=>(U(),S("div",re,[B("div",ae,A(x(M)),1),B("div",oe,[(U(!0),S(Y,null,I(x(r),(fe,P)=>(U(),S("div",{key:P,class:W(["cursor-pointer hover:text-blue",P===x(a)&&"text-blue"]),onClick:ue=>y(P)},A(P),11,ne))),128))]),B("div",se,[B("canvas",{ref_key:"canvas",ref:s,width:x(d),height:x(i)},null,8,ie)])]))}});typeof T=="function"&&T(ce);export{ce as default};
