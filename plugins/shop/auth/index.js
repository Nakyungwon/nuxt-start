// import Authentication from '@/plugins/shop/auth/Auth'
import CognitoAuth from '@/plugins/shop/auth/Cognito'

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
    // domain: process.client ? location.host : process.env.baseUrl,
    // errorMessages: require(`@/locales/${locale}/errorMessages.json`),
  })
  // cognitoAuth.initialize()
  // cognitoAuth.initConfigure()
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
