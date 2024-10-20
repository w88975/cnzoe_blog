import{z as h,A as u,C as d,j as l,D as v,o as m,c as k,n as p,E as f,a as i}from"./index-DEUdRr3f.js";const g=u({name:"IconStorage",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=d("icon"),s=l(()=>[n,`${n}-storage`,{[`${n}-spin`]:e.spin}]),a=l(()=>{const o={};return e.size&&(o.fontSize=v(e.size)?`${e.size}px`:e.size),e.rotate&&(o.transform=`rotate(${e.rotate}deg)`),o});return{cls:s,innerStyle:a,onClick:o=>{t("click",o)}}}}),Z=["stroke-width","stroke-linecap","stroke-linejoin"],_=i("path",{d:"M7 18h34v12H7V18ZM40 6H8a1 1 0 0 0-1 1v11h34V7a1 1 0 0 0-1-1ZM7 30h34v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V30Z"},null,-1),C=i("path",{d:"M13.02 36H13v.02h.02V36Z"},null,-1),S=i("path",{d:"M13 12v-2h-2v2h2Zm.02 0h2v-2h-2v2Zm0 .02v2h2v-2h-2Zm-.02 0h-2v2h2v-2ZM13 14h.02v-4H13v4Zm-1.98-2v.02h4V12h-4Zm2-1.98H13v4h.02v-4Zm1.98 2V12h-4v.02h4Z",fill:"currentColor",stroke:"none"},null,-1),y=i("path",{d:"M13.02 24H13v.02h.02V24Z"},null,-1),z=[_,C,S,y];function b(e,t,n,s,a,c){return m(),k("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:p(e.cls),style:f(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...o)=>e.onClick&&e.onClick(...o))},z,14,Z)}var r=h(g,[["render",b]]);const $=Object.assign(r,{install:(e,t)=>{var n;const s=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(s+r.name,r)}});export{$ as I};
