<template>
  <div></div>
</template>

<script>
export default {
  name: 'LoginCallback',
  mounted() {
    const qs = require('qs')
    // let accessToken = null
    const parameter = {
      grant_type: 'authorization_code',
      client_id: 'f75e3d96e5687692bf1fc46b5b360d41',
      code: this.$route.query.code,
    }
    // Kakao.Auth.setAccessToken(this.$route.params.accessToken)
    this.$axios
      .post('https://kauth.kakao.com/oauth/token', qs.stringify(parameter), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        // accessToken = res.data.access_token

        // this.$axios
        //   .get('https://kapi.kakao.com/v2/user/me', {
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //       Authorization: res.data.access_token,
        //     },
        //   })
        //   .then((res) => {
        //     console.log(res)
        //   })

        Kakao.init('f75e3d96e5687692bf1fc46b5b360d41')
        Kakao.isInitialized()
        Kakao.Auth.setAccessToken(res.data.access_token)
        Kakao.API.request({
          url: '/v2/user/me',
          success(response) {
            console.log(response.id)
            this.$cognitoAuth.socialSignIn(response.id)
          },
          fail(error) {
            console.log(error)
          },
        })

        // profile_json = profile_request.json()
        // kakao_account = profile_json.get('kakao_account')
        // email = kakao_account.get('email', None)[2]
        // kakao_id = profile_json.get('id')
        // this.$router.push({
        //   name: 'login',
        //   params: {
        //     accessToken,
        //   },
        // })
      })
  },
}
</script>

<style scoped></style>
