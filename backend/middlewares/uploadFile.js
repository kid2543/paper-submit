const multer = require("multer");
const path = require('path')

const storagePdf = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });


// file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    cb(null, true)
  } else {
    cb(new Error('Only PDF and DOC are allowed!'), false)
  }
}

  const uploadPdf = multer({
    storage: storagePdf, fileFilter
  });

  module.exports = uploadPdf