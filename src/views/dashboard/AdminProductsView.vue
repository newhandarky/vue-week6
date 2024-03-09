<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="addNewProduct">建立新的產品</button>
    </div>
    <table class="table mt-4 table table-hover">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!-- 改用商品標題綁定key -->
        <tr v-for="(product) in products" :key="product.title">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td width="160">
            <div class="btn-group">
              <button type="button" class="btn btn-outline-secondary btn-sm border-end-0"
              @click="changeEnabledProduct(product)" v-if="product.is_enabled === 1">停用</button>
              <button type="button" class="btn btn-outline-success btn-sm border-end-0"
              @click="changeEnabledProduct(product)" v-else>啟用</button>
              <router-link :to="`/admin/products/${product.id}`" v-if="product.is_enabled === 1">
                <button type="button" class="btn btn-outline-primary rounded-0 btn-sm" >編輯</button>
              </router-link>
              <button type="button" class="btn btn-outline-primary btn-sm" disabled v-else>編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(product.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 新增分頁, 綁定分頁資訊 -->
    <!-- 綁定根元件的 pagination 物件, 傳入 paginationCom 元件-->
    <!-- 將(前)內部元件的值傳到(後)外部根元件的getData  -->
    <pagination-com :pages="pagination" @emit-pages="getData"></pagination-com>
  </div>

</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import paginationCom from '../../components/PaginationComponent.vue'

const host = import.meta.env.VITE_URL
const path = import.meta.env.VITE_PATH

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

export default {
  data () {
    return {
      products: [],
      pagination: {}, // 增加分頁資訊
      tempProduct: {
        imagesUrl: []
      },
      apiUploadImage: `${host}/api/${path}/admin/upload`
    }
  },
  components: {
    paginationCom
  },
  methods: {
    // 預設抓第一頁資料
    getData (page = 1) {
      axios.get(`${host}/api/${path}/admin/products?page=${page}`).then((res) => {
        this.products = res.data.products
        // 存入回傳的分頁資訊
        this.pagination = res.data.pagination
      }).catch((err) => {
        Swal.fire({
          title: `${err.data.message}`,
          icon: 'error'
        })
      })
    },
    addNewProduct () {
      this.$router.push('addProduct')
    },
    addProduct (product) {
      // 若是沒有ID改呼叫編輯
      if (product.id) {
        this.updateProduct(product)
      } else {
        axios.post(`${host}/api/${path}/admin/product`, { data: product }).then((res) => {
          this.getData()
          Swal.fire({
            title: '新增成功',
            icon: 'success'
          }).then(() => {
            this.$refs.productModal.hide()
          })
        }).catch((err) => {
          Swal.fire({
            title: `${err.data.message}`,
            icon: 'error'
          })
        })
      }
    },
    deleteProduct (id) {
      axios.delete(`${host}/api/${path}/admin/product/${id}`)
        .then((res) => {
          Swal.fire('刪除成功')
          this.getData()
        })
        .catch((err) => {
          console.log(err)
          Swal.fire('資料刪除失敗')
        })
    },
    updateProduct (product) {
      axios.put(`${host}/api/${path}/admin/product/${product.id}`, { data: product }).then((res) => {
        this.getData()
        Swal.fire({
          title: '修改成功',
          icon: 'success'
        }).then(() => {
          this.$refs.productModal.hide()
        })
      }).catch((err) => {
        Swal.fire({
          title: `${err.data.message}`,
          icon: 'error'
        })
      })
    },
    enableMessage (enabled) {
      if (enabled === 1) {
        Toast.fire({
          icon: 'success',
          title: '系統訊息 - 產品已啟用'
        })
      } else {
        Toast.fire({
          icon: 'warning',
          title: '系統訊息 - 產品已停用'
        })
      }
    },
    changeEnabledProduct (product) {
      if (product.is_enabled === 1) {
        product.is_enabled = 0
      } else {
        product.is_enabled = 1
      }
      const data = { ...product }
      axios.put(`${host}/api/${path}/admin/product/${product.id}`, { data })
        .then((res) => {
          this.enableMessage(product.is_enabled)
          // 成功回傳修改狀態後再改變css樣式
          product.check_enabled = product.is_enabled
        }).catch((err) => {
          // 如果錯誤產品啟用狀態恢復原值
          if (product.is_enabled === 1) {
            product.is_enabled = 0
          } else {
            product.is_enabled = 1
          }
          // Swal.fire('產品編輯失敗')
          console.log(err)
        })
    },

    addImageUrl () {
      this.tempProduct.imagesUrl.push('')
    },
    deleteImageUrl () {
      this.tempProduct.imagesUrl.pop()
    },
    createImages () {
      this.tempProduct.imagesUrl = ['']
    }
  },
  mounted () {
    // 從cookie取出登入時存入的token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 將token設定到axios的預設header裡
    axios.defaults.headers.common.Authorization = token
    // 確認登入狀態
    this.getData()
  }
}
</script>
