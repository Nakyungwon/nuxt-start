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
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.authenticated) {
      return redirect('/shop')
    }
  },
}
</script>

<style scoped></style>
