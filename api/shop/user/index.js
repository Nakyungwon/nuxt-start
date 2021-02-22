const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

router.post('/login', (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())

  const getToken = () => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          id: 'saecomaster',
          username: '나경원', // 유저 정보
        },

        'SeCrEtKeYfOrHaShInG', // secrec Key

        {
          expiresIn: '7d',
          issuer: 'option', // options
          subject: 'userInfo',
        },

        function (err, token) {
          if (err) reject(err)
          // callback
          else resolve(token)
        }
      )
    })
  }

  getToken().then((token) => {
    console.log(token)
    res.send({ token_key: token })
  })
})

router.get('/check', (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  const token = req.headers['x-access-token'] || req.query.token
  const jwtSecret = 'SeCrEtKeYfOrHaShInG'
  if (!token) {
    res.status(400).json({
      status: 400,
      msg: 'Token 없음',
    })
  }

  const checkToken = new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) reject(err)
      resolve(decoded)
    })
  })

  checkToken.then((token) => {
    // console.log(token)
    res.status(200).json({
      status: 200,
      msg: 'success',
      token,
    })
  })
})

module.exports = router
