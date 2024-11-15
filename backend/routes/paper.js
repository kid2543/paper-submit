const express = require('express')

//midlewares
const requireAuth = require('../middlewares/requireAuth')
const requireHost = require('../middlewares/requireHost')
const uploadPdf = require('../middlewares/uploadFile')

// controller
const { getPapers, getSinglePaper, createPaper, uploadCloseNamePaper, updatePaperStatus, revisePaper } = require('../controllers/paperController')

const router = express.Router()

//all paper
router.get('/', getPapers)

//signle paper
router.get('/:id', getSinglePaper)

//create paper
router.post('/create', requireAuth, uploadPdf.single('file'), createPaper)

// upload close name file
router.patch('/close/file', requireHost, uploadPdf.single('file'), uploadCloseNamePaper)

// update paper status 
router.patch('/status', requireHost, updatePaperStatus)

// edit and upload edit file,
router.patch('/revise', requireAuth, uploadPdf.single('file'), revisePaper)

module.exports = router

