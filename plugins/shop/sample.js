export const setAuthToken = ($axios, token = '-') => {
  // $axios.defaults.headers.common.token = token
  console.log('setAuthToken')
}
export default function ({ $axios, app, store }, inject) {
  // const axios = $axios.create({
  //   baseURL: 'http://localhost:5000',
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
  // })
  console.log('hi')
  $axios
    .get('/shop/user/test')
    .then(function (response) {
      // handle success
      console.log('success')
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
  a()
  // console.log(res)
  // const a = store.getters['shop/test']
  // console.log(a)
}

function a() {
  console.log('aa')
}
