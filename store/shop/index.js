export const state = () => ({
  main_products: [
    require('@/assets/images/main/1055748554.jpg'),
    require('@/assets/images/main/1055748554.jpg'),
    1,
  ],
  top_left_menus: [
    { name: 'NOTICE' },
    { name: 'REVIWE' },
    { name: 'EVENT' },
    { name: 'product', func: 'renderPage', param: '/shop/product' },
    { name: 'add', func: 'addMain' },
  ],
  top_right_menus: [
    { name: 'LOGIN', func: 'actionLogin', funcMode: 'actions', param: '' },
    // {
    //   name: 'LOGINAUTH',
    //   func: 'actionLoginAuth',
    //   funcMode: 'actions',
    //   param: '',
    // },
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
  inputLoginText(state, userId) {
    console.log(userId)
    // console.log(state.top_right_menus[0])
    state.top_right_menus[0].param = userId
    state.top_right_menus[1].param = userId
  },
  logout(state) {
    console.log('logout ..')
    // this.$cookiz.set('userToken', null)
    // this.$cookiz.set('refreshToken', null)
    state.username = null
    state.loggedIn = false
    this.$authentication.logout()
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
  actionLogin(context, username) {
    console.log(username)
    this.$authentication
      .login(this.$axios, username)
      .then((result) => {
        context.commit('login', result.data.username)
      })
      .catch((e) => {
        console.error('login 실패...')
      })
  },
  actionLoginAuth(context, userId) {
    this.$auth
      .loginWith('local', {
        data: { id: userId },
      })
      .then((result) => {
        console.log(result)
      })
  },
}
