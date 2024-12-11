const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

exports.upload = multer({
    // dest: 'app/public/uploads/',
    storage
})
