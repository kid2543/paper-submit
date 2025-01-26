const express = require('express')

//midlewares
const uploadPdf = require('../middlewares/uploadFile')

// controller
const { createPaperFile, getPaperFile, createCloseNameFile, uploadEditFile, readOriginalFile } = require('../controllers/paper_file_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

// upload paper file
router.post('/', verifyToken, checkRole(['AUTHOR']), uploadPdf.single('file'), createPaperFile)

// host upload close name file
router.post('/close/name', verifyToken, checkRole('HOST', 'ADMIN'), uploadPdf.single('file'), createCloseNameFile)

// author upload edit file
router.post('/edit/:id', verifyToken, checkRole(['HOST', 'AUTHOR']), uploadPdf.single('file'), uploadEditFile)

// read file
router.get('/read/:id', verifyToken, getPaperFile)

// update read original_file
router.patch('/original/read/:id', verifyToken, checkRole(['HOST']), readOriginalFile)

module.exports = router

