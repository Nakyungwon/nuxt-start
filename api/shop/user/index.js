const { Router } = require('express')
const router = Router()

router.post('/login', (req, res, next) => {
  // res.send('훌륭해요za11111! ' + Math.random())
  const result = { msg: 'hihihhh' }
  res.send(result)
})

module.exports = router
