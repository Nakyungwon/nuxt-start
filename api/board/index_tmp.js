const path = require('path')
const { Router } = require('express')
const router = Router()
const multer = require('multer')
// const formidable = require('formidable')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'))
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()
    // const file_name = uuidv4() + "_" + ext;
    const fileName = ext
    cb(null, fileName)
  },
})
// const upload = multer({
//   storage,
// })
// const upload = multer({ storage }).single('avatar')
const upload = multer({ storage }).none()

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

  upload(req, res, (err) => {
    // console.log(req)
    console.log(req.body)
    if (err instanceof multer.MulterError) {
      console.log('1--------------')
      console.log(err)
      console.log('1--------------')
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log('2--------------')
      console.log(err)
      console.log('2--------------')
    }
  })

  // const form = new formidable.IncomingForm()
  // form.parse(req, function (err, fields, files) {
  //   console.log(fields)
  //   if (err) {
  //     return res.status(400).json({ error: err.message })
  //   }
  //   const [firstFileName] = Object.keys(files)
  //
  //   res.json({ filename: firstFileName })
  // })
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
