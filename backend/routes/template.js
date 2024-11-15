const express = require('express')

// middlewares
const uploadPdf = require('../middlewares/uploadFile')
const requireHost = require('../middlewares/requireHost')
const requireAdmin = require('../middlewares/requireAdmin')


// controller
const { uploadTemplate, allTemplate, getTemplate, deleteTemplate } = require('../controllers/templateController')


// routes
const router = express.Router()

// upload template
router.post('/', requireHost, uploadPdf.single('file'), uploadTemplate)


// all template
router.get('/', requireAdmin, allTemplate)


// get template for conference
router.get('/:id', requireHost, getTemplate)


// delete template
router.delete('/:id', requireHost, deleteTemplate)


module.exports = router