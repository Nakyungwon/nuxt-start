<script></script>
<template>
  <b-modal
    id="login_modal"
    ref="modal"
    centered
    title="LogIn"
    hide-footer
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label-for="ID-input"
        invalid-feedback="ID is required"
        :state="userIdState"
      >
        <b-form-input
          id="ID-input"
          v-model="userId"
          placeholder="ID"
          :state="userIdState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-for="password-input"
        :state="userPasswordState"
        invalid-feedback="password is required"
      >
        <b-form-input
          id="password-input"
          v-model="userPassword"
          placeholder="Password"
          :state="userPasswordState"
          required
        ></b-form-input>
      </b-form-group>
      <b-button class="mt-3" variant="outline-dark" block @click="resetModal"
        >Login</b-button
      >
      <b-button class="mt-3" variant="outline-dark" block @click="resetModal"
        >Close</b-button
      >
      <div class="social_login">
        <img width="100%" src="~/static/socialLogIn/naver.PNG" />
      </div>
      <div id="naverIdLogin"></div>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: 'LoginModalComp',
  data() {
    return {
      userId: '',
      userPassword: '',
      userIdState: null,
      userPasswordState: null,
      nameState: null,
      submittedNames: [],
    }
  },
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '클라이언트ID',
      callbackUrl: `로그인콜백페이지`,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        height: 60,
      },
    })
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      // this.nameState = valid
      this.userIdState = valid
      this.userPasswordState = valid
      return valid
    },
    resetModal() {
      this.userId = ''
      this.userPassword = ''
      this.userIdState = null
      this.userPasswordState = null
      this.$bvModal.hide('login_modal')
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      if (!this.validation()) {
        this.resetModal()
        return
      }
      this.submittedNames.push(this.userId)
      this.submittedNames.push(this.userPassword)
      this.$nextTick(() => {
        this.$bvModal.hide('login_modal')
      })
    },
    validation() {
      // validation check 영역
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
//.mt-3 {
//  color: #28a745;
//}
//.mt-3:hover {
//  color: white;
//}
.social_login {
  height: 24px;
}
</style>
