<template>
  <header>
    <div class="wrapper">
      <div class="header_top">logo</div>
      <div class="menu_1">
        <ul class="inner_left">
          <li v-for="menu in top_menus" :key="menu.id">
            {{ menu }}
          </li>
        </ul>
      </div>
      <div class="menu_2">
        <ul class="inner_right">
          <li v-for="menu in bottom_menus" :key="menu.id">
            {{ menu }}
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('shop')
export default {
  name: 'Header',
  computed: {
    ...mapState(['top_menus', 'bottom_menus']),
  },
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  display: block;
  //@include part_section;
  width: 100%;
  height: 300px;
  border: 1px solid black;
  * {
    border: 1px solid black;
  }
}
.header_top {
  top: 40px;
  position: absolute;
}
.menu {
  &_1 {
    position: absolute;
    top: 170px;
  }
  &_2 {
    position: absolute;
    top: 220px;
  }
}
.inner {
  &_right {
    li {
      float: right;
      list-style: none;
    }
  }

  &_left {
    li {
      float: left;
      list-style: none;
    }
  }
}
</style>
