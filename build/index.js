(()=>{var e={495:(e,t)=>{(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{NewfoldRuntime:()=>r});const n=window.wp.url,r={hasCapability:e=>!0===window.NewfoldRuntime?.capabilities[e],adminUrl:e=>window.NewfoldRuntime?.admin_url+e,createApiUrl:(e,t={})=>(0,n.addQueryArgs)(window.NewfoldRuntime?.base_url,{rest_route:e,...t}),get siteDetails(){return window.NewfoldRuntime?.site},get sdk(){return window.NewfoldRuntime?.sdk},get isWoo(){return window.NewfoldRuntime?.isWoocommerceActive},get isYithBooking(){return window.NewfoldRuntime?.isYithBookingActive},get ecommerce(){return window.NewfoldRuntime?.ecommerce},get plugin(){return window.NewfoldRuntime?.plugin},get wpversion(){return window.NewfoldRuntime?.wpversion},get siteTitle(){return window.NewfoldRuntime?.siteTitle},get currentTheme(){return window.NewfoldRuntime?.currentTheme}};var i=t;for(var l in o)i[l]=o[l];o.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})()},942:(e,t)=>{var o;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e="",t=0;t<arguments.length;t++){var o=arguments[t];o&&(e=l(e,i(o)))}return e}function i(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var o in e)n.call(e,o)&&e[o]&&(t=l(t,o));return t}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(r.default=r,e.exports=r):void 0===(o=function(){return r}.apply(t,[]))||(e.exports=o)}()}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";o.r(n),o.d(n,{FacebookConnectButton:()=>p,FacebookConnectPluginView:()=>w,facebookConnectHelper:()=>h,getFacebookUserProfileDetails:()=>c});const e=window.React,t=window.wp.components,r=window.wp.apiFetch;var i=o.n(r),l=o(495);const a={facebook_module:{base_url:"https://graph.facebook.com/v18.0",debug_token:"/debug_token",token_phrase:"secret_token_phrase"},wordpress:{access:l.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/hiive"),fb_token:l.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/get-token"),post_token:l.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/post-token"),facebook_details:l.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/details"),facebook_logout:l.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/logout")},cf_worker:{base_url:"https://hiive.cloud",login_screen:"https://hiive.cloud/workers/facebook-connect/",get_token:"https://hiive.cloud/workers/facebook-connect/get/token?hiive_token=",delete_token:"https://hiive.cloud/workers/facebook-connect/delete/token?hiive_token="}},c=()=>i()({url:a.wordpress.facebook_details}).then((e=>{if(e?.details?.error)throw{message:"failed to load the data",error:e?.details?.error};return e?.details})).catch((e=>{throw e})),s=e=>i()({url:`${a.wordpress.fb_token}`,data:e,method:"POST"}),d=window.wp.i18n;var u=o(942),f=o.n(u);const p=({className:o,children:n,showData:r,onConnect:l,onDisconnect:u,onFailure:p,onClick:w})=>{const[h,m]=(0,e.useState)(""),[g,b]=(0,e.useState)(!1),[k,v]=(0,e.useState)([]),[_,y]=(0,e.useState)(!1);function E(e){e.origin.search("https://hiive.cloud")<0||(y(!0),window.removeEventListener("message",E),s(e.data).then((e=>{S()})).catch((()=>y(!1))))}const S=()=>{c().then((e=>{"token not found!"!==e&&(b(!0),v(e),y(!1),"function"==typeof l&&l(e))})).catch((()=>i()({url:a.wordpress.access}).then((e=>{c().then((e=>{"token not found!"!==e&&(b(!0),v(e),"function"==typeof l&&l(e)),y(!1)})).catch((e=>{y(!1),"function"==typeof p&&p(e)})),m(e.token)})).catch((e=>{y(!1),"function"==typeof p&&p(e)}))))};return(0,e.useEffect)((()=>{!h&&i()({url:a.wordpress.access}).then((e=>{e.token&&m(e.token)})),S()}),[]),(0,e.createElement)("div",null,g?(0,e.createElement)("div",null,(0,e.createElement)(t.Button,{className:f()("nfd-facebook-button--connected",`${o}--connected`)},(0,d.__)("Connected","wp-module-facebook")),r&&(0,e.createElement)("div",null,k?.map((t=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)("ul",{style:{paddingTop:"20px"}},(0,e.createElement)("li",null,(0,e.createElement)("p",null,"Facebook ID: ",t?.User?.profile?.id)),(0,e.createElement)("li",null,(0,e.createElement)("p",null,"User Name: ",t?.User?.profile?.name)),(0,e.createElement)("li",null,(0,e.createElement)("p",null,"User Email: ",t?.User?.profile?.email)),(0,e.createElement)("li",null,(0,e.createElement)("p",null,"Profile pic:",t?.User?.profile?.picture?.data?.url))),(0,e.createElement)("img",{src:`https://graph.facebook.com/${t?.id}/picture?type=small`,height:t?.picture?.height,width:t?.picture?.width})))))):(0,e.createElement)(t.Button,{type:"submit",disabled:_,className:f()("nfd-facebook-button--connect",`${o}--connect`),onClick:()=>(window.open(`${a.cf_worker.login_screen}?token_hiive=${h}&redirect=${window.location.href}`,"ModalPopUp",`toolbar=no,scrollbars=no,location=no,width=${window.innerWidth/2+200},height=${window.innerHeight/2+200},top=200,left=200`),window.addEventListener("message",E,!1),void("function"==typeof w&&w()))},n,(0,d.__)("Connect Facebook","wp-module-facebook"),_&&(0,e.createElement)(t.Spinner,null)))},w=({fbLogin:o,loginInfo:n,getFbDetails:r})=>{const[l,c]=(0,e.useState)(!1);(0,e.useEffect)((()=>c(!1)),[]);return o&&(0,e.createElement)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingTop:"20px"}},(0,e.createElement)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"30px",width:"30px",fill:"#405795",viewBox:"0 0 24 24",style:{marginRight:"10px"}},(0,e.createElement)("path",{d:"M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"})),(0,e.createElement)("p",{style:{fontSize:"0.9rem",fontWeight:"600",paddingLeft:"15px"}},"Facebook -",(0,e.createElement)("span",{style:{fontWeight:"normal"}},n?.user?.profile?.email))),l?(0,e.createElement)(t.Spinner,null):(0,e.createElement)("button",{style:{color:"#286BDE"},onClick:()=>(async()=>{c(!0),await i()({url:a.wordpress.facebook_logout}).then((e=>e)).catch((e=>{throw{message:"failed to load the data",errorMsg:e}})).then((()=>{r()})),c(!1)})()},"Disconnect"))},h=async e=>{let t="",o=null,n=[];function r(t){t.origin.search(a.cf_worker.base_url)<0||(window.removeEventListener("message",r),s(t.data).then((()=>{e()})))}await i()({url:a.wordpress.access}).then((e=>{i()({url:`${a.wordpress.post_token}`,headers:{method:"GET","content-type":"application/json","Accept-Encoding":"gzip, deflate, br","Access-Control-Allow-Origin":"*"}}).then((e=>{var t;e.token&&(t=e.token,i()({url:a.wordpress.settings,method:"post",data:{fb_token:t}}).then((e=>e)).catch((e=>{console.error(e)})),o=e.token)})).catch((e=>{console.error(e)})),t=e.token})).catch((e=>{console.error(e)})),await i()({url:a.wordpress.fb_token,data:t,method:"post"}).then((async e=>{e?.fb_token?await c().then((t=>(o=e.fb_token,n=[t],n))):(window.open(`${a.cf_worker.login_screen}?token_hiive=${t}&redirect=${window.location.href}`,"ModalPopUp",`toolbar=no,scrollbars=no,location=no,width=${window.innerWidth/2+200},height=${window.innerHeight/2+200},top=200,left=200`),window.addEventListener("message",r,!1))}))}})();var r=exports;for(var i in n)r[i]=n[i];n.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();