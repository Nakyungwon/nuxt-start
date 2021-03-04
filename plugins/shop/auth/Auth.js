class Authentication {
  constructor({ Storage, $cookiz, expires = 30 } = {}) {
    this.Storage = Storage
    this.expires = expires
    this.cookiz = $cookiz
  }

  async login($axios, id) {
    // const loginResObj = $axios.post('/shop/user/login', {
    //   id,
    // })
    try {
      const apiResult = await this.callApi($axios, 'post', '/shop/user/login', {
        id,
      })
      this.setCookie('userToken', apiResult.data.accessToken)
      this.setCookie('refreshToken', apiResult.data.refreshToken)
      const userInfo = await this.callApiAuth(
        $axios,
        'get',
        '/shop/user/userInfo'
      )
      // if (res.status === 200) {
      return userInfo
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

  async callApiAuth($axios, method, url, param = {}, headers = {}, count = 0) {
    headers['x-access-token'] = this.getCookie('userToken')
    let result = null
    try {
      result = await this.callApi($axios, method, url, param, headers)
      // console.log(result)
    } catch (e) {
      if (e.response.status === 401) {
        console.info(e.response.data.msg)
        const isRefresh = await this.refreshToken(
          $axios,
          this.getCookie('refreshToken')
        )
        if (isRefresh && count < 5)
          return await this.callApiAuth(
            $axios,
            method,
            url,
            param,
            headers,
            ++count
          )
        else console.info('not auth')
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
      // console.log('get', url, headers, '호출')
      promiseObj = $axios.get(url, { headers }, { params: param })
    } else if (method === 'post') {
      // console.log('post', url, '호출')
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
    return this.cookiz.get(key)
  }

  async refreshToken($axios, refreshToken) {
    let isRefresh = null
    // const result =
    await $axios
      .get('/shop/user/refresh', {
        headers: {
          'x-refresh-token': refreshToken,
        },
      })
      .then((result) => {
        console.log('token refreshed!')
        this.setCookie('userToken', result.data.accessToken)
        isRefresh = true
      })
      .catch((e) => {
        console.error(e.response.data.msg)
        this.logout()
        isRefresh = false
      })

    return isRefresh

    // promiseObj
    //   .then((result) => {
    //     this.setCookie('userToken', result.accessToken)
    //     isRefresh = true
    //     console.log(isRefresh)
    //   })
    //   .catch((e) => {
    //     this.logout()
    //     isRefresh = false
    //     console.log(isRefresh)
    //   })
    // return promiseObj
  }
}

export default Authentication
