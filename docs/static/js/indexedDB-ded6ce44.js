import{d as _,i as c,o as b,a as m,b as o,t as p,f,F as g}from"../../assets/index-25410920.js";const D={"text-12":""},v=o("button",{class:"basic-btn"}," 获取数据 ",-1),B="MyTestDatabase",h=_({__name:"indexedDB",setup(x){const l=[{ssn:"444-44-4444",name:"Bill",age:35,email:"bill@company.com"},{ssn:"555-55-5555",name:"Donna",age:32,email:"donna@home.org"}],u=window.indexedDB,a=c(!1),r=c();function i(){return new Promise((n,t)=>{if(a.value)return t(Error("数据库已打开"));const s=u.open(B);s.onerror=e=>{console.error(e),a.value=!1,t(e)},s.onsuccess=e=>{a.value=!0,r.value=e.target.result,n(e.target.result)},s.onupgradeneeded=e=>{console.log("onupgradeneeded ")}})}function d(){const n=r.value.createObjectStore("names",{autoIncrement:!0});l.forEach(t=>{n.add(t.name)})}return(n,t)=>(b(),m(g,null,[o("h1",D,p(f(a)?"数据库打开成功":"数据库打开失败"),1),o("button",{class:"basic-btn",onClick:i}," 打开数据库 "),o("button",{class:"basic-btn",onClick:d}," 添加一个数据 "),v],64))}}),S=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));export{S as _};
