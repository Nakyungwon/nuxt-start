const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const rp = require('request-promise')
// const jwk = {
//   keys: [
//     {
//       alg: 'RS256',
//       e: 'AQAB',
//       kid: '5fpbQzkuxLEWUC+vPW2Drn6IphyUQ3YlTRv5KijLCtE=',
//       kty: 'RSA',
//       n:
//         'wvghiynvVLNXW8D5NK0HKFF-aeF-WREe-1Fk27nVB5Y9_tyI4PFKp-Mw6_CTRL_woIErOokN5LSJXbRy0oVUL-QwVKxeFADygyG5B7xpdo19i61HzVHhII2xAnWrAO4jkJp3IaUAkTiN5uQ8FnRpTk4Ok5962Yz2ArCXuE5KUmAZl_YaBVpDTeMTjW-Ab-SWPkqwjs1G8Vt4F0S1c6hZGsn7Xrrs6Ty-SRkv085fb-KMMQS_BoT9FceA9rgTIl1ekWax4sTK4hwpa7ixPQxRZfysRFsP0e_AggR9jqrYzlT_wsanNh8oooXLxXDE42R8k8eVmWm4vLks4m3n9SIZUQ',
//       use: 'sig',
//     },
//     {
//       alg: 'RS256',
//       e: 'AQAB',
//       kid: '4jJT7VMvS+RzEvh9CmaV9B4rBmClCAsTqprJcTNywNo=',
//       kty: 'RSA',
//       n:
//         '0L1Wnq4cs3WRXkjFp-mnmomMvdBO-3epxFD3M5AgQ6Tw4PRl23lb8-so1cdRwGrsmC6YKc2Ju-xRbPNQW23tD9buZL46petxtGcfS64sFDRRQFpbGUWkDLSZKpzdwxCAreTJqOWC3qcifmYa7zl1ToMqUIrQ--u-YxPxdnJBbwV4EpCfBX6lZZCkUlqTA3fquO1OeKZ-9AQlnesBE0ewyxM5lEleRYBe9_kVAFTXUC5gJzk-6R7j6x1Tp6mlYdlUfISh405FH5-BzPasnt88LS2tiTOt3c03mkaSbnveT9lBwpNcmD4VYWEauvJfLCMniqktWNkmu-gHvRPO-ost0Q',
//       use: 'sig',
//     },
//   ],
// }
const jwkToPem = require('jwk-to-pem')
const AWS = require('aws-sdk')
// require('cross-fetch/polyfill')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const poolData = {
  UserPoolId: 'ap-northeast-2_uw25GdjVy', // Your user pool id here
  ClientId: '4coqbluqj327cgc86qqh9eieav', // Your client id here
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
// const credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'ap-northeast-2_uw25GdjVy',
// })
// console.log(credentials)
// AWS.config.credentials = credentials
// AWS.config.region = 'ap-northeast-2'

// const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()
const users = [
  { id: 'saecomaster', name: 'kyungwon-na' },
  { id: 'gogo', name: '2jieun' },
]

router.post('/signIn', (req, res, next) => {
  const attributeList = []

  const dataEmail = {
    Name: 'email',
    Value: 'saecomaster@naver.com',
  }

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  )
  // const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
  //   dataPhoneNumber
  // )

  attributeList.push(attributeEmail)
  // attributeList.push(attributePhoneNumber)
  userPool.signUp(
    'saecomaster',
    'sksmssk12!',
    attributeList,
    null,
    function (err, result) {
      if (err) {
        console.log(err.message || JSON.stringify(err))
        // return
        res.json({ msg: 'error' })
        return
      }
      const cognitoUser = result.user
      console.log('user name is ' + cognitoUser.getUsername())
      res.json({ msg: 'succescc' })
    }
  )
})

router.post('/signConfirm', (req, res, next) => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const userData = {
    Username: 'saecomaster',
    Pool: userPool,
  }

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.confirmRegistration('674860', true, function (err, result) {
    if (err) {
      res.json({ msg: 'error' })
      return
    }
    res.json({ msg: 'success' })
    console.log('call result: ' + result)
  })
})

