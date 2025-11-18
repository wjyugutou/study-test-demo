import{d as y,r as _,Y as B,s as L,c as R,b as x,f as d,aI as T,o as S,U as P,L as O,E as U,z as Y,F as I,k as N,h as $,O as k,n as W,t as G}from"../../assets/index-DOi-xgW3.js";import{b as g}from"./route-block-B_A1xBdJ.js";function A({gl:t,vertexShaderSource:a,fragShaderSource:o}){const s=t.createShader(t.VERTEX_SHADER),n=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(s,a),t.shaderSource(n,o),t.compileShader(s),t.compileShader(n);const i=t.createProgram();return t.attachShader(i,s),t.attachShader(i,n),t.linkProgram(i),t.useProgram(i),i}function w(t,a,o){return`${255/t},${255/a},${255/o}`}function V(t){function a(){const u=A({gl:t,vertexShaderSource:`
    attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`,fragShaderSource:`
    void main() {
      gl_FragColor = vec4(0.56, 0.94, 0.9, 1.0);
    }
    `}),c=t.getAttribLocation(u,"apos"),r=new Float32Array([0,0,0,1,0,0]),e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW),t.vertexAttribPointer(c,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(c),t.drawArrays(t.LINES,0,2)}function o(){const n=`
    attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`,i=`
    void main() {
      gl_FragColor = vec4(${w(78,240,46)}, 1.0);
    }
  `,u=A({gl:t,vertexShaderSource:n,fragShaderSource:i}),c=t.getAttribLocation(u,"apos"),r=new Float32Array([0,0,0,0,1,0]),e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW),t.vertexAttribPointer(c,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(c),t.drawArrays(t.LINES,0,2)}function s(){const n=`
    attribute vec4 apos;
    void main() {
      //顶点坐标apos赋值给内置变量gl_Position
      //逐顶点处理数据
      gl_Position = apos;
    }`,i=`
    void main() {
      gl_FragColor = vec4(${w(240,91,210)}, 1.0);
    }
  `,u=A({gl:t,vertexShaderSource:n,fragShaderSource:i}),c=t.getAttribLocation(u,"apos"),r=new Float32Array([0,0,0,0,0,1]),e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW),t.vertexAttribPointer(c,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(c),t.drawArrays(t.LINES,0,2)}a(),o(),s()}const M={class:"h-[calc(100vh-var(--footer-height))] max-w-full max-h-full"},j=["width","height"],z=y({__name:"Cube",setup(t){const a=_(),o=B(),s=_(0),n=_(0);function i(){o.value=a.value.getContext("webgl2")}function u(){const r=o.value,m=A({gl:r,vertexShaderSource:`
  //attribute声明vec4类型变量apos
  attribute vec4 apos;
  void main() {
    //设置几何体轴旋转角度为30度,并把角度值转化为弧度值
    float radian = radians(30.0);
    //求解旋转角度余弦值
    float cos = cos(radian);
    //求解旋转角度正弦值
    float sin = sin(radian);
    //引用上面的计算数据,创建绕x轴旋转矩阵
    // 1      0       0    0
    // 0   cosα    sinα    0
    // 0  -sinα    cosα    0
    // 0      0       0    1
    mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);
    //引用上面的计算数据,创建绕y轴旋转矩阵
    //  cosβ   0   sinβ    0
    //     0   1      0    0
    // -sinβ   0   cosβ    0
    //     0   0      0    1
    mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);
    //两个旋转矩阵、顶点齐次坐标连乘
    gl_Position = mx * my * apos;
  }
`,fragShaderSource:`
  void main() {
    // 逐片元处理数据，所有片元(像素)设置为红色
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`}),l=r.getAttribLocation(m,"apos"),v=new Float32Array([.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5]),h=new Uint8Array([0,1,2,3,4,5,6,7,0,4,1,5,2,6,3,7]),p=r.createBuffer();r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,p),r.bufferData(r.ELEMENT_ARRAY_BUFFER,h,r.STATIC_DRAW);const b=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,b),r.bufferData(r.ARRAY_BUFFER,v,r.STATIC_DRAW),r.vertexAttribPointer(l,3,r.FLOAT,!1,0,0),r.enableVertexAttribArray(l),r.drawElements(r.LINE_LOOP,4,r.UNSIGNED_BYTE,0),r.drawElements(r.LINE_LOOP,4,r.UNSIGNED_BYTE,4),r.drawElements(r.LINES,8,r.UNSIGNED_BYTE,8)}function c(){s.value=a.value.parentElement.clientWidth,n.value=a.value.parentElement.clientHeight,T(()=>{i(),u(),V(o.value)})}return L(()=>{c()}),(r,e)=>(S(),R("div",M,[x("canvas",{ref_key:"canvas",ref:a,width:d(s),height:d(n)},null,8,j)]))}}),q=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),H={class:"h-[calc(100vh-var(--footer-height))] max-w-full max-h-full"},X=["width","height"],C=y({__name:"Gradient",setup(t){const a=_(),o=B(),s=_(0),n=_(0);function i(){o.value=a.value.getContext("webgl2")}function u(){const e=o.value,l=A({gl:o.value,vertexShaderSource:`
  //attribute声明vec4类型变量apos
  attribute vec4 apos;
  // attribute声明顶点颜色变量
  attribute vec4 a_color;
  //varying声明顶点颜色插值后变量
  varying vec4 v_color;
  void main() {
    // 顶点坐标apos赋值给内置变量gl_Position
    gl_Position = apos;
    //顶点颜色插值计算
    v_color = a_color;
  }
  `,fragShaderSource:`
  precision lowp float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
  `}),v=new Float32Array([-.5,.5,.5,.5]),h=new Float32Array([0,1,1,1,1,0]),p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,h,e.STATIC_DRAW);const b=e.getAttribLocation(l,"a_color");e.vertexAttribPointer(b,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(b);const E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,v,e.STATIC_DRAW);const F=e.getAttribLocation(l,"apos");e.vertexAttribPointer(F,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(F),e.drawArrays(e.LINES,0,2)}function c(){const e=o.value,l=A({gl:e,vertexShaderSource:`
  attribute vec4 a_pos;
  attribute vec4 a_color;
  varying vec4 v_color;
  void main() {
    gl_Position = a_pos;
    v_color = a_color;
  }
  `,fragShaderSource:`
  // 设置所有float的精度
  precision lowp float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
  `}),v=new Float32Array([0,.5,0,-.5,-.5,0,.5,-.5,0]),h=new Float32Array([.49,.24,.91,.91,.5,.59,.13,.91,.3]),p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,h,e.STATIC_DRAW);const b=e.getAttribLocation(l,"a_color");e.vertexAttribPointer(b,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(b);const E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,v,e.STATIC_DRAW);const F=e.getAttribLocation(l,"a_pos");e.vertexAttribPointer(F,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(F),e.drawArrays(e.TRIANGLES,0,3)}function r(){s.value=a.value.parentElement.clientWidth,n.value=a.value.parentElement.clientHeight,T(()=>{i(),u(),c()})}return L(()=>{r()}),P("resize",()=>{r()}),(e,f)=>(S(),R("div",H,[x("canvas",{ref_key:"canvas",ref:a,width:d(s),height:d(n)},null,8,X)]))}});typeof g=="function"&&g(C);const K=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"})),Z={class:"h-[calc(100vh-var(--footer-height))] max-w-full max-h-full"},J=["width","height"],D=y({__name:"Pointer",setup(t){const a=_(),o=B(),s=_(0),n=_(0);function i(){o.value=a.value.getContext("webgl2")}function u(){const e=o.value;A({gl:o.value,vertexShaderSource:"void main() {   gl_PointSize = 20.0;   gl_Position = vec4(0.5, 0.5, 0.5, 1.0);}",fragShaderSource:"void main() {   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}"}),e.drawArrays(e.POINTS,0,1)}function c(){const e=o.value,l=A({gl:o.value,vertexShaderSource:` 
  // 用attribute声明vec4类型变量apos
  attribute vec4 apos;
  void main() {
    //顶点坐标apos赋值给内置变量gl_Position
    //逐顶点处理数据
    gl_Position = apos;
  }`,fragShaderSource:`
  void main() {
    gl_FragColor = vec4(1.0,1.0,0.0,1.0);
  }`}),v=e.getAttribLocation(l,"apos"),h=new Float32Array([.5,.5,-.5,.5,-.5,-.5,.5,-.5]),p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,h,e.STATIC_DRAW),e.vertexAttribPointer(v,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(v),e.drawArrays(e.LINE_LOOP,0,4)}function r(){s.value=a.value.parentElement.clientWidth,n.value=a.value.parentElement.clientHeight,T(()=>{i(),u(),c()})}return L(()=>{r()}),P("resize",()=>{r()}),(e,f)=>(S(),R("div",Z,[x("canvas",{ref_key:"canvas",ref:a,width:d(s),height:d(n)},null,8,J)]))}});typeof g=="function"&&g(D);const Q=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"})),ee={class:"h-[calc(100vh-var(--footer-height))] max-w-full max-h-full"},te={class:"h-42px flex gap-20px"},re=["onClick"],oe=y({__name:"index",setup(t){const a=U(),o=O(),n=Object.values(Object.assign({"./components/Cube.vue":q,"./components/Gradient.vue":K,"./components/Pointer.vue":Q})).reduce((c,r)=>(c[r.default.__name]=r.default,c),{});o.query.type||a.push({query:{type:Reflect.ownKeys(n)[0]}});const i=Y(()=>n[o.query.type]);function u(c){a.push({query:{type:c.__name}})}return(c,r)=>(S(),R("div",ee,[x("div",te,[(S(!0),R(I,null,N(d(n),(e,f)=>(S(),R("div",{key:f,class:W(["cursor-pointer hover:text-blue",f===d(o).query.type&&"text-blue"]),onClick:m=>u(e)},G(f),11,re))),128))]),x("div",null,[(S(),$(k(d(i))))])]))}});typeof g=="function"&&g(oe);export{oe as default};
