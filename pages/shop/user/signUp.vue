<template>
  <div>
    <input v-model="userId" type="text" />
    <input v-model="userEmail" type="text" />
    <input v-model="userPassword" type="password" />
    <button @click.prevent="userSignUp">회원가입</button>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      userId: null,
      userEmail: null,
      userPassword: null,
    }
  },
  methods: {
    userSignUp() {
      // await this.$cognitoAuth.signUp(this.userId, this.userPassword)
      // location.href = window.location.href
    },
  },
}
</script>

<style scoped></style>
