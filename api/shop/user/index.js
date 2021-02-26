const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const users = [
  { id: 'saecomaster', name: 'kyungwon-na' },
  { id: 'gogo', name: '2jieun' },
]

router.get('/test', (req, res, next) => {
  res.status(200).json({ 'msg:': 'zzz' })
})

router.post('/login', (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  const id = req.body.id
  let name = null
  users.forEach((e) => {
    if (id === e.id) {
      name = e.name
    }
  })

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

  res.send({ accessToken, refreshToken, status: 200 })
})

router.get('/refresh', refresshToken, (req, res) => {
  res.status(200).json({
    accessToken: req.accessToken,
    refreshToken: req.refreshToken,
    status: 200,
  })
})

router.get('/check', authenticateAccessToken, (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  res.status(200).json({
    msg: 'tokken 정상',
    status: 200,
  })
})

router.get('/userInfo', authenticateAccessToken, (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  res.status(200).json({
    username: '나경원',
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
  console.log(refreshToken)

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
      console.log(refreshToken)
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
      console.log('refresh tokken expired')
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
      console.log('error')
      res.status(401).json({
        success: true,
        msg: 'access token expired try refresh!',
      })
    })
}

module.exports = router
