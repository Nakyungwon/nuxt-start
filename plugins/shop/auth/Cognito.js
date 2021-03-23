import Cookies from 'js-cookie'
import { encryptData, annotionTest } from '@/utils'
import {
  CognitoRefreshToken,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'
import Amplify from '@aws-amplify/core'
// import auth from '@/middleware/shop/user/auth'
// import AmplifyAuth from '@aws-amplify/auth'
// import { getAllCookies, addCookie, removeCookie } from './helpers/cookies'
export {
  CognitoRefreshToken,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  CognitoUserAttribute,
  AuthenticationDetails,
}
class CognitoAuth {
  constructor({
    Storage,
    UserPoolId,
    ClientId,
    prefix = '__mcbs__',
    domain = null,
    dev = null,
    errorMessages = null,
    expires = 30,
  } = {}) {
    this.userPool = new CognitoUserPool({
      UserPoolId,
      ClientId,
      Storage,
    })
    this.Storage = Storage
    this.dev = dev
    this.prefix = prefix
    this.expires = expires
    this.cognitoUser = false
    this.domain = domain
    this.errorMessages = errorMessages
  }

  initialize(username, session) {
    this.setCognitoUser(this.getCognitoUser(username), session)
  }

  initConfigure(config) {
    // for third party ex) facebook
    Amplify.configure(config)
  }

  getCognitoUser(Username) {
    try {
      if (!Username) {
        throw new Error('Username이 존재하지 않습니다.')
      }
      const userData = {
        Username,
        Pool: this.userPool,
        Storage: this.Storage,
      }
      return new CognitoUser(userData)
    } catch (err) {
      console.error(err)
    }
  }

  setCognitoUser(cognitoUser, session) {
    try {
      const getNewSession = ({ IdToken, AccessToken, RefreshToken }) => {
        return {
          IdToken: new CognitoIdToken({
            IdToken,
          }),
          AccessToken: new CognitoAccessToken({
            AccessToken,
          }),
          RefreshToken: new CognitoRefreshToken({
            RefreshToken,
          }),
        }
      }
      // console.log(getNewSession)
      const tokens = getNewSession({
        IdToken: session.idToken.jwtToken,
        RefreshToken: session.refreshToken.token,
        AccessToken: session.accessToken.jwtToken,
      })
      this.cognitoUser = cognitoUser
      this.cognitoUser.setSignInUserSession(
        new CognitoUserSession({
          ...tokens,
          ClockDrift: session.clockDrift,
        })
      )
      if (process.client) {
        this.clearSessionStorage()
      }
    } catch (err) {
      console.error(err)
    }
  }

  //
  // validatePassword({ username, password }) {
  //   if (!username || !password) {
  //     throw new Error('validatePassword 메서드 파라미터 값을 확인하세요.')
  //   }
  //   const tmpCognitoUser = this.getCognitoUser(username)
  //   const authenticationData = {
  //     Username: username,
  //     Password: password,
  //   }
  //   const authenticationDetails = new AuthenticationDetails(authenticationData)
  //   return new Promise((resolve, reject) => {
  //     return tmpCognitoUser.authenticateUser(authenticationDetails, {
  //       onSuccess: async (session) => {
  //         resolve(true)
  //       },
  //       onFailure(err) {
  //         reject(err)
  //       },
  //     })
  //   })
  // }
  //
  @annotionTest
  test() {
    console.log('annotation mother')
  }

  signIn(username, password) {
    try {
      if (!username || !password) {
        throw new Error('signIn 메서드 파라미터 값을 확인하세요.')
      }
      const tmpCognitoUser = this.getCognitoUser(username)
      const authenticationData = {
        Username: username,
        Password: password,
      }
      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      )
      return new Promise((resolve, reject) => {
        return tmpCognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            const tokens = this.getTokens(session)
            console.log(tokens)
            const { refreshToken } = tokens
            this.setDataInCookie(refreshToken, username)
            resolve({ userData: this.getUserData(session), tokens })
          },
          onFailure: (err) => {
            console.error(err)
            reject(this.errorMessages[err.code])
          },
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  // signUp({
  //   email: username,
  //   password,
  //   nationality,
  //   terms: {
  //     agree_service = true,
  //     agree_privacy = true,
  //     agree_email = false,
  //     agree_sms = false,
  //     agree_push = false,
  //   },
  // } = {}) {
  //   const attributeList = [
  //     new CognitoUserAttribute({
  //       Name: 'custom:nationality',
  //       Value: String(nationality),
  //     }),
  //     new CognitoUserAttribute({
  //       Name: 'email',
  //       Value: username,
  //     }),
  //     new CognitoUserAttribute({
  //       Name: 'custom:agree_service',
  //       Value: String(agree_service),
  //     }),
  //     new CognitoUserAttribute({
  //       Name: 'custom:agree_privacy',
  //       Value: String(agree_privacy),
  //     }),
  //     new CognitoUserAttribute({
  //       Name: 'custom:agree_email',
  //       Value: String(agree_email),
  //     }),
  //     new CognitoUserAttribute({
  //       Name: 'custom:agree_sms',
  //       Value: String(agree_sms),
  //     }),
  //     new CognitoUserAttribute({
  //       Name: 'custom:agree_push',
  //       Value: String(agree_push),
  //     }),
  //   ]
  //   return new Promise((resolve, reject) => {
  //     this.userPool.signUp(
  //       username,
  //       password,
  //       attributeList,
  //       null,
  //       (err, result) => {
  //         if (err) {
  //           reject(this.errorMessages[err.code])
  //         } else {
  //           resolve(result)
  //         }
  //       }
  //     )
  //   })
  // }
  //
  // federatedSignIn(params) {
  //   AmplifyAuth.federatedSignIn(params)
  // }
  //
  // signInProvider(refreshToken, username) {
  //   this.setDataInCookie(refreshToken, username)
  // }
  //
  signOut() {
    try {
      this.removeAllSessionCookies()
    } catch (err) {
      console.error(err)
    }
  }

  //
  // getUserDataByToken(accessToken, idToken) {
  //   const {
  //     payload: { username, exp },
  //   } = new CognitoAccessToken({
  //     AccessToken: accessToken,
  //   })
  //   const { payload } = new CognitoIdToken({
  //     IdToken: idToken,
  //   })
  //   return {
  //     username,
  //     exp,
  //     info: payload,
  //   }
  // }
  //
  getUserData(session) {
    const { username, exp } = session.accessToken.payload
    console.log('username', username)
    console.log('exp', exp)
    const info = session.idToken.payload
    return {
      username,
      exp,
      info,
    }
  }

  getTokens(session) {
    return {
      accessToken: session.getAccessToken().getJwtToken(),
      idToken: session.getIdToken().getJwtToken(),
      refreshToken: session.getRefreshToken().getToken(),
    }
  }

  //
  // // getTokensInStorage() {
  // //   const keys = Object.keys(sessionStorage).filter(
  // //     (s) => s.includes('CognitoIdentityServiceProvider') && s.includes('Token')
  // //   )
  // //   return this.getCognitoSessionToken(
  // //     keys.reduce((acc, curr) => {
  // //       const key = curr.split('.').pop()
  // //       acc[key] = sessionStorage.getItem(curr)
  // //       return acc
  // //     }, {})
  // //   )
  // // }
  setDataInCookie(token, username = this.cognitoUser.username) {
    // const tokenName = `${this.prefix}t`
    // const user = `${this.prefix}n`
    // const userdata = encryptData(username)
    // const domain = this.dev ? undefined : this.domain
    // const refreshToken = encryptData({ token, username: userdata })
    const tokenName = `${this.prefix}t`
    console.log('tokenName', tokenName)
    const user = `${this.prefix}n`
    console.log('user', user)
    const userdata = encryptData(username)
    console.log('userdata', userdata)
    const domain = this.dev ? undefined : this.domain
    console.log('domain', domain)
    const refreshToken = encryptData({ token, username: userdata })
    console.log('refreshToken', refreshToken)
    Cookies.set(tokenName, refreshToken, {
      expires: this.expires,
      domain,
    })
    Cookies.set(user, userdata, { expires: this.expires, domain })
  }

  removeDataInCookie() {
    const tokenName = `${this.prefix}t`
    const user = `${this.prefix}n`
    const sessionName = `${this.prefix}s`
    this.removeCookie(tokenName)
    this.removeCookie(user)
    this.removeCookie(sessionName)
  }

  getAllCookies() {}

  removeCookie(name) {
    const options = {
      domain: this.dev ? undefined : this.domain,
    }
    Cookies.remove(decodeURIComponent(name), options)
    // removeCookie(name, options)
  }

  removeAllSessionCookies() {
    const name = `${this.$prefix}s`
    this.removeDataInCookie()
    this.removeCookie(name)
  }

  setRefreshSessionCookie() {
    const name = `${this.prefix}s`
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000)
    const domain = this.dev ? undefined : this.domain
    Cookies.set(name, 1, {
      expires,
      domain,
    })
  }

  //
  // hasRefreshSessionCookie() {
  //   return !!Cookies.get('__staypia__s')
  // }
  //
  // validateUserSession() {
  //   return Cookies.get('__staypia__t') && Cookies.get('__staypia__n')
  // }
  //
  refreshTokens(RefreshToken, username) {
    return new Promise((resolve, reject) => {
      const tmpCognitoUser = this.getCognitoUser(username)
      tmpCognitoUser.refreshSession(
        new CognitoRefreshToken({ RefreshToken }),
        (error, session) => {
          if (error) {
            reject(error)
          } else {
            this.setCognitoUser(tmpCognitoUser, session)
            resolve({ userData: this.getUserData(session), session })
          }
        }
      )
    })
  }

  //
  // forgotPassword(username) {
  //   const tmpUser = this.getCognitoUser(username)
  //   return new Promise((resolve, reject) => {
  //     tmpUser.forgotPassword({
  //       onSuccess(result) {
  //         resolve(result)
  //       },
  //       onFailure: ({ code }) => {
  //         reject(this.errorMessages[code])
  //       },
  //     })
  //   })
  // }
  //
  // changePassword(oldPassword, newPassword) {
  //   if (!this.cognitoUser) {
  //     throw new Error('유저 데이터가 존재하지 않습니다.')
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.cognitoUser.changePassword(oldPassword, newPassword, (err, res) => {
  //       if (err) {
  //         // 내 정보 수정 호 변경시 메세지
  //         // if (err.code === 'NotAuthorizedException') {
  //         //   reject('현재 비밀번호가 일치하지 않습니다<br />다시 확인해주세요')
  //         // }
  //         if (err.code === 'NotAuthorizedException') {
  //           reject(this.errorMessages['NotAuthorizedException-changepassword'])
  //           return
  //         }
  //         reject(this.errorMessages[err.code])
  //       }
  //       resolve(res)
  //     })
  //   })
  // }
  //
  // confirmPassword({ code, username, password }) {
  //   const tmpUser = this.getCognitoUser(username)
  //   return new Promise((resolve, reject) => {
  //     tmpUser.confirmPassword(code, password, {
  //       onSuccess(result) {
  //         resolve(result)
  //       },
  //       onFailure: ({ code }) => {
  //         reject(this.errorMessages[code])
  //       },
  //     })
  //   })
  // }
  //
  // updateAttribute(attribute) {
  //   return new CognitoUserAttribute(attribute)
  // }
  //
  // updateAttributes(attributes) {
  //   try {
  //     if (!this.cognitoUser) {
  //       throw new Error('유저 데이터가 존재하지 않습니다.')
  //     }
  //     const list = attributes.map((attribute) =>
  //       this.updateAttribute(attribute)
  //     )
  //     return new Promise((resolve, reject) => {
  //       this.cognitoUser.updateAttributes(list, (err, res) => {
  //         if (err) {
  //           reject(err)
  //         }
  //         resolve(res)
  //       })
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  //
  // deleteUser() {
  //   try {
  //     if (!this.cognitoUser) {
  //       throw new Error('유저 데이터가 존재하지 않습니다.')
  //     }
  //     return new Promise((resolve, reject) => {
  //       this.cognitoUser.deleteUser((err, res) => {
  //         if (err) {
  //           reject(err)
  //         } else {
  //           resolve()
  //         }
  //       })
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  //
  // resendConfirmationCode() {
  //   try {
  //     if (!this.cognitoUser) {
  //       throw new Error('유저 데이터가 존재하지 않습니다.')
  //     }
  //     return new Promise((resolve, reject) => {
  //       this.cognitoUser.getAttributeVerificationCode('email', {
  //         onSuccess() {
  //           resolve()
  //         },
  //         onFailure: (err) => {
  //           const { code } = err
  //           console.error(err)
  //           reject(this.errorMessages[code])
  //         },
  //       })
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  //
  // verifyAttribute(code) {
  //   try {
  //     if (!this.cognitoUser) {
  //       throw new Error('유저 데이터가 존재하지 않습니다.')
  //     }
  //     return new Promise((resolve, reject) => {
  //       this.cognitoUser.verifyAttribute('email', code, {
  //         onSuccess() {
  //           resolve()
  //         },
  //         onFailure: (err) => {
  //           const { code } = err
  //           console.error(err)
  //           reject(this.errorMessages[code])
  //         },
  //       })
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  //
  clearSessionStorage() {
    const keys = Object.keys(sessionStorage).filter((s) =>
      s.includes('CognitoIdentityServiceProvider')
    )
    keys.map((key) => sessionStorage.removeItem(key))
  }
}

export default CognitoAuth
