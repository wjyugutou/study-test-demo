import{_ as b,a as _}from"./TheImage.vue_vue_type_script_setup_true_lang-237a8213.js";import{imgs as f}from"./data-3f26f4c5.js";import{d as w,C as g,D as x,P as h,o as v,a as $,b as t,f as e,h as n,w as c,n as u,q as k}from"../../assets/index-25410920.js";const y={flex:"","gap-4":"","justify-center":""},C={"mx-auto":"","mt-50":"",flex:"! col sm:row gap-4","items-center":"","w-200":""},S=t("p",{"flex-1":""},[k(" 客户端使用 https url 访问服务器，则要求 web 服务器建立 ssl 链接。 web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），传输给客户端。 客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。 客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。 web 服务器通过自己的私钥解密出会话密钥。 web 服务器通过会话密钥加密与客户端之间的通信。 "),t("a",{"hover:text-red":"",href:"https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def"},"https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def")],-1),T=w({name:"FlipTwo",__name:"[no]",setup(B){const a=g(),p=x().params.no,o=h("size",100),r=f.find(d=>`${d.id}`===p).img;return(d,s)=>{const l=b,m=_;return v(),$("div",null,[t("div",y,[t("button",{btn:"",onClick:s[0]||(s[0]=(...i)=>e(a).back&&e(a).back(...i))}," back "),t("button",{btn:"",onClick:s[1]||(s[1]=i=>o.value+=20)}," enlarge "),t("button",{btn:"",onClick:s[2]||(s[2]=i=>o.value=100)}," reset ")]),t("div",C,[n(m,{"port-id":1,style:u({width:`${e(o)}px`,height:`${e(o)}px`}),"rounded-50":""},{default:c(()=>[n(l,{img:e(r)},null,8,["img"])]),_:1},8,["style"]),S,n(m,{"port-id":2,style:u({width:`${e(o)}px`,height:`${e(o)}px`}),"rounded-50":""},{default:c(()=>[n(l,{img:e(r)},null,8,["img"])]),_:1},8,["style"])])])}}});export{T as default};
