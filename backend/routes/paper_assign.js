const express = require('express')

//midlewares
const uploadPdf = require('../middlewares/uploadFile')

// controller
const { assignPaper, reviewPaper, readReview, reviewerNumber, getReview, getOneReview, uploadSuggestionFile, editReview } = require('../controllers/assign_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

// assign paper to committee
router.post('/', verifyToken, checkRole(['HOST', 'ADMIN']), assignPaper)

// review paper
router.patch('/', verifyToken, checkRole(['ADMIN', 'COMMITTEE']), uploadPdf.single('file'), reviewPaper)

// upload suggestion file after
router.patch('/suggestion/:id', verifyToken, checkRole(['ADMIN', 'COMMITTEE']), uploadPdf.single('file'), uploadSuggestionFile)

// read review by paper id
router.get('/:id', verifyToken, readReview)

// get review
router.get('/reviewer/paper', verifyToken, checkRole(['COMMITTEE', 'ADMIN']), getReview)

// get one by paper_assign id
router.get('/one/:id', verifyToken, checkRole(['HOST', 'ADMIN', 'COMMITTEE']), getOneReview)

// number review
router.get('/number/:id', verifyToken, checkRole(['HOST', 'ADMIN']), reviewerNumber)

// edit review
router.post('/edit/paper/:id', verifyToken, checkRole('HOST', 'ADMIN'), editReview)


module.exports = router

