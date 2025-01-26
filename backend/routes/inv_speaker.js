const express = require('express')

// middlewares
const requireHost = require('../middlewares/requireHost')
const uploadImage = require('../middlewares/uploadImage')
const uploadPdf = require('../middlewares/uploadFile')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

// controllers
const { createInv, updateInv, uploadInvImage, uploadInvCv, deleteImage, deleteCv, removeInv, getInv } = require('../controllers/speaker_controller')

const router = express.Router()

// create inv
router.post('/', verifyToken, checkRole(['HOST', 'ADMIN']), createInv)

// update inv
router.patch('/update/:id', verifyToken, checkRole(['HOST', 'ADMIN']), updateInv)

// upload inv image
router.patch('/img/:id', verifyToken, checkRole(['HOST', 'ADMIN']), uploadImage.single('image'), uploadInvImage)

// upload inv cv
router.patch('/cv/:id', verifyToken, checkRole(['HOST', 'ADMIN']), uploadPdf.single('file'), uploadInvCv)

// remove image
router.patch('/remove/img/:id', verifyToken, checkRole(['HOST', 'ADMIN']), deleteImage)

// remove cv
router.patch('/remove/cv/:id', verifyToken, checkRole(['HOST', 'ADMIN']), deleteCv)


// delete inv
router.delete('/:id', verifyToken, checkRole(['HOST', 'ADMIN']), removeInv)

// read inv
router.get('/:id', getInv)


module.exports = router