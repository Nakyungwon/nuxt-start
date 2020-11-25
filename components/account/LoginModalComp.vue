<template>
  <b-modal
    id="login_modal"
    ref="modal"
    centered="true"
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
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
        >Close Me</b-button
      >
      <b-button
        class="mt-2"
        variant="outline-warning"
        block
        @click="toggleModal"
        >Toggle Me</b-button
      >
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
.modal_inputs {
  color: white !important;
}
</style>
