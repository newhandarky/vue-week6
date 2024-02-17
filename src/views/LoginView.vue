<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2 class="h3 mb-3 font-weight-normal">請先登入</h2>
      <div class="col-8">
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
    </div>
    <p class="mt-5 mb-3 text-muted">
      &copy; 2021~∞ - 六角學院
    </p>
  </div>
</template>

<script>
import axios from 'axios'

const { VITE_URL } = import.meta.env

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
          this.$router.push('/productsList')
        })
        // 補一些判斷, 如果登入失敗就...
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
  html,
  body {
    height: 100%;
    text-align: center;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>
