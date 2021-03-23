<template>
  <div class="top">
    <Top />
    <div></div>
    <Bottom />
  </div>
</template>

<script>
import Top from '@/pages/shop/header/Top'
import Bottom from '@/pages/shop/footer/Bottom'
export default {
  name: 'Detail',
  components: { Bottom, Top },
  mounted() {
    console.log(this.$route.query.item)
    // console.log(window.location.href)
  },
}
</script>

<style scoped></style>
