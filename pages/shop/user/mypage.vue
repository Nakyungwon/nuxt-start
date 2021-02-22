<template>
  <div class="top">
    <Top />
    <div>마이 페이지</div>
    <div>내 정보들 ....</div>
  </div>
</template>

<script>
import Top from '@/pages/shop/header/Top'
export default {
  name: 'Mypage',
  components: { Top },
  auth: true,
  // middleware({ store, redirect }) {
  //   if (!store.state.authenticated) {
  //     return redirect('/shop')
  //   }
  // }
  created() {
    if (process.server) {
      console.log(this.$axios.defaults.headers.common['X-Token'], 'server')
    }
    if (process.client) {
      console.log(this.$axios.defaults.headers.common['X-Token'], 'client')
    }
  },
}
</script>

<style scoped></style>
