const path = require('path')
const { Router } = require('express')
const router = Router()
const formidable = require('formidable')
const multer = require('multer')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'))
  },
  filename(req, file, cb) {
    cb(null, 'fileName')
  },
})
const upload = multer({
  storage,
})

router.post('/imageUpload', (req, res, next) => {
  console.log(req.query)
  console.log(req)
  // res.send('훌륭해요za11111! ' + Math.random())
  res.send(req.query)
})

router.post('/regist_multipart', (req, res, next) => {
  // const form = formidable.IncomingForm()
  // form.on('field', (field, value) => {
  //   console.log(field)
  //   console.log(value)
  // })
  // const form = formidable({ multiples: true })
  // form.uploadDir = 'uploads/'
  // form.keepExtensions = true
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     console.log(err)
  //     next(err)
  //     return
  //   }
  //   console.log(fields)
  //   res.json({ fields, files })
  // })
  // res.send('aaaaaa')
  console.log(res.fields)
  res.json(res.body)
})

router.post('/regist', (req, res, next) => {
  console.log(req.body)
  // res.send('aaaaaa')
})

// module.exports = {
//   path: '/board',
//   handler: app,
// }
module.exports = router
