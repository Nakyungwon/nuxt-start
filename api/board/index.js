const express = require('express')
const app = express()

app.post('/imageUpload', (req, res, next) => {
  console.log(req.query)
  console.log(req)
  // res.send('훌륭해요za11111! ' + Math.random())
  res.send(req.query)
})

module.exports = {
  path: '/board',
  handler: app,
}
