import{_ as ge,d as le,g as we,c as W,i as ye,o as b,a as C,n as Y,b as ae,e as h,G as qe,r as A,h as U,t as S,u as j,v as z,j as _,w as I,M as P,m as Ze,I as Ce,H as Qe,J as He,q as oe,K as Je,F as H,k as re,L as Ee,f as Ue,l as R,N as Ke,O as Xe,p as Fe,P as Ye,B as Le,Q as et,y as tt,R as ne,s as st}from"./index-BYuF_VRx.js";import{O as De,d as je,a as me,b as Ie,c as nt,g as it,e as ot,u as fe,s as Ae}from"./config-BHgbMSM5.js";import{I as rt}from"./index-ZT0CnVGB.js";import"./index-CZWiWUhx.js";const lt=le({name:"IconCode",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:m}){const n=we("icon"),d=W(()=>[n,`${n}-code`,{[`${n}-spin`]:e.spin}]),g=W(()=>{const r={};return e.size&&(r.fontSize=ye(e.size)?`${e.size}px`:e.size),e.rotate&&(r.transform=`rotate(${e.rotate}deg)`),r});return{cls:d,innerStyle:g,onClick:r=>{m("click",r)}}}}),at=["stroke-width","stroke-linecap","stroke-linejoin"],ut=h("path",{d:"M16.734 12.686 5.42 24l11.314 11.314m14.521-22.628L42.57 24 31.255 35.314M27.2 6.28l-6.251 35.453"},null,-1),ct=[ut];function dt(e,m,n,d,g,o){return b(),C("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:Y(e.cls),style:ae(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:m[0]||(m[0]=(...r)=>e.onClick&&e.onClick(...r))},ct,14,at)}var pe=ge(lt,[["render",dt]]);const ft=Object.assign(pe,{install:(e,m)=>{var n;const d=(n=m==null?void 0:m.iconPrefix)!=null?n:"";e.component(d+pe.name,pe)}}),pt=le({name:"IconCommon",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:m}){const n=we("icon"),d=W(()=>[n,`${n}-common`,{[`${n}-spin`]:e.spin}]),g=W(()=>{const r={};return e.size&&(r.fontSize=ye(e.size)?`${e.size}px`:e.size),e.rotate&&(r.transform=`rotate(${e.rotate}deg)`),r});return{cls:d,innerStyle:g,onClick:r=>{m("click",r)}}}}),vt=["stroke-width","stroke-linecap","stroke-linejoin"],ht=h("path",{d:"M24 23 7.652 14.345M24 23l16.366-8.664M24 23v19.438M7 14v20l17 9 17-9V14L24 5 7 14Z"},null,-1),mt=[ht];function gt(e,m,n,d,g,o){return b(),C("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:Y(e.cls),style:ae(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:m[0]||(m[0]=(...r)=>e.onClick&&e.onClick(...r))},mt,14,vt)}var ve=ge(pt,[["render",gt]]);const wt=Object.assign(ve,{install:(e,m)=>{var n;const d=(n=m==null?void 0:m.iconPrefix)!=null?n:"";e.component(d+ve.name,ve)}}),yt=le({name:"IconFolder",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:m}){const n=we("icon"),d=W(()=>[n,`${n}-folder`,{[`${n}-spin`]:e.spin}]),g=W(()=>{const r={};return e.size&&(r.fontSize=ye(e.size)?`${e.size}px`:e.size),e.rotate&&(r.transform=`rotate(${e.rotate}deg)`),r});return{cls:d,innerStyle:g,onClick:r=>{m("click",r)}}}}),kt=["stroke-width","stroke-linecap","stroke-linejoin"],xt=h("path",{d:"M6 13h18l-2.527-3.557a1.077 1.077 0 0 0-.88-.443H7.06C6.474 9 6 9.448 6 10v3Zm0 0h33.882c1.17 0 2.118.895 2.118 2v21c0 1.105-.948 3-2.118 3H8.118C6.948 39 6 38.105 6 37V13Z"},null,-1),bt=[xt];function _t(e,m,n,d,g,o){return b(),C("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:Y(e.cls),style:ae(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:m[0]||(m[0]=(...r)=>e.onClick&&e.onClick(...r))},bt,14,kt)}var he=ge(yt,[["render",_t]]);const Ct=Object.assign(he,{install:(e,m)=>{var n;const d=(n=m==null?void 0:m.iconPrefix)!=null?n:"";e.component(d+he.name,he)}});function ie(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ze={exports:{}};(function(e,m){(function(n){e.exports=n()})(function(){return function n(d,g,o){function r(v,t){if(!g[v]){if(!d[v]){var l=typeof ie=="function"&&ie;if(!t&&l)return l(v,!0);if(x)return x(v,!0);var s=new Error("Cannot find module '"+v+"'");throw s.code="MODULE_NOT_FOUND",s}var a=g[v]={exports:{}};d[v][0].call(a.exports,function(L){var k=d[v][1][L];return r(k||L)},a,a.exports,n,d,g,o)}return g[v].exports}for(var x=typeof ie=="function"&&ie,y=0;y<o.length;y++)r(o[y]);return r}({1:[function(n,d,g){function o(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}d.exports=o,o.EventEmitter=o,o.prototype._events=void 0,o.prototype._maxListeners=void 0,o.defaultMaxListeners=10,o.prototype.setMaxListeners=function(t){if(!x(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},o.prototype.emit=function(t){var l,s,a,L,k,i;if(this._events||(this._events={}),t==="error"&&(!this._events.error||y(this._events.error)&&!this._events.error.length)){if(l=arguments[1],l instanceof Error)throw l;var c=new Error('Uncaught, unspecified "error" event. ('+l+")");throw c.context=l,c}if(s=this._events[t],v(s))return!1;if(r(s))switch(arguments.length){case 1:s.call(this);break;case 2:s.call(this,arguments[1]);break;case 3:s.call(this,arguments[1],arguments[2]);break;default:L=Array.prototype.slice.call(arguments,1),s.apply(this,L)}else if(y(s))for(L=Array.prototype.slice.call(arguments,1),i=s.slice(),a=i.length,k=0;k<a;k++)i[k].apply(this,L);return!0},o.prototype.addListener=function(t,l){var s;if(!r(l))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,r(l.listener)?l.listener:l),this._events[t]?y(this._events[t])?this._events[t].push(l):this._events[t]=[this._events[t],l]:this._events[t]=l,y(this._events[t])&&!this._events[t].warned&&(v(this._maxListeners)?s=o.defaultMaxListeners:s=this._maxListeners,s&&s>0&&this._events[t].length>s&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),typeof console.trace=="function"&&console.trace())),this},o.prototype.on=o.prototype.addListener,o.prototype.once=function(t,l){if(!r(l))throw TypeError("listener must be a function");var s=!1;function a(){this.removeListener(t,a),s||(s=!0,l.apply(this,arguments))}return a.listener=l,this.on(t,a),this},o.prototype.removeListener=function(t,l){var s,a,L,k;if(!r(l))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(s=this._events[t],L=s.length,a=-1,s===l||r(s.listener)&&s.listener===l)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,l);else if(y(s)){for(k=L;k-- >0;)if(s[k]===l||s[k].listener&&s[k].listener===l){a=k;break}if(a<0)return this;s.length===1?(s.length=0,delete this._events[t]):s.splice(a,1),this._events.removeListener&&this.emit("removeListener",t,l)}return this},o.prototype.removeAllListeners=function(t){var l,s;if(!this._events)return this;if(!this._events.removeListener)return arguments.length===0?this._events={}:this._events[t]&&delete this._events[t],this;if(arguments.length===0){for(l in this._events)l!=="removeListener"&&this.removeAllListeners(l);return this.removeAllListeners("removeListener"),this._events={},this}if(s=this._events[t],r(s))this.removeListener(t,s);else if(s)for(;s.length;)this.removeListener(t,s[s.length-1]);return delete this._events[t],this},o.prototype.listeners=function(t){var l;return!this._events||!this._events[t]?l=[]:r(this._events[t])?l=[this._events[t]]:l=this._events[t].slice(),l},o.prototype.listenerCount=function(t){if(this._events){var l=this._events[t];if(r(l))return 1;if(l)return l.length}return 0},o.listenerCount=function(t,l){return t.listenerCount(l)};function r(t){return typeof t=="function"}function x(t){return typeof t=="number"}function y(t){return typeof t=="object"&&t!==null}function v(t){return t===void 0}},{}],2:[function(n,d,g){var o,r,x,y,v;v=navigator.userAgent.toLowerCase(),y=navigator.platform.toLowerCase(),o=v.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0],x=o[1]==="ie"&&document.documentMode,r={name:o[1]==="version"?o[3]:o[1],version:x||parseFloat(o[1]==="opera"&&o[4]?o[4]:o[2]),platform:{name:v.match(/ip(?:ad|od|hone)/)?"ios":(v.match(/(?:webos|android)/)||y.match(/mac|win|linux/)||["other"])[0]}},r[r.name]=!0,r[r.name+parseInt(r.version,10)]=!0,r.platform[r.platform.name]=!0,d.exports=r},{}],3:[function(n,d,g){var o,r,x,y=function(s,a){for(var L in a)v.call(a,L)&&(s[L]=a[L]);function k(){this.constructor=s}return k.prototype=a.prototype,s.prototype=new k,s.__super__=a.prototype,s},v={}.hasOwnProperty,t=[].indexOf||function(s){for(var a=0,L=this.length;a<L;a++)if(a in this&&this[a]===s)return a;return-1},l=[].slice;o=n("events").EventEmitter,x=n("./browser.coffee"),r=function(s){var a,L;y(k,s),a={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null,debug:!1,dither:!1},L={delay:500,copy:!1};function k(i){var c,p,w;this.running=!1,this.options={},this.frames=[],this.freeWorkers=[],this.activeWorkers=[],this.setOptions(i);for(p in a)w=a[p],(c=this.options)[p]==null&&(c[p]=w)}return k.prototype.setOption=function(i,c){if(this.options[i]=c,this._canvas!=null&&(i==="width"||i==="height"))return this._canvas[i]=c},k.prototype.setOptions=function(i){var c,p,w;p=[];for(c in i)v.call(i,c)&&(w=i[c],p.push(this.setOption(c,w)));return p},k.prototype.addFrame=function(i,c){var p,w;c==null&&(c={}),p={},p.transparent=this.options.transparent;for(w in L)p[w]=c[w]||L[w];if(this.options.width==null&&this.setOption("width",i.width),this.options.height==null&&this.setOption("height",i.height),typeof ImageData<"u"&&ImageData!==null&&i instanceof ImageData)p.data=i.data;else if(typeof CanvasRenderingContext2D<"u"&&CanvasRenderingContext2D!==null&&i instanceof CanvasRenderingContext2D||typeof WebGLRenderingContext<"u"&&WebGLRenderingContext!==null&&i instanceof WebGLRenderingContext)c.copy?p.data=this.getContextData(i):p.context=i;else if(i.childNodes!=null)c.copy?p.data=this.getImageData(i):p.image=i;else throw new Error("Invalid image");return this.frames.push(p)},k.prototype.render=function(){var i,c,p;if(this.running)throw new Error("Already running");if(this.options.width==null||this.options.height==null)throw new Error("Width and height must be set prior to rendering");if(this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=(function(){var w,N,D;for(D=[],w=0,N=this.frames.length;0<=N?w<N:w>N;0<=N?++w:--w)D.push(null);return D}).call(this),c=this.spawnWorkers(),this.options.globalPalette===!0)this.renderNextFrame();else for(i=0,p=c;0<=p?i<p:i>p;0<=p?++i:--i)this.renderNextFrame();return this.emit("start"),this.emit("progress",0)},k.prototype.abort=function(){for(var i;i=this.activeWorkers.shift(),i!=null;)this.log("killing active worker"),i.terminate();return this.running=!1,this.emit("abort")},k.prototype.spawnWorkers=function(){var i,c,p;return i=Math.min(this.options.workers,this.frames.length),(function(){p=[];for(var w=c=this.freeWorkers.length;c<=i?w<i:w>i;c<=i?w++:w--)p.push(w);return p}).apply(this).forEach(function(w){return function(N){var D;return w.log("spawning worker "+N),D=new Worker(w.options.workerScript),D.onmessage=function(B){return w.activeWorkers.splice(w.activeWorkers.indexOf(D),1),w.freeWorkers.push(D),w.frameFinished(B.data)},w.freeWorkers.push(D)}}(this)),i},k.prototype.frameFinished=function(i){var c,p;if(this.log("frame "+i.index+" finished - "+this.activeWorkers.length+" active"),this.finishedFrames++,this.emit("progress",this.finishedFrames/this.frames.length),this.imageParts[i.index]=i,this.options.globalPalette===!0&&(this.options.globalPalette=i.globalPalette,this.log("global palette analyzed"),this.frames.length>2))for(c=1,p=this.freeWorkers.length;1<=p?c<p:c>p;1<=p?++c:--c)this.renderNextFrame();return t.call(this.imageParts,null)>=0?this.renderNextFrame():this.finishRendering()},k.prototype.finishRendering=function(){var i,c,p,w,N,D,B,G,ee,T,te,q,se,J,Q,K;for(G=0,J=this.imageParts,N=0,ee=J.length;N<ee;N++)c=J[N],G+=(c.data.length-1)*c.pageSize+c.cursor;for(G+=c.pageSize-c.cursor,this.log("rendering finished - filesize "+Math.round(G/1e3)+"kb"),i=new Uint8Array(G),q=0,Q=this.imageParts,D=0,T=Q.length;D<T;D++)for(c=Q[D],K=c.data,p=B=0,te=K.length;B<te;p=++B)se=K[p],i.set(se,q),p===c.data.length-1?q+=c.cursor:q+=c.pageSize;return w=new Blob([i],{type:"image/gif"}),this.emit("finished",w,i)},k.prototype.renderNextFrame=function(){var i,c,p;if(this.freeWorkers.length===0)throw new Error("No free workers");if(!(this.nextFrame>=this.frames.length))return i=this.frames[this.nextFrame++],p=this.freeWorkers.shift(),c=this.getTask(i),this.log("starting frame "+(c.index+1)+" of "+this.frames.length),this.activeWorkers.push(p),p.postMessage(c)},k.prototype.getContextData=function(i){return i.getImageData(0,0,this.options.width,this.options.height).data},k.prototype.getImageData=function(i){var c;return this._canvas==null&&(this._canvas=document.createElement("canvas"),this._canvas.width=this.options.width,this._canvas.height=this.options.height),c=this._canvas.getContext("2d"),c.setFill=this.options.background,c.fillRect(0,0,this.options.width,this.options.height),c.drawImage(i,0,0),this.getContextData(c)},k.prototype.getTask=function(i){var c,p;if(c=this.frames.indexOf(i),p={index:c,last:c===this.frames.length-1,delay:i.delay,transparent:i.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,dither:this.options.dither,globalPalette:this.options.globalPalette,repeat:this.options.repeat,canTransfer:x.name==="chrome"},i.data!=null)p.data=i.data;else if(i.context!=null)p.data=this.getContextData(i.context);else if(i.image!=null)p.data=this.getImageData(i.image);else throw new Error("Invalid frame");return p},k.prototype.log=function(){var i;if(i=1<=arguments.length?l.call(arguments,0):[],!!this.options.debug)return console.log.apply(console,i)},k}(o),d.exports=r},{"./browser.coffee":2,events:1}]},{},[3])(3)})})(ze);var Ft=ze.exports;const Lt=qe(Ft);async function Se(e){try{let m;if(e instanceof File)m=URL.createObjectURL(e);else if(typeof e=="string")m=e;else throw new Error("Invalid input: expected File object or URL string");const n=document.createElement("video");n.src=m,n.crossOrigin="anonymous",await new Promise((v,t)=>{n.onloadedmetadata=v,n.onerror=t});const d=document.createElement("canvas"),g=d.getContext("2d");d.width=150,d.height=150;const o=[.1,.3,.5,.7],r=[];for(const v of o){n.currentTime=n.duration*v,await new Promise(a=>{n.onseeked=a}),g.fillStyle="black",g.fillRect(0,0,150,150);const t=Math.min(150/n.videoWidth,150/n.videoHeight),l=(150-n.videoWidth*t)/2,s=(150-n.videoHeight*t)/2;g.drawImage(n,0,0,n.videoWidth,n.videoHeight,l,s,n.videoWidth*t,n.videoHeight*t),r.push(g.getImageData(0,0,150,150)),console.log(`截取预览图 ${v*100}% 完成`)}const x=new Lt({workers:2,quality:10,width:150,height:150});r.forEach(v=>{x.addFrame(v,{delay:500})});const y=await new Promise(v=>{x.on("finished",t=>{v(t)}),x.render()});return e instanceof File&&URL.revokeObjectURL(m),console.log("GIF预览图生成完成"),y}catch(m){return console.error("创建视频预览失败:",m),null}}const It={key:0,class:"space-y-4"},At=["href"],St={class:"text-blue-500 hover:text-blue-700 underline"},Et={key:1},Ut={__name:"FileInfo",props:{file:{type:Object,required:!0}},emits:["fileDeleted","aliasUpdated"],setup(e,{emit:m}){const n=e,d=m,g=A(!1),o=A(n.file.alias||n.file.path),r=A(!1),x=async s=>{g.value=!0;try{if((await je({fileIds:n.file.id+""})).data.success)P.success("删除成功"),d("fileDeleted",{success:!0,fileId:n.file.id}),s();else throw new Error("删除失败")}catch(a){P.error("删除失败："+a.message),d("fileDeleted",{success:!1,fileId:n.file.id,error:a.message}),s(!1)}finally{g.value=!1}},y=s=>{o.value=s},v=async()=>{r.value=!0;try{if((await me({fileId:n.file.id,alias:o.value})).data.success)P.success("Alias saved successfully"),d("aliasUpdated",{fileId:n.file.id,newAlias:o.value});else throw new Error("Failed to save alias")}catch(s){P.error("Failed to save alias: "+s.message)}finally{r.value=!1}},t=s=>s<1024?s+" B":s<1024*1024?(s/1024).toFixed(2)+" KB":s<1024*1024*1024?(s/(1024*1024)).toFixed(2)+" MB":(s/(1024*1024*1024)).toFixed(2)+" GB",l=s=>new Date(s).toLocaleString();return(s,a)=>{const L=U("a-button"),k=U("a-input"),i=U("a-popconfirm");return b(),C("div",null,[a[11]||(a[11]=h("h2",{class:"text-xl font-bold mb-4"},"File Information",-1)),e.file?(b(),C("div",It,[h("a",{href:`${j(De)}${e.file.full_path}`,target:"_blank",class:"block"},[a[1]||(a[1]=h("p",{class:"mb-1"},[h("strong",null,"Name:")],-1)),h("span",St,S(e.file.file_name),1)],8,At),h("p",null,[a[2]||(a[2]=h("strong",null,"Type:",-1)),z(" "+S(e.file.type===0?"Folder":"File"),1)]),h("p",null,[a[3]||(a[3]=h("strong",null,"Full Path:",-1)),z(" "+S(e.file.full_path),1)]),h("p",null,[a[4]||(a[4]=h("strong",null,"Size:",-1)),z(" "+S(t(e.file.file_size)),1)]),h("p",null,[a[5]||(a[5]=h("strong",null,"File Type:",-1)),z(" "+S(e.file.file_type),1)]),h("p",null,[a[6]||(a[6]=h("strong",null,"Created At:",-1)),z(" "+S(l(e.file.created_at)),1)]),h("p",null,[a[7]||(a[7]=h("strong",null,"Updated At:",-1)),z(" "+S(l(e.file.updated_at)),1)]),h("div",null,[a[9]||(a[9]=h("p",{class:"mb-1"},[h("strong",null,"Alias:")],-1)),_(k,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=c=>o.value=c),placeholder:"Set an alias for this file","default-value":e.file.alias||e.file.path,onChange:y},{suffix:I(()=>[_(L,{type:"text",onClick:v,loading:r.value},{default:I(()=>a[8]||(a[8]=[z(" Save ")])),_:1},8,["loading"])]),_:1},8,["modelValue","default-value"])]),_(i,{content:"确认删除此文件吗？",type:"warning","ok-loading":g.value,onBeforeOk:x},{default:I(()=>[_(L,{type:"primary",class:"mt-6"},{default:I(()=>a[10]||(a[10]=[z("删除")])),_:1})]),_:1},8,["ok-loading"])])):(b(),C("div",Et," No file information available. "))])}}},Dt=le({name:"IconFile",props:{fileName:{type:String,required:!0},type:{type:Number,default:0}},setup(e){const m=d=>d.split(".").pop().toLowerCase();return{iconComponent:W(()=>{if(e.type===0)return Ct;switch(m(e.fileName)){case"pdf":case"doc":case"docx":case"txt":return Ce;case"jpg":case"jpeg":case"png":case"gif":return rt;case"mp4":case"avi":case"mov":return He;case"mp3":case"wav":return Qe;case"zip":case"rar":return wt;case"js":case"vue":case"py":case"java":return ft;default:return Ce}})}}});function jt(e,m,n,d,g,o){return b(),oe(Je(e.iconComponent))}const zt=Ze(Dt,[["render",jt]]),Nt={class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto relative"},Pt={class:"absolute top-2 right-2 z-10"},$t=["onClick"],Ot={class:"text-sm text-center truncate w-full block"},Rt={__name:"ViewModeFolder",props:{fileList:{type:Array,required:!0}},emits:["folderClick","triggerFileUpload","updateSelectedFiles"],setup(e,{emit:m}){const n=m,d=A([]),g=(x,y)=>{if(y)d.value.push(x);else{const v=d.value.indexOf(x);v>-1&&d.value.splice(v,1)}console.log("selectedFiles",d.value),n("updateSelectedFiles",d.value)},o=()=>{n("triggerFileUpload")},r=(x,y,v)=>{n("folderClick",x,y,v)};return(x,y)=>{const v=U("a-checkbox");return b(),C("div",Nt,[(b(!0),C(H,null,re(e.fileList,t=>(b(),C("div",{key:t.id,class:"flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50 relative"},[h("div",Pt,[_(v,{"model-value":d.value.includes(t.id),onChange:l=>g(t.id,l)},null,8,["model-value","onChange"])]),h("div",{onClick:l=>r(t.type,t.full_path,t),class:"w-full h-full flex flex-col items-center justify-center"},[_(zt,{size:"24",type:t.type,fileName:t.path},null,8,["type","fileName"]),h("span",Ot,S(t.alias||t.path),1)],8,$t)]))),128)),h("div",{class:"flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50",onClick:o},[_(j(Ee),{size:"24",class:"mb-2"}),y[0]||(y[0]=h("span",{class:"text-sm text-center break-words"},"上传",-1))])])}}};function Mt(e){return(e/1024/1024).toFixed(2)+"MB"}const Vt="/assets/icon_folder-Dn5kCvJT.png",Tt="/assets/icon_audio-Ciu7_aS0.png",Wt="/assets/icon_video-CblCkkD0.png",Bt="/assets/icon_pdf-C1I33Bud.png",Gt="/assets/icon_txt-BTPhg_V_.png",qt="/assets/icon_zip-93NlvEmD.png",Zt="data:image/png;base64,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",Qt=["src"],Ht=["src"],Jt=["src"],Kt=["src"],Xt={key:3,class:"relative w-full h-full group"},Yt=["src"],es=["src"],ts=["src"],ss=["src"],ns=["src"],is=["src"],os={__name:"IconFilePreview",props:{file:{type:Object,required:!0}},setup(e){const m=e,n=A("txt"),d=A(!1),g=r=>r.split(".").pop().toLowerCase(),o=r=>{switch(g(r)){case"pdf":case"doc":case"docx":case"txt":return"document";case"jpg":case"jpeg":case"png":case"gif":case"svg":return"image";case"mp4":case"avi":case"mov":return d.value=!0,"video";case"mp3":case"wav":return"audio";case"zip":case"rar":case"7z":case"tar":case"gz":case"bz2":case"xz":return"zip";case"js":case"vue":case"py":case"java":return"code";default:return"unknown"}};return Ue(()=>{n.value=o(m.file.path)}),(r,x)=>(b(),C("div",{class:Y(["w-full h-full flex items-center justify-center overflow-hidden",{"bg-black flex-1":d.value}])},[e.file.type===0?(b(),C("img",{key:0,src:j(Vt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,Qt)):(b(),C(H,{key:1},[n.value==="image"?(b(),C("img",{key:0,src:j(Ie)+e.file.full_path,alt:"file preview",class:"w-full object-cover p-2"},null,8,Ht)):R("",!0),n.value==="audio"?(b(),C("img",{key:1,src:j(Tt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,Jt)):R("",!0),n.value==="video"&&!e.file.preview?(b(),C("img",{key:2,src:j(Wt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,Kt)):R("",!0),n.value==="video"&&e.file.preview?(b(),C("div",Xt,[h("img",{src:j(nt)+e.file.preview,alt:"video preview",class:"w-full h-full object-cover"},null,8,Yt),h("img",{src:j(Ie)+e.file.preview,alt:"video preview",class:"w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"},null,8,es),x[0]||(x[0]=Ke('<div class="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300"><div class="w-12 h-12 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white filter drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div>',1))])):R("",!0),n.value==="document"?(b(),C("img",{key:4,src:j(Bt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,ts)):R("",!0),n.value==="code"?(b(),C("img",{key:5,src:j(Gt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,ss)):R("",!0),n.value==="zip"?(b(),C("img",{key:6,src:j(qt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,ns)):R("",!0),n.value==="unknown"?(b(),C("img",{key:7,src:j(Zt),alt:"file preview",class:"w-auto h-full object-cover p-2"},null,8,is)):R("",!0)],64))],2))}},rs={class:"w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"},ls={class:"absolute top-2 right-2 z-10"},as=["onClick"],us={class:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs"},cs={key:0,class:"text-center"},ds={__name:"ViewModePreview",props:{fileList:{type:Array,required:!0}},emits:["folderClick","triggerFileUpload","updateSelectedFiles"],setup(e,{emit:m}){const n=m,d=A([]),g=(x,y)=>{if(y)d.value.push(x);else{const v=d.value.indexOf(x);v>-1&&d.value.splice(v,1)}console.log("selectedFiles",d.value),n("updateSelectedFiles",d.value)},o=()=>{n("triggerFileUpload")},r=(x,y,v)=>{n("folderClick",x,y,v)};return(x,y)=>{const v=U("a-checkbox"),t=U("NvaTextScroll");return b(),C("div",rs,[(b(!0),C(H,null,re(e.fileList,l=>(b(),C("div",{key:l.id,class:"relative border rounded cursor-pointer active:opacity-50",style:{"aspect-ratio":"16/9"}},[h("div",ls,[_(v,{"model-value":d.value.includes(l.id),onChange:s=>g(l.id,s)},null,8,["model-value","onChange"])]),h("div",{onClick:s=>r(l.type,l.full_path,l),class:"w-full h-full flex flex-col items-center justify-center"},[_(os,{file:l},null,8,["file"]),h("div",us,[_(t,{class:"truncate text-center"},{default:I(()=>[z(S(l.alias||l.path),1)]),_:2},1024),l.type===1&&!l.preview?(b(),C("div",cs,S(j(Mt)(l.file_size)),1)):R("",!0)])],8,as)]))),128)),h("div",{class:"flex flex-col items-center justify-center border rounded cursor-pointer active:opacity-50",onClick:o,style:{"aspect-ratio":"16/9"}},[_(j(Ee),{size:"24",class:"mb-2"}),y[0]||(y[0]=h("span",{class:"text-sm text-center break-words"},"上传",-1))])])}}},fs={class:"flex flex-row items-center justify-between mb-4 overflow-hidden"},ps={class:"flex flex-row items-center hidden sm:flex"},vs={key:2,class:"absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center"},hs={key:0,class:"text-center text-gray-500 py-4"},ms={class:"flex justify-between items-center mb-2"},gs={class:"text-sm font-medium text-gray-600"},ws={class:"text-xs text-gray-500"},ys={class:"w-full bg-gray-200 h-2 rounded-full overflow-hidden"},ks={class:"text-xs text-gray-500 mt-1 text-right"},xs={class:"text-sm text-gray-500 mb-4"},Is={__name:"FileList",setup(e){const m=st(),n=tt(),d=A([]),g=A(!1),o=A("/"),r=A(!1),x=A(!1),y=A(""),v=A(!1),t=A(null),l=A(!1),s=A(0),a=A(!1),L=A(null),k=W(()=>{const f=o.value.split("/").filter(Boolean);return f.map((u,E)=>({name:u,path:"/"+f.slice(0,E+1).join("/")}))}),i=f=>{m.push({query:{dir:encodeURIComponent(f)}})};Ue(()=>{const f=n.query.dir;f&&(o.value=decodeURIComponent(f)),w(o.value)}),Xe(()=>n.query.dir,f=>{f&&(o.value=decodeURIComponent(f),w(o.value))});const c=async()=>{console.log("handleSetPreviews",$.value);const f=d.value.filter(u=>$.value.includes(u.id)).map(u=>({url:De+u.full_path,name:u.path,id:u.id}));for(const u of f){const E=await Se(u.url),M=new File([E],`video_preview_${u.name}.gif`,{type:"image/gif"}),V=await fe(M,({progress:O,speed:Z})=>{console.log("上传进度:",O,"上传速度:",Z)},"/video_preview");await me({fileId:u.id,alias:u.name,previewUrl:V.url})}},p=async(f,u,E)=>{f===0?await m.push({query:{dir:encodeURIComponent(u)}}):(L.value=E,r.value=!0)},w=async f=>{g.value=!0;try{const u=await it({dir:f});d.value=u.data.data,o.value=f}catch(u){P.error("获取文件列表失败："+u.message)}finally{g.value=!1}},N=()=>{x.value=!0},D=async()=>{if(!/^[a-zA-Z0-9_-]+$/.test(y.value)){P.warning("文件夹名称只能包含字母、数字、下划线和横杠");return}g.value=!0;const f=await ot({dir:o.value,folder:y.value});f.data.success?(P.success("新建文件夹成功"),await w(o.value)):P.error(f.data.message),g.value=!1},B=f=>{f.preventDefault(),s.value++,s.value===1&&(v.value=!0)},G=f=>{f.preventDefault(),s.value--,s.value===0&&(v.value=!1)},ee=Fe({files:[]}),{files:T}=Ye(ee),te=f=>{T.value.push(Fe({name:f.name,size:f.size,status:"Pending",progress:0,speed:"0 KB/s"}))},q=(f,u,E)=>{f.progress=Math.round(u),f.speed=E+"MB/s",u===100?f.status="Completed":f.status="Uploading"},se=()=>{T.value=[]},J=async f=>{if(f.type.startsWith("video/")){const u=await Se(f),E=new File([u],`video_preview_${f.name}.gif`,{type:"image/gif"}),M=await fe(E,({progress:V,speed:O})=>{console.log("上传进度:",V,"上传速度:",O)},"/video_preview");return await Ae({url:M.url,fileSize:M.fileSize,dir:"/video_preview"}),M.url}else return null},Q=async f=>{l.value=!0;try{const u=Array.from(f);u.forEach(te);for(const E of u){const M=await J(E),V=T.value.find(Z=>Z.name===E.name);V.status="Uploading";const O=await fe(E,({progress:Z,speed:de})=>q(V,Z,de),o.value);O.url&&(await Ae({url:O.url,previewUrl:M,fileSize:O.fileSize,dir:o.value}),q(V,100,0))}P.success("Files uploaded successfully"),await w(o.value),setTimeout(se,2e3)}catch(u){P.error("Error uploading files"),console.error("Upload error:",u)}finally{l.value=!1}},K=f=>{f.preventDefault(),v.value=!1,s.value=0,Q(f.dataTransfer.files)},Ne=f=>{Q(f.target.files),f.target.value=""},ke=f=>{$.value=f},xe=()=>{t.value.click()},Pe=async({success:f,fileId:u})=>{f&&(r.value=!1,await w(o.value))},$=A([]),X=A(!1),$e=()=>{X.value=!0},Oe=async()=>{try{const f=$.value.join(",");g.value=!0,await je({fileIds:f}),P.success(`成功删除 ${$.value.length} 个文件/文件夹`),$.value=[],await w(o.value)}catch(f){P.error("批量删除失败："+f.message)}finally{X.value=!1}},ue=A(!1),ce=A(""),Re=f=>{L.value=f,ue.value=!0},Me=async()=>{g.value=!0,await me({path:o.value,alias:ce.value}),g.value=!1},Ve=async({fileId:f,newAlias:u})=>{await w(o.value)};return(f,u)=>{const E=U("NvaButton"),M=U("a-space"),V=U("TitleLine"),O=U("a-breadcrumb-item"),Z=U("a-breadcrumb"),de=U("a-switch"),Te=U("a-button"),We=U("a-spin"),be=U("NvaInput"),_e=U("NvaModal"),Be=U("a-modal");return b(),C(H,null,[_(V,{title:"File List"},{right:I(()=>[_(M,null,{default:I(()=>[_(E,{type:"primary",onClick:N},{default:I(()=>u[10]||(u[10]=[z("新建文件夹")])),_:1}),_(E,{type:"primary",danger:"",disabled:$.value.length===0,onClick:$e},{default:I(()=>[z(" 批量删除 ("+S($.value.length)+") ",1)]),_:1},8,["disabled"]),_(E,{type:"primary",danger:"",disabled:$.value.length===0,onClick:c},{default:I(()=>[z(" 批量设置封面("+S($.value.length)+") ",1)]),_:1},8,["disabled"])]),_:1})]),_:1}),_(We,{class:"w-full",loading:g.value||l.value},{default:I(()=>[_(Le,null,{default:I(()=>[h("div",fs,[_(Z,{class:"flex-1 min-w-0 max-w-[50%]"},{default:I(()=>[_(O,{onClick:u[0]||(u[0]=F=>i("/")),class:"truncate"},{default:I(()=>u[11]||(u[11]=[z("Root")])),_:1}),(b(!0),C(H,null,re(k.value,(F,Ge)=>(b(),oe(O,{key:Ge,onClick:bs=>i(F.path),class:"truncate"},{default:I(()=>[z(S(F.name),1)]),_:2},1032,["onClick"]))),128))]),_:1}),h("div",ps,[_(de,{modelValue:a.value,"onUpdate:modelValue":u[1]||(u[1]=F=>a.value=F),type:"line",size:"mini",class:"mr-4 flex-shrink-0"},{"checked-icon":I(()=>u[12]||(u[12]=[])),"unchecked-icon":I(()=>u[13]||(u[13]=[])),_:1},8,["modelValue"]),_(Te,{type:"primary",size:"mini",onClick:Re,class:"flex-shrink-0"},{default:I(()=>u[14]||(u[14]=[z("设置别名")])),_:1})])]),h("div",{class:"w-full",onDragenter:ne(B,["prevent"]),onDragover:u[2]||(u[2]=ne(()=>{},["prevent"])),onDragleave:ne(G,["prevent"]),onDrop:ne(K,["prevent"])},[a.value?(b(),oe(Rt,{key:0,"file-list":d.value,onFolderClick:p,onTriggerFileUpload:xe,onUpdateSelectedFiles:ke},null,8,["file-list"])):(b(),oe(ds,{key:1,"file-list":d.value,onFolderClick:p,onTriggerFileUpload:xe,onUpdateSelectedFiles:ke},null,8,["file-list"])),v.value?(b(),C("div",vs,u[15]||(u[15]=[h("p",{class:"text-white text-xl font-bold"},"Drop files here to upload",-1)]))):R("",!0)],32)]),_:1})]),_:1},8,["loading"]),_(Le,{class:"mt-6"},{default:I(()=>[u[16]||(u[16]=h("h3",{class:"text-lg font-semibold text-gray-700 mb-4"},"待上传文件列表",-1)),j(T).length===0?(b(),C("div",hs," 暂无待上传文件 ")):(b(!0),C(H,{key:1},re(j(T),F=>(b(),C("div",{key:F.name,class:"mb-4"},[h("div",ms,[h("span",gs,S(F.name),1),h("span",{class:Y(["text-xs font-semibold px-2 py-1 rounded-full",{"bg-blue-100 text-blue-800":F.status==="uploading","bg-green-100 text-green-800":F.status==="completed","bg-red-100 text-red-800":F.status==="error"}])},[z(S(F.status)+" ",1),h("span",ws,S(F.speed),1)],2)]),h("div",ys,[h("div",{class:"bg-blue-500 h-full transition-all duration-300 ease-in-out",style:ae({width:`${F.progress}%`})},null,4)]),h("div",ks,S(F.progress)+"% ",1)]))),128))]),_:1}),h("input",{type:"file",ref_key:"fileInput",ref:t,onChange:Ne,style:{display:"none"},multiple:""},null,544),_(_e,{modelValue:x.value,"onUpdate:modelValue":u[4]||(u[4]=F=>x.value=F),title:"新建文件夹",onOk:D},{default:I(()=>[h("div",xs,"当前目录："+S(o.value),1),_(be,{modelValue:y.value,"onUpdate:modelValue":u[3]||(u[3]=F=>y.value=F),placeholder:"请输入文件夹名称"},null,8,["modelValue"])]),_:1},8,["modelValue"]),_(_e,{modelValue:ue.value,"onUpdate:modelValue":u[6]||(u[6]=F=>ue.value=F),title:"设置别名",onOk:Me},{default:I(()=>[_(be,{modelValue:ce.value,"onUpdate:modelValue":u[5]||(u[5]=F=>ce.value=F),placeholder:"请输入别名"},null,8,["modelValue"])]),_:1},8,["modelValue"]),_(et,{visible:r.value,"onUpdate:visible":u[7]||(u[7]=F=>r.value=F)},{default:I(()=>[_(Ut,{file:L.value,onFileDeleted:Pe,onAliasUpdated:Ve},null,8,["file"])]),_:1},8,["visible"]),_(Be,{visible:X.value,"onUpdate:visible":u[8]||(u[8]=F=>X.value=F),title:"确认批量删除",onOk:Oe,onCancel:u[9]||(u[9]=F=>X.value=!1)},{default:I(()=>[h("p",null,"确定要删除选中的 "+S($.value.length)+" 个文件/文件夹吗？此操作不可撤销。",1)]),_:1},8,["visible"])],64)}}};export{Is as default};