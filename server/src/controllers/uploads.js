const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/' + file.fieldname + '/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25000000
  }
})

module.exports = {
  upload,
  check (req, res, next) {
    if (!req.is('multipart/form-data')) {
      res.status(415).send({
        error: 'Invalid request content type'
      })
    } next()
  },
  rewrite (req, res, next) {
    if (req.file.fieldname === 'avatar') {
      req.body.avatarUri = req.file.destination + req.file.filename
      next()
    } else if (req.file.fieldname === 'response') {
      req.body.audioUri = req.file.destination + req.file.filename
      next()
    } else {
      res.status(500).send({
        error: 'Upload re-writer was passed invalid field name'
      })
    }
  }
}
