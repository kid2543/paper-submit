const multer = require("multer");
const path = require('path')

const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/image");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  })


// set up file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image file are allowed!'), false)
  }
}

  const uploadImage = multer({
    storage: storageImage, fileFilter
  });

  module.exports = uploadImage