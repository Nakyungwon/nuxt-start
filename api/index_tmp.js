const express = require('express')
const app = express()
const formidableMiddleware = require('express-formidable')

// export default (req, res) => {
//   console.log('testest')
//   res.send('훌륭합니다~~ ' + Math.random())
// }
//
// app.get('/', (req, res, next) => {
//   res.send('훌륭해요! ' + Math.random())
// })
//
// app.get('/', (req, res, next) => {
//   res.send('훌륭해요! ' + Math.random())
// })
app.disable('x-powered-by')
app.use(
  formidableMiddleware({
    uploadDir: '/uploads',
    multiples: true,
  })
)
const board = require('./board/index_tmp')
app.use('/board', board)
app.use((req, res, next) => {
  if (req.contentType().toLowerCase() === 'multipart/form-data') {
    next()
  }
})

// if (require.main === module) {
//   const port = 3001
//   app.listen(port, () => {
//     console.log(`API server listening on port ${port}`)
//   })
// }

// app.listen(5000, function () {
//   console.log('원주민 Server Started.....')
// })

module.exports = app
// module.exports = {
//   path: '/api',
//   handler: app,
// }
