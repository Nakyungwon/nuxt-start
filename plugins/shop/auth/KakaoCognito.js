// import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { qs } from 'qs'
import CognitoAuth, {
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
  // CognitoUserSession,
  // CognitoService,
  // clearSessionStorage,
} from './Cognito'
// const qs = require('qs')
export const getAllCookies = () => {
  try {
    const pairs = document.cookie.split(';')
    const cookies = {}
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=')
      cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='))
    }
    return cookies
  } catch (err) {
    return {}
  }
}
export default class KakaoAuth extends CognitoAuth {
  // eslint-disable-next-line constructor-super
  constructor({
    Storage,
    UserPoolId,
    ClientId,
    prefix = '__mcbs__',
    domain = null,
    dev = null,
    errorMessages = null,
    expires = 30,
    Kakao,
  } = {}) {
    super(
      Storage,
      UserPoolId,
      ClientId,
      prefix,
      domain,
      dev,
      errorMessages,
      expires
    )
    this.kakao = Kakao
  }

  initialize() {
    // super.initialize(username, session);
    this.kakao.init('f75e3d96e5687692bf1fc46b5b360d41')
    // this.Kakao.isInitialized()
  }

  signInKakao(session) {
    try {
      if (
        !('AccessToken' in session) ||
        !('IdToken' in session) ||
        !('RefreshToken' in session)
      ) {
        throw new Error('토큰이 정확하지 않습니다. 토큰을 확인해주세요.')
      }
      return new Promise((resolve, reject) => {
        const newSession = this.getNewSession(session)
        const username = newSession.AccessToken.payload.username
        this.setDataInCookie(session.RefreshToken, username)
        resolve({
          token: session.RefreshToken,
          username,
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  getNewSession({ IdToken, AccessToken, RefreshToken }) {
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

  getUserInfo({ AccessToken }) {
    this.$axios.get('')
  }

  removeAllLegacyCookies() {
    try {
      const cookies = getAllCookies()
      const keys = Object.keys(cookies).filter((k) =>
        k.includes('CognitoIdentityServiceProvider')
      )
      if (keys.length > 0) {
        const refreshToken =
          cookies[keys.find((k) => k.includes('refreshToken'))]
        const username = cookies[keys.find((k) => k.includes('LastAuthUser'))]
        keys.map((k) => this.removeCookie(k))
        if (refreshToken && username) {
          this.setDataInCookie(refreshToken, username)
        }
        return true
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
