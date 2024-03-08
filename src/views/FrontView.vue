<template class="main">
  <div class="nav mb-4 py-2 bg-dark">
    <div class="container">
      <div class="d-flex justify-content-between align-items-end">
        <RouterLink to="/">
          <h1>
            <a class="navbar-brand logo m-0 p-0" role="button">CoffeeMeetsBagel</a>
          </h1>
        </RouterLink>
        <div>
          <RouterLink class="text-decoration-none nav-links" to="/createOrder">產品選購頁</RouterLink>
          <span class="text-white mx-2"> | </span>
          <!-- <RouterLink class="text-decoration-none nav-links" to="/productsList">前台產品頁</RouterLink>
          <span class="text-white mx-2"> | </span> -->
          <RouterLink class="text-decoration-none nav-links" to="/admin">後台頁面</RouterLink>
        </div>
      </div>
    </div>
  </div>
  <router-view class="wrapper"></router-view>
  <div class="footer">
    <div class="container">
      <div class="py-5 d-flex justify-content-between">
        <div>
          <RouterLink to="/">
            <img src="../../public/coffee_meets_bagel_Logo_Footer.svg" alt="">
          </RouterLink>
        </div>
        <div class="d-flex flex-column text-end">
          <RouterLink class="text-decoration-none nav-links mb-2" to="/createOrder">產品選購頁</RouterLink>
          <!-- <RouterLink class="text-decoration-none nav-links mb-2" to="/productsList">前台產品頁</RouterLink> -->
          <RouterLink class="text-decoration-none nav-links" to="/admin">後台頁面</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
html, body {
  height: 100%;
  margin: 0;
}
.wrapper {
  min-height: calc(100vh - 296px); /*減去footer高度*/
}
.logo {
  display: block;
  width: 256px;
  height: 64px;
  background-image: url('../../public/coffee_meets_bagel_Logo_Footer.svg'); // 借用專題LOGO
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
.footer{
  background: #000;
}
</style>
