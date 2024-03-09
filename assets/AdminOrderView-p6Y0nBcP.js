import{b as O}from"./bootstrap.min-tYduo9KN.js";import{_ as w,o as d,c as r,a as t,F as g,I as k,D as i,G as P,H as C,M,E as A,b as S,r as y,d as a,K as v}from"./index-ruQzJgdW.js";import{p as j}from"./PaginationComponent-DPCWkYEX.js";import{a as _}from"./axios-G2rPRu76.js";import{S as p}from"./sweetalert2.all-8sO2yy36.js";import{m as b}from"./index-ARpQKZSe.js";const B={data(){return{showProductModal:null,products:{}}},methods:{modalShow(s){this.products=s,this.showProductModal.show()},modalHide(){this.showProductModal.hide()}},mounted(){this.showProductModal=new O.Modal(this.$refs.showProductModal,{keyboard:!0})}},D={class:"modal fade",ref:"showProductModal",tabindex:"-1","aria-hidden":"true"},N={class:"modal-dialog modal-dialog-centered"},E={class:"modal-content p-3 rounded"},T={class:"table table-striped table-hover mb-0 border"},V=t("thead",null,[t("tr",null,[t("th",{class:"text-primary",scope:"col"},"品項"),t("th",{class:"text-end",scope:"col"},"數量"),t("th",{class:"text-end",scope:"col"},"小計")])],-1),z={class:"text-primary"},L={class:"text-end"},Y={class:"text-end"};function F(s,o,u,h,n,l){return d(),r("div",D,[t("div",N,[t("div",E,[t("table",T,[V,t("tbody",null,[(d(!0),r(g,null,k(n.products,c=>(d(),r("tr",{key:c.id},[t("td",z,i(c.product.title),1),t("td",L,i(c.qty)+" 件",1),t("td",Y,i(c.total)+" 元",1)]))),128))])])])])],512)}const G=w(B,[["render",F]]),m="https://vue3-course-api.hexschool.io/v2",f="newhandarky";b.locale("zh-tw");b.updateLocale("zh-tw",{meridiem:function(s){return s<12?"上午":"下午"}});const H={data(){return{orders:[],allOrders:[],pagination:{},searchStr:"",checkAll:!0}},components:{pagination:j,showProductsModal:G},methods:{getAllOrders(){const s=[];_.get(`${m}/api/${f}/admin/orders`).then(o=>{console.log(o),this.allOrders=o.data.orders;const u=o.data.pagination.total_pages;for(let h=2;h<=u;h++){const n=_.get(`${m}/api/${f}/admin/orders?page=${h}`);n.then(l=>{l.data.orders.forEach(c=>{this.allOrders.push(c)})}),s.push(n)}Promise.all(s).then(()=>{}).catch(()=>{p.fire("取得資料失敗")})})},getOrders(s=1){_.get(`${m}/api/${f}/admin/orders?page=${s}`).then(o=>{this.orders=o.data.orders,this.pagination=o.data.pagination}).catch(()=>{p.fire("資料取得失敗")})},openOffCanvasNav(){this.$refs.backendNav.openNav()},openProductsTable(s){this.$refs.showProductModal.modalShow(s)},deleteOrder(s){p.fire({icon:"warning",title:"確定要刪除此訂單嗎?",showCancelButton:!0,confirmButtonText:"確定",confirmButtonColor:"#1B8754"}).then(o=>{o.isConfirmed&&_.delete(`${m}/api/${f}/admin/order/${s}`).then(u=>{p.fire({position:"center",icon:"success",title:"訂單已刪除",showConfirmButton:!1,timer:1500}),this.getOrders(),this.getAllOrders()}).catch(()=>{p.fire("刪除訂單失敗")})})},getDate(s){return b.unix(s).format("YYYY年 MM月 DD日")},searchOrder(s){this.checkAll=!1,this.orders=this.allOrders.filter(o=>JSON.stringify(o).match(s))},isOrderPaid(s){s==="檢視全部"?(this.checkAll=!0,this.getOrders()):s==="未付款"&&(this.checkAll=!1,this.orders=this.allOrders.filter(o=>o.is_paid===!1))},goOrderPage(s){this.$router.push(`/admin/orders/${s}`)}},mounted(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,"$1");_.defaults.headers.common.Authorization=s,this.getOrders(),this.getAllOrders()}},I=t("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"},null,-1),q={class:"container"},J={class:"row"},K=t("div",{class:"col-3 p-3"},[t("h2",{class:"text-primary mb-0"},"訂單列表")],-1),R={class:"col-3 py-3"},U={class:"input-group"},Q=t("span",{class:"material-symbols-outlined"}," search ",-1),W=[Q],X={class:"col-3 py-3"},Z=t("option",{selected:""},"請選擇訂單狀態",-1),tt=t("option",{value:"檢視全部"},"檢視全部",-1),st=t("option",{value:"未付款"},"未付款",-1),et=[Z,tt,st],ot={class:"border rounded p-3 pb-0 mb-8"},nt={class:"row g-0 position-relative"},at={class:"col-5 p-3"},it={class:"d-flex justify-content-between text-primary"},lt=t("span",null,"訂單編號 :",-1),dt={class:"text-dark"},ct={class:"d-flex justify-content-between text-primary"},rt=t("span",null,"下單日期 :",-1),ht={class:"text-dark"},_t={class:"d-flex justify-content-between text-primary"},pt=t("span",null,"姓名 :",-1),ut={class:"text-dark"},mt={class:"d-flex justify-content-between text-primary"},ft=t("span",null,"連絡電話 :",-1),gt={class:"text-dark"},bt={class:"col-5 p-3"},xt={class:"d-flex justify-content-between text-primary"},yt=t("span",null,"Email :",-1),vt={class:"text-dark"},wt={class:"d-flex justify-content-between text-primary"},kt=t("span",null,"收件地址 :",-1),$t={class:"text-dark"},Ot={class:"d-flex justify-content-between text-primary"},Pt=t("span",null,"備註 :",-1),Ct={class:"text-dark"},Mt={class:"row"},At={class:"col-6"},St={class:"d-flex justify-content-between text-primary"},jt=t("span",null,"訂單金額 :",-1),Bt={class:"text-dark"},Dt={class:"col-6"},Nt={class:"d-flex justify-content-between text-primary"},Et=t("span",null,"訂單狀態 :",-1),Tt={key:0,class:"text-success"},Vt={key:1,class:"text-danger"},zt={class:"col-2 p-3"},Lt={class:"border-top-0 bg-white d-flex flex-column align-items-end"},Yt=["onClick"],Ft=t("span",{class:"material-symbols-outlined align-middle"}," view_list ",-1),Gt=["onClick"],Ht=t("span",{class:"material-symbols-outlined align-middle"}," edit ",-1),It=["onClick"],qt=t("span",{class:"material-symbols-outlined align-middle"}," delete ",-1);function Jt(s,o,u,h,n,l){const c=y("pagination"),$=y("showProductsModal");return d(),r(g,null,[I,t("div",null,[t("div",q,[t("div",J,[K,t("div",R,[t("div",U,[P(t("input",{type:"text",class:"form-control",placeholder:"請輸入搜尋資料","onUpdate:modelValue":o[0]||(o[0]=e=>n.searchStr=e)},null,512),[[C,n.searchStr]]),t("button",{type:"button",class:"btn btn-outline-primary d-flex align-items-center",onClick:o[1]||(o[1]=e=>l.searchOrder(n.searchStr))},W)])]),t("div",X,[t("select",{class:"form-select form-select","aria-label":".form-select-sm example",onChange:o[2]||(o[2]=e=>l.isOrderPaid(e.target.value))},et,32)]),t("div",ot,[(d(!0),r(g,null,k(n.orders,e=>(d(),r("div",{key:e.id,class:"card mb-3"},[t("div",nt,[t("div",at,[t("h6",it,[lt,a(),t("span",dt,i(e.id),1)]),t("h6",ct,[rt,a(),t("span",ht,i(l.getDate(e.create_at)),1)]),t("h6",_t,[pt,a(),t("span",ut,i(e.user.name),1)]),t("h6",mt,[ft,a(),t("span",gt,i(e.user.tel),1)])]),t("div",bt,[t("h6",xt,[yt,a(),t("span",vt,i(e.user.email),1)]),t("h6",wt,[kt,a(),t("span",$t,i(e.user.address),1)]),t("h6",Ot,[Pt,a(),t("span",Ct,i(e.message===void 0?"無特別備註":e.message),1)]),t("div",Mt,[t("div",At,[t("h6",St,[jt,a(),t("span",Bt,i(e.total),1)])]),t("div",Dt,[t("h6",Nt,[Et,e.is_paid?(d(),r("span",Tt,"已付款")):(d(),r("span",Vt,"未付款"))])])])]),t("div",zt,[t("div",Lt,[t("button",{class:"btn btn-outline-primary mb-2",type:"button",onClick:x=>l.openProductsTable(e.products)},[Ft,a("查看明細")],8,Yt),t("button",{class:v(["btn btn-outline-primary mb-2",{disabled:e.is_paid}]),type:"button",onClick:x=>l.goOrderPage(e.id)},[Ht,a("編輯訂單")],10,Gt),t("button",{class:v(["btn btn-outline-danger",{disabled:e.is_paid}]),type:"button",onClick:x=>l.deleteOrder(e.id)},[qt,a("刪除訂單")],10,It)])])])]))),128))])]),n.checkAll?(d(),M(c,{key:0,pages:n.pagination,onEmitPages:l.getOrders},null,8,["pages","onEmitPages"])):A("",!0),S($,{ref:"showProductModal"},null,512)])])],64)}const Zt=w(H,[["render",Jt]]);export{Zt as default};