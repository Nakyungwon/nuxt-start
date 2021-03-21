// import Authentication from '@/plugins/shop/auth/Auth'
// import Cookies from 'js-cookie'
import CognitoAuth from '@/plugins/shop/auth/Cognito'
import { decryptData, getCookie } from '@/utils'

// export default async function ({ $axios, store, app, res, req }, inject) {
export default function ({ $axios, store, app, res, req }, inject) {
  // const { $cookiz } = app
  // const refreshToken = $cookiz.get('refreshToken')
  // const accessToken = $cookiz.get('userToken')

  const cognitoAuth = new CognitoAuth({
    dev: process.env.NODE_ENV === 'development',
    Storage: process.client ? sessionStorage : null,
    UserPoolId: process.env.AWS_COGNITO_POOL_ID,
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    // prefix: '__staypia__',
    domain: process.client ? location.host : process.env.BASE_URL,
    // errorMessages: require(`@/locales/${locale}/errorMessages.json`),
  })
  // cognitoAuth.initialize()
  // cognitoAuth.initConfigure()
  if (process.server) {
    console.log('servere..')
    // console.log(req.headers.cookie)
    try {
      const data = decryptData(getCookie('__mcbs__t', req.headers.cookie))
      const name = getCookie('__mcbs__n', req.headers.cookie)
      if (!data || !name) {
        throw new Error('사용자 인증을 실패했습니다.')
      }
      if (data) {
        const { token, username } = data
        if (username === name) {
          store.commit('shop/SET_SESSION', {
            token,
            name: decryptData(name),
          })
        } else {
          throw new Error(
            '비정상적인 인증 처리가 들어왔습니다. 예외처리합니다.'
          )
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err)
      }
    }
  }

  if (process.client) {
    console.log('client')
    const { username, session } = store.state.shop
    console.log(username)
    console.log(session)
    // if (session) {
    //   cognitoAuth.initialize(username, session)
    //   cognitoAuth.setRefreshSessionCookie()
    // setInterval(() => {
    //   if (!cognitoAuth.validateUserSession()) {
    //     cognitoAuth.removeAllSessionCookies()
    //     location.href = '/'
    //   }
    // }, 1000)
    //
    // if (cognitoAuth.hasRefreshSessionCookie()) {
    //   setInterval(() => {
    //     if (!cognitoAuth.hasRefreshSessionCookie()) {
    //       location.reload()
    //     }
    //   }, 1000)
    // }
    // }
    // 라우터를 이동했을 때
    // vuex 스토어에 세션이 존재하지 않지만 쿠키에 토큰을 가지고 있는 경우
    // 페이지 갱신 시킨다.
    // chrome disk cache로 인해 라우트 이동을 할 때
    // 쿠키가 넘어가지 않아 로그인이 풀리는 이슈가 발생
    // 결과페이지 -> sns 로그인 -> 상세페이지 -> 결과페이지
    // app.router.afterEach(function (to, from) {
    //   const { path } = to
    //
    //   if (path.includes('/search/result') && to.name === 'hotel-name') {
    //     if (!session && Cookies.get('__mcbs__t')) {
    //       location.reload()
    //     }
    //   }
    // })
  }
  inject('cognitoAuth', cognitoAuth)

  // if (process.client) {
  //   // console.log(process.client)
  //   // const refreshToken = $cookiz.get('refreshToken')
  //   // const accessToken = $cookiz.get('userToken')
  //   const authentication = new Authentication({
  //     Storage: 'aaa',
  //     $cookiz,
  //     expires: 12312,
  //   })
  //   const userInfo = await authentication.callApiAuth(
  //     $axios,
  //     '/shop/user/userInfo'
  //   )
  //
  //   if (userInfo) {
  //     console.log('get userInfo')
  //     store.commit('shop/islogin', true)
  //     store.commit('shop/userInfo', userInfo.data.username)
  //   } else {
  //     console.log("can't get userInfo")
  //     store.commit('shop/islogin', false)
  //     store.commit('shop/userInfo', null)
  //   }
  //   inject('authentication', authentication)
  // } else if (process.server) {
  //   // throw new Error('사용자 인증을 실패했습니다.')
  //   console.log('ssr 단계...')
  //   // console.log(req.headers.cookie)
  //   // console.log('111')
  // }
}
