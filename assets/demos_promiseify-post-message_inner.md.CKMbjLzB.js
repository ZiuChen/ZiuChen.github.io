import{d,p as m,o as l,c as p,j as r,t as f,_,C as u,G as c,w as g}from"./chunks/framework.D__0zeO9.js";function k(){window.addEventListener("message",({data:n,type:a})=>{if(a==="message"){const{params:s,result:t}=n,e=`${s.namespace}.${s.action}_${s.id}`,o=i.get(e);o&&(o(t),i.delete(e))}})}const i=new Map;let w=0;function y(n){return new Promise(a=>{if(window.parent){const s=w++,t=`${n.namespace}.${String(n.action)}_${s}`;i.set(t,a),window.parent.postMessage({id:s,...n},"*")}})}const v={class:"inner"},C=d({__name:"Inner",setup(n){k();const a=m("");async function s(t){const e=await y({namespace:"user",action:"getUserToken",payload:{userId:t}});e&&(a.value=e)}return(t,e)=>(l(),p("div",v,[e[1]||(e[1]=r("h2",null,"Inner",-1)),r("button",{onClick:e[0]||(e[0]=o=>s("123456"))},"getUserToken: "+f(a.value),1)]))}}),$=_(C,[["__scopeId","data-v-cafa80a5"]]),M=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page","navbar":false,"sidebar":false,"aside":false,"footer":false,"outline":false},"headers":[],"relativePath":"demos/promiseify-post-message/inner.md","filePath":"demos/promiseify-post-message/inner.md","lastUpdated":1731851683000}'),b={name:"demos/promiseify-post-message/inner.md"},h=Object.assign(b,{setup(n){return(a,s)=>{const t=u("ClientOnly");return l(),p("div",null,[c(t,null,{default:g(()=>[c($)]),_:1})])}}});export{M as __pageData,h as default};
