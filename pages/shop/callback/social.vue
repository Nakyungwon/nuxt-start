<template>
  <div></div>
</template>

<script>
// import { decryptData } from '@/utils'
import Cookies from 'js-cookie'
export default {
  name: 'Social',
  validate({ query }) {
    console.log('!!query.code', !!query.code)
    console.log(query)
    console.log(query.code)
    return !!query.code
  },
  mounted() {
    console.log('cognito cookie', Cookies.get('cognito'))
  },
}
</script>

<style scoped></style>
