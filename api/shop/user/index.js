const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
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
      console.log(accessToken)

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
          cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              console.log(err.message || JSON.stringify(err))
              res.json({ msg: 'error' })
              return
            }
            result.forEach((el) => {
              console.log(
                'attribute ' + el.getName() + ' has value ' + el.getValue()
              )
              // res.json({ msg: 'success' })
            })
          })
          res.json({ msg: 'success', accessToken })
        }
      })
    },

    onFailure(err) {
      console.log(err.message || JSON.stringify(err))
    },
  })
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
