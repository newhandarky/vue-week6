<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="productModal">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid modal__img" :src="tempProduct.imageUrl" alt="#">
            </div>
            <div class="col-sm-6 d-flex flex-column justify-content-between">
              <div>
                <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
                <p>商品描述：{{ tempProduct.description }}</p>
                <p>商品內容：{{ tempProduct.content }}</p>
              </div>
              <div>
                <div v-if="tempProduct.origin_price === tempProduct.price" class="h5">{{ tempProduct.price }} 元</div>
                <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div class="h5">現在只要 <span class="text-danger fw-bold">{{ tempProduct.price }}</span> 元</div>
                <div>
                  <div class="input-group d-flex justify-content-between">
                    <div class="d-flex">
                      <button class="btn btn-outline-primary" @click="cutProduct" type="button">-</button>
                      <input class="form-control" type="text" readonly v-model="qty">
                      <button class="btn btn-outline-primary" @click="plusProduct" type="button">+</button>
                    </div>
                    <div>
                      <button type="button" class="btn btn-primary" @click="addToCart(tempProduct.id, qty)">
                        <!-- 元件加入購物車的loading -->
                        <span v-if="status.loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        加入購物車</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  props: [
    // 接收根元件傳來的product物件
    'tempProduct',
    'addToCart'
  ],
  data () {
    return {
      // 建立modal變數準備接實體後的modal
      productModal: {},
      qty: 1,
      status: {
        loading: false
      }
    }
  },
  // 對應x-template的元件ID
  // template: '#userProductModal',
  methods: {
    showModal () {
      this.productModal.show()
    },
    closeModal () {
      this.productModal.hide()
    },
    plusProduct () {
      this.qty++
    },
    cutProduct () {
      this.qty--
    }
  },
  watch: {
    // 監聽tempProduct, 點擊到不同產品時將預設數字還原為1
    tempProduct () {
      this.qty = 1
    }
  },
  mounted () {
    // 建立Modal實體
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false
    })
  }
}
</script>

<style scoped lang="scss">
.modal__img{
  object-fit: cover;
  height: 100%;
}
</style>
