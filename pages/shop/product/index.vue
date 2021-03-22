<template>
  <div class="top">
    <Top />
    <div>
      <img alt="없음" />
    </div>
    <Bottom />
  </div>
</template>

<script>
import Top from '@/pages/shop/header/Top'
import Bottom from '@/pages/shop/footer/Bottom'
export default {
  name: 'Index',
  components: { Bottom, Top },
}
</script>

<style scoped></style>
