import{r as t,f as v}from"./index-C6adeIHN.js";function g(c,l={}){const o=t([]),a=t(!1),s=t(0),n=t(1),f=t(10),u=e=>{a.value=!0,c({page:n.value,pageSize:f.value,...e}).then(i=>{o.value=i.data.data.list,s.value=i.data.data.total}).finally(()=>{a.value=!1})},r=e=>{n.value=1,u({...l,...e})};return v(()=>{u(l)}),{list:o,loading:a,refresh:r,total:s}}export{g as u};