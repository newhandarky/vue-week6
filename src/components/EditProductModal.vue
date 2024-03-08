<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <!-- 若沒有產品名稱及代表新增 -->
            <span v-if="tempProduct.title">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <h3>產品主圖</h3>
                  <div v-if="tempProduct.imageUrl">
                    <img class="img-fluid" :src="tempProduct.imageUrl" alt="商品主圖">
                  </div>
                  <div v-else>
                    <img class="img-fluid" :src="defaultImageUrl" alt="商品主圖">
                  </div>

                  <!-- 主圖片編輯 -->
                  <div class="dropdown">
                    <button class="btn btn-outline-primary btn-sm d-block w-100 dropdown-toggle" type="button"
                      id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      編輯圖片</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#">輸入圖片網址</a></li>
                      <li><a class="dropdown-item" href="#">上傳圖片</a></li>
                    </ul>
                  </div>
                  <div class="border border-primary rounded mt-2 pt-2">
                    <h4 class="text-primary text-center">請填入要更換的圖片路徑</h4>
                    <input type="url" class="form-control rounded-top-0" v-model="tempProduct.imageUrl">
                    <!-- <button type="bottom" class="form-control btn btn-outline-primary rounded-top-0"
                      >送出修改</button> -->
                  </div>
                </div>
              </div>

              <h3>產品副圖片</h3>
              <!-- 若是產品物件存在imagesUrl陣列, 空陣列也算 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-2" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" v-model="tempProduct.imagesUrl[key]" placeholder="請輸入圖片連結">
                  </div>
                  <img v-if="image" class="img-fluid" :src="image">
                  <img v-else class="img-fluid" :src="defaultImageUrl">
                </div>
                <!-- 判斷圖片陣列長度是否為0 或 最後的值是否為空 -->
                <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                  <!-- 若是完全沒圖片或是沒有空白的圖片則顯示新增按鈕 -->
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImageUrl(tempProduct)">新增圖片
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImageUrl">刪除圖片</button>
                </div>
              </div>
              <div v-else>
                <!-- 若是 tempProduct 物件沒有 imagesUrl 屬性時顯示 -->
                <button class="btn btn-outline-primary btn-sm d-block w-100" type="button"
                  @click="createImages">編輯圖片</button>
              </div>

            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                    v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                    v-model="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                  v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" type="text" class="form-control" placeholder="請輸入說明內容"
                  v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled"
                    :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="addProduct(tempProduct)">確認</button>
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
      productModal: {},
      defaultImageUrl: 'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png',
      showChangeUrl: false
    }
  },
  props: [
    'product',
    'addProduct'
  ],
  methods: {
    // 往外傳的事件
    addImageUrl () {
      this.$emit('add-image-url')
    },
    deleteImageUrl () {
      this.$emit('delete-image-url')
    },
    createImages () {
      this.$emit('create-images')
    },
    show () {
      this.productModal.show()
    },
    hide () {
      this.productModal.hide()
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  mounted () {
    // 綁定編輯的model
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false
    })
  }
}
</script>
