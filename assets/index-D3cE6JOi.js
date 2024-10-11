import{l as m,o as l,a as c,L as f,_ as k,d as h,g as p,c as a,i as _,n as v,b as g,e as d}from"./index-3ki9Z9-r.js";const $={},b={class:"bg-white rounded-md p-4 mb-5"};function C(e,t){return l(),c("div",b,[f(e.$slots,"default")])}const Z=m($,[["render",C]]),w=h({name:"IconImage",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=p("icon"),s=a(()=>[n,`${n}-image`,{[`${n}-spin`]:e.spin}]),r=a(()=>{const o={};return e.size&&(o.fontSize=_(e.size)?`${e.size}px`:e.size),e.rotate&&(o.transform=`rotate(${e.rotate}deg)`),o});return{cls:s,innerStyle:r,onClick:o=>{t("click",o)}}}}),y=["stroke-width","stroke-linecap","stroke-linejoin"],z=d("path",{d:"m24 33 9-9v9h-9Zm0 0-3.5-4.5L17 33h7Zm15 8H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v30a2 2 0 0 1-2 2ZM15 15h2v2h-2v-2Z"},null,-1),S=d("path",{d:"M33 33v-9l-9 9h9ZM23.5 33l-3-4-3 4h6ZM15 15h2v2h-2z",fill:"currentColor",stroke:"none"},null,-1),B=[z,S];function I(e,t,n,s,r,u){return l(),c("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:v(e.cls),style:g(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...o)=>e.onClick&&e.onClick(...o))},B,14,y)}var i=k(w,[["render",I]]);const j=Object.assign(i,{install:(e,t)=>{var n;const s=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(s+i.name,i)}});export{Z as B,j as I};
