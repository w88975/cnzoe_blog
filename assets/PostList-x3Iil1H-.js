import{g as w,d as x}from"./blog-R-RWfRyr.js";import{r as s,f as z,a as g,j as t,w as e,u,h as a,o as p,v as D,F as T,k as b,q as A,y as E,z as F,s as I,A as M}from"./index-CMGBWX3a.js";import"./index-C-uzWTWU.js";function N(f){const l=s([]),n=s(!1),d=s(0),i=s(1),_=s(10),r=()=>{n.value=!0,f({page:i.value,pageSize:_.value}).then(o=>{l.value=o.data.data.list,d.value=o.data.data.total}).finally(()=>{n.value=!1})},c=()=>{i.value=1,r()};return z(()=>{r()}),{list:l,loading:n,refresh:c}}const q={__name:"PostList",setup(f){const l=I(),{list:n,loading:d,refresh:i}=N(w),_=c=>{M.confirm({title:"Delete Blog",content:"Are you sure you want to delete this blog?",onBeforeOk:async()=>(await x(c),i(),!0)})},r=()=>{l.push("/admin/md-editor")};return(c,o)=>{const v=a("a-button"),h=a("TitleLine"),k=a("a-list-item-meta"),L=a("a-list-item"),y=a("a-list"),B=a("a-spin");return p(),g("div",null,[t(h,{title:"Post List"},{right:e(()=>[t(v,{type:"primary",onClick:r},{default:e(()=>o[0]||(o[0]=[D("Create")])),_:1})]),_:1}),t(B,{class:"w-full",loading:u(d)},{default:e(()=>[t(y,null,{default:e(()=>[(p(!0),g(T,null,b(u(n),(m,C)=>(p(),A(L,{key:C},{actions:e(()=>[t(u(E)),t(u(F),{onClick:P=>_(m.id)},null,8,["onClick"])]),default:e(()=>[t(k,{title:m.title,description:m.extra},null,8,["title","description"])]),_:2},1024))),128))]),_:1})]),_:1},8,["loading"])])}}};export{q as default};