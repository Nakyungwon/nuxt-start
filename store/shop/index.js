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
    { name: 'GETTOKEN', func: 'getToken' },
    { name: 'MYPAGE', func: 'renderPage', param: '/shop/user/mypage' },
    { name: 'MYBUCKET', func: 'renderPage', param: '/shop/user/mybucket' },
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
    this.$cookiz.set('userToken', null)
    this.$cookiz.set('refreshToken', null)
    state.username = null
    state.loggedIn = false
  },
  islogin(state, isParam) {
    console.log('islogin ..')
    state.loggedIn = isParam
  },

  userInfo(state, username) {
    console.log(username)
    state.username = username
  },

  addMain(state) {
    state.main_products.push(require('@/assets/images/main/1055748554.jpg'))
  },
  renderPage(state, param) {
    console.log(param)
    this.$router.push(param)
  },
  login(state) {
    // this.$auth.login()
    console.log('login ...')
    const loginResObj = this.$axios.post('/shop/user/login', {
      id: 'saecomaster',
    })
    loginResObj.then((res) => {
      this.$cookiz.set('userToken', res.data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      this.$cookiz.set('refreshToken', res.data.refreshToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    })
  },

  async getToken(state) {
    const userToken = this.$cookiz.get('userToken')
    try {
      const res = await this.$axios.get('/shop/user/check', {
        headers: {
          'x-access-token': userToken,
        },
      })
      console.log('check...')
      console.log(res)
      console.log('check sucess...')
    } catch (e) {
      if (e.response.status === 401) {
        console.log(e.response.data.msg)
        const refreshToken = this.$cookiz.get('refreshToken')
        const res = await this.$axios.get('/shop/user/refresh', {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-refresh-token': refreshToken,
          },
        })
        this.$cookiz.set('userToken', res.data.accessToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      } else {
        console.log('토큰에러 로그인 페이지로 이동')
      }
    }
  },
}

// export const actions = {
//   login(context) {
//     context.commit('islogin', true)
//   },
// }
