import{B as C}from"./BoxView-CAVGjjs7.js";import{_ as p,d as h,g as k,c as m,i as g,o as d,a as u,n as _,b as v,e as o,r as S,f as j,h as z,j as l,w as c,u as f,I,F as L,k as M,t as b,l as Z}from"./index-qetq_EmQ.js";import{I as N}from"./index-Be8YA6kG.js";const B=h({name:"IconXiguaColor",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:s}){const n=k("icon"),t=m(()=>[n,`${n}-xigua-color`,{[`${n}-spin`]:e.spin}]),r=m(()=>{const i={};return e.size&&(i.fontSize=g(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:t,innerStyle:r,onClick:i=>{s("click",i)}}}}),A=["stroke-width","stroke-linecap","stroke-linejoin"],P=o("path",{d:"M381.968 38.684c-202.85 54.614-351.085 232.757-371.89 446.01C-.326 590.018 28.281 630.328 140.108 668.037c104.026 33.808 176.843 101.425 209.351 189.846 40.31 115.729 44.211 122.23 91.023 144.336 40.31 19.504 58.514 19.504 131.332 7.802 211.951-36.41 362.788-171.642 416.101-374.492C1059.434 368.965 882.59 90.697 605.623 32.183 517.2 13.978 470.39 15.279 381.968 38.684zm176.843 322.48c158.64 74.117 201.55 158.638 119.63 237.957-102.725 97.524-240.56 136.534-291.271 80.62-20.806-23.406-24.707-48.112-24.707-161.24s3.901-137.833 24.707-161.239c32.507-36.409 88.421-35.108 171.641 3.901z",fill:"#FE163E"},null,-1),T=[P];function V(e,s,n,t,r,a){return d(),u("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",class:_(e.cls),style:v(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:s[0]||(s[0]=(...i)=>e.onClick&&e.onClick(...i))},T,14,A)}var y=p(B,[["render",V]]);const H=Object.assign(y,{install:(e,s)=>{var n;const t=(n=s==null?void 0:s.iconPrefix)!=null?n:"";e.component(t+y.name,y)}}),W=h({name:"IconStorage",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:s}){const n=k("icon"),t=m(()=>[n,`${n}-storage`,{[`${n}-spin`]:e.spin}]),r=m(()=>{const i={};return e.size&&(i.fontSize=g(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:t,innerStyle:r,onClick:i=>{s("click",i)}}}}),D=["stroke-width","stroke-linecap","stroke-linejoin"],F=o("path",{d:"M7 18h34v12H7V18ZM40 6H8a1 1 0 0 0-1 1v11h34V7a1 1 0 0 0-1-1ZM7 30h34v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V30Z"},null,-1),O=o("path",{d:"M13.02 36H13v.02h.02V36Z"},null,-1),q=o("path",{d:"M13 12v-2h-2v2h2Zm.02 0h2v-2h-2v2Zm0 .02v2h2v-2h-2Zm-.02 0h-2v2h2v-2ZM13 14h.02v-4H13v4Zm-1.98-2v.02h4V12h-4Zm2-1.98H13v4h.02v-4Zm1.98 2V12h-4v.02h4Z",fill:"currentColor",stroke:"none"},null,-1),E=o("path",{d:"M13.02 24H13v.02h.02V24Z"},null,-1),R=[F,O,q,E];function X(e,s,n,t,r,a){return d(),u("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:_(e.cls),style:v(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:s[0]||(s[0]=(...i)=>e.onClick&&e.onClick(...i))},R,14,D)}var $=p(W,[["render",X]]);const U=Object.assign($,{install:(e,s)=>{var n;const t=(n=s==null?void 0:s.iconPrefix)!=null?n:"";e.component(t+$.name,$)}}),G=h({name:"IconSubscribe",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:s}){const n=k("icon"),t=m(()=>[n,`${n}-subscribe`,{[`${n}-spin`]:e.spin}]),r=m(()=>{const i={};return e.size&&(i.fontSize=g(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:t,innerStyle:r,onClick:i=>{s("click",i)}}}}),J=["stroke-width","stroke-linecap","stroke-linejoin"],K=o("path",{d:"M9 7v34.667a.2.2 0 0 0 .294.176L24 34l14.706 7.843a.2.2 0 0 0 .294-.176V7a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1Z"},null,-1),Q=[K];function Y(e,s,n,t,r,a){return d(),u("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:_(e.cls),style:v(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:s[0]||(s[0]=(...i)=>e.onClick&&e.onClick(...i))},Q,14,J)}var w=p(G,[["render",Y]]);const ee=Object.assign(w,{install:(e,s)=>{var n;const t=(n=s==null?void 0:s.iconPrefix)!=null?n:"";e.component(t+w.name,w)}}),te=h({name:"IconTags",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:s}){const n=k("icon"),t=m(()=>[n,`${n}-tags`,{[`${n}-spin`]:e.spin}]),r=m(()=>{const i={};return e.size&&(i.fontSize=g(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:t,innerStyle:r,onClick:i=>{s("click",i)}}}}),se=["stroke-width","stroke-linecap","stroke-linejoin"],ne=o("path",{d:"m37.581 28.123-14.849 14.85a1 1 0 0 1-1.414 0L8.59 30.243m25.982-22.68-10.685-.628a1 1 0 0 0-.766.291L9.297 21.052a1 1 0 0 0 0 1.414L20.61 33.78a1 1 0 0 0 1.415 0l13.824-13.825a1 1 0 0 0 .291-.765l-.628-10.686a1 1 0 0 0-.94-.94Zm-6.874 7.729a1 1 0 1 1 1.414-1.414 1 1 0 0 1-1.414 1.414Z"},null,-1),ie=o("path",{d:"M27.697 15.292a1 1 0 1 1 1.414-1.414 1 1 0 0 1-1.414 1.414Z",fill:"currentColor",stroke:"none"},null,-1),oe=[ne,ie];function re(e,s,n,t,r,a){return d(),u("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:_(e.cls),style:v(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:s[0]||(s[0]=(...i)=>e.onClick&&e.onClick(...i))},oe,14,se)}var x=p(te,[["render",re]]);const le=Object.assign(x,{install:(e,s)=>{var n;const t=(n=s==null?void 0:s.iconPrefix)!=null?n:"";e.component(t+x.name,x)}}),ae={class:"relative"},ce={class:"grid grid-cols-2 gap-4"},de={class:"bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full"},ue={class:"bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full"},me={class:"bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full"},fe={class:"bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full"},he={class:"bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full"},pe={class:"bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full"},ke="456111",ge={__name:"DashBoard",setup(e){S("");const s=S(!1);return j(()=>{localStorage.getItem("dashboardPassword")===ke&&(s.value=!0)}),(n,t)=>{const r=z("RouterLink");return d(),u("div",ae,[l(C,null,{default:c(()=>[t[6]||(t[6]=o("p",{class:"text-xl font-bold mb-4"},"My Apps",-1)),o("div",ce,[l(r,{to:"/admin/post-list",class:"h-full"},{default:c(()=>[o("div",de,[l(f(I),{size:"24",class:"mr-2 flex-shrink-0"}),t[0]||(t[0]=o("span",{class:"flex-grow"},"Blog Manager",-1))])]),_:1}),l(r,{to:"/admin/file-list",class:"h-full"},{default:c(()=>[o("div",ue,[l(f(N),{size:"24",class:"mr-2 flex-shrink-0"}),t[1]||(t[1]=o("span",{class:"flex-grow"},"Image Manager",-1))])]),_:1}),l(r,{to:"/admin/tag-list",class:"h-full"},{default:c(()=>[o("div",me,[l(f(le),{size:"24",class:"mr-2 flex-shrink-0"}),t[2]||(t[2]=o("span",{class:"flex-grow"},"Tag Manager",-1))])]),_:1}),l(r,{to:"/admin/category-list",class:"h-full"},{default:c(()=>[o("div",fe,[l(f(ee),{size:"24",class:"mr-2 flex-shrink-0"}),t[3]||(t[3]=o("span",{class:"flex-grow"},"Category Manager",-1))])]),_:1}),l(r,{to:"/admin/database",class:"h-full"},{default:c(()=>[o("div",he,[l(f(U),{size:"24",class:"mr-2 flex-shrink-0"}),t[4]||(t[4]=o("span",{class:"flex-grow"},"Database Manager",-1))])]),_:1}),l(r,{to:"/app/91porn",class:"h-full"},{default:c(()=>[o("div",pe,[l(f(H),{size:"24",class:"mr-2 flex-shrink-0"}),t[5]||(t[5]=o("span",{class:"flex-grow"},"91porn Spider",-1))])]),_:1})])]),_:1})])}}},_e={class:"flex flex-col md:flex-row md:space-x-4"},ve={class:"space-y-4"},be={class:"py-4 flex-grow flex flex-col justify-between"},ye={class:"text-xl font-semibold mb-2 truncate"},$e={class:"text-gray-700 line-clamp-1"},we={class:"flex justify-between items-center mt-2"},xe={class:"text-gray-600 text-sm"},Ce={key:0,class:"ml-4 w-full md:w-1/3 h-24 md:h-36 flex-shrink-0"},Se=["src","alt"],ze={__name:"ArticleList",setup(e){const s=[{id:1,title:"Article 1",date:"2021-01-01",summary:"This is the summary of article 1"},{id:1,title:"Article 1",date:"2021-01-01",summary:"This is the summary of article 1",thumbnail:"https://via.placeholder.com/150"},{id:1,title:"Article 1",date:"2021-01-01",summary:"This is the summary of article 1",thumbnail:"https://via.placeholder.com/150"},{id:1,title:"Article 1",date:"2021-01-01",summary:"This is the summary of article 1",thumbnail:"https://via.placeholder.com/150"},{id:1,title:"Article 1",date:"2021-01-01",summary:"This is the summary of article 1",thumbnail:"https://via.placeholder.com/150"},{id:1,title:"Article 1",date:"2021-01-01",summary:"This is the summary of article 1",thumbnail:"https://via.placeholder.com/150"}];return(n,t)=>{const r=z("TitleLine");return d(),u("div",_e,[l(C,{class:"flex-1"},{default:c(()=>[l(r,{title:"Article List"}),o("div",ve,[(d(),u(L,null,M(s,a=>o("article",{key:a.id,class:"flex flex-col-reverse md:flex-row bg-white border-b border-gray-200 overflow-hidden"},[o("div",be,[o("h2",ye,b(a.title),1),o("p",$e,b(a.summary),1),o("div",we,[t[0]||(t[0]=o("a",{href:"#",class:"text-blue-600 hover:text-blue-800"},"Read more",-1)),o("p",xe,b(a.date),1)])]),a.thumbnail?(d(),u("div",Ce,[o("img",{src:a.thumbnail,alt:a.title,class:"w-full h-full object-cover"},null,8,Se)])):Z("",!0)])),64))])]),_:1}),l(C,{class:"flex-1 mt-4 md:mt-0"},{default:c(()=>[l(r,{title:"Article List"})]),_:1})])}}},Me=h({__name:"HomeView",setup(e){return(s,n)=>(d(),u(L,null,[l(ge),l(ze)],64))}});export{Me as default};
