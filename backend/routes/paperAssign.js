const express = require('express')

//midlewares
const requireHost = require('../middlewares/requireHost')
const requireComit = require('../middlewares/requireComit')
const uploadPdf = require('../middlewares/uploadFile')
const requireAuth = require('../middlewares/requireAuth')

// controller
const { assignPaper, reviewPaper, readReview } = require('../controllers/assignController')

const router = express.Router()

// assign paper
router.post('/', requireHost, assignPaper)

// review paper
router.patch('/', requireComit, uploadPdf.single('file'), reviewPaper)

// read review
router.get('/:paper_id', requireAuth, readReview)


module.exports = router

