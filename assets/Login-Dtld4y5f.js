import{m as w,p as g,f as x,$ as r,q as h,s as b,M as v,o as V,w as o,j as e,e as B,v as c,h as a}from"./index-C6adeIHN.js";const M={setup(){const n=b(),t=g({password:""});return x(()=>{n.currentRoute.value.query.logout&&r.logout()}),{form:t,login:()=>{r.authenticate(t.password)?n.push("/"):v.error("密码错误")}}}},N={class:"login-container w-full max-w-sm p-4 md:p-8"};function j(n,t,u,s,k,q){const d=a("a-typography-title"),_=a("a-input-password"),l=a("a-form-item"),m=a("a-button"),p=a("a-form"),i=a("a-layout-content"),f=a("a-layout");return V(),h(f,{class:"h-screen"},{default:o(()=>[e(i,{class:"flex justify-center"},{default:o(()=>[B("div",N,[e(d,{heading:2,class:"mb-6 text-center"},{default:o(()=>t[1]||(t[1]=[c("登录")])),_:1}),e(p,{model:s.form,onSubmit:s.login,layout:"vertical",class:"text-center"},{default:o(()=>[e(l,{field:"password",class:"mb-4"},{default:o(()=>[e(_,{modelValue:s.form.password,"onUpdate:modelValue":t[0]||(t[0]=y=>s.form.password=y),placeholder:"请输入密码","allow-clear":"",style:{width:"100%"}},null,8,["modelValue"])]),_:1}),e(l,null,{default:o(()=>[e(m,{type:"primary","html-type":"submit",style:{width:"100%"}},{default:o(()=>t[2]||(t[2]=[c(" 登录 ")])),_:1})]),_:1})]),_:1},8,["model","onSubmit"])])]),_:1})]),_:1})}const R=w(M,[["render",j],["__scopeId","data-v-90c279a3"]]);export{R as default};