const express = require('express')
const app = express()

// export default (req, res) => {
//   console.log('testest')
//   res.send('훌륭합니다~~ ' + Math.random())
// }
app.get('/', (req, res, next) => {
  res.send('훌륭해요! ' + Math.random())
})

app.get('/', (req, res, next) => {
  res.send('훌륭해요! ' + Math.random())
})

module.exports = {
  path: '/api',
  handler: app,
}
