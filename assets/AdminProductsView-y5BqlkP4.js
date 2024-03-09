import{S as a}from"./sweetalert2.all-8sO2yy36.js";import{a as l}from"./axios-G2rPRu76.js";import{p as $}from"./PaginationComponent-DPCWkYEX.js";import{_ as k,c as i,a as e,F as y,I as P,b as w,r as b,o,D as h,M as x,w as v}from"./index-ruQzJgdW.js";const r="https://vue3-course-api.hexschool.io/v2",c="newhandarky",p=a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:t=>{t.onmouseenter=a.stopTimer,t.onmouseleave=a.resumeTimer}}),C={data(){return{products:[],pagination:{},tempProduct:{imagesUrl:[]},apiUploadImage:`${r}/api/${c}/admin/upload`}},components:{paginationCom:$},methods:{getData(t=1){l.get(`${r}/api/${c}/admin/products?page=${t}`).then(s=>{this.products=s.data.products,this.pagination=s.data.pagination}).catch(s=>{a.fire({title:`${s.data.message}`,icon:"error"})})},addNewProduct(){this.$router.push("addProduct")},addProduct(t){t.id?this.updateProduct(t):l.post(`${r}/api/${c}/admin/product`,{data:t}).then(s=>{this.getData(),a.fire({title:"新增成功",icon:"success"}).then(()=>{this.$refs.productModal.hide()})}).catch(s=>{a.fire({title:`${s.data.message}`,icon:"error"})})},deleteProduct(t){l.delete(`${r}/api/${c}/admin/product/${t}`).then(s=>{a.fire("刪除成功"),this.getData()}).catch(s=>{console.log(s),a.fire("資料刪除失敗")})},updateProduct(t){l.put(`${r}/api/${c}/admin/product/${t.id}`,{data:t}).then(s=>{this.getData(),a.fire({title:"修改成功",icon:"success"}).then(()=>{this.$refs.productModal.hide()})}).catch(s=>{a.fire({title:`${s.data.message}`,icon:"error"})})},enableMessage(t){t===1?p.fire({icon:"success",title:"系統訊息 - 產品已啟用"}):p.fire({icon:"warning",title:"系統訊息 - 產品已停用"})},changeEnabledProduct(t){t.is_enabled===1?t.is_enabled=0:t.is_enabled=1;const s={...t};l.put(`${r}/api/${c}/admin/product/${t.id}`,{data:s}).then(m=>{this.enableMessage(t.is_enabled),t.check_enabled=t.is_enabled}).catch(m=>{t.is_enabled===1?t.is_enabled=0:t.is_enabled=1,console.log(m)})},addImageUrl(){this.tempProduct.imagesUrl.push("")},deleteImageUrl(){this.tempProduct.imagesUrl.pop()},createImages(){this.tempProduct.imagesUrl=[""]}},mounted(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,"$1");l.defaults.headers.common.Authorization=t,this.getData()}},D={class:"container"},U={class:"text-end mt-4"},B={class:"table mt-4 table table-hover"},E=e("thead",null,[e("tr",null,[e("th",{width:"120"},"分類"),e("th",null,"產品名稱"),e("th",{width:"120"},"原價"),e("th",{width:"120"},"售價"),e("th",{width:"100"},"是否啟用"),e("th",{width:"120"},"編輯")])],-1),I={class:"text-end"},M={class:"text-end"},N={key:0,class:"text-success"},T={key:1,class:"text-danger"},S={width:"160"},V={class:"btn-group"},A=["onClick"],F=["onClick"],z=e("button",{type:"button",class:"btn btn-outline-primary rounded-0 btn-sm"},"編輯",-1),L={key:3,type:"button",class:"btn btn-outline-primary btn-sm",disabled:""},O=["onClick"];function j(t,s,m,q,u,d){const g=b("router-link"),f=b("pagination-com");return o(),i("div",D,[e("div",U,[e("button",{class:"btn btn-primary",onClick:s[0]||(s[0]=(...n)=>d.addNewProduct&&d.addNewProduct(...n))},"建立新的產品")]),e("table",B,[E,e("tbody",null,[(o(!0),i(y,null,P(u.products,n=>(o(),i("tr",{key:n.title},[e("td",null,h(n.category),1),e("td",null,h(n.title),1),e("td",I,h(n.origin_price),1),e("td",M,h(n.price),1),e("td",null,[n.is_enabled===1?(o(),i("span",N,"啟用")):(o(),i("span",T,"未啟用"))]),e("td",S,[e("div",V,[n.is_enabled===1?(o(),i("button",{key:0,type:"button",class:"btn btn-outline-secondary btn-sm border-end-0",onClick:_=>d.changeEnabledProduct(n)},"停用",8,A)):(o(),i("button",{key:1,type:"button",class:"btn btn-outline-success btn-sm border-end-0",onClick:_=>d.changeEnabledProduct(n)},"啟用",8,F)),n.is_enabled===1?(o(),x(g,{key:2,to:`/admin/products/${n.id}`},{default:v(()=>[z]),_:2},1032,["to"])):(o(),i("button",L,"編輯")),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:_=>d.deleteProduct(n.id)},"刪除",8,O)])])]))),128))])]),w(f,{pages:u.pagination,onEmitPages:d.getData},null,8,["pages","onEmitPages"])])}const Q=k(C,[["render",j]]);export{Q as default};
