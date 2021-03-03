// const strategy = 'local'
// const FALLBACK_INTERVAL = 900 * 1000 * 0.75

// async function refreshToken($auth, $axios, token, refreshToken) {}
import Authentication from '@/plugins/shop/auth/Auth'

export function loginddd() {
  console.log('aaaaaaaa')
}
// import Cookies from 'js-cookie'

export default async function ({ $axios, store, app, res, req }, inject) {
  const { $cookiz } = app
  // const refreshToken = $cookiz.get('refreshToken')
  // const accessToken = $cookiz.get('userToken')
  if (process.client) {
    // console.log(process.client)
    // const refreshToken = $cookiz.get('refreshToken')
    // const accessToken = $cookiz.get('userToken')
    const auth = new Authentication({ Storage: 'aaa', $cookiz, expires: 12312 })
    console.log('---------------')
    await auth.callApiAuth($axios, 'get', '/shop/user/userInfo')
    // console.log(userInfo)
    inject('authentication', auth)
  } else if (process.server) {
    // throw new Error('사용자 인증을 실패했습니다.')
    console.log('ssr 단계...')
    // console.log(req.headers.cookie)
    // console.log('111')
  }
}
