import{$ as B,a as C}from"./91porn-CKA-j4ON.js";import{B as v}from"./BoxView-6_SHqkA8.js";import{m as L,r as i,f as $,a as s,e as l,j as t,w as r,F as c,o,k as p,n as g,v as b,t as d,h as H}from"./index-VxQDhg_p.js";import"./index-DkEpIBX_.js";const q={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},T={class:"space-y-2"},V={class:"space-y-2"},N={class:"space-y-2"},j={class:"space-y-2"},z={class:"flex justify-center items-center mt-4"},D=["disabled"],E={class:"mx-2"},G=["disabled"],I={__name:"91Porn",setup(M){const k=i([]),y=i([]),x=i([]),m=i([]),a=i(1),w=i(300),h=async n=>{const f=await C(n);console.log(f),m.value=f.data.posts},P=()=>{a.value>1&&(a.value--,h(a.value))},F=()=>{a.value<w.value&&(a.value++,h(a.value))};return $(async()=>{h(a.value);const n=await B();console.log(n),k.value=n.data.latestFeatured,y.value=n.data.latestLiked,x.value=n.data.weeklyHot}),(n,f)=>{const u=H("TitleLine"),_=H("router-link");return o(),s(c,null,[l("div",q,[t(v,null,{default:r(()=>[t(u,{title:"最新精华"}),l("div",T,[(o(!0),s(c,null,p(k.value,e=>(o(),s("div",{key:e.id},[t(_,{target:"_blank",to:{name:"91porn-detail",query:{tid:e.tid}},class:g([{"text-red-600 font-bold":e.isHighlighted,"hover:text-blue-600":!e.isHighlighted},"cursor-pointer truncate block"])},{default:r(()=>[b(d(e.title),1)]),_:2},1032,["to","class"])]))),128))])]),_:1}),t(v,null,{default:r(()=>[t(u,{title:"最新点赞"}),l("div",V,[(o(!0),s(c,null,p(y.value,e=>(o(),s("div",{key:e.id},[t(_,{target:"_blank",to:{name:"91porn-detail",query:{tid:e.tid}},class:g([{"text-red-600 font-bold":e.isHighlighted,"hover:text-blue-600":!e.isHighlighted},"cursor-pointer truncate block"])},{default:r(()=>[b(d(e.title),1)]),_:2},1032,["to","class"])]))),128))])]),_:1}),t(v,null,{default:r(()=>[t(u,{title:"本周热门"}),l("div",N,[(o(!0),s(c,null,p(x.value,e=>(o(),s("div",{key:e.id},[t(_,{target:"_blank",to:{name:"91porn-detail",query:{tid:e.tid}},class:g([{"text-red-600 font-bold":e.isHighlighted,"hover:text-blue-600":!e.isHighlighted},"cursor-pointer truncate block"])},{default:r(()=>[b(d(e.title),1)]),_:2},1032,["to","class"])]))),128))])]),_:1})]),t(v,null,{default:r(()=>[t(u,{title:"精华帖子"}),l("div",j,[(o(!0),s(c,null,p(m.value,e=>(o(),s("div",{key:e.id},[t(_,{to:{name:"91porn-detail",query:{tid:e.tid}},class:g(["text-red-600 font-bold ","cursor-pointer truncate block"]),target:"_blank",rel:"noopener noreferrer"},{default:r(()=>[b(d(e.cache?"[已缓存]":"")+" "+d(e.full_save?"[已保存]":"")+" "+d(e.title),1)]),_:2},1032,["to"])]))),128))]),l("div",z,[l("button",{onClick:P,class:"px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400",disabled:a.value===1}," 上一页 ",8,D),l("span",E,"第 "+d(a.value)+" 页",1),l("button",{onClick:F,class:"px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400",disabled:a.value===w.value}," 下一页 ",8,G)])]),_:1})],64)}}},O=L(I,[["__scopeId","data-v-1ea72d71"]]);export{O as default};
