<template>
  <h2>產品列表</h2>
  <RouterLink to="/">Home</RouterLink> |
  <RouterLink to="/about">About</RouterLink> |
  <RouterLink to="/productsList">前台產品頁</RouterLink> |
  <RouterLink to="/admin">後台產品頁</RouterLink>
  <router-view></router-view>
  <div class="container">
    <div class="row py-3">
      <div class="col-md-6">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th width="150">產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="150">
                是否啟用
              </th>
              <th width="120">
                查看細節
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td width="150">{{ product.title }}</td>
              <td width="120">
                {{ product.origin_price }}
              </td>
              <td width="120">
                {{ product.price }}
              </td>
              <td width="150">
                <span v-if="product.is_enabled === 1" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-primary"
                  @click="tempProduct = product">查看細節</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>目前有 <span>{{ Object.keys(products).length }}</span> 項產品</p>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <!-- 判斷 tempProduct 內 ID 是否有值 -->
        <template v-if="tempProduct.id">
          <div class="card mb-3">
            <img :src="tempProduct.imageUrl" class="card-img-top primary-image" alt="主圖">
            <div class="card-body">
              <h5 class="card-title">
                {{ tempProduct.title }}
                <span class="badge bg-primary ms-2">{{ tempProduct.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ tempProduct.content }}</p>
              <p class="card-text">商品內容：{{ tempProduct.description }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ tempProduct.origin_price }}</p>
                <p class="card-text text-secondary"><del>{{ tempProduct.price }}</del></p>
                元 / {{ tempProduct.unit }}
              </div>
            </div>
          </div>
          <template v-if="tempProduct?.imagesUrl?.length">
            <img v-for="imgurl in tempProduct.imagesUrl"
              :key="imgurl" :src="imgurl" alt="" class="images m-2">
          </template>
        </template>
        <p v-else class="text-secondary">請選擇一個商品查看</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      tempProduct: {},
      products: {}
    }
  },
  methods: {
    checkUser () {
      const api = `${VITE_URL}/api/user/check`
      axios.post(api).then((res) => {
        if (res.data.success) {
          this.getData()
        }
      }).catch(() => {
        // 驗證失敗轉到登入頁
        this.$router.push('/login')
      })
    },
    getData () {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/products/all`
      axios.get(api)
        .then((res) => {
          this.products = res.data.products
          console.log(res.data.products)
        })
    }
  },
  mounted () {
    // 取得token, 中間的值記得替換掉
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // 將token存入axios預設headers中
    axios.defaults.headers.common.Authorization = token
    // 呼叫方法取得資料, 避免將方法寫在mounted內
    this.checkUser()
  }
}
</script>

<style lang="scss" scoped>
  img {
    object-fit: contain;
    max-width: 100%;
  }

  .primary-image {
    height: 300px;
  }

  .images {
    height: 150px;
  }
</style>
