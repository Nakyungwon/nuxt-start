<template>
  <div>
    <div></div>
  </div>
  <!--  <div>-->
  <!--    <navi @is_navi="naviCheck" />-->
  <!--    <div class="container">-->
  <!--      <a href="#">hi</a>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script>
export default {
  data() {
    return { is_navi: '' }
  },
  methods: {
    naviCheck(evt) {
      this.is_navi = evt
    },
  },
}
</script>
<style lang="scss" scoped>
section {
  background: #00bfa5;
}
div.container {
  background: wheat;
}
</style>
