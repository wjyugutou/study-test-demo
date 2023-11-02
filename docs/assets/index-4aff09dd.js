import{_ as D,a as G}from"./MineBlock.vue_vue_type_script_setup_true_lang-0b9c2f3c.js";import{d as M,l as N,i as T,m as j,c as d,u as B,p as E,o as r,a as l,b as n,q as k,t as m,f as s,F as p,e as g,h as S,g as V,v as F}from"./index-aaf76d81.js";import R from"./logic-40f321db.js";const A=n("div",null," minesweeper ",-1),L={flex:"","items-center":"","justify-center":""},q={flex:"","items-center":"","justify-center":"","p-3":"","text-2xl":""},O=n("div",{"i-carbon-timer":""},null,-1),P={flex:"","items-center":"","justify-center":"","p-3":"","text-2xl":""},W=n("div",{"i-carbon-switch-layer-3":""},null,-1),z={flex:"~ gap-1","justify-center":""},H={"p-5":""},U=M({__name:"index",setup(I){const e=new R(10,10,5),v=N(),u=T(!1),b=j(u),_=d(()=>e.state.value.endTime?Math.round(((+e.state.value.endTime||+v.value)-e.state.value.startTime)/1e3):e.state.value.mineGenerate?Math.round((+v.value-e.state.value.startTime)/1e3):0);B("vue-minesweeper",e.state);const x=d(()=>e.board),y=d(()=>e.blocks.reduce((a,t)=>e.state.value.mineGenerate?t.mine?(t.flagged&&(a-=1),a+=1):t.flagged?a-=1:a:e.mines,0));E(()=>{e.checkGameState()});function c(a){switch(a){case"easy":e.reset(9,9,10);break;case"normal":e.reset(16,16,40);break;case"hard":e.reset(16,30,99);break}}return(a,t)=>{const C=G,w=D;return r(),l("div",null,[A,n("div",L,[n("div",q,[O,k(" "+m(s(_)),1)]),n("div",P,[W,k(" "+m(s(y)),1)])]),n("div",z,[n("button",{rounded:"","bg-green-500":"","p-1":"","text-black":"",onClick:t[0]||(t[0]=o=>s(b)())},m(s(u)?"DEV":"NORMAL"),1),n("button",{rounded:"","bg-green-500":"","p-1":"","text-black":"",onClick:t[1]||(t[1]=o=>s(e).reset())}," NEW GAME "),n("button",{rounded:"","bg-green-500":"","p-1":"","text-black":"",onClick:t[2]||(t[2]=o=>c("easy"))}," easy "),n("button",{rounded:"","bg-green-500":"","p-1":"","text-black":"",onClick:t[3]||(t[3]=o=>c("normal"))}," normal "),n("button",{rounded:"","bg-green-500":"","p-1":"","text-black":"",onClick:t[4]||(t[4]=o=>c("hard"))}," hard ")]),n("div",H,[(r(!0),l(p,null,g(s(x),(o,h)=>(r(),l("div",{key:h,flex:"","items-center":"","justify-center":""},[(r(!0),l(p,null,g(o,(i,$)=>(r(),V(C,{key:$,"is-dev":s(u),block:i,onClick:f=>s(e).onClick(i),onContextmenu:F(f=>s(e).onRightClick(i),["prevent"]),onDblclick:f=>s(e).onDoubleClick(i)},null,8,["is-dev","block","onClick","onContextmenu","onDblclick"]))),128))]))),128))]),S(w,{passed:s(e).state.value.mineGenerate&&s(e).state.value.gameState==="won"},null,8,["passed"])])}}});export{U as default};
