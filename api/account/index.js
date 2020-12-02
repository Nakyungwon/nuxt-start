const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  console.log("i 'm here")
  res.send('훌륭해요za! ' + Math.random())
})

app.get('/login', (req, res, next) => {
  console.log(req.query)
  // res.send('훌륭해요za11111! ' + Math.random())
  res.send(req.query)
})

module.exports = {
  path: '/account',
  handler: app,
}
