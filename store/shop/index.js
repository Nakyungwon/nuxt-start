export const state = () => ({
  main_products: [
    // '/_nuxt/assets/images/main/1055748554.jpg',
    // '/_nuxt/assets/images/main/1055748554.jpg',
    require('@/assets/images/main/1055748554.jpg'),
    require('@/assets/images/main/1055748554.jpg'),
  ],
  top_left_menus: [
    { name: 'NOTICE' },
    { name: 'REVIWE' },
    { name: 'EVENT' },
    { name: 'add', func: 'addMain' },
  ],
  top_right_menus: [
    { name: 'LOGIN', func: 'login' },
    { name: 'MYPAGE', func: 'renderPage', param: '/shop/user/mypage' },
  ],
  bottom_menus: [{ name: 'ACC' }, { name: 'BOTTOM' }, { name: 'TOP' }],
})

export const mutations = {
  addMain(state) {
    state.main_products.push(require('@/assets/images/main/1055748554.jpg'))
  },
  renderPage(state, param) {
    console.log(param)
    this.$router.push(param)
  },
  login(state) {
    console.log('login ...')
    this.$axios.post('/shop/user/login', {})
  },
}