router.post('/generateToken', (req, res, next) => {
  const authenticationData = {
    Username: 'saecomaster',
    Password: 'sksmssk12!',
  }
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  )
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const userData = {
    Username: 'saecomaster',
    Pool: userPool,
  }
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess(result) {
      const accessToken = result.getAccessToken().getJwtToken()
      const idToken = result.getIdToken().getJwtToken()
      const refreshToken = result.getRefreshToken()
      console.log(refreshToken)

      // POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = 'ap-northeast-2'

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-2:46e37bba-5b48-40c2-b539-54bbf6e0cfbe', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          // 'cognito-idp:ap-northeast-2:412412730148:userpool/ap-northeast-2_uw25GdjVy': result
          //   .getIdToken()
          //   .getJwtToken(),
          'cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_uw25GdjVy': idToken,
        },
        LoginId: 'saecomaster@naver.com',
      })

      // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error)
          res.json({ msg: 'error', accessToken })
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();

          // cognitoUser.getUserAttributes(function (err, result) {
          //   if (err) {
          //     console.log(err.message || JSON.stringify(err))
          //     res.json({ msg: 'error' })
          //     return
          //   }
          //   result.forEach((el) => {
          //     console.log(
          //       'attribute ' + el.getName() + ' has value ' + el.getValue()
          //     )
          //     // res.json({ msg: 'success' })
          //   })
          // })

          res.json({ msg: 'success', accessToken, refreshToken, idToken })
        }
      })
    },

    onFailure(err) {
      console.log(err.message || JSON.stringify(err))
    },
  })
})

router.post('/refreshTokenVerify', (req, res, next) => {
  const token =
    'eyJraWQiOiI0akpUN1ZNdlMrUnpFdmg5Q21hVjlCNHJCbUNsQ0FzVHFwckpjVE55d05vPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2YjE5ODIzYy00OTllLTQ4MzAtOGZhZC05MzVlMTM1YTk3YjEiLCJldmVudF9pZCI6IjUxYTY4YjYzLTcwY2MtNDhmNi05NDNkLWFiNjFlMTA5YzFjMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTYxMjk0MTksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMl91dzI1R2RqVnkiLCJleHAiOjE2MTYxMzMwMTksImlhdCI6MTYxNjEyOTQxOSwianRpIjoiZjIxZmIwODgtM2E5OC00OWRjLTlkZjQtNjNiNGNjODA1NDM3IiwiY2xpZW50X2lkIjoiNGNvcWJsdXFqMzI3Y2djODZxcWg5ZWllYXYiLCJ1c2VybmFtZSI6InNhZWNvbWFzdGVyIn0.evTEV4fdbDDKrqD-WPDlot1gd47L8-kQB7F_x-mdsbLn-TQYym2fKGGWWrDWW3s7re4kFSS7rrGavyD95FKTCYAUd2HzhW1knbKpCFE4y3FqfQ9a04bSjFRDOgbtDgSyGbpBoXyE_XPSOXdIoadtb2kqJerLLAYBcgKKzkFuDD0OhcVnAjoEteWEOutBKsfk5hwxJLAkkcqZb1wqYQ7SDdkl3C85GqAAtubpUVZJmXgihNuLscv8vhE5oHN8KpTQ-IMDM-jcTmxkaXmUEbX2TgZrMed_AZfUSRWhNyn7UOmMyhRUSwMNKTV9pO5wu8Zve_G0ChbQaGYHOwyqo46h4Q'
  const options = {
    method: 'GET',
    uri:
      'https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_uw25GdjVy/.well-known/jwks.json',
    json: true,
  }
  const decodedJwt = jwt.decode(token, { complete: true })
  rp(options).then((jwk) => {
    const key = jwk.keys.find((key) => {
      return key.kid === decodedJwt.header.kid
    })
    const pem = jwkToPem(key)
    console.log(pem)
    jwt.verify(
      token,
      pem,
      { algorithms: ['RS256'] },
      function (err, decodedToken) {
        if (err) {
          console.log(err)
          res.json({ msg: 'error' })
          return
        }
        console.log(decodedToken)
        res.json({ msg: decodedToken })
      }
    )
  })
  // res.json({ msg: 'end' })

  // console.log(decodedJwt.header.kid)
  // const key = jwk.keys.find((key) => {
  //   return key.kid === decodedJwt.header.kid
  // })
  // console.log(key)
  // // const key = jwk.keys.find((key) => {
  // //   return key.kid === decodedJwt.header.kid
  // // })
  // console.log('1')
  // try {
  //   pem = await jwkToPem(jwk.keys[1])
  // } catch (e) {
  //   console.log(e)
  // }
  // console.log(pem)
  // jwt.verify(
  //   token,
  //   pem,
  //   { algorithms: ['RS256'] },
  //   function (err, decodedToken) {
  //     if (err) {
  //       console.log(err)
  //       res.json({ msg: 'error' })
  //       return
  //     }
  //
  //     console.log(jwt.decode(token))
  //     res.json({ msg: jwt.decode(token) })
  //   }
  // )
})

