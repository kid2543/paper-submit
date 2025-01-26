const express = require('express')

// middlewares
const uploadPdf = require('../middlewares/uploadFile')
const requireHost = require('../middlewares/requireHost')
const requireAdmin = require('../middlewares/requireAdmin')


// controller
const { uploadTemplate, allTemplate, getTemplate, deleteTemplate } = require('../controllers/template_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')


// routes
const router = express.Router()

// upload template
router.post('/', verifyToken, checkRole(['HOST', 'ADMIN']), uploadPdf.single('file'), uploadTemplate)


// all template
router.get('/', requireAdmin, allTemplate)


// get template for conference
router.get('/:id', getTemplate)


// delete template
router.delete('/:id', verifyToken, checkRole(['HOST', 'ADMIN']), deleteTemplate)


module.exports = router