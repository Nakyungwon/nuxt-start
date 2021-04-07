export const state = () => ({
  isModalViewed: false,
  isSignUpViewed: false,
  main_products: [
    require('@/assets/images/main/1055748554.jpg'),
    require('@/assets/images/main/1055748554.jpg'),
  ],
  top_left_menus: [
    { name: 'NOTICE' },
    { name: 'REVIWE' },
    { name: 'EVENT' },
    {
      name: 'product',
      func: 'renderPage',
      funcMode: 'mutations',
      param: '/shop/product',
    },
    { name: 'add', func: 'addMain', funcMode: 'mutations' },
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
      name: '모달',
      func: 'userModal',
      funcMode: 'mutations',
      param: true,
    },
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
  session: null,
  refreshToken: null, // temp
  accessToken: null,
  idToken: null,
  user: false,
})

export const getters = {
  test(state) {
    return 'test getter'
  },
}

export const mutations = {
  userModal(state, param) {
    console.log(param)
    state.isModalViewed = param
    // console.log(state.isModalViewed)
  },
  siginupModal(state, param) {
    console.log(param)
    // state.isSignUpViewed = param
    state.isSignUpViewed = param
    // console.log(state.isModalViewed)
  },
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
    // state.username = null
    state.user = false
    this.$cognitoAuth.signOut()
    location.href = '/shop'
    // redirect('/shop')
    // this.$authentication.logout()
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
  SET_SESSION(state, { token, name }) {
    state.refreshToken = token
    state.username = name
  },
  SET_USER(state, data) {
    state.user = Object.assign({}, data)
  },
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token
  },
  SET_ID_TOKEN(state, token) {
    state.idToken = token
  },
  SET_COGNITO_SESSION(state, session) {
    state.session = session
  },
  // naverlogin(state, naverLogin) {
  //   const that = this
  //   naverLogin.getLoginStatus(function (status) {
  //     console.log(status)
  //     if (status) {
  //       const email = naverLogin.user.getEmail()
  //       const name = naverLogin.user.getName()
  //       const profileImage = naverLogin.user.getProfileImage()
  //       const birthday = naverLogin.user.getBirthday()
  //       const uniqId = naverLogin.user.getId()
  //       const age = naverLogin.user.getAge()
  //       console.log(email)
  //       console.log(name)
  //       console.log(profileImage)
  //       console.log(birthday)
  //       console.log(uniqId)
  //       console.log(age)
  //     } else {
  //       console.log('AccessToken이 올바르지 않습니다.')
  //     }
  //     that.$router.push('/shop')
  //   })
  // },
}

export const actions = {
  async refreshUser({ commit, dispatch, state }) {
    try {
      if (!state.refreshToken) {
        throw new Error("User isn't logged in")
      }
      const { refreshToken, username } = state
      // console.log('refreshToken', refreshToken)
      // console.log('username', username)
      const { userData, session } = await this.$cognitoAuth.refreshTokens(
        refreshToken,
        username
      )
      const { accessToken, idToken } = this.$cognitoAuth.getTokens(session)
      console.log('accessToken', accessToken)
      commit('SET_USER', userData)
      commit('SET_ACCESS_TOKEN', accessToken)
      commit('SET_ID_TOKEN', idToken)
      commit('SET_COGNITO_SESSION', session)
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error(e)
      }
    }
  },
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
