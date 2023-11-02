import{a as j,_ as $}from"./MineBlock.vue_vue_type_script_setup_true_lang-676f2491.js";import{i as M,d as D,l as T,m as A,c as v,u as N,p as O,o as h,a as m,b as a,q as w,t as _,f as o,F as y,e as b,g as S,v as R,h as B,_ as V}from"../../assets/index-037433d0.js";class F{constructor(e,t,s){this.width=e,this.height=t,this.mines=s,this.state=M(),this.directions=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],this.reset()}get board(){return this.state.value.board}get blocks(){return this.state.value.board.flat()}reset(e=this.width,t=this.height,s=this.mines){this.width=e,this.height=t,this.mines=s,this.state.value={board:Array.from({length:this.height},(l,n)=>Array.from({length:this.width},(r,c)=>({x:c,y:n,adjacentMines:0,revealed:!1}))),gameState:"play",mineGenerate:!1,startTime:+Date.now()}}random(e,t){return Math.random()*(t-e)+e}randomInt(e,t){return Math.round(this.random(e,t))}generateMines(e,t){const s=()=>{const l=this.randomInt(0,this.width-1),n=this.randomInt(0,this.height-1),r=e[n][l];return Math.abs(t.x-r.x)<=1&&Math.abs(t.y-r.y)<=1||r.mine?!1:(r.mine=!0,!0)};Array.from({length:this.mines}).forEach(()=>{for(;!s(););}),this.updateNumbers(e)}updateNumbers(e){e.forEach(t=>{t.forEach(s=>{s.mine||this.getSiblings(s).forEach(l=>{l.mine&&s.adjacentMines++})})})}getSiblings(e){return this.directions.map(([t,s])=>{const l=e.x+t,n=e.y+s;if(!(l<0||l>=this.width||n<0||n>=this.height))return this.board[n][l]}).filter(t=>t)}expendZero(e){e.adjacentMines||this.getSiblings(e).forEach(t=>{t.revealed||(t.revealed=!0,this.expendZero(t))})}onRightClick(e){e.revealed||(e.flagged=!e.flagged)}onClick(e){if(this.state.value.mineGenerate||(this.generateMines(this.board,e),this.state.value.mineGenerate=!0),e.flagged&&(e.flagged=!1),e.revealed=!0,e.mine){this.onGameOver("lost"),this.showAllMines();return}this.expendZero(e)}onDoubleClick(e){this.autoExpand(e)}showAllMines(){this.board.forEach(e=>{e.forEach(t=>{t.mine&&(t.revealed=!0)})})}autoExpand(e){const t=this.getSiblings(e).reduce((n,r)=>r.flagged?n+=1:n,0);t===e.adjacentMines&&this.getSiblings(e).forEach(n=>{n.flagged||(n.revealed=!0,n.mine&&this.onGameOver("lost"))});const s=e.adjacentMines-t;this.getSiblings(e).reduce((n,r)=>!r.revealed&&!r.flagged?n+=1:n,0)===s&&this.getSiblings(e).forEach(n=>{n.revealed||(n.flagged=!0)})}onGameOver(e){this.state.value.gameState=e,this.state.value.endTime=+Date.now(),e==="lost"&&(this.showAllMines(),setTimeout(()=>{alert("lost")},100))}checkGameState(){if(!this.state.value.mineGenerate||this.state.value.gameState!=="play")return;const e=this.state.value.board.flat();e.every(t=>t.revealed||t.flagged||t.mine)&&(e.some(t=>t.flagged&&!t.mine)?this.onGameOver("lost"):this.onGameOver("won"))}}const I=a("div",null," minesweeper ",-1),P={flex:"","items-center":"","justify-center":""},Z={"p-3":"",flex:"","items-center":"","justify-center":"","text-2xl":""},L=a("div",{"i-carbon-timer":""},null,-1),q={"p-3":"",flex:"","items-center":"","justify-center":"","text-2xl":""},z=a("div",{"i-carbon-switch-layer-3":""},null,-1),W={flex:"~ gap-1","justify-center":""},H={"p-5":""},J=D({name:"Minesweeper",__name:"index",setup(p){const e=new F(10,10,5),t=T(),s=M(!1),l=A(s),n=v(()=>e.state.value.endTime?Math.round(((+e.state.value.endTime||+t.value)-e.state.value.startTime)/1e3):e.state.value.mineGenerate?Math.round((+t.value-e.state.value.startTime)/1e3):0);N("vue-minesweeper",e.state);const r=v(()=>e.board),c=v(()=>e.blocks.reduce((d,i)=>e.state.value.mineGenerate?i.mine?(i.flagged&&(d-=1),d+=1):i.flagged?d-=1:d:e.mines,0));O(()=>{e.checkGameState()});function g(d){switch(d){case"easy":e.reset(9,9,10);break;case"normal":e.reset(16,16,40);break;case"hard":e.reset(16,30,99);break}}return(d,i)=>{const G=j,k=$;return h(),m("div",null,[I,a("div",P,[a("div",Z,[L,w(" "+_(o(n)),1)]),a("div",q,[z,w(" "+_(o(c)),1)])]),a("div",W,[a("button",{"bg-green-500":"","p-1":"",rounded:"","text-black":"",onClick:i[0]||(i[0]=u=>o(l)())},_(o(s)?"DEV":"NORMAL"),1),a("button",{"bg-green-500":"","p-1":"",rounded:"","text-black":"",onClick:i[1]||(i[1]=u=>o(e).reset())}," NEW GAME "),a("button",{"bg-green-500":"","p-1":"",rounded:"","text-black":"",onClick:i[2]||(i[2]=u=>g("easy"))}," easy "),a("button",{"bg-green-500":"","p-1":"",rounded:"","text-black":"",onClick:i[3]||(i[3]=u=>g("normal"))}," normal "),a("button",{"bg-green-500":"","p-1":"",rounded:"","text-black":"",onClick:i[4]||(i[4]=u=>g("hard"))}," hard ")]),a("div",H,[(h(!0),m(y,null,b(o(r),(u,C)=>(h(),m("div",{key:C,flex:"","items-center":"","justify-center":""},[(h(!0),m(y,null,b(u,(f,E)=>(h(),S(G,{key:E,"is-dev":o(s),block:f,onClick:x=>o(e).onClick(f),onContextmenu:R(x=>o(e).onRightClick(f),["prevent"]),onDblclick:x=>o(e).onDoubleClick(f)},null,8,["is-dev","block","onClick","onContextmenu","onDblclick"]))),128))]))),128))]),B(k,{passed:o(e).state.value.mineGenerate&&o(e).state.value.gameState==="won"},null,8,["passed"])])}}}),K={};function Q(p,e){const t=J;return h(),S(t)}const U=V(K,[["render",Q]]),ee=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));export{ee as _};