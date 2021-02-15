const express = require('express')
const app = express()
app.use(express.json())
app.disable('x-powered-by')
app.use(express.urlencoded())
const board = require('./board/index')
app.use('/board', board)

module.exports = app
