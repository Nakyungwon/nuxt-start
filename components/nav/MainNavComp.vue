<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-brand v-b-modal.login_modal href="#" class="navbar_text"
        >Login</b-navbar-brand
      >
    </b-navbar>
    <loginModal :pdata="title"></loginModal>
  </div>
</template>

<script>
import LoginModalComp from '@/components/account/LoginModalComp'
export default {
  name: 'MainNavComp',
  components: { loginModal: LoginModalComp },
  data() {
    return {
      title: 'nagalgal',
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar_text {
  font-size: 1em;
}
.navbar-expand-lg {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
</style>
