import{k as w,l as g,f as x,$ as r,m as h,w as o,p as b,M as v,j as e,o as V,h as a,e as k,q as c}from"./index-DJV0LrDg.js";const B={setup(){const n=b(),t=g({password:""});return x(()=>{n.currentRoute.value.query.logout&&r.logout()}),{form:t,login:()=>{r.authenticate(t.password)?n.push("/"):v.error("密码错误")}}}},M={class:"login-container w-full max-w-sm p-4 md:p-8"};function N(n,t,u,s,j,q){const d=e("a-typography-title"),_=e("a-input-password"),l=e("a-form-item"),m=e("a-button"),p=e("a-form"),i=e("a-layout-content"),f=e("a-layout");return V(),h(f,{class:"h-screen"},{default:o(()=>[a(i,{class:"flex justify-center"},{default:o(()=>[k("div",M,[a(d,{heading:2,class:"mb-6 text-center"},{default:o(()=>t[1]||(t[1]=[c("登录")])),_:1}),a(p,{model:s.form,onSubmit:s.login,layout:"vertical",class:"text-center"},{default:o(()=>[a(l,{field:"password",class:"mb-4"},{default:o(()=>[a(_,{modelValue:s.form.password,"onUpdate:modelValue":t[0]||(t[0]=y=>s.form.password=y),placeholder:"请输入密码","allow-clear":"",style:{width:"100%"}},null,8,["modelValue"])]),_:1}),a(l,null,{default:o(()=>[a(m,{type:"primary","html-type":"submit",style:{width:"100%"}},{default:o(()=>t[2]||(t[2]=[c(" 登录 ")])),_:1})]),_:1})]),_:1},8,["model","onSubmit"])])]),_:1})]),_:1})}const R=w(B,[["render",N],["__scopeId","data-v-90c279a3"]]);export{R as default};