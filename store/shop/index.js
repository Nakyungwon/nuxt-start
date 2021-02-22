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
  ],
  bottom_menus: [{ name: 'ACC' }, { name: 'BOTTOM' }, { name: 'TOP' }],
})

export const mutations = {
  addMain(state) {
    state.main_products.push(require('@/assets/images/main/1055748554.jpg'))
  },
  renderPage(state, param) {
    console.log(param)
    this.$router.push(param)
  },
  login(state) {
    console.log('login ...')
    const loginResObj = this.$axios.post('/shop/user/login', {})
    loginResObj.then((res) => {
      // console.log(res.data.token_key)
      this.$cookiz.set('user_token', res.data.token_key, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    })
  },
  getToken(state) {
    const token = this.$cookiz.get('user_token')
    const jwtSecret = 'SeCrEtKeYfOrHaShInG'
    const checkToken = new Promise((resolve, reject) => {
      this.$jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err) reject(err)
        resolve(decoded)
      })
    })
    checkToken.then((token) => {
      console.log(token)
    })
    // const tokenObj = this.$axios.get('/shop/user/check', {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'x-access-token': token,
    //   },
    // })

    // tokenObj.then((res) => {
    //   console.log(res)
    // })
  },
}
