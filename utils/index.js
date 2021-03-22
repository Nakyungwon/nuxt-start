import CryptoJS from 'crypto-js'

export const encryptData = (data, key = process.env.cryptoKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

export const decryptData = (str, key = process.env.cryptoKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(str, key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (err) {
    return null
  }
}

export const getCookie = (cookieName, stringCookie) => {
  try {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)

    // console.log('strCookie', strCookie)

    strCookie = strCookie ? strCookie[0] : null

    return unescape(
      strCookie ? strCookie.toString().replace(/^[^=]+./, '') : ''
    )
  } catch (err) {
    return null
  }
}

export const annotionTest = () => {
  console.log('annotation Son')
}
