// const strategy = 'local'
// const FALLBACK_INTERVAL = 900 * 1000 * 0.75

// async function refreshToken($auth, $axios, token, refreshToken) {}
export function loginddd() {
  console.log('aaaaaaaa')
}
// import Cookies from 'js-cookie'

export default async function ({ $axios, store, app }, inject) {
  const { $cookiz } = app
  const refreshToken = $cookiz.get('refreshToken')
  const accessToken = $cookiz.get('userToken')
  console.log('-----------')
  console.log(process.server)
  console.log(process.client)
  console.log('-----------')
  if (!refreshToken) {
    // store.state.loggedIn = false
    console.log('refresh token 없음')
    store.commit('shop/islogin', false)
    // sessionStorage.setItem('test', null)
    // console.log(sessionStorage.getItem('test'))
    $cookiz.set('userToken', null)
    $cookiz.set('refreshToken', null)
    // Cookies.set('userToken', null)
    // Cookies.set('refreshToken', null)
    // location.reload()
    // 쿠키 싹다 비우기
  } else if (!accessToken) {
    try {
      console.log('access token 없음')
      const res = await getTokkenwithrefreshToken($axios, refreshToken)
      const userInfoRes = await getUserInfo($axios, res.data.accessToken)
      // store.state.username = userInfoRes.data.username
      // store.state.loggedIn = true
      store.commit('shop/userInfo', userInfoRes.data.username)
      store.commit('shop/islogin', true)
      // userinfo 호출
    } catch (e) {
      if (e.response.status === 401) {
        // store.state.loggedIn = false
        store.commit('shop/islogin', false)
      }
    }
  } else {
    try {
      console.log('access token 접근시도 ..')
      const userInfoRes = await getUserInfo($axios, accessToken)
      store.commit('shop/userInfo', userInfoRes.data.username)
      store.commit('shop/islogin', true)
    } catch (e) {
      if (e.response.status === 401) {
        console.log('access token 접근시도 실패..')
        console.log('refresh token 접근 시도..')
        try {
          const res = await getTokkenwithrefreshToken($axios, refreshToken)
          $cookiz.set('userToken', res.data.accessToken, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
          console.log('3')
          const userInfoRes = await getUserInfo($axios, res.data.accessToken)
          console.log(userInfoRes.data.username)
          // userinfo 호출
        } catch (e) {
          if (e.response.status === 401) {
            // store.state.loggedIn = false
            store.commit('shop/islogin', false)
          }
        }
      }
    }
  }
}

function getTokkenwithrefreshToken($axios, refreshToken) {
  console.log('/shop/user/refresh 호출')
  const res = $axios.get('/shop/user/refresh', {
    headers: {
      'x-refresh-token': refreshToken,
    },
  })
  // res
  //   .then((obj) => {
  //     return obj
  //   })
  //   .catch((e) => {
  //     return e
  //   })
  return res
}

function getUserInfo($axios, accessToken) {
  console.log('/shop/user/userInfo 호출')
  const res = $axios.get('/shop/user/userInfo', {
    headers: {
      'x-access-token': accessToken,
    },
  })
  // res
  //   .then((obj) => {
  //     return obj
  //   })
  //   .catch((e) => {
  //     return e
  //   })
  return res
}
