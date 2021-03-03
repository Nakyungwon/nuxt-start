const express = require('express')
const app = express()
app.use(express.json())
app.disable('x-powered-by')
app.use(express.urlencoded())
const board = require('./board/index')
app.use('/board', board)

// export default function (req, res, next) {
//   global.document = global.document || {}
//   global.document.cookie = req.headers.cookie
//   console.log('global cookie')
//   console.log(global.document.cookie)
//   next()
// }
module.exports = app
