import{a as p,_}from"./TheImage.vue_vue_type_script_setup_true_lang-s0F_T5WB.js";import{imgs as f}from"./data-uHFnc63I.js";import{d as w,z as g,A as v,at as x,o as h,a as $,b as t,f as e,h as n,w as m,n as u,v as k}from"../../assets/index-Jf8bmGHu.js";const y={flex:"","justify-center":"","gap-4":""},S={flex:"! col sm:row gap-4","mx-auto":"","mt-50":"","w-200":"","items-center":""},B=t("p",{"flex-1":""},[k(" 客户端使用 https url 访问服务器，则要求 web 服务器建立 ssl 链接。 web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），传输给客户端。 客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。 客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。 web 服务器通过自己的私钥解密出会话密钥。 web 服务器通过会话密钥加密与客户端之间的通信。 "),t("a",{"hover:text-red":"",href:"https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def"},"https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def")],-1),q=w({name:"FlipTwo",__name:"[no]",setup(C){const i=g(),b=v().params.no,s=x("size",100),r=f.find(l=>`${l.id}`===b).img;return(l,o)=>{const c=_,d=p;return h(),$("div",null,[t("div",y,[t("button",{class:"basic-btn",onClick:o[0]||(o[0]=(...a)=>e(i).back&&e(i).back(...a))}," back "),t("button",{class:"basic-btn",onClick:o[1]||(o[1]=a=>s.value+=20)}," enlarge "),t("button",{class:"basic-btn",onClick:o[2]||(o[2]=a=>s.value=100)}," reset ")]),t("div",S,[n(d,{"port-id":1,style:u({width:`${e(s)}px`,height:`${e(s)}px`}),"rounded-50":""},{default:m(()=>[n(c,{img:e(r)},null,8,["img"])]),_:1},8,["style"]),B,n(d,{"port-id":2,style:u({width:`${e(s)}px`,height:`${e(s)}px`}),"rounded-50":""},{default:m(()=>[n(c,{img:e(r)},null,8,["img"])]),_:1},8,["style"])])])}}});export{q as default};