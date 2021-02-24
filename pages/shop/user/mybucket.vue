<template>
  <div class="top">
    <Top />
    <div>장바구니</div>
    <div>장바구니 정보들</div>
  </div>
</template>

<script>
import Top from '@/pages/shop/header/Top'
export default {
  name: 'Mybucket',
  components: { Top },
  // middleware: 'shop/user/auth',
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
