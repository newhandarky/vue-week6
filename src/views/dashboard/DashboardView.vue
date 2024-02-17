<template>
  <h2>這是後台</h2>
  <nav>
    <RouterLink to="/admin/products">產品列表</RouterLink> |
    <RouterLink to="/admin/order">訂單列表</RouterLink> |
    <RouterLink to="/">前台頁面</RouterLink>
  </nav>
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
      const api = `${VITE_URL}/api/user/check`
      axios.post(api).then(() => {
        // console.log('驗證成功', res.data);  因系統警告改備註
      }).catch(() => {
        // alert('登入驗證失敗, 將返回登入頁面');  因系統警告改備註
        this.$router.push('/login')
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
