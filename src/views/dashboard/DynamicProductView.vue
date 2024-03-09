<script>
import updateProduct from '../../components/UpdateProduct.vue'

export default {
  data () {
    return {}
  },
  components: {
    updateProduct
  },
  methods: {
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    modalShow (url) {
      this.$refs.modal.modalShow(url)
    }
  }
}
</script>

<template>
  <div class="container">
    <h2 class="text-primary mb-0 py-3">產品編輯</h2>
  </div>

  <!-- 產品元件 -->
  <updateProduct></updateProduct>
</template>
