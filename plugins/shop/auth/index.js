import Authentication from '@/plugins/shop/auth/Auth'

export default async function ({ $axios, store, app, res, req }, inject) {
  const { $cookiz } = app
  // const refreshToken = $cookiz.get('refreshToken')
  // const accessToken = $cookiz.get('userToken')
  if (process.client) {
    // console.log(process.client)
    // const refreshToken = $cookiz.get('refreshToken')
    // const accessToken = $cookiz.get('userToken')
    const authentication = new Authentication({
      Storage: 'aaa',
      $cookiz,
      expires: 12312,
    })
    const userInfo = await authentication.callApiAuth(
      $axios,
      'get',
      '/shop/user/userInfo'
    )

    if (userInfo) {
      console.log('get userInfo')
      store.commit('shop/islogin', true)
      store.commit('shop/userInfo', userInfo.data.username)
    } else {
      console.log("can't get userInfo")
      store.commit('shop/islogin', false)
      store.commit('shop/userInfo', null)
    }
    inject('authentication', authentication)
  } else if (process.server) {
    // throw new Error('사용자 인증을 실패했습니다.')
    console.log('ssr 단계...')
    // console.log(req.headers.cookie)
    // console.log('111')
  }
}
