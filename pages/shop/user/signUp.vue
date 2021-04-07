<template>
  <div>
    <input v-model="userEmail" type="text" />
    <input v-model="userPassword" type="password" />
    <button @click.prevent="userSignUp">회원가입</button>
    <input v-model="confirmCode" type="text" />
    <button @click.prevent="userConfirm">확인</button>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      userId: null,
      userEmail: 'saecomaster@naver.com',
      userPassword: 'sksmssk12!',
      confirmCode: '',
    }
  },
  methods: {
    async userSignUp() {
      await this.$cognitoAuth.signUp({
        email: this.userEmail,
        password: this.userPassword,
        terms: {
          agreeEmail: true,
        },
      })
      // location.href = window.location.href
    },
    async userConfirm() {
      const res = await this.$cognitoAuth.confirmRegistration(
        this.userEmail,
        this.confirmCode
      )
      console.log(res)
    },
  },
}
</script>

<style scoped></style>
