import{h as p,j as U,s as F,b as E,o,c as n,p as O,G as q,a as e,y as _,F as S,i as z,n as G,t as j,k as J,g as R,d as T,w as L,E as K,l as W,e as V,x as B,H as Y,_ as I,T as Q,J as Z,q as N,f as X,N as ee,K as te}from"./index-BTHmfypp.js";import{g as se}from"./db-B8Ioq1LY.js";import{O as H,s as le,a as oe}from"./config-Ckr-ZDdX.js";import{u as ae}from"./useList-CA7c9yaB.js";const ne={class:"relative w-full max-w-2xl mx-auto"},re={key:0,class:"absolute right-2 bottom-2"},ie={key:1,class:"tag-selector mt-2 p-2 border rounded-lg shadow-sm bg-white"},ue=["onClick"],de={__name:"TagInput",setup(f,{expose:b}){const m=p(null),g=p(!1),v=p([]),d=p(""),u=p(!1),i=p(0),a=p(""),r=async l=>{u.value=!0;try{const t=await se({tableName:"tags"}),c=t.data.data.list.map($=>$.value);return console.log(t.data.data.list),c.filter($=>$.toLowerCase().startsWith(l.toLowerCase()))}finally{u.value=!1}},s=U(()=>v.value.filter(l=>l.toLowerCase().startsWith(a.value.toLowerCase()))),x=l=>{const t=[],c=/(^|\s)#(\S{2,})(?=\s|$)/g;let $;for(;($=c.exec(l))!==null;)t.push($[2]);return t},w=async()=>{const l=m.value.selectionStart,c=d.value.slice(0,l).match(/#(\w*)$/);c?(a.value=c[1],g.value=!0,v.value=await r(a.value),i.value=0):g.value=!1},C=l=>{if(g.value)switch(l.key){case"ArrowDown":l.preventDefault(),i.value=(i.value+1)%s.value.length;break;case"ArrowUp":l.preventDefault(),i.value=(i.value-1+s.value.length)%s.value.length;break;case"Enter":l.preventDefault(),s.value.length>0&&M(s.value[i.value]);break;case"Escape":g.value=!1;break}},M=l=>{const t=m.value.selectionStart,c=d.value.slice(0,t).replace(/#\w*$/,""),$=d.value.slice(t);d.value=`${c}#${l} ${$}`,g.value=!1,J(()=>{const D=c.length+l.length+2;m.value.setSelectionRange(D,D),m.value.focus()}),i.value=0,a.value=""};return b({insertText:l=>{m.value.selectionStart},exportData:()=>{const l=d.value,t=x(l);return{text:l,tags:t}},clear:()=>{d.value="",g.value=!1,v.value=[],i.value=0}}),F(s,l=>{l.length>0&&(i.value=0)}),E(()=>{m.value.focus()}),(l,t)=>(o(),n("div",ne,[O(e("textarea",{ref_key:"inputRef",ref:m,placeholder:"分享你的想法...",class:"rich-input w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-sm sm:text-base",onInput:w,onKeydown:C,"onUpdate:modelValue":t[0]||(t[0]=c=>d.value=c),rows:"4"},null,544),[[q,d.value]]),u.value?(o(),n("div",re,t[1]||(t[1]=[e("svg",{class:"animate-spin h-5 w-5 text-blue-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1)]))):_("",!0),g.value&&s.value.length>0?(o(),n("div",ie,[(o(!0),n(S,null,z(s.value,(c,$)=>(o(),n("div",{key:c,class:G(["cursor-pointer p-2 rounded transition-colors duration-200 text-sm sm:text-base",$===i.value?"bg-blue-100":"hover:bg-gray-100"]),onClick:D=>M(c)},j(c),11,ue))),128))])):_("",!0)]))}},ce={class:"relative"},ve={key:0,class:"absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-4 w-64"},pe={class:"grid grid-cols-6 gap-2"},ge=["onClick"],me={__name:"EmojiPicker",emits:["select"],setup(f,{emit:b}){const m=p(!1),g=["😀","😂","😍","🥳","😎","🤔","😊","👍","🎉","🌟","💖","🔥","👀","🙌","💯","🤩"],v=()=>{m.value=!m.value},d=i=>{u("select",i),m.value=!1},u=b;return(i,a)=>(o(),n("div",ce,[e("button",{onClick:v,class:"text-blue-500 hover:bg-blue-100 p-2 rounded-full"},a[0]||(a[0]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)])),m.value?(o(),n("div",ve,[e("div",pe,[(o(),n(S,null,z(g,r=>e("button",{key:r,onClick:s=>d(r),class:"text-2xl hover:bg-gray-100 p-2 rounded"},j(r),9,ge)),64))])])):_("",!0)]))}},fe={class:"w-full max-w-md mx-auto"},we={class:"mb-4"},he={for:"file-upload",class:"flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"},ye={class:"flex items-center space-x-2"},be={class:"font-medium text-gray-600"},xe=["accept"],ke={key:0,class:"mb-4"},_e={class:"w-full bg-gray-200 rounded-full h-2.5"},$e={key:1,class:"space-y-2"},Ce={class:"text-sm truncate"},Se=["onClick"],P={__name:"UploadContent",props:{type:{type:String,default:"image",validator:f=>["image","video"].includes(f)}},emits:["complete"],setup(f,{expose:b,emit:m}){const g=f,v=m,d=p(!1),u=p([]),i=p(0),a=U(()=>g.type==="video"?"video/*":"image/*"),r=y=>{const h=Array.from(y.target.files);u.value=[...u.value,...h.map(k=>({file:k,preview:URL.createObjectURL(k),progress:0}))]},s=y=>{URL.revokeObjectURL(u.value[y].preview),u.value.splice(y,1),C()},x=async()=>{d.value=!0;const y=u.value.map((h,k)=>h.progress===0?w(k):Promise.resolve());await Promise.all(y),console.log("upload complete"),d.value=!1,v("complete",u.value.map(h=>H+h.url),g.type)},w=y=>new Promise((h,k)=>{const l=u.value[y].file;W(l,t=>{u.value[y].progress=parseFloat(t.progress),C()},"/SNS").then(t=>(u.value[y].progress=100,u.value[y].url=t.url,C(),console.log(`File uploaded: ${t.url}`),le({url:t.url,dir:"/SNS",fileSize:t.fileSize,type:l.type,name:l.name}))).then(t=>{console.log(`Upload data saved: ${t.id}`),h(t)}).catch(t=>{console.error(`Upload failed for file ${l.name}:`,t),k(t)})}),C=()=>{const y=u.value.reduce((h,k)=>h+k.progress,0);i.value=u.value.length>0?y/u.value.length:0};return b({doUpload:()=>{x()}}),(y,h)=>{const k=R("a-spin");return o(),T(k,{class:"w-full",loading:d.value},{default:L(()=>[e("div",fe,[e("div",we,[e("label",he,[e("span",ye,[h[0]||(h[0]=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-6 h-6 text-gray-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})],-1)),e("span",be,j(f.type==="video"?"上传视频":"上传图片"),1)]),e("input",{id:"file-upload",type:"file",accept:a.value,class:"hidden",multiple:"",onChange:r},null,40,xe)])]),u.value.length>0?(o(),n("div",ke,[h[1]||(h[1]=e("div",{class:"text-sm font-medium text-gray-700 mb-2"},"上传进度",-1)),e("div",_e,[e("div",{class:"bg-blue-600 h-2.5 rounded-full",style:K({width:`${i.value}%`})},null,4)])])):_("",!0),u.value.length>0?(o(),n("div",$e,[(o(!0),n(S,null,z(u.value,(l,t)=>(o(),n("div",{key:t,class:"flex items-center justify-between p-2 bg-gray-100 rounded-md"},[e("span",Ce,j(l.file.name),1),e("button",{onClick:c=>s(t),class:"text-red-500 hover:text-red-700"},h[2]||(h[2]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)]),8,Se)]))),128))])):_("",!0)])]),_:1},8,["loading"])}}},Me={key:0,class:"mt-4"},je={class:"relative bg-gray-100 aspect-square border border-gray-200 rounded-md overflow-hidden group cursor-move"},Ve=["src"],ze=["src"],Le={class:"absolute top-1 left-1 bg-black bg-opacity-50 rounded-full p-1"},De={key:0,xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 text-white",viewBox:"0 0 20 20",fill:"currentColor"},Ue={key:1,xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 text-white",viewBox:"0 0 20 20",fill:"currentColor"},Te={class:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"},Be={__name:"UploadedPreview",props:{files:{type:Array,required:!1,default:()=>[{url:"https://oss.cnzoe.com/SNS/127_1012_1729438451620.png",type:"image"},{url:"https://oss.cnzoe.com/SNS/127_6727_1729438451621.png",type:"image"},{url:"https://oss.cnzoe.com/SNS/127_7102_1729438451621.png",type:"image"}]}},emits:["update:files"],setup(f,{emit:b}){p(!1);const m=f,g=b,v=p(!1),d=p(null),u=U({get:()=>m.files,set:r=>g("update:files",r)}),i=()=>{const r=[...u.value];r.splice(d.value,1),g("update:files",r),v.value=!1},a=r=>{d.value=r,v.value=!0};return(r,s)=>{const x=R("NvaModal");return o(),n(S,null,[f.files.length>0?(o(),n("div",Me,[s[6]||(s[6]=e("h3",{class:"text-sm font-semibold text-gray-700 mb-2"},"Uploaded Content:",-1)),V(B(Y),{modelValue:u.value,"onUpdate:modelValue":s[1]||(s[1]=w=>u.value=w),class:"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2","item-key":"url"},{item:L(({element:w})=>[e("div",je,[w.type==="image"?(o(),n("img",{key:0,src:w.url,alt:"Uploaded image",class:"w-full h-full object-contain"},null,8,Ve)):w.type==="video"?(o(),n("video",{key:1,src:w.url,class:"w-full h-full object-contain"},null,8,ze)):_("",!0),e("div",Le,[w.type==="image"?(o(),n("svg",De,s[3]||(s[3]=[e("path",{"fill-rule":"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z","clip-rule":"evenodd"},null,-1)]))):w.type==="video"?(o(),n("svg",Ue,s[4]||(s[4]=[e("path",{d:"M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"},null,-1)]))):_("",!0)]),e("div",Te,[e("button",{onClick:s[0]||(s[0]=C=>a(r.index)),class:"text-white hover:text-red-500 focus:outline-none"},s[5]||(s[5]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)]))])])]),_:1},8,["modelValue"])])):_("",!0),V(x,{modelValue:v.value,"onUpdate:modelValue":s[2]||(s[2]=w=>v.value=w),title:"Delete Post",onOk:i},{default:L(()=>s[7]||(s[7]=[e("p",null,"Are you sure you want to delete this post?",-1)])),_:1},8,["modelValue"])],64)}}},Ne=8;function A(f){const b=new Date,m=new Date(f),g=new Date(b.getTime()),v=new Date(m.getTime()+Ne*60*60*1e3),d=Math.floor((g-v)/1e3),u=Math.floor(d/3600);if(u<24){if(u===0){const C=Math.floor(d/60);return C===0?"刚刚":`${C}分钟前`}return`${u}小时前`}const i=v.getFullYear(),a=String(v.getMonth()+1).padStart(2,"0"),r=String(v.getDate()).padStart(2,"0"),s=String(v.getHours()).padStart(2,"0"),x=String(v.getMinutes()).padStart(2,"0"),w=String(v.getSeconds()).padStart(2,"0");return g.getFullYear()===i?`${a}-${r} ${s}:${x}:${w}`:`${i}-${a}-${r}`}const Pe={class:"bg-white rounded-lg shadow overflow-hidden relative"},Ae=["onClick"],Fe={class:"p-4"},Re={class:"text-gray-800 text-base mb-4 whitespace-pre-line leading-relaxed font-sans"},Ie={key:0,class:"mb-4"},He={key:0,class:"w-full h-48 lg:h-96 bg-black overflow-hidden"},Ee={class:"relative w-full h-full bg-black"},Oe=["src"],qe={key:1,class:"grid grid-cols-3 gap-2"},Ge={key:0,class:"aspect-w-1 aspect-h-1"},Je=["src","alt"],Ke=["src"],We={key:1,class:"aspect-w-1 aspect-h-1 relative"},Ye=["src","alt"],Qe=["src"],Ze={class:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded"},Xe={class:"text-white text-xl font-bold"},et={class:"flex items-center justify-between text-sm text-gray-500"},tt={key:0,class:"flex items-center space-x-2"},st={class:"flex items-center justify-between mt-4 pt-4 border-t"},lt={class:"flex items-center space-x-2 text-gray-500 hover:text-red-500"},ot={key:1,class:"space-y-6 mb-4"},at={class:"p-4"},nt={class:"grid grid-cols-3 gap-2 mb-4"},rt={__name:"SNSList",props:{posts:{type:Array,required:!0}},emits:["delete"],setup(f,{emit:b}){console.log(A("2024-10-21 02:49:59"));const m=f,g=b;F(()=>m.posts,(i,a)=>{i.length>a.length&&console.log("New post(s) added")},{deep:!0});const v=U(()=>m.posts.map(i=>{const a=i.images.split(",").map(s=>({type:"image",url:s})),r=i.videos.split(",").map(s=>({type:"video",url:s}));return{...i,medias:[...a,...r].filter(s=>s.url.trim()!=="")}})),d=i=>i.replace(H,oe),u=i=>{g("delete",i)};return(i,a)=>v.value.length>0?(o(),T(Q,{key:0,name:"post-list",tag:"div",class:"space-y-6 mb-4"},{default:L(()=>[(o(!0),n(S,null,z(v.value,r=>(o(),n("div",{key:r.id,class:"post-item"},[e("div",Pe,[e("button",{onClick:s=>u(r.id),class:"absolute top-2 right-2 text-gray-500 hover:text-red-500"},a[0]||(a[0]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)]),8,Ae),e("div",Fe,[e("p",Re,j(r.text),1),r.medias.length>0?(o(),n("div",Ie,[r.medias.length===1&&r.medias[0].type==="video"?(o(),n("div",He,[e("div",Ee,[e("img",{src:d(r.medias[0].url),alt:"Video thumbnail",class:"w-full h-full object-cover"},null,8,Oe),a[1]||(a[1]=e("div",{class:"absolute inset-0 flex items-center justify-center"},[e("div",{class:"w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-8 w-8 text-black",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})])])],-1)),a[2]||(a[2]=e("div",{class:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"},[e("div",{class:"flex items-center justify-between text-white"},[e("div",{class:"flex items-center space-x-2"},[e("button",{class:"focus:outline-none"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"}),e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})])]),e("span",null,"0:00 / --:--")]),e("button",{class:"focus:outline-none"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"})])])]),e("div",{class:"mt-2 bg-gray-200 rounded-full h-1"},[e("div",{class:"bg-red-500 h-1 rounded-full w-1/3"})])],-1))])])):(o(),n("div",qe,[(o(!0),n(S,null,z(r.medias.slice(0,9),(s,x)=>(o(),n(S,{key:x},[x<8||r.medias.length<=9?(o(),n("div",Ge,[s.type==="image"?(o(),n("img",{key:0,src:d(s.url),alt:`Post image ${x+1}`,class:"w-full h-full object-cover rounded"},null,8,Je)):s.type==="video"?(o(),n("video",{key:1,src:s.url,class:"w-full h-full object-cover rounded",controls:""},null,8,Ke)):_("",!0)])):(o(),n("div",We,[s.type==="image"?(o(),n("img",{key:0,src:d(s.url),alt:`Post image ${x+1}`,class:"w-full h-full object-cover rounded"},null,8,Ye)):s.type==="video"?(o(),n("video",{key:1,src:s.url,class:"w-full h-full object-cover rounded"},null,8,Qe)):_("",!0),e("div",Ze,[e("span",Xe,"+"+j(r.medias.length-8),1)])]))],64))),128))]))])):_("",!0),e("div",et,[e("span",null,j(B(A)(r.create_at)),1),r.tags?(o(),n("div",tt,[(o(!0),n(S,null,z(r.tags.split(","),s=>(o(),n("span",{key:s},"#"+j(s),1))),128))])):_("",!0)]),e("div",st,[a[4]||(a[4]=e("button",{class:"flex items-center space-x-2 text-gray-500 hover:text-blue-500"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"})]),e("span",null,"0 Comments")],-1)),e("button",lt,[a[3]||(a[3]=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"})],-1)),e("span",null,j(r.likes)+" Likes",1)])])])])]))),128))]),_:1})):(o(),n("div",ot,[(o(),n(S,null,z(3,r=>e("div",{key:r,class:"bg-white rounded-lg shadow overflow-hidden animate-pulse skeleton-fade"},[e("div",at,[a[6]||(a[6]=e("div",{class:"h-4 bg-gray-200 rounded w-3/4 mb-4"},null,-1)),a[7]||(a[7]=e("div",{class:"h-4 bg-gray-200 rounded w-1/2 mb-4"},null,-1)),e("div",nt,[(o(),n(S,null,z(3,s=>e("div",{key:s,class:"aspect-w-1 aspect-h-1"},a[5]||(a[5]=[e("div",{class:"w-full h-full bg-gray-200 rounded"},null,-1)]))),64))]),a[8]||(a[8]=Z('<div class="flex items-center justify-between" data-v-3f9d0e8c><div class="h-4 bg-gray-200 rounded w-1/4" data-v-3f9d0e8c></div><div class="h-4 bg-gray-200 rounded w-1/4" data-v-3f9d0e8c></div></div><div class="flex items-center justify-between mt-4 pt-4 border-t" data-v-3f9d0e8c><div class="h-5 bg-gray-200 rounded w-1/4" data-v-3f9d0e8c></div><div class="h-5 bg-gray-200 rounded w-1/4" data-v-3f9d0e8c></div></div>',2))])])),64))]))}},it=I(rt,[["__scopeId","data-v-3f9d0e8c"]]),ut=f=>N.post("/api/sns/list",{...f}),dt=f=>N.post("/api/sns/publish",{...f}),ct=f=>N.post("/api/sns/delete",{...f}),vt={class:"max-w-2xl mx-auto"},pt={class:"bg-white rounded-lg shadow mb-6 relative overflow-hidden",id:"post-creation"},gt={key:0,class:"absolute inset-0 bg-gray-200 bg-opacity-50 z-10 flex items-center justify-center"},mt={class:"p-4"},ft={class:"relative"},wt={class:"flex items-center justify-between mt-3"},ht={class:"flex space-x-2"},yt=["disabled"],bt={key:0},xt={key:1,class:"flex items-center"},kt={__name:"index",setup(f){const{list:b,loading:m,refresh:g}=ae(ut);p(!1),p(!1),p([]);const v=p(null),d=p(null),u=p(""),i=p(!1),a=p(""),r=p(!0),s=p([]),x=U(()=>a.value==="image"?"Upload Image":"Upload Video"),w=l=>{a.value=l,i.value=!0},C=(l,t)=>{console.log("upload complete",l);const c=l.map(D=>({url:D,type:t})),$=Array.from(new Set([...s.value,...c].map(JSON.stringify))).map(JSON.parse);s.value=$,console.log("uploadedFiles",s.value),i.value=!1},M=p(!1),y=async()=>{if(M.value)return;M.value=!0;const l=d.value.exportData();console.log("handlePost",l);try{await dt({content:l.text,images:s.value.filter(t=>t.type==="image").map(t=>t.url),videos:s.value.filter(t=>t.type==="video").map(t=>t.url),tags:l.tags}),await g(),u.value="",s.value=[],d.value.clear()}catch(t){console.error("Error posting:",t)}finally{M.value=!1}},h=async l=>{console.log("handleDelete",l),b.value=b.value.filter(t=>t.id!==l),await ct({id:l}),await g()},k=l=>{console.log(l),d.value.insertText(l)};return(l,t)=>(o(),n(S,null,[e("div",vt,[e("div",pt,[M.value?(o(),n("div",gt,t[7]||(t[7]=[e("svg",{class:"animate-spin h-10 w-10 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1)]))):_("",!0),e("div",mt,[e("div",ft,[V(de,{modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=c=>u.value=c),ref_key:"tagInputRef",ref:d},null,8,["modelValue"])]),e("div",wt,[e("div",ht,[e("button",{onClick:t[1]||(t[1]=c=>w("image")),class:"text-blue-500 hover:bg-blue-100 p-2 rounded-full"},t[8]||(t[8]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})],-1)])),e("button",{onClick:t[2]||(t[2]=c=>w("video")),class:"text-blue-500 hover:bg-blue-100 p-2 rounded-full"},t[9]||(t[9]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"})],-1)])),t[10]||(t[10]=e("button",{class:"text-blue-500 hover:bg-blue-100 p-2 rounded-full"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"})])],-1)),V(me,{onSelect:k})]),e("button",{onClick:y,disabled:M.value,class:"bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"},[M.value?(o(),n("span",xt,t[11]||(t[11]=[e("svg",{class:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1),X(" Posting... ")]))):(o(),n("span",bt,"Post"))],8,yt)]),V(Be,{files:s.value,"onUpdate:files":t[3]||(t[3]=c=>s.value=c)},null,8,["files"])])]),V(it,{posts:B(b),onDelete:h},null,8,["posts"])]),r.value?(o(),T(te,{key:1,visible:i.value,"onUpdate:visible":t[5]||(t[5]=c=>i.value=c),title:x.value,okText:"开始上传",onOk:t[6]||(t[6]=c=>v.value.doUpload())},{default:L(()=>[V(P,{type:a.value,ref_key:"uploadContentRef",ref:v,onComplete:C},null,8,["type"])]),_:1},8,["visible","title"])):(o(),T(ee,{key:0,modelValue:i.value,"onUpdate:modelValue":t[4]||(t[4]=c=>i.value=c),title:x.value},{default:L(()=>[V(P,{type:a.value},null,8,["type"])]),_:1},8,["modelValue","title"]))],64))}},Mt=I(kt,[["__scopeId","data-v-31067387"]]);export{Mt as default};