<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <!-- 在第一頁時不能往前 -->
      <li class="page-item" :class="{ 'disabled': pages.current_page === 1 }">
        <!-- 當前頁數 - 1, 並取消A標籤預設行為 -->
        <a class="page-link" @click.prevent="emitPages(pages.current_page - 1)" href="#">Previous</a>
      </li>
      <!-- 用 v-for 跑迴圈, 次數為總頁數 -->
      <!-- 當前頁面綁定 class : active -->
      <li v-for="(item, index) in pages.total_pages" :key="index" :class="{ 'active': item === pages.current_page }"
        class="page-item">
        <!-- 將點擊到的頁數傳到 paginationCom 元件, 再透過事件傳回根元件 -->
        <a class="page-link" href="#" @click.prevent="emitPages(item)">{{ item }}</a>
      </li>
      <!-- 最後一頁不能往後 -->
      <li class="page-item" :class="{ 'disabled': pages.current_page === pages.total_pages }">
        <!-- 當前頁數 + 1, 並取消A標籤預設行為 -->
        <a class="page-link" @click.prevent="emitPages(pages.current_page + 1)" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
    }
  }
}
</script>
