export default function ({ app, store, context, redirect, error }) {
  // auth 확인
  // if (!store.state.authToken) {
  //   console.log(app.$cookiz.get('refreshToken'))
  //   console.log(app.$cookiz.get('userToken'))
  //   return redirect('/shop')
  // }
  // 1.userToken에 값있는지 확인
  const refreshToken = app.$cookiz.get('refreshToken')
  const accessToken = app.$cookiz.get('userToken')
  if (!refreshToken) {
    store.state.loggedIn = false
    // 쿠키 싹다 비우기
  } else if (!accessToken) {
    try {
      const res = getTokkenwithrefreshToken(refreshToken)
      app.$cookiz.set('userToken', res.data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      const userInfoRes = getUserInfo(res.data.accessToken)
      store.state.username = userInfoRes.data.userName
      store.state.loggedIn = true
      // userinfo 호출
    } catch (e) {
      if (e.response.status === 401) {
        store.state.loggedIn = false
      }
    }
  } else {
    try {
      const userInfoRes = getUserInfo(accessToken)
      console.log(userInfoRes)
      store.state.username = userInfoRes.data.username
      store.state.loggedIn = true
    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        try {
          const res = getTokkenwithrefreshToken(refreshToken)
          app.$cookiz.set('userToken', res.data.accessToken, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
          const userInfoRes = getUserInfo(res.data.accessToken)
          store.state.username = userInfoRes.data.userName
          store.state.loggedIn = true
          // userinfo 호출
        } catch (e) {
          if (e.response.status === 401) {
            store.state.loggedIn = false
          }
        }
      }
    }
  }

  function getTokkenwithrefreshToken(refreshToken) {
    // app.$cookiz.set()
    // app.$axios()
    console.log('/shop/user/refresh 호출')
    console.log(refreshToken)
    const res = app.$axios.get('/shop/user/refresh', {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'x-refresh-token': refreshToken,
      },
    })
    res.then((obj) => {
      console.log(obj)
      return obj
    })
  }

  function getUserInfo(accessToken) {
    console.log('/shop/user/userInfo 호출')
    console.log(app.$axios)
    const res = app.$axios.get('/shop/user/userInfo', {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'x-access-token': accessToken,
      },
    })
    console.log('/shop/user/userInfo come')
    res
      .then((obj) => {
        console.log('------------------')
        console.log(obj)
        console.log('------------------')
        return obj
      })
      .catch((e) => {
        console.log('------------------')
        console.log(e)
      })
  }
}
