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
  upload(req, res, (err) => {
    console.log(req.body)
    if (err instanceof multer.MulterError) {
      console.log(err)
    } else if (err) {
      console.log(err)
    }
  })
})

router.post('/regist', (req, res, next) => {
  console.log(req.body)
  // res.send('aaaaaa')
})

module.exports = router
