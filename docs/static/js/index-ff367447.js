import{d as O,o as s,a as n,x as h,y as L,v as q,i as j,c as C,g as T,h as b,w as k,b as o,f as t,n as D,t as f,F as x,q as $,z as U,T as I,A,B as G,C as J,p as K,D as Q,k as W,r as H,e as N,E as X}from"../../assets/index-25410920.js";import{u as Y}from"./useDrag-8198852e.js";import{_ as Z}from"./canvasDrawPage-6045ca9a.js";import{_ as ee}from"./canvasPlum-ae554589.js";import{_ as te}from"./digitalRain-88bf5881.js";import{_ as oe}from"./ellipsePanel-9498d3e8.js";import{_ as ae}from"./fileUpload-cf8ee82a.js";import{_ as se}from"./indexedDB-ded6ce44.js";import{_ as ne}from"./interestingHTMLElement-e08c7d16.js";import{_ as le}from"./intersectionObserver-c120050c.js";import{_ as re}from"./lens-966c316e.js";import{_ as ie}from"./matter-9cd96168.js";import{_ as _e}from"./minesweeperPage-239fa084.js";import{_ as ue}from"./popoverDemo-34c6269a.js";import{_ as de}from"./recorder-daafde48.js";import{_ as ce}from"./renderToString-75eecb47.js";import{_ as me}from"./scope-f6914c01.js";import{_ as pe}from"./videojsPlayRemp-c8cb8d9f.js";import{_ as fe}from"./virtualScroll-5bad21af.js";import{_ as ve}from"./watchCarousel-39ed5a9f.js";import{_ as be}from"./waterfallFlowa-47dd312d.js";import"./random-99138415.js";import"./isObjectLike-f3d21275.js";import"./1-3eee8eec.js";import"./MineBlock.vue_vue_type_script_setup_true_lang-4e9c9423.js";const ke=["onClick"],ye={key:1},ge=O({name:"Overlayer",__name:"index",props:{mask:{required:!0},maskClass:{type:Object}},emits:["click"],setup(_,{emit:l}){const a=l;function r(u){a("click",u)}return(u,i)=>_.mask?(s(),n("div",{key:0,class:L(["mask_container",_.maskClass]),onClick:q(r,["self"])},[h(u.$slots,"default")],10,ke)):(s(),n("div",ye,[h(u.$slots,"default")]))}});const xe={modelValue:{required:!0,type:Boolean},appendTo:{type:String},title:{required:!0,type:String},width:{type:[String,Number],default:500},showMask:{type:Boolean,default:!0},drag:{type:Boolean,default:!0},maskClass:{type:Object},clickMaskClose:{type:Boolean,default:!0},footerClass:{type:Object},class:{type:Object},style:{type:Object},content:Object};function he(_){return typeof _=="number"&&!isFinite(_)}const Ce=["x","y"],$e={key:1,class:"modal_title_text"},we={key:1},Ve=O({name:"Modal",__name:"index",props:xe,emits:["update:modelValue"],setup(_,{emit:l}){const a=_,r=l,u=j(),i=C(()=>he(a.width)?`${a.width}px`:a.width),{x:c,y:m}=Y(u),P=C(()=>Object.assign({},a.style,{transform:a.drag&&`translate(${c.value}px, ${m.value}px)`})),B=C(()=>({width:i.value}));function w(){r("update:modelValue",!1)}function R(){a.clickMaskClose&&w()}return(e,v)=>{const S=ge;return s(),T(A,{to:e.appendTo,disabled:!e.appendTo},[b(I,{name:"modal_fade"},{default:k(()=>[e.modelValue?(s(),T(S,{key:0,mask:e.showMask,"mask-class":e.maskClass,onClick:R},{default:k(()=>[o("div",{x:t(c),y:t(m),style:D(t(P)),class:L(["modal_container",a.class])},[o("header",{ref_key:"dragEle",ref:u,class:"modal_header",style:D({cursor:e.drag?"move":"default"})},[e.$slots.header?h(e.$slots,"header",{key:0}):(s(),n("span",$e,f(e.title),1)),o("div",{class:"modal_close",onClick:w,onPointerdown:v[0]||(v[0]=q(E=>{},["stop"]))},null,32)],4),o("div",{class:"modal_content",style:D(t(B))},[e.$slots.default?h(e.$slots,"default",{key:0}):(s(),n(x,{key:1},[$(f(e.content),1)],64))],4),o("footer",{class:L(["modal_footer",e.footerClass])},[e.$slots.footer?h(e.$slots,"footer",{key:0}):(s(),n("div",we,"footer"))],2)],14,Ce)]),_:3},8,["mask","mask-class"])):U("",!0)]),_:3})],8,["to","disabled"])}}});const je=O({__name:"Counter",props:{initial:{}},setup(_){const{initial:l}=_,{count:a,inc:r,dec:u}=G(l);return(i,c)=>(s(),n("div",null,[$(f(t(a))+" ",1),o("button",{class:"inc",onClick:c[0]||(c[0]=m=>t(r)())}," + "),o("button",{class:"dec",onClick:c[1]||(c[1]=m=>t(u)())}," - ")]))}}),Oe={"mb-8px":"","h-46px":"",flex:"","items-center":"","justify-center":"","py-5px":""},Pe={"text-20px":"","font-bold":""},Be={"min-h":"[calc(100vh-64px-52px)]","pb-39px":""},Re={absolute:"","bottom-0":"","left-0":"","right-0":"",flex:"","items-center":"","justify-between":"","px-2":"","text-left":"","text-26px":""},at=O({name:"DemoChallenge",__name:"index",setup(_){const l=J(),a=j(!1),r=j(!1),i=Object.entries(Object.assign({"./index/canvasDrawPage.vue":Z,"./index/canvasPlum.vue":ee,"./index/digitalRain.vue":te,"./index/ellipsePanel.vue":oe,"./index/fileUpload.vue":ae,"./index/indexedDB.vue":se,"./index/interestingHTMLElement.vue":ne,"./index/intersectionObserver.vue":le,"./index/lens.vue":re,"./index/matter.vue":ie,"./index/minesweeperPage.vue":_e,"./index/popoverDemo.vue":ue,"./index/recorder.vue":de,"./index/renderToString.vue":ce,"./index/scope.vue":me,"./index/videojsPlayRemp.vue":pe,"./index/virtualScroll.vue":fe,"./index/watchCarousel.vue":ve,"./index/waterfallFlowa.vue":be})).map(([y,p])=>{var g;const V=y.replace("./index/","").replace(".vue","");return{path:`/demoChallenge/${V}`,label:((g=p==null?void 0:p.default)==null?void 0:g.label)||V}}),c=K(()=>{l.currentRoute.value.fullPath==="/demoChallenge"&&l.replace(i[0].path)}),m=C(()=>i.findIndex(y=>y.path===l.currentRoute.value.fullPath)),P=C(()=>[i[m.value-1],i[m.value],i[m.value+1]].filter(Boolean));function B(){l.back()}function w(){a.value=!0}function R(){a.value=!1}function e(){r.value=!0}const v=j(!0);l.beforeEach(()=>{r.value=!1});const E=Q().fullPath.split("/").at(-1);return W(()=>{c()}),(y,p)=>{var M;const V=H("RouterView"),g=H("RouterLink"),F=je,z=Ve;return s(),n(x,null,[o("header",Oe,[o("div",{text:"hover:gray-200 gray-400","i-carbon-chevron-left":"",absolute:"","left-0":"","h-30px":"","inline-30px":"","hover:cursor-pointer":"",onClick:B}),o("div",Pe,f(t(E)),1)]),o("main",Be,[b(V)]),o("footer",Re,[o("div",{"cursor-pointer":"",onPointerenter:w,onPointerleave:R},[t(a)?(s(!0),n(x,{key:0},N(t(P),d=>(s(),n("div",{key:d.path},[b(g,{to:d.path,replace:""},{default:k(()=>[$(f(d.label),1)]),_:2},1032,["to"])]))),128)):(s(),n(x,{key:1},[$(f((M=t(i)[t(m)])==null?void 0:M.label),1)],64))],32),b(F),o("div",{"cursor-pointer":"",onClick:e}," list ")]),b(z,{modelValue:t(r),"onUpdate:modelValue":p[1]||(p[1]=d=>X(r)?r.value=d:null),title:"demoList",drag:t(v)},{footer:k(()=>[o("button",{class:"basic-btn",onClick:p[0]||(p[0]=d=>v.value=!t(v))}," 切换拖拽 "+f(t(v)),1)]),default:k(()=>[o("div",null,[(s(!0),n(x,null,N(t(i),d=>(s(),n("p",{key:d.path,"hover:text":"[var(--primary)]"},[b(g,{to:d.path},{default:k(()=>[$(f(d.label),1)]),_:2},1032,["to"])]))),128))])]),_:1},8,["modelValue","drag"])],64)}}});export{at as default};
