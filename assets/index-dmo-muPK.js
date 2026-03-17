(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();function br(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var gt={exports:{}},je={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xt;function Sn(){if(Xt)return je;Xt=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function r(n,o,s){var a=null;if(s!==void 0&&(a=""+s),o.key!==void 0&&(a=""+o.key),"key"in o){s={};for(var f in o)f!=="key"&&(s[f]=o[f])}else s=o;return o=s.ref,{$$typeof:e,type:n,key:a,ref:o!==void 0?o:null,props:s}}return je.Fragment=t,je.jsx=r,je.jsxs=r,je}var Jt;function bn(){return Jt||(Jt=1,gt.exports=Sn()),gt.exports}var v=bn(),yt={exports:{}},b={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zt;function _n(){if(Zt)return b;Zt=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),a=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),c=Symbol.for("react.memo"),l=Symbol.for("react.lazy"),h=Symbol.for("react.activity"),g=Symbol.iterator;function x(i){return i===null||typeof i!="object"?null:(i=g&&i[g]||i["@@iterator"],typeof i=="function"?i:null)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,j={};function $(i,d,S){this.props=i,this.context=d,this.refs=j,this.updater=S||_}$.prototype.isReactComponent={},$.prototype.setState=function(i,d){if(typeof i!="object"&&typeof i!="function"&&i!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,i,d,"setState")},$.prototype.forceUpdate=function(i){this.updater.enqueueForceUpdate(this,i,"forceUpdate")};function M(){}M.prototype=$.prototype;function D(i,d,S){this.props=i,this.context=d,this.refs=j,this.updater=S||_}var m=D.prototype=new M;m.constructor=D,R(m,$.prototype),m.isPureReactComponent=!0;var A=Array.isArray;function E(){}var p={H:null,A:null,T:null,S:null},y=Object.prototype.hasOwnProperty;function B(i,d,S){var C=S.ref;return{$$typeof:e,type:i,key:d,ref:C!==void 0?C:null,props:S}}function V(i,d){return B(i.type,d,i.props)}function O(i){return typeof i=="object"&&i!==null&&i.$$typeof===e}function X(i){var d={"=":"=0",":":"=2"};return"$"+i.replace(/[=:]/g,function(S){return d[S]})}var J=/\/+/g;function ue(i,d){return typeof i=="object"&&i!==null&&i.key!=null?X(""+i.key):d.toString(36)}function Ee(i){switch(i.status){case"fulfilled":return i.value;case"rejected":throw i.reason;default:switch(typeof i.status=="string"?i.then(E,E):(i.status="pending",i.then(function(d){i.status==="pending"&&(i.status="fulfilled",i.value=d)},function(d){i.status==="pending"&&(i.status="rejected",i.reason=d)})),i.status){case"fulfilled":return i.value;case"rejected":throw i.reason}}throw i}function le(i,d,S,C,T){var I=typeof i;(I==="undefined"||I==="boolean")&&(i=null);var N=!1;if(i===null)N=!0;else switch(I){case"bigint":case"string":case"number":N=!0;break;case"object":switch(i.$$typeof){case e:case t:N=!0;break;case l:return N=i._init,le(N(i._payload),d,S,C,T)}}if(N)return T=T(i),N=C===""?"."+ue(i,0):C,A(T)?(S="",N!=null&&(S=N.replace(J,"$&/")+"/"),le(T,d,S,"",function(te){return te})):T!=null&&(O(T)&&(T=V(T,S+(T.key==null||i&&i.key===T.key?"":(""+T.key).replace(J,"$&/")+"/")+N)),d.push(T)),1;N=0;var q=C===""?".":C+":";if(A(i))for(var H=0;H<i.length;H++)C=i[H],I=q+ue(C,H),N+=le(C,d,S,I,T);else if(H=x(i),typeof H=="function")for(i=H.call(i),H=0;!(C=i.next()).done;)C=C.value,I=q+ue(C,H++),N+=le(C,d,S,I,T);else if(I==="object"){if(typeof i.then=="function")return le(Ee(i),d,S,C,T);throw d=String(i),Error("Objects are not valid as a React child (found: "+(d==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":d)+"). If you meant to render a collection of children, use an array instead.")}return N}function fe(i,d,S){if(i==null)return i;var C=[],T=0;return le(i,C,"","",function(I){return d.call(S,I,T++)}),C}function Ke(i){if(i._status===-1){var d=i._result;d=d(),d.then(function(S){(i._status===0||i._status===-1)&&(i._status=1,i._result=S)},function(S){(i._status===0||i._status===-1)&&(i._status=2,i._result=S)}),i._status===-1&&(i._status=0,i._result=d)}if(i._status===1)return i._result.default;throw i._result}var Q=typeof reportError=="function"?reportError:function(i){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var d=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof i=="object"&&i!==null&&typeof i.message=="string"?String(i.message):String(i),error:i});if(!window.dispatchEvent(d))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",i);return}console.error(i)},we={map:fe,forEach:function(i,d,S){fe(i,function(){d.apply(this,arguments)},S)},count:function(i){var d=0;return fe(i,function(){d++}),d},toArray:function(i){return fe(i,function(d){return d})||[]},only:function(i){if(!O(i))throw Error("React.Children.only expected to receive a single React element child.");return i}};return b.Activity=h,b.Children=we,b.Component=$,b.Fragment=r,b.Profiler=o,b.PureComponent=D,b.StrictMode=n,b.Suspense=u,b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=p,b.__COMPILER_RUNTIME={__proto__:null,c:function(i){return p.H.useMemoCache(i)}},b.cache=function(i){return function(){return i.apply(null,arguments)}},b.cacheSignal=function(){return null},b.cloneElement=function(i,d,S){if(i==null)throw Error("The argument must be a React element, but you passed "+i+".");var C=R({},i.props),T=i.key;if(d!=null)for(I in d.key!==void 0&&(T=""+d.key),d)!y.call(d,I)||I==="key"||I==="__self"||I==="__source"||I==="ref"&&d.ref===void 0||(C[I]=d[I]);var I=arguments.length-2;if(I===1)C.children=S;else if(1<I){for(var N=Array(I),q=0;q<I;q++)N[q]=arguments[q+2];C.children=N}return B(i.type,T,C)},b.createContext=function(i){return i={$$typeof:a,_currentValue:i,_currentValue2:i,_threadCount:0,Provider:null,Consumer:null},i.Provider=i,i.Consumer={$$typeof:s,_context:i},i},b.createElement=function(i,d,S){var C,T={},I=null;if(d!=null)for(C in d.key!==void 0&&(I=""+d.key),d)y.call(d,C)&&C!=="key"&&C!=="__self"&&C!=="__source"&&(T[C]=d[C]);var N=arguments.length-2;if(N===1)T.children=S;else if(1<N){for(var q=Array(N),H=0;H<N;H++)q[H]=arguments[H+2];T.children=q}if(i&&i.defaultProps)for(C in N=i.defaultProps,N)T[C]===void 0&&(T[C]=N[C]);return B(i,I,T)},b.createRef=function(){return{current:null}},b.forwardRef=function(i){return{$$typeof:f,render:i}},b.isValidElement=O,b.lazy=function(i){return{$$typeof:l,_payload:{_status:-1,_result:i},_init:Ke}},b.memo=function(i,d){return{$$typeof:c,type:i,compare:d===void 0?null:d}},b.startTransition=function(i){var d=p.T,S={};p.T=S;try{var C=i(),T=p.S;T!==null&&T(S,C),typeof C=="object"&&C!==null&&typeof C.then=="function"&&C.then(E,Q)}catch(I){Q(I)}finally{d!==null&&S.types!==null&&(d.types=S.types),p.T=d}},b.unstable_useCacheRefresh=function(){return p.H.useCacheRefresh()},b.use=function(i){return p.H.use(i)},b.useActionState=function(i,d,S){return p.H.useActionState(i,d,S)},b.useCallback=function(i,d){return p.H.useCallback(i,d)},b.useContext=function(i){return p.H.useContext(i)},b.useDebugValue=function(){},b.useDeferredValue=function(i,d){return p.H.useDeferredValue(i,d)},b.useEffect=function(i,d){return p.H.useEffect(i,d)},b.useEffectEvent=function(i){return p.H.useEffectEvent(i)},b.useId=function(){return p.H.useId()},b.useImperativeHandle=function(i,d,S){return p.H.useImperativeHandle(i,d,S)},b.useInsertionEffect=function(i,d){return p.H.useInsertionEffect(i,d)},b.useLayoutEffect=function(i,d){return p.H.useLayoutEffect(i,d)},b.useMemo=function(i,d){return p.H.useMemo(i,d)},b.useOptimistic=function(i,d){return p.H.useOptimistic(i,d)},b.useReducer=function(i,d,S){return p.H.useReducer(i,d,S)},b.useRef=function(i){return p.H.useRef(i)},b.useState=function(i){return p.H.useState(i)},b.useSyncExternalStore=function(i,d,S){return p.H.useSyncExternalStore(i,d,S)},b.useTransition=function(){return p.H.useTransition()},b.version="19.2.4",b}var Qt;function _r(){return Qt||(Qt=1,yt.exports=_n()),yt.exports}var k=_r();const z=br(k);var vt={exports:{}},W={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er;function En(){if(er)return W;er=1;var e=_r();function t(u){var c="https://react.dev/errors/"+u;if(1<arguments.length){c+="?args[]="+encodeURIComponent(arguments[1]);for(var l=2;l<arguments.length;l++)c+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+u+"; visit "+c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(){}var n={d:{f:r,r:function(){throw Error(t(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},o=Symbol.for("react.portal");function s(u,c,l){var h=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:h==null?null:""+h,children:u,containerInfo:c,implementation:l}}var a=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function f(u,c){if(u==="font")return"";if(typeof c=="string")return c==="use-credentials"?c:""}return W.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=n,W.createPortal=function(u,c){var l=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!c||c.nodeType!==1&&c.nodeType!==9&&c.nodeType!==11)throw Error(t(299));return s(u,c,null,l)},W.flushSync=function(u){var c=a.T,l=n.p;try{if(a.T=null,n.p=2,u)return u()}finally{a.T=c,n.p=l,n.d.f()}},W.preconnect=function(u,c){typeof u=="string"&&(c?(c=c.crossOrigin,c=typeof c=="string"?c==="use-credentials"?c:"":void 0):c=null,n.d.C(u,c))},W.prefetchDNS=function(u){typeof u=="string"&&n.d.D(u)},W.preinit=function(u,c){if(typeof u=="string"&&c&&typeof c.as=="string"){var l=c.as,h=f(l,c.crossOrigin),g=typeof c.integrity=="string"?c.integrity:void 0,x=typeof c.fetchPriority=="string"?c.fetchPriority:void 0;l==="style"?n.d.S(u,typeof c.precedence=="string"?c.precedence:void 0,{crossOrigin:h,integrity:g,fetchPriority:x}):l==="script"&&n.d.X(u,{crossOrigin:h,integrity:g,fetchPriority:x,nonce:typeof c.nonce=="string"?c.nonce:void 0})}},W.preinitModule=function(u,c){if(typeof u=="string")if(typeof c=="object"&&c!==null){if(c.as==null||c.as==="script"){var l=f(c.as,c.crossOrigin);n.d.M(u,{crossOrigin:l,integrity:typeof c.integrity=="string"?c.integrity:void 0,nonce:typeof c.nonce=="string"?c.nonce:void 0})}}else c==null&&n.d.M(u)},W.preload=function(u,c){if(typeof u=="string"&&typeof c=="object"&&c!==null&&typeof c.as=="string"){var l=c.as,h=f(l,c.crossOrigin);n.d.L(u,l,{crossOrigin:h,integrity:typeof c.integrity=="string"?c.integrity:void 0,nonce:typeof c.nonce=="string"?c.nonce:void 0,type:typeof c.type=="string"?c.type:void 0,fetchPriority:typeof c.fetchPriority=="string"?c.fetchPriority:void 0,referrerPolicy:typeof c.referrerPolicy=="string"?c.referrerPolicy:void 0,imageSrcSet:typeof c.imageSrcSet=="string"?c.imageSrcSet:void 0,imageSizes:typeof c.imageSizes=="string"?c.imageSizes:void 0,media:typeof c.media=="string"?c.media:void 0})}},W.preloadModule=function(u,c){if(typeof u=="string")if(c){var l=f(c.as,c.crossOrigin);n.d.m(u,{as:typeof c.as=="string"&&c.as!=="script"?c.as:void 0,crossOrigin:l,integrity:typeof c.integrity=="string"?c.integrity:void 0})}else n.d.m(u)},W.requestFormReset=function(u){n.d.r(u)},W.unstable_batchedUpdates=function(u,c){return u(c)},W.useFormState=function(u,c,l){return a.H.useFormState(u,c,l)},W.useFormStatus=function(){return a.H.useHostTransitionStatus()},W.version="19.2.4",W}var tr;function wn(){if(tr)return vt.exports;tr=1;function e(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}return e(),vt.exports=En(),vt.exports}var kn=wn();const Rn=br(kn),ce=class ce{static getBoxIndex(t,r){return Math.floor(t/3)*3+Math.floor(r/3)}static getNodeIndex(t,r){return t%3*3+r%3}static findCurrentBoxForCell(t,r){return this._boxPointer.find(({y:n,x:o})=>!!~n.indexOf(t)&&!!~o.indexOf(r))}static checkFinishedBoxes(t,r,n){const{y:o,x:s}=this.findCurrentBoxForCell(r,n);for(const a of o)for(const f of s)if(!t[a][f])return!1;return!0}constructor(t,r){this._maxFill=r,this._boxes=this.generateInitialBoxes(t)}setValue(t,r,n){this._boxes[ce.getBoxIndex(r,n)][ce.getNodeIndex(r,n)].value=t}resetValue(t,r){this._boxes[ce.getBoxIndex(t,r)][ce.getNodeIndex(t,r)].value=0}checkBox(t,r){const n=this._boxes[ce.getBoxIndex(t,r)];let o=0;for(let s=0;s<n.length;s++)if(n[s].value&&o++,o>this._maxFill)return!1;return!0}generateInitialBoxes(t){return ce._boxPointer.map(({y:r,x:n})=>{const o=[];for(const s of r)for(const a of n)o.push({y:s,x:a,value:t[s][a]});return o})}};ce._boxPointer=[{y:[0,1,2],x:[0,1,2]},{y:[0,1,2],x:[3,4,5]},{y:[0,1,2],x:[6,7,8]},{y:[3,4,5],x:[0,1,2]},{y:[3,4,5],x:[3,4,5]},{y:[3,4,5],x:[6,7,8]},{y:[6,7,8],x:[0,1,2]},{y:[6,7,8],x:[3,4,5]},{y:[6,7,8],x:[6,7,8]}];let rt=ce;const An=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],Tn=e=>e.map(t=>t.map(r=>r)),Er=(e,t)=>e.map((r,n)=>r.map((o,s)=>t.y===n&&t.x===s?t.value:o)),Ce=()=>An.map(e=>e.map(t=>t)),In=(e,t)=>e[t].every(r=>!!r),$n=(e,t)=>e.every(r=>!!r[t]),On=(e,t,r)=>In(e,t)||$n(e,r)||rt.checkFinishedBoxes(e,t,r),Nn=(e,t)=>{const{y:r}=e.reduce((o,s,a)=>{const f=s.reduce((u,c)=>c?u+1:u,0);return o.filled>f||f===9?o:{filled:f,y:a}},{filled:0,y:-1}),n=e[r].indexOf(0);return{y:r,x:n,value:t[r][n]}};var Xe=(e=>(e.SetBoard="SET_BOARD",e.SetInitialBoard="SET_INITIAL_BOARD",e.SetSolution="SET_SOLUTION",e))(Xe||{});const We=e=>({type:"SET_BOARD",payload:e}),wr=e=>({type:"SET_SOLUTION",payload:e}),kr=e=>({type:"SET_INITIAL_BOARD",payload:e}),Pn=(e,t)=>{switch(t.type){case Xe.SetBoard:return{...e,currentBoard:t.payload};case Xe.SetInitialBoard:return{...e,initialBoard:t.payload};case Xe.SetSolution:return{...e,solution:t.payload};default:return e}};var Rr=(e=>(e.SetGameStatus="SET_GAME_STATUS",e))(Rr||{});const Ge=e=>({type:"SET_GAME_STATUS",payload:e}),jn=(e,t)=>{switch(t.type){case Rr.SetGameStatus:return t.payload;default:return e}};var Et=(e=>(e.SetModalOpen="SET_MODAL_OPEN",e.SetModalComponent="SET_MODAL_COMPONENT",e))(Et||{});const at=e=>({type:"SET_MODAL_OPEN",payload:e}),ct=e=>({type:"SET_MODAL_COMPONENT",payload:e}),Mn=(e,t)=>{switch(t.type){case Et.SetModalOpen:return{...e,isOpen:t.payload};case Et.SetModalComponent:return{...e,component:t.payload};default:return e}};var Me=(e=>(e.SetClickedCell="SET_CLICKED_CELL",e.SetClickedCellValue="SET_CLICKED_CELL_VALUE",e.ResetClickedCell="RESET_CLICKED_CELL",e.SetClickedCellCoordinates="SET_CLICKED_CELL_COORDINATES",e))(Me||{});const Dn=e=>({type:"SET_CLICKED_CELL_VALUE",payload:e}),qe={type:"RESET_CLICKED_CELL"},ve=e=>({type:"SET_CLICKED_CELL",payload:e}),Ln=e=>({type:"SET_CLICKED_CELL_COORDINATES",payload:e});var K=(e=>(e.NotStarted="NOT_STARTED",e.InProgress="IN_PROGRESS",e.Failed="FAILED",e.Win="WIN",e))(K||{}),Ne=(e=>(e.DifficultyBlock="DifficultyBlock",e.WinBanner="WinBanner",e.Empty="empty",e))(Ne||{});const Bn={currentBoard:Ce(),initialBoard:Ce(),solution:Ce()},Hn={isOpen:!1,component:Ne.Empty},Fn=K.NotStarted,ut={x:-1,y:-1,value:0},Ar={cells:[],error:!1},Tr={count:5,currentHint:ut,error:!1},me={clickedCell:ut,boards:Bn,modal:Hn,gameStatus:Fn,history:Ar,hints:Tr},Gn=(e,t)=>{switch(t.type){case Me.ResetClickedCell:return ut;case Me.SetClickedCell:return t.payload;case Me.SetClickedCellValue:return{...e,value:t.payload};case Me.SetClickedCellCoordinates:return{...e,...t.payload};default:return e}};var De=(e=>(e.PushToHistory="PushToHistory",e.Undo="Undo",e.SetHistoryError="SetHistoryError",e.ResetHistory="ResetHistory",e))(De||{});const zn=e=>({type:"PushToHistory",payload:e}),Un={type:"Undo"},Dt={type:"ResetHistory"},Ir=e=>({type:"SetHistoryError",payload:e}),Yn=(e,t)=>{switch(t.type){case De.PushToHistory:return{...e,cells:e.cells.length<=4?[...e.cells,t.payload]:[...e.cells.slice(1),t.payload]};case De.Undo:return{...e,cells:e.cells.slice(0,e.cells.length-1)};case De.SetHistoryError:return{...e,error:t.payload};case De.ResetHistory:return Ar;default:return e}};var Ae=(e=>(e.DecrementHint="DecrementHint",e.SetHintError="SetHintError",e.SetCurrentHint="SetCurrentHint",e.ResetCurrentHint="ResetCurrentHint",e.ResetHints="ResetHints",e))(Ae||{});const Wn={type:"DecrementHint"},$r=e=>({type:"SetHintError",payload:e}),qn=e=>({type:"SetCurrentHint",payload:e}),Or={type:"ResetCurrentHint"},Lt={type:"ResetHints"},Kn=(e,t)=>{switch(t.type){case Ae.DecrementHint:return{...e,count:e.count-1};case Ae.SetHintError:return{...e,error:t.payload};case Ae.SetCurrentHint:return{...e,currentHint:t.payload};case Ae.ResetCurrentHint:return{...e,currentHint:ut};case Ae.ResetHints:return Tr;default:return e}},Vn=(e,t)=>({boards:Pn(e.boards,t),gameStatus:jn(e.gameStatus,t),modal:Mn(e.modal,t),history:Yn(e.history,t),hints:Kn(e.hints,t),clickedCell:Gn(e.clickedCell,t)}),Nr=k.createContext(()=>null),oe=()=>k.useContext(Nr),Pr=k.createContext(me.boards),jr=k.createContext(me.gameStatus),Mr=k.createContext(me.modal),Dr=k.createContext(me.history),Lr=k.createContext(me.hints),Br=k.createContext(me.clickedCell),Xn=k.createContext(me.generatorType),Bt=()=>k.useContext(Pr),Ht=()=>k.useContext(jr),Jn=()=>k.useContext(Mr),Zn=()=>k.useContext(Dr),Hr=()=>k.useContext(Lr),Ft=()=>k.useContext(Br),Fr=()=>Ht()!==K.NotStarted,Qn=()=>Ht()===K.Win,Gt=()=>Bt().currentBoard,eo=()=>Bt().initialBoard,to=({children:e})=>{const[t,r]=k.useReducer(Vn,me),n=k.useRef(t);n.current=t;const o=k.useCallback(l=>typeof l=="function"?l(r,n.current):r(l),[]),s=k.useMemo(()=>t.boards,[t.boards]),a=k.useMemo(()=>t.modal,[t.modal]),f=k.useMemo(()=>t.history,[t.history]),u=k.useMemo(()=>t.hints,[t.hints]),c=k.useMemo(()=>t.clickedCell,[t.clickedCell]);return v.jsx(Nr,{value:o,children:v.jsx(Pr,{value:s,children:v.jsx(jr,{value:t.gameStatus,children:v.jsx(Mr,{value:a,children:v.jsx(Dr,{value:f,children:v.jsx(Lr,{value:u,children:v.jsx(Br,{value:c,children:v.jsx(Xn,{value:t.generatorType,children:e})})})})})})})})};var U=function(){return U=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},U.apply(this,arguments)};function Te(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var L="-ms-",He="-moz-",P="-webkit-",Gr="comm",lt="rule",zt="decl",ro="@import",no="@namespace",zr="@keyframes",oo="@layer",Ur=Math.abs,Ut=String.fromCharCode,wt=Object.assign;function so(e,t){return G(e,0)^45?(((t<<2^G(e,0))<<2^G(e,1))<<2^G(e,2))<<2^G(e,3):0}function Yr(e){return e.trim()}function ie(e,t){return(e=t.exec(e))?e[0]:e}function w(e,t,r){return e.replace(t,r)}function Je(e,t,r){return e.indexOf(t,r)}function G(e,t){return e.charCodeAt(t)|0}function Se(e,t,r){return e.slice(t,r)}function re(e){return e.length}function Wr(e){return e.length}function Le(e,t){return t.push(e),e}function io(e,t){return e.map(t).join("")}function rr(e,t){return e.filter(function(r){return!ie(r,t)})}var ft=1,Ie=1,qr=0,ee=0,F=0,Pe="";function dt(e,t,r,n,o,s,a,f){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:ft,column:Ie,length:a,return:"",siblings:f}}function de(e,t){return wt(dt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Re(e){for(;e.root;)e=de(e.root,{children:[e]});Le(e,e.siblings)}function ao(){return F}function co(){return F=ee>0?G(Pe,--ee):0,Ie--,F===10&&(Ie=1,ft--),F}function ne(){return F=ee<qr?G(Pe,ee++):0,Ie++,F===10&&(Ie=1,ft++),F}function pe(){return G(Pe,ee)}function Ze(){return ee}function pt(e,t){return Se(Pe,e,t)}function ze(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function uo(e){return ft=Ie=1,qr=re(Pe=e),ee=0,[]}function lo(e){return Pe="",e}function xt(e){return Yr(pt(ee-1,kt(e===91?e+2:e===40?e+1:e)))}function fo(e){for(;(F=pe())&&F<33;)ne();return ze(e)>2||ze(F)>3?"":" "}function po(e,t){for(;--t&&ne()&&!(F<48||F>102||F>57&&F<65||F>70&&F<97););return pt(e,Ze()+(t<6&&pe()==32&&ne()==32))}function kt(e){for(;ne();)switch(F){case e:return ee;case 34:case 39:e!==34&&e!==39&&kt(F);break;case 40:e===41&&kt(e);break;case 92:ne();break}return ee}function ho(e,t){for(;ne()&&e+F!==57;)if(e+F===84&&pe()===47)break;return"/*"+pt(t,ee-1)+"*"+Ut(e===47?e:ne())}function mo(e){for(;!ze(pe());)ne();return pt(e,ee)}function go(e){return lo(Qe("",null,null,null,[""],e=uo(e),0,[0],e))}function Qe(e,t,r,n,o,s,a,f,u){for(var c=0,l=0,h=a,g=0,x=0,_=0,R=1,j=1,$=1,M=0,D="",m=o,A=s,E=n,p=D;j;)switch(_=M,M=ne()){case 40:if(_!=108&&G(p,h-1)==58){Je(p+=w(xt(M),"&","&\f"),"&\f",Ur(c?f[c-1]:0))!=-1&&($=-1);break}case 34:case 39:case 91:p+=xt(M);break;case 9:case 10:case 13:case 32:p+=fo(_);break;case 92:p+=po(Ze()-1,7);continue;case 47:switch(pe()){case 42:case 47:Le(yo(ho(ne(),Ze()),t,r,u),u),(ze(_||1)==5||ze(pe()||1)==5)&&re(p)&&Se(p,-1,void 0)!==" "&&(p+=" ");break;default:p+="/"}break;case 123*R:f[c++]=re(p)*$;case 125*R:case 59:case 0:switch(M){case 0:case 125:j=0;case 59+l:$==-1&&(p=w(p,/\f/g,"")),x>0&&(re(p)-h||R===0&&_===47)&&Le(x>32?or(p+";",n,r,h-1,u):or(w(p," ","")+";",n,r,h-2,u),u);break;case 59:p+=";";default:if(Le(E=nr(p,t,r,c,l,o,f,D,m=[],A=[],h,s),s),M===123)if(l===0)Qe(p,t,E,E,m,s,h,f,A);else{switch(g){case 99:if(G(p,3)===110)break;case 108:if(G(p,2)===97)break;default:l=0;case 100:case 109:case 115:}l?Qe(e,E,E,n&&Le(nr(e,E,E,0,0,o,f,D,o,m=[],h,A),A),o,A,h,f,n?m:A):Qe(p,E,E,E,[""],A,0,f,A)}}c=l=x=0,R=$=1,D=p="",h=a;break;case 58:h=1+re(p),x=_;default:if(R<1){if(M==123)--R;else if(M==125&&R++==0&&co()==125)continue}switch(p+=Ut(M),M*R){case 38:$=l>0?1:(p+="\f",-1);break;case 44:f[c++]=(re(p)-1)*$,$=1;break;case 64:pe()===45&&(p+=xt(ne())),g=pe(),l=h=re(D=p+=mo(Ze())),M++;break;case 45:_===45&&re(p)==2&&(R=0)}}return s}function nr(e,t,r,n,o,s,a,f,u,c,l,h){for(var g=o-1,x=o===0?s:[""],_=Wr(x),R=0,j=0,$=0;R<n;++R)for(var M=0,D=Se(e,g+1,g=Ur(j=a[R])),m=e;M<_;++M)(m=Yr(j>0?x[M]+" "+D:w(D,/&\f/g,x[M])))&&(u[$++]=m);return dt(e,t,r,o===0?lt:f,u,c,l,h)}function yo(e,t,r,n){return dt(e,t,r,Gr,Ut(ao()),Se(e,2,-2),0,n)}function or(e,t,r,n,o){return dt(e,t,r,zt,Se(e,0,n),Se(e,n+1,-1),n,o)}function Kr(e,t,r){switch(so(e,t)){case 5103:return P+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return P+e+e;case 4855:return P+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return He+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return P+e+He+e+L+e+e;case 5936:switch(G(e,t+11)){case 114:return P+e+L+w(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return P+e+L+w(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return P+e+L+w(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return P+e+L+e+e;case 6165:return P+e+L+"flex-"+e+e;case 5187:return P+e+w(e,/(\w+).+(:[^]+)/,P+"box-$1$2"+L+"flex-$1$2")+e;case 5443:return P+e+L+"flex-item-"+w(e,/flex-|-self/g,"")+(ie(e,/flex-|baseline/)?"":L+"grid-row-"+w(e,/flex-|-self/g,""))+e;case 4675:return P+e+L+"flex-line-pack"+w(e,/align-content|flex-|-self/g,"")+e;case 5548:return P+e+L+w(e,"shrink","negative")+e;case 5292:return P+e+L+w(e,"basis","preferred-size")+e;case 6060:return P+"box-"+w(e,"-grow","")+P+e+L+w(e,"grow","positive")+e;case 4554:return P+w(e,/([^-])(transform)/g,"$1"+P+"$2")+e;case 6187:return w(w(w(e,/(zoom-|grab)/,P+"$1"),/(image-set)/,P+"$1"),e,"")+e;case 5495:case 3959:return w(e,/(image-set\([^]*)/,P+"$1$`$1");case 4968:return w(w(e,/(.+:)(flex-)?(.*)/,P+"box-pack:$3"+L+"flex-pack:$3"),/space-between/,"justify")+P+e+e;case 4200:if(!ie(e,/flex-|baseline/))return L+"grid-column-align"+Se(e,t)+e;break;case 2592:case 3360:return L+w(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,ie(n.props,/grid-\w+-end/)})?~Je(e+(r=r[t].value),"span",0)?e:L+w(e,"-start","")+e+L+"grid-row-span:"+(~Je(r,"span",0)?ie(r,/\d+/):+ie(r,/\d+/)-+ie(e,/\d+/))+";":L+w(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return ie(n.props,/grid-\w+-start/)})?e:L+w(w(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return w(e,/(.+)-inline(.+)/,P+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(re(e)-1-t>6)switch(G(e,t+1)){case 109:if(G(e,t+4)!==45)break;case 102:return w(e,/(.+:)(.+)-([^]+)/,"$1"+P+"$2-$3$1"+He+(G(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Je(e,"stretch",0)?Kr(w(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return w(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,a,f,u,c){return L+o+":"+s+c+(a?L+o+"-span:"+(f?u:+u-+s)+c:"")+e});case 4949:if(G(e,t+6)===121)return w(e,":",":"+P)+e;break;case 6444:switch(G(e,G(e,14)===45?18:11)){case 120:return w(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+P+(G(e,14)===45?"inline-":"")+"box$3$1"+P+"$2$3$1"+L+"$2box$3")+e;case 100:return w(e,":",":"+L)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return w(e,"scroll-","scroll-snap-")+e}return e}function nt(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function vo(e,t,r,n){switch(e.type){case oo:if(e.children.length)break;case ro:case no:case zt:return e.return=e.return||e.value;case Gr:return"";case zr:return e.return=e.value+"{"+nt(e.children,n)+"}";case lt:if(!re(e.value=e.props.join(",")))return""}return re(r=nt(e.children,n))?e.return=e.value+"{"+r+"}":""}function xo(e){var t=Wr(e);return function(r,n,o,s){for(var a="",f=0;f<t;f++)a+=e[f](r,n,o,s)||"";return a}}function Co(e){return function(t){t.root||(t=t.return)&&e(t)}}function So(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case zt:e.return=Kr(e.value,e.length,r);return;case zr:return nt([de(e,{value:w(e.value,"@","@"+P)})],n);case lt:if(e.length)return io(r=e.props,function(o){switch(ie(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Re(de(e,{props:[w(o,/:(read-\w+)/,":"+He+"$1")]})),Re(de(e,{props:[o]})),wt(e,{props:rr(r,n)});break;case"::placeholder":Re(de(e,{props:[w(o,/:(plac\w+)/,":"+P+"input-$1")]})),Re(de(e,{props:[w(o,/:(plac\w+)/,":"+He+"$1")]})),Re(de(e,{props:[w(o,/:(plac\w+)/,L+"input-$1")]})),Re(de(e,{props:[o]})),wt(e,{props:rr(r,n)});break}return""})}}var bo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Z={},$e=typeof process<"u"&&Z!==void 0&&(Z.REACT_APP_SC_ATTR||Z.SC_ATTR)||"data-styled",Vr="active",Xr="data-styled-version",ht="6.3.11",Yt=`/*!sc*/
`,Fe=typeof window<"u"&&typeof document<"u",_o=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Z!==void 0&&Z.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Z.REACT_APP_SC_DISABLE_SPEEDY!==""?Z.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Z.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Z!==void 0&&Z.SC_DISABLE_SPEEDY!==void 0&&Z.SC_DISABLE_SPEEDY!==""&&Z.SC_DISABLE_SPEEDY!=="false"&&Z.SC_DISABLE_SPEEDY),Eo={};function be(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var et=new Map,ot=new Map,tt=1,Be=function(e){if(et.has(e))return et.get(e);for(;ot.has(tt);)tt++;var t=tt++;return et.set(e,t),ot.set(t,e),t},wo=function(e,t){tt=t+1,et.set(e,t),ot.set(t,e)},Wt=Object.freeze([]),Oe=Object.freeze({});function Jr(e,t,r){return r===void 0&&(r=Oe),e.theme!==r.theme&&e.theme||t||r.theme}var Zr=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),ko=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ro=/(^-|-$)/g;function sr(e){return e.replace(ko,"-").replace(Ro,"")}var Ao=/(a)(d)/gi,ir=function(e){return String.fromCharCode(e+(e>25?39:97))};function Rt(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=ir(t%52)+r;return(ir(t%52)+r).replace(Ao,"$1-$2")}var Ct,ge=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Qr=function(e){return ge(5381,e)};function qt(e){return Rt(Qr(e)>>>0)}function To(e){return e.displayName||e.name||"Component"}function St(e){return typeof e=="string"&&!0}var en=typeof Symbol=="function"&&Symbol.for,tn=en?Symbol.for("react.memo"):60115,Io=en?Symbol.for("react.forward_ref"):60112,$o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Oo={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},rn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},No=((Ct={})[Io]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ct[tn]=rn,Ct);function ar(e){return("type"in(t=e)&&t.type.$$typeof)===tn?rn:"$$typeof"in e?No[e.$$typeof]:$o;var t}var Po=Object.defineProperty,jo=Object.getOwnPropertyNames,cr=Object.getOwnPropertySymbols,Mo=Object.getOwnPropertyDescriptor,Do=Object.getPrototypeOf,ur=Object.prototype;function nn(e,t,r){if(typeof t!="string"){if(ur){var n=Do(t);n&&n!==ur&&nn(e,n,r)}var o=jo(t);cr&&(o=o.concat(cr(t)));for(var s=ar(e),a=ar(t),f=0;f<o.length;++f){var u=o[f];if(!(u in Oo||r&&r[u]||a&&u in a||s&&u in s)){var c=Mo(t,u);try{Po(e,u,c)}catch{}}}}return e}function _e(e){return typeof e=="function"}function Kt(e){return typeof e=="object"&&"styledComponentId"in e}function xe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function st(e,t){return e.join("")}function Ue(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function At(e,t,r){if(r===void 0&&(r=!1),!r&&!Ue(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=At(e[n],t[n]);else if(Ue(t))for(var n in t)e[n]=At(e[n],t[n]);return e}function Vt(e,t){Object.defineProperty(e,"toString",{value:t})}var Lo=(function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(t){if(t===this._cGroup)return this._cIndex;var r=this._cIndex;if(t>this._cGroup)for(var n=this._cGroup;n<t;n++)r+=this.groupSizes[n];else for(n=this._cGroup-1;n>=t;n--)r-=this.groupSizes[n];return this._cGroup=t,this._cIndex=r,r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw be(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var f=this.indexOfGroup(t+1),u=0,c=(a=0,r.length);a<c;a++)this.tag.insertRule(f,r[a])&&(this.groupSizes[t]++,f++,u++);u>0&&this._cGroup>t&&(this._cIndex+=u)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n);r>0&&this._cGroup>t&&(this._cIndex-=r)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,a=o;a<s;a++)r+=this.tag.getRule(a)+Yt;return r},e})(),Bo="style[".concat($e,"][").concat(Xr,'="').concat(ht,'"]'),Ho=new RegExp("^".concat($e,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),lr=function(e){return typeof ShadowRoot<"u"&&e instanceof ShadowRoot||"host"in e&&e.nodeType===11},Tt=function(e){if(!e)return document;if(lr(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(lr(t))return t}return document},Fo=function(e,t,r){for(var n,o=r.split(","),s=0,a=o.length;s<a;s++)(n=o[s])&&e.registerName(t,n)},Go=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Yt),o=[],s=0,a=n.length;s<a;s++){var f=n[s].trim();if(f){var u=f.match(Ho);if(u){var c=0|parseInt(u[1],10),l=u[2];c!==0&&(wo(l,c),Fo(e,l,u[3]),e.getTag().insertRules(c,o)),o.length=0}else o.push(f)}}},bt=function(e){for(var t=Tt(e.options.target).querySelectorAll(Bo),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute($e)!==Vr&&(Go(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function zo(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var on=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=(function(f){var u=Array.from(f.querySelectorAll("style[".concat($e,"]")));return u[u.length-1]})(r),s=o!==void 0?o.nextSibling:null;n.setAttribute($e,Vr),n.setAttribute(Xr,ht);var a=zo();return a&&n.setAttribute("nonce",a),r.insertBefore(n,s),n},Uo=(function(){function e(t){this.element=on(t),this.element.appendChild(document.createTextNode("")),this.sheet=(function(r){var n;if(r.sheet)return r.sheet;for(var o=(n=r.getRootNode().styleSheets)!==null&&n!==void 0?n:document.styleSheets,s=0,a=o.length;s<a;s++){var f=o[s];if(f.ownerNode===r)return f}throw be(17)})(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e})(),Yo=(function(){function e(t){this.element=on(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e})(),Wo=(function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(t===this.length?this.rules.push(r):this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e})(),fr=Fe,qo={isServer:!Fe,useCSSOMInjection:!_o},it=(function(){function e(t,r,n){t===void 0&&(t=Oe),r===void 0&&(r={});var o=this;this.options=U(U({},qo),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Fe&&fr&&(fr=!1,bt(this)),Vt(this,function(){return(function(s){for(var a=s.getTag(),f=a.length,u="",c=function(h){var g=(function($){return ot.get($)})(h);if(g===void 0)return"continue";var x=s.names.get(g);if(x===void 0||!x.size)return"continue";var _=a.getGroup(h);if(_.length===0)return"continue";var R=$e+".g"+h+'[id="'+g+'"]',j="";x.forEach(function($){$.length>0&&(j+=$+",")}),u+=_+R+'{content:"'+j+'"}'+Yt},l=0;l<f;l++)c(l);return u})(o)})}return e.registerId=function(t){return Be(t)},e.prototype.rehydrate=function(){!this.server&&Fe&&bt(this)},e.prototype.reconstructWithOptions=function(t,r){r===void 0&&(r=!0);var n=new e(U(U({},this.options),t),this.gs,r&&this.names||void 0);return!this.server&&Fe&&t.target!==this.options.target&&Tt(this.options.target)!==Tt(t.target)&&bt(n),n},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=(function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Wo(o):n?new Uo(o):new Yo(o)})(this.options),new Lo(t)));var t},e.prototype.hasNameForId=function(t,r){var n,o;return(o=(n=this.names.get(t))===null||n===void 0?void 0:n.has(r))!==null&&o!==void 0&&o},e.prototype.registerName=function(t,r){Be(t);var n=this.names.get(t);n?n.add(r):this.names.set(t,new Set([r]))},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Be(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Be(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e})(),Ko=/&/g,ae=47,ye=42;function dr(e){if(e.indexOf("}")===-1)return!1;for(var t=e.length,r=0,n=0,o=!1,s=0;s<t;s++){var a=e.charCodeAt(s);if(n!==0||o||a!==ae||e.charCodeAt(s+1)!==ye)if(o)a===ye&&e.charCodeAt(s+1)===ae&&(o=!1,s++);else if(a!==34&&a!==39||s!==0&&e.charCodeAt(s-1)===92){if(n===0){if(a===123)r++;else if(a===125&&--r<0)return!0}}else n===0?n=a:n===a&&(n=0);else o=!0,s++}return r!==0||n!==0}function sn(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=sn(r.children,t)),r})}function Vo(e){var t,r,n,o=Oe,s=o.options,a=s===void 0?Oe:s,f=o.plugins,u=f===void 0?Wt:f,c=function(_,R,j){return j.startsWith(r)&&j.endsWith(r)&&j.replaceAll(r,"").length>0?".".concat(t):_},l=u.slice();l.push(function(_){_.type===lt&&_.value.includes("&")&&(n||(n=new RegExp("\\".concat(r,"\\b"),"g")),_.props[0]=_.props[0].replace(Ko,r).replace(n,c))}),a.prefix&&l.push(So),l.push(vo);var h=[],g=xo(l.concat(Co(function(_){return h.push(_)}))),x=function(_,R,j,$){R===void 0&&(R=""),j===void 0&&(j=""),$===void 0&&($="&"),t=$,r=R,n=void 0;var M=(function(m){if(!dr(m))return m;for(var A=m.length,E="",p=0,y=0,B=0,V=!1,O=0;O<A;O++){var X=m.charCodeAt(O);if(B!==0||V||X!==ae||m.charCodeAt(O+1)!==ye)if(V)X===ye&&m.charCodeAt(O+1)===ae&&(V=!1,O++);else if(X!==34&&X!==39||O!==0&&m.charCodeAt(O-1)===92){if(B===0)if(X===123)y++;else if(X===125){if(--y<0){for(var J=O+1;J<A;){var ue=m.charCodeAt(J);if(ue===59||ue===10)break;J++}J<A&&m.charCodeAt(J)===59&&J++,y=0,O=J-1,p=J;continue}y===0&&(E+=m.substring(p,O+1),p=O+1)}else X===59&&y===0&&(E+=m.substring(p,O+1),p=O+1)}else B===0?B=X:B===X&&(B=0);else V=!0,O++}if(p<A){var Ee=m.substring(p);dr(Ee)||(E+=Ee)}return E})((function(m){if(m.indexOf("//")===-1)return m;for(var A=m.length,E=[],p=0,y=0,B=0,V=0;y<A;){var O=m.charCodeAt(y);if(O!==34&&O!==39||y!==0&&m.charCodeAt(y-1)===92)if(B===0)if(O===ae&&y+1<A&&m.charCodeAt(y+1)===ye){for(y+=2;y+1<A&&(m.charCodeAt(y)!==ye||m.charCodeAt(y+1)!==ae);)y++;y+=2}else if(O===40&&y>=3&&(32|m.charCodeAt(y-1))==108&&(32|m.charCodeAt(y-2))==114&&(32|m.charCodeAt(y-3))==117)V=1,y++;else if(V>0)O===41?V--:O===40&&V++,y++;else if(O===ye&&y+1<A&&m.charCodeAt(y+1)===ae)y>p&&E.push(m.substring(p,y)),p=y+=2;else if(O===ae&&y+1<A&&m.charCodeAt(y+1)===ae){for(y>p&&E.push(m.substring(p,y));y<A&&m.charCodeAt(y)!==10;)y++;p=y}else y++;else y++;else B===0?B=O:B===O&&(B=0),y++}return p===0?m:(p<A&&E.push(m.substring(p)),E.join(""))})(_)),D=go(j||R?"".concat(j," ").concat(R," { ").concat(M," }"):M);return a.namespace&&(D=sn(D,a.namespace)),h=[],nt(D,g),h};return x.hash=u.length?u.reduce(function(_,R){return R.name||be(15),ge(_,R.name)},5381).toString():"",x}var Xo=new it,It=Vo(),an=z.createContext({shouldForwardProp:void 0,styleSheet:Xo,stylis:It});an.Consumer;z.createContext(void 0);function $t(){return z.useContext(an)}var cn=(function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=It);var a=n.name+s.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,s(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Vt(this,function(){throw be(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=It),this.name+t.hash},e})();function Jo(e,t){return t==null||typeof t=="boolean"||t===""?"":typeof t!="number"||t===0||e in bo||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Zo=function(e){return e>="A"&&e<="Z"};function pr(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Zo(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var un=function(e){return e==null||e===!1||e===""},ln=function(e){var t=[];for(var r in e){var n=e[r];e.hasOwnProperty(r)&&!un(n)&&(Array.isArray(n)&&n.isCss||_e(n)?t.push("".concat(pr(r),":"),n,";"):Ue(n)?t.push.apply(t,Te(Te(["".concat(r," {")],ln(n),!1),["}"],!1)):t.push("".concat(pr(r),": ").concat(Jo(r,n),";")))}return t};function he(e,t,r,n,o){if(o===void 0&&(o=[]),typeof e=="string")return e&&o.push(e),o;if(un(e))return o;if(Kt(e))return o.push(".".concat(e.styledComponentId)),o;if(_e(e)){if(!_e(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return o.push(e),o;var s=e(t);return he(s,t,r,n,o)}var a;if(e instanceof cn)return r?(e.inject(r,n),o.push(e.getName(n))):o.push(e),o;if(Ue(e)){for(var f=ln(e),u=0;u<f.length;u++)o.push(f[u]);return o}if(!Array.isArray(e))return o.push(e.toString()),o;for(u=0;u<e.length;u++)he(e[u],t,r,n,o);return o}function fn(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(_e(r)&&!Kt(r))return!1}return!0}var Qo=Qr(ht),es=(function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&fn(t),this.componentId=r,this.baseHash=ge(Qo,r),this.baseStyle=n,it.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=xe(o,this.staticRulesId);else{var s=st(he(this.rules,t,r,n)),a=Rt(ge(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var f=n(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,f)}o=xe(o,a),this.staticRulesId=a}else{for(var u=ge(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var h=this.rules[l];if(typeof h=="string")c+=h;else if(h){var g=st(he(h,t,r,n));u=ge(ge(u,String(l)),g),c+=g}}if(c){var x=Rt(u>>>0);if(!r.hasNameForId(this.componentId,x)){var _=n(c,".".concat(x),void 0,this.componentId);r.insertRules(this.componentId,x,_)}o=xe(o,x)}}return{className:o,css:typeof window>"u"?r.getTag().getGroup(Be(this.componentId)):""}},e})(),Ye=z.createContext(void 0);Ye.Consumer;function ts(e){var t=z.useContext(Ye),r=z.useMemo(function(){return(function(n,o){if(!n)throw be(14);if(_e(n)){var s=n(o);return s}if(Array.isArray(n)||typeof n!="object")throw be(8);return o?U(U({},o),n):n})(e.theme,t)},[e.theme,t]);return e.children?z.createElement(Ye.Provider,{value:r},e.children):null}var _t={};function rs(e,t,r){var n=Kt(e),o=e,s=!St(e),a=t.attrs,f=a===void 0?Wt:a,u=t.componentId,c=u===void 0?(function(m,A){var E=typeof m!="string"?"sc":sr(m);_t[E]=(_t[E]||0)+1;var p="".concat(E,"-").concat(qt(ht+E+_t[E]));return A?"".concat(A,"-").concat(p):p})(t.displayName,t.parentComponentId):u,l=t.displayName,h=l===void 0?(function(m){return St(m)?"styled.".concat(m):"Styled(".concat(To(m),")")})(e):l,g=t.displayName&&t.componentId?"".concat(sr(t.displayName),"-").concat(t.componentId):t.componentId||c,x=n&&o.attrs?o.attrs.concat(f).filter(Boolean):f,_=t.shouldForwardProp;if(n&&o.shouldForwardProp){var R=o.shouldForwardProp;if(t.shouldForwardProp){var j=t.shouldForwardProp;_=function(m,A){return R(m,A)&&j(m,A)}}else _=R}var $=new es(r,g,n?o.componentStyle:void 0);function M(m,A){return(function(E,p,y){var B=E.attrs,V=E.componentStyle,O=E.defaultProps,X=E.foldedComponentIds,J=E.styledComponentId,ue=E.target,Ee=z.useContext(Ye),le=$t(),fe=E.shouldForwardProp||le.shouldForwardProp,Ke=Jr(p,Ee,O)||Oe,Q=(function(I,N,q){for(var H,te=U(U({},N),{className:void 0,theme:q}),mt=0;mt<I.length;mt+=1){var Ve=_e(H=I[mt])?H(te):H;for(var ke in Ve)ke==="className"?te.className=xe(te.className,Ve[ke]):ke==="style"?te.style=U(U({},te.style),Ve[ke]):te[ke]=Ve[ke]}return"className"in N&&typeof N.className=="string"&&(te.className=xe(te.className,N.className)),te})(B,p,Ke),we=Q.as||ue,i={};for(var d in Q)Q[d]===void 0||d[0]==="$"||d==="as"||d==="theme"&&Q.theme===Ke||(d==="forwardedAs"?i.as=Q.forwardedAs:fe&&!fe(d,we)||(i[d]=Q[d]));var S=(function(I,N){var q=$t(),H=I.generateAndInjectStyles(N,q.styleSheet,q.stylis);return H})(V,Q),C=S.className,T=xe(X,J);return C&&(T+=" "+C),Q.className&&(T+=" "+Q.className),i[St(we)&&!Zr.has(we)?"class":"className"]=T,y&&(i.ref=y),k.createElement(we,i)})(D,m,A)}M.displayName=h;var D=z.forwardRef(M);return D.attrs=x,D.componentStyle=$,D.displayName=h,D.shouldForwardProp=_,D.foldedComponentIds=n?xe(o.foldedComponentIds,o.styledComponentId):"",D.styledComponentId=g,D.target=n?o.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(m){this._foldedDefaultProps=n?(function(A){for(var E=[],p=1;p<arguments.length;p++)E[p-1]=arguments[p];for(var y=0,B=E;y<B.length;y++)At(A,B[y],!0);return A})({},o.defaultProps,m):m}}),Vt(D,function(){return".".concat(D.styledComponentId)}),s&&nn(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function hr(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var mr=function(e){return Object.assign(e,{isCss:!0})};function se(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(_e(e)||Ue(e))return mr(he(hr(Wt,Te([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?he(n):mr(he(hr(n,t)))}function Ot(e,t,r){if(r===void 0&&(r=Oe),!t)throw be(1,t);var n=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,se.apply(void 0,Te([o],s,!1)))};return n.attrs=function(o){return Ot(e,t,U(U({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Ot(e,t,U(U({},r),o))},n}var dn=function(e){return Ot(rs,e)},Y=dn;Zr.forEach(function(e){Y[e]=dn(e)});var ns=(function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=fn(t),it.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o(st(he(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&it.registerId(this.componentId+t);var s=this.componentId+t;this.isStatic?n.hasNameForId(s,s)||this.createStyles(t,r,n,o):(this.removeStyles(t,n),this.createStyles(t,r,n,o))},e})();function os(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=se.apply(void 0,Te([e],t,!1)),o="sc-global-".concat(qt(JSON.stringify(n))),s=new ns(n,o),a=new WeakMap,f=function(c){var l=$t(),h=z.useContext(Ye),g=a.get(l.styleSheet);return g===void 0&&(g=l.styleSheet.allocateGSInstance(o),a.set(l.styleSheet,g)),(typeof window>"u"||!l.styleSheet.server)&&u(g,c,l.styleSheet,h,l.stylis),z.useLayoutEffect(function(){return l.styleSheet.server||u(g,c,l.styleSheet,h,l.stylis),function(){var x;s.removeStyles(g,l.styleSheet),x=l.styleSheet.options.target,typeof document<"u"&&(x??document).querySelectorAll('style[data-styled-global="'.concat(o,'"]')).forEach(function(_){return _.remove()})}},[g,c,l.styleSheet,h,l.stylis]),null};function u(c,l,h,g,x){if(s.isStatic)s.renderStyles(c,Eo,h,x);else{var _=U(U({},l),{theme:Jr(l,g,f.defaultProps)});s.renderStyles(c,_,h,x)}}return z.memo(f)}function ss(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=st(se.apply(void 0,Te([e],t,!1))),o=qt(n);return new cn(o,n)}const pn=Y.div`
    font-size: 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    background: ${({theme:e})=>e.primaryLight};
    cursor: pointer;

    &:hover {
        background: ${({theme:e})=>e.primary};
        color: ${({theme:e})=>e.primaryLight};
    }
`,is=se`
    color: ${({theme:e})=>e.defaultBlack};
    background: ${({theme:e})=>e.primaryLight};
`,as=se`
    color: ${({theme:e})=>e.primaryLight};
    background: ${({theme:e})=>e.primary};
`,gr=se`
    color: ${({theme:e})=>e.defaultBlack};
    background: ${({theme:e})=>e.secondary};
`,hn=se`
    color: ${({theme:e})=>e.primary};
    background: ${({theme:e})=>e.secondaryLight};
`,cs=se`
    color: ${({theme:e})=>e.secondaryHint};
    background: ${({theme:e})=>e.primaryHint};
`,yr=e=>e===3||e===6,us={clicked:as,highlighted:gr,similarNum:gr,finished:hn,hint:cs,inactive:is},ls=Y(pn)`
    border-left: ${({x:e})=>yr(e)?3:1}px solid black;
    border-top: ${({y:e})=>yr(e)?3:1}px solid black;

    ${({state:e})=>us[e]};

    &:nth-child(9n + 1) {
        border-left: none;
    }

    &:nth-child(-n + 9) {
        border-top: none;
    }
`,fs=(e,t,r,n,o,s,a)=>a?"hint":e?"clicked":t&&!r||!t&&r?"highlighted":o&&n?"similarNum":s?"finished":"inactive",ds=z.memo(({value:e,x:t,y:r})=>{const n=Gt(),o=Ft(),s=Fr(),a=Hr(),f=oe(),u=r===a.currentHint.y&&t===a.currentHint.x&&!!a.currentHint.value,c=o.y===r&&o.x===t,l=k.useMemo(()=>{const g=o.y===r,x=o.x===t,_=o.value===e,R=o.y===-1&&o.x===-1&&!!o.value,j=!!e&&On(n,r,t);return fs(c,g,x,_,R,j,u)},[o,n,t,r,e,c,u]),h=k.useCallback(()=>{if(s){if(c){f(qe);return}f(ve({y:r,x:t,value:e})),f(Or)}},[s,c,f,r,t,e]);return v.jsx(ls,{onClick:h,x:t,y:r,state:l,children:e||u&&a.currentHint.value||null})}),vr={Digit1:1,Digit2:2,Digit3:3,Digit4:4,Digit5:5,Digit6:6,Digit7:7,Digit8:8,Digit9:9},xr={Numpad1:1,Numpad2:2,Numpad3:3,Numpad4:4,Numpad5:5,Numpad6:6,Numpad7:7,Numpad8:8,Numpad9:9},Nt=["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"],ps="Escape",mn=Y.section`
    max-height: 500px;
    max-width: 500px;
    width: 60vw;
    display: grid;
    grid-template-columns: repeat(${({$columns:e})=>e}, 1fr);
    grid-template-rows: repeat(${({$rows:e})=>e}, 1fr);
    border: 3px solid black;
    box-shadow: 0 0 30px 5px ${({theme:e})=>e.primary};

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        width: 75vw;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        width: 98vw;
    }
`,hs=e=>{for(let t=0;t<9;t++)for(let r=0;r<9;r++)if(!e[t][r])return!1;return!0},ms=(e,t,r)=>{const n=new Set;for(let a=0;a<9;a++)e[t][a]&&n.add(e[t][a]),e[a][r]&&n.add(e[a][r]);const o=Math.floor(t/3)*3,s=Math.floor(r/3)*3;for(let a=0;a<3;a++)for(let f=0;f<3;f++)e[o+a][s+f]&&n.add(e[o+a][s+f]);return[1,2,3,4,5,6,7,8,9].filter(a=>!n.has(a))},gs=e=>{let t=null;for(let r=0;r<9;r++)for(let n=0;n<9;n++)if(!e[r][n]){const o=ms(e,r,n);if(o.length===0)return null;if((!t||o.length<t[2].length)&&(t=[r,n,o],o.length===1))return t}return t},gn=e=>{if(hs(e))return e;const t=gs(e);if(!t)return!1;const[r,n,o]=t;for(let s=o.length-1;s>0;s--){const a=Math.floor(Math.random()*(s+1));[o[s],o[a]]=[o[a],o[s]]}for(const s of o){const a=e.map((u,c)=>c===r?u.map((l,h)=>h===n?s:l):u),f=gn(a);if(f)return f}return!1},Pt={easy:{mustFill:50,inARowMax:8,inABoxMax:7,numMax:8,numMin:1},medium:{mustFill:40,inARowMax:5,inABoxMax:6,numMax:6,numMin:1},hard:{mustFill:24,inARowMax:3,inABoxMax:4,numMax:4,numMin:1}},ys=(e,t)=>{let r=0;for(let n=0;n<e.length;n++){if(e[n]&&r++,r>t)return!1;e[n]&&!e[n+1]&&(r=0)}return!0},vs=(e,t)=>{let n=0;for(let o=0;o<e.length;o++){if(e[o][t]&&n++,n>8)return!1;if(e[o][t]&&e[o+1]&&!e[o+1][t])return!0}return!0},xs=e=>{const t=[];for(let r=0;r<8;r++)for(let n=r+1;n<9;n++){const o=Cs(e[r],e[n]);o.size&&o.forEach(s=>{t.push({y:r,x:s}),t.push({y:n,x:s})})}return t},Cs=(e,t)=>{const r=new Set;return e.forEach((n,o)=>{const s=t.indexOf(n);o!==s&&t[o]===e[s]&&(r.add(o),r.add(s))}),r},Ss=(e,t)=>e?{y:Math.floor(Math.random()*9),x:Math.floor(Math.random()*9)}:t[Math.floor(Math.random()*t.length)],bs=(e,t,r)=>{if(e!==1)return r;let n=r;for(let o=1;o<t.length;o++)t[o]||(n=o);return n},_s=e=>{let{mustFill:t}=Pt[e];const{inARowMax:r,inABoxMax:n,numMax:o}=Pt[e],s=Ce(),a=gn(s),f=new rt(s,n),u=[0,0,0,0,0,0,0,0,0,0],c=xs(a);let l=!c.length;for(;t;){const{y:h,x:g}=Ss(l,c);if(l=!0,!s[h][g]||s[h][g]!==a[h][g]){const x=bs(t,u,a[h][g]);s[h][g]=x,f.setValue(x,h,g),u[x]++,ys(s[h],r)&&vs(s,g)&&f.checkBox(h,g)&&u[x]<=o?t--:(s[h][g]=0,f.resetValue(h,g),u[x]--)}}return[s,a]},Es=e=>t=>{const[r,n]=_s(e);t(kr(Tn(r))),t(We(r)),t(wr(n)),t(Ge(K.InProgress)),t(qe),t(Dt),t(Lt)},ws=()=>(e,t)=>{const{boards:r,gameStatus:n}=t;e(We(r.initialBoard)),e(Dt),e(Lt),n===K.Failed&&e(Ge(K.InProgress))},ks=()=>e=>{e(We(Ce())),e(kr(Ce())),e(wr(Ce())),e(qe),e(Dt),e(Lt),e(Ge(K.NotStarted))},Rs=()=>e=>{e(ct(Ne.DifficultyBlock))},As=e=>(t,r)=>{const{boards:n,clickedCell:o}=r,{y:s,x:a}=o,f=Er(n.currentBoard,{y:s,x:a,value:e});t(We(f)),t(Dn(e)),t(zn({...o,value:e}))},yn=e=>{const t=eo(),{y:r,x:n}=Ft(),o=oe(),s=k.useCallback(a=>()=>{r!==-1&&n!==-1&&!t[r][n]?o(As(a)):o(ve({y:-1,x:-1,value:a}))},[t,r,n,o]);return e?s(e):s},Cr=(e,t)=>{const[r,n,o,s]=Nt;return r===t||s===t?e===0?8:e-1:n===t||o===t?e===8?0:e+1:e},Ts=()=>{const e=Gt(),t=Ft(),r=Fr(),n=oe(),o=yn(),s=k.useCallback(l=>{const h=vr[l]||xr[l]||0;h&&o(h)()},[o]),a=k.useCallback(l=>{if(t.y===-1||t.x===-1){n(Ln({y:0,x:0}));return}const[h,g,x,_]=Nt,{y:R,x:j}=t,$=Cr(R,l),M=Cr(j,l);switch(l){case h:n(ve({y:$,x:j,value:e[$][j]}));break;case g:n(ve({y:R,x:M,value:e[R][M]}));break;case x:n(ve({y:$,x:j,value:e[$][j]}));break;case _:n(ve({y:R,x:M,value:e[R][M]}));break}},[t,n,e]),f=k.useCallback(l=>{const{code:h}=l;h===ps&&n(qe),[...Object.keys(vr),...Object.keys(xr)].includes(h)&&s(h)},[n,s]),u=k.useCallback(l=>{Nt.includes(l.code)&&a(l.code)},[a]);k.useEffect(()=>(r&&(document.addEventListener("keyup",f),document.addEventListener("keydown",u)),()=>{document.removeEventListener("keyup",f),document.removeEventListener("keydown",u)}),[r,f,u]);const c=e.map((l,h)=>l.map((g,x)=>v.jsx(ds,{value:g,x,y:h},`x:${x},y:${h}`)));return v.jsx(mn,{$columns:9,$rows:9,children:c})},Is=Y.header`
    box-sizing: border-box;
    display: grid;
    width: 100%;
    height: 100px;
    border: 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    background: rgb(0, 109, 119);
    background: linear-gradient(180deg,
    rgba(0, 109, 119, 1) 0%,
    rgba(131, 197, 190, 1) 60%,
    rgba(237, 246, 249, 0.4) 100%);

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
    }
}
`,$s=Y.h1`
    text-transform: uppercase;
    font-size: 30px;
    grid-column-start: 2;
    justify-self: center;
    letter-spacing: 10px;
    transform: translateX(5px);
    color: ${({theme:e})=>e.primaryLight};

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        justify-self: center;
        grid-column-start: 1;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        grid-column-start: initial;
        justify-self: center;
    }
`,Os=Y.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        justify-content: right;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        justify-content: initial;
    }
`,vn=Y.button`
    background: transparent;
    transition: 0.3s;
`,jt=Y(vn)`
    box-sizing: border-box;
    font-size: 18px;
    height: 100%;
    width: 130px;
    color: ${({theme:e})=>e.primaryLight};
    grid-column-start: 3;
    max-width: 30%;

    &:hover {
        color: ${({theme:e})=>e.primary};
        background: ${({theme:e})=>e.primaryLight};
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        max-width: none;
        width: calc(100% / 3);
        flex: 1;

        &:hover,
        &:active {
            color: ${({theme:e})=>e.primaryLight};
            background: none;
        }
    }
`,Ns=()=>{const e=oe(),t=()=>{e(ct(Ne.DifficultyBlock)),e(at(!0))},r=()=>{e(ws())};return v.jsxs(v.Fragment,{children:[v.jsx(jt,{onClick:t,children:"New Game"}),v.jsx(jt,{onClick:r,children:"Reset"})]})},Ps=z.memo(Ns),js=()=>(e,t)=>{const{history:{cells:r},gameStatus:n,boards:{currentBoard:o}}=t;if(n===K.NotStarted)return;if(!r.length){e(Ir(!0));return}const s=r[r.length-1];e(ve(s)),e(We(Er(o,{...s,value:0}))),e(Un)},Ms="data:image/svg+xml,%3csvg%20viewBox='0%200%20256%20256'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M55.265%20167.072c-.975-1.973-3.388-2.796-5.372-1.847L42%20169s22.5%2053.5%2085.5%2056c60-1.5%2096.627-48.626%2097-96.5.373-47.874-37-95.5-95.5-96-57.5-1-79.556%2045.004-79.556%2045.004-1.073%201.93-1.944%201.698-1.944-.501V51.997a4%204%200%200%200-4-3.997H37c-2.209%200-4%201.8-4%204.008v48.984A3.998%203.998%200%200%200%2036.998%20105h50.504a3.995%203.995%200%200%200%203.998-3.993v-6.014c0-2.205-1.79-4.02-4.008-4.053l-25.484-.38c-2.214-.033-3.223-1.679-2.182-3.628C59.826%2086.932%2078%2045%20128.5%2045.5c49%20.5%2082.751%2041.929%2082.5%2083.242C208%20184%20166%20211%20127.5%20210c-54.5%200-72.235-42.928-72.235-42.928z'%20fill-rule='evenodd'/%3e%3c/svg%3e",Ds="data:image/svg+xml,%3csvg%20viewBox='0%200%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15.999%200c-6.188%200-11.035%205.035-11.035%2011.223%200%204.662%202.29%206.883%204.1%208.504%201.165%201.044%201.949%201.674%201.949%202.448v1.695c0%200.044%200.006%200.086%200.011%200.129h-0.023v2.895c0.001%203.053%201.975%205.105%205.033%205.105%202.952%200%204.967-2.052%204.967-5.105v-2.895h-0.029c0.006-0.043%200.013-0.085%200.013-0.129v-1.695c0-1.18%200.876-1.893%202.204-3.053%201.797-1.569%203.844-3.521%203.844-7.899%200-6.189-4.847-11.223-11.036-11.223zM15.962%2030c-1.872%200-2.959-1.161-2.959-3.105l-0.014-1.334c0.72%200.246%201.7%200.439%203.012%200.439%201.294%200%202.276-0.207%203.003-0.462v1.356c0%201.974-1.102%203.105-3.041%203.105zM21.876%2017.616c-1.358%201.186-2.889%202.413-2.889%204.559v1.264c-0.474%200.265-1.349%200.58-3.004%200.58-1.736%200-2.56-0.308-2.969-0.546v-1.298c0-1.706-1.334-2.791-2.615-3.938-1.697-1.521-3.434-3.245-3.434-7.014-0-5.085%203.95-9.223%209.034-9.223%205.086%200%209.036%204.138%209.036%209.223%200%203.47-1.515%204.956-3.16%206.393z'/%3e%3c/svg%3e",Ls=e=>Y(e)`
        width: ${({width:t})=>t||24}px;
        height: ${({height:t})=>t||24}px;
    `,Bs=e=>ss`
    0% {
        fill: ${e.error};
        transform: translate(15px);
    }
    20% {
        transform: translate(-15px);
    }
    40% {
        transform: translate(8px);
    }
    60% {
        transform: translate(-8px);
    }
    80% {
        transform: translate(4px);
    }
    100% {
        transform: translate(0px);
        fill: ${e.error};
    }
`,Hs=e=>se`
    animation: ${Bs(e)} 0.4s 1 linear;
`,Fs=se`
    background: ${({theme:e})=>e.lightError};
`,Mt=Y(jt)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 75px;

    &:hover {
        ${({$error:e})=>e&&Fs};
    }
`,xn=e=>Y(Ls(e))`
    fill: ${({theme:t})=>t.primaryLight};
    transition: 0.3s ease;
    ${t=>t.$error&&Hs(t.theme)};

    ${Mt}:hover & {
        fill: ${({theme:t})=>t.primary};
    }
`,Gs=()=>(e,t)=>{if(t.gameStatus!==K.InProgress)return;if(!t.hints.count){e($r(!0));return}const r=Nn(t.boards.currentBoard,t.boards.solution);e(Wn),e(qn(r))},zs=xn(Ms),Us=xn(Ds),Sr=400,Ys=()=>{const e=oe(),t=Zn(),r=Hr();k.useEffect(()=>{if(!r.error)return;const s=setTimeout(()=>e($r(!1)),Sr);return()=>clearTimeout(s)},[r.error,e]),k.useEffect(()=>{if(!t.error)return;const s=setTimeout(()=>e(Ir(!1)),Sr);return()=>clearTimeout(s)},[t.error,e]);const n=()=>{e(js())},o=()=>{e(Gs())};return v.jsxs(v.Fragment,{children:[v.jsxs(Mt,{onClick:o,$error:r.error,children:[!!r.count&&v.jsx("span",{children:r.count}),v.jsx(Us,{$error:r.error})]}),v.jsx(Mt,{onClick:n,$error:t.error,children:v.jsx(zs,{$error:t.error})})]})},Ws=z.memo(Ys),qs=()=>v.jsxs(Is,{children:[v.jsx($s,{children:"sudoku"}),v.jsxs(Os,{children:[v.jsx(Ws,{}),v.jsx(Ps,{})]})]}),Ks=z.memo(qs),Vs=Y(pn)`
    border-right: 1px solid black;

    ${({isFinished:e})=>e&&hn}
    &:last-child {
        border-right: none;
    }
`,Xs=({digit:e})=>{const[t,r]=k.useState(!1),n=Gt(),o=yn(e);return k.useEffect(()=>{r(n.every(s=>s.includes(e)))},[n,e]),v.jsx(Vs,{onClick:o,isFinished:t,children:e})},Js=z.memo(Xs),Zs=()=>{const e=()=>{const t=[];for(let r=1;r<=9;r++)t.push(v.jsx(Js,{digit:r},r));return t};return v.jsx(mn,{$columns:9,$rows:1,children:e()})},Qs=Y(vn)`
    height: calc(100% / 3);
    width: 100%;
    color: ${({theme:e})=>e.primary};
    font-size: 25px;

    &:hover {
        color: ${({theme:e})=>e.primaryLight};
        background: ${({theme:e})=>e.primary};
    }
`,Cn=z.memo(Qs),ei=Y.p`
    display: flex;
    height: calc((100% / 3) * 2);
    width: 100%;
    color: ${({theme:e})=>e.primary};
    font-size: 35px;
    line-height: 70px;
    justify-content: center;
    align-items: center;
    padding: 0 100px;
    box-sizing: border-box;

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        font-size: 30px;
        line-height: 60px;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        font-size: 25px;
        line-height: 50px;
    }
`,ti=()=>{const e=oe();return v.jsxs(v.Fragment,{children:[v.jsx(ei,{children:"Congratulations! You win!"}),v.jsx(Cn,{onClick:()=>e(Rs()),children:"Start New Game"})]})},ri=()=>{const e=oe(),t=n=>{e(Es(n)),e(at(!1)),e(ct(Ne.Empty))},r=()=>Object.keys(Pt).map(n=>{const o=n.charAt(0).toUpperCase().concat(n.substring(1));return v.jsx(Cn,{onClick:()=>t(n),children:o},n)});return v.jsx(v.Fragment,{children:r()})},ni=Y.div`
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 10;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        height: 100dvh;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        height: 100dvh;
    }
`,oi=Y.div`
    width: 25%;
    height: 40%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 15;
    background: ${({theme:e})=>e.primaryLight};
    border-radius: 25px;
    overflow: hidden;

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        width: 50%;
        height: 50%;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        width: 80%;
        height: 50%;
    }
`,si={DifficultyBlock:ri,WinBanner:ti},ii=()=>{const e=Jn(),t=Qn(),r=oe(),n=si[e.component],o=k.useCallback(()=>{t&&r(ks()),r(at(!1))},[t,r]);k.useEffect(()=>{const a=f=>{f.code==="Escape"&&o()};return document.addEventListener("keyup",a),()=>{document.removeEventListener("keyup",a)}},[o]);const s=a=>{a.target===a.currentTarget&&o()};return e.isOpen?v.jsx(ni,{onClick:s,children:v.jsx(oi,{children:v.jsx(n,{})})}):null},ai=()=>{const{currentBoard:e,solution:t}=Bt(),r=Ht(),n=oe();k.useEffect(()=>{const o=()=>{n(ct(Ne.WinBanner)),n(at(!0))},s=()=>{let a=!1;const f=e.every((u,c)=>u.every((l,h)=>(l&&l!==t[c][h]&&(a=!0),l?l===t[c][h]:!1)));a&&n(Ge(K.Failed)),f&&n(Ge(K.Win))};switch(r){case K.InProgress:s();break;case K.Win:o();break}},[e,n,r,t])},ci=Y.div`
    text-align: center;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0 30px 0;
    position: relative;
    background: rgba(237, 246, 249, 0.4);

    @media (min-width: ${({theme:e})=>e.breakpoints.smPlus}) and (max-width: ${({theme:e})=>e.breakpoints.lg}) {
        height: 100dvh;
    }

    @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
        height: 100dvh;
        padding-bottom: 10px;
    }
`,ui=()=>{const e=oe();ai();const t=r=>{r.target===r.currentTarget&&(e(qe),e(Or))};return v.jsxs(ci,{onClick:t,children:[v.jsx(Ks,{}),v.jsx(Ts,{}),v.jsx(Zs,{}),v.jsx(ii,{})]})},li="#FFDDD2",fi="#EDF6F9",di="#83C5BE",pi="#006D77",hi="#B8D8D8",mi="#7A9E9F",gi="#4F6367",yi="#FE5F55",vi="#000000",xi={primary:pi,secondary:di,secondaryLight:hi,primaryLight:fi,error:yi,lightError:li,primaryHint:mi,secondaryHint:gi,defaultBlack:vi},Ci={...xi,breakpoints:{sm:"480px",smPlus:"481px",lg:"1000px"}},Si=os`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    html {
        padding: env(safe-area-inset);
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    button {
        border: none;
        outline: none;
        padding: 0;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`;Rn.render(v.jsx(z.StrictMode,{children:v.jsx(to,{children:v.jsxs(ts,{theme:Ci,children:[v.jsx(Si,{}),v.jsx(ui,{})]})})}),document.getElementById("root"));
