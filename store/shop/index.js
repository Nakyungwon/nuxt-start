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
  authToken: null,
  username: null,
  loggedIn: null,
})

export const getters = {
  test(state) {
    return 'test getter'
  },
}

export const mutations = {
  // islogin(state, isParam) {
  //   state.loggedIn.push(isParam)
  // },

  // userInfo(state, username) {
  //   state.username.push(username)
  // },

  addMain(state) {
    state.main_products.push(require('@/assets/images/main/1055748554.jpg'))
  },
  renderPage(state, param) {
    console.log(param)
    this.$router.push(param)
  },
  login(state) {
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

export const actions = {}
// getUserInfo(context) {
// const refreshToken = this.$cookiz.get('refreshToken')
// const accessToken = this.$cookiz.get('userToken')
// if (!refreshToken) {
//   // store.state.loggedIn = false
//   context.commit('islogin', false)
//   // 쿠키 싹다 비우기
// } else if (!accessToken) {
//   try {
//     const res = getTokkenwithrefreshToken(refreshToken)
//     this.$cookiz.set('userToken', res.data.accessToken, {
//       path: '/',
//       maxAge: 60 * 60 * 24 * 7,
//     })
//     const userInfoRes = getUserInfo(res.data.accessToken)
//     // store.state.username = userInfoRes.data.userName
//     // store.state.loggedIn = true
//     context.commit('userInfo', userInfoRes.data.userName)
//     context.commit('islogin', true)
//     // userinfo 호출
//   } catch (e) {
//     if (e.response.status === 401) {
//       // store.state.loggedIn = false
//       context.commit('islogin', false)
//     }
//   }
// } else {
//   try {
//     const userInfoRes = getUserInfo(accessToken)
//     console.log(userInfoRes)
//     // store.state.username = userInfoRes.data.username
//     // store.state.loggedIn = true
//     context.commit('userInfo', userInfoRes.data.userName)
//     context.commit('islogin', true)
//   } catch (e) {
//     console.log(e)
//     if (e.response.status === 401) {
//       try {
//         const res = getTokkenwithrefreshToken(refreshToken)
//         this.$cookiz.set('userToken', res.data.accessToken, {
//           path: '/',
//           maxAge: 60 * 60 * 24 * 7,
//         })
//         const userInfoRes = getUserInfo(res.data.accessToken)
//         // store.state.username = userInfoRes.data.userName
//         // store.state.loggedIn = true
//         context.commit('userInfo', userInfoRes.data.userName)
//         context.commit('islogin', true)
//         // userinfo 호출
//       } catch (e) {
//         if (e.response.status === 401) {
//           // store.state.loggedIn = false
//           context.commit('islogin', false)
//         }
//       }
//     }
//   }
// }
// },

//
// function getTokkenwithrefreshToken(refreshToken) {
//   console.log('/shop/user/refresh 호출')
//   console.log(refreshToken)
//   const res = this.$axios.get('/shop/user/refresh', {
//     headers: {
//       'x-refresh-token': refreshToken,
//     },
//   })
//   res.then((obj) => {
//     console.log(obj)
//     return obj
//   })
// }
//
// function getUserInfo(accessToken) {
//   console.log('/shop/user/userInfo 호출')
//   const res = this.$axios.get('/shop/user/userInfo', {
//     headers: {
//       'x-access-token': accessToken,
//     },
//   })
//   console.log('/shop/user/userInfo come')
//   res
//     .then((obj) => {
//       console.log('------------------')
//       console.log(obj)
//       console.log('------------------')
//       return obj
//     })
//     .catch((e) => {
//       console.log('------------------')
//       console.log(e)
//     })
// }
