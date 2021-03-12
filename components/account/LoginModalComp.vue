<script></script>
<template>
  <ValidationObserver ref="observer">
    <b-modal
      id="login_modal"
      ref="modal"
      centered
      title="LogIn"
      hide-footer
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form">
        <ValidationProvider rules="required|email" mode="eager" name="ID">
          <b-form-group slot-scope="{ valid, errors }">
            <b-form-input
              id="ID-input"
              v-model="userId"
              :state="errors[0] ? false : valid ? true : null"
              label="Name"
              placeholder="ID"
              required
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider rules="required" mode="eager" name="password">
          <b-form-group
            slot-scope="{ valid, errors }"
            label-for="password-input"
          >
            <b-form-input
              id="password-input"
              v-model="userPassword"
              placeholder="Password"
              type="password"
              :state="errors[0] ? false : valid ? true : null"
              required
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-button class="mt-3" variant="outline-dark" block @click="onSubmit"
          >Login</b-button
        >
        <b-button class="mt-3" variant="outline-dark" block @click="resetModal"
          >Close</b-button
        >
        <div class="social_login">
          <img
            width="100%"
            height="100%"
            src="~/static/socialLogIn/naver.PNG"
          />
        </div>
      </form>
    </b-modal>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'LoginModalComp',
  data() {
    return {
      userId: '',
      userPassword: '',
      submittedNames: {},
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
      // 이벤트 막는 새기란다~
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

      // this.$nextTick(() => {
      //   this.$bvModal.hide('login_modal')
      // })
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      this.submittedNames['userId'] = this.userId
      this.submittedNames['userPassword'] = this.userPassword
      const res = await this.$axios.get('/account/login', {
        params: this.submittedNames,
      })
      console.log(res)
      this.txt = res.data
      console.log(res.data.userId)
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
  height: 37px;
  margin-top: 16px;
}
</style>
