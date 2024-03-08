<template>
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title"><span>刪除產品</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除<strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteProduct(tempProduct)">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  data () {
    return {
      tempProduct: {},
      delProductModal: {}
    }
  },
  props: [
    'product',
    'deleteProduct'
  ],
  methods: {
    show () {
      this.delProductModal.show()
    },
    hide () {
      this.delProductModal.hide()
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  mounted () {
    // 綁定刪除的model
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false
    })
  }
}
</script>
