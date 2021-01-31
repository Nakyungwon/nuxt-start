// const express = require('express')
// // const fileUpload = require('express-fileupload')
// const app = express()
// const formidable = require('formidable')
// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(null, 'fileName')
//   },
// })
// const upload = multer({
//   storage,
// })
// // app.use(fileUpload)
// // app.use(bodyParser.json())
//
// app.post('/imageUpload', (req, res, next) => {
//   console.log(req.query)
//   console.log(req)
//   // res.send('훌륭해요za11111! ' + Math.random())
//   res.send(req.query)
// })
//
// app.post('/regist_multipart', (req, res, next) => {
//   // const form = formidable.IncomingForm()
//   const form = formidable({ multiples: true })
//   form.uploadDir = 'uploads/'
//   form.keepExtensions = true
//   // form.on('field', (field, value) => {
//   //   console.log(field)
//   //   console.log(value)
//   // })
//
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.log(err)
//       next(err)
//       return
//     }
//     console.log(fields)
//     // res.json({ fields, files })
//   })
//   // res.send('aaaaaa')
//   res.json('aaa')
// })
//
// app.post('/regist', (req, res, next) => {
//   console.log(req.body)
//   // res.send('aaaaaa')
// })
//
// module.exports = {
//   path: '/board',
//   handler: app,
// }
