import{d as y,i as d,c as _,E as p,o as P,a as k}from"../../assets/index-Jf8bmGHu.js";const s=600,l=600,T=y({description:"随机生成梅花树枝",__name:"canvasPlum",setup(E){const c=d(),n=_(()=>c.value.getContext("2d")),u=d(.5);function e(t,a){return Math.random()*(a-t)+t}function f(){const a=[{start:{x:0,y:0},length:5*Math.random()+5,theta:Math.PI*e(.3333333333333333,.16666666666666666)},{start:{x:s,y:0},length:5*Math.random()+5,theta:Math.PI*e(.6666666666666666,.8333333333333334)},{start:{x:s,y:l},length:5*Math.random()+5,theta:-Math.PI*e(.6666666666666666,.8333333333333334)},{start:{x:0,y:l},length:5*Math.random()+5,theta:-Math.PI*e(.3333333333333333,.16666666666666666)}];n.value.strokeStyle="rgb(156,163,175)",a.forEach(r=>{h(r)})}const o=[];function h(t,a=0){const r=g(t);x(t),(a<5||Math.random()<.6)&&o.push(()=>h({start:r,length:t.length+(Math.random()*10-5),theta:t.theta-Math.random()*u.value*(Math.random()<.5?1:-1)},a+1)),a<5&&Math.random()<.6&&o.push(()=>h({start:r,length:t.length+(Math.random()*10-5),theta:t.theta+Math.random()*u.value*(Math.random()<.5?1:-1)},a+1))}function M(){const t=[...o];o.length=0,t.forEach(a=>a())}let i=0;function m(){i++,i%3===0&&M(),requestAnimationFrame(m)}m();function g(t){return{x:t.start.x+t.length*Math.cos(t.theta),y:t.start.y+t.length*Math.sin(t.theta)}}function v(t,a){n.value.beginPath(),n.value.moveTo(t.x,t.y),n.value.lineTo(a.x,a.y),n.value.stroke()}function x(t){v(t.start,g(t))}return p(()=>{f()}),(t,a)=>(P(),k("canvas",{ref_key:"canvas",ref:c,width:s,height:l,"mx-auto":"",border:"~ gray-400"},null,512))}});export{T as default};
