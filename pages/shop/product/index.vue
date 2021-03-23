<template>
  <div class="top">
    <Top />
    <div>
      <ul class="prdList">
        <li v-for="item in items" :key="item.id" class="anchorBoxId_13">
          <div class="thumnail">
            <img :src="item.src" alt="없음" />
          </div>
          <div class="description">
            <strong>
              <a>{{ item.name }}</a>
            </strong>
            <ul>
              <li class="xans-record">
                <div>{{ item.description }}</div>
              </li>
              <li class="xans-record">
                <div>{{ item.cost }}</div>
              </li>
              <li class="xans-record">
                <div class="color">
                  <span
                    class="chips"
                    title="#DFD6AF"
                    style="background-color: #dfd6af"
                    color_no=""
                    displaygroup="3"
                  ></span
                  ><span
                    class="chips"
                    title="#D9B963"
                    style="background-color: #d9b963"
                    color_no=""
                    displaygroup="3"
                  ></span
                  ><span
                    class="chips"
                    title="#A4592D"
                    style="background-color: #a4592d"
                    color_no=""
                    displaygroup="3"
                  ></span
                  ><span
                    class="chips"
                    title="#11191C"
                    style="background-color: #11191c"
                    color_no=""
                    displaygroup="3"
                  ></span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Top from '@/pages/shop/header/Top'
import Bottom from '@/pages/shop/footer/Bottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('shop/product')
export default {
  name: 'Index',
  components: { Bottom, Top },
  computed: { ...mapState(['items']) },
}
</script>

<style scoped lang="scss">
li {
  @include shop_li(none);
}
ul {
  display: inline;
}
.prdList {
  width: 101%;
  min-width: 756px;
  margin: -11px 0 0 -0.5%;
  font-size: 0;
  line-height: 0;
  .anchorBoxId_13 {
    position: relative;
    display: inline-block;
    margin: 30px 0 20px;
    color: #757575;
    vertical-align: top;
    width: 24.93%;

    //max-width: 300px;
    img {
      max-width: 100%;
      max-height: 200px;
      box-sizing: border-box;
    }
  }
}
.thumnail {
  position: relative;
  margin: 0px 7px;
  text-align: center;
}
.description {
  margin: 0 auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  .name {
    display: block;
    text-align: left;
    font-weight: normal;
  }
  ul {
    list-style-type: circle;
    margin-block-start: 0px;
    margin-block-end: 0px;
    .xans-record {
      text-align: left;
      display: list-item;
    }
  }
}
.color {
  max-width: 190px;
  overflow: hidden;
  display: inline-block;
  margin: 3px 0 0 0;
}
.chips {
  display: inline-block;
  width: 8px;
  height: 8px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50px;
  border-radius: 50%;
  margin: 5px 3px 5px 0;
  border: 1px solid rgba(30, 30, 30, 0.03);
  box-sizing: border-box;
}
</style>
