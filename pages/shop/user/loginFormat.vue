<template>
  <div>
    <div>
      <input v-model="userId" type="text" />
      <input v-model="userPassword" type="password" />
      <button @click.prevent="userLogin">로긴</button>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <div class="social_button"><button id="naverIdLogin"></button></div>
      <div class="social_button">
        <img
          src="@/assets/images/kakao_login/kakao.png"
          @click.prevent="kakaoLogin"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginFormat',
  data() {
    return {
      userId: 'saecomaster',
      userPassword: 'sksmssk12!',
    }
  },
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'lLQJ4RNgbF5KTgqpqiLO',
      callbackUrl: `${window.location.origin}/shop/callback/naver`,
      isPopup: false /* 팝업을 통한 연동처리 여부, true 면 팝업 */,
      // loginButton: {
      //   color: 'green',
      //   type: 1,a
      //   height: 34,
      // } /* 로그인 버튼의 타입을 지정  http://localhost:5000/shop/callback/kakao */,
    })
    naverLogin.init()
    Kakao.init('f75e3d96e5687692bf1fc46b5b360d41')
    Kakao.isInitialized()
  },
  methods: {
    kakaoLogin() {
      console.log(window.location.origin)
      Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/shop/callback/kakao`,
      })
    },
    async userLogin() {
      await this.$cognitoAuth.signIn(this.userId, this.userPassword)
      location.href = window.location.href
    },
  },
}
</script>

<style scoped lang="scss">
button {
  text-align: center;
  //font-size: 0;
  display: inline-block;
  margin: 0 30px 0 0;
  width: 44px;
  height: 44px;
}
#naverIdLogin {
}
img {
  width: 45px;
  height: 45px;
  border-radius: 50px;
}
.social_button {
  width: 45px;
  //overflow: hidden;
}
</style>
