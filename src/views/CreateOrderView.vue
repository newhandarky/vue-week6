<template>
  <!-- 產品Modal -->
  <!-- 將要取得資料的product傳入元件, 以及將加入購物車的方法傳進元件 -->
  <user-Modal :temp-product="tempProduct" :add-to-cart="addToCart" ref="userModal"></user-Modal>

  <div class="container">
    <div class="row mt-4">
      <div class="col-3 mb-4" v-for="product in products" :key="product.id">
        <div class="card">
          <!-- 圖片以背景載入 -->
          <div style="height: 200px;
                    background-size: cover;
                    background-position: center" :style="{ backgroundImage: `url(${product.imageUrl})` }">
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold">{{ product.title }}</h5>
            <!-- 判斷原價與售價是否相同< 相同就顯示單一數字 -->
            <div class="h5" v-if="product.origin_price === product.price">{{ product.price }} 元</div>
            <div v-else>
              <!-- 售價與原價不同則將原價加上刪除線 -->
              <del class="h6 text-secondary">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 <span class="text-danger">{{ product.price }}</span> 元</div>
            </div>
          </div>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-primary" @click="openModal(product)">
              查看更多
            </button>
            <!-- 點擊的產品套用disabled樣式 -->
            <button type="button" class="btn btn-outline-danger" :disabled="product.id === status.addCartLoading"
              @click="addToCart(product.id)">
              <!-- 點擊時套用loading樣式 -->
              <span v-if="product.id === status.addCartLoading" class="spinner-border spinner-border-sm"
                aria-hidden="true"></span>
              加到購物車
            </button>
          </div>
        </div>
      </div>

      <!-- 購物車列表 -->
      <div class="text-end">
        <!-- 購物車若為空則不顯示按鈕 -->
        <button v-if="!cartIsEmpty" class="btn btn-outline-danger" type="button" @click="removeAllCarts">
          <!-- 刪除全部品項時的loading -->
          <i v-if="status.deleteCartLoading" class="fas fa-spinner fa-pulse"></i>清空購物車</button>
        <!-- 純顯示購物車內無品項 -->
        <button v-else class="btn btn-outline-info" type="button" disabled>購物車內尚未加入品項</button>
      </div>
      <table class="table align-middle table-hover">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="carts">
            <tr v-for="cart in carts.carts" :key="cart.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(cart.id)"
                  :disabled="cart.id === status.cartQtyLoading">
                  <span v-if="cart.id === status.deleteSingleCart" class="spinner-border spinner-border-sm"
                    aria-hidden="true"></span>
                  x
                </button>
              </td>
              <td>
                <div class="d-flex justify-content-between">
                  <h5 class="mb-0">
                    {{ cart.product.title }}
                  </h5>
                  <h6>
                    <span v-if="cart.total !== cart.final_total" class="text-success">已套用優惠券</span>
                    <span v-else class="text-warning">尚未使用優惠券</span>
                  </h6>
                </div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group">
                    <button type="button" class="btn btn-outline-primary"
                      @click="cart.qty--; changeCartQty(cart, cart.qty)" :disabled="cart.qty === 1" v-if="cart.qty > 1">
                      -
                    </button>
                    <!-- 判斷若是由數量刪除購物車列表時, 只在數字這邊的刪除加上loading樣式 -->
                    <button v-else type="button" class="btn btn-outline-danger" @click="removeCartItem(cart.id, true)">
                      <span v-if="cart.id === status.deleteSingleCartByQty" class="spinner-border spinner-border-sm"
                        aria-hidden="true"></span> x
                    </button>
                    <input type="text" class="form-control" v-model="cart.qty" readonly>
                    <button type="button" class="btn btn-outline-primary"
                      @click="cart.qty++; changeCartQty(cart, cart.qty)"> + </button>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-between">
                  <div class="text-start">
                    {{ cart.product.price }}
                  </div>
                  <div class="text-end">
                    <!-- 折扣價格如果等同小記代表沒折扣 -->
                    <small v-if="cart.total !== cart.final_total" class="text-success">折扣價：</small>
                    <small v-else class="text-info">小記：</small>
                    {{ cart.final_total }}
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ carts.total }}</td>
          </tr>
          <!-- 若沒折扣則不顯示 -->
          <tr v-if="carts.final_total !== carts.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">
              {{ carts.final_total }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- 表單 -->
    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field id="email" name="email" type="email" class="form-control" rules="email|required"
            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" v-model="form.user.email"></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field id="name" name="name" type="text" class="form-control" :class="{ 'is-invalid': errors['name'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field id="tel" name="tel" type="text" class="form-control" :class="{ 'is-invalid': errors['tel'] }"
            placeholder="請輸入電話" :rules="isPhone" v-model="form.user.tel"></v-field>
          <error-message name="tel" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field id="address" name="address" type="text" class="form-control"
            :class="{ 'is-invalid': errors['address'] }" placeholder="請輸入地址" rules="required"
            v-model="form.user.address"></v-field>
          <error-message name="address" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>

</template>

<script>
import * as VeeValidate from 'vee-validate'
import * as VeeValidateI18n from '@vee-validate/i18n'
import * as VeeValidateRules from '@vee-validate/rules'
import Swal from 'sweetalert2'
import userModal from '../components/ProductModal.vue'
import zhTW from '../assets/zh_TW.json'
import axios from 'axios'

const host = import.meta.env.VITE_URL
const path = import.meta.env.VITE_PATH

// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule])
})

// 讀取外部的資源
VeeValidateI18n.localize({
  zhTW
})
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zhTW'),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      // 儲存狀態
      status: {
        // 用來存放讀取product的ID
        addCartLoading: '',
        // 修改購物車數量的
        cartQtyLoading: '',
        // 直接刪除購物車單一品項
        deleteSingleCart: '',
        // 透過數量為1的時候刪除的loading
        deleteSingleCartByQty: '',
        // 刪除全部購物車的loading
        deleteCartLoading: false
      },
      carts: {},
      cartIsEmpty: false,
      // 傳送order的data格式
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    // 載入子元件
    userModal,
    VForm: VeeValidate.Form,
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage
  },
  methods: {
    getProducts () {
      axios.get(`${host}/api/${path}/products/all`)
        .then(res => {
          this.products = res.data.products
        }).catch(err => {
          Swal.fire({
            title: err.data.message
          })
        })
    },
    // 接收product參數存在tempProduct
    openModal (product) {
      this.tempProduct = product
      this.$refs.userModal.showModal()
    },
    // 新增品項至購物車, 預設傳入購物車的數量為1
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      // 將產品加入購物車時也把ID寫入status內的addCartLoading屬性
      this.status.addCartLoading = id
      // 改元件的
      this.$refs.userModal.status.loading = true
      axios.post(`${host}/api/${path}/cart`, { data })
        .then(res => {
          // 購物車加入完畢後清除樣式
          this.status.addCartLoading = ''
          // 新增完後重新取得購物車資訊
          this.getCarts()
          this.$refs.userModal.closeModal()
          this.$refs.userModal.status.loading = false
        }).catch(err => {
          this.$refs.userModal.status.loading = false
          Swal.fire({
            title: err.data.message
          })
        })
    },
    changeCartQty (cart, qty) {
      console.log(cart)
      const data = {
        product_id: cart.product_id,
        qty
      }
      // 將產品加入購物車時也把ID寫入status內的addCartLoading屬性
      this.status.cartQtyLoading = cart.id
      axios.put(`${host}/api/${path}/cart/${cart.id}`, { data })
        .then(res => {
          this.getCarts()
          this.status.cartQtyLoading = ''
        }).catch(err => {
          Swal.fire({
            title: err.data.message
          })
        })
    },
    // 刪除購物車單一品項, 預設是表格左方的刪除鍵
    removeCartItem (id, byQty = false) {
      if (byQty) {
        // 此處為由數量刪除時的loading
        this.status.deleteSingleCartByQty = id
      } else {
        this.status.deleteSingleCart = id
      }
      axios.delete(`${host}/api/${path}/cart/${id}`)
        .then(res => {
          this.getCarts()
        }).catch(err => {
          Swal.fire({
            title: err.data.message
          })
        })
    },
    removeAllCarts () {
      // 先改狀態呈現讀取中效果
      this.status.deleteCartLoading = true
      axios.delete(`${host}/api/${path}/carts`)
        .then(res => {
          this.getCarts()
        }).catch(err => {
          Swal.fire({
            title: err.data.message
          })
        }).finally(() => {
          // 修改完畢改回預設false
          this.status.deleteCartLoading = false
        })
    },
    getCarts () {
      axios.get(`${host}/api/${path}/cart`)
        .then(res => {
          this.carts = res.data.data
          this.checkCarts()
        }).catch(err => {
          Swal.fire({
            title: err.data.message
          })
        })
    },
    // 判斷故務車是否為空
    checkCarts () {
      if (this.carts.carts.length === 0) {
        this.cartIsEmpty = true
      } else {
        this.cartIsEmpty = false
      }
    },

    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    sendOrder () {
      const order = this.form
      axios.post(`${host}/api/${path}/order`, { data: order })
        .then(res => {
          // 清空表格內容
          this.$refs.form.resetForm()
          this.form.message = ''
          this.getCarts()
        }).catch(err => {
          console.log(this.form.message)
          Swal.fire({
            title: err.data.message
          })
        })
    }
  },

  mounted () {
    // 先抓資料
    this.getProducts()
    this.getCarts()
  }
}
</script>

<style scoped lang="scss">
.logo {
  display: block;
  width: 256px;
  height: 64px;
  background-image: url('../../public/coffee_meets_bagel_Logo_Footer.svg');
  background-repeat: no-repeat;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}

.nav-links{
  color: white;
  transition: color 1s;
}
.nav-links:hover{
  color: #E2725E;
  transition: color 1s;
}
</style>
