const express = require('express')

//midlewares
const uploadPdf = require('../middlewares/uploadFile')

// controller
const { createEditPaper, getEditHistory } = require('../controllers/edit_file_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

// author upload
router.post('/', verifyToken, checkRole(['AUTHOR']), uploadPdf.single('file'), createEditPaper)

// author read edit history
router.get('/read/:id', verifyToken, getEditHistory)

module.exports = router

