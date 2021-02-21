<template>
  <!--    <div class="container">asahi</div>-->
  <div class="top">
    <Top />
    <section>
      <div class="wrapper">
        <div class="body_top">
          <ul class="top_slide">
            <li v-for="product in main_products" :key="product.id">
              <img :src="product" alt="noimage" />
            </li>
          </ul>
        </div>
        <div class="container"></div>
      </div>
    </section>
    <Bottom />
  </div>
</template>

<script>
import Top from '@/pages/shop/header/Top'
import Bottom from '@/pages/shop/footer/Bottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('shop')
export default {
  // layout: 'register',
  name: 'IndexVue',
  components: { Top, Bottom },
  computed: { ...mapState(['main_products']) },
}
</script>

<style scoped lang="scss">
.top {
  display: block;
  @include part_section;
}

section {
  border: 1px solid red;
  display: block;
  //@include part_section;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  .top_slide {
    li {
      @include shop_li(none);
    }
  }
}
</style>
