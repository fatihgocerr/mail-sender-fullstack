const multer = require('multer')
const storage = multer.diskStorage({
 destination: function(req, file, cb) {
  cb(null, 'uploads')
 },
 filename: function(req, file, cb) {
  // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  // cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname)
  cb(null, 'image' + '-' + file.originalname)
 }
})
const fileFilter = (req, file, cb) => {
 // console.log(file)
if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg+xml" ) {
    cb(null, true)
} else {
    return cb(new Error('Dosya Türü Desteklenmiyor'), false);
}
 cb(null, true)
}
const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")
module.exports = upload