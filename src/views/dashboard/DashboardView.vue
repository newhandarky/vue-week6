<template>
  <div class="nav mb-4 py-2 bg-dark">
    <div class="container">
      <div class="d-flex justify-content-between align-items-end">
        <RouterLink to="/admin">
          <h1>
            <a class="navbar-brand logo m-0 p-0" role="button">CoffeeMeetsBagel</a>
          </h1>
        </RouterLink>
        <div>
          <RouterLink class="text-decoration-none nav-links" to="/admin/orders">後台訂單頁</RouterLink>
          <span class="text-white mx-2"> | </span>
          <RouterLink class="text-decoration-none nav-links" to="/admin/products">後台產品頁</RouterLink>
          <span class="text-white mx-2"> | </span>
          <RouterLink class="text-decoration-none nav-links" to="/">返回前台</RouterLink>
          <span class="text-white mx-2"> | </span>
          <a href="#" class="text-decoration-none nav-links" @click="checkout">登出</a>
        </div>
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios'

const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      tempProduct: {},
      products: {}
    }
  },
  methods: {
    checkUser () {
      axios.post(`${VITE_URL}/api/user/check`).then(() => {
        console.log('狀態已登入')
      }).catch(() => {
        alert('請先登入')
        this.$router.push('/login')
      })
    },
    checkout () {
      axios.post(`${VITE_URL}/logout`).then((res) => {
        console.log(res)
        document.cookie = 'hexschoolToken=\'\'; expires=\'\'; path=/'
        alert('已登出')
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

<style scoped lang="scss">
.logo {
  display: block;
  width: 256px;
  height: 64px;
  background-image: url('https://raw.githubusercontent.com/newhandarky/vue-week6/4a8aa1fdceff4f3b197cc0bfcb2293c8a17c9733/public/coffee_meets_bagel_Logo_Footer.svg'); // 借用專題LOGO
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
