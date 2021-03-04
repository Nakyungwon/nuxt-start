export const state = () => ({
  main_products: [
    require('@/assets/images/main/1055748554.jpg'),
    require('@/assets/images/main/1055748554.jpg'),
  ],
  top_left_menus: [
    { name: 'NOTICE' },
    { name: 'REVIWE' },
    { name: 'EVENT' },
    { name: 'product', func: 'renderPage', param: '/shop/product' },
    { name: 'add', func: 'addMain' },
  ],
  top_right_menus: [
    { name: 'LOGIN', func: 'actionlogin', funcMode: 'actions' },
    { name: 'GETTOKEN', func: 'getToken', funcMode: 'mutations' },
    {
      name: 'MYPAGE',
      func: 'renderPage',
      funcMode: 'mutations',
      param: '/shop/user/mypage',
    },
    {
      name: 'MYBUCKET',
      func: 'renderPage',
      funcMode: 'mutations',
      param: '/shop/user/mybucket',
    },
  ],
  bottom_menus: [{ name: 'ACC' }, { name: 'BOTTOM' }, { name: 'TOP' }],
  // authToken: null,
  username: null,
  loggedIn: false,
})

export const getters = {
  test(state) {
    return 'test getter'
  },
}

export const mutations = {
  logout(state) {
    console.log('logout ..')
    // this.$cookiz.set('userToken', null)
    // this.$cookiz.set('refreshToken', null)
    state.username = null
    state.loggedIn = false
  },
  islogin(state, isParam) {
    state.loggedIn = isParam
  },

  userInfo(state, username) {
    state.username = username
  },

  addMain(state) {
    state.main_products.push(require('@/assets/images/main/1055748554.jpg'))
  },
  renderPage(state, param) {
    console.log(param)
    this.$router.push(param)
  },
  login(state, username) {
    state.loggedIn = true
    state.username = username
  },
}

export const actions = {
  actionlogin(context, username) {
    this.$authentication
      .login(this.$axios, 'saecomaster')
      .then((result) => {
        context.commit('login', result.data.username)
      })
      .catch((e) => {
        console.error('login 실패...')
      })
  },
}
