const express = require('express')
const app = express()
app.use(express.json())
app.disable('x-powered-by')
app.use(express.urlencoded())
const user = require('./user/index')
app.use('/user', user)

module.exports = app
