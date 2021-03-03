class Authentication {
  constructor({ Storage, $cookiz, expires = 30 } = {}) {
    this.Storage = Storage
    this.expires = expires
    this.cookiz = $cookiz
  }

  async login($axios, id) {
    console.log('login .....')
    // const loginResObj = $axios.post('/shop/user/login', {
    //   id,
    // })
    try {
      const apiResult = await this.callApi($axios, 'post', '/shop/user/login', {
        id,
      })
      console.log(apiResult.data.accessToken)
      console.log(apiResult.data.refreshToken)
      this.setCookie('userToken', apiResult.data.accessToken)
      this.setCookie('refreshToken', apiResult.data.refreshToken)
      // if (res.status === 200) {
      console.log(apiResult)
      return true
    } catch (e) {
      console.log('login 실패..')
      console.log(e)
      return false
    }

    // callApiPromise
    //   .then((result) => {
    //     console.log(result.data.accessToken)
    //     console.log('login 성공..')
    //     this.setCookie('userToken', result.data.accessToken)
    //     this.setCookie('refreshToken', result.data.refreshToken)
    //   })
    //   .catch((e) => {
    //     console.log(e.response)
    //     console.log('login 실패..')
    //   })

    // } else {
    //   console.log('login 실패 ..')
    // }
  }

  logout() {
    this.setCookie('userToken', null)
    this.setCookie('refreshToken', null)
  }

  async callApiAuth($axios, method, url, param = {}, headers = {}) {
    headers['x-access-token'] = this.getCookie('userToken')
    let result = null
    try {
      result = await this.callApi($axios, method, url, param, headers)
    } catch (e) {
      if (e.response.status === 401) {
        console.error('auth 만료 error')
        this.refreshToken($axios, this.getCookie('refreshToken'))
        // this.callApiAuth($axios, method, url, param, headers)
      } else {
        console.error('error')
      }
    }
    return result
  }

  callApi($axios, method, url, param = {}, headers = {}) {
    /*
      호출 with accessToken
      token 만료
    */

    // axios.get('/api', {
    //   params: {
    //     foo: 'bar',
    //   },
    // })
    let promiseObj = null
    if (method === 'get') {
      console.log('get', url, headers, '호출')
      promiseObj = $axios.get(url, param, headers)
    } else if (method === 'post') {
      console.log('post', url, '호출')
      promiseObj = $axios.post(url, param, headers)
    }

    return promiseObj
    // .then((result) => {
    //   console.log('succecc call Api..')
    //   return result
    // })
    // .catch((e) => {
    //   console.log(e.response.status)
    //   return e.response
    // })
  }

  setCookie(key, value) {
    this.cookiz.set(key, value, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  getCookie(key) {
    console.log('getcookie')
    return this.cookiz.get(key)
  }

  refreshToken($axios, refreshToken) {
    const promiseObj = $axios.get('/shop/user/refresh', {
      headers: {
        'x-refresh-token': refreshToken,
      },
    })
    promiseObj
      .then((result) => {
        this.setCookie('userToken', result.accessToken)
      })
      .catch((e) => {
        console.log(e.response.status)
        console.log('refreshTokken 만료')
        this.logout()
      })
  }
}

export default Authentication
