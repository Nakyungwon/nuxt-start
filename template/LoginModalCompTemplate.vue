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
        <div v-for="(object, index) in bind_login" :key="index">
          <inputComp
            :input="object.input"
            :validation="object.validation"
            @input="object.input.value = $event"
          />
          <!--          :input-id="object.input.id"-->
          <!--            :value="object.input.value"-->
          <!--            :input-label="object.input.Name"-->
          <!--            :input-placeholder="object.input.placeholder"-->
          <!--            :input-required="object.input.required"-->
          <!--            :input-type="object.input.type"-->
          <!--          :validation-rules="object.validation.rules"-->
          <!--            :validation-mode="object.validation.mode"-->
          <!--            :validation-name="object.validation.name"-->
        </div>
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
        <div id="naverIdLogin"></div>
      </form>
    </b-modal>
  </ValidationObserver>
</template>

<script>
import inputComp from '@/components/input/inputComp'
export default {
  name: 'LoginModalComp',
  components: { inputComp: inputComp },
  data() {
    let userId = ''
    let userPassword = ''
    return {
      userId: userId,
      userPassword: userPassword,
      bind_login: [
        {
          input: {
            value: userId,
            // id: 'id',
            // label: 'id',
            placeholder: 'ID',
            required: true,
          },
          validation: {
            rules: 'required|email',
            mode: 'eager',
            name: 'ID',
          },
        },
        {
          input: {
            value: userPassword,
            // id: 'password',
            // label: 'password',
            placeholder: 'password',
            required: true,
            type: 'password',
          },
          validation: {
            rules: 'required',
            mode: 'eager',
            name: 'password',
          },
        },
      ],
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
    getValue($event) {
      // console.log($event)
      // console.log(this)
      // this.$el.value = $event
    },
    async onSubmit() {
      console.log(this.userId)
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
