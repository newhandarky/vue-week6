<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="addModel">建立新的產品</button>
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
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="editModel(product)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="delModel(product)">刪除</button>
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
  <!-- 新增product Modal, 綁定tempProduct, 命名為 product 傳入元件, 將變更後的 updatedProduct 回傳給根元件 -->
  <product-modal-com ref="productModal" :product="tempProduct" :add-product="addProduct"
  @delete-image-url="deleteImageUrl" @add-image-url="addImageUrl" @create-images="createImages"></product-modal-com>
  <!-- 新增delete Modal, 綁定tempProduct, 命名為 product 傳入元件, 將變更後的 deletedProduct 回傳給根元件 -->
  <delete-modal-com ref="delProductModal" :product="tempProduct" :delete-product="deleteProduct" ></delete-modal-com>
  <!-- 修改與刪除需放在跟元件的標籤內, 不然會抓不到tempProduct -->
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import paginationCom from '../../components/PaginationComponent.vue'
import productModalCom from '../../components/EditProductModal.vue'
import deleteModalCom from '../../components/DeleteProductModal.vue'

const host = import.meta.env.VITE_URL
const path = import.meta.env.VITE_PATH

export default {
  data () {
    return {
      products: [],
      pagination: {}, // 增加分頁資訊
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  components: {
    paginationCom,
    productModalCom,
    deleteModalCom
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
    deleteProduct (product) {
      console.log(product)
      axios.delete(`${host}/api/${path}/admin/product/${product.id}`).then((res) => {
        this.getData()
        Swal.fire({
          title: '刪除成功',
          icon: 'success'
        })
        this.$refs.delProductModal.hide()
      }).catch((err) => {
        Swal.fire({
          title: `${err.data.message}`,
          icon: 'error'
        })
      })
    },

    addModel () {
      this.tempProduct = {
        imagesUrl: []
      }
      this.$refs.productModal.show()
    },

    editModel (product) {
      this.tempProduct = { ...product }
      this.$refs.productModal.show()
    },

    delModel (product) {
      this.tempProduct = product
      this.$refs.delProductModal.show()
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