router.post('/refreshToken', (req, res, next) => {
  const refreshToken =
    'eyJraWQiOiI1ZnBiUXprdXhMRVdVQyt2UFcyRHJuNklwaHlVUTNZbFRSdjVLaWpMQ3RFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2YjE5ODIzYy00OTllLTQ4MzAtOGZhZC05MzVlMTM1YTk3YjEiLCJhdWQiOiI0Y29xYmx1cWozMjdjZ2M4NnFxaDllaWVhdiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjllNjI5ODIxLTAyMWYtNGMwOC1iOTI2LTA5NGIxOGY5YjkwZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE2MTE1NjE2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfdXcyNUdkalZ5IiwiY29nbml0bzp1c2VybmFtZSI6InNhZWNvbWFzdGVyIiwiZXhwIjoxNjE2MTE5MjE2LCJpYXQiOjE2MTYxMTU2MTYsImVtYWlsIjoic2FlY29tYXN0ZXJAbmF2ZXIuY29tIn0.P3QVL25_8NgxqQgN9xel5QwPJQmn8JFGwgxkX4Vh1KUbBpvySpm0MMQAeBlvp63xpAqEbEST8zxYZAr_dIbqcH_3qRnXh7flHGUsjtzg-ugnnZK2JXdzcmimgE7KwyJXdjaczAnveaGLpfTSLT90pyq2W0tVbQaM-dIpL_RJC0tzK3CVRVgFsHS4R_PNpHPORDQ6biTpEELbjL_6uN34Tu0QguPdzfzK0QVdr0GNLmtoo0w0gDh7APOzM4aA2VWyPGv8sBdDqYfwWWkG7uorI4FHjKaoDY4l4wjKizZPadPBka1T0KbMn6g7Al1caxbu6YTitM_6hKS3zfIV6zEPjg'
  const userData = {
    Username: 'saecomaster',
    Pool: userPool,
  }
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  // console.log(AWS.config.credentials.needsRefresh())
  // if (AWS.config.credentials.needsRefresh()) {
  console.log(cognitoUser)
  cognitoUser.refreshSession(refreshToken, (err, session) => {
    if (err) {
      console.log(err)
    } else {
      const idToken = session.getIdToken().getJwtToken()
      const accessToken = session.getAccessToken().getJwtToken()
      AWS.config.credentials.params.Logins[
        'cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_uw25GdjVy'
      ] = session.getIdToken().getJwtToken()
      AWS.config.credentials.refresh((err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('TOKEN SUCCESSFULLY UPDATED')
          res.json({ idToken, accessToken })
        }
      })
    }
  })
  // } else {
  //   res.json({ msg: 'error' })
  // }
})

