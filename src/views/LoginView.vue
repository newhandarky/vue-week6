<template>
  <div class="container d-flex justify-content-between flex-column align-items-stretch mt-5">
    <div>
      <h2 class="h3 my-3 font-weight-normal text-center">請先登入</h2>
    </div>
    <div class="">
      <form id="form" class="form-signin">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="username" v-model="user.username"
          placeholder="name@example.com" required autofocus>
          <label for="username">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="password"
          v-model="user.password" placeholder="Password" required>
          <label for="password">Password</label>
        </div>
        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="login">
          登入
        </button>
      </form>
    </div>
    <div>
      <p class="mt-5 mb-3 text-center">
        &copy; 2021~∞ - 六角學院
      </p>
    </div>
    <div class="row ">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const VITE_URL = import.meta.env.VITE_URL

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      text: '123456'
    }
  },
  methods: {
    login () {
      const api = `${VITE_URL}/admin/signin`
      axios.post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}; path=/`
          // 登入完成後轉址
          this.$router.push('/admin')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
  }
}

</script>

<style scoped lang="scss">
  .container {
    height: 100vh;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>