router.get('/userlist', (req, res, next) => {
  const userData = {
    Username: 'saecomaster',
    Pool: userPool,
  }

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.getUserAttributes(function (err, result) {
    if (err) {
      console.log(err.message || JSON.stringify(err))
      res.json({ msg: 'error' })
      return
    }
    result.forEach((el) => {
      console.log('attribute ' + el.getName() + ' has value ' + el.getValue())
      res.json({ msg: 'success' })
    })
  })
})

router.get('/test', (req, res, next) => {
  res.status(200).json({ 'msg:': 'zzz' })
})

router.post('/login', (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  console.log(req.body)
  const id = req.body.id
  let name = null
  users.forEach((e) => {
    if (id === e.id) {
      name = e.name
    }
  })
  if (name === null) {
    console.log('no account')
    res.status(403).json({
      msg: '없는 사람입니다.',
      status: 403,
    })
    return
  }

  const accessToken = jwt.sign(
    {
      id,
      name, // 유저 정보
    },
    process.env.ACCESS_TOKEN_SECRET, // secrec Key
    {
      expiresIn: '8s',
      issuer: 'option', // options
      subject: 'userInfo',
    }
  )

  const refreshToken = jwt.sign(
    {
      id,
      name, // 유저 정보
    },
    process.env.REFRESH_TOKEN_SECRET, // secrec Key
    {
      expiresIn: '30M',
      issuer: 'option', // options
      subject: 'userInfo',
    }
  )

  // res.send({ accessToken, refreshToken, status: 200 })
  res.status(200).json({
    accessToken,
    refreshToken,
    status: 200,
  })
})

router.get('/refresh', refresshToken, (req, res) => {
  res.status(200).json({
    accessToken: req.accessToken,
    refreshToken: req.refreshToken,
    status: 200,
  })
})

router.get('/userInfo', authenticateAccessToken, (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  const id = req.id
  let name = null
  users.forEach((e) => {
    if (id === e.id) {
      name = e.name
    }
  })
  res.status(200).json({
    username: name,
    status: 200,
  })
})

// function getToken(req, res, next) {
//   const accessToken = req.header['x-access-tokken']
//   const refreshToken = req.header['x-refresh-tokken']
//   // accesToken, refreshToekn is null
//   if (!accessToken && !refreshToken) {
//     // to login
//     return { msg: 'token expired!!', status: '400' }
//   } else if (!accessToken && refreshToken) {
//     // accessToken 생성
//   } else {
//   }
//
//   return accessToken
// }

function refresshToken(req, res, next) {
  // const accessToken = req.headers['x-access-token']
  const refreshToken = req.headers['x-refresh-token']

  const verifyRefreshPromise = new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      function (err, decoded) {
        if (err) reject(err)
        resolve(decoded)
      }
    )
  })

  verifyRefreshPromise
    .then((verifiedRefreshToken) => {
      // console.log(refreshToken)
      const accessToken = jwt.sign(
        {
          id: verifiedRefreshToken.id,
          name: verifiedRefreshToken.name, // 유저 정보
        },
        process.env.ACCESS_TOKEN_SECRET, // secrec Key
        {
          expiresIn: '8s',
          issuer: 'option', // options
          subject: 'userInfo',
        }
      )
      req.accessToken = accessToken
      req.refreshToken = refreshToken
      next()
    })
    .catch((e) => {
      // console.log('refresh tokken expired')
      res.status(401).json({
        msg: 'refresh tokken expired',
        status: 401,
      })
    })
}

function authenticateAccessToken(req, res, next) {
  const accessToken = req.headers['x-access-token'] || req.query.token
  if (!accessToken) {
    res.status(401).json({
      status: 401,
      msg: 'Token 없음',
    })
    return
  }
  // getToken(accessToken, refreshToken)
  const verifyPromise = new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (err) reject(err)
        resolve(decoded)
      }
    )
  })

  verifyPromise
    .then((tokenDecoed) => {
      console.log('success')
      req.id = tokenDecoed.id
      req.name = tokenDecoed.name
      next()
    })
    .catch((e) => {
      // console.log('verify error')
      res.status(401).json({
        status: 401,
        msg: 'access token expired try refresh!',
      })
    })
}

module.exports = router
